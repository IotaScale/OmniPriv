"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, Clock, Database, Eye, EyeOff, FileKey, KeyRound, Terminal, X } from "lucide-react";

/* Illustrations for /solutions/human-identity-security. Values are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;

function useLoop(steps: number, ms: number, amount = 0.4) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % steps), ms);
        return () => window.clearInterval(t);
    }, [seen, reduce, steps, ms]);
    return { ref, i: reduce ? steps - 1 : i, reduce: !!reduce, seen: seen || !!reduce };
}

/* Standing privilege vs JIT across one day: the same work, a fraction of the exposure. */
const GRANTS = [
    { from: 9, to: 10 },
    { from: 13.5, to: 14 },
    { from: 16, to: 17 },
];
export function ExposureVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });
    const seen = inView || !!reduce;
    const pct = (h: number) => `${(h / 24) * 100}%`;
    const hours = GRANTS.reduce((a, g) => a + (g.to - g.from), 0);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: one administrator's day. Standing privilege is open for all 24 hours; with Just-in-Time access it is open only for the three tasks that needed it">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Clock className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Admin rights over one day · a.khan</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-5 space-y-6">
                {/* standing */}
                <div>
                    <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="font-semibold text-white">Standing privilege</span>
                        <span className="font-mono text-rose-300">24 h exposed</span>
                    </div>
                    <div className="relative mt-2 h-7 rounded-lg bg-white/[0.04] overflow-hidden">
                        <motion.div
                            className="absolute inset-0 origin-left rounded-lg bg-[repeating-linear-gradient(135deg,rgba(244,63,94,0.45)_0_6px,rgba(244,63,94,0.25)_6px_12px)]"
                            initial={reduce ? false : { scaleX: 0 }}
                            animate={{ scaleX: seen ? 1 : 0 }}
                            transition={{ duration: 1.1, ease }}
                        />
                    </div>
                </div>
                {/* jit */}
                <div>
                    <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="font-semibold text-white">Just-in-Time</span>
                        <span className="font-mono text-emerald-300">{hours} h, only while working</span>
                    </div>
                    <div className="relative mt-2 h-7 rounded-lg bg-white/[0.04]">
                        {GRANTS.map((g, k) => (
                            <motion.span
                                key={g.from}
                                className="absolute inset-y-0 rounded-md bg-[#00B8DB] shadow-[0_0_16px_rgba(0,184,219,0.45)]"
                                style={{ left: pct(g.from), width: pct(g.to - g.from) }}
                                initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
                                animate={{ opacity: seen ? 1 : 0, scaleY: seen ? 1 : 0.4 }}
                                transition={{ duration: 0.4, delay: 1 + k * 0.25, ease }}
                            />
                        ))}
                    </div>
                    <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-slate-600">
                        {["00:00", "06:00", "12:00", "18:00", "24:00"].map((h) => (
                            <span key={h}>{h}</span>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[0.6875rem]">
                    {["Patch window", "Config change", "Incident fix"].map((t) => (
                        <span key={t} className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2 text-slate-300">
                            <Check className="w-3 h-3 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />
                            <span className="truncate">{t}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* Credentials: passwords, SSH keys and API tokens rotate in the vault; the person never sees them. */
const SECRETS = [
    { t: "Admin password", host: "esxi-03 / root", i: KeyRound },
    { t: "SSH key", host: "linux-prod-01", i: Terminal },
    { t: "API token", host: "billing-api", i: FileKey },
];
const MASK = "••••••••••••";
const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
const rnd = (n: number) => Array.from({ length: n }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");
export function RotationVisual() {
    const { ref, i, reduce } = useLoop(SECRETS.length * 2, 1100);
    const [vals, setVals] = useState(() => SECRETS.map(() => "x7Qm2Lp9Vt4R"));
    const rotating = Math.floor(i / 2);
    useEffect(() => {
        if (reduce || i % 2 !== 1) return;
        setVals((v) => v.map((x, k) => (k === rotating ? rnd(12) : x)));
    }, [i, rotating, reduce]);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: administrative passwords, SSH keys and API tokens are rotated automatically inside the vault, and the person using them never sees the value">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <KeyRound className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Vault · automatic rotation</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-2">
                {SECRETS.map((s, k) => {
                    const now = k === rotating && !reduce;
                    return (
                        <li key={s.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${now ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <s.i className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                            <span className="min-w-0">
                                <span className="block text-[0.8125rem] font-semibold text-white">{s.t}</span>
                                <span className="block truncate font-mono text-[0.6875rem] text-slate-500">{s.host}</span>
                            </span>
                            <span className="text-right">
                                <span className="block font-mono text-[0.75rem] text-slate-300 tabular-nums">{now ? vals[k] : MASK}</span>
                                <span className={`block text-[0.625rem] font-semibold ${now ? "text-[#7FE3F2]" : "text-slate-500"}`}>{now ? "rotating in vault" : "rotated · vaulted"}</span>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 grid grid-cols-2 gap-2 text-[0.75rem]">
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3 py-2.5 text-slate-300">
                    <EyeOff className="w-4 h-4 shrink-0 text-emerald-300" aria-hidden="true" /> User never sees it
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3 py-2.5 text-slate-300">
                    <X className="w-4 h-4 shrink-0 text-rose-300" aria-hidden="true" /> No shared passwords
                </span>
            </div>
        </div>
    );
}

/* AI: three behaviours compared with the person's own baseline. */
const SIGNALS = [
    { t: "Command pattern", base: "M0 22 L20 20 L40 23 L60 19 L80 21 L100 20", obs: "M0 22 L20 20 L40 23 L60 19 L80 6 L100 4", note: "rare privilege-escalation commands" },
    { t: "Access time", base: "M0 24 L20 10 L40 8 L60 9 L80 22 L100 25", obs: "M0 24 L20 10 L40 8 L60 9 L80 22 L100 6", note: "login at 03:12, outside the usual window" },
    { t: "Data volume", base: "M0 22 L20 21 L40 20 L60 22 L80 21 L100 21", obs: "M0 22 L20 21 L40 20 L60 14 L80 6 L100 3", note: "export 40x the usual size" },
];
export function AnomalyVisual() {
    const { ref, i, reduce } = useLoop(SIGNALS.length + 2, 1400);
    const respond = i >= SIGNALS.length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: behavioral analysis compares command patterns, access times and data volumes with a person's normal baseline, flags the deviations, raises an alert and can terminate the session">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Eye className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Behavioral analysis · j.carter</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 grid gap-2 sm:grid-cols-3">
                {SIGNALS.map((s, k) => {
                    const hit = k <= i || reduce;
                    return (
                        <li key={s.t} className={`min-w-0 rounded-xl border p-3 transition-colors duration-300 ${hit ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-[0.75rem] font-semibold text-white">{s.t}</span>
                                {hit && <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-300" aria-hidden="true" />}
                            </div>
                            <svg viewBox="0 0 100 28" className="mt-2 w-full h-9" aria-hidden="true" preserveAspectRatio="none">
                                <path d={s.base} fill="none" stroke="#64748b" strokeWidth="1.4" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                                <motion.path d={s.obs} fill="none" stroke={hit ? "#fbbf24" : "#00B8DB"} strokeWidth="2" vectorEffect="non-scaling-stroke" initial={false} animate={{ pathLength: hit ? 1 : 0.6 }} transition={{ duration: reduce ? 0 : 0.6, ease }} />
                            </svg>
                            <p className={`mt-1 text-[0.625rem] leading-snug ${hit ? "text-amber-200" : "text-slate-500"}`}>{hit ? s.note : "within baseline"}</p>
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 grid grid-cols-2 gap-2 text-[0.75rem] font-semibold">
                <span className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${respond ? "border-amber-400/45 bg-amber-400/[0.08] text-amber-200" : "border-white/[0.07] text-slate-500"}`}>
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" /> Alert raised
                </span>
                <span className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${i === SIGNALS.length + 1 || reduce ? "border-rose-400/45 bg-rose-500/[0.1] text-rose-200" : "border-white/[0.07] text-slate-500"}`}>
                    <X className="w-4 h-4 shrink-0" aria-hidden="true" /> Session terminated
                </span>
            </div>
            <div className="flex items-center gap-2 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <Database className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> A valid identity, behaving unexpectedly
            </div>
        </div>
    );
}
