import React from 'react';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Version } from '@/types/types';
import { ImageControls } from './ImageControls';
import { NavigationButtons } from './NavigationButtons';
import { ImageDots } from './ImageDots';

interface ImageGalleryProps {
  version: Version;
  versionIndex: number;
  isTransitioning: boolean;
  transitionDirection: 'left' | 'right';
  onGenerateImage: (versionIndex: number, predictionIndex?: number) => void;
  onDownloadImage: (imageUrl: string) => void;
  onDeleteImage: (versionIndex: number, predictionIndex: number) => void;
  onNavigateImage: (versionIndex: number, direction: 'prev' | 'next') => void;
  onImageSelect: (versionIndex: number, predictionIndex: number) => void;
}

export function ImageGallery({
  version,
  versionIndex,
  isTransitioning,
  transitionDirection,
  onGenerateImage,
  onDownloadImage,
  onDeleteImage,
  onNavigateImage,
  onImageSelect
}: ImageGalleryProps) {
  return (
    <div className="relative">
      <Card className="overflow-hidden">
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <div className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
            isTransitioning 
              ? transitionDirection === 'right' 
                ? 'transform translate-x-full' 
                : 'transform -translate-x-full'
              : ''
          }`}>
            {version.predictions[version.currentImageIndex]?.output ? (
              <Image
                src={version.predictions[version.currentImageIndex].output[0]}
                alt={`Generated image ${version.currentImageIndex + 1}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
          <ImageControls
            version={version}
            versionIndex={versionIndex}
            onGenerateImage={onGenerateImage}
            onDownloadImage={onDownloadImage}
            onDeleteImage={onDeleteImage}
          />
        </div>
      </Card>
      
      <NavigationButtons
        version={version}
        versionIndex={versionIndex}
        onNavigateImage={onNavigateImage}
      />

      <ImageDots
        version={version}
        versionIndex={versionIndex}
        onImageSelect={onImageSelect}
      />
    </div>
  );
} 