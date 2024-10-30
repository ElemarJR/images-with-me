import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  isOptimizing: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PromptInput({ prompt, isOptimizing, onPromptChange, onSubmit }: PromptInputProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-sm">1</span>
          Describe Your Image
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <form onSubmit={onSubmit} className="w-full">
          <div className="space-y-4 w-full">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Be creative! Describe the image you'd like to generate in detail..."
              className="w-full min-h-[120px] resize-y text-lg p-4 border-gray-200 focus:border-gray-400 focus:ring-gray-400"
            />
            <div className="flex justify-end">
              <Button 
                type="submit"
                className="h-12 px-6 text-lg font-medium transition-all duration-200 hover:scale-[1.02]"
                disabled={!prompt.trim() || isOptimizing}
              >
                {isOptimizing ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Optimizing Your Prompt...
                  </>
                ) : (
                  "2. Optimize My Prompt"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 