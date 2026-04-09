"use client";

import { QuizQuestion } from "@/components/QuizQuestion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const defaultMockData = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctIndex: 1,
  },
];

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [questions, setQuestions] = useState<any[]>(defaultMockData);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setQuestions(decoded.map((q: any, index: number) => ({ ...q, id: index })));
      } catch (err) {
        console.error("Failed to parse quiz data:", err);
      }
    }
  }, [searchParams]);

  const totalQuestions = questions.length;
  const progress = ((currentIdx + 1) / totalQuestions) * 100;
  const currentQuestion = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Compute results and redirect
      const reviewData = questions.map((q) => ({
        question: q.question,
        isCorrect: answers[q.id] === q.options[q.correctIndex],
        userAnswer: answers[q.id] || "No answer",
        correctAnswer: q.options[q.correctIndex],
      }));
      const score = reviewData.filter((r) => r.isCorrect).length;
      const encodedData = encodeURIComponent(JSON.stringify(reviewData));
      router.push(`/results?score=${score}&total=${totalQuestions}&data=${encodedData}`);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col max-w-5xl mx-auto space-y-12">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex-1 space-y-2">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Progress</span>
            <span>{currentIdx + 1} / {totalQuestions}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
        <Link href="/flashcard">
          <Button variant="outline" className="border-2 rounded-xl">
            <Zap className="h-4 w-4 mr-2" />
            Switch Flash
          </Button>
        </Link>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center py-8">
        <QuizQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedOption={answers[currentQuestion.id]}
          onSelect={(option) => 
            setAnswers({ ...answers, [currentQuestion.id]: option })
          }
        />
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button
          variant="outline"
          size="lg"
          className="border-2 rounded-xl px-8"
          onClick={handlePrev}
          disabled={currentIdx === 0}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Previous
        </Button>
        <Button
          variant="default"
          size="lg"
          className="rounded-xl px-8 font-bold"
          onClick={handleNext}
        >
          {currentIdx === totalQuestions - 1 ? "Finish" : "Next"}
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
