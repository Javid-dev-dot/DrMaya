"use client";

import { useEffect, useState } from "react";
import { practice } from "@/lib/practice";

/** Copyright line with the current year, computed on the client after mount
 *  so the page can still be statically prerendered. */
export default function Copyright() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for Next.js 16 Cache Components: hydration-safe client-only mount
    setMounted(true);
    setYear(new Date().getFullYear());
  }, []);

  if (!mounted) {
    return (
      <p aria-hidden="true">
        © {practice.name}. {practice.role} ({practice.license}). All rights reserved.
      </p>
    );
  }

  return (
    <p>
      © {year} {practice.name}. {practice.role} ({practice.license}). All rights reserved.
    </p>
  );
}