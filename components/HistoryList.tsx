"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Badge } from "@/components/ui/badge";
import { Brain, CreditCard, ChevronRight, History } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface HistoryItem {
  _id: string;
  topic: string;
  mode: "quiz" | "flashcard";
  data: unknown;
  createdAt: number;
}

export function HistoryList() {
  const history = useQuery(api.history.getHistory) as HistoryItem[] | undefined;

  if (history === undefined) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 w-full animate-pulse bg-muted rounded-xl" />
        ))}
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
        <History className="h-10 w-10 text-muted-foreground opacity-20" />
        <p className="text-sm text-muted-foreground font-medium italic">No history yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      <h3 className="text-sm font-semibold px-2 text-muted-foreground uppercase tracking-wider">History</h3>
      <div className="space-y-2">
        {history.map((item: HistoryItem) => {
          const encodedData = encodeURIComponent(JSON.stringify(item.data));
          const href = `/${item.mode}?data=${encodedData}`;

          return (
            <Link key={item._id} href={href}>
              <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-card border-2 border-transparent hover:border-border transition-all cursor-pointer">
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-background rounded-lg border">
                  {item.mode === "quiz" ? (
                    <Brain className="h-5 w-5 text-primary" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate">{item.topic || "Untitled"}</p>
                    <Badge variant="outline" className="text-[10px] h-4 px-1 rounded uppercase">
                      {item.mode}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    {format(item.createdAt, "MMM d, h:mm a")}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
