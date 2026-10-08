"use client";

import { useEffect, useRef } from "react";

/*
 * Owns the single pointer listener that drives every BentoCard inside it.
 *
 * One listener on the container, not one per card: a pointermove over a 16-card
 * grid fires continuously, and 16 listeners each writing their own style
 * properties every frame is what makes this class of effect feel janky.
 *
 * The listener only writes `--mx` / `--my` on the card currently under the
 * pointer. The gradients in globals.css read those variables, so the spotlight
 * follows the cursor without any JavaScript running per frame.
 *
 * Skipped entirely when it cannot be useful, no fine pointer, or reduced
 * motion, so those visitors get plain cards with no JavaScript at all.
 */

export interface BentoGlowGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function BentoGlowGrid({ children, className }: BentoGlowGridProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>("[data-bento-card]");
      /* Ignore moves that are not over a card belonging to this grid. */
      if (!card || !grid.contains(card)) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };

    grid.addEventListener("pointermove", onMove, { passive: true });
    return () => grid.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
