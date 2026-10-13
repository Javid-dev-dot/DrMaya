"use client";

import { useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/useMicroInteractions";

interface TiltFrameProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. */
  intensity?: number;
}

/**
 * Subtle 3D tilt that follows the pointer and eases back to flat on leave.
 * Falls back to a static frame when the user prefers reduced motion.
 */
export default function TiltFrame({
  children,
  className = "",
  intensity = 4,
}: TiltFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = frameRef.current;
    if (!node || reduced || event.pointerType === "touch") return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(1100px) rotateY(${px * intensity}deg) rotateX(${-py * intensity}deg) translateZ(0)`;
  };

  const reset = () => {
    const node = frameRef.current;
    if (!node) return;
    node.style.transform = "perspective(1100px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={frameRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      className={`transition-transform duration-500 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
