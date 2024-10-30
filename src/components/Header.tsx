import React from 'react';

export function Header() {
  return (
    <div className="space-y-3">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-center">
        Elemar JR AI Photos
      </h1>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl text-muted-foreground text-center">
          Generate professional photos of Elemar JR in three simple steps
        </p>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span className="px-2 py-1 bg-gray-100 rounded">1. Describe</span>
          <span>→</span>
          <span className="px-2 py-1 bg-gray-100 rounded">2. Optimize</span>
          <span>→</span>
          <span className="px-2 py-1 bg-gray-100 rounded">3. Generate</span>
        </div>
      </div>
    </div>
  );
}