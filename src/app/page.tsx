'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { PromptInput } from "@/components/PromptInput";
import { ImageGallery } from "@/components/ImageGallery";
import { Version } from "@/types/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'left' | 'right'>('right');

  const optimizePrompt = async (userPrompt: string) => {
    try {
      setIsOptimizing(true);
      const response = await fetch("/api/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      
      const data = await response.json();
      if (!data.prompts || !Array.isArray(data.prompts)) {
        throw new Error("Invalid response format from optimize endpoint");
      }

      // Map all prompts returned from the API
      const newVersions = data.prompts.map((prompt: string) => ({
        prompt,
        predictions: [],
        isGenerating: false,
        currentImageIndex: 0
      }));

      setVersions(newVersions);
    } catch (err) {
      setError("Failed to optimize prompt");
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    await optimizePrompt(prompt);
  };

  const handleGenerateImage = async (versionIndex: number, predictionIndex?: number) => {
    try {
      setError(null);
      setVersions(prev => prev.map((v, i) => 
        i === versionIndex ? {...v, isGenerating: true} : v
      ));

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: versions[versionIndex].prompt,
        }),
      });
      
      let prediction = await response.json();
      if (response.status !== 201) {
        setError(prediction.detail);
        return;
      }

      // Create a temporary prediction object to show loading state
      const tempPrediction = {
        id: prediction.id,
        output: [],
        status: "loading"
      };

      setVersions(prev => prev.map((v, i) => 
        i === versionIndex ? {
          ...v, 
          predictions: predictionIndex !== undefined 
            ? v.predictions.map((p, idx) => idx === predictionIndex ? tempPrediction : p)
            : [...v.predictions, tempPrediction],
          currentImageIndex: predictionIndex ?? v.predictions.length
        } : v
      ));

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch(`/api/predictions/${prediction.id}`);
        prediction = await response.json();
        
        if (response.status !== 200) {
          setError(prediction.detail);
          return;
        }
        
        setVersions(prev => prev.map((v, i) => 
          i === versionIndex ? {
            ...v, 
            predictions: v.predictions.map(p => 
              p.id === prediction.id ? prediction : p
            )
          } : v
        ));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setVersions(prev => prev.map((v, i) => 
        i === versionIndex ? {...v, isGenerating: false} : v
      ));
    }
  };

  const handleDownloadImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError("Failed to download image");
    }
  };

  const handleDeleteImage = (versionIndex: number, predictionIndex: number) => {
    setVersions(prev => prev.map((v, i) => 
      i === versionIndex ? {
        ...v,
        predictions: v.predictions.filter((_, idx) => idx !== predictionIndex),
        currentImageIndex: Math.max(0, Math.min(v.currentImageIndex, v.predictions.length - 2))
      } : v
    ));
  };

  const navigateImage = (versionIndex: number, direction: 'prev' | 'next') => {
    setTransitionDirection(direction === 'next' ? 'right' : 'left');
    setIsTransitioning(true);
    setVersions(prev => prev.map((v, i) => {
      if (i !== versionIndex) return v;
      const newIndex = direction === 'next' 
        ? Math.min(v.currentImageIndex + 1, v.predictions.length - 1)
        : Math.max(v.currentImageIndex - 1, 0);
      return {...v, currentImageIndex: newIndex};
    }));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="space-y-8">
          <Header />

          <div className="grid gap-8">
            <PromptInput
              prompt={prompt}
              isOptimizing={isOptimizing}
              onPromptChange={setPrompt}
              onSubmit={handleInitialSubmit}
            />

            {versions.length > 0 && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-900 text-white text-sm">3</span>
                    Generate Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-6">
                    {versions.map((version, index) => (
                      <div key={index} className="space-y-4">
                        <Card className="overflow-hidden">
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between items-start">
                              <p className="text-sm font-medium leading-relaxed">{version.prompt}</p>
                            </div>
                            
                            <Button 
                              onClick={() => handleGenerateImage(index)}
                              className="w-full h-10 text-base font-medium transition-all duration-200 hover:scale-[1.02]"
                              disabled={version.isGenerating}
                            >
                              {version.isGenerating ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Creating Magic...
                                </>
                              ) : (
                                "Generate New Image"
                              )}
                            </Button>
                          </div>
                        </Card>

                        {version.predictions.length > 0 && (
                          <ImageGallery
                            version={version}
                            versionIndex={index}
                            isTransitioning={isTransitioning}
                            transitionDirection={transitionDirection}
                            onGenerateImage={handleGenerateImage}
                            onDownloadImage={handleDownloadImage}
                            onDeleteImage={handleDeleteImage}
                            onNavigateImage={navigateImage}
                            onImageSelect={(versionIndex, predIndex) => 
                              setVersions(prev => prev.map((v, i) => 
                                i === versionIndex ? {...v, currentImageIndex: predIndex} : v
                              ))
                            }
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
