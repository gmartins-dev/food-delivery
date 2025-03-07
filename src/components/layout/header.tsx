"use client";

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

/**
 * Header component following PIE Design System
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 backdrop-blur supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-neutral-900/90 shadow-sm dark:shadow-xl dark:shadow-neutral-950/50">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="Just Eat Restaurant Finder"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <UtensilsCrossed className="h-5 w-5" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-lg font-bold leading-none text-primary dark:text-primary">Food Delivery</span>

          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-neutral-600 dark:text-neutral-300 hidden md:flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800/70"
          >
            <Avatar className="h-6 w-6 bg-neutral-100 dark:bg-neutral-800">
              <AvatarFallback className="text-xs text-primary dark:text-neutral-300 font-medium">G</AvatarFallback>
            </Avatar>
            <span>Guilherme</span>
          </Button>
          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden md:block mx-1" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
