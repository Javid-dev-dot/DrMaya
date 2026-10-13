import type { Metadata } from "next";
import Link from "next/link";
import { Compass, SearchX } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
};

const suggestions = [
  { label: "About Dr. Reynolds", href: "/#about" },
  { label: "Clinical specialties", href: "/#specialties" },
  { label: "Santa Monica office", href: "/#office" },
  { label: "Frequently asked questions", href: "/#faq" },
  { label: "Book a consultation", href: "/#contact" },
  { label: "Privacy notice", href: "/privacy" },
];

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-screen items-center bg-brand-cream px-6 py-24">
      <div className="layout-container max-w-2xl text-center">
        <span className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
          <SearchX aria-hidden="true" size={30} />
        </span>
        <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-brand-primary">
          Error 404
        </p>
        <h1 className="font-serif text-4xl font-light leading-[1.1] tracking-tight text-brand-dark sm:text-5xl">
          This page has moved, or it never existed.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-brand-muted">
          Nothing here needs your attention. Use the links below to get back to the practice
          information, or start again from the home page.
        </p>

        <nav aria-label="Suggested pages" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-3">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="pressable inline-flex rounded-full border border-brand-secondary bg-brand-sand/60 px-5 py-2.5 font-sans text-xs font-medium tracking-wide text-brand-dark"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="pressable sheen inline-flex items-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white"
          >
            <Compass aria-hidden="true" size={15} />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
