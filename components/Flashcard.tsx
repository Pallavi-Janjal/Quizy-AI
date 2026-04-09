"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FlashcardProps {
  front: string;
  back: string;
}

export function Flashcard({ front, back }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="perspective-1000 w-full max-w-lg aspect-[4/5] md:aspect-[3/2] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped && "rotate-y-180"
        )}
      >
        {/* Front */}
        <Card className="absolute inset-0 backface-hidden border-2 shadow-none bg-card flex items-center justify-center p-8">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <p className="text-xl md:text-2xl font-medium">{front}</p>
            <p className="text-sm text-muted-foreground animate-pulse">Tap to flip</p>
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 backface-hidden rotate-y-180 border-2 shadow-none bg-accent flex items-center justify-center p-8">
          <CardContent className="flex items-center justify-center text-center">
            <p className="text-xl md:text-2xl font-medium">{back}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
