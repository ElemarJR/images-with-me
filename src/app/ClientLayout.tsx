'use client';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <div className="flex flex-1 flex-col gap-4 p-4">
        {children}
      </div>
    </div>
  );
}