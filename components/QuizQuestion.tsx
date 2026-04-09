"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
}

export function QuizQuestion({
  question,
  options,
  selectedOption,
  onSelect,
}: QuizQuestionProps) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="border-2 shadow-none bg-card">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-medium leading-tight">
            Q: {question}
          </h2>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option, index) => (
          <Button
            key={index}
            variant={selectedOption === option ? "default" : "outline"}
            className="h-auto py-6 px-4 justify-start text-left text-lg font-normal border-2 hover:bg-accent transition-colors"
            onClick={() => onSelect(option)}
          >
            <span className="font-bold mr-3 text-muted-foreground">
              {labels[index]}.
            </span>
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
