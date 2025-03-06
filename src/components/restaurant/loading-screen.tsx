"use client";

import { Loader2 } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 max-w-md text-center px-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Loading restaurants...</h2>
        <p className="text-muted-foreground">
          Fetching the best restaurants that deliver to your area.
        </p>
      </div>
    </div>
  );
}
