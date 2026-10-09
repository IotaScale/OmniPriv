"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  AppWindow,
  Bot,
  Check,
  Cloud,
  Database,
  Globe,
  HardDrive,
  KeyRound,
  Mail,
  Server,
  ShieldCheck,
  User,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { IdentityKey } from "./data";

/*
 * Image-free stages for the identity switcher. Each one is a self-contained
 * explainer that plays once per identity (the parent remounts it with a new
 * key on every tab change). Everything is sized in container units so the
 * whole stage scales as one picture, and is theme-aware.
 * Names, times and amounts are illustrative sample data.
 */

const EASE = [0.23, 1, 0.32, 1] as const;
const CYAN = "#00B8DB";
const AMBER = "#f59e0b";
const RED = "#f43f5e";
const GREEN = "#10b981";

type Tone = "green" | "cyan" | "amber" | "red";
const TONE: Record<Tone, string> = { green: GREEN, cyan: CYAN, amber: AMBER, red: RED };

/* Time-based step counter: step becomes i+1 at times[i] ms. */
export function useSteps(times: number[], reduce: boolean) {
  const [step, setStep] = useState(reduce ? times.length : 0);
  useEffect(() => {
    if (reduce) return;
    const timers = times.map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
    // times are static per mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  return step;
}

/* 0..100 progress over `ms`, starting after `delay`. */
export function useProgress(ms: number, delay: number, reduce: boolean) {
  const [p, setP] = useState(reduce ? 100 : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (t: number) => {
      const v = Math.max(0, Math.min(100, ((t - t0) / ms) * 100));
      setP(v);
      if (v < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ms, delay, reduce]);
  return p;
}

export const WHO: Record<IdentityKey, { name: string; kind: string; Icon: LucideIcon }> = {
  human: { name: "j.rahman", kind: "Human", Icon: User },
  machine: { name: "svc-backup", kind: "Machine", Icon: Server },
  ai: { name: "ai-agent-07", kind: "AI agent", Icon: Bot },
};

/* The frame every stage sits in. */
export function Stage({
  title,
  item,
  children,
  aspect = "aspect-[16/11]",
}: {
  title: string;
  item: IdentityKey;
  children: ReactNode;
  /** Tailwind aspect classes; taller on phones for stages that stack. */
  aspect?: string;
}) {
  const who = WHO[item];
  return (
    <div
      className={`stg relative w-full ${aspect} rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111214] overflow-hidden shadow-[0_30px_70px_-40px_rgba(10,22,40,0.45)] dark:shadow-none`}
      style={{ containerType: "inline-size" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-100"
        style={{ background: "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(0,184,219,0.08), transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[3.5cqw] pt-[3cqw]">
        <span className="stg-sm font-semibold text-slate-900 dark:text-white">{title}</span>
        <span className="inline-flex items-center gap-[1.2cqw] stg-xs rounded-full border border-slate-900/[0.1] dark:border-white/[0.1] px-[1.8cqw] py-[0.6cqw] text-slate-600 dark:text-slate-300">
          <span className="relative w-[1.2cqw] h-[1.2cqw] min-w-[0.375rem] min-h-[0.375rem]">
            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
            <span className="absolute inset-0 rounded-full bg-emerald-500" />
          </span>
          <span className="font-mono">{who.name}</span>
          <span className="text-slate-400">·</span>
          {who.kind}
        </span>
      </div>
      <div className="absolute inset-0 pt-[11cqw]">{children}</div>
    </div>
  );
}

const pos = (x: number, y: number) => ({ left: `${(x / 160) * 100}%`, top: `${(y / 110) * 100}%` });

/* ════════════════════════════════════════════════════════════
   1. ACCESS PATH (improved)
   identity ─ token ─▶ OmniPriv gate (three checks around it) ─▶ target
════════════════════════════════════════════════════════════ */

const PATH: Record<
  IdentityKey,
  {
    attrs: [string, string];
    to: { Icon: LucideIcon; name: string; kind: string };
    checks: { label: string; detail: string }[];
    outcome: { tone: Tone; title: string; sub: string; held?: boolean; countdown?: boolean };
  }
> = {
  human: {
    attrs: ["Managed laptop", "Office network"],
    to: { Icon: Database, name: "prod-db-01", kind: "PostgreSQL" },
    checks: [
      { label: "MFA", detail: "Push approved" },
      { label: "Just-in-Time", detail: "30 min window" },
      { label: "Approval", detail: "by s.khan" },
    ],
    outcome: { tone: "green", title: "Session opened, recording", sub: "Access ends in", countdown: true },
  },
  machine: {
    attrs: ["Nightly job", "Kubernetes pod"],
    to: { Icon: Database, name: "postgres_prod", kind: "Database" },
    checks: [
      { label: "Policy", detail: "backup-job" },
      { label: "Vault", detail: "SEK unsealed" },
      { label: "Lease", detail: "single use" },
    ],
    outcome: { tone: "cyan", title: "Secret injected, never shown", sub: "Rotated after this run" },
  },
  ai: {
    attrs: ["MCP client", "Scope: finance"],
    to: { Icon: Wallet, name: "billing API", kind: "send_invoice" },
    checks: [
      { label: "Agent ID", detail: "verified" },
      { label: "Tool scope", detail: "billing.*" },
      { label: "Risk", detail: "82, high" },
    ],
    outcome: { tone: "amber", title: "Held for human approval", sub: "Waiting for s.khan", held: true },
  },
};

function Countdown({ from, run }: { from: number; run: boolean }) {
  const [s, setS] = useState(from);
  useEffect(() => {
    if (!run) return;
    const t = window.setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(t);
  }, [run]);
  return (
    <span className="font-mono tabular-nums">
      {String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}
    </span>
  );
}

export function AccessPathStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = PATH[item];
  const who = WHO[item];
  // 1 token reaches gate, 2..4 checks, 5 decision, 6 delivered
  const step = useSteps([1200, 1800, 2400, 3000, 3600, 4500], reduce);
  const decided = step >= 5;
  const delivered = step >= 6 && !d.outcome.held;
  const tone = TONE[d.outcome.tone];

  // geometry (viewBox 160 x 110 units)
  const Y = 40;
  const L = 33; // end of identity card
  const GL = 66; // gate edge left
  const GR = 94; // gate edge right
  const R = 127; // start of target card
  const arcs = [0, 1, 2].map((i) => {
    const a0 = (-90 + i * 120 + 8) * (Math.PI / 180);
    const a1 = (-90 + (i + 1) * 120 - 8) * (Math.PI / 180);
    const r = 15;
    return `M${80 + r * Math.cos(a0)} ${Y + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${80 + r * Math.cos(a1)} ${Y + r * Math.sin(a1)}`;
  });

  return (
    <Stage title="Access path" item={item}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 160 110" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* rails */}
          <line x1={L} y1={Y} x2={GL} y2={Y} className="stroke-slate-900/15 dark:stroke-white/15" strokeWidth="0.5" strokeDasharray="1.2 1.6" />
          <line x1={GR} y1={Y} x2={R} y2={Y} className="stroke-slate-900/15 dark:stroke-white/15" strokeWidth="0.5" strokeDasharray="1.2 1.6" />
          {/* travelled rail */}
          <motion.line
            x1={L} y1={Y} x2={GL} y2={Y} stroke={CYAN} strokeWidth="0.7" strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          />
          {delivered && (
            <motion.line
              x1={GR} y1={Y} x2={R} y2={Y} stroke={tone} strokeWidth="0.7" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }}
            />
          )}
          {/* gate ring: three arcs, one per check */}
          {arcs.map((p, i) => (
            <path key={i} d={p} fill="none" strokeWidth="1.4" strokeLinecap="round"
              className="stroke-slate-900/10 dark:stroke-white/10" />
          ))}
          {arcs.map((p, i) =>
            step >= i + 2 ? (
              <motion.path key={`on-${i}`} d={p} fill="none" strokeWidth="1.4" strokeLinecap="round"
                stroke={decided ? tone : CYAN}
                initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: EASE }} />
            ) : null
          )}
          {/* gate halo when deciding */}
          {decided && !reduce && (
            <motion.circle cx="80" cy={Y} r="15" fill="none" stroke={tone} strokeWidth="0.5"
              initial={{ r: 15, opacity: 0.8 }} animate={{ r: 24, opacity: 0 }}
              transition={{ duration: 1.4, repeat: d.outcome.held ? Infinity : 1, ease: "easeOut" }} />
          )}
        </svg>

        {/* the request token */}
        {!reduce && step < 6 + (d.outcome.held ? 10 : 0) && (
          <motion.span
            className="absolute w-[2.2cqw] h-[2.2cqw] -ml-[1.1cqw] -mt-[1.1cqw] rounded-full"
            style={{ top: pos(0, Y).top, background: decided ? tone : CYAN, boxShadow: `0 0 0 0.8cqw ${decided ? tone : CYAN}22, 0 0 2.4cqw ${decided ? tone : CYAN}` }}
            initial={{ left: pos(L, 0).left }}
            animate={{ left: delivered ? pos(R, 0).left : pos(GL - 1.5, 0).left }}
            transition={{ duration: delivered ? 0.8 : 1, delay: step === 0 ? 0.2 : 0, ease: EASE }}
            aria-hidden="true"
          />
        )}

        {/* identity card */}
        <div className="absolute -translate-y-1/2 flex flex-col items-center text-center w-[26%]" style={{ ...pos(4, Y), left: "2.5%" }}>
          <span className="inline-flex items-center justify-center w-[10cqw] h-[10cqw] rounded-[2.4cqw] bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB] border border-[#00B8DB]/25">
            <who.Icon className="w-[45%] h-[45%]" aria-hidden="true" />
          </span>
          <span className="mt-[1.4cqw] stg-sm font-mono font-semibold text-slate-900 dark:text-white">{who.name}</span>
          <span className="mt-[1cqw] flex flex-col gap-[0.8cqw] items-center">
            {d.attrs.map((a) => (
              <span key={a} className="stg-xs px-[1.4cqw] py-[0.3cqw] rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] text-slate-600 dark:text-slate-400">
                {a}
              </span>
            ))}
          </span>
        </div>

        {/* the gate */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={pos(80, Y)}>
          <span
            className="inline-flex items-center justify-center w-[13cqw] h-[13cqw] rounded-full bg-white dark:bg-[#16181c] border transition-[border-color,box-shadow] duration-500"
            style={{
              borderColor: decided ? tone : step >= 1 ? `${CYAN}aa` : "rgba(148,163,184,0.35)",
              boxShadow: decided ? `0 0 3cqw ${tone}55` : step >= 1 ? `0 0 2.4cqw ${CYAN}40` : "none",
            }}
          >
            <ShieldCheck className="w-[45%] h-[45%] transition-colors duration-500" style={{ color: decided ? tone : CYAN }} aria-hidden="true" />
          </span>
          <span className="mt-[1.2cqw] stg-xs font-semibold tracking-[0.12em] uppercase text-slate-500 dark:text-slate-400">OmniPriv</span>
        </div>

        {/* target card */}
        <div className="absolute -translate-y-1/2 flex flex-col items-center text-center w-[26%]" style={{ ...pos(0, Y), left: "71.5%" }}>
          <span
            className="inline-flex items-center justify-center w-[10cqw] h-[10cqw] rounded-[2.4cqw] border transition-all duration-500"
            style={{
              background: delivered ? `${tone}1a` : "rgba(148,163,184,0.08)",
              borderColor: delivered ? `${tone}88` : "rgba(148,163,184,0.25)",
              color: delivered ? tone : "#94a3b8",
            }}
          >
            <d.to.Icon className="w-[45%] h-[45%]" aria-hidden="true" />
          </span>
          <span className="mt-[1.4cqw] stg-sm font-mono font-semibold text-slate-900 dark:text-white">{d.to.name}</span>
          <span className="mt-[1cqw] stg-xs text-slate-500 dark:text-slate-400">{d.to.kind}</span>
        </div>

        {/* checks */}
        <div className="absolute inset-x-[4%] flex justify-center gap-[1.6cqw]" style={{ top: pos(0, 64).top }}>
          {d.checks.map((c, i) => {
            const done = step >= i + 2;
            return (
              <span
                key={c.label}
                className={`flex items-center gap-[1.2cqw] rounded-[1.6cqw] border px-[1.8cqw] py-[1.1cqw] transition-colors duration-300 ${
                  done
                    ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.07]"
                    : "border-slate-900/[0.08] dark:border-white/[0.08] bg-transparent"
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-[3.2cqw] h-[3.2cqw] rounded-full shrink-0 transition-colors duration-300 ${
                    done ? "bg-[#00B8DB] text-[#03121c]" : "bg-slate-900/[0.06] dark:bg-white/[0.08]"
                  }`}
                >
                  {done && <Check className="w-[60%] h-[60%]" strokeWidth={3} aria-hidden="true" />}
                </span>
                <span className="leading-tight">
                  <span className="block stg-xs font-semibold text-slate-900 dark:text-white">{c.label}</span>
                  <span className={`block stg-xs ${done ? "text-slate-600 dark:text-slate-300" : "text-slate-400"}`}>{done ? c.detail : "Checking"}</span>
                </span>
              </span>
            );
          })}
        </div>

        {/* outcome */}
        <div className="absolute inset-x-[4%] flex justify-center" style={{ top: pos(0, 88).top }}>
          {decided && (
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-[2cqw] rounded-[2cqw] border px-[2.6cqw] py-[1.4cqw]"
              style={{ borderColor: `${tone}55`, background: `${tone}12` }}
            >
              <span className="w-[1.6cqw] h-[1.6cqw] rounded-full" style={{ background: tone }} />
              <span className="stg-sm font-semibold text-slate-900 dark:text-white">{d.outcome.title}</span>
              <span className="stg-xs text-slate-600 dark:text-slate-300">
                {d.outcome.sub} {d.outcome.countdown && <Countdown from={30 * 60} run={delivered} />}
              </span>
              {d.outcome.held && (
                <span className="flex gap-[1cqw]">
                  <span className="stg-xs font-semibold px-[1.6cqw] py-[0.5cqw] rounded-[1cqw] bg-[#00B8DB] text-[#03121c]">Approve</span>
                  <span className="stg-xs font-semibold px-[1.6cqw] py-[0.5cqw] rounded-[1cqw] border border-slate-900/15 dark:border-white/15 text-slate-700 dark:text-slate-200">Deny</span>
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════
   2. POLICY DECISION
   A request card drops in, four rules evaluate one by one, a risk gauge
   settles, and the verdict is stamped.
════════════════════════════════════════════════════════════ */

const POLICY: Record<
  IdentityKey,
  {
    request: string;
    rules: { name: string; detail: string; result: string; tone: Tone }[];
    risk: number;
    verdict: { text: string; sub: string; tone: Tone };
  }
> = {
  human: {
    request: "ssh prod-db-01  as  dba",
    rules: [
      { name: "Identity", detail: "MFA push approved", result: "Pass", tone: "green" },
      { name: "Context", detail: "Managed laptop, office network", result: "Pass", tone: "green" },
      { name: "Privilege", detail: "dba role, 30 min window", result: "Scoped", tone: "cyan" },
      { name: "Behaviour", detail: "Matches this user's normal pattern", result: "Low", tone: "green" },
    ],
    risk: 14,
    verdict: { text: "ALLOW", sub: "Just-in-Time, recorded", tone: "green" },
  },
  machine: {
    request: "GET secret  postgres_prod/backup",
    rules: [
      { name: "Identity", detail: "Workload certificate verified", result: "Pass", tone: "green" },
      { name: "Context", detail: "Nightly window, known pod", result: "Pass", tone: "green" },
      { name: "Privilege", detail: "Read one secret, single use", result: "Scoped", tone: "cyan" },
      { name: "Behaviour", detail: "Same job, same time as always", result: "Low", tone: "green" },
    ],
    risk: 8,
    verdict: { text: "ALLOW", sub: "Secret leased, then rotated", tone: "cyan" },
  },
  ai: {
    request: "billing.send_invoice(48,200 USD)",
    rules: [
      { name: "Identity", detail: "Agent token, delegated by j.rahman", result: "Pass", tone: "green" },
      { name: "Context", detail: "New payee, outside working hours", result: "Unusual", tone: "amber" },
      { name: "Privilege", detail: "Tool allowed, amount above limit", result: "Exceeds", tone: "amber" },
      { name: "Behaviour", detail: "First call of this kind", result: "High", tone: "red" },
    ],
    risk: 82,
    verdict: { text: "HOLD", sub: "Sent to a human for approval", tone: "amber" },
  },
};

function Gauge({ value, tone }: { value: number; tone: string }) {
  // semicircle from 180deg to 0deg
  const r = 40;
  const a = Math.PI * (1 - value / 100);
  const nx = 50 + r * 0.82 * Math.cos(a);
  const ny = 50 - r * 0.82 * Math.sin(a);
  return (
    <svg viewBox="0 0 100 58" className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="stg-gauge" x1="0" x2="1">
          <stop offset="0" stopColor={GREEN} />
          <stop offset="0.55" stopColor={AMBER} />
          <stop offset="1" stopColor={RED} />
        </linearGradient>
      </defs>
      <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="url(#stg-gauge)" strokeOpacity="0.25" strokeWidth="7" strokeLinecap="round" />
      <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="url(#stg-gauge)" strokeWidth="7" strokeLinecap="round"
        pathLength={100} strokeDasharray={`${value} 100`} style={{ transition: "stroke-dasharray 0.1s linear" }} />
      <line x1="50" y1="50" x2={nx} y2={ny} stroke={tone} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3.6" fill={tone} />
    </svg>
  );
}

export function PolicyDecisionStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = POLICY[item];
  // 1 request lands, 2..5 rules, 6 verdict
  const step = useSteps([600, 1300, 2000, 2700, 3400, 4300], reduce);
  const riskP = useProgress(1300, 2700, reduce);
  const shown = Math.round((d.risk * riskP) / 100);
  const vt = TONE[d.verdict.tone];
  const riskTone = d.risk > 60 ? RED : d.risk > 35 ? AMBER : GREEN;

  return (
    <Stage title="Policy decision" item={item}>
      <div className="absolute inset-0 pt-[11cqw] px-[3.5cqw] pb-[3.5cqw] grid grid-cols-[1.55fr_1fr] gap-[3cqw]">
        <div className="flex flex-col gap-[1.4cqw] min-w-0">
          {/* request */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="rounded-[1.8cqw] border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-[2.2cqw] py-[1.6cqw]"
          >
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Incoming request</span>
            <span className="block mt-[0.4cqw] stg-sm font-mono font-semibold text-slate-900 dark:text-white truncate">{d.request}</span>
          </motion.div>

          {/* rules */}
          {d.rules.map((r, i) => {
            const evaluating = step === i + 1;
            const done = step >= i + 2;
            return (
              <div
                key={r.name}
                className={`relative flex items-center gap-[1.6cqw] rounded-[1.6cqw] border px-[2cqw] py-[1.2cqw] overflow-hidden transition-colors duration-300 ${
                  done ? "border-slate-900/[0.1] dark:border-white/[0.1]" : "border-slate-900/[0.05] dark:border-white/[0.05]"
                }`}
              >
                {evaluating && !reduce && (
                  <motion.span
                    className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#00B8DB]/15 to-transparent"
                    initial={{ left: "-35%" }}
                    animate={{ left: "105%" }}
                    transition={{ duration: 0.7, ease: "linear" }}
                    aria-hidden="true"
                  />
                )}
                <span className="w-[13cqw] shrink-0 stg-xs font-semibold text-slate-900 dark:text-white">{r.name}</span>
                <span className={`min-w-0 flex-1 truncate stg-xs ${done ? "text-slate-600 dark:text-slate-300" : "text-slate-400"}`}>
                  {done ? r.detail : evaluating ? "Evaluating" : "Waiting"}
                </span>
                <span
                  className="shrink-0 stg-xs font-semibold px-[1.4cqw] py-[0.3cqw] rounded-full border transition-opacity duration-300"
                  style={{ opacity: done ? 1 : 0, color: TONE[r.tone], borderColor: `${TONE[r.tone]}55`, background: `${TONE[r.tone]}14` }}
                >
                  {r.result}
                </span>
              </div>
            );
          })}
        </div>

        {/* gauge + verdict */}
        <div className="flex flex-col items-center justify-between min-w-0">
          <div className="w-full flex flex-col items-center">
            <span className="stg-xs text-slate-500 dark:text-slate-400">Risk score</span>
            <div className="w-full mt-[0.6cqw]">
              <Gauge value={shown} tone={riskTone} />
            </div>
            <span className="-mt-[1cqw] stg-lg font-bold tabular-nums text-slate-900 dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
              {shown}
            </span>
          </div>

          <div className="h-[16cqw] w-full flex items-center justify-center">
            {step >= 6 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 1.25, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className="flex flex-col items-center rounded-[1.8cqw] border-2 px-[2.6cqw] py-[1.2cqw]"
                style={{ borderColor: vt, color: vt, background: `${vt}10` }}
              >
                <span className="stg-xl font-extrabold tracking-[0.12em] leading-none" style={{ fontFamily: "var(--font-syne)" }}>
                  {d.verdict.text}
                </span>
                <span className="mt-[0.8cqw] stg-xs font-medium text-center text-slate-700 dark:text-slate-200">{d.verdict.sub}</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════
   3. ZERO STANDING PRIVILEGE
   A working day on a time axis. Standing access is a bar that never ends;
   with OmniPriv, access only exists in short windows that open on approval
   and close on their own.
════════════════════════════════════════════════════════════ */

type Win = { start: number; end: number; tone: Tone; label?: string; mark?: "rotate" | "block" | "hold" };

const ZSP: Record<IdentityKey, { standing: string; windows: Win[]; after: string; before: string; saving: string }> = {
  human: {
    standing: "Admin account, always on",
    windows: [{ start: 34, end: 40.25, tone: "cyan", label: "JIT 30 min" }],
    before: "8 h",
    after: "30 min",
    saving: "94% less standing access in this example",
  },
  machine: {
    standing: "Static service password",
    windows: [
      { start: 6, end: 8, tone: "cyan", mark: "rotate" },
      { start: 31, end: 33, tone: "cyan", mark: "rotate" },
      { start: 56, end: 58, tone: "cyan", mark: "rotate" },
      { start: 81, end: 83, tone: "cyan", mark: "rotate" },
    ],
    before: "never rotated",
    after: "4 leases",
    saving: "Each secret is leased for one job, then rotated",
  },
  ai: {
    standing: "Borrowed human token",
    windows: [
      { start: 10, end: 11.4, tone: "green" },
      { start: 22, end: 23.4, tone: "green" },
      { start: 38, end: 39.4, tone: "amber", mark: "hold" },
      { start: 52, end: 53.4, tone: "green" },
      { start: 67, end: 68.4, tone: "red", mark: "block" },
      { start: 80, end: 81.4, tone: "green" },
    ],
    before: "every tool",
    after: "per call",
    saving: "Each tool call gets its own grant; risky ones are held or blocked",
  },
};

export function ZeroStandingStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = ZSP[item];
  const p = useProgress(5200, 500, reduce);
  const hours = ["09:00", "11:00", "13:00", "15:00", "17:00"];

  return (
    <Stage title="Zero standing privilege" item={item}>
      <div className="absolute inset-0 pt-[13cqw] px-[3.5cqw] pb-[3.5cqw] flex flex-col">
        <div className="grid grid-cols-[22cqw_1fr] gap-x-[2cqw] gap-y-[3.2cqw] items-center">
          {/* axis */}
          <span />
          <div className="relative flex justify-between stg-xs font-mono text-slate-400">
            {hours.map((h) => (
              <span key={h}>{h}</span>
            ))}
          </div>

          {/* standing */}
          <div className="leading-tight">
            <span className="block stg-xs font-semibold text-slate-900 dark:text-white">Without OmniPriv</span>
            <span className="block stg-xs text-slate-500 dark:text-slate-400">{d.standing}</span>
          </div>
          <div className="relative h-[5.5cqw] rounded-[1.2cqw] bg-slate-900/[0.04] dark:bg-white/[0.04] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-[1.2cqw]"
              style={{ background: "repeating-linear-gradient(135deg, rgba(244,63,94,0.55) 0 6px, rgba(244,63,94,0.35) 6px 12px)" }}
              initial={reduce ? false : { width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            />
            <span className="absolute inset-0 flex items-center px-[1.6cqw] stg-xs font-semibold text-white">Always reachable</span>
            <span className="absolute inset-y-0 w-[2px] -ml-px bg-slate-900/60 dark:bg-white/80 rounded-full" style={{ left: `${p}%` }} aria-hidden="true" />
          </div>

          {/* with OmniPriv */}
          <div className="leading-tight">
            <span className="block stg-xs font-semibold text-slate-900 dark:text-white">With OmniPriv</span>
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Access only when needed</span>
          </div>
          <div className="relative h-[5.5cqw] rounded-[1.2cqw] bg-slate-900/[0.04] dark:bg-white/[0.04]">
            {d.windows.map((w, i) => {
              if (p < w.start) return null;
              const width = Math.min(p, w.end) - w.start;
              const c = TONE[w.tone];
              return (
                <div key={i} className="absolute inset-y-0" style={{ left: `${w.start}%`, width: `${Math.max(width, 0.6)}%` }}>
                  <div className="absolute inset-0 rounded-[0.8cqw]" style={{ background: c, boxShadow: `0 0 1.6cqw ${c}66` }} />
                  {w.label && p >= w.end && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-[110%] mt-[0.4cqw] whitespace-nowrap stg-xs font-semibold" style={{ color: c }}>
                      {w.label}
                    </span>
                  )}
                  {w.mark && p >= w.end && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 top-[110%] mt-[0.4cqw] whitespace-nowrap stg-xs font-medium"
                      style={{ color: c }}
                    >
                      {w.mark === "rotate" ? "↻ rotated" : w.mark === "block" ? "blocked" : "held"}
                    </span>
                  )}
                </div>
              );
            })}
            <span className="absolute inset-y-0 w-[2px] -ml-px bg-slate-900/60 dark:bg-white/80 rounded-full" style={{ left: `${p}%` }} aria-hidden="true" />
          </div>
        </div>

        {/* summary */}
        <div className="mt-auto grid grid-cols-2 gap-[2cqw]">
          <div className="rounded-[1.8cqw] border border-rose-500/25 bg-rose-500/[0.06] px-[2.2cqw] py-[1.6cqw]">
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Exposure without OmniPriv</span>
            <span className="block stg-lg font-bold text-rose-500" style={{ fontFamily: "var(--font-syne)" }}>{d.before}</span>
          </div>
          <div className="rounded-[1.8cqw] border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-[2.2cqw] py-[1.6cqw]">
            <span className="block stg-xs text-slate-500 dark:text-slate-400">With OmniPriv</span>
            <span className="block stg-lg font-bold text-[#00667A] dark:text-[#00B8DB]" style={{ fontFamily: "var(--font-syne)" }}>
              {p >= 100 ? d.after : "…"}
            </span>
          </div>
        </div>
        <span className="mt-[1.4cqw] stg-xs text-center text-slate-500 dark:text-slate-400" style={{ opacity: p >= 100 ? 1 : 0, transition: "opacity .4s" }}>
          {d.saving}
        </span>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════
   4. BLAST RADIUS
   The identity starts connected to everything it could reach. OmniPriv
   wraps it, and the connections it does not need retract until only the
   ones for this task remain.
════════════════════════════════════════════════════════════ */

const RES: { Icon: LucideIcon; name: string }[] = [
  { Icon: Database, name: "prod-db-01" },
  { Icon: Server, name: "web-01" },
  { Icon: Cloud, name: "aws-prod" },
  { Icon: HardDrive, name: "backups" },
  { Icon: Users, name: "hr-portal" },
  { Icon: Wallet, name: "billing" },
  { Icon: Mail, name: "mail" },
  { Icon: Globe, name: "cdn" },
  { Icon: KeyRound, name: "vault" },
  { Icon: AppWindow, name: "crm" },
  { Icon: Database, name: "analytics" },
  { Icon: Server, name: "k8s-prod" },
];

const RADIUS: Record<IdentityKey, { keep: number[]; note: string }> = {
  human: { keep: [0], note: "prod-db-01 only, for 30 min" },
  machine: { keep: [0, 3], note: "One database and the backup store" },
  ai: { keep: [9, 5], note: "crm read, billing behind approval" },
};

export function BlastRadiusStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = RADIUS[item];
  const who = WHO[item];
  // 1 connections drawn, 2 OmniPriv wraps, 3 pruned
  const step = useSteps([400, 2300, 2900], reduce);
  const pruned = step >= 3;
  const cx = 80;
  const cy = 58;
  const nodes = RES.map((r, i) => {
    const a = (i / RES.length) * Math.PI * 2 - Math.PI / 2;
    return { ...r, x: cx + 60 * Math.cos(a), y: cy + 37 * Math.sin(a), keep: d.keep.includes(i) };
  });
  const reach = pruned ? d.keep.length : step >= 1 ? RES.length : 0;

  return (
    <Stage title="Blast radius" item={item}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 160 110" className="absolute inset-0 w-full h-full" aria-hidden="true">
          {/* reach halo */}
          <motion.ellipse
            cx={cx} cy={cy} fill={pruned ? "rgba(0,184,219,0.06)" : "rgba(244,63,94,0.07)"}
            stroke={pruned ? "rgba(0,184,219,0.35)" : "rgba(244,63,94,0.35)"} strokeWidth="0.4" strokeDasharray="1.5 1.5"
            initial={reduce ? false : { rx: 0, ry: 0 }}
            animate={pruned ? { rx: 20, ry: 14 } : step >= 1 ? { rx: 66, ry: 42 } : { rx: 0, ry: 0 }}
            transition={{ duration: pruned ? 0.9 : 1.4, ease: EASE }}
          />
          {nodes.map((n, i) => {
            const show = step >= 1 && (!pruned || n.keep);
            return (
              <motion.line
                key={i}
                x1={cx} y1={cy} x2={n.x} y2={n.y}
                stroke={pruned && n.keep ? CYAN : "rgba(244,63,94,0.55)"}
                strokeWidth={pruned && n.keep ? 0.8 : 0.45}
                strokeLinecap="round"
                initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: show ? 0.6 : 0.5, delay: show && !pruned ? 0.4 + i * 0.07 : 0, ease: EASE }}
              />
            );
          })}
        </svg>

        {/* resources */}
        {nodes.map((n, i) => {
          const live = step >= 1 && (!pruned || n.keep);
          return (
            <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center" style={pos(n.x, n.y)}>
              <span
                className="inline-flex items-center justify-center w-[6.4cqw] h-[6.4cqw] rounded-[1.6cqw] border transition-all duration-500"
                style={{
                  borderColor: pruned && n.keep ? `${CYAN}aa` : live ? "rgba(244,63,94,0.45)" : "rgba(148,163,184,0.25)",
                  background: pruned && n.keep ? `${CYAN}1a` : live ? "rgba(244,63,94,0.08)" : "transparent",
                  color: pruned && n.keep ? CYAN : live ? RED : "#94a3b8",
                  opacity: pruned && !n.keep ? 0.45 : 1,
                }}
              >
                <n.Icon className="w-[50%] h-[50%]" aria-hidden="true" />
              </span>
              <span className="mt-[0.6cqw] stg-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap" style={{ opacity: pruned && !n.keep ? 0.5 : 1 }}>
                {n.name}
              </span>
            </div>
          );
        })}

        {/* identity in the middle, wrapped by OmniPriv */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(cx, cy)}>
          <span className="relative inline-flex items-center justify-center w-[11cqw] h-[11cqw] rounded-full bg-white dark:bg-[#16181c] border border-slate-900/10 dark:border-white/15 text-slate-800 dark:text-slate-100">
            <who.Icon className="w-[42%] h-[42%]" aria-hidden="true" />
            {step >= 2 && (
              <motion.span
                className="absolute -inset-[1.6cqw] rounded-full border-2"
                style={{ borderColor: CYAN, boxShadow: `0 0 2.4cqw ${CYAN}55` }}
                initial={reduce ? false : { scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-[3.6cqw] inline-flex items-center gap-[0.6cqw] whitespace-nowrap stg-xs font-semibold text-[#00667A] dark:text-[#00B8DB]">
                  <ShieldCheck className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
                  OmniPriv
                </span>
              </motion.span>
            )}
          </span>
        </div>

        {/* counter */}
        <div className="absolute left-[3.5cqw] bottom-[3cqw] flex items-baseline gap-[1.2cqw]">
          <span
            className="stg-xl font-bold tabular-nums transition-colors duration-500"
            style={{ fontFamily: "var(--font-syne)", color: pruned ? CYAN : RED }}
          >
            {reach}
          </span>
          <span className="stg-xs text-slate-500 dark:text-slate-400 max-w-[30cqw] leading-tight">
            {pruned ? "systems reachable now" : "systems reachable with standing access"}
          </span>
        </div>
        <div className="absolute right-[3.5cqw] bottom-[3cqw] text-right">
          {pruned && (
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="inline-block stg-xs font-semibold rounded-full px-[2cqw] py-[0.8cqw] border border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] text-[#00667A] dark:text-[#7FD9EA]"
            >
              {d.note}
            </motion.span>
          )}
        </div>
      </div>
    </Stage>
  );
}
