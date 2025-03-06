"use client";

import * as React from "react";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { SearchIcon, Loader2, MapPin, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  onSearch: (outcode: string) => void;
  initialOutcode?: string;
  isLoading?: boolean;
}

/**
 * SearchForm component following PIE Design System
 */
export function SearchForm({
  onSearch,
  initialOutcode = "",
  isLoading = false
}: SearchFormProps) {
  const [outcode, setOutcode] = useState(initialOutcode);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus the input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const validateOutcode = (value: string): boolean => {
    if (value.length < 2) {
      setError("Outcode must be at least 2 characters");
      return false;
    }

    if (value.length > 4) {
      setError("Outcode must be at most 4 characters");
      return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setError("Outcode must contain only letters and numbers");
      return false;
    }

    setError(null);
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOutcode(value);
    if (submitted || error) {
      validateOutcode(value);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (validateOutcode(outcode)) {
      onSearch(outcode.toLowerCase());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 justify-center">
        <MapPin className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
        <p>Enter an outcode (first part of UK postcode, e.g., "ec4m", "w1", "m60")</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex flex-col sm:flex-row w-full gap-3",
          focused ? "z-10" : ""
        )}
      >
        <div className="flex-1 min-w-0">
          <Input
            ref={inputRef}
            value={outcode}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter outcode (e.g. ec4m)"
            error={!!error}
            helperText={error || undefined}
            className="h-12 text-base bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800/80 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-600"
            disabled={isLoading}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "outcode-error" : undefined}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-medium shadow-sm dark:shadow-xl dark:shadow-primary-950/20"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
