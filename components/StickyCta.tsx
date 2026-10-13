"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { practice } from "@/lib/practice";

/**
 * Mobile-only conversion rail. It appears once the hero is behind the visitor
 * and hides again over the contact form so it never covers the fields.
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");
      const viewport = window.innerHeight;

      let contactVisible = false;
      if (contact) {
        const rect = contact.getBoundingClientRect();
        contactVisible = rect.top < viewport * 0.75 && rect.bottom > viewport * 0.25;
      }

      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < viewport * 0.35
        : window.scrollY > 420;

      setShow(pastHero && !contactVisible && window.innerWidth < 1024);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      data-testid="sticky-cta"
      data-visible={show}
       className={`glass-nav fixed inset-x-0 bottom-0 z-40 border-t border-brand-secondary/80 px-4 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-3 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="flex items-center gap-3">
        <a
          href={practice.phoneHref}
          tabIndex={show ? undefined : -1}
          className="pressable flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-secondary bg-brand-cream text-brand-primary"
          aria-label={`Call the practice at ${practice.phoneDisplay}`}
        >
          <Phone aria-hidden="true" size={18} />
        </a>
        <Link
          href="#contact"
          tabIndex={show ? undefined : -1}
          className="pressable flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-primary text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-md"
        >
          <CalendarCheck aria-hidden="true" size={16} />
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
