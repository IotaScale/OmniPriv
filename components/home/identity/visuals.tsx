"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Check,
  Clock,
  Cloud,
  Database,
  KeyRound,
  Lock,
  RefreshCw,
  Server,
  ShieldCheck,
  User,
  Video,
  type LucideIcon,
} from "lucide-react";

import type { IdentityKey } from "./data";

/*
 * Right-hand visuals for the identity switcher. Each one is keyed on the
 * identity by its parent, so switching tabs remounts it and the sequence
 * plays from the start. All sample data is illustrative console activity.
 */

const EASE = [0.23, 1, 0.32, 1] as const;

type Tone = "green" | "cyan" | "amber" | "red" | "violet" | "slate";

const PILL: Record<Tone, string> = {
  green: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30",
  cyan: "text-[#7FD9EA] bg-[#00B8DB]/10 border-[#00B8DB]/30",
  amber: "text-amber-300 bg-amber-400/10 border-amber-400/30",
  red: "text-rose-300 bg-rose-500/10 border-rose-500/35",
  violet: "text-violet-300 bg-violet-400/10 border-violet-400/30",
  slate: "text-slate-300 bg-white/[0.04] border-white/15",
};

const TONE_HEX: Record<Tone, string> = {
  green: "#34d399",
  cyan: "#00B8DB",
  amber: "#fbbf24",
  red: "#fb7185",
  violet: "#a78bfa",
  slate: "#94a3b8",
};

/* The floating dark card that sits over the picture's corner. */
function Card({ path, children, rec = false }: { path: string; children: React.ReactNode; rec?: boolean }) {
  return (
    <div className="relative mt-4 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-[66%] rounded-2xl border border-white/10 bg-[#16181c]/95 backdrop-blur-md shadow-[0_30px_60px_-24px_rgba(0,0,0,0.55)] overflow-hidden">
      <div className="flex items-center gap-2 h-9 px-3.5 border-b border-white/[0.07] bg-[#1c1e23]">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 font-mono text-[0.6875rem] text-slate-400 truncate">
          app.omnipriv.com/<span className="text-slate-200">{path}</span>
        </span>
        {rec && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[0.625rem] font-semibold text-rose-300">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            REC
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ── Current: event console ─────────────────────────────── */

type Row = { Icon: LucideIcon; text: string; pill: string; tone: Tone };

const CONSOLE: Record<IdentityKey, { path: string; rows: Row[] }> = {
  human: {
    path: "access/requests",
    rows: [
      { Icon: User, text: "j.rahman signed in", pill: "MFA verified", tone: "green" },
      { Icon: KeyRound, text: "Requested prod-db-01 for 30 min", pill: "Approved", tone: "cyan" },
      { Icon: Video, text: "Session opened on prod-db-01", pill: "Recording", tone: "red" },
      { Icon: Clock, text: "Access window ends", pill: "Auto-revoke", tone: "slate" },
    ],
  },
  machine: {
    path: "vault/credentials",
    rows: [
      { Icon: Server, text: "svc-backup asked for postgres_prod", pill: "Policy match", tone: "cyan" },
      { Icon: KeyRound, text: "Secret injected into the workload", pill: "Never shown", tone: "green" },
      { Icon: RefreshCw, text: "Credential rotated", pill: "Scheduled", tone: "cyan" },
      { Icon: Lock, text: "Sealed with a per-secret key", pill: "KEK, DEK, SEK", tone: "violet" },
    ],
  },
  ai: {
    path: "ai/agents/ai-agent-07",
    rows: [
      { Icon: Bot, text: "crm.read_customers", pill: "In scope", tone: "green" },
      { Icon: Bot, text: "billing.send_invoice", pill: "Waiting for approval", tone: "amber" },
      { Icon: Bot, text: "db.drop_table", pill: "Blocked by policy", tone: "red" },
      { Icon: ShieldCheck, text: "Token scoped to finance, read only", pill: "Least privilege", tone: "cyan" },
    ],
  },
};

export function ConsoleCard({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const data = CONSOLE[item];
  return (
    <Card path={data.path}>
      <ul className="p-2.5 space-y-1.5 min-h-[12.25rem]">
        {data.rows.map((r, k) => (
          <motion.li
            key={`${item}-${k}`}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: reduce ? 0 : 0.35 + k * 0.45, ease: EASE }}
            className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.05] px-3 py-2"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06] text-slate-300 shrink-0">
              <r.Icon className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span className={`min-w-0 flex-1 truncate text-[0.8125rem] text-slate-200 ${item === "ai" && k < 3 ? "font-mono" : ""}`}>{r.text}</span>
            <span className={`shrink-0 text-[0.6875rem] font-medium px-2 py-0.5 rounded-full border ${PILL[r.tone]}`}>{r.pill}</span>
          </motion.li>
        ))}
      </ul>
    </Card>
  );
}

/* ── Option A: access path ──────────────────────────────── */
/*
 * The request as a journey: the identity on the left, OmniPriv's gate in the
 * middle, the target on the right. A token travels to the gate, the gate runs
 * its three checks one by one, then the token either continues to the target
 * or is held at the gate.
 */

const PATHS: Record<
  IdentityKey,
  {
    path: string;
    from: { Icon: LucideIcon; label: string };
    to: { Icon: LucideIcon; label: string };
    checks: [string, string, string];
    outcome: { text: string; tone: Tone; held?: boolean };
  }
> = {
  human: {
    path: "access/requests/1042",
    from: { Icon: User, label: "j.rahman" },
    to: { Icon: Database, label: "prod-db-01" },
    checks: ["MFA", "Just-in-Time", "Approval"],
    outcome: { text: "Session opened and recording", tone: "green" },
  },
  machine: {
    path: "vault/requests/svc-backup",
    from: { Icon: Server, label: "svc-backup" },
    to: { Icon: Database, label: "postgres_prod" },
    checks: ["Policy match", "Vault lookup", "Rotated"],
    outcome: { text: "Secret injected, never shown", tone: "green" },
  },
  ai: {
    path: "ai/agents/ai-agent-07/calls",
    from: { Icon: Bot, label: "ai-agent-07" },
    to: { Icon: Cloud, label: "billing API" },
    checks: ["Agent identity", "Tool scope", "Risk score"],
    outcome: { text: "Held for human approval", tone: "amber", held: true },
  },
};

function Node({ Icon, label, glow }: { Icon: LucideIcon; label: string; glow?: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-[5.25rem]">
      <span
        className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.06] border border-white/10 text-slate-200 transition-shadow duration-500"
        style={glow ? { boxShadow: `0 0 0 3px ${glow}33, 0 0 24px ${glow}55`, borderColor: `${glow}88` } : undefined}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </span>
      <span className="font-mono text-[0.6875rem] text-slate-300 truncate max-w-full">{label}</span>
    </div>
  );
}

