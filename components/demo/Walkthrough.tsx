"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Check, ClipboardCheck, FileText, KeyRound, Link2, Mail, Monitor, RefreshCw, Server, Smartphone, UserCheck, UserRound } from "lucide-react";

/*
 * /demo "What we'll walk through": the four session topics as an interactive
 * walkthrough. Tabs auto-advance with a progress bar (paused on hover or
 * once the visitor picks a tab); each topic shows its copy beside a small
 * illustration of what that part of the session covers. Topic copy comes
 * from the page; illustration values are illustrative.
 */

export interface Topic {
    title: string;
    text: string;
}

const ICONS = [Server, KeyRound, UserCheck, ClipboardCheck];
const DWELL = 7000;

/* 1 · deployment */
function DeployPane() {
    const reduce = useReducedMotion();
    return (
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
                {["VMware", "Red Hat", "OpenStack"].map((p, k) => (
                    <motion.span key={p} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduce ? 0 : k * 0.08 }} className="rounded-xl border border-white/[0.08] bg-white/[0.03] py-2.5 text-center text-[0.75rem] font-semibold text-slate-200">
                        {p}
                    </motion.span>
                ))}
            </div>
            <div className="rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.06] py-2 text-center text-[0.75rem] font-semibold text-[#7FE3F2]">hardware-agnostic software appliance</div>
            <div className="grid grid-cols-3 gap-2">
                {["node-1", "node-2", "node-3"].map((n, k) => (
                    <motion.div key={n} initial={reduce ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : 0.25 + k * 0.1 }} className="rounded-xl border border-emerald-400/30 bg-[#0b0c0e] px-3 py-3">
                        <div className="flex items-center gap-1.5 font-mono text-[0.75rem] font-semibold text-white">
                            <Server className="w-3.5 h-3.5 text-slate-400" /> {n}
                        </div>
                        <div className="mt-1.5 flex items-center gap-1.5 text-[0.625rem] font-semibold text-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 aip-blink" /> healthy
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="text-center text-[0.6875rem] text-slate-500">multi-node clustering available for high availability</div>
        </div>
    );
}

/* 2 · secrets */
const PLACES = ["Configuration files", "Databases", "Registries", "Windows Services", "Scheduled tasks", "IIS App Pools"];
function SecretsPane() {
    const reduce = useReducedMotion();
    const [n, setN] = useState(reduce ? PLACES.length : 0);
    useEffect(() => {
        if (reduce) return;
        const t = window.setInterval(() => setN((v) => Math.min(v + 1, PLACES.length)), 650);
        return () => window.clearInterval(t);
    }, [reduce]);
    return (
        <ul className="grid sm:grid-cols-2 gap-2">
            {PLACES.map((p, k) => {
                const done = k < n;
                return (
                    <li key={p} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${done ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.06]" : "border-amber-400/30 bg-amber-400/[0.05]"}`}>
                        {done ? <RefreshCw className="w-4 h-4 shrink-0 text-[#7FE3F2]" /> : <KeyRound className="w-4 h-4 shrink-0 text-amber-300" />}
                        <span className="min-w-0">
                            <span className="block truncate text-[0.75rem] font-semibold text-white">{p}</span>
                            <span className={`block text-[0.625rem] ${done ? "text-[#7FE3F2]" : "text-amber-200/80"}`}>{done ? "vaulted · rotated automatically" : "hard-coded secret found"}</span>
                        </span>
                    </li>
                );
            })}
        </ul>
    );
}

/* 3 · approval */
function ApprovalPane() {
    const reduce = useReducedMotion();
    const [n, setN] = useState(reduce ? 3 : 0);
    useEffect(() => {
        if (reduce) return;
        const t = window.setInterval(() => setN((v) => Math.min(v + 1, 3)), 900);
        return () => window.clearInterval(t);
    }, [reduce]);
    const rows = [
        { who: "j.carter", role: "Requester", note: "cannot approve own request", i: UserRound, kind: "req" },
        { who: "s.noor", role: "Approver 1", note: "approved on mobile", i: Smartphone, kind: "ok" },
        { who: "d.okafor", role: "Approver 2", note: "approved by email", i: Mail, kind: "ok" },
    ];
    return (
        <div className="space-y-2">
            {rows.map((r, k) => {
                const on = k < n;
                return (
                    <div key={r.who} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${r.kind === "req" ? "border-white/[0.08] bg-white/[0.03]" : on ? "border-emerald-400/35 bg-emerald-400/[0.07]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                        <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/[0.05] text-slate-300">
                            <r.i className="w-4 h-4" />
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[0.8125rem] font-semibold text-white">
                                {r.role} <span className="font-mono font-normal text-slate-400">· {r.who}</span>
                            </span>
                            <span className="block text-[0.6875rem] text-slate-400">{r.note}</span>
                        </span>
                        {r.kind === "req" ? <Ban className="w-4 h-4 text-rose-300" /> : on ? <Check className="w-4 h-4 text-emerald-300" strokeWidth={3} /> : <span className="w-4 h-4 rounded-full border border-white/20" />}
                    </div>
                );
            })}
            <motion.div initial={false} animate={{ opacity: n >= 3 ? 1 : 0.35 }} className="rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.07] px-3.5 py-2.5 text-[0.75rem] font-semibold text-[#7FE3F2]">
                4-eyes satisfied · access released for the approved window
            </motion.div>
        </div>
    );
}

/* 4 · audit */
function AuditPane() {
    const reduce = useReducedMotion();
    const items = [
        { t: "Session recording", d: "indexed, searchable playback", i: Monitor },
        { t: "Hash-chained audit records", d: "each entry linked to the last", i: Link2 },
        { t: "Scheduled entitlement report", d: "who can reach what, on a schedule", i: FileText },
    ];
    return (
        <div className="space-y-2">
            {items.map((x, k) => (
                <motion.div key={x.t} initial={reduce ? false : { opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduce ? 0 : k * 0.15, ease: [0.23, 1, 0.32, 1] }} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] px-3.5 py-3">
                    <x.i className="w-4 h-4 text-[#7FE3F2]" />
                    <span className="min-w-0">
                        <span className="block text-[0.8125rem] font-semibold text-white">{x.t}</span>
                        <span className="block truncate text-[0.6875rem] text-slate-400">{x.d}</span>
                    </span>
                    <Check className="w-4 h-4 text-emerald-300" strokeWidth={3} />
                </motion.div>
            ))}
            <div className="pt-1 text-[0.6875rem] text-slate-500">Against whichever framework applies to you</div>
            <div className="flex flex-wrap gap-1.5">
                {["SOC 2", "ISO 27001", "NIST 800-53", "HIPAA", "PCI DSS", "SOX 404"].map((f) => (
                    <span key={f} className="rounded-md border border-white/[0.1] px-2 py-1 text-[0.6875rem] font-semibold text-slate-300">
                        {f}
                    </span>
                ))}
            </div>
        </div>
    );
}

