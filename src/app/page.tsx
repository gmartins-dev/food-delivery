"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getRestaurantsByOutcode, type Restaurant, type SearchResponse } from "@/lib/api";
import { SearchForm } from "@/components/restaurant/search-form";
import { CuisineFilter } from "@/components/restaurant/cuisine-filter";
import { RestaurantGrid } from "@/components/restaurant/restaurant-grid";
import { MapPin as MapPinIcon, AlertTriangle } from "lucide-react";
import { LoadingScreen } from "@/components/restaurant/loading-screen";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOutcode = searchParams.get("outcode") || "";

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResponse | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      if (!currentOutcode) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await getRestaurantsByOutcode(currentOutcode);
        setRestaurants(data.restaurants);
        setResults(data);
      } catch (err) {
        setError("Failed to load restaurants. Please try again.");
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRestaurants();
  }, [currentOutcode]);

  const cuisines = useMemo(() => {
    if (!restaurants.length) return [];

    const cuisineMap = new Map<string, { id: string; name: string }>();

    restaurants.forEach((restaurant) => {
      restaurant.cuisines.forEach((cuisine) => {
        if (!cuisineMap.has(cuisine.id)) {
          cuisineMap.set(cuisine.id, cuisine);
        }
      });
    });

    return Array.from(cuisineMap.values());
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    if (!restaurants.length) return [];

    if (selectedCuisines.length === 0) {
      return restaurants;
    }

    return restaurants.filter((restaurant) =>
      restaurant.cuisines.some((cuisine) =>
        selectedCuisines.includes(cuisine.id)
      )
    );
  }, [restaurants, selectedCuisines]);

  const handleSearch = async (outcode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      router.replace(`/?outcode=${outcode}`);
      const data = await getRestaurantsByOutcode(outcode);
      setRestaurants(data.restaurants);
      setResults(data);
    } catch (err) {
      setError('Failed to load restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCuisineChange = (cuisineId: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisineId)
        ? prev.filter((id) => id !== cuisineId)
        : [...prev, cuisineId]
    );
  };

  const clearFilters = () => {
    setSelectedCuisines([]);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950">
      <div className="container px-4 py-12 sm:py-20 max-w-[1400px] mx-auto">
        <section className="w-full max-w-2xl mx-auto space-y-8">
          <div className="space-y-3 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Find restaurants near you
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto">
              Enter your outcode to discover restaurants that deliver to your area
            </p>
          </div>
          <div className="w-full max-w-xl mx-auto">
            <SearchForm
              onSearch={handleSearch}
              initialOutcode={currentOutcode}
              isLoading={isLoading}
            />
          </div>
        </section>

        {error ? (
          <div className="rounded-xl p-6 border border-red-200 bg-red-50 dark:bg-red-950/50 dark:border-red-900/50 max-w-2xl mx-auto mt-8 flex gap-3 items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <p className="font-medium text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : null}

        {currentOutcode && !isLoading && restaurants.length === 0 ? (
          <div className="rounded-xl p-6 border border-amber-200 bg-amber-50 dark:bg-amber-950/50 dark:border-amber-900/50 max-w-2xl mx-auto mt-8">
            <p className="font-medium text-amber-900 dark:text-amber-200">No restaurants found for outcode "{currentOutcode.toUpperCase()}"</p>
            <p className="text-amber-700 dark:text-amber-300/80 mt-2">Try searching for a different outcode.</p>
          </div>
        ) : null}

        {currentOutcode && restaurants.length > 0 ? (
          <section className="max-w-[1400px] mx-auto mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
              <aside className="w-full lg:sticky lg:top-8 h-fit">
                <div className="rounded-xl border border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 p-6 shadow-sm dark:shadow-2xl dark:shadow-neutral-950/50">
                  <CuisineFilter
                    cuisines={cuisines}
                    selectedCuisines={selectedCuisines}
                    onCuisineChange={handleCuisineChange}
                    onClearFilters={clearFilters}
                  />
                </div>
              </aside>

              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white">
                    {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'Restaurant' : 'Restaurants'}
                    {selectedCuisines.length > 0 ? ' (Filtered)' : ''}
                  </h2>
                  <div className="text-sm bg-neutral-100 dark:bg-neutral-800/50 px-4 py-2 rounded-full inline-flex items-center self-start md:self-auto border border-neutral-200/50 dark:border-neutral-700/50">
                    <MapPinIcon className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
                    <span className="text-neutral-600 dark:text-neutral-300">
                      Results for <span className="font-medium text-neutral-900 dark:text-white">{currentOutcode.toUpperCase()}</span>
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <RestaurantGrid
                    restaurants={filteredRestaurants}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {isLoading && <LoadingScreen />}
      </div>
    </main>
  );
}
