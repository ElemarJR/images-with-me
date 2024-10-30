import React from 'react';
import { Version } from '@/types/types';

interface ImageDotsProps {
  version: Version;
  versionIndex: number;
  onImageSelect: (versionIndex: number, predictionIndex: number) => void;
}

export function ImageDots({
  version,
  versionIndex,
  onImageSelect
}: ImageDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-2">
      {version.predictions.map((_, predIndex) => (
        <button
          key={predIndex}
          className={`w-2 h-2 rounded-full transition-all ${
            predIndex === version.currentImageIndex 
              ? 'bg-gray-800' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => onImageSelect(versionIndex, predIndex)}
        />
      ))}
    </div>
  );
} 