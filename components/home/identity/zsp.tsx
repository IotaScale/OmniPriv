"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ban, Check, Hourglass, KeyRound, Lock, LockOpen, RefreshCw, Users } from "lucide-react";

import type { IdentityKey } from "./data";
import { Stage, useProgress, useSteps } from "./stages";

/*
 * Zero standing privilege, four ways. All are image-free stages that play
 * once per identity. Times, names and hashes are illustrative sample data.
 */

const EASE = [0.23, 1, 0.32, 1] as const;
const CYAN = "#00B8DB";
const AMBER = "#f59e0b";
const RED = "#f43f5e";
const GREEN = "#10b981";
const STRIPES = "repeating-linear-gradient(135deg, rgba(244,63,94,0.5) 0 6px, rgba(244,63,94,0.3) 6px 12px)";

type Kind = "ok" | "hold" | "block";
const KIND_COLOR: Record<Kind, string> = { ok: CYAN, hold: AMBER, block: RED };

const fmtClock = (h: number) => {
  const hh = Math.floor(h) % 24;
  const mm = Math.floor((h % 1) * 60);
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};
const fmtDur = (hours: number) => {
  if (hours >= 1) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m ? `${h} h ${m} min` : `${h} h`;
  }
  return `${Math.round(hours * 60)} min`;
};

/* ════════════════════════════════════════════════════════════
   1. ZERO STANDING PRIVILEGE, IMPROVED TIMELINE
   A working day plays out. The standing bar fills and its exposure counter
   keeps climbing; OmniPriv access appears only as short windows, each with
   its own request, approval, countdown and automatic lock.
════════════════════════════════════════════════════════════ */

type TWin = { start: number; end: number; kind: Kind; label: string; sub?: string };

/* day 09:00 to 17:00, positions in hours from 09:00 */
const TL: Record<IdentityKey, { standing: string; wins: TWin[]; note: string }> = {
  human: {
    standing: "Admin account, always on",
    wins: [{ start: 1.97, end: 2.47, kind: "ok", label: "JIT 30 min", sub: "approved by s.khan" }],
    note: "One approved window. The account does not exist the rest of the day.",
  },
  machine: {
    standing: "Static service password",
    wins: [
      { start: 1, end: 1.1, kind: "ok", label: "lease", sub: "sek_9f2c" },
      { start: 3, end: 3.1, kind: "ok", label: "lease", sub: "sek_4be0" },
      { start: 5, end: 5.1, kind: "ok", label: "lease", sub: "sek_d71a" },
      { start: 7, end: 7.1, kind: "ok", label: "lease", sub: "sek_28c5" },
    ],
    note: "A fresh secret for every job, rotated straight after.",
  },
  ai: {
    standing: "Borrowed human token",
    wins: [
      { start: 0.6, end: 0.66, kind: "ok", label: "crm.read" },
      { start: 1.7, end: 1.76, kind: "ok", label: "crm.read" },
      { start: 3.0, end: 3.06, kind: "hold", label: "billing.send", sub: "held" },
      { start: 4.3, end: 4.36, kind: "ok", label: "docs.search" },
      { start: 5.6, end: 5.6, kind: "block", label: "db.drop", sub: "blocked" },
      { start: 6.8, end: 6.86, kind: "ok", label: "crm.read" },
    ],
    note: "One short grant per tool call. Risky calls are held or never granted.",
  },
};

const DAY_H = 8;
const PLAY_MS = 6200;

export function ZspTimelineStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = TL[item];
  const p = useProgress(PLAY_MS, 600, reduce);
  const now = (p / 100) * DAY_H; // hours since 09:00

  const standingExp = now;
  const omniExp = d.wins.reduce((acc, w) => acc + Math.max(0, Math.min(now, w.end) - w.start), 0);
  const totalOmni = d.wins.reduce((acc, w) => acc + (w.end - w.start), 0);
  const done = p >= 100;
  const live = d.wins.find((w) => now >= w.start && now < w.end && w.kind === "ok");
  const pct = (h: number) => `${(h / DAY_H) * 100}%`;

  return (
    <Stage title="Zero standing privilege" item={item} aspect="aspect-[1/1] sm:aspect-[16/11]">
      <div className="absolute inset-0 pt-[13cqw] sm:pt-[12cqw] px-[3.5cqw] pb-[3.5cqw] flex flex-col">
        {/* clock readout */}
        <div className="flex items-center justify-between">
          <span className="stg-xs text-slate-500 dark:text-slate-400">One working day</span>
          <span className="stg-sm font-mono font-semibold tabular-nums text-slate-900 dark:text-white">{fmtClock(9 + now)}</span>
        </div>

        <div className="mt-[2cqw] grid grid-cols-1 sm:grid-cols-[19cqw_1fr] gap-x-[2.4cqw] gap-y-[1.4cqw] sm:gap-y-[2.6cqw] items-center">
          {/* axis */}
          <span className="hidden sm:block" />
          <div className="relative h-[3cqw]">
            {Array.from({ length: DAY_H + 1 }, (_, i) => (
              <span key={i} className={`absolute stg-xs font-mono text-slate-400 ${i === 0 ? "" : i === DAY_H ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: pct(i) }}>
                {i % 2 === 0 ? fmtClock(9 + i) : ""}
              </span>
            ))}
          </div>

          {/* standing row */}
          <div className="leading-tight flex sm:block items-baseline justify-between">
            <span className="block stg-xs font-semibold text-slate-900 dark:text-white">Without OmniPriv</span>
            <span className="block stg-xs text-slate-500 dark:text-slate-400">{d.standing}</span>
          </div>
          <div className="relative h-[6cqw] rounded-[1.4cqw] bg-slate-900/[0.04] dark:bg-white/[0.04] overflow-hidden">
            <div className="absolute inset-y-0 left-0" style={{ width: `${p}%`, background: STRIPES }} />
            <span className="absolute inset-0 flex items-center gap-[1cqw] px-[1.6cqw] stg-xs font-semibold text-white">
              <LockOpen className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
              Always reachable
            </span>
            <Playhead p={p} />
          </div>

          {/* omnipriv row */}
          <div className="leading-tight flex sm:block items-baseline justify-between mt-[2cqw] sm:mt-0">
            <span className="block stg-xs font-semibold text-slate-900 dark:text-white">With OmniPriv</span>
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Access only when needed</span>
          </div>
          <div className="relative h-[6cqw] mt-[5cqw] sm:mt-0 rounded-[1.4cqw] bg-slate-900/[0.04] dark:bg-white/[0.04]">
            <span
              className="absolute inset-0 flex items-center gap-[1cqw] px-[1.6cqw] stg-xs text-slate-400 transition-opacity duration-300"
              style={{ opacity: item !== "human" && now >= d.wins[0].start ? 0 : 1 }}
            >
              <Lock className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
              No access
            </span>
            {d.wins.map((w, i) => {
              if (now < w.start) return null;
              const c = KIND_COLOR[w.kind];
              const grow = w.kind === "block" ? 0 : Math.min(now, w.end) - w.start;
              const closed = now >= w.end;
              const human = item === "human";
              return (
                <div key={i} className="absolute inset-y-0" style={{ left: pct(w.start), width: pct(Math.max(grow, 0.05)) }}>
                  <motion.div
                    className="absolute inset-0 rounded-[0.9cqw]"
                    style={{ background: c, boxShadow: `0 0 2cqw ${c}66` }}
                    initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
                    animate={{ opacity: closed && w.kind === "ok" ? 0.85 : 1, scaleY: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                  {/* request pin */}
                  <motion.span
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`absolute left-0 -translate-x-1/2 whitespace-nowrap flex flex-col items-center ${item === "ai" && i % 2 === 1 ? "top-[115%]" : "bottom-[115%]"}`}
                  >
                    <span className="stg-xs font-semibold" style={{ color: c }}>
                      {human ? (live ? "Open" : closed ? "Closed" : "Request") : w.label}
                    </span>
                  </motion.span>
                  {/* human: countdown inside, lock at the end */}
                  {human && !closed && (
                    <span className="absolute left-full ml-[1cqw] top-1/2 -translate-y-1/2 stg-xs font-mono font-semibold text-[#00667A] dark:text-[#7FD9EA] whitespace-nowrap">
                      {fmtDur(Math.max(0, w.end - now))} left
                    </span>
                  )}
                  {closed && (
                    <motion.span
                      initial={reduce ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 22 }}
                      className="absolute left-full ml-[0.6cqw] top-1/2 -translate-y-1/2 inline-flex items-center gap-[0.6cqw] whitespace-nowrap stg-xs font-medium"
                      style={{ color: w.kind === "ok" ? "#64748b" : c }}
                    >
                      {w.kind === "block" ? <Ban className="w-[2.4cqw] h-[2.4cqw]" /> : w.kind === "hold" ? <Hourglass className="w-[2.4cqw] h-[2.4cqw]" /> : item === "machine" ? <RefreshCw className="w-[2.4cqw] h-[2.4cqw]" /> : <Lock className="w-[2.4cqw] h-[2.4cqw]" />}
                      {human ? "Revoked" : item === "machine" ? "" : w.sub ?? ""}
                    </motion.span>
                  )}
                  {/* subtitle under the window */}
                  {w.sub && (human || item === "machine") && (
                    <span className="absolute left-0 -translate-x-1/4 top-[115%] whitespace-nowrap stg-xs font-mono text-slate-500 dark:text-slate-400">
                      {w.sub}
                    </span>
                  )}
                </div>
              );
            })}
            <Playhead p={p} />
          </div>
        </div>

        {/* comparison */}
        <div className="mt-auto">
          <div className="grid grid-cols-[19cqw_1fr_17cqw] items-center gap-x-[2.4cqw] gap-y-[1.6cqw]">
            <span className="stg-xs text-slate-500 dark:text-slate-400">Exposed today</span>
            <div className="h-[3.2cqw] rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(standingExp / DAY_H) * 100}%`, background: RED }} />
            </div>
            <span className="stg-sm font-bold tabular-nums text-rose-500" style={{ fontFamily: "var(--font-syne)" }}>
              {fmtDur(standingExp)}
            </span>

            <span className="stg-xs text-slate-500 dark:text-slate-400">With OmniPriv</span>
            <div className="h-[3.2cqw] rounded-full bg-slate-900/[0.04] dark:bg-white/[0.05] overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${Math.max((omniExp / DAY_H) * 100, omniExp > 0 ? 0.8 : 0)}%`, background: CYAN }} />
            </div>
            <span className="stg-sm font-bold tabular-nums text-[#00667A] dark:text-[#00B8DB]" style={{ fontFamily: "var(--font-syne)" }}>
              {omniExp > 0 ? fmtDur(Math.max(omniExp, 1 / 60)) : "0 min"}
            </span>
          </div>
          <p className="mt-[2cqw] stg-xs text-center text-slate-600 dark:text-slate-300 transition-opacity duration-500" style={{ opacity: done ? 1 : 0 }}>
            {d.note}{" "}
            <span className="font-semibold text-[#00667A] dark:text-[#00B8DB]">
              {Math.round((1 - totalOmni / DAY_H) * 100)}% less exposure in this example.
            </span>
          </p>
        </div>
      </div>
    </Stage>
  );
}

function Playhead({ p }: { p: number }) {
  return <span className="absolute -inset-y-[0.8cqw] w-[2px] -ml-px rounded-full bg-slate-900/70 dark:bg-white/85 z-10" style={{ left: `${p}%` }} aria-hidden="true" />;
}

/* ════════════════════════════════════════════════════════════
   2. 24-HOUR ACCESS CLOCK
   A clock hand sweeps one day. The outer red ring is standing access, on
   for every hour; the inner ring lights only for the minutes OmniPriv
   granted.
════════════════════════════════════════════════════════════ */

type CWin = { at: number; len: number; kind: Kind; label: string };

const CLOCK: Record<IdentityKey, CWin[]> = {
  human: [{ at: 10.97, len: 0.5, kind: "ok", label: "10:58  JIT session, 30 min" }],
  machine: [
    { at: 2, len: 0.12, kind: "ok", label: "02:00  backup lease" },
    { at: 8, len: 0.12, kind: "ok", label: "08:00  report lease" },
    { at: 14, len: 0.12, kind: "ok", label: "14:00  sync lease" },
    { at: 20, len: 0.12, kind: "ok", label: "20:00  backup lease" },
  ],
  ai: [
    { at: 9.2, len: 0.08, kind: "ok", label: "09:12  crm.read" },
    { at: 10.7, len: 0.08, kind: "ok", label: "10:42  crm.read" },
    { at: 12.1, len: 0.08, kind: "hold", label: "12:06  billing.send, held" },
    { at: 15.3, len: 0.08, kind: "block", label: "15:18  db.drop, blocked" },
    { at: 16.8, len: 0.08, kind: "ok", label: "16:48  docs.search" },
  ],
};

const arc = (cx: number, cy: number, r: number, h0: number, h1: number) => {
  const a0 = (h0 / 24) * Math.PI * 2 - Math.PI / 2;
  const a1 = (h1 / 24) * Math.PI * 2 - Math.PI / 2;
  const large = h1 - h0 > 12 ? 1 : 0;
  return `M${cx + r * Math.cos(a0)} ${cy + r * Math.sin(a0)} A${r} ${r} 0 ${large} 1 ${cx + r * Math.cos(a1)} ${cy + r * Math.sin(a1)}`;
};

export function ZspClockStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const wins = CLOCK[item];
  const p = useProgress(6000, 500, reduce);
  const hour = (p / 100) * 24;
  const c = 100;
  const handA = (hour / 24) * Math.PI * 2 - Math.PI / 2;
  const granted = wins.reduce((a, w) => a + (w.kind === "block" ? 0 : Math.max(0, Math.min(hour, w.at + w.len) - w.at)), 0);
  const passed = wins.filter((w) => hour >= w.at);

  return (
    <Stage title="24-hour access clock" item={item} aspect="aspect-[4/5] sm:aspect-[16/11]">
      <div className="absolute inset-0 pt-[12cqw] px-[3.5cqw] pb-[3.5cqw] grid grid-rows-[1fr_auto] sm:grid-rows-1 sm:grid-cols-[1.05fr_1fr] gap-[3cqw] items-center">
        <svg viewBox="0 0 200 200" className="w-full h-full max-h-full" aria-hidden="true">
          {/* hour ticks */}
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
            const r1 = i % 6 === 0 ? 49 : 53;
            return <line key={i} x1={c + r1 * Math.cos(a)} y1={c + r1 * Math.sin(a)} x2={c + 56 * Math.cos(a)} y2={c + 56 * Math.sin(a)} className="stroke-slate-900/25 dark:stroke-white/25" strokeWidth={i % 6 === 0 ? 1.4 : 0.7} />;
          })}
          {[0, 6, 12, 18].map((h) => {
            const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
            return (
              <text key={h} x={c + 42 * Math.cos(a)} y={c + 42 * Math.sin(a) + 3} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 8, fontFamily: "var(--font-jetbrains), monospace" }}>
                {String(h).padStart(2, "0")}
              </text>
            );
          })}
          {/* outer: standing access, always on */}
          <circle cx={c} cy={c} r="88" fill="none" className="stroke-slate-900/[0.06] dark:stroke-white/[0.06]" strokeWidth="9" />
          {hour > 0.05 && <path d={arc(c, c, 88, 0, Math.min(hour, 23.99))} fill="none" stroke={RED} strokeOpacity="0.75" strokeWidth="9" strokeLinecap="round" />}
          {/* inner: OmniPriv grants */}
          <circle cx={c} cy={c} r="72" fill="none" className="stroke-slate-900/[0.06] dark:stroke-white/[0.06]" strokeWidth="9" />
          {wins.map((w, i) =>
            hour >= w.at ? (
              <path key={i} d={arc(c, c, 72, w.at, w.at + Math.max(w.len, 0.25))} fill="none" stroke={KIND_COLOR[w.kind]} strokeWidth="9" strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 3px ${KIND_COLOR[w.kind]})` }} />
            ) : null
          )}
          {/* hand */}
          <line x1={c + 62 * Math.cos(handA)} y1={c + 62 * Math.sin(handA)} x2={c + 96 * Math.cos(handA)} y2={c + 96 * Math.sin(handA)} className="stroke-slate-900 dark:stroke-white" strokeWidth="2" strokeLinecap="round" />
          <circle cx={c + 96 * Math.cos(handA)} cy={c + 96 * Math.sin(handA)} r="2.6" className="fill-slate-900 dark:fill-white" />
          <text x={c} y={c - 2} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 7, fontFamily: "var(--font-jetbrains), monospace" }}>
            {p >= 100 ? "one day" : "now"}
          </text>
          <text x={c} y={c + 12} textAnchor="middle" className="fill-slate-900 dark:fill-white" style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-jetbrains), monospace" }}>
            {p >= 100 ? "24:00" : fmtClock(hour)}
          </text>
        </svg>

        <div className="flex flex-col gap-[2cqw] min-w-0">
          <div className="grid grid-cols-2 gap-[2cqw]">
            <div className="rounded-[1.8cqw] border border-rose-500/25 bg-rose-500/[0.06] px-[2cqw] py-[1.4cqw]">
              <span className="block stg-xs text-slate-500 dark:text-slate-400">Standing access</span>
              <span className="block stg-lg font-bold text-rose-500 tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>{fmtDur(hour)}</span>
            </div>
            <div className="rounded-[1.8cqw] border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-[2cqw] py-[1.4cqw]">
              <span className="block stg-xs text-slate-500 dark:text-slate-400">With OmniPriv</span>
              <span className="block stg-lg font-bold text-[#00667A] dark:text-[#00B8DB] tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
                {granted > 0 ? fmtDur(Math.max(granted, 1 / 60)) : "0 min"}
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-[1cqw] min-h-[20cqw]">
            <AnimatePresence initial={false}>
              {passed.map((w) => (
                <motion.li
                  key={w.label}
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-center gap-[1.4cqw] stg-xs font-mono text-slate-700 dark:text-slate-200"
                >
                  <span className="w-[1.6cqw] h-[1.6cqw] rounded-full shrink-0" style={{ background: KIND_COLOR[w.kind] }} />
                  <span className="truncate">{w.label}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════
   3. CREDENTIALS THAT EXPIRE
   Left: the standing credential, ageing and shared. Right: OmniPriv issues
   a credential for the task, its time runs out, and it is revoked. The live
   credential count returns to zero.
════════════════════════════════════════════════════════════ */

type Tok = { name: string; meta: string; ms: number; kind: Kind };

const TOKENS: Record<IdentityKey, { standing: { name: string; age: number; shared: number }; tokens: Tok[] }> = {
  human: {
    standing: { name: "prod-db admin password", age: 412, shared: 9 },
    tokens: [{ name: "jit_ticket_7Q2", meta: "prod-db-01, dba, 30 min", ms: 3600, kind: "ok" }],
  },
  machine: {
    standing: { name: "svc-backup password", age: 1096, shared: 4 },
    tokens: [
      { name: "sek_9f2c…a71e", meta: "postgres_prod, one job", ms: 1100, kind: "ok" },
      { name: "sek_4be0…13c9", meta: "postgres_prod, one job", ms: 1100, kind: "ok" },
      { name: "sek_d71a…7f02", meta: "postgres_prod, one job", ms: 1100, kind: "ok" },
    ],
  },
  ai: {
    standing: { name: "j.rahman API token", age: 230, shared: 3 },
    tokens: [
      { name: "call · crm.read_customers", meta: "scope: finance, read", ms: 800, kind: "ok" },
      { name: "call · docs.search", meta: "scope: finance, read", ms: 800, kind: "ok" },
      { name: "call · billing.send_invoice", meta: "waiting for s.khan", ms: 1300, kind: "hold" },
      { name: "call · db.drop_table", meta: "outside policy", ms: 900, kind: "block" },
    ],
  },
};

export function ZspTokensStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = TOKENS[item];
  const [idx, setIdx] = useState(reduce ? d.tokens.length : -1);
  const [startedAt, setStartedAt] = useState(0);
  const [, force] = useState(0);
  const [age, setAge] = useState(d.standing.age - 6);

  useEffect(() => {
    if (reduce) return;
    let i = -1;
    let t: number;
    const next = () => {
      i += 1;
      setIdx(i);
      setStartedAt(performance.now());
      if (i < d.tokens.length) t = window.setTimeout(next, d.tokens[i].ms + 450);
    };
    t = window.setTimeout(next, 700);
    return () => window.clearTimeout(t);
  }, [reduce, d.tokens]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const tick = () => {
      force((n) => n + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const a = window.setInterval(() => setAge((v) => Math.min(d.standing.age, v + 1)), 700);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(a);
    };
  }, [reduce, d.standing.age]);

  const cur = idx >= 0 && idx < d.tokens.length ? d.tokens[idx] : null;
  const ttl = cur ? Math.max(0, 1 - (performance.now() - startedAt) / cur.ms) : 0;
  const history = d.tokens.slice(0, Math.max(0, Math.min(idx, d.tokens.length)));
  const liveCount = cur && cur.kind === "ok" && ttl > 0 ? 1 : 0;

  return (
    <Stage title="Credentials that expire" item={item} aspect="aspect-[4/5] sm:aspect-[16/11]">
      <div className="absolute inset-0 pt-[12cqw] px-[3.5cqw] pb-[3.5cqw] grid grid-rows-[auto_1fr] sm:grid-rows-1 sm:grid-cols-[0.9fr_1.1fr] gap-[3cqw]">
        {/* standing credential */}
        <div className="flex flex-col">
          <span className="stg-xs font-semibold text-slate-900 dark:text-white">Without OmniPriv</span>
          <div className="mt-[1.4cqw] relative rounded-[2cqw] border border-rose-500/30 bg-rose-500/[0.05] p-[2.4cqw] overflow-hidden">
            {!reduce && <span className="absolute inset-0 rounded-[2cqw] stg-pulse-red" aria-hidden="true" />}
            <span className="inline-flex items-center justify-center w-[7cqw] h-[7cqw] rounded-[1.6cqw] bg-rose-500/15 text-rose-500">
              <KeyRound className="w-[50%] h-[50%]" aria-hidden="true" />
            </span>
            <span className="mt-[1.4cqw] block stg-sm font-mono font-semibold text-slate-900 dark:text-white">{d.standing.name}</span>
            <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1.6cqw]">
              <div>
                <span className="block stg-xs text-slate-500 dark:text-slate-400">Age</span>
                <span className="block stg-sm font-bold tabular-nums text-rose-500">{age} days</span>
              </div>
              <div>
                <span className="block stg-xs text-slate-500 dark:text-slate-400">Known by</span>
                <span className="inline-flex items-center gap-[0.8cqw] stg-sm font-bold text-rose-500">
                  <Users className="w-[2.6cqw] h-[2.6cqw]" aria-hidden="true" />
                  {d.standing.shared}
                </span>
              </div>
            </div>
            <span className="mt-[1.8cqw] inline-block stg-xs font-semibold px-[1.6cqw] py-[0.4cqw] rounded-full bg-rose-500 text-white">Never expires</span>
          </div>
        </div>

        {/* OmniPriv credentials */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center justify-between">
            <span className="stg-xs font-semibold text-slate-900 dark:text-white">With OmniPriv</span>
            <span className="stg-xs text-slate-500 dark:text-slate-400">
              Live credentials:{" "}
              <span className="font-bold tabular-nums" style={{ color: liveCount ? CYAN : GREEN }}>{liveCount}</span>
            </span>
          </div>

          <div className="mt-[1.4cqw] relative min-h-[19cqw]">
            <AnimatePresence mode="popLayout">
              {cur && (
                <motion.div
                  key={idx}
                  initial={reduce ? false : { opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-[2cqw] border p-[2.2cqw]"
                  style={{ borderColor: `${KIND_COLOR[cur.kind]}66`, background: `${KIND_COLOR[cur.kind]}10` }}
                >
                  <div className="flex items-center gap-[1.6cqw]">
                    <span className="inline-flex items-center justify-center w-[6cqw] h-[6cqw] rounded-[1.4cqw] shrink-0" style={{ background: `${KIND_COLOR[cur.kind]}22`, color: KIND_COLOR[cur.kind] }}>
                      {cur.kind === "block" ? <Ban className="w-[50%] h-[50%]" /> : cur.kind === "hold" ? <Hourglass className="w-[50%] h-[50%]" /> : <KeyRound className="w-[50%] h-[50%]" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block stg-sm font-mono font-semibold text-slate-900 dark:text-white truncate">{cur.name}</span>
                      <span className="block stg-xs text-slate-500 dark:text-slate-400 truncate">{cur.meta}</span>
                    </div>
                    <span className="stg-xs font-semibold shrink-0" style={{ color: KIND_COLOR[cur.kind] }}>
                      {cur.kind === "block" ? "Not issued" : cur.kind === "hold" ? "Held" : "Issued"}
                    </span>
                  </div>
                  {cur.kind !== "block" && (
                    <div className="mt-[1.6cqw]">
                      <div className="flex justify-between stg-xs text-slate-500 dark:text-slate-400">
                        <span>{cur.kind === "hold" ? "Waiting for approval" : "Time to live"}</span>
                        <span className="font-mono tabular-nums">{cur.kind === "hold" ? "" : `${Math.ceil(ttl * 100)}%`}</span>
                      </div>
                      <div className="mt-[0.8cqw] h-[1.6cqw] rounded-full bg-slate-900/[0.06] dark:bg-white/[0.08] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(cur.kind === "hold" ? 1 : ttl) * 100}%`, background: KIND_COLOR[cur.kind] }} />
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {!cur && idx >= d.tokens.length && (
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[2cqw] border border-emerald-500/30 bg-emerald-500/[0.06] p-[2.4cqw] flex items-center gap-[1.6cqw]"
              >
                <span className="inline-flex items-center justify-center w-[6cqw] h-[6cqw] rounded-full bg-emerald-500 text-white">
                  <Check className="w-[55%] h-[55%]" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="stg-sm font-semibold text-slate-900 dark:text-white">Nothing left to steal</span>
              </motion.div>
            )}
          </div>

          {/* history */}
          <ul className="mt-[2cqw] flex flex-col gap-[0.8cqw]">
            {history.map((t) => (
              <li key={t.name} className="flex items-center gap-[1.2cqw] stg-xs font-mono text-slate-500 dark:text-slate-400">
                <Lock className="w-[2.2cqw] h-[2.2cqw] shrink-0" aria-hidden="true" />
                <span className="truncate">{t.name}</span>
                <span className="ml-auto shrink-0" style={{ color: KIND_COLOR[t.kind] }}>
                  {t.kind === "ok" ? "expired, revoked" : t.kind === "hold" ? "held" : "blocked"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Stage>
  );
}

/* ════════════════════════════════════════════════════════════
   4. A WEEK OF ACCESS
   Every hour of the week as a cell. Standing access paints all 168 red;
   then OmniPriv sweeps through and only the hours that were actually
   granted stay lit.
════════════════════════════════════════════════════════════ */

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WEEK: Record<IdentityKey, { cells: { d: number; h: number; kind: Kind }[]; total: string }> = {
  human: {
    cells: [
      { d: 1, h: 11, kind: "ok" },
      { d: 3, h: 15, kind: "ok" },
    ],
    total: "1 h",
  },
  machine: {
    cells: DAYS.map((_, d) => ({ d, h: 2, kind: "ok" as Kind })),
    total: "35 min",
  },
  ai: {
    cells: [
      { d: 0, h: 9, kind: "ok" },
      { d: 0, h: 14, kind: "ok" },
      { d: 1, h: 10, kind: "ok" },
      { d: 2, h: 12, kind: "hold" },
      { d: 2, h: 16, kind: "ok" },
      { d: 3, h: 9, kind: "ok" },
      { d: 3, h: 15, kind: "block" },
      { d: 4, h: 11, kind: "ok" },
      { d: 4, h: 13, kind: "ok" },
    ],
    total: "7 grants",
  },
};

export function ZspWeekStage({ item, reduce }: { item: IdentityKey; reduce: boolean }) {
  const d = WEEK[item];
  const step = useSteps([400, 2000], reduce); // 1: all red, 2: OmniPriv sweep
  const sweep = useProgress(1800, 2000, reduce);
  const grant = (dd: number, hh: number) => d.cells.find((c) => c.d === dd && c.h === hh);
  const cleared = step >= 2 ? Math.floor((sweep / 100) * 24) : -1;
  const paint = useProgress(1400, 400, reduce);
  const reach = step < 1 ? 0 : Math.round((Math.min(paint, 100) / 100) * 168);

  return (
    <Stage title="A week of access" item={item} aspect="aspect-[4/3] sm:aspect-[16/11]">
      <div className="absolute inset-0 pt-[12cqw] px-[3.5cqw] pb-[3.5cqw] flex flex-col">
        <div className="grid grid-cols-[7cqw_1fr] gap-x-[1.6cqw]">
          <span />
          <div className="relative h-[3cqw]">
            {[0, 6, 12, 18].map((h) => (
              <span key={h} className="absolute stg-xs font-mono text-slate-400" style={{ left: `${(h / 24) * 100}%` }}>
                {String(h).padStart(2, "0")}:00
              </span>
            ))}
          </div>
          {DAYS.map((day, dd) => (
            <div key={day} className="contents">
              <span className="stg-xs text-slate-500 dark:text-slate-400 self-center">{day}</span>
              <div className="grid grid-cols-[repeat(24,minmax(0,1fr))] gap-[0.45cqw] py-[0.3cqw]">
                {Array.from({ length: 24 }, (_, hh) => {
                  const g = grant(dd, hh);
                  const isCleared = hh < cleared;
                  let bg = "rgba(148,163,184,0.12)";
                  let glow = "none";
                  if (step >= 1 && !isCleared) bg = "rgba(244,63,94,0.6)";
                  if (isCleared) {
                    bg = g ? KIND_COLOR[g.kind] : "rgba(148,163,184,0.12)";
                    if (g) glow = `0 0 1.4cqw ${KIND_COLOR[g.kind]}`;
                  }
                  return (
                    <span
                      key={hh}
                      className="block aspect-square rounded-[0.5cqw]"
                      style={{
                        background: bg,
                        boxShadow: glow,
                        transition: `background-color 0.35s ease ${step === 1 ? (hh + dd) * 18 : 0}ms, box-shadow 0.35s ease`,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-[2cqw]">
          <div className="rounded-[1.8cqw] border border-rose-500/25 bg-rose-500/[0.06] px-[2.2cqw] py-[1.6cqw]">
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Reachable with standing access</span>
            <span className="block stg-lg font-bold text-rose-500 tabular-nums" style={{ fontFamily: "var(--font-syne)" }}>
              {reach} of 168 h
            </span>
          </div>
          <div className="rounded-[1.8cqw] border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-[2.2cqw] py-[1.6cqw]">
            <span className="block stg-xs text-slate-500 dark:text-slate-400">Granted by OmniPriv</span>
            <span className="block stg-lg font-bold text-[#00667A] dark:text-[#00B8DB]" style={{ fontFamily: "var(--font-syne)" }}>
              {sweep >= 100 ? d.total : "…"}
            </span>
          </div>
        </div>
        <div className="mt-[1.6cqw] flex flex-wrap justify-center gap-x-[3cqw] gap-y-[0.8cqw] stg-xs text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-[0.8cqw]"><span className="w-[1.8cqw] h-[1.8cqw] rounded-[0.4cqw]" style={{ background: "rgba(244,63,94,0.6)" }} />Standing access</span>
          <span className="inline-flex items-center gap-[0.8cqw]"><span className="w-[1.8cqw] h-[1.8cqw] rounded-[0.4cqw]" style={{ background: CYAN }} />Granted, then revoked</span>
          {item === "ai" && (
            <>
              <span className="inline-flex items-center gap-[0.8cqw]"><span className="w-[1.8cqw] h-[1.8cqw] rounded-[0.4cqw]" style={{ background: AMBER }} />Held</span>
              <span className="inline-flex items-center gap-[0.8cqw]"><span className="w-[1.8cqw] h-[1.8cqw] rounded-[0.4cqw]" style={{ background: RED }} />Blocked</span>
            </>
          )}
        </div>
      </div>
    </Stage>
  );
}
