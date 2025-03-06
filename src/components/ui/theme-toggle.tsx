"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";
import { Button } from "./button";

/**
 * ThemeToggle component following PIE Design System
 */
export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-full w-9 h-9",
        "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800/70",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-1",
        "transition-colors duration-200 ease-in-out",
        theme === "dark" ? "bg-neutral-800/30" : "",
        className
      )}
      {...props}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-indigo-300" />
      <span className="sr-only">
        {theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      </span>
    </Button>
  );
}
