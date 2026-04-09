"use client";

import { History, UserCircle, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

import { HistoryList } from "@/components/HistoryList";

export function Sidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground transition-all duration-300">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight">Quizzy AI</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <HistoryList />
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
