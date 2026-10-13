import Image from "next/image";
import { ArrowDown, ShieldCheck } from "lucide-react";
import HeroActions from "@/components/HeroActions";
import HeroStats from "@/components/HeroStats";
import { images, imageAlts } from "@/lib/practice";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-reveal
      className="relative flex min-h-[min(860px,calc(100svh-72px))] items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={images.hero}
          alt={imageAlts.hero}
          fill
          sizes="100vw"
          preload
          className="scale-[1.04] object-cover"
        />
         <div className="absolute inset-0 bg-gradient-to-r from-overlay/90 via-overlay/65 to-overlay/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-overlay/80 via-transparent to-overlay/25" />
      </div>

      <div className="layout-container relative z-10 py-24 pt-32 text-white sm:pt-28">
        <p className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-brand-cream backdrop-blur-sm">
          <span
            aria-hidden="true"
            className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-teal-light"
          />
          Licensed Clinical Psychologist · Santa Monica, CA
        </p>

        <h1
          data-text-reveal
          className="mb-8 max-w-4xl font-serif text-[2.6rem] font-light leading-[1.06] tracking-tight text-brand-cream hero-text-shadow sm:text-6xl md:text-7xl"
        >
          Sustainable mental wellness for the high-achieving professional.
        </h1>

        <p className="mb-10 max-w-2xl font-sans text-lg leading-relaxed text-brand-cream/85 sm:text-xl">
          Dr. Maya Reynolds specializes in evidence-based therapy for anxiety, trauma, and
          burnout for creatives, founders, and professionals in Santa Monica and across
          California.
        </p>

        <HeroActions />

        <div className="mt-14 flex flex-col gap-8 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-brand-teal-light">
              <ShieldCheck aria-hidden="true" size={18} />
            </span>
            <p className="max-w-[15rem] font-sans text-xs leading-relaxed text-brand-cream/75">
              Out-of-network care with superbills and a Good Faith Estimate for every client.
            </p>
          </div>
          <HeroStats />
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-brand-cream/60 md:flex">
        <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em]">Explore</span>
        <ArrowDown aria-hidden="true" size={16} className="scroll-hint" />
      </div>
    </section>
  );
}