export function PathCard({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = PATHS[item];
  // 0 travel-in, 1..3 checks, 4 decision, 5 delivered
  const [step, setStep] = useState(reduce ? 5 : 0);
  useEffect(() => {
    if (reduce) return;
    const at = [1300, 1900, 2500, 3100, d.outcome.held ? 3100 : 4300];
    const timers = at.map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [reduce, d.outcome.held]);

  const tone = TONE_HEX[d.outcome.tone];
  const decided = step >= 4;
  const delivered = step >= 5 && !d.outcome.held;

  return (
    <Card path={d.path}>
      <div className="px-4 pt-5 pb-4 min-h-[12.25rem] flex flex-col">
        <div className="relative flex items-start justify-between">
          {/* track */}
          <span className="absolute left-[2.625rem] right-[2.625rem] top-[1.375rem] h-px bg-white/10" aria-hidden="true" />
          <motion.span
            className="absolute left-[2.625rem] top-[1.375rem] h-px origin-left"
            style={{ right: "50%", background: "#00B8DB" }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            aria-hidden="true"
          />
          {delivered && (
            <motion.span
              className="absolute top-[1.375rem] h-px origin-left"
              style={{ left: "50%", right: "42px", background: tone }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              aria-hidden="true"
            />
          )}
          {/* the request token */}
          {!reduce && (
            <motion.span
              className="absolute top-[1.125rem] w-2 h-2 rounded-full"
              style={{ background: step >= 4 ? tone : "#00B8DB", boxShadow: `0 0 12px ${step >= 4 ? tone : "#00B8DB"}` }}
              initial={{ left: "10%" }}
              animate={{ left: delivered ? "88%" : "48.6%" }}
              transition={{ duration: delivered ? 0.9 : 1, delay: step === 0 ? 0.25 : 0, ease: EASE }}
              aria-hidden="true"
            />
          )}

          <Node Icon={d.from.Icon} label={d.from.label} />
          <Node Icon={ShieldCheck} label="OmniPriv" glow={decided ? tone : step >= 1 ? "#00B8DB" : undefined} />
          <Node Icon={d.to.Icon} label={d.to.label} glow={delivered ? tone : undefined} />
        </div>

        {/* gate checks */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {d.checks.map((c, i) => {
            const done = step >= i + 1;
            return (
              <span
                key={c}
                className={`inline-flex items-center gap-1.5 text-[0.6875rem] font-medium px-2.5 py-1 rounded-full border transition-colors duration-300 ${
                  done ? PILL.cyan : "text-slate-500 border-white/10"
                }`}
              >
                <span className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-full ${done ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/10"}`}>
                  {done && <Check className="w-2.5 h-2.5" strokeWidth={3} aria-hidden="true" />}
                </span>
                {c}
              </span>
            );
          })}
        </div>

        {/* decision */}
        <div className="mt-auto pt-4 h-[2.75rem] flex justify-center items-end">
          {decided && (
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: EASE }}
              className={`inline-flex items-center gap-2 text-[0.75rem] font-semibold px-3 py-1.5 rounded-full border ${PILL[d.outcome.tone]}`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: tone }} />
              {d.outcome.text}
            </motion.span>
          )}
        </div>
      </div>
    </Card>
  );
}

/* ── Option B: session replay ───────────────────────────── */
/*
 * The identity's activity as a recording: a playhead runs along a timeline,
 * markers drop in as it passes each event, and the event under the playhead
 * is read out large underneath.
 */

const REPLAY: Record<IdentityKey, { path: string; events: { at: number; time: string; text: string; pill: string; tone: Tone }[] }> = {
  human: {
    path: "sessions/prod-db-01/replay",
    events: [
      { at: 8, time: "09:41:07", text: "j.rahman signed in", pill: "MFA verified", tone: "green" },
      { at: 34, time: "09:41:22", text: "Just-in-Time request, 30 min", pill: "Approved", tone: "cyan" },
      { at: 62, time: "09:42:03", text: "sudo systemctl restart nginx", pill: "Recorded", tone: "violet" },
      { at: 92, time: "10:11:22", text: "Access window ended", pill: "Revoked", tone: "slate" },
    ],
  },
  machine: {
    path: "workloads/svc-backup/replay",
    events: [
      { at: 8, time: "02:00:00", text: "svc-backup started nightly job", pill: "Policy match", tone: "cyan" },
      { at: 36, time: "02:00:01", text: "Secret injected for postgres_prod", pill: "Never shown", tone: "green" },
      { at: 64, time: "02:14:37", text: "Backup written to vault storage", pill: "Recorded", tone: "violet" },
      { at: 92, time: "02:15:00", text: "Credential rotated after use", pill: "Rotated", tone: "cyan" },
    ],
  },
  ai: {
    path: "ai/agents/ai-agent-07/replay",
    events: [
      { at: 8, time: "11:02:10", text: "crm.read_customers", pill: "In scope", tone: "green" },
      { at: 36, time: "11:02:14", text: "billing.send_invoice", pill: "Held for approval", tone: "amber" },
      { at: 64, time: "11:02:16", text: "db.drop_table", pill: "Blocked", tone: "red" },
      { at: 92, time: "11:02:16", text: "Agent token revoked", pill: "Contained", tone: "slate" },
    ],
  },
};

const REPLAY_MS = 4800;

export function ReplayCard({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = REPLAY[item];
  const [pos, setPos] = useState(reduce ? 100 : 0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const t0 = performance.now() + 300;
    const tick = (t: number) => {
      const p = Math.max(0, Math.min(100, ((t - t0) / REPLAY_MS) * 100));
      setPos(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const passed = d.events.filter((e) => pos >= e.at);
  const current = passed[passed.length - 1];

  return (
    <Card path={d.path} rec>
      <div className="px-4 pt-4 pb-4 min-h-[12.25rem] flex flex-col">
        {/* waveform-like activity strip, purely decorative */}
        <div className="relative h-10 flex items-end gap-[0.1875rem]" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => {
            const h = 18 + ((i * 37) % 70);
            const lit = (i / 48) * 100 <= pos;
            return (
              <span
                key={i}
                className="flex-1 rounded-sm transition-colors duration-200"
                style={{ height: `${h}%`, background: lit ? "rgba(0,184,219,0.55)" : "rgba(255,255,255,0.08)" }}
              />
            );
          })}
        </div>

        {/* timeline */}
        <div className="relative mt-3 h-6">
          <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[0.1875rem] rounded-full bg-white/10" />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[0.1875rem] rounded-full bg-[#00B8DB]" style={{ width: `${pos}%` }} />
          {d.events.map((e) => {
            const on = pos >= e.at;
            return (
              <span
                key={e.at}
                className="absolute top-1/2 w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 border-[#16181c] transition-transform duration-300"
                style={{ left: `${e.at}%`, background: on ? TONE_HEX[e.tone] : "rgba(255,255,255,0.18)", transform: on ? "scale(1.15)" : "scale(0.8)" }}
              />
            );
          })}
          <span className="absolute top-0 bottom-0 w-px bg-white" style={{ left: `${pos}%` }} />
        </div>

        {/* current event, read out */}
        <div className="mt-4 min-h-[3.5rem]">
          {current && (
            <motion.div
              key={current.at}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5"
            >
              <span className="font-mono text-[0.6875rem] text-slate-500 shrink-0">{current.time}</span>
              <span className={`min-w-0 flex-1 truncate text-[0.8125rem] text-slate-100 ${item === "ai" ? "font-mono" : ""}`}>{current.text}</span>
              <span className={`shrink-0 text-[0.6875rem] font-medium px-2 py-0.5 rounded-full border ${PILL[current.tone]}`}>{current.pill}</span>
            </motion.div>
          )}
        </div>

        <div className="mt-2 flex justify-between font-mono text-[0.625rem] text-slate-500">
          <span>{d.events[0].time}</span>
          <span>{passed.length} of {d.events.length} events</span>
          <span>{d.events[d.events.length - 1].time}</span>
        </div>
      </div>
    </Card>
  );
}

/* ── Option C: hotspots on the picture ──────────────────── */
/*
 * The picture itself becomes the explainer: pins pulse on the parts of the
 * scene that matter, each opens a short label in turn, and a decision stamp
 * lands at the end. No extra card; the art does the work.
 */

const SPOTS: Record<
  IdentityKey,
  { pins: { x: number; y: number; label: string; side: "l" | "r" }[]; stamp: { text: string; tone: Tone } }
> = {
  human: {
    pins: [
      { x: 30, y: 42, label: "MFA verified at sign-in", side: "r" },
      { x: 52, y: 22, label: "Just-in-Time, approved for 30 min", side: "r" },
      { x: 72, y: 58, label: "Session recorded and searchable", side: "l" },
    ],
    stamp: { text: "Allowed, on the record", tone: "green" },
  },
  machine: {
    pins: [
      { x: 16, y: 38, label: "Cloud workload asks for a secret", side: "r" },
      { x: 58, y: 30, label: "Key handed over, never shown", side: "r" },
      { x: 60, y: 78, label: "Rotated after every use", side: "l" },
    ],
    stamp: { text: "Secret injected, rotated", tone: "cyan" },
  },
  ai: {
    pins: [
      { x: 50, y: 30, label: "Agent identity verified", side: "r" },
      { x: 24, y: 62, label: "Tool allowlist and data scope", side: "r" },
      { x: 78, y: 60, label: "Risky call held for approval", side: "l" },
    ],
    stamp: { text: "Held for human approval", tone: "amber" },
  },
};

export function Hotspots({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = SPOTS[item];
  const [step, setStep] = useState(reduce ? 4 : 0);
  useEffect(() => {
    if (reduce) return;
    const timers = [700, 1700, 2700, 3700].map((ms, i) => window.setTimeout(() => setStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* soft scrim so labels read on any part of the art */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

      {d.pins.map((p, i) => {
        const shown = step >= i + 1;
        const live = step === i + 1;
        return (
          <div key={i} className="absolute" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
            {/* pin */}
            <span className="absolute -left-2 -top-2 w-4 h-4">
              {shown && !reduce && live && <span className="absolute inset-0 rounded-full bg-[#00B8DB] animate-ping opacity-60" />}
              <span
                className="absolute inset-[0.1875rem] rounded-full border-2 border-white transition-colors duration-300"
                style={{ background: shown ? "#00B8DB" : "rgba(255,255,255,0.35)" }}
              />
            </span>
            {/* label */}
            {shown && (
              <motion.span
                initial={reduce ? false : { opacity: 0, x: p.side === "r" ? -6 : 6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className={`absolute top-1/2 -translate-y-1/2 flex items-center ${p.side === "r" ? "left-3" : "right-3 flex-row-reverse"}`}
              >
                <span className="block w-6 h-px bg-white/70" />
                <span className="whitespace-nowrap rounded-lg bg-[#16181c]/90 backdrop-blur-sm border border-white/15 px-2.5 py-1.5 text-[0.75rem] font-medium text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
                  {p.label}
                </span>
              </motion.span>
            )}
          </div>
        );
      })}

      {/* decision stamp */}
      {step >= 4 && (
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`absolute left-4 bottom-4 inline-flex items-center gap-2 text-[0.8125rem] font-semibold px-3.5 py-2 rounded-full border backdrop-blur-sm bg-[#16181c]/80 ${PILL[d.stamp.tone]}`}
        >
          <ShieldCheck className="w-4 h-4" aria-hidden="true" />
          {d.stamp.text}
        </motion.span>
      )}
    </div>
  );
}
