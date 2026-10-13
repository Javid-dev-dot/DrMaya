"use client";

import { Moon, Sun } from "lucide-react";
import { useMagnetic } from "@/lib/useMicroInteractions";
import { useTheme } from "@/lib/useTheme";

/**
 * Light/dark mode switch. Reads the OS preference, respects an explicit choice
 * persisted in localStorage, and swaps the palette through `<html data-theme>`.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const magnetic = useMagnetic<HTMLButtonElement>(0.25);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      suppressHydrationWarning
      onClick={toggleTheme}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      data-testid="theme-toggle"
      className={`magnetic pressable flex h-11 w-11 items-center justify-center rounded-full border border-brand-secondary bg-brand-cream text-brand-primary transition-colors duration-300 hover:text-brand-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary dark:border-brand-secondary/60 dark:bg-brand-primary/15 dark:text-brand-teal-light dark:hover:bg-brand-primary/25 ${className}`}
    >
      {isDark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
