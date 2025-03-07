"use client";

import * as React from "react";
import { Restaurant } from "@/lib/api";
import { RestaurantCard } from "./restaurant-card";
import { RestaurantSkeleton } from "./loading-skeleton";
import { Frown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
  onCuisineClick?: (seoName: string) => void;
}

export function RestaurantGrid({ restaurants, isLoading = false, onCuisineClick }: RestaurantGridProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(restaurants.length / itemsPerPage);

  const paginatedRestaurants = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return restaurants.slice(start, end);
  }, [restaurants, currentPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <RestaurantSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="col-span-full py-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="rounded-full bg-muted p-6">
          <Frown className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">No restaurants found</h3>
          <p className="text-muted-foreground max-w-md">
            Try searching for a different outcode or clearing your cuisine filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {paginatedRestaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onCuisineClick={onCuisineClick}
        />
      ))}

      {totalPages > 1 && (
        <div className="col-span-full flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </Button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
