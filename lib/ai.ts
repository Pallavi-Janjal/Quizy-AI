import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Flashcard = {
  front: string;
  back: string;
};

export async function generateQuizOrFlashcard(
  notes: string,
  mode: "quiz" | "flashcard",
  count: number = 10
): Promise<QuizQuestion[] | Flashcard[]> {
  const systemPrompt = `You are a strict JSON-only AI. Your purpose is to generate educational content based on user notes.
You must return a valid JSON object. Do not include any text, markings, or explanation outside of the JSON object.

If mode is "quiz", return exactly ${count} multiple-choice questions in this format:
{
  "questions": [
    {
      "question": "string",
      "options": ["choice1", "choice2", "choice3", "choice4"],
      "correctIndex": 0-3,
      "explanation": "string"
    }
  ]
}
Note: options should contain ONLY plain answer text. Do NOT add prefixes like "A. " or "1. ".

If mode is "flashcard", return exactly ${count} flashcards in this format:
{
  "flashcards": [
    {
      "front": "string",
      "back": "string"
    }
  ]
}

Always return high-quality, technically accurate content based on the provided notes.`;

  const userPrompt = `Notes: ${notes}\n\nMode: ${mode}\nGenerate ${count} ${mode}s.`;

  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" },
  });

  const responseText = chatCompletion.choices[0]?.message?.content || "{}";
  const data = JSON.parse(responseText);

  if (mode === "quiz") {
    return data.questions || [];
  } else {
    return data.flashcards || [];
  }
}
