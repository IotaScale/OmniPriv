"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroProductShowcase from "@/components/ui/HeroProductShowcase";

/*
 * Homepage hero.
 *
 * As the hero scrolls away, the copy lifts and clears and the product window
 * leans back slightly and settles, a quiet hand-off into the section below.
 *
 * All values are scroll-linked motion values, so the effect tracks the
 * scrollbar exactly and works in every browser. Reduced motion: none of it.
 */
export default function HeroScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const copyY = useTransform(p, [0, 0.6], [0, -50]);
  const copyOpacity = useTransform(p, [0, 0.45], [1, 0]);
  const copyBlur = useTransform(p, [0, 0.45], ["blur(0px)", "blur(6px)"]);

  const winRotate = useTransform(p, [0, 0.9], [0, 10]);
  const winY = useTransform(p, [0, 0.9], [0, 60]);
  const winScale = useTransform(p, [0, 0.9], [1, 0.95]);
  const winOpacity = useTransform(p, [0.3, 0.95], [1, 0.35]);

  const glowOpacity = useTransform(p, [0, 0.8], [1, 0.25]);

  return (
    <section ref={ref} className="hp-hero relative overflow-hidden bg-white dark:bg-[#0b0c0e] -mt-[4.5rem] pt-[4.5rem]">
      {/* Ground: OmniPriv navy with one soft light behind the product */}
      <motion.div
        className="hp-ground pointer-events-none absolute inset-0"
        style={reduce ? undefined : { opacity: glowOpacity }}
        aria-hidden="true"
      />
      <div className="hp-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-xl relative">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 items-center min-h-[calc(100dvh-4.5rem)] pt-16 pb-16 lg:py-20">
          {/* Copy */}
          <motion.div
            className="lg:col-span-6 max-w-2xl"
            style={reduce ? undefined : { y: copyY, opacity: copyOpacity, filter: copyBlur }}
          >
            <p className="hp-fade flex items-center gap-3 text-[0.6562rem] sm:text-[0.8125rem] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.16em] text-[#00667a] dark:text-[#00B8DB] font-mono">
              <span data-motion className="hp-rule block w-8 h-px bg-[#00B8DB]" aria-hidden="true" />
              AI-Powered Privileged Access Management
            </p>

            <h1
              className="mt-7 text-[2.75rem] sm:text-6xl lg:text-[3.4rem] xl:text-[3.75rem] font-bold text-slate-950 dark:text-white leading-[1.05] tracking-[-0.04em]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span className="hp-line xl:whitespace-nowrap">
                <span data-motion style={{ animationDelay: "0.08s" }}>Secure AI Access</span>
              </span>
              <span className="hp-line text-slate-500 dark:text-slate-400">
                <span data-motion style={{ animationDelay: "0.18s" }}>Control Every</span>
              </span>
              <span className="hp-line text-slate-500 dark:text-slate-400">
                <span data-motion style={{ animationDelay: "0.28s" }}>Privileged Move</span>
              </span>
            </h1>

            <p
              className="hp-fade mt-7 text-base sm:text-[1.0625rem] text-slate-600 dark:text-slate-300/85 leading-7 max-w-[38rem]"
              style={{ animationDelay: "0.4s" }}
            >
              AI, automation, applications, and human identities are reshaping privileged access. OmniPriv delivers
              modern AI PAM solutions with AI-driven controls, Just-in-Time access, secure credentials, and complete
              session visibility, helping teams reduce risk while keeping privileged access controlled and auditable.
            </p>

            <div className="hp-fade mt-9 flex flex-col sm:flex-row gap-3" style={{ animationDelay: "0.5s" }}>
              <Link href="/demo" className="hp-btn-primary group">
                Request a Demo
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link href="/platform" className="hp-btn-secondary">
                Explore Platform
              </Link>
            </div>
          </motion.div>

          {/* Product */}
          <div className="lg:col-span-6 min-w-0 lg:-mr-[4%] xl:-mr-[8%]" style={{ perspective: "1400px" }}>
            <motion.div
              style={
                reduce
                  ? undefined
                  : {
                      rotateX: winRotate,
                      y: winY,
                      scale: winScale,
                      opacity: winOpacity,
                      transformOrigin: "50% 100%",
                    }
              }
            >
              <HeroProductShowcase />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
