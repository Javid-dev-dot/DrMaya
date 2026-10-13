"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll choreography for section intros and media.
 *
 * Each animation plays once and leaves the content visible — content must never
 * fade back out when the visitor scrolls past it, and users who asked for
 * reduced motion get the static page with no animation at all.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Make sure nothing is left in a hidden state for assistive tech.
      root
        .querySelectorAll<HTMLElement>("[data-reveal], [data-text-reveal], [data-image-reveal], [data-stagger] > *")
        .forEach((node) => {
          node.style.opacity = "1";
          node.style.transform = "none";
          node.style.filter = "none";
        });
      return;
    }

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((section) => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 88%",
            once: true,
          },
        });

        const eyebrow = section.querySelectorAll<HTMLElement>("[data-reveal-eyebrow]");
        const headings = section.querySelectorAll<HTMLElement>("[data-text-reveal]");
        const paragraphs = section.querySelectorAll<HTMLElement>("[data-reveal-text]");
        const images = section.querySelectorAll<HTMLElement>("[data-image-reveal]");
        const groups = section.querySelectorAll<HTMLElement>("[data-stagger]");

        if (eyebrow.length) {
          timeline.fromTo(
            eyebrow,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
            0,
          );
        }

        if (headings.length) {
          timeline.fromTo(
            headings,
            { autoAlpha: 0, y: 44, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.1,
              stagger: 0.12,
              ease: "expo.out",
            },
            0.08,
          );
        }

        if (paragraphs.length) {
          timeline.fromTo(
            paragraphs,
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" },
            0.22,
          );
        }

        if (images.length) {
          timeline.fromTo(
            images,
            { autoAlpha: 0, scale: 1.06, filter: "blur(12px)" },
            {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.4,
              stagger: 0.14,
              ease: "power3.out",
            },
            0.16,
          );
        }

        groups.forEach((group) => {
          timeline.fromTo(
            Array.from(group.children) as HTMLElement[],
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.09,
              ease: "power3.out",
              clearProps: "transform,filter",
            },
            0.3,
          );
        });
      });
    }, root);

    // Media and webfonts change section heights after first paint.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const timer = window.setTimeout(refresh, 600);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="contents">
      {children}
    </div>
  );
}
