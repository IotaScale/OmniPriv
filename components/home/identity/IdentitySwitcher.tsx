"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import BgMotif from "../BgMotif";
import { IDENTITIES } from "./data";
import { ConsoleCard, Hotspots, PathCard, ReplayCard } from "./visuals";
import { AccessPathStage, BlastRadiusStage, PolicyDecisionStage, ZeroStandingStage } from "./stages";
import { ZspClockStage, ZspTimelineStage, ZspTokensStage, ZspWeekStage } from "./zsp";

/*
 * Option 1: identity switcher.
 * Left: the three identity types as tabs; the active one opens to its
 * controls, one verified figure and a link. Right: the identity's picture with
 * a small product console laid over its corner, showing what OmniPriv does for
 * that identity, one event at a time. Advances every 7s, pauses on hover.
 */

const STEP_MS = 7000;

export type IdentityVisual = "console" | "path" | "replay" | "hotspots" | "access" | "policy" | "zsp" | "radius" | "zsp2" | "zclock" | "ztokens" | "zweek";

/* Image-free stages replace the picture entirely. */
const STAGES = {
  access: AccessPathStage,
  policy: PolicyDecisionStage,
  zsp: ZeroStandingStage,
  radius: BlastRadiusStage,
  zsp2: ZspTimelineStage,
  zclock: ZspClockStage,
  ztokens: ZspTokensStage,
  zweek: ZspWeekStage,
} as const;

export default function IdentitySwitcher({ visual = "console" }: { visual?: IdentityVisual }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  /* Bumped each time the section scrolls into view, so the animation and the
     tab timer start from the beginning when the visitor actually sees them,
     not when the page loaded. */
  const [play, setPlay] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stepMs = visual in STAGES ? (visual.startsWith("z") ? 10000 : 8500) : STEP_MS;
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    /* The stage itself: play once half of it is on screen (on phones it
       sits below the tabs, so the section being visible is not enough). */
    const st = stageRef.current;
    let seen = false;
    const io2 = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.5 && !seen) {
          seen = true;
          setPlay((n) => n + 1);
        } else if (!e.isIntersecting && e.intersectionRatio === 0) {
          seen = false;
        }
      },
      { threshold: [0, 0.5] }
    );
    if (st) io2.observe(st);
    return () => {
      io.disconnect();
      io2.disconnect();
    };
  }, []);

  useEffect(() => {
    if (paused || !visible || reduce) return;
    if (stageRef.current && play === 0) return; // wait until the stage is seen
    const t = window.setTimeout(() => setActive((a) => (a + 1) % IDENTITIES.length), stepMs);
    return () => window.clearTimeout(t);
  }, [active, paused, visible, reduce, stepMs, play]);

  const item = IDENTITIES[active];
  const StageView = visual in STAGES ? STAGES[visual as keyof typeof STAGES] : null;

  return (
    <section className="relative overflow-hidden">
      {/* Vault dial peeking in from the top-right corner, beside the heading */}
      <BgMotif kind="vault" className="w-[28.75rem] h-[28.75rem] -top-[9.375rem] -right-[5.625rem]" />

      <div className="container-xl op-sec relative z-10">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2 className="op-h2">Every identity that can touch production</h2>
          <p className="op-lede">
            People, machines and AI agents each get the right controls from one policy model, and every action they
            take is on the record.
          </p>
        </div>

        <div
          ref={rootRef}
          className="op-body grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-14 items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Tabs */}
          <div role="tablist" aria-label="Identity types" className="min-w-0 flex flex-col gap-3">
            {IDENTITIES.map((it, i) => {
              const on = i === active;
              return (
                <div
                  key={it.key}
                  className={`relative rounded-2xl border transition-colors duration-300 ${
                    on
                      ? "border-[#00B8DB]/40 bg-white dark:bg-[#15171a] shadow-[0_10px_30px_-18px_rgba(0,102,122,0.45)]"
                      : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white/60 dark:bg-white/[0.02] hover:border-slate-900/[0.16] dark:hover:border-white/[0.16]"
                  }`}
                >
                  {/* progress on the active tab */}
                  {on && !reduce && (
                    <span className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-slate-900/[0.06] dark:bg-white/[0.08] overflow-hidden" aria-hidden="true">
                      <span
                        key={`${active}-${paused}-${play}`}
                        className="absolute inset-x-0 top-0 bg-[#00B8DB] id-progress"
                        style={{ animationDuration: `${stepMs}ms`, animationPlayState: paused ? "paused" : "running" }}
                      />
                    </span>
                  )}

                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-colors ${
                        on ? "bg-[#00B8DB] text-[#03121c]" : "bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB]"
                      }`}
                    >
                      <it.icon className="w-5 h-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="op-card-title block">{it.title}</span>
                      <span className="block text-sm text-slate-500 dark:text-slate-400">{it.short}</span>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="body"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pl-[4.75rem]">
                          <p className="text-[0.9375rem] leading-[1.6] text-slate-600 dark:text-slate-400">{it.risk}</p>
                          <ul className="mt-3 space-y-2">
                            {it.controls.map((c) => (
                              <li key={c} className="flex items-start gap-2.5 text-[0.9375rem] text-slate-800 dark:text-slate-200">
                                <CheckCircle2 className="w-[1.125rem] h-[1.125rem] mt-[2px] shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                {c}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              <span className="text-xl font-bold text-[#0a1628] dark:text-white mr-1.5" style={{ fontFamily: "var(--font-syne)" }}>
                                {it.stat.value}
                              </span>
                              {it.stat.label}
                            </span>
                            <Link href={it.href} className="group op-link inline-flex items-center gap-1.5 text-sm font-semibold">
                              {it.cta}
                              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {StageView && (
            <div ref={stageRef} className="relative min-w-0" role="tabpanel" aria-label={item.title}>
              {/* Not started until the section is on screen: before that it
                  shows its finished state (off screen, so nobody sees it). */}
              <StageView key={`${item.key}-${play}`} item={item.key} reduce={!!reduce || play === 0} />
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 text-center">
                Illustrative example. Names, times and figures are sample data.
              </p>
            </div>
          )}

          {!StageView && (
          <>
          {/* Picture with the product console over its corner */}
          <div className={`relative min-w-0 ${visual === "hotspots" ? "" : "lg:pb-10 lg:pr-4"}`} role="tabpanel" aria-label={item.title}>
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08] bg-[#0b0c0e]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={item.key}
                  className="absolute inset-0"
                  initial={reduce ? false : { opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" style={{ objectPosition: item.focus }} />
                </motion.div>
              </AnimatePresence>
              {visual === "hotspots" && <Hotspots key={item.key} item={item.key} reduce={!!reduce} />}
            </div>

            {visual === "console" && <ConsoleCard item={item.key} reduce={!!reduce} />}
            {visual === "path" && <PathCard key={item.key} item={item.key} reduce={!!reduce} />}
            {visual === "replay" && <ReplayCard key={item.key} item={item.key} reduce={!!reduce} />}
          </div>
          </>
          )}
        </div>
      </div>
    </section>
  );
}
