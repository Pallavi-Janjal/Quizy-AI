"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative inline-block">
          <Loader2 className="h-16 w-16 text-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 bg-primary rounded-full" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Generating your experience...</h2>
          <p className="text-muted-foreground animate-pulse">
            Our AI is crafting custom questions based on your notes.
          </p>
        </div>

        <div className="space-y-4 pt-8">
          <Skeleton className="h-12 w-full rounded-xl" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
