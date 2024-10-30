import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Trash2 } from "lucide-react";
import { Version } from '@/types/types';

interface ImageControlsProps {
  version: Version;
  versionIndex: number;
  onGenerateImage: (versionIndex: number, predictionIndex?: number) => void;
  onDownloadImage: (imageUrl: string) => void;
  onDeleteImage: (versionIndex: number, predictionIndex: number) => void;
}

export function ImageControls({
  version,
  versionIndex,
  onGenerateImage,
  onDownloadImage,
  onDeleteImage
}: ImageControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 flex justify-between items-center">
      <div className="text-white">
        {version.currentImageIndex + 1} / {version.predictions.length}
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:text-white hover:bg-black/30"
          onClick={() => onDownloadImage(version.predictions[version.currentImageIndex].output[0])}
          disabled={!version.predictions[version.currentImageIndex]?.output}
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:text-white hover:bg-black/30"
          onClick={() => onGenerateImage(versionIndex, version.currentImageIndex)}
          disabled={version.isGenerating}
        >
          <RefreshCw className={`h-4 w-4 ${version.isGenerating ? 'animate-spin' : ''}`} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-white hover:text-white hover:bg-black/30"
          onClick={() => onDeleteImage(versionIndex, version.currentImageIndex)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 