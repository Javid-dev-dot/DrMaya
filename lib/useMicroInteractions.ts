"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// Module-level constant shared between server and client for referential equality during hydration
const INITIAL_SCROLL_SNAPSHOT = { progress: 0, scrolled: false } as const;

function subscribeToMediaQuery(query: string) {
  return (onChange: () => void) => {
    const list = window.matchMedia(query);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  };
}

/** True when the user asked the OS to reduce motion. */
export function usePrefersReducedMotion() {
  const query = "(prefers-reduced-motion: reduce)";
  return useSyncExternalStore(
    subscribeToMediaQuery(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

interface ScrollSnapshot {
  progress: number;
  scrolled: boolean;
}

/** Page scroll progress (0..1) plus a "past the fold" flag. */
export function useScrollProgress() {
  const frameRef = useRef(0);
  const snapshotRef = useRef<ScrollSnapshot>(INITIAL_SCROLL_SNAPSHOT);

  const subscribe = useCallback((onChange: () => void) => {
    const measure = () => {
      frameRef.current = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const raw = max > 0 ? window.scrollY / max : 0;
      snapshotRef.current = {
        progress: Math.min(1, Math.max(0, raw)),
        scrolled: window.scrollY > 24,
      };
      onChange();
    };

    const handler = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        measure();
      });
    };

    // Measure immediately so the first committed snapshot is accurate.
    measure();

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);

  // Pure read: the snapshot is only replaced inside `measure`, which always
  // calls onChange. Computing it here instead — especially comparing a raw
  // value against the stored clamped one — can return a fresh object on every
  // call and trip React's "getSnapshot should be cached" guard, which cascades
  // into "Maximum update depth exceeded".
  const getSnapshot = useCallback(() => snapshotRef.current, []);

  // Return the module-level constant for referential equality during hydration
  const getServerSnapshot = useCallback(() => INITIAL_SCROLL_SNAPSHOT, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Reports which section currently owns the viewport for nav highlighting. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best: string | null = null;
        let ratio = 0;
        ratios.forEach((value, key) => {
          if (value > ratio) {
            ratio = value;
            best = key;
          }
        });
        setActive(best);
      },
      { threshold: [0.12, 0.35, 0.6], rootMargin: "-88px 0px -40% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Fires once the observed element has entered the viewport. */
export function useInView<T extends Element>(
  options: IntersectionObserverInit = { threshold: 0.25 },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView } as const;
}

/** Eases a number up to `target` the first time the element is seen. */
export function useCountUp(target: number, duration = 1400) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [value, setValue] = useState(() => (reduced ? target : 0));

  useEffect(() => {
    if (!inView) return;
    if (target === 0) {
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = Math.min(1, (timestamp - start) / duration);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(target * eased);
      if (elapsed < 1) frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return { ref, value } as const;
}

/**
 * Pointer-tracking magnetic offset. Writes `--tx` / `--ty` on the pointer
 * target and eases back to the origin on leave, so CSS owns the easing.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const reduced = usePrefersReducedMotion();

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<T>) => {
      const node = event.currentTarget;
      if (reduced || event.pointerType === "touch") return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      node.style.setProperty("--tx", `${x * strength}px`);
      node.style.setProperty("--ty", `${y * strength}px`);
    },
    [reduced, strength],
  );

  const handlePointerLeave = useCallback((event: React.PointerEvent<T>) => {
    const node = event.currentTarget;
    node.style.setProperty("--tx", "0px");
    node.style.setProperty("--ty", "0px");
  }, []);

  return { onPointerMove: handlePointerMove, onPointerLeave: handlePointerLeave } as const;
}

/** Writes the pointer position as percentages for the `.spotlight` glow. */
export function useSpotlight<T extends HTMLElement>() {
  const handlePointerMove = useCallback((event: React.PointerEvent<T>) => {
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    node.style.setProperty("--mx", `${x}%`);
    node.style.setProperty("--my", `${y}%`);
  }, []);

  return { onPointerMove: handlePointerMove } as const;
}

/** Prevents the page from scrolling behind an open overlay. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

/** Calls `onEscape` while `active` is true. */
export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onEscape]);
}

/**
 * Keeps focus inside a container while it is open, and restores it to the
 * previously focused element when it closes.
 */
export function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previous = document.activeElement as HTMLElement | null;
    const selector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusables = () =>
      Array.from(node.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      node.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [active]);

  return ref;
}
