"use client";

import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "@/components/sections/LogoMarquee";

/*
 * Wraps a server-rendered block so its `.reveal-item` descendants fade up as
 * they enter the viewport. Reuses the one IntersectionObserver pattern the
 * site already has (useScrollReveal), so the hidden state only ever applies
 * under `prefers-reduced-motion: no-preference` and the default is visible.
 *
 * Stagger with an inline `transitionDelay` on each item, or with the
 * `.reveal-item:nth-child()` delays in globals.css.
 */
export default function RevealScope({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
