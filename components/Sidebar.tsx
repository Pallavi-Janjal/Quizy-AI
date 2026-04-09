"use client";

import { History, UserCircle, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockHistory = [
  "React Hooks Explained",
  "Next.js App Router Tips",
  "Tailwind CSS Layouts",
  "TypeScript Generics Guide",
  "Web Performance Optimization",
];

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground transition-all duration-300">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight">Quizzy AI</h2>
      </div>
      
      <div className="px-4 py-2">
        <div className="flex items-center gap-2 px-2 text-sm font-semibold text-muted-foreground">
          <History className="h-4 w-4" />
          History
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
        <div className="space-y-1">
          {mockHistory.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start truncate text-sm font-normal"
            >
              {item}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-4 space-y-2">
        <div className="h-[1px] w-full bg-border" />
        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserCircle className="h-6 w-6" />
          </Button>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
