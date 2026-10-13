"use client";

import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/lib/useMicroInteractions";

/**
 * Reading-progress rail at the top of the viewport plus a back-to-top control
 * that fades in once the visitor passes the first viewport.
 */
export default function ScrollProgress() {
  const { progress, scrolled } = useScrollProgress();

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      >
        <div
          data-testid="scroll-progress-bar"
          className="h-full origin-left bg-gradient-to-r from-brand-primary via-brand-teal-light to-brand-accent"
          style={{ scale: `${progress} 1` }}
        />
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        data-visible={scrolled}
        className="pressable fixed bottom-6 right-5 z-40 hidden h-12 w-12 translate-y-3 items-center justify-center rounded-full border border-brand-secondary/60 bg-brand-cream/95 text-brand-primary opacity-0 shadow-lg backdrop-blur transition-opacity duration-300 data-[visible=true]:pointer-events-auto data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 lg:flex"
      >
        <ArrowUp aria-hidden="true" size={18} />
      </button>
    </>
  );
}
