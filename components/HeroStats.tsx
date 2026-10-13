"use client";

import { useCountUp } from "@/lib/useMicroInteractions";

const stats = [
  { label: "Years in practice", value: 14, suffix: "" },
  { label: "Hours of clinical care", value: 4200, suffix: "+" },
  { label: "Consultation reply", value: 24, suffix: " hrs" },
];

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value, 1600);

  const formatted =
    value >= 1000 ? `${(Math.round(current) / 1000).toFixed(1)}k` : `${Math.round(current)}`;

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="tabular font-serif text-2xl font-light text-brand-cream sm:text-3xl">
        {formatted}
        <span className="text-brand-teal-light">{suffix}</span>
      </span>
      <span className="font-sans text-[0.62rem] uppercase tracking-[0.2em] text-brand-cream/60">
        {label}
      </span>
    </div>
  );
}

/** Practice figures that count up the first time the hero is seen. */
export default function HeroStats() {
  return (
    <dl className="grid grid-cols-3 gap-8 sm:gap-12">
      {stats.map((stat) => (
        <Stat key={stat.label} {...stat} />
      ))}
    </dl>
  );
}