const PANES = [DeployPane, SecretsPane, ApprovalPane, AuditPane];

export default function Walkthrough({ topics }: { topics: Topic[] }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.35 });
    const [i, setI] = useState(0);
    const [paused, setPaused] = useState(false);
    const [locked, setLocked] = useState(false);
    const auto = !reduce && seen && !paused && !locked;

    useEffect(() => {
        if (!auto) return;
        const t = window.setTimeout(() => setI((v) => (v + 1) % topics.length), DWELL);
        return () => window.clearTimeout(t);
    }, [i, auto, topics.length]);

    /* Keep the active tab visible in the sideways-scrolling tab row on phones. */
    const tabsRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const row = tabsRef.current;
        const el = row?.children[i] as HTMLElement | undefined;
        if (!row || !el || row.scrollWidth <= row.clientWidth) return;
        row.scrollTo({ left: Math.max(0, el.offsetLeft - 16), behavior: reduce ? "auto" : "smooth" });
    }, [i, reduce]);


    return (
        <div ref={ref} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-5 items-stretch">
            {/* tabs */}
            <div ref={tabsRef} role="tablist" aria-label="Session topics" className="aip-noscroll flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
                {topics.map((t, k) => {
                    const I = ICONS[k] ?? Server;
                    const on = k === i;
                    return (
                        <button
                            key={t.title}
                            role="tab"
                            type="button"
                            id={`wt-tab-${k}`}
                            aria-selected={on}
                            aria-controls="wt-panel"
                            onClick={() => {
                                setI(k);
                                setLocked(true);
                            }}
                            className={`relative shrink-0 lg:flex-1 overflow-hidden rounded-2xl border px-4 py-4 text-left transition-colors duration-200 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.08] bg-white/[0.02] hover:border-[#00B8DB]/30"}`}
                        >
                            <span className="flex items-center gap-3">
                                <span className={`inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-[#7FE3F2]"}`}>
                                    <I className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <span className="whitespace-nowrap lg:whitespace-normal text-[0.9375rem] font-semibold text-white">{t.title}</span>
                            </span>
                            {on && auto && (
                                <motion.span key={`bar-${i}`} className="absolute left-0 bottom-0 h-0.5 w-full origin-left bg-[#00B8DB]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: DWELL / 1000, ease: "linear" }} aria-hidden="true" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* panel: every topic is rendered in the same grid cell, so the panel is
                always as tall as the tallest topic and never resizes on a switch */}
            <div id="wt-panel" role="tabpanel" aria-labelledby={`wt-tab-${i}`} className="aip-console min-w-0 overflow-hidden grid">
                {topics.map((t, k) => {
                    const on = k === i;
                    const P = PANES[k] ?? DeployPane;
                    const I = ICONS[k] ?? Server;
                    return (
                        <motion.div
                            key={t.title}
                            aria-hidden={!on}
                            initial={false}
                            animate={{ opacity: on ? 1 : 0, y: on || reduce ? 0 : 6 }}
                            transition={{ duration: on ? 0.3 : 0.12, ease: [0.23, 1, 0.32, 1] }}
                            className={`[grid-area:1/1] grid xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 p-6 lg:p-7 ${on ? "visible" : "invisible pointer-events-none"}`}
                        >
                            <div className="min-w-0">
                                <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                    <I className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="mt-4 text-[1.25rem] font-bold leading-snug tracking-[-0.01em] text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                    {t.title}
                                </h3>
                                <p className="mt-2 text-[0.9375rem] leading-[1.65] text-slate-400">{t.text}</p>
                                <div className="mt-5 text-[0.75rem] font-semibold text-slate-500">
                                    Topic {k + 1} of {topics.length}
                                </div>
                            </div>
                            <div className="min-w-0" aria-hidden="true">
                                {/* remounted when shown, so its animation replays from the start */}
                                <P key={on ? `on-${k}` : `off-${k}`} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
