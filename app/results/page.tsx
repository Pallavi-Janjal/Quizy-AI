"use client";

import { ScoreCircle } from "@/components/ScoreCircle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Home, RefreshCw, XCircle } from "lucide-react";
import Link from "next/link";

const mockReviewData = [
  {
    question: "What is the capital of France?",
    isCorrect: true,
    userAnswer: "Paris",
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    isCorrect: false,
    userAnswer: "Jupiter",
    correctAnswer: "Mars",
  },
];

export default function ResultsPage() {
  const score = 8;
  const total = 10;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col max-w-4xl mx-auto space-y-12">
      {/* Home Button */}
      <div>
        <Link href="/">
          <Button variant="ghost" className="rounded-xl">
            <Home className="h-5 w-5 mr-2" />
            Home
          </Button>
        </Link>
      </div>

      {/* Score Section */}
      <div className="flex flex-col items-center space-y-4">
        <ScoreCircle score={score} total={total} />
        <h2 className="text-3xl font-bold">Great Job!</h2>
        <p className="text-muted-foreground">You've mastered the basics of this topic.</p>
      </div>

      {/* Review List */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold px-2">Review Answers</h3>
        <div className="space-y-4">
          {mockReviewData.map((item, index) => (
            <Card key={index} className="border-2 shadow-none overflow-hidden">
              <CardContent className="p-6 flex items-start gap-4">
                {item.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                )}
                <div className="space-y-2 flex-1">
                  <p className="font-medium text-lg">{item.question}</p>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm">
                      Your answer: <span className={item.isCorrect ? "text-green-600 font-semibold" : "text-destructive font-semibold"}>{item.userAnswer}</span>
                    </p>
                    {!item.isCorrect && (
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-lg text-sm border border-green-200 dark:border-green-800">
                        Correct answer is <span className="font-bold">{item.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center pt-8">
        <Link href="/quiz">
          <Button size="lg" className="rounded-xl px-12 h-14 font-bold text-lg">
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}
