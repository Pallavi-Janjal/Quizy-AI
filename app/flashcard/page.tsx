"use client";

import { useState } from "react";
import { Flashcard } from "@/components/Flashcard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Brain } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const mockFlashcards = [
  { front: "What is React?", back: "A JavaScript library for building user interfaces." },
  { front: "What is Next.js?", back: "A React framework for production-grade applications." },
  { front: "What is Tailwind CSS?", back: "A utility-first CSS framework." },
  { front: "What is TypeScript?", back: "A typed superset of JavaScript." },
  { front: "What is Shadcn UI?", back: "A collection of re-usable components built with Radix UI and Tailwind CSS." },
];

export default function FlashcardPage() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    if (currentIdx < mockFlashcards.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12 flex flex-col max-w-5xl mx-auto space-y-12">
      {/* Top Header - Numbered Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex gap-2 bg-card p-2 border-2 rounded-2xl overflow-x-auto w-full md:w-auto scrollbar-hide">
          {mockFlashcards.map((_, index) => (
            <Button
              key={index}
              variant={currentIdx === index ? "default" : "ghost"}
              className={cn(
                "h-10 w-10 p-0 rounded-xl font-bold",
                currentIdx === index && "shadow-none"
              )}
              onClick={() => setCurrentIdx(index)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
        <Link href="/quiz">
          <Button variant="outline" className="border-2 rounded-xl whitespace-nowrap">
            <Brain className="h-4 w-4 mr-2" />
            Switch Quiz
          </Button>
        </Link>
      </div>

      {/* Flashcard Area */}
      <div className="flex-1 flex items-center justify-center py-8">
        <Flashcard
          front={mockFlashcards[currentIdx].front}
          back={mockFlashcards[currentIdx].back}
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
          Prev
        </Button>
        <Button
          variant="default"
          size="lg"
          className="rounded-xl px-8 font-bold"
          onClick={handleNext}
          disabled={currentIdx === mockFlashcards.length - 1}
        >
          Next
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
