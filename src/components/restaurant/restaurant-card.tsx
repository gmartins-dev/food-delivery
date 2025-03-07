"use client";

import Image from "next/image";
import { Restaurant } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon, Clock, MapPin, Tag, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getFoodImageForRestaurant } from "@/lib/food-images";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onCuisineClick?: (seoName: string) => void;
}

/**
 * RestaurantCard component following PIE Design System
 */
export function RestaurantCard({ restaurant, onCuisineClick }: RestaurantCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get a cuisine-appropriate food image for this restaurant
  const foodImageUrl = getFoodImageForRestaurant(restaurant);

  return (
    <Card
      className={cn(
        "overflow-hidden h-full flex flex-col border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900",
        "transition-all duration-300 ease-in-out",
        isHovered
          ? "shadow-xl dark:shadow-2xl dark:shadow-neutral-950/50 translate-y-[-6px] border-primary-200 dark:border-primary-900/40"
          : "shadow-md dark:shadow-lg dark:shadow-neutral-950/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-0 relative">
        <div className="relative h-48 w-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
          {/* Food image background */}
          <Image
            src={foodImageUrl}
            alt={`${restaurant.name} food`}
            fill
            className={cn(
              "object-cover transition-all duration-700 ease-out",
              isHovered ? "scale-110 filter brightness-105" : ""
            )}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Restaurant logo overlay */}
          {restaurant.logoUrl && !imageError && (
            <div className="absolute bottom-3 right-3 h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-neutral-800 shadow-md">
              <Image
                src={restaurant.logoUrl}
                alt={`${restaurant.name} logo`}
                fill
                className="object-cover"
                sizes="64px"
                onError={() => setImageError(true)}
              />
            </div>
          )}

          {/* Closed restaurant overlay */}
          {!restaurant.isOpenNow && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10">
                <span className="text-white font-medium text-sm">Currently Closed</span>
              </div>
            </div>
          )}

          {/* Rating badge */}
          <div className="absolute top-3 left-3">
            <div className={cn(
              "flex items-center gap-1 px-2 py-1 rounded-md bg-white dark:bg-neutral-900 shadow-sm",
              "transition-all duration-300",
              isHovered ? "shadow-md scale-105" : ""
            )}>
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold text-neutral-800 dark:text-white">
                {restaurant.rating.starRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className={cn(
          "font-semibold text-lg line-clamp-1 text-neutral-900 dark:text-white",
          "group-hover:line-clamp-none transition-all duration-300",
          isHovered ? "text-primary-700 dark:text-primary-400" : ""
        )}>
          {restaurant.name}
          {isHovered && (
            <ExternalLink className="inline-block ml-1.5 h-4 w-4 text-primary-400 dark:text-primary-500 animate-pulse" />
          )}
        </h3>

        <div className="mt-3 space-y-2 flex-1">
          {restaurant.address?.firstLine && (
            <div className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <MapPin className={cn(
                "h-3.5 w-3.5 flex-shrink-0",
                isHovered ? "text-primary-600 dark:text-primary-500" : "opacity-70"
              )} />
              <span className="line-clamp-1">{restaurant.address.firstLine}</span>
            </div>
          )}

          {restaurant.deliveryEtaMinutes && (
            <div className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
              <Clock className={cn(
                "h-3.5 w-3.5 flex-shrink-0",
                isHovered ? "text-primary-600 dark:text-primary-500" : "opacity-70"
              )} />
              <span>Delivery: {restaurant.deliveryEtaMinutes.rangeLower}-{restaurant.deliveryEtaMinutes.rangeUpper} min</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wide flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Cuisines
            </p>
            {restaurant.cuisines.length > 3 && (
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                +{restaurant.cuisines.length - 3} more
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {restaurant.cuisines.slice(0, 3).map((cuisine) => (
              <Badge
                key={cuisine.SeoName}
                variant="secondary"
                className={cn(
                  "text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700",
                  "transition-all duration-200 cursor-pointer",
                  isHovered ? "translate-y-[-2px]" : ""
                )}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onCuisineClick?.(cuisine.SeoName);
                }}
              >
                {cuisine.Name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
