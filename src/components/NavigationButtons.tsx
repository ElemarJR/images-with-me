import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Version } from '@/types/types';

interface NavigationButtonsProps {
  version: Version;
  versionIndex: number;
  onNavigateImage: (versionIndex: number, direction: 'prev' | 'next') => void;
}

export function NavigationButtons({
  version,
  versionIndex,
  onNavigateImage
}: NavigationButtonsProps) {
  return (
    <>
      {version.currentImageIndex > 0 && (
        <Button
          variant="ghost"
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
          onClick={() => onNavigateImage(versionIndex, 'prev')}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
      )}
      
      {version.currentImageIndex < version.predictions.length - 1 && (
        <Button
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
          onClick={() => onNavigateImage(versionIndex, 'next')}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      )}
    </>
  );
} 