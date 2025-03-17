"use client";

import * as React from "react";
import { CheckIcon, XCircle, Filter, Search,
  Pizza, Coffee, Beef, Apple, Sandwich, Fish,
  UtensilsCrossed, Salad, Egg, IceCream, Bean,
  Drumstick, Soup, Martini, Croissant,
  Flame, ChefHat, Wheat, Citrus,
  Banana, Milk, Grape, Utensils, Leaf, Palette, GlassWater,
  WandSparkles, Wine, Carrot, CakeSlice, ShoppingBag,
  Cookie, Candy, Ham} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CuisineDetail {
  SeoName: string;
  Name: string;
  Total: number;
}

interface CuisineFilterProps {
  cuisines: CuisineDetail[];
  selectedCuisines: string[];
  onCuisineChange: (seoName: string) => void;
  onClearFilters: () => void;
}

// Map cuisine names to appropriate icons
const getCuisineIcon = (cuisineName: string) => {
  const name = cuisineName.toLowerCase();

  // Pizza & Italian
  if (name.includes("pizza")) return Pizza;
  if (name.includes("italian") || name.includes("pasta")) return ChefHat;

  // Beverages
  if (name.includes("coffee") || name.includes("café")) return Coffee;
  if (name.includes("smoothie") || name.includes("juice")) return GlassWater;
  if (name.includes("wine") || name.includes("liquor")) return Wine;
  if (name.includes("bubble tea") || name.includes("boba")) return GlassWater;

  // Meat & Protein
  if (name.includes("steak") || name.includes("beef")) return Beef;
  if (name.includes("chicken") || name.includes("wings")) return Drumstick;
  if (name.includes("burger")) return Beef;
  if (name.includes("bbq") || name.includes("barbecue") || name.includes("grill")) return Flame;
  if (name.includes("bacon") || name.includes("pork")) return Beef;
  if (name.includes("american")) return Ham;

  // Healthy
  if (name.includes("vegan") || name.includes("vegetarian")) return Apple;
  if (name.includes("salad") || name.includes("greens")) return Salad;
  if (name.includes("health") || name.includes("organic")) return Leaf;
  if (name.includes("fitness") || name.includes("protein")) return Utensils;

  // Breakfast
  if (name.includes("breakfast") || name.includes("brunch")) return Egg;
  if (name.includes("bagel") || name.includes("toast")) return Wheat;
  if (name.includes("bakery") || name.includes("pastry")) return Croissant;

  // Sandwiches & Similar
  if (name.includes("sandwich") || name.includes("sub")) return Sandwich;
  if (name.includes("wrap") || name.includes("pita")) return Sandwich;

  // Seafood
  if (name.includes("fish") || name.includes("seafood")) return Fish;
  if (name.includes("sushi") || name.includes("sashimi")) return Fish;
  if (name.includes("poke") || name.includes("seaweed")) return Fish;

  // Asian Cuisines
  if (name.includes("chinese")) return Utensils;
  if (name.includes("japanese") && !name.includes("sushi")) return Bean;
  if (name.includes("thai")) return Citrus;
  if (name.includes("vietnamese") || name.includes("pho")) return Soup;
  if (name.includes("korean") || name.includes("bibimbap")) return UtensilsCrossed;
  if (name.includes("indian") || name.includes("curry")) return Citrus;
  if (name.includes("asian") && !name.includes("sushi")) return Utensils;

  // Latin American
  if (name.includes("mexican") || name.includes("taco")) return Citrus;
  if (name.includes("latin") || name.includes("spanish")) return Citrus;
  if (name.includes("caribbean")) return Banana;

  // European
  if (name.includes("french")) return ChefHat;
  if (name.includes("greek") || name.includes("mediterranean")) return Grape;
  if (name.includes("german") || name.includes("polish")) return Beef;

  // Middle Eastern
  if (name.includes("middle eastern") || name.includes("lebanese")) return Utensils;
  if (name.includes("falafel") || name.includes("hummus")) return Citrus;

  // Desserts & Sweets
  if (name.includes("ice cream") || name.includes("gelato")) return IceCream;
  if (name.includes("sweet") || name.includes("dessert")) return CakeSlice;
  if (name.includes("candy") || name.includes("chocolate")) return Candy;
  if (name.includes("cookie") || name.includes("biscuit")) return Cookie;
  if (name.includes("cake") || name.includes("pastry")) return CakeSlice;

  // Food Categories
  if (name.includes("soup") || name.includes("stew")) return Soup;
  if (name.includes("bar") || name.includes("pub")) return Martini;
  if (name.includes("fast food")) return ShoppingBag;
  if (name.includes("street food")) return WandSparkles;
  if (name.includes("gourmet") || name.includes("fine dining")) return Palette;

  // Produce
  if (name.includes("fruit") || name.includes("berry")) return Grape;
  if (name.includes("vegetable")) return Carrot;

  // Dairy
  if (name.includes("cheese")) return Milk;
  if (name.includes("milk") || name.includes("dairy")) return Milk;

  // Default icon
  return UtensilsCrossed;
};

