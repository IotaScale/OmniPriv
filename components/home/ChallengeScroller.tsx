"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight, Bot, Boxes, Globe, Layers, ScrollText, ShieldAlert } from "lucide-react";
import ChallengeVisual from "@/components/home/ChallengeVisuals";
import BgMotif, { EdgeMotif } from "./BgMotif";

/*
 * "Six privileged access gaps. One governed platform." The first section
 * after the hero. Deliberately calm: no entrance choreography, no 3D.
 *
 * Desktop: the stage pins under the header; the scroll position picks the slide.
 * One scroll gesture moves one step (SmoothScroll walks `data-scroll-steps`).
 * The active row in the index opens and the scene on the right crossfades to
 * the next one. Scenes are drawn in their finished state.
 *
 * Scenes are live product slices (ChallengeVisuals), not stock artwork.
 * Below lg, or on screens under 520px tall: stacked cards. On shorter desktop
 * screens the pinned stage is zoomed to fit, so it looks like the 1080p layout. Reduced motion: slides swap without the fade.
 */

const GAPS = [
  {
    id: "ai-agents",
    headline: "Secure AI agents",
    body: "Give AI agents and automated workflows JIT access, least privilege, protected credentials and governed access, like any other privileged identity.",
    chips: ["MCP agent identity", "Tool-level authorization", "Prompt-injection guard"],
    href: "/platform/secure-ai-agents-omnipriv",
    icon: Bot,
  },
  {
    id: "ai-attacks",
    headline: "Defend against AI-driven threats",
    body: "Machine-learning scoring watches every privileged session and responds to suspicious activity in seconds, not after the incident review.",
    chips: ["ML behavioural scoring", "10-second auto-block", "Impossible travel"],
    href: "/platform/ai-threat-protection",
    icon: ShieldAlert,
  },
  {
    id: "remote",
    headline: "Secure remote and hybrid access",
    body: "Administrators, employees and vendors reach critical systems through a brokered, MFA-verified, recorded session, without a VPN.",
    chips: ["Brokered RDP and SSH", "Vendor access windows", "Every session recorded"],
    href: "/platform/secure-remote-access",
    icon: Globe,
  },
  {
    id: "compliance",
    headline: "Audit, governance and compliance",
    body: "Centralised activity logs, policy controls, session records and compliance-ready reporting across every critical system.",
    chips: ["Immutable session logs", "Mapped controls", "One-click reports"],
    href: "/platform/audit-compliance",
    icon: ScrollText,
  },
  {
    id: "risk",
    headline: "Reduce privileged identity risk",
    body: "Find excessive and unused privileges, then convert standing access to Just-in-Time across people, machines and agents.",
    chips: ["Excess privilege discovery", "Zero standing privilege", "Just-in-Time access"],
    href: "/platform/identity-security",
    icon: Layers,
  },
  {
    id: "consolidation",
    headline: "Consolidate PAM and identity security",
    body: "Privileged access, identity controls, credentials, session monitoring and policy enforcement in one platform instead of five tools.",
    chips: ["Nine modules", "One policy engine", "One audit trail"],
    href: "/platform/consolidation",
    icon: Boxes,
  },
];

/* Scroll distance per step, in viewport heights. */
const STEP_VH = 55;

/* Slides change with a short crossfade: no rotation, no travel. */
/*
 * Scene change: the new scene fades in ON TOP of the old one, which stays
 * fully opaque underneath until the new one has covered it. Fading both at
 * once let the white page show through mid-crossfade, which read as a blink.
 */
const fade: Variants = {
  enter: { opacity: 0, zIndex: 2 },
  center: { opacity: 1, zIndex: 2 },
  /* 1 -> 0.99, not 1 -> 1: an exit with nothing to animate finishes at once
     and the old scene would vanish before the new one has covered it. */
  exit: { opacity: 0.99, zIndex: 1, transition: { duration: 0.32 } },
};

