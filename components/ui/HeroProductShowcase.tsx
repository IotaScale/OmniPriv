"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  Activity,
  ArrowRight,
  AlertTriangle,
  Ban,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  Fingerprint,
  KeyRound,
  Link2,
  RefreshCw,
  LayoutDashboard,
  Lock,
  Monitor,
  Network,
  Radar,
  Radio,
  ScrollText,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  User,
  UserCheck,
} from "lucide-react";

/*
 * Homepage hero visual: the OmniPriv console, built live rather than shown as
 * screenshots.
 *
 * Five scenes, autoplaying (each builds, holds 2s, then moves on). Figures
 * are the codebase-verified ones (see SCENES):
 *   0. Audit chain checkpoints land one by one, "Verify chain" is pressed,
 *      each block turns Verified and the chain reads Intact
 * and the original four:
 *   1. Overview    the dashboard's icons and charts start outside the window,
 *                  float for a beat, then fly into place; counters run up
 *   2. Assets      endpoints are discovered one by one, go online, and their
 *                  credentials are vaulted
 *   3. Compliance  evidence fills the posture donut and the framework bars
 *   4. Audit       a live activity stream; ML flags an agent's DROP TABLE,
 *                  it is held for approval and denied
 *
 * Every figure comes from the real product captures in /public/product
 * (78 ML anomalies, 72 high threat, 0 blocked, 35 SIEM events, 4 login
 * failures; 7 assets with their real hostnames and addresses; 86% readiness,
 * 31 / 3 / 4 / 4 across 42 controls, 7 attention required, 1 attestation).
 * The audit stream is an illustration of the approval flow described on
 * /ai-pam, using those same asset names.
 *
 * Mechanics:
 *   - All UI is sized in `cqw` against the window, so it scales as one
 *     picture at every width.
 *   - Choreography is CSS keyframes with per-element `--d` delays; a scene
 *     replays because it is remounted with a new key.
 *   - The tab progress hairline's `animationend` advances the scene, so the
 *     bar and the switch can never drift; hovering the window pauses it.
 *   - Counters write textContent through a ref: no React re-render per frame.
 *
 * Reduced motion: every keyframe class rests on its finished state, counters
 * show their final value, and autoplay never starts (tabs still work).
 */

type SceneKey = "overview" | "assets" | "chain" | "compliance" | "audit";

/*
 * Each scene: its tab, a short title and caption under the window, and two
 * floating callouts. The ML and compliance scenes carry what used to be the
 * homepage's separate "An ML engine that watches every privileged move" and
 * "Evidence for the most regulated environments" sections.
 *
 * `dwell` = the scene's build time + 2s of rest, so every scene finishes its
 * animation, holds for two seconds, then the tour moves on.
 */
type CalloutSpec = { Icon: typeof LayoutDashboard; text: string; sub: string; at: number; target: string };

const HOLD = 2;
/*
 * Time scale for every scene's choreography (delays, durations, counters).
 * At 0.5 each scene builds in about 2 to 2.5s; the CSS reads it as --spd.
 */
const SPEED = 0.5;
const SCENES: {
  key: SceneKey;
  tab: string;
  Icon: typeof LayoutDashboard;
  path: string;
  title: string;
  caption: string;
  build: number;
  /* Each callout names one capability, appears at `at` (scene seconds,
     before SPEED), then reaches into the console: a link is drawn to the
     element marked data-hl={target}, and that element lights up. */
  callouts: [CalloutSpec, CalloutSpec];
}[] = [
  {
    key: "overview",
    tab: "ML detection",
    Icon: BrainCircuit,
    path: "dashboard",
    title: "An ML engine that watches every privileged move",
    caption: "39 behavioural features scored per session. Anomalies are swept every 10 seconds and the session is cut after a 10-second grace.",
    build: 2.1,
    callouts: [
      { Icon: BrainCircuit, text: "39 behavioural features", sub: "Scored on every session", at: 2.0, target: "stat-0" },
      { Icon: Ban, text: "Auto-block sweep every 10s", sub: "Anomalous sessions cut off", at: 3.0, target: "stat-1" },
    ],
  },
  {
    key: "audit",
    tab: "AI agents",
    Icon: Bot,
    path: "audit/activity",
    title: "AI agents stay inside their policy",
    caption: "53 permission-gated MCP tool actions, with the same controls as a human. Risky actions wait for approval.",
    build: 2.4,
    callouts: [
      { Icon: UserCheck, text: "53 permission-gated MCP tools", sub: "Risky call flagged by policy", at: 2.6, target: "flag-row" },
      { Icon: ShieldAlert, text: "Human-in-the-loop approval", sub: "Agent token revoked on deny", at: 4.3, target: "approve" },
    ],
  },
  {
    key: "assets",
    tab: "Vault",
    Icon: KeyRound,
    path: "vault/credentials",
    title: "Credentials vaulted, never exposed",
    caption: "An isolated vault with a three-level key hierarchy (KEK, per-org DEK, per-secret SEK) and automatic rotation.",
    build: 2.5,
    callouts: [
      { Icon: Lock, text: "Three-level key hierarchy", sub: "KEK, per-org DEK, per-secret SEK", at: 1.6, target: "keys" },
      { Icon: KeyRound, text: "Automatic rotation", sub: "Credentials rotated, never shown", at: 2.9, target: "rotated" },
    ],
  },
  {
    key: "chain",
    tab: "Audit chain",
    Icon: Link2,
    path: "audit/chain",
    title: "Audit logs nobody can quietly edit",
    caption: "Every audit event is HMAC-SHA256 hash-chained, checkpointed every 50 rows and re-verified every 5 minutes.",
    build: 2.6,
    callouts: [
      { Icon: Link2, text: "Verify the chain in one click", sub: "HMAC-SHA256 over every event", at: 1.9, target: "verify" },
      { Icon: RefreshCw, text: "Re-verified every 5 minutes", sub: "Any edit breaks the chain", at: 4.4, target: "status" },
    ],
  },
  {
    key: "compliance",
    tab: "Compliance",
    Icon: ShieldCheck,
    path: "audit/compliance",
    title: "Evidence for the most regulated environments",
    caption: "20 report types across 5 categories, mapped to 6 frameworks and 42 controls, exported as signed CSV or PDF.",
    build: 2.2,
    callouts: [
      { Icon: FileText, text: "20 audit-ready report types", sub: "Signed CSV and PDF exports", at: 2.7, target: "reports" },
      { Icon: FileCheck2, text: "Mapped to 6 frameworks", sub: "42 controls tracked live", at: 3.4, target: "frameworks" },
    ],
  },
];

