"use client";

import * as React from "react";
import { Restaurant } from "@/lib/api";
import { RestaurantCard } from "./restaurant-card";
import { UtensilsCrossed, Frown } from "lucide-react";

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
}

export function RestaurantGrid({ restaurants, isLoading = false }: RestaurantGridProps) {
  if (isLoading) {
    return null; // Loading state handled in parent component
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
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </>
  );
}