export default function ChallengeScroller() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  /*
   * Active slide from the scroll position. A slide turns as soon as the page
   * is a third of the way towards the next step (in the direction of travel),
   * so the scene answers the scroll gesture almost at once instead of waiting
   * for the glide to reach the middle.
   */
  const zoneRef = useRef<HTMLDivElement>(null);
  /* Scenes play their story on arrival, so hold the first one until it is on screen. */
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    let lastY = window.scrollY;
    const update = () => {
      raf = 0;
      const el = zoneRef.current;
      if (!el || el.offsetParent === null) return;
      const y = window.scrollY;
      const down = y >= lastY;
      lastY = y;
      const stepPx = (STEP_VH * window.innerHeight) / 100;
      const top = el.getBoundingClientRect().top + y;
      const pos = GAPS.map((_, i) => (i === 0 ? top - 72 : top + i * stepPx));
      let next = 0;
      for (let i = 1; i < pos.length; i++) {
        const f = (y - pos[i - 1]) / (pos[i] - pos[i - 1]);
        if (f >= (down ? 0.3 : 0.7)) next = i;
      }
      setActive(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /*
   * Fit the pinned stage to the screen height. On a short screen (a 720p
   * laptop) the stage is zoomed down as one piece, so it keeps exactly the
   * 1080p composition with breathing room, instead of its parts squeezing.
   */
  const pinRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const pin = pinRef.current;
    const el = fitRef.current;
    if (!pin || !el) return;
    let raf = 0;
    const fit = () => {
      raf = 0;
      el.style.zoom = "";
      if (!pin.offsetParent && getComputedStyle(pin).position !== "sticky") return;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
      const avail = pin.clientHeight - 3 * rem;
      const h = el.offsetHeight;
      if (!h || !avail) return;
      const z = Math.max(0.6, Math.min(1, avail / h));
      if (z < 0.995) el.style.zoom = String(z);
    };
    const onResize = () => {
      if (!raf) raf = requestAnimationFrame(fit);
    };
    fit();
    const ro = new ResizeObserver(onResize);
    ro.observe(pin);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Jump to a step, through SmoothScroll so the glide matches the page */
  const jump = (i: number) => {
    const wrap = zoneRef.current;
    if (!wrap) return;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    const header = 4.5 * parseFloat(getComputedStyle(document.documentElement).fontSize || "16");
    const y = i === 0 ? top - header : top + (i * STEP_VH * window.innerHeight) / 100;
    if (reduce) {
      window.scrollTo(0, y);
      return;
    }
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }
    window.dispatchEvent(new CustomEvent("op:scrollto", { detail: y }));
  };

  return (
    <section ref={sectionRef} className="relative">
      {/* Heading (phones and tablets; on desktop it sits inside the pinned stage) */}
      <div className="[@media(min-width:1024px)_and_(min-height:520px)]:hidden container-xl !max-w-3xl pt-16">
        <Heading />
      </div>

      {/* Desktop: pinned story */}
      <div
        ref={zoneRef}
        className="hidden [@media(min-width:1024px)_and_(min-height:520px)]:block relative"
        data-scroll-steps={GAPS.length}
        data-step-vh={STEP_VH}
        style={{ height: `calc(100vh + ${(GAPS.length - 1) * STEP_VH}vh)` }}
      >
        <div ref={pinRef} className="sticky top-[4.5rem] h-[calc(100vh-4.5rem)] flex items-center">
          {/* Anomaly radar in the left gutter, outside the content column */}
          <EdgeMotif kind="radar" side="left" size={380} top="22%" />
          <div ref={fitRef} className="container-xl w-full relative">
            {/* Control-point drawing in the space to the right of the heading */}
            <BgMotif kind="network" className="top-0 right-6 w-[21.25rem] h-[9.6875rem]" />

            {/* Heading stays with the six gaps for the whole pinned story */}
            <Heading compact />

            <div className="cs2-stage mt-8 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)] gap-14 xl:gap-20 items-center">
              {/* Index */}
              <div className="relative pl-7">
                <span className="absolute left-0 top-2 bottom-2 w-px bg-slate-900/[0.08] dark:bg-white/[0.08]" aria-hidden="true">
                  <span
                    className="cs2-rail absolute inset-x-0 top-0 h-full bg-[#00B8DB] origin-top"
                    style={{ transform: `scaleY(${(active + 1) / GAPS.length})` }}
                  />
                </span>

                <ol className="space-y-1">
                  {GAPS.map((g, i) => {
                    const on = i === active;
                    return (
                      <li key={g.id} className={`cs2-row ${on ? "is-on" : ""}`}>
                        <button
                          type="button"
                          onClick={() => jump(i)}
                          aria-current={on ? "step" : undefined}
                          className="group w-full flex items-center gap-4 py-2 text-left"
                        >
                          <span className="cs2-icon inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0">
                            <g.icon className="w-[1.125rem] h-[1.125rem]" aria-hidden="true" />
                          </span>
                          <span
                            className="cs2-title text-lg xl:text-xl font-semibold tracking-[-0.025em]"
                            style={{ fontFamily: "var(--font-syne)" }}
                          >
                            {g.headline}
                          </span>
                        </button>

                        <div className="cs2-detail" {...(on ? {} : ({ inert: "" } as Record<string, string>))}>
                          <div className="overflow-hidden">
                            <div className="pl-[3.25rem] pb-4">
                              <p className="text-[0.9375rem] text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">{g.body}</p>
                              <ul className="mt-4 flex flex-wrap gap-2">
                                {g.chips.map((c) => (
                                  <li
                                    key={c}
                                    className="cs2-chip text-xs font-medium px-3 py-1.5 rounded-full border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] text-[#00667a] dark:text-[#7fd9ea]"
                                                                      >
                                    {c}
                                  </li>
                                ))}
                              </ul>
                              <Link
                                href={g.href}
                                className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00667a] dark:text-[#00B8DB]"
                              >
                                Learn more
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* Scene */}
              <div ref={sceneRef} className="cs2-scene relative w-full ml-auto">
                <div className="relative aspect-[16/11]">
                  {reduce ? (
                    <div className="absolute inset-0">
                      <ChallengeVisual index={active} />
                    </div>
                  ) : (
                    /* The first scene is there from the start (no empty box
                       while it fades in); later scenes cross over it. */
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={active}
                        variants={fade}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        <ChallengeVisual index={active} />
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-2" aria-hidden="true">
                  {GAPS.map((g, i) => (
                    <span key={g.id} className="flex-1 h-1 rounded-full bg-slate-900/[0.08] dark:bg-white/[0.08] overflow-hidden">
                      <span className={`cs2-seg block h-full bg-[#00B8DB] ${i <= active ? "is-on" : ""}`} />
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile and tablet: stacked */}
      <div className="[@media(min-width:1024px)_and_(min-height:520px)]:hidden container-xl !max-w-3xl op-body pb-16 space-y-6">
        {GAPS.map((g, i) => (
          <MobileCard key={g.id} gap={g} index={i} />
        ))}
      </div>
    </section>
  );
}

function Heading({ compact = false }: { compact?: boolean }) {
  return (
    <div className="max-w-2xl">
      <h2
        className={`op-h2 ${compact ? "cs2-heading" : ""}`}
      >
        Six privileged access gaps.
        <span className="block text-slate-500 dark:text-slate-400">One governed platform.</span>
      </h2>
      <p
        className={`op-lede ${compact ? "cs2-lede" : ""}`}
      >
        From governing autonomous AI agents to proving compliance, OmniPriv closes the gaps attackers look for first.
      </p>
    </div>
  );
}

function MobileCard({ gap: g, index }: { gap: (typeof GAPS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.35 });
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a]">
      <div ref={ref} className="relative aspect-[16/11] p-3">
        {seen && <ChallengeVisual index={index} />}
      </div>
      <div className="p-6 pt-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB]">
          <g.icon className="w-5 h-5" aria-hidden="true" />
        </span>
        <h3
          className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950 dark:text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {g.headline}
        </h3>
        <p className="mt-2 text-slate-600 dark:text-slate-400 leading-relaxed">{g.body}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {g.chips.map((c) => (
            <li
              key={c}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] text-[#00667a] dark:text-[#7fd9ea]"
            >
              {c}
            </li>
          ))}
        </ul>
        <Link href={g.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00667a] dark:text-[#00B8DB]">
          Learn more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
