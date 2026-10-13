"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

const THEME_QUERY = "(prefers-color-scheme: dark)";

const listListeners = new Set<() => void>();

function emit() {
  for (const listener of listListeners) listener();
}

/** Returns an explicitly stored choice, or null when the user has not chosen. */
function readStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage may be unavailable (private mode) — fall through to OS pref
  }
  return null;
}

/** Stored choice wins; otherwise follow the OS colour-scheme preference. */
function resolveTheme(): Theme {
  const stored = readStoredTheme();
  if (stored) return stored;
  return window.matchMedia(THEME_QUERY).matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
  root.style.colorScheme = theme;
}

const getSnapshot = (): Theme => resolveTheme();
// The server has no access to localStorage or the OS preference, so it always
// renders the light state. useSyncExternalStore re-reads the snapshot right
// after hydration and re-renders, which keeps hydration mismatch-free.
const getServerSnapshot = (): Theme => "light";

function subscribe(onChange: () => void) {
  listListeners.add(onChange);

  const media = window.matchMedia(THEME_QUERY);
  const onMediaChange = (event: MediaQueryListEvent) => {
    // Only follow the OS while the visitor has not picked a theme explicitly.
    if (!readStoredTheme()) {
      applyTheme(event.matches ? "dark" : "light");
      emit();
    }
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      applyTheme(resolveTheme());
      emit();
    }
  };

  media.addEventListener("change", onMediaChange);
  window.addEventListener("storage", onStorage);

  return () => {
    listListeners.delete(onChange);
    media.removeEventListener("change", onMediaChange);
    window.removeEventListener("storage", onStorage);
  };
}

/**
 * Reads and persists the light/dark theme.
 *
 * The pre-paint script in `app/layout.tsx` stamps the resolved theme onto
 * `<html data-theme>` before first paint so the correct palette shows with no
 * flash; this hook drives the toggle and keeps the DOM, `localStorage` and the
 * OS preference in sync.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore write failures (e.g. storage disabled)
    }
    emit();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  // Re-apply on mount and whenever the theme changes, so the DOM always
  // reflects the current snapshot even if the pre-paint script did not run.
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme } as const;
}
