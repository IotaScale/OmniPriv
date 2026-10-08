"use client";

import { useEffect, useRef } from "react";

/*
 * The hero's animated ground: blueprint grid, film grain, and a glow that
 * tracks the pointer.
 *
 * The glow is moved by writing `transform` straight onto the node through a
 * ref. Routing a mousemove through React state would re-render the whole hero
 * on every frame, which is a lot of reconciliation for a blurred circle.
 *
 * Scoped to the hero rather than fixed to the viewport as in the reference, * a glow that follows the cursor down every page is a global effect, and this
 * is a hero treatment.
 */

export default function HeroBackdrop() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const host = glow?.parentElement;
    if (!glow || !host) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <div className="hero-grid-lines absolute inset-0 opacity-60" />
      <div className="hero-grain absolute inset-0 opacity-20 mix-blend-soft-light" />
      {/* Starts hidden, otherwise it sits parked in the top-left corner. */}
      <div ref={glowRef} data-motion className="hero-cursor-glow opacity-0" />
    </div>
  );
}
