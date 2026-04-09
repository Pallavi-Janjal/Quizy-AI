"use server";

import { generateQuizOrFlashcard } from "@/lib/ai";
import { redirect } from "next/navigation";
import PDFParser from "pdf2json";
import mammoth from "mammoth";

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1);
    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
      resolve(pdfParser.getRawTextContent());
    });
    pdfParser.parseBuffer(buffer);
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

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (file.name.endsWith(".pdf")) {
      contentToProcess += "\n" + (await extractTextFromPDF(buffer));
    } else if (file.name.endsWith(".docx")) {
      contentToProcess += "\n" + (await extractTextFromDocx(buffer));
    } else if (file.name.endsWith(".txt")) {
      contentToProcess += "\n" + buffer.toString("utf-8");
    }
  }

  if (!contentToProcess.trim()) {
    throw new Error("No content provided");
  }

  const data = await generateQuizOrFlashcard(contentToProcess, mode, count);
  const encodedData = encodeURIComponent(JSON.stringify(data));

  redirect(`/${mode}?data=${encodedData}`);
}
