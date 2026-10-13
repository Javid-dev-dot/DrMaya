import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  headingId?: string;
  tone?: "light" | "dark";
}

/**
 * Shared section intro: eyebrow label, serif headline, optional lede.
 * `data-text-reveal` hooks into the scroll choreography in ScrollReveal.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  headingId,
  tone = "light",
}: SectionHeadingProps) {
  const centered = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p
        data-reveal-eyebrow
        className={`mb-3 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm ${
          isDark ? "text-brand-teal-light" : "text-brand-primary"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-px w-6 ${isDark ? "bg-brand-teal-light/70" : "bg-brand-accent/70"}`}
        />
        {eyebrow}
      </p>
      <h2
        id={headingId}
        data-text-reveal
        className={`font-serif text-4xl font-light leading-[1.12] tracking-tight sm:text-5xl ${
          isDark ? "text-brand-cream" : "text-brand-dark"
        }`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          data-reveal-text
          className={`mt-6 text-lg leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${isDark ? "text-brand-cream/80" : "text-brand-muted"}`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
