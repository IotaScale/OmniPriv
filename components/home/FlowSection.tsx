"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/*
 * Scroll-linked section wrapper for the homepage.
 *
 * Every section moves on the same curve, driven by its own position in the
 * viewport: it rises and clears as it enters, holds while it is read, and
 * settles back slightly as it leaves. Because each one is tied to the scroll
 * position rather than fired once, consecutive sections overlap their motion
 * and the page reads as one continuous flow.
 *
 * Only translateY and opacity: sections that measure their own geometry
 * (the control plane diagram) are unaffected, because everything inside moves
 * together. Reduced motion: renders a plain wrapper.
 */
export default function FlowSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(p, [0, 0.22, 0.82, 1], [90, 0, 0, -36]);
  const opacity = useTransform(p, [0, 0.2, 0.86, 1], [0, 1, 1, 0.55]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}
