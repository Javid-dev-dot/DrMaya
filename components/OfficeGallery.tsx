"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import {
  useBodyScrollLock,
  useEscape,
  useFocusTrap,
} from "@/lib/useMicroInteractions";

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Office gallery with a keyboard-navigable lightbox: Escape closes, arrow keys
 * move between images, focus is trapped while open and restored on close.
 */
export default function OfficeGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useFocusTrap<HTMLDivElement>(openIndex !== null);
  const isOpen = openIndex !== null;

  useEscape(isOpen, () => setOpenIndex(null));
  useBodyScrollLock(isOpen);

  const show = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + delta + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        show(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, show]);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              suppressHydrationWarning
              aria-label={`Open larger view: ${image.caption}`}
              className="group pressable relative block w-full overflow-hidden rounded-2xl border border-brand-secondary/40 bg-brand-sand text-left shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
            >
              <span className="relative block aspect-[4/5]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-overlay/65 via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                  <span className="font-sans text-sm tracking-wide text-brand-cream">
                    {image.caption}
                  </span>
                  <Expand
                    aria-hidden="true"
                    size={16}
                    className="shrink-0 translate-y-1 text-brand-cream/80 opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Office photo ${(openIndex ?? 0) + 1} of ${images.length}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/92 p-4 backdrop-blur-sm sm:p-8"
          onClick={(event) => {
            if (event.target === event.currentTarget) setOpenIndex(null);
          }}
        >
          <div ref={dialogRef} className="relative w-full max-w-4xl">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/15 bg-brand-dark shadow-2xl sm:aspect-[16/10]">
              <Image
                key={images[openIndex as number].src}
                src={images[openIndex as number].src}
                alt={images[openIndex as number].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                preload
                className="object-cover"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-brand-cream">
              <div>
                <p className="font-serif text-xl font-light">
                  {images[openIndex as number].caption}
                </p>
                <p className="tabular mt-1 font-sans text-[0.65rem] uppercase tracking-[0.24em] text-brand-cream/60">
                  {(openIndex ?? 0) + 1} / {images.length} · Arrow keys to browse
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => show(-1)}
                  aria-label="Previous photo"
                  suppressHydrationWarning
                  className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-brand-cream hover:bg-white/10"
                >
                  <ChevronLeft aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => show(1)}
                  aria-label="Next photo"
                  suppressHydrationWarning
                  className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-brand-cream hover:bg-white/10"
                >
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                   className="pressable inline-flex h-11 items-center gap-2 rounded-full bg-brand-cream px-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-dark hover:bg-brand-sand dark:hover:bg-brand-sand"
                  suppressHydrationWarning
                >
                  <X aria-hidden="true" size={16} />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
