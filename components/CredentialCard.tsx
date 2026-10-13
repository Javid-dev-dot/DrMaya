"use client";

import { CheckCircle2 } from "lucide-react";
import { useSpotlight } from "@/lib/useMicroInteractions";

/** Credential row with a cursor-tracked border glow. */
export default function CredentialCard({ text }: { text: string }) {
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <div
      onPointerMove={spotlight.onPointerMove}
      className="spotlight pressable flex items-start gap-3 rounded-xl border border-brand-secondary/50 bg-brand-sand/60 p-4 text-sm font-medium text-brand-dark"
    >
      <CheckCircle2 aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-brand-primary" />
      <span>{text}</span>
    </div>
  );
}
