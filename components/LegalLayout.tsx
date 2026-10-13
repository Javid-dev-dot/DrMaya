import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Clock } from "lucide-react";

interface LegalLayoutProps {
  eyebrow: string;
  title: string;
  updated: string;
  summary: string;
  children: ReactNode;
}

/** Shared shell for the practice's policy pages. */
export default function LegalLayout({
  eyebrow,
  title,
  updated,
  summary,
  children,
}: LegalLayoutProps) {
  return (
    <main id="main" className="min-h-screen bg-brand-cream pb-24 pt-32 lg:pb-32">
      <div className="layout-container max-w-3xl">
        <Link
          href="/"
          className="underline-sweep mb-8 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
        >
          <ArrowLeft aria-hidden="true" size={14} />
          Back to home
        </Link>

        <p className="mb-3 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-brand-accent/70" />
          {eyebrow}
        </p>
        <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-tight text-brand-dark sm:text-5xl">
          {title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-brand-muted">{summary}</p>

        <p className="mt-6 inline-flex items-center gap-2 font-sans text-xs text-brand-muted">
          <Clock aria-hidden="true" size={14} className="text-brand-primary" />
          Last updated {updated}
        </p>

        <div className="mt-12 space-y-10">{children}</div>
      </div>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-brand-secondary/40 pt-8">
      <h2 className="mb-4 font-serif text-2xl font-medium text-brand-dark">{heading}</h2>
      <div className="space-y-4 font-sans text-base leading-relaxed text-brand-muted">
        {children}
      </div>
    </section>
  );
}
