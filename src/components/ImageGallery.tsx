import React from 'react';
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Version } from '@/types/types';
import { ImageControls } from './ImageControls';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface ImageGalleryProps {
  version: Version;
  versionIndex: number;
  onGenerateImage: (versionIndex: number, predictionIndex?: number) => void;
  onDownloadImage: (imageUrl: string) => void;
  onDeleteImage: (versionIndex: number, predictionIndex: number) => void;
}

export function ImageGallery({
  version,
  versionIndex,
  onGenerateImage,
  onDownloadImage,
  onDeleteImage,
}: ImageGalleryProps) {
  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {version.predictions.map((prediction, predictionIndex) => (
            <CarouselItem key={predictionIndex}>
              <Card className="overflow-hidden">
                <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                  <div className="absolute inset-0">
                    {prediction?.output ? (
                      <Image
                        src={prediction.output[0]}
                        alt={`Generated image ${predictionIndex + 1}`}
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
} 