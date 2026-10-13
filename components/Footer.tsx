import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Copyright from "@/components/Copyright";
import { practice } from "@/lib/practice";

const columns = [
  {
    title: "Practice",
    links: [
      { label: "About Dr. Reynolds", href: "#about" },
      { label: "Therapeutic approach", href: "#approach" },
      { label: "Clinical specialties", href: "#specialties" },
      { label: "Santa Monica office", href: "#office" },
    ],
  },
  {
    title: "Visiting",
    links: [
      { label: "Frequently asked questions", href: "#faq" },
      { label: "Book a consultation", href: "#contact" },
      { label: "Call the practice", href: practice.phoneHref },
      { label: "Get directions", href: practice.mapHref },
    ],
  },
];

const legal = [
  { label: "Privacy notice", href: "/privacy" },
  { label: "Good Faith Estimate", href: "/good-faith-estimate" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-brand-primary/20 bg-brand-dark py-16 text-white">
      <div className="layout-container">
        <div className="mb-12 grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-light text-brand-cream">
              {practice.name}
            </h2>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/70">
              Evidence-based therapy for anxiety, trauma, and burnout. In-person in Santa
              Monica and secure telehealth across California.
            </p>
            <ul className="mt-6 space-y-3 font-sans text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" size={16} className="mt-0.5 shrink-0 text-brand-teal-light" />
                <a href={practice.mapHref} target="_blank" rel="noreferrer noopener" className="underline-sweep">
                  {practice.addressLines.join(", ")}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden="true" size={16} className="shrink-0 text-brand-teal-light" />
                <a href={practice.phoneHref} className="underline-sweep">
                  {practice.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden="true" size={16} className="shrink-0 text-brand-teal-light" />
                <a href={practice.emailHref} className="underline-sweep">
                  {practice.emailDisplay}
                </a>
              </li>
            </ul>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-brand-teal-light">
                {column.title}
              </h3>
              <ul className="space-y-2.5 font-sans text-sm text-white/75">
                {column.links.map((link) => (
                  <li key={link.label + link.href}>
                    <Link
                      href={link.href}
                      className="underline-sweep transition-colors hover:text-brand-teal-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="font-sans text-xs leading-relaxed text-white/70">
            <span className="font-semibold text-white">In crisis?</span> This practice cannot
            respond to emergencies. Call or text{" "}
            <a href={practice.crisisHref} className="font-semibold text-brand-teal-light underline">
              {practice.crisisLine}
            </a>{" "}
            to reach the {practice.crisisLabel}, available 24/7. For immediate danger, dial 911.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <Copyright />
          <div className="flex flex-wrap items-center gap-5">
            {legal.map((link) => (
              <Link key={link.href} href={link.href} className="underline-sweep hover:text-white">
                {link.label}
              </Link>
            ))}
            <a
              href="#hero"
              className="inline-flex items-center gap-1.5 hover:text-white"
              aria-label="Back to top"
            >
              <ArrowUp aria-hidden="true" size={14} />
              Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
