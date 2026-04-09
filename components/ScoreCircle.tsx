"use client";

interface ScoreCircleProps {
  score: number;
  total: number;
}

export function ScoreCircle({ score, total }: ScoreCircleProps) {
  const percentage = (score / total) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-muted-foreground/20"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="text-primary transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-medium text-muted-foreground">Score</span>
        <span className="text-4xl font-bold">
          {score}/{total}
        </span>
      </div>
    </div>
  );
}
