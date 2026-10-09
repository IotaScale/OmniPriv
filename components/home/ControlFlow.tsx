"use client";

import Image from "next/image";
import { EdgeMotif } from "./BgMotif";
import { forwardRef, useEffect, useRef, useState, type ElementType } from "react";
import {
  Box,
  Cloud,
  Cpu,
  Database,
  Laptop,
  RefreshCw,
  ScanSearch,
  Server,
  Settings,
  ShieldCheck,
  User,
  UserX,
} from "lucide-react";

/*
 * "One control plane for every privileged path", drawn as a live diagram.
 *
 *   identities ──curves──▶ ( policy core ring ) ──curves──▶ targets
 *                           Discover › Control › Govern
 *                           ↺ automated policy and posture
 *
 * The control plane is an open ring, not a card: three arcs (Discover,
 * Control, Govern) around the OmniPriv core. Requests arrive on the ring's
 * left side and leave from its right.
 *
 * - Connector curves are measured from the real node positions and end on
 *   the ring itself (ResizeObserver), so they stay attached at every width.
 * - The ring fills one arc per stage over the stage's dwell, so a full ring is
 *   one full cycle; then the feedback loop runs and it starts again from
 *   Discover. The stage tabs below the ring (or hover/focus) take over.
 * - Allowed requests simply flow. Only the refused one is called out: when the
 *   backdoor account's request reaches the ring, the ring glows rose once and
 *   the core shows the decision for a few seconds. Timing comes from the SVG
 *   animation's own beginEvent / endEvent, so nothing drifts.
 * - Paced to be read: a stage holds for 6s, requests take 2.6s to travel.
 * - Below lg the diagram stacks vertically with no curves.
 *
 * Reduced motion: no packets, no auto-stepping, ring shown full; every stage
 * reads fully.
 */

const IDENTITIES = [
  { label: "Human", icon: User },
  { label: "Machine", icon: Laptop },
  { label: "Backdoor account", icon: UserX },
  { label: "AI and automated", icon: Cpu },
];

const TARGETS = [
  { label: "Cloud", icon: Cloud },
  { label: "SaaS", icon: Box },
  { label: "On-prem", icon: Server },
  { label: "Databases", icon: Database },
];

const STAGES = [
  {
    title: "Discover",
    icon: ScanSearch,
    lead: "See every privileged identity and what it can reach.",
    items: ["Identities", "Privileges", "Entitlements", "Context and risk"],
  },
  {
    title: "Control",
    icon: ShieldCheck,
    lead: "Grant exactly what is needed, only while it is needed.",
    items: ["MFA and verification", "Just-in-Time access", "Zero standing privileges", "Session security"],
  },
  {
    title: "Govern",
    icon: Settings,
    lead: "Keep access right for the whole lifecycle.",
    items: ["Onboarding", "Access reviews", "Lifecycle management", "Compliance"],
  },
];

/* What the plane decided for each identity's request (shown in the header). */
const DECISIONS = [
  { who: "Human", what: "MFA verified, JIT granted", ok: true },
  { who: "Machine", what: "Verified, scoped credential", ok: true },
  { who: "Backdoor account", what: "Blocked, unknown identity", ok: false },
  { who: "AI agent", what: "Verified, tool scope applied", ok: true },
];

/* Ring geometry, in the 320 x 320 viewBox of the core */
const RING_R = 138;
const ARC_GAP = 5; // degrees between arcs
const arcPath = (i: number) => {
  const start = -90 + i * 120 + ARC_GAP / 2;
  const end = start + 120 - ARC_GAP;
  const pt = (deg: number) => {
    const r = (deg * Math.PI) / 180;
    return `${160 + RING_R * Math.cos(r)},${160 + RING_R * Math.sin(r)}`;
  };
  return `M${pt(start)} A${RING_R},${RING_R} 0 0 1 ${pt(end)}`;
};

/* Which identity's request gets blocked, and how often requests leave. */
const BLOCKED = 2; // Backdoor account
const STEP_MS = 6000; // long enough to read a stage

type Geometry = {
  w: number;
  h: number;
  inPaths: string[];
  outPaths: string[];
  block: { x: number; y: number };
  /** Stacked phone/tablet layout: wires run top to bottom instead of left to right. */
  stacked: boolean;
};

