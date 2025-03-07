import { Card } from "@/components/ui/card";

export function RestaurantSkeleton() {
  return (
    <Card className="overflow-hidden h-full animate-pulse">
      <div className="h-48 bg-neutral-200 dark:bg-neutral-800" />
      <div className="p-4 space-y-4">
        <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2" />
        <div className="space-y-2">
          <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-full" />
          <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded w-4/5" />
        </div>
      </div>
    </Card>
  );
}