export default function HeroProductShowcase() {
  const [active, setActive] = useState(0);
  const [round, setRound] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const [links, setLinks] = useState<{ k: number; d: string; x: number; y: number }[]>([]);

  const scene = SCENES[active];

  /*
   * Callouts act on the console. When a callout appears, find the element it
   * describes (data-hl), light it up, and draw a link from the callout to it.
   * Measured at that moment, so the element is already in place. Desktop only,
   * like the callouts themselves.
   */
  useEffect(() => {
    setLinks([]);
    const tilt = tiltRef.current;
    if (!tilt || !window.matchMedia("(min-width: 1024px)").matches) return;
    const timers: number[] = [];
    SCENES[active].callouts.forEach((c, k) => {
      timers.push(
        window.setTimeout(() => {
          const target = tilt.querySelector<HTMLElement>(`[data-hl="${c.target}"]`);
          const card = tilt.querySelector<HTMLElement>(`[data-callout="${k}"]`);
          if (!target || !card) return;
          target.classList.add("is-hl");
          const R = tilt.getBoundingClientRect();
          const a = card.getBoundingClientRect();
          const b = target.getBoundingClientRect();
          const rel = (x: number, y: number) => ({ x: x - R.left, y: y - R.top });
          const acx = (a.left + a.right) / 2;
          const acy = (a.top + a.bottom) / 2;
          const bcx = (b.left + b.right) / 2;
          const bcy = (b.top + b.bottom) / 2;
          // Leave the callout from the side facing the target, arrive on the side facing the callout.
          const vertical = bcy > a.bottom || bcy < a.top;
          const s0 = vertical
            ? rel(Math.min(Math.max(bcx, a.left + 24), a.right - 24), bcy > a.bottom ? a.bottom : a.top)
            : rel(bcx < a.left ? a.left : a.right, acy);
          const e0 =
            acy < b.top
              ? rel(bcx, b.top)
              : acy > b.bottom
                ? rel(bcx, b.bottom)
                : rel(acx < b.left ? b.left : b.right, bcy);
          const c1 = vertical ? { x: s0.x, y: (s0.y + e0.y) / 2 } : { x: (s0.x + e0.x) / 2, y: s0.y };
          const c2 = { x: (s0.x + e0.x) / 2 + (e0.x - s0.x) * 0.25, y: e0.y };
          const d = `M${s0.x},${s0.y} C${c1.x},${c1.y} ${c2.x},${c2.y} ${e0.x},${e0.y}`;
          setLinks((l) => [...l, { k, d, x: e0.x, y: e0.y }]);
        }, (c.at * SPEED + 0.3) * 1000)
      );
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [active, round]);

  const go = (i: number) => {
    setActive(i);
    setRound((r) => r + 1);
  };
  const next = () => go((active + 1) % SCENES.length);

  // Very small pointer tilt, eased in rAF and written straight to the node.
  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.07;
      cur.y += (target.y - cur.y) * 0.07;
      tilt.style.transform = `perspective(2200px) rotateY(${cur.x * 2.5}deg) rotateX(${-cur.y * 2}deg)`;
      const done = Math.abs(target.x - cur.x) < 0.001 && Math.abs(target.y - cur.y) < 0.001;
      raf = done ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      wake();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };
    stage.addEventListener("pointermove", onMove, { passive: true });
    stage.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const auditArea = scene.key === "compliance" || scene.key === "audit" || scene.key === "chain";

  return (
    <div ref={stageRef} className="relative" style={{ ["--spd" as string]: SPEED }}>
      <div data-motion className="hp-window-enter">
        <div ref={tiltRef} className="hp-tilt relative">
          {/* Capability callouts sit in a row above the window (desktop), never on top
              of the console, so they stay readable. A link runs from each one down to
              the console element it describes. */}
          <div key={`c-${round}`} className="hidden lg:block" aria-hidden="true">
            <div className="absolute bottom-[calc(100%+16px)] left-0 right-0 z-30 flex items-end justify-between gap-4">
              <Callout k={0} className="" {...scene.callouts[0]} />
              <Callout k={1} className="" {...scene.callouts[1]} />
            </div>
            {/* Links from each callout into the console element it describes */}
            <svg className="hp-links absolute inset-0 w-full h-full overflow-visible pointer-events-none" aria-hidden="true">
              {links.map((l) => (
                <g key={l.k} className="hp-link">
                  <path d={l.d} pathLength={1} className="hp-link-path" />
                  <circle cx={l.x} cy={l.y} r="4" className="hp-link-dot" />
                  <circle cx={l.x} cy={l.y} r="4" className="hp-link-ring" />
                </g>
              ))}
            </svg>
          </div>

          <div
            className="hp-window"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <span data-motion className="hp-sheen" aria-hidden="true" />

            {/* Browser bar */}
            <div className="flex items-center gap-3 h-9 sm:h-10 px-3 sm:px-4 border-b border-white/[0.07] bg-[#0d1d35] rounded-t-[14px]">
              <div className="hidden sm:flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/[0.12]" />
              </div>
              <div className="mx-auto flex items-center gap-1.5 min-w-0 max-w-[70%] rounded-md bg-white/[0.04] border border-white/[0.06] px-3 py-1 text-[11px] sm:text-xs text-slate-400 font-mono">
                <Lock className="w-3 h-3 shrink-0 text-slate-500" aria-hidden="true" />
                <span className="truncate">
                  app.omnipriv.com/
                  <span key={scene.key} className="hp-path text-slate-200">
                    {scene.path}
                  </span>
                </span>
              </div>
              <div className="hidden sm:block w-[46px]" aria-hidden="true" />
            </div>

            {/* The console */}
            <div className="hp-app-frame" role="img" aria-label={`OmniPriv console, ${scene.tab}: ${scene.caption}`}>
              <div className="hp-app">
                <TopBar auditArea={auditArea} />
                <SideBar scene={scene.key} />
                <main className="hp-main">
                  {scene.key === "overview" && <OverviewScene key={round} />}
                  {scene.key === "assets" && <AssetsScene key={round} />}
                  {scene.key === "chain" && <ChainScene key={round} />}
                  {scene.key === "compliance" && <ComplianceScene key={round} />}
                  {scene.key === "audit" && <AuditScene key={round} />}
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Product tour"
        className="hp-fade mt-5 grid grid-cols-5 gap-1 sm:gap-2"
        style={{ animationDelay: "0.9s" }}
      >
        {SCENES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => go(i)}
              className={`relative flex items-center justify-center lg:justify-start gap-2 pt-3 pb-1 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                on ? "text-slate-950 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              }`}
            >
              <span className="absolute left-0 right-0 top-0 h-px bg-slate-900/[0.1] dark:bg-white/[0.1]" aria-hidden="true" />
              <span
                key={on ? `on-${round}` : "off"}
                data-motion
                className={`hp-progress absolute left-0 right-0 top-0 h-px bg-[#00B8DB] ${on ? "is-on" : ""} ${
                  paused ? "is-paused" : ""
                }`}
                style={{ animationDuration: `${s.build + HOLD}s` }}
                onAnimationEnd={on ? next : undefined}
                aria-hidden="true"
              />
              <s.Icon className={`w-4 h-4 shrink-0 ${on ? "text-[#00667a] dark:text-[#00B8DB]" : ""}`} aria-hidden="true" />
              <span className="hidden sm:inline">{s.tab}</span>
              <span className="sr-only sm:hidden">{s.tab}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        {/*
          Every caption is stacked in the same grid cell and only the active one
          is shown. The cell is always as tall as the longest caption, so the
          window above never moves when a caption is one line longer or shorter.
        */}
        <div className="grid max-w-lg flex-1" aria-live="polite">
          {SCENES.map((sc) => {
            const on = sc.key === scene.key;
            return (
              <div
                key={on ? `${sc.key}-${round}` : sc.key}
                className={`[grid-area:1/1] ${on ? "hp-path" : "invisible"}`}
                aria-hidden={!on}
              >
                <p
                  className="text-lg sm:text-xl font-semibold tracking-[-0.02em] leading-snug text-slate-950 dark:text-white"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {sc.title}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/90 leading-relaxed">{sc.caption}</p>
              </div>
            );
          })}
        </div>
        <Link href="/features" className="hp-all-features group shrink-0">
          Explore all 32 features
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

/* ── Shared bits ───────────────────────────────────────── */

/** Delay helper: sets `--d` (seconds) for the CSS choreography. */
const d = (s: number, extra?: CSSProperties): CSSProperties => ({ ["--d" as string]: `${s * SPEED}s`, ...extra });

/** Start offset for a piece that flies in from outside the window (cqw). */
const from = (x: number, y: number, r = 0, delay = 0): CSSProperties => ({
  ["--fx" as string]: `${x}cqw`,
  ["--fy" as string]: `${y}cqw`,
  ["--fr" as string]: `${r}deg`,
  ["--d" as string]: `${delay * SPEED}s`,
});

/** Counts up to `to` once, via textContent. Renders the final value first. */
function Count({ to, delay = 0, dur = 900, suffix = "" }: { to: number; delay?: number; dur?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.textContent = `0${suffix}`;
    let raf = 0;
    let start = 0;
    const t = window.setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / (dur * SPEED));
        el.textContent = `${Math.round(to * (1 - Math.pow(1 - p, 3)))}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay * SPEED * 1000);
    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [to, delay, dur, suffix]);
  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}

function Callout({
  k,
  Icon,
  text,
  sub,
  at,
  className,
}: CalloutSpec & { k: number; className: string }) {
  return (
    <div data-motion data-callout={k} className={`hp-callout relative ${className}`} style={d(at)}>
      <span className="hp-callout-icon">
        <Icon className="w-[18px] h-[18px]" />
      </span>
      <span className="min-w-0">
        <span className="block text-[14.5px] font-semibold text-white leading-tight whitespace-nowrap">{text}</span>
        <span className="block mt-0.5 text-[12px] text-slate-300/85 whitespace-nowrap">{sub}</span>
      </span>
    </div>
  );
}

function TopBar({ auditArea }: { auditArea: boolean }) {
  const items = [
    { Icon: LayoutDashboard, label: "Dashboard", on: !auditArea },
    { Icon: Activity, label: "Audit", on: auditArea },
    { Icon: Bot, label: "AI", on: false },
  ];
  return (
    <div className="hp-topbar">
      <div className="flex items-center gap-[0.8cqw]">
        <span className="hp-logo">
          <Shield className="w-[1.6cqw] h-[1.6cqw]" />
        </span>
        <span className="leading-none">
          <span className="block font-bold text-[1.3cqw] text-white">OmniPriv</span>
          <span className="block text-[0.95cqw] tracking-[0.12em] text-white/60 mt-[0.2cqw]">PRIVACY PLATFORM</span>
        </span>
      </div>
      <nav className="flex items-center gap-[1.8cqw]">
        {items.map(({ Icon, label, on }) => (
          <span key={label} className={`hp-nav ${on ? "is-on" : ""}`}>
            <Icon className="w-[1.1cqw] h-[1.1cqw]" />
            {label}
          </span>
        ))}
      </nav>
      <span className="hp-avatar">AD</span>
    </div>
  );
}

function SideBar({ scene }: { scene: SceneKey }) {
  const dash = [
    { Icon: LayoutDashboard, label: "Dashboard", on: scene === "overview" },
    { Icon: KeyRound, label: "Vault", on: scene === "assets" },
    { Icon: Network, label: "Network Segments", on: false },
    { Icon: Database, label: "Gateways", on: false },
    { Icon: Lock, label: "Authorizations", on: false },
    { Icon: ShieldCheck, label: "ACLs", on: false },
  ];
  const audit = [
    { Icon: Activity, label: "Activity Logs", on: scene === "audit" },
    { Icon: Monitor, label: "Sessions", on: false },
    { Icon: Link2, label: "Audit Chain", on: scene === "chain" },
    { Icon: FileText, label: "Reports", on: false },
    { Icon: ShieldCheck, label: "Compliance", on: scene === "compliance" },
  ];
  const list = scene === "compliance" || scene === "audit" || scene === "chain" ? audit : dash;
  return (
    <aside className="hp-side">
      {list.map(({ Icon, label, on }) => (
        <span key={label} className={`hp-side-item ${on ? "is-on" : ""}`}>
          <Icon className="w-[1.25cqw] h-[1.25cqw] shrink-0" />
          {label}
        </span>
      ))}
    </aside>
  );
}

function PageHead({ Icon, title, sub, right }: { Icon: typeof Bot; title: string; sub: string; right?: ReactNode }) {
  return (
    <div data-motion className="hp-pop flex items-start justify-between" style={d(0.1)}>
      <div className="flex items-center gap-[1cqw]">
        <span className="hp-head-icon">
          <Icon className="w-[1.6cqw] h-[1.6cqw]" />
        </span>
        <span>
          <span className="block font-bold text-white text-[1.9cqw] leading-tight">{title}</span>
          <span className="block text-[1.2cqw] text-slate-400 mt-[0.2cqw]">{sub}</span>
        </span>
      </div>
      {right}
    </div>
  );
}

/* ── Scene 1: Overview assembles itself ───────────────────── */

/* Codebase-verified engine figures, front and centre in scene 1. */
const STATS = [
  { Icon: BrainCircuit, value: 39, suffix: "", label: "Behavioural features", sub: "Scored per session", tone: "cyan", fly: from(-18, -16, -14, 0.4) },
  { Icon: Ban, value: 10, suffix: "s", label: "Auto-block sweep", sub: "Anomalies cut off", tone: "red", fly: from(-5, -20, 10, 0.5) },
  { Icon: Clock, value: 10, suffix: "s", label: "Grace period", sub: "Then the session ends", tone: "orange", fly: from(9, -21, -8, 0.6) },
  { Icon: Bot, value: 53, suffix: "", label: "MCP tools", sub: "Permission-gated", tone: "violet", fly: from(20, -15, 12, 0.7) },
] as const;

/*
 * One stat card for every scene, the same size and layout as the ML engine's:
 * icon tile, big number, label, one line of context. Keeps all five panels
 * reading at the same scale.
 */
type Tone = "cyan" | "red" | "orange" | "violet" | "green" | "amber";

function StatCard({
  Icon,
  tone,
  value,
  label,
  sub,
  hl,
  delay,
  mono = false,
  style,
}: {
  Icon: typeof LayoutDashboard;
  tone: Tone;
  value: ReactNode;
  label: string;
  sub?: string;
  hl?: string;
  delay: number;
  mono?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div data-motion data-hl={hl} className="hp-pop hp-card" style={d(delay)}>
      <span data-motion className={`hp-fly hp-stat-icon is-${tone}`} style={style}>
        <Icon className="w-[1.5cqw] h-[1.5cqw]" />
      </span>
      <span className={`relative block mt-[1cqw] h-[2.4cqw] font-bold leading-none text-white ${mono ? "font-mono text-[1.75cqw] leading-[2.4cqw] whitespace-nowrap" : "text-[2.4cqw]"}`}>
        {value}
      </span>
      <span className="block mt-[0.5cqw] text-[1.05cqw] tracking-[0.08em] text-slate-400 uppercase truncate">{label}</span>
      {sub && <span className="block text-[1cqw] mt-[0.2cqw] text-slate-500 truncate">{sub}</span>}
    </div>
  );
}

function OverviewScene() {
  return (
    <div className="flex flex-col gap-[1.3cqw] h-full">
      <PageHead
        Icon={BrainCircuit}
        title="AI-PAM engine"
        sub="An ML engine that watches every privileged move"
        right={
          <span data-motion className="hp-pop hp-chip" style={d(2.8)}>
            <BrainCircuit className="w-[1.1cqw] h-[1.1cqw]" />
            AI engine scoring live
          </span>
        }
      />

      <div className="grid grid-cols-4 gap-[1cqw]">
        {STATS.map((s, i) => (
          <StatCard
            key={s.label}
            Icon={s.Icon}
            tone={s.tone}
            hl={`stat-${i}`}
            delay={0.15 + i * 0.05}
            style={s.fly}
            value={<Count to={s.value} delay={2.4 + i * 0.1} suffix={s.suffix} />}
            label={s.label}
            sub={s.sub}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-[1cqw] flex-1 min-h-0">
        <Panel title="Security Threat Landscape" d={0.35}>
          <div data-motion className="hp-fly flex items-center justify-center h-full" style={{ ...from(-22, 16, -8, 0.7), ["--fs" as string]: 1.25 }}>
            <RadarChart delay={0.95} />
          </div>
        </Panel>
        <Panel title="Compliance Posture" d={0.4}>
          <div data-motion className="hp-fly flex items-center justify-center h-full" style={{ ...from(-2, 20, 9, 0.85), ["--fs" as string]: 1.25 }}>
            <Donut
              size={13}
              stroke={1.6}
              segments={[
                { v: 31, c: "#10b981" },
                { v: 3, c: "#f59e0b" },
                { v: 4, c: "#ef4444" },
                { v: 4, c: "#94a3b8" },
              ]}
              delay={1.1}
              center={<Count to={86} delay={1.1} suffix="%" />}
            />
          </div>
        </Panel>
        <Panel title="Asset Types" d={0.45}>
          <div data-motion className="hp-fly flex items-center justify-center h-full" style={{ ...from(14, 20, -10, 1.0), ["--fs" as string]: 1.25 }}>
            <Donut
              size={13}
              stroke={1.6}
              segments={[
                { v: 2, c: "#0e9fc4" },
                { v: 1, c: "#1188b5" },
                { v: 1, c: "#2b74c9" },
                { v: 1, c: "#3f63cf" },
                { v: 1, c: "#5b5bd6" },
                { v: 1, c: "#8b5cf6" },
              ]}
              delay={1.25}
              center={<Count to={7} delay={1.25} />}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, d: delay, children }: { title: string; d: number; children: ReactNode }) {
  return (
    <div data-motion className="hp-pop hp-panel" style={d(delay)}>
      <span className="block font-semibold text-white text-[1.25cqw]">{title}</span>
      <span className="block text-[1cqw] text-slate-500 mt-[0.1cqw]">Current</span>
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}

function RadarChart({ delay }: { delay: number }) {
  return (
    <svg viewBox="-50 -50 100 100" className="w-[16cqw] h-[14cqw]" aria-hidden="true">
      {[40, 30, 20, 10].map((r) => (
        <polygon
          key={r}
          points={`0,${-r} ${r * 0.866},${r * 0.5} ${-r * 0.866},${r * 0.5}`}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
        />
      ))}
      <g data-motion className="hp-radar" style={d(delay)}>
        <polygon points="0,-40 30,17 -4,2" fill="rgba(139,92,246,0.35)" stroke="#8b5cf6" strokeWidth="1" />
      </g>
      <text x="0" y="-44" textAnchor="middle" fontSize="5" fill="#64748b">Anomalies</text>
      <text x="38" y="28" textAnchor="middle" fontSize="5" fill="#64748b">High Threats</text>
      <text x="-38" y="28" textAnchor="middle" fontSize="5" fill="#64748b">Blocked</text>
    </svg>
  );
}

function Donut({
  size,
  stroke,
  segments,
  delay,
  center,
}: {
  size: number;
  stroke: number;
  segments: { v: number; c: string }[];
  delay: number;
  center: ReactNode;
}) {
  const total = segments.reduce((a, s) => a + s.v, 0);
  const r = 15.9155; // circumference 100
  let acc = 0;
  return (
    <div className="relative" style={{ width: `${size}cqw`, height: `${size}cqw` }}>
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90" aria-hidden="true">
        <circle cx="18" cy="18" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke * 2} />
        {segments.map((s, i) => {
          const len = (s.v / total) * 100;
          const start = acc;
          acc += len;
          const gap = 0.6;
          return (
            <circle
              key={i}
              data-motion
              className="hp-arc"
              cx="18"
              cy="18"
              r={r}
              fill="none"
              stroke={s.c}
              strokeWidth={stroke * 2}
              strokeDasharray={`${Math.max(0, len - gap)} ${100 - Math.max(0, len - gap)}`}
              strokeDashoffset={-start}
              style={d(delay + (start / 100) * 0.9, { ["--len" as string]: Math.max(0, len - gap), ["--off" as string]: -start })}
            />
          );
        })}
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-[2cqw]">{center}</span>
    </div>
  );
}

/* ── Scene 2: assets discovered, onboarded, vaulted ─────────── */

const ASSETS = [
  { host: "Windows", addr: "172.16.122.48", type: "Windows" },
  { host: "Mongo", addr: "10.99.99.9", type: "MongoDB" },
  { host: "clickHouse", addr: "10.99.99.9", type: "ClickHouse" },
  { host: "Genesis VPN", addr: "vpn.corp.local", type: "Web" },
  { host: "postgres_testing", addr: "172.16.129.100", type: "PostgreSQL" },
  { host: "linux_prod_01", addr: "172.16.122.119", type: "Linux" },
  { host: "windows_prod_01", addr: "172.16.122.124", type: "Windows" },
];

function AssetsScene() {
  const ROW0 = 0.7;
  const STEP = 0.42;
  return (
    <div className="flex flex-col gap-[1.2cqw] h-full">
      <PageHead
        Icon={KeyRound}
        title="Credential Vault"
        sub="Isolated vault service with automatic rotation"
        right={
          <span data-motion className="hp-pop hp-chip" style={d(0.3)}>
            <Radar data-motion className="hp-spin w-[1.1cqw] h-[1.1cqw]" />
            Auto-discovery on
          </span>
        }
      />
      <div className="grid grid-cols-4 gap-[1cqw]">
        {(
          [
            { label: "Total assets", to: 7, tone: "cyan", Icon: Server, sub: "Discovered automatically" },
            { label: "Online", to: 7, tone: "green", Icon: Activity, sub: "Reachable right now" },
            { label: "Vaulted credentials", to: 7, tone: "amber", Icon: KeyRound, sub: "Never shown to users" },
            { label: "Key hierarchy", to: 3, tone: "violet", Icon: Lock, sub: "KEK, DEK, SEK" },
          ] as const
        ).map((s, i) => (
          <StatCard
            key={s.label}
            Icon={s.Icon}
            tone={s.tone}
            hl={i === 3 ? "keys" : undefined}
            delay={0.15 + i * 0.05}
            value={i === 3 ? s.to : <Count to={s.to} delay={ROW0 + (i === 2 ? 1.3 : 0.4)} dur={ASSETS.length * STEP * 1000} />}
            label={s.label}
            sub={s.sub}
          />
        ))}
      </div>

      <div data-motion className="hp-pop hp-panel !p-0 flex-1 min-h-0 overflow-hidden relative" style={d(0.3)}>
        <span data-motion className="hp-scanbar" style={d(ROW0)} aria-hidden="true" />
        <div className="hp-tr hp-th">
          <span>Hostname</span>
          <span>Address</span>
          <span>Type</span>
          <span>Status</span>
          <span>Credentials</span>
        </div>
        {ASSETS.map((a, i) => {
          const t = ROW0 + i * STEP;
          return (
            <div key={a.host} data-motion className="hp-tr hp-row-in" style={d(t)}>
              <span className="font-mono text-white truncate">{a.host}</span>
              <span className="font-mono text-slate-400 truncate">{a.addr}</span>
              <span className="text-slate-300">{a.type}</span>
              <span className="relative">
                <span data-motion className="hp-swap-out hp-pill is-amber" style={d(t + 0.9)}>
                  Scanning
                </span>
                <span data-motion className="hp-swap-in hp-pill is-green absolute left-0 top-0" style={d(t + 0.9)}>
                  Online
                </span>
              </span>
              <span>
                <span data-motion data-hl={i === 1 ? "rotated" : undefined} className="hp-badge-in hp-pill is-vault" style={d(t + 1.3)}>
                  <KeyRound className="w-[0.9cqw] h-[0.9cqw]" />
                  {i % 3 === 1 ? "Rotated" : "Vaulted"}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Scene: the audit chain is verified ───────────────────── */

/* Checkpoints every 50 rows; hashes are illustrative. */
const CHAIN = [
  { n: 1, rows: "1-50", h: "9f2c..a71e" },
  { n: 2, rows: "51-100", h: "4be0..13c9" },
  { n: 3, rows: "101-150", h: "d71a..7f02" },
  { n: 4, rows: "151-200", h: "28c5..e4b8" },
  { n: 5, rows: "201-250", h: "a03f..5d61" },
  { n: 6, rows: "251-300", h: "e6b9..0c47" },
];

function ChainScene() {
  const B0 = 0.4; // first checkpoint lands
  const BSTEP = 0.26;
  const PRESS = B0 + CHAIN.length * BSTEP + 0.2; // "Verify chain" is pressed
  const V0 = PRESS + 0.35;
  const VSTEP = 0.3;
  const DONE = V0 + CHAIN.length * VSTEP;
  return (
    <div className="flex flex-col gap-[1.2cqw] h-full">
      <PageHead
        Icon={Link2}
        title="Audit Chain"
        sub="HMAC-SHA256 hash chain over every audit event"
        right={
          <span data-motion className="hp-pop hp-chip" style={d(0.3)}>
            <RefreshCw className="w-[1.1cqw] h-[1.1cqw]" />
            Auto-verify every 5 min
          </span>
        }
      />
      <div className="grid grid-cols-4 gap-[1cqw]">
        {(
          [
            { label: "Algorithm", value: "HMAC-SHA256", tone: "cyan", Icon: Fingerprint, sub: "Over every audit event" },
            { label: "Checkpoint", value: "50 rows", tone: "violet", Icon: Link2, sub: "Each seals the last" },
            { label: "Re-verify", value: "5 min", tone: "amber", Icon: RefreshCw, sub: "Automatic, continuous" },
          ] as const
        ).map((c, i) => (
          <StatCard key={c.label} Icon={c.Icon} tone={c.tone} delay={0.15 + i * 0.05} mono value={c.value} label={c.label} sub={c.sub} />
        ))}
        <StatCard
          Icon={ShieldCheck}
          tone="green"
          hl="status"
          delay={0.3}
          mono
          label="Chain status"
          sub="No edits detected"
          value={
            <>
              <span data-motion className="hp-swap-out absolute left-0 top-0 text-slate-300" style={d(DONE)}>
                Checking
              </span>
              <span data-motion className="hp-swap-in absolute left-0 top-0 text-emerald-400" style={d(DONE)}>
                Intact
              </span>
            </>
          }
        />
      </div>

      <div data-motion className="hp-pop hp-panel flex-1 min-h-0" style={d(0.3)}>
        <span className="flex items-center justify-between">
          <span>
            <span className="block font-semibold text-white text-[1.25cqw]">Checkpoints</span>
            <span className="block text-[1cqw] text-slate-500">Each block seals the hash of the one before it</span>
          </span>
          <span data-motion data-hl="verify" className="hp-btn-deny hp-btn-verify px-[1.4cqw] py-[0.7cqw]" style={d(PRESS)}>
            <Link2 className="w-[1.1cqw] h-[1.1cqw] mr-[0.5cqw]" />
            Verify chain
          </span>
        </span>

        <div className="flex-1 flex items-center py-[1cqw]">
          <div className="grid grid-cols-3 gap-x-[2cqw] gap-y-[1.4cqw] w-full">
            {CHAIN.map((b, i) => (
              <div key={b.n} data-motion className="hp-row-in relative" style={d(B0 + i * BSTEP)}>
                {i % 3 > 0 && <span className="hp-chain-link" aria-hidden="true" />}
                <div className="hp-chain-block">
                  <span className="flex items-center justify-between text-[1.2cqw] text-slate-400">
                    <span className="font-semibold text-white">Checkpoint {b.n}</span>
                    <span className="font-mono text-[1.05cqw]">rows {b.rows}</span>
                  </span>
                  <span className="block mt-[0.6cqw] font-mono text-[1.15cqw] text-cyan-300 truncate">{b.h}</span>
                  <span className="relative block mt-[0.9cqw] h-[2cqw]">
                    <span data-motion className="hp-swap-out hp-pill is-ghost absolute left-0 top-0" style={d(V0 + i * VSTEP)}>
                      Pending
                    </span>
                    <span data-motion className="hp-swap-in hp-pill is-green absolute left-0 top-0" style={d(V0 + i * VSTEP)}>
                      <CheckCircle2 className="w-[0.9cqw] h-[0.9cqw]" />
                      Verified
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div data-motion className="hp-swap-in hp-chain-done" style={d(DONE + 0.1)}>
          <ShieldCheck className="w-[1.3cqw] h-[1.3cqw]" />
          Chain verified. No edits detected.
        </div>
      </div>
    </div>
  );
}

/* ── Scene 3: compliance fills itself in ──────────────────── */

/* Framework readiness, read off the capture's chart (scale 0-32). */
const FRAMEWORKS = [
  { name: "SOC 2", g: 25, a: 2, r: 3 },
  { name: "ISO 27001", g: 14, a: 3, r: 2 },
  { name: "NIST SP 800-53", g: 26, a: 3, r: 3 },
  { name: "HIPAA", g: 3, a: 1, r: 0 },
  { name: "PCI DSS", g: 21, a: 0, r: 1 },
  { name: "SOX 404", g: 1, a: 1, r: 1 },
];

function ComplianceScene() {
  return (
    <div className="flex flex-col gap-[1.2cqw] h-full">
      <PageHead
        Icon={ShieldCheck}
        title="Evidence for regulated environments"
        sub="Controls mapped to the frameworks your auditors use"
        right={
          <span data-motion data-hl="reports" className="hp-pop hp-chip" style={d(2.6)}>
            <FileText className="w-[1.1cqw] h-[1.1cqw]" />
            20 report types
          </span>
        }
      />
      <div className="grid grid-cols-4 gap-[1cqw]">
        {(
          [
            { label: "Readiness", to: 86, suffix: "%", tone: "green", sub: "31 compliant, 3 partial", Icon: ShieldCheck },
            { label: "Fully evidenced", to: 31, suffix: "", tone: "green", sub: "Zero open coverage gaps", Icon: CheckCircle2 },
            { label: "Attention", to: 7, suffix: "", tone: "amber", sub: "4 non-compliant, 3 partial", Icon: AlertTriangle },
            { label: "Frameworks", to: 6, suffix: "", tone: "cyan", sub: "SOC 2, ISO, NIST, HIPAA, PCI, SOX", Icon: FileCheck2 },
          ] as const
        ).map((s, i) => (
          <StatCard
            key={s.label}
            Icon={s.Icon}
            tone={s.tone}
            delay={0.15 + i * 0.06}
            value={<Count to={s.to} delay={0.6 + i * 0.1} dur={1300} suffix={s.suffix} />}
            label={s.label}
            sub={s.sub}
          />
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1.45fr] gap-[1cqw] flex-1 min-h-0">
        <div data-motion className="hp-pop hp-panel" style={d(0.4)}>
          <span className="flex justify-between items-center">
            <span className="font-semibold text-white text-[1.25cqw]">Posture Distribution</span>
            <span className="hp-pill is-ghost">42 Controls</span>
          </span>
          <div className="flex-1 flex items-center justify-center">
            <Donut
              size={13.5}
              stroke={1.7}
              segments={[
                { v: 31, c: "#10b981" },
                { v: 3, c: "#f59e0b" },
                { v: 4, c: "#ef4444" },
                { v: 4, c: "#94a3b8" },
              ]}
              delay={0.6}
              center={<Count to={86} delay={0.6} dur={1300} suffix="%" />}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-[1cqw] gap-y-[0.3cqw] text-[1cqw]">
            {[
              ["#10b981", "Compliant", 31],
              ["#f59e0b", "Partial", 3],
              ["#ef4444", "Non-compliant", 4],
              ["#94a3b8", "Not applicable", 4],
            ].map(([c, l, v]) => (
              <span key={l as string} className="flex items-center gap-[0.4cqw] text-slate-400">
                <span className="w-[0.6cqw] h-[0.6cqw] rounded-full" style={{ background: c as string }} />
                {l}
                <span className="ml-auto text-slate-300">{v}</span>
              </span>
            ))}
          </div>
        </div>

        <div data-motion data-hl="frameworks" className="hp-pop hp-panel" style={d(0.5)}>
          <span className="font-semibold text-white text-[1.25cqw]">Framework Readiness</span>
          <span className="block text-[1cqw] text-slate-500">Controls mapped to audit standards</span>
          <div className="flex-1 flex flex-col justify-center gap-[0.75cqw] mt-[0.6cqw]">
            {FRAMEWORKS.map((f, i) => (
              <div key={f.name} className="grid grid-cols-[8cqw_1fr] items-center gap-[0.8cqw]">
                <span className="text-right text-[1cqw] text-slate-400">{f.name}</span>
                <div className="relative h-[1.2cqw]">
                  <div
                    data-motion
                    className="hp-grow absolute inset-y-0 left-0 flex rounded-[0.2cqw] overflow-hidden"
                    style={d(0.9 + i * 0.12, { width: `${((f.g + f.a + f.r) / 32) * 100}%` })}
                  >
                    <span style={{ flex: f.g, background: "#10b981" }} />
                    {f.a > 0 && <span style={{ flex: f.a, background: "#f59e0b" }} />}
                    {f.r > 0 && <span style={{ flex: f.r, background: "#ef4444" }} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scene 4: audit stream, ML flags, approval denied ───────── */

const LOG = [
  { t: "09:41:07", who: "j.rahman", kind: "human", target: "linux_prod_01", action: "SSH session opened", risk: "low" },
  { t: "09:41:22", who: "svc-backup", kind: "machine", target: "postgres_testing", action: "Credential checked out, JIT 30 min", risk: "low" },
  { t: "09:42:03", who: "ai-agent-07", kind: "agent", target: "Mongo", action: "Read collection: users", risk: "low" },
  { t: "09:42:15", who: "ai-agent-07", kind: "agent", target: "postgres_testing", action: "DROP TABLE customers", risk: "high" },
  { t: "09:42:16", who: "unknown", kind: "human", target: "windows_prod_01", action: "Login from impossible location", risk: "blocked" },
] as const;

function AuditScene() {
  const ROW0 = 0.5;
  const STEP = 0.55;
  const FLAG = ROW0 + 3 * STEP + 0.4; // the DROP TABLE row lands
  return (
    <div className="flex flex-col gap-[1.2cqw] h-full">
      <PageHead
        Icon={Activity}
        title="Activity Logs"
        sub="Every privileged session, command and agent action"
        right={
          <span data-motion className="hp-pop hp-chip is-rec" style={d(0.3)}>
            <span data-motion className="hp-rec-dot" />
            Recording
          </span>
        }
      />
      <div className="grid grid-cols-4 gap-[1cqw]">
        <StatCard Icon={Bot} tone="cyan" delay={0.1} value={<Count to={53} delay={0.4} />} label="MCP tools" sub="Permission-gated" />
        <StatCard Icon={Activity} tone="green" delay={0.15} value={<Count to={4} delay={0.5} />} label="Live sessions" sub="Recorded end to end" />
        <StatCard Icon={ShieldAlert} tone="red" delay={0.2} value={<Count to={1} delay={FLAG} />} label="Flagged" sub="Risky call held" />
        <StatCard Icon={UserCheck} tone="violet" delay={0.25} value="0" label="Standing access" sub="JIT only" />
      </div>
      <div className="grid grid-cols-[1.55fr_1fr] gap-[1cqw] flex-1 min-h-0">
        <div data-motion className="hp-pop hp-panel !p-0 overflow-hidden" style={d(0.2)}>
          <div className="hp-log hp-th">
            <span>Time</span>
            <span>Identity</span>
            <span>Action</span>
            <span>Risk</span>
          </div>
          {LOG.map((l, i) => {
            const KindIcon = l.kind === "agent" ? Bot : l.kind === "machine" ? Cpu : User;
            const isHigh = l.risk === "high";
            return (
              <div
                key={l.t + l.action}
                data-motion
                data-hl={isHigh ? "flag-row" : undefined}
                className={`hp-log hp-row-in ${isHigh ? "hp-flag" : ""}`}
                style={d(ROW0 + i * STEP)}
              >
                <span className="font-mono text-slate-500">{l.t}</span>
                <span className="flex items-center gap-[0.4cqw] text-white min-w-0">
                  <KindIcon className="w-[1cqw] h-[1cqw] shrink-0 text-slate-400" />
                  <span className="truncate">{l.who}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-slate-200">{l.action}</span>
                  <span className="block truncate font-mono text-slate-500 text-[1cqw]">{l.target}</span>
                </span>
                <span>
                  <span
                    className={`hp-pill ${
                      l.risk === "low" ? "is-green" : l.risk === "high" ? "is-red" : "is-red-solid"
                    }`}
                  >
                    {l.risk === "low" ? "Low" : l.risk === "high" ? "High" : "Blocked"}
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-[1cqw] min-h-0">
          {/* Approval request raised by the ML engine */}
          <div data-motion data-hl="approve" className="hp-fly hp-panel hp-approve" style={from(18, -6, 6, FLAG - 0.6)}>
            <span className="flex items-center gap-[0.6cqw]">
              <span className="hp-stat-icon is-orange !w-[2.4cqw] !h-[2.4cqw]">
                <BrainCircuit className="w-[1.3cqw] h-[1.3cqw]" />
              </span>
              <span>
                <span className="block font-semibold text-white text-[1.4cqw]">Approval required</span>
                <span className="block text-[1.05cqw] text-amber-300">ML risk: high</span>
              </span>
            </span>
            <span className="block text-[1.2cqw] text-slate-300 mt-[0.8cqw] leading-snug">
              <span className="text-white">ai-agent-07</span> wants to run{" "}
              <span className="font-mono text-rose-300">DROP TABLE customers</span> on{" "}
              <span className="font-mono text-white">postgres_testing</span>.
            </span>
            <span className="flex items-center gap-[0.4cqw] text-[1cqw] text-slate-400 mt-[0.6cqw]">
              <ShieldCheck className="w-[0.9cqw] h-[0.9cqw] text-[#00B8DB]" />
              Prompt-injection guard re-verified the tool call
            </span>
            <div className="relative mt-[1cqw] h-[2.4cqw]">
              <div data-motion className="hp-swap-out absolute inset-0 grid grid-cols-2 gap-[0.6cqw]" style={d(FLAG + 1.6)}>
                <span data-motion className="hp-btn-deny" style={d(FLAG + 1.2)}>Deny</span>
                <span className="hp-btn-approve">Approve</span>
              </div>
              <div data-motion className="hp-swap-in absolute inset-0 hp-denied" style={d(FLAG + 1.6)}>
                <Ban className="w-[1.1cqw] h-[1.1cqw]" />
                Denied. Agent token revoked.
              </div>
            </div>
          </div>

          {/* Session recording */}
          <div data-motion className="hp-pop hp-panel flex-1 min-h-0" style={d(0.4)}>
            <span className="flex items-center justify-between">
              <span className="font-semibold text-white text-[1.25cqw]">Session recording</span>
              <span className="text-[1cqw] font-mono text-slate-500">linux_prod_01</span>
            </span>
            <div className="mt-[0.8cqw] rounded-[0.4cqw] bg-[#14161d] border border-white/[0.06] p-[0.8cqw] font-mono text-[1cqw] leading-[1.6] text-slate-400 flex-1">
              <span data-motion className="hp-row-in block" style={d(0.9)}>
                <span className="text-emerald-400">$</span> sudo systemctl status nginx
              </span>
              <span data-motion className="hp-row-in block" style={d(1.6)}>
                <span className="text-emerald-400">$</span> tail -n 20 /var/log/auth.log
              </span>
              <span data-motion className="hp-row-in block" style={d(2.3)}>
                <span className="text-emerald-400">$</span> <span className="hp-caret" data-motion />
              </span>
            </div>
            <div className="relative mt-[0.8cqw] h-[0.35cqw] rounded-full bg-white/[0.08] overflow-hidden">
              <span data-motion className="hp-playhead" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
