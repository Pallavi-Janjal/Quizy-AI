"use server";

import { generateQuizOrFlashcard } from "@/lib/ai";
import { redirect } from "next/navigation";
import PDFParser from "pdf2json";
import mammoth from "mammoth";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api.js";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = convexUrl ? new ConvexHttpClient(convexUrl) : null;

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // Note: PDFParser constructor params vary by version, v2+ usually takes (this, suppressLayer)
    const pdfParser = new (PDFParser as any)(null, 1);
    
    pdfParser.on("pdfParser_dataError", (errData: any) => {
      console.error("PDF Parsing Error:", errData);
      reject(new Error(errData?.parserError || "Failed to parse PDF"));
    });
    
    pdfParser.on("pdfParser_dataReady", () => {
      resolve(pdfParser.getRawTextContent());
    });
    
    try {
      pdfParser.parseBuffer(buffer);
    } catch (err) {
      reject(err);
    }
  });
}

async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

export async function generateContent(formData: FormData) {
  const notes = formData.get("notes") as string;
  const file = formData.get("file") as File;
  const mode = formData.get("mode") as "quiz" | "flashcard";
  const count = 10;

  let contentToProcess = notes || "";
  let topic = "Untitled Session";

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    topic = file.name.replace(/\.[^/.]+$/, "");
    if (file.name.endsWith(".pdf")) {
      contentToProcess += "\n" + (await extractTextFromPDF(buffer));
    } else if (file.name.endsWith(".docx")) {
      contentToProcess += "\n" + (await extractTextFromDocx(buffer));
    } else if (file.name.endsWith(".txt")) {
      contentToProcess += "\n" + buffer.toString("utf-8");
    }
  } else if (notes) {
    topic = notes.slice(0, 30) + (notes.length > 30 ? "..." : "");
  }

  if (!contentToProcess.trim()) {
    throw new Error("No content provided");
  }

  const data = await generateQuizOrFlashcard(contentToProcess, mode, count);

  // Save to Convex history
  if (convex) {
    try {
      await convex.mutation(api.history.saveHistory, {
        topic,
        mode,
        data,
      });
    } catch (err) {
      console.error("Failed to save history to Convex:", err);
    }
  }

  const encodedData = encodeURIComponent(JSON.stringify(data));
  redirect(`/${mode}?data=${encodedData}`);
}