export default function ControlFlow() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const idRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tgRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [geo, setGeo] = useState<Geometry | null>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [motionOk, setMotionOk] = useState(false);
  const activeRef = useRef(0);
  activeRef.current = active;
  const [round, setRound] = useState(0); // bumps on every stage change, restarts the progress line
  const [loopRun, setLoopRun] = useState(0); // bumps when Govern hands back to Discover
  const [decision, setDecision] = useState<{ i: number; n: number } | null>(null);
  const [hit, setHit] = useState<{ ok: boolean; n: number } | null>(null);
  const [pulseId, setPulseId] = useState<{ i: number; n: number } | null>(null);

  /* Motion preference */
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setMotionOk(!q.matches);
    set();
    q.addEventListener("change", set);
    return () => q.removeEventListener("change", set);
  }, []);

  /* Measure node positions and build the connector curves */
  useEffect(() => {
    const wrap = wrapRef.current;
    const plane = planeRef.current;
    if (!wrap || !plane) return;

    const measure = () => {
      const W = wrap.getBoundingClientRect();
      const P = plane.getBoundingClientRect(); // the ring's square box
      const cx = P.left - W.left + P.width / 2;
      const cy = P.top - W.top + P.height / 2;
      const R = (P.width / 2) * (RING_R / 160); // ring radius in px
      const px = (r: DOMRect) => ({ l: r.left - W.left, r: r.right - W.left, cy: r.top - W.top + r.height / 2 });
      /* Entry and exit points spread over +-38 degrees around the horizontal */
      const onRing = (i: number, n: number, side: -1 | 1) => {
        const a = ((-38 + (76 * i) / (n - 1)) * Math.PI) / 180;
        return { x: cx + side * R * Math.cos(a), y: cy + R * Math.sin(a) };
      };

      /*
       * Phones and tablets: identities sit above the ring and targets below it,
       * so the same traffic runs top to bottom. Entry points spread over the top
       * of the ring, exits over the bottom.
       */
      if (window.innerWidth < 1024) {
        const onRingV = (i: number, n: number, side: -1 | 1) => {
          const a = ((-34 + (68 * i) / (n - 1)) * Math.PI) / 180;
          return { x: cx + R * Math.sin(a), y: cy + side * R * Math.cos(a) };
        };
        const box = (r: DOMRect) => ({ cx: r.left - W.left + r.width / 2, t: r.top - W.top, b: r.bottom - W.top });
        const inV = idRefs.current.map((el, i) => {
          if (!el) return "";
          const a = box(el.getBoundingClientRect());
          const e = onRingV(i, IDENTITIES.length, -1);
          const my = (a.b + e.y) / 2;
          return `M${a.cx},${a.b} C${a.cx},${my} ${e.x},${my} ${e.x},${e.y}`;
        });
        const outV = tgRefs.current.map((el, i) => {
          if (!el) return "";
          const b = box(el.getBoundingClientRect());
          const e = onRingV(i, TARGETS.length, 1);
          const my = (e.y + b.t) / 2;
          return `M${e.x},${e.y} C${e.x},${my} ${b.cx},${my} ${b.cx},${b.t}`;
        });
        setGeo({
          w: W.width,
          h: W.height,
          inPaths: inV,
          outPaths: outV,
          block: onRingV(BLOCKED, IDENTITIES.length, -1),
          stacked: true,
        });
        return;
      }

      const inPaths = idRefs.current.map((el, i) => {
        if (!el) return "";
        const a = px(el.getBoundingClientRect());
        const e = onRing(i, IDENTITIES.length, -1);
        const mx = (a.r + e.x) / 2;
        return `M${a.r},${a.cy} C${mx},${a.cy} ${mx},${e.y} ${e.x},${e.y}`;
      });
      const outPaths = tgRefs.current.map((el, i) => {
        if (!el) return "";
        const b = px(el.getBoundingClientRect());
        const e = onRing(i, TARGETS.length, 1);
        const mx = (e.x + b.l) / 2;
        return `M${e.x},${e.y} C${mx},${e.y} ${mx},${b.cy} ${b.l},${b.cy}`;
      });
      setGeo({
        w: W.width,
        h: W.height,
        inPaths,
        outPaths,
        block: onRing(BLOCKED, IDENTITIES.length, -1),
        stacked: false,
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  /* Only animate while on screen */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Step through the stages */
  useEffect(() => {
    if (!motionOk || !visible || hovering) return;
    const t = window.setInterval(() => {
      const a = activeRef.current;
      const next = (a + 1) % STAGES.length;
      if (next === 0) setLoopRun((n) => n + 1);
      setActive(next);
      setRound((r) => r + 1);
    }, STEP_MS);
    return () => window.clearInterval(t);
  }, [motionOk, visible, hovering]);

  const animate = motionOk && visible;

  /*
   * Sync the card with the traffic. The SVG animations fire beginEvent and
   * endEvent; listen to those rather than running a second clock.
   */
  useEffect(() => {
    if (!animate || !geo) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    let n = 0;
    const off: (() => void)[] = [];
    const on = (id: string, type: string, fn: () => void) => {
      const el = wrap.querySelector(`#${id}`);
      if (!el) return;
      el.addEventListener(type, fn);
      off.push(() => el.removeEventListener(type, fn));
    };
    // Only the refused request is called out; allowed traffic just flows.
    on(`pi${BLOCKED}`, "beginEvent", () => setPulseId({ i: BLOCKED, n: ++n }));
    on(`pi${BLOCKED}`, "endEvent", () => {
      n += 1;
      setDecision({ i: BLOCKED, n });
      setHit({ ok: false, n });
    });
    return () => off.forEach((f) => f());
  }, [animate, geo]);

  /* The decision stays up long enough to read, then the core settles back */
  useEffect(() => {
    if (!decision) return;
    const t = window.setTimeout(() => setDecision(null), 3600);
    return () => window.clearTimeout(t);
  }, [decision]);

  /* Edge light fades on its own */
  useEffect(() => {
    if (!hit) return;
    const t = window.setTimeout(() => setHit(null), 1600);
    return () => window.clearTimeout(t);
  }, [hit]);

  return (
    <section className="relative overflow-hidden border-b border-slate-900/[0.05] dark:border-white/[0.05] bg-slate-50 dark:bg-[#0b0c0e]">
      {/* Verified identity in the left gutter */}
      <EdgeMotif kind="fingerprint" side="left" size={300} top="34%" />
      <div className="cf2-ground pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-xl relative op-sec">
        <div className="max-w-2xl" data-aos="fade-up">
          <h2
            className="op-h2"
          >
            One control plane for every privileged path
          </h2>
          <p className="op-lede">
            Every request from a person, machine or AI agent passes through one place that discovers risk,
            enforces least privilege and governs access for its whole life. Nothing reaches a target any other way.
          </p>
        </div>

        <div
          ref={wrapRef}
          className="relative op-body grid lg:grid-cols-[190px_minmax(0,1fr)_190px] gap-y-10 lg:gap-x-20 xl:gap-x-28 lg:gap-y-2 items-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {/* ── Connectors and traffic (left to right on desktop, top to bottom when stacked) ── */}
          {geo && (
            <svg
              key={animate ? "live" : "still"}
              className="cf2-wires pointer-events-none absolute inset-0"
              width={geo.w}
              height={geo.h}
              viewBox={`0 0 ${geo.w} ${geo.h}`}
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="cf2-dot">
                  <stop offset="0" stopColor="#e6f9ff" />
                  <stop offset="0.45" stopColor="#00B8DB" />
                  <stop offset="1" stopColor="#00B8DB" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="cf2-dot-red">
                  <stop offset="0" stopColor="#ffe4e6" />
                  <stop offset="0.45" stopColor="#f43f5e" />
                  <stop offset="1" stopColor="#f43f5e" stopOpacity="0" />
                </radialGradient>
              </defs>

              {geo.inPaths.map((d, i) => (
                <path key={`in-${i}`} id={`cf2-in-${i}`} d={d} className="cf2-wire" />
              ))}
              {geo.outPaths.map((d, i) => (
                <path key={`out-${i}`} id={`cf2-out-${i}`} d={d} className="cf2-wire" />
              ))}

              {animate && (
                <>
                  {/* Requests in. The blocked one is red and dies at the edge. */}
                  {geo.inPaths.map((_, i) => (
                    <circle key={`pi-${i}`} r={i === BLOCKED ? 6 : 5} fill={`url(#${i === BLOCKED ? "cf2-dot-red" : "cf2-dot"})`} opacity="0">
                      <animateMotion dur="2.6s" begin={`${0.6 + i * 1.8}s;pi${i}.end+4.6s`} id={`pi${i}`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" keyPoints="0;1">
                        <mpath href={`#cf2-in-${i}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" begin={`pi${i}.begin`} fill="freeze" />
                    </circle>
                  ))}

                  {/* Requests out, after the plane has checked them */}
                  {geo.outPaths.map((_, i) => (
                    <circle key={`po-${i}`} r="5" fill="url(#cf2-dot)" opacity="0">
                      <animateMotion dur="2.6s" begin={`${2.4 + i * 1.8}s;po${i}.end+4.6s`} id={`po${i}`} fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" keyTimes="0;1" keyPoints="0;1">
                        <mpath href={`#cf2-out-${i}`} />
                      </animateMotion>
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.6s" begin={`po${i}.begin`} fill="freeze" />
                    </circle>
                  ))}

                  {/* Blocked flag at the plane edge */}
                  <g transform={geo.stacked ? `translate(${geo.block.x + 10}, ${geo.block.y - 34})` : `translate(${geo.block.x - 78}, ${geo.block.y - 30})`} opacity="0">
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="3.2s" begin={`pi${BLOCKED}.end`} fill="freeze" />
                    <rect width="70" height="22" rx="11" className="cf2-block-chip" />
                    <text x="35" y="15" textAnchor="middle" className="cf2-block-text">
                      Blocked
                    </text>
                  </g>
                  <circle cx={geo.block.x} cy={geo.block.y} r="6" fill="none" stroke="#f43f5e" opacity="0">
                    <animate attributeName="r" values="6;20" dur="1.2s" begin={`pi${BLOCKED}.end`} />
                    <animate attributeName="opacity" values="0.7;0" dur="1.2s" begin={`pi${BLOCKED}.end`} fill="freeze" />
                  </circle>
                </>
              )}
            </svg>
          )}

          {/* ── Identities ── */}
          <div className="relative z-10 order-1 lg:order-none">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3">Every identity</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2.5 lg:gap-4">
              {IDENTITIES.map((it, i) => (
                <Node
                  key={it.label}
                  ref={(el) => {
                    idRefs.current[i] = el;
                  }}
                  label={it.label}
                  Icon={it.icon}
                  pulse={pulseId?.i === i ? (i === BLOCKED ? "deny" : "ok") : undefined}
                  pulseKey={pulseId?.i === i ? pulseId.n : 0}
                />
              ))}
            </div>
          </div>

          
          {/* ── The plane: an open ring around the OmniPriv core ── */}
          <div className="relative z-10 order-3 lg:order-none flex flex-col items-center">
            <div ref={planeRef} className="cf3-core relative w-full max-w-[21.25rem] aspect-square">
              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
                {/* faint inner guide */}
                <circle cx="160" cy="160" r={RING_R - 22} className="cf3-guide" />
                {STAGES.map((st, i) => {
                  // Base arc: done stages full, the rest empty. Changes are instant;
                  // the moving part is the single timed overlay below.
                  const timedNow = motionOk && animate && !hovering;
                  const full = !motionOk || (timedNow ? i < active : i <= active);
                  return (
                    <g key={st.title}>
                      <path d={arcPath(i)} pathLength={1} className="cf3-track" />
                      <path
                        d={arcPath(i)}
                        pathLength={1}
                        className={`cf3-arc ${full ? "is-full" : ""} ${i === active ? "is-active" : ""}`}
                      />
                      {timedNow && i === active && (
                        <path
                          key={`t-${round}`}
                          d={arcPath(i)}
                          pathLength={1}
                          className="cf3-arc is-timed is-active"
                          style={{ animationDuration: `${STEP_MS}ms` }}
                        />
                      )}
                    </g>
                  );
                })}
                {/* A finished cycle: the full ring fades out as Discover starts again */}
                {motionOk && animate && loopRun > 0 && (
                  <g key={`wrap-${loopRun}`} className="cf3-wrap">
                    {STAGES.map((st, i) => (
                      <path key={st.title} d={arcPath(i)} pathLength={1} className="cf3-arc is-full" />
                    ))}
                  </g>
                )}
              </svg>

              {/* The refused request reached the ring: one rose glow */}
              {hit && <span key={hit.n} className={`cf3-hit ${hit.ok ? "" : "is-deny"}`} aria-hidden="true" />}

              {/* Core */}
              <div className="absolute inset-[22%] flex flex-col items-center justify-center text-center">
                <Image
                  src="/omnipriv-light.png"
                  alt="OmniPriv"
                  width={835}
                  height={175}
                  className="w-[64%] max-w-[9.375rem] h-auto dark:hidden"
                />
                <Image
                  src="/omniprivdark.png"
                  alt="OmniPriv"
                  width={835}
                  height={175}
                  className="w-[64%] max-w-[9.375rem] h-auto hidden dark:block"
                />
                <span className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Control plane
                </span>
                <span className="mt-2.5 min-h-[2.6rem] flex items-start justify-center text-[0.7188rem] leading-snug text-slate-500 dark:text-slate-400">
                  {animate && decision ? (
                    <span key={decision.n} className="cf2-decision flex flex-col items-center">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                        <span className={`cf3-dot ${DECISIONS[decision.i].ok ? "" : "is-deny"}`} aria-hidden="true" />
                        {DECISIONS[decision.i].who}
                      </span>
                      <span className={DECISIONS[decision.i].ok ? "" : "text-rose-600 dark:text-rose-400 font-medium"}>
                        {DECISIONS[decision.i].what}
                      </span>
                    </span>
                  ) : (
                    <span className="max-w-[12rem]">
                      <span className={`cf2-live inline-block align-middle mr-1.5 ${animate ? "is-on" : ""}`} aria-hidden="true" />
                      Intelligent detection and response
                    </span>
                  )}
                </span>
              </div>
            </div>

          </div>

          {/* ── Under the ring: stage tabs, the active stage, the feedback loop ── */}
          <div className="relative z-10 order-6 lg:order-none lg:col-start-2 lg:row-start-2 flex flex-col items-center">
            {/* Stage tabs */}
            <div
              role="tablist"
              aria-label="Control plane stages"
              className="mt-2 flex flex-wrap justify-center items-center gap-1.5"
              onMouseLeave={() => setHovering(false)}
            >
              {STAGES.map((st, i) => {
                const on = i === active;
                return (
                  <button
                    key={st.title}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onMouseEnter={() => {
                      setHovering(true);
                      setActive(i);
                    }}
                    onFocus={() => {
                      setHovering(true);
                      setActive(i);
                    }}
                    onBlur={() => setHovering(false)}
                    onClick={() => setActive(i)}
                    className={`cf3-tab ${on ? "is-on" : ""}`}
                  >
                    <st.icon className="w-4 h-4" aria-hidden="true" />
                    {st.title}
                  </button>
                );
              })}
            </div>

            {/* Active stage detail: open text, no container */}
            <div className="mt-5 w-full max-w-md text-center min-h-[8.5rem]" role="tabpanel">
              <div key={`${active}-${round}`} className="cf3-detail">
                <p className="text-[0.9375rem] text-slate-600 dark:text-slate-300 leading-relaxed">{STAGES[active].lead}</p>
                <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2.5">
                  {STAGES[active].items.map((it, k) => (
                    <li key={it} className="cf3-item inline-flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200" style={{ ["--k" as string]: k }}>
                      <svg viewBox="0 0 14 14" className="cf3-check" aria-hidden="true">
                        <path d="M2.5 7.5 L5.5 10.5 L11.5 3.5" />
                      </svg>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feedback loop */}
            <div className="mt-4 flex items-center justify-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <RefreshCw
                key={`spin-${loopRun}`}
                className={`w-3.5 h-3.5 text-[#00B8DB] ${animate && loopRun > 0 ? "cf2-spin-once" : ""}`}
                aria-hidden="true"
              />
              Automated policy and posture feed every decision back into Discover
            </div>
          </div>

          
          {/* ── Targets ── */}
          <div className="relative z-10 order-4 lg:order-none flex flex-col-reverse lg:flex-col">
            {/* Label under the nodes when stacked, so the wires land on the nodes themselves */}
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-3 lg:mt-0 lg:mb-3 lg:text-right">Every target</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-1 gap-2.5 lg:gap-4">
              {TARGETS.map((it, i) => (
                <Node
                  key={it.label}
                  ref={(el) => {
                    tgRefs.current[i] = el;
                  }}
                  label={it.label}
                  Icon={it.icon}
                  right
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* A single identity or target node. `pulse` lights it briefly as a request leaves or lands. */
const Node = forwardRef<
  HTMLDivElement,
  { label: string; Icon: ElementType; right?: boolean; pulse?: "ok" | "deny"; pulseKey?: number }
>(function Node({ label, Icon, right, pulse, pulseKey = 0 }, ref) {
  return (
    <div
      ref={ref}
      className={`cf2-node relative flex items-center gap-3 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#0b0c0e] px-3 py-2.5 ${
        right ? "lg:flex-row-reverse lg:text-right" : ""
      }`}
    >
      {pulse && <span key={pulseKey} className={`cf2-node-pulse ${pulse === "deny" ? "is-deny" : ""}`} aria-hidden="true" />}
      <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#00B8DB]/10 text-[#00B8DB] shrink-0">
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{label}</span>
    </div>
  );
});
