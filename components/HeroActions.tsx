"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useMagnetic } from "@/lib/useMicroInteractions";

/** Pointer-reactive hero calls to action. */
export default function HeroActions() {
  const primary = useMagnetic<HTMLAnchorElement>(0.22);
  const secondary = useMagnetic<HTMLAnchorElement>(0.22);

  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="#contact"
        onPointerMove={primary.onPointerMove}
        onPointerLeave={primary.onPointerLeave}
        className="magnetic sheen inline-flex items-center gap-2 rounded-full bg-brand-primary px-9 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-lg shadow-brand-dark/30 hover:bg-brand-teal-light hover:text-brand-dark dark:hover:bg-brand-teal-light dark:hover:text-[#08121F]"
      >
        <Sparkles aria-hidden="true" size={15} />
        Book Consultation
      </Link>
      <Link
        href="#about"
        onPointerMove={secondary.onPointerMove}
        onPointerLeave={secondary.onPointerLeave}
        className="magnetic inline-flex items-center gap-2 rounded-full border border-brand-teal-light/80 px-9 py-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-teal-light hover:bg-brand-teal-light hover:text-brand-dark dark:hover:bg-brand-teal-light dark:hover:text-[#08121F]"
      >
        Learn About Dr. Maya
      </Link>
    </div>
  );
}
