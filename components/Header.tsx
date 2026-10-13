"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  useActiveSection,
  useBodyScrollLock,
  useEscape,
  useFocusTrap,
  useMagnetic,
  useScrollProgress,
} from "@/lib/useMicroInteractions";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/lib/useTheme";
import { practice } from "@/lib/practice";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Specialties", href: "#specialties" },
  { label: "Approach", href: "#approach" },
  { label: "Our Office", href: "#office" },
  { label: "FAQs", href: "#faq" },
] as const;

const sectionIds = ["hero", "about", "specialties", "approach", "office", "faq", "contact"];

export default function Header() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrolled } = useScrollProgress();
  const activeSection = useActiveSection(sectionIds);
  const menuRef = useFocusTrap<HTMLDivElement>(menuOpen);
  const cta = useMagnetic<HTMLAnchorElement>(0.2);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  useEscape(menuOpen, closeMenu);
  useBodyScrollLock(menuOpen);

  // Close the drawer when the viewport grows past the mobile breakpoint so the
  // desktop nav is never rendered behind an open overlay.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`glass-nav sticky top-0 z-40 border-b transition-[box-shadow,background-color,border-color] duration-300 ${
        scrolled
          ? "border-brand-secondary/90 shadow-[0_10px_30px_-18px_rgba(11,17,27,0.45)] data-[scrolled=true]"
          : "border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`layout-container flex items-center justify-between transition-[padding] duration-300 ${
          scrolled ? "py-2.5" : "py-4"
        }`}
      >
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark text-sm font-display font-semibold text-brand-cream transition-transform duration-500 group-hover:rotate-6 group-hover:bg-brand-primary"
          >
            MR
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-brand-dark transition-colors group-hover:text-brand-primary sm:text-xl">
              Dr. Maya Reynolds, PsyD
            </span>
            <span className="mt-1 hidden font-sans text-[0.62rem] uppercase tracking-[0.28em] text-brand-muted sm:block">
              Clinical Psychologist · Santa Monica
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-6 lg:gap-7">
          <a
            href={practice.phoneHref}
            className="hidden items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-brand-muted transition-colors hover:text-brand-primary xl:flex"
          >
            <Phone aria-hidden="true" size={15} />
            {practice.phoneDisplay}
          </a>

          <div className="hidden items-center gap-7 font-sans text-xs font-medium uppercase tracking-[0.14em] text-brand-dark lg:flex">
            {navItems.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeSection === id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  data-active={isActive}
                  className="nav-link transition-colors duration-200 hover:text-brand-primary"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Link
            href="#contact"
            onPointerMove={cta.onPointerMove}
            onPointerLeave={cta.onPointerLeave}
            className="magnetic sheen hidden rounded-full bg-brand-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-sm hover:bg-brand-dark hover:shadow-lg hover:shadow-brand-primary/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary lg:inline-flex"
          >
            Book Consultation
          </Link>

          <ThemeToggle />
          <button
            type="button"
            className="pressable flex h-11 w-11 items-center justify-center rounded-full text-brand-dark hover:bg-brand-sand lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        ref={menuRef}
        hidden={!menuOpen}
        className={`glass-nav absolute inset-x-0 top-full overflow-hidden border-b border-brand-secondary/60 px-6 shadow-lg transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col pb-4">
          {[...navItems, { label: "Book Consultation", href: "#contact" }].map((item, index) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;
            const isLast = index === navItems.length;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${80 + index * 45}ms` : "0ms" }}
                className={`flex min-h-12 items-center justify-between gap-3 border-b border-brand-secondary/80 py-3 text-sm transition-[opacity,translate,color] duration-300 ${
                  menuOpen ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
                } ${
                  isLast
                    ? "mt-2 justify-center rounded-full bg-brand-primary px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
                    : isActive
                      ? "text-brand-primary"
                      : "text-brand-dark"
                } ${isLast ? "border-transparent" : "hover:text-brand-primary"}`}
              >
                {item.label}
                {isActive && !isLast ? (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                ) : null}
              </Link>
            );
          })}
          <a
            href={practice.phoneHref}
            className="mt-3 flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-secondary px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-primary"
          >
            <Phone aria-hidden="true" size={15} />
            {practice.phoneDisplay}
          </a>
          <div className="mt-4 flex justify-center border-t border-brand-secondary/50 pt-4 lg:hidden">
          {/* Desktop-only: the mobile drawer carries its own toggle below. */}
          <ThemeToggle className="max-lg:hidden" />
            <span className="ml-3 self-center font-sans text-xs font-medium uppercase tracking-[0.14em] text-brand-muted">
              {theme === "dark" ? "Dark mode" : "Light mode"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
