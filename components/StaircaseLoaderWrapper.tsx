"use client";

import { useEffect, useState } from "react";
import StaircaseLoader from "@/components/StaircaseLoader";

/** Client-only wrapper that mounts the staircase loader after hydration. */
export default function StaircaseLoaderWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for Next.js 16 Cache Components: client-only mount after hydration
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <StaircaseLoader />;
}