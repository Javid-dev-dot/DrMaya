"use client";

import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { useSpotlight } from "@/lib/useMicroInteractions";

interface SpecialtyCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  signals: string;
  index: number;
}

/** Specialty panel with a cursor-tracked rim light and a reveal-on-hover detail. */
export default function SpecialtyCard({
  title,
  subtitle,
  description,
  icon,
  signals,
  index,
}: SpecialtyCardProps) {
  const spotlight = useSpotlight<HTMLElement>();

  return (
    <article
      onPointerMove={spotlight.onPointerMove}
      tabIndex={0}
      className="spotlight pressable group flex h-full flex-col justify-between rounded-3xl border border-brand-secondary/40 bg-brand-cream p-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary sm:p-10"
    >
      <div>
        <div className="mb-6 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-sand text-brand-primary transition-transform duration-500 group-hover:-rotate-6 group-hover:bg-brand-primary group-hover:text-brand-cream">
            {icon}
          </span>
          <span className="tabular font-sans text-[0.65rem] tracking-[0.3em] text-brand-muted/60">
            0{index + 1}
          </span>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-medium text-brand-dark sm:text-3xl">{title}</h3>
        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-accent">
          {subtitle}
        </p>
        <p className="font-sans leading-relaxed text-brand-muted">{description}</p>
      </div>

      <p className="mt-6 flex items-start gap-2 border-t border-brand-secondary/30 pt-5 font-sans text-xs text-brand-muted">
        <ArrowUpRight
          aria-hidden="true"
          size={15}
          className="mt-0.5 shrink-0 text-brand-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span>
          <span className="font-semibold text-brand-dark">Common signals: </span>
          {signals}
        </span>
      </p>
    </article>
  );
}
