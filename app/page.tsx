"use client";

import { useState, useRef } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Upload, Brain, CreditCard, FileText, Loader2 } from "lucide-react";
import { generateContent } from "./actions";

export default function Home() {
  const [mode, setMode] = useState<"quiz" | "flashcard">("quiz");
  const [size, setSize] = useState<number>(10); // Force count = 10 as per rules
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set("mode", mode);
    if (file) {
      formData.set("file", file);
    }
    
    try {
      await generateContent(formData);
    } catch (error: any) {
      // In Next.js, redirect throws a special error. We should ignore it or check for it.
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        return;
      }
      console.error("failed to generate:", error);
      alert("Failed to generate content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar - hidden on mobile, visible on lg */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-3xl space-y-12 text-center">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Quizzy AI
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Learn any topic with fun
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <Card className="border-2 shadow-none bg-card overflow-hidden">
              <CardContent className="p-8 md:p-12 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {/* Drop Zone */}
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="absolute inset-0 border-2 border-dashed border-border rounded-xl group-hover:border-primary/50 transition-colors" />
                    <div className="relative h-full min-h-[200px] flex flex-col items-center justify-center p-6 text-center space-y-4">
                      {file ? (
                        <>
                          <FileText className="h-10 w-10 text-primary" />
                          <p className="text-lg font-medium truncate w-full">{file.name}</p>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          >
                            Remove
                          </Button>
                        </>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                          <p className="text-lg font-medium">Drop your notes here</p>
                          <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
                        </>
                      )}
                      <input 
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".pdf,.docx,.txt"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col justify-between space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={mode === "quiz" ? "default" : "outline"}
                        className="h-auto py-6 rounded-xl border-2"
                        onClick={() => setMode("quiz")}
                      >
                        <Brain className="h-5 w-5 mr-2" />
                        Quiz
                      </Button>
                      <Button
                        type="button"
                        variant={mode === "flashcard" ? "default" : "outline"}
                        className="h-auto py-6 rounded-xl border-2"
                        onClick={() => setMode("flashcard")}
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Flash card
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-left ml-1">Paste your text</p>
                      <Textarea 
                        name="notes"
                        placeholder="Or start typing..." 
                        className="min-h-[100px] bg-background border-2 rounded-xl resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={loading}
                        className="h-16 w-16 rounded-full group bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        {loading ? (
                          <Loader2 className="h-8 w-8 animate-spin" />
                        ) : (
                          <ArrowRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </main>
    </div>
  );
}