/**
 * CuisineFilter component following PIE Design System
 */
export function CuisineFilter({
  cuisines,
  selectedCuisines,
  onCuisineChange,
  onClearFilters,
}: CuisineFilterProps) {
  const [searchText, setSearchText] = React.useState("");

  // Sort cuisines by count and filter by search text
  const filteredCuisines = React.useMemo(() => {
    return [...cuisines]
      .sort((a, b) => b.Total - a.Total)
      .filter((cuisine) =>
        cuisine.Name.toLowerCase().includes(searchText.toLowerCase())
      );
  }, [cuisines, searchText]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold flex items-center text-neutral-900 dark:text-white">
          <Filter className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
          Filter by Cuisine
        </h3>
        {selectedCuisines.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-8 px-2.5 text-xs hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-colors"
            aria-label="Clear all filters"
          >
            <XCircle className="h-3.5 w-3.5 mr-1.5" />
            Clear ({selectedCuisines.length})
          </Button>
        )}
      </div>

      {cuisines.length === 0 ? (
        <div className="text-sm text-neutral-500 dark:text-neutral-400 py-2 italic">
          No cuisines available for filtering
        </div>
      ) : (
        <>
          <div className="mb-3 relative">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search cuisines..."
              className="w-full h-9 px-3 pl-9 rounded-md text-sm
                bg-white dark:bg-neutral-900
                border border-neutral-200 dark:border-neutral-800
                text-neutral-900 dark:text-white
                placeholder:text-neutral-500 dark:placeholder:text-neutral-400
                focus:outline-none focus:ring-2 focus:ring-primary-500/20
                focus:border-primary-500/30"
            />
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-neutral-500 dark:text-neutral-400" />
          </div>
          <div className="h-[330px] pr-3 -mr-3 overflow-y-auto
            scrollbar-thin
            scrollbar-thumb-rounded-full
            scrollbar-track-transparent
            scrollbar-thumb-neutral-200
            hover:scrollbar-thumb-neutral-300
            dark:scrollbar-thumb-neutral-800
            dark:hover:scrollbar-thumb-neutral-700">
            <div className="grid grid-cols-1 gap-2">
              {filteredCuisines.map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine.SeoName);
                const Icon = getCuisineIcon(cuisine.Name);

                return (
                  <button
                    key={cuisine.SeoName}
                    onClick={() => onCuisineChange(cuisine.SeoName)}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200",
                      "border focus:outline-none focus:ring-2 focus:ring-primary-500/20",
                      "hover:border-primary-500/30 hover:scale-[1.02]",
                      isSelected
                        ? "bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-950/30 dark:text-primary-300 dark:border-primary-900/50"
                        : "border-neutral-200 bg-white text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
                    )}
                    aria-checked={isSelected}
                    role="checkbox"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span data-testid={`cuisine-name-${cuisine.SeoName}`}>
                        {cuisine.Name}
                      </span>
                      <span className="text-xs text-neutral-500">({cuisine.Total})</span>
                    </div>
                    {isSelected && <CheckIcon className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {selectedCuisines.length > 0 && (
        <div className="mt-5 pt-5 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="bg-primary-100 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 px-2 py-0.5 rounded-md text-xs font-semibold">
              {selectedCuisines.length}
            </span>
            <p
              className="text-sm text-neutral-600 dark:text-neutral-400"
              data-testid="cuisine-selection-text"
            >
              {selectedCuisines.length === 1 ? 'cuisine' : 'cuisines'} selected
            </p>
          </div>
          <p className="text-sm font-medium line-clamp-2 text-neutral-900 dark:text-white">
            {selectedCuisines.map((seoName) => {
              const cuisine = cuisines.find(c => c.SeoName === seoName);
              return cuisine ? cuisine.Name : '';
            }).filter(Boolean).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
