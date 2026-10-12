"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Bot, Check, Clock, Database, Lock, Server, User } from "lucide-react";

/* Illustrations for /platform/ai-threat-protection. Values are illustrative. */

const EASE = [0.23, 1, 0.32, 1] as const;

/* Blast radius: standing privilege reaches everything; JIT reaches one thing for a while. */
export function BlastRadius() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.5 });
    const [after, setAfter] = useState(!!reduce);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setAfter((a) => !a), 3200);
        setAfter(false);
        const first = window.setTimeout(() => setAfter(true), 1600);
        return () => {
            window.clearInterval(t);
            window.clearTimeout(first);
        };
    }, [seen, reduce]);
    const targets = ["prod-db-01", "billing", "linux_prod", "k8s-prod", "backups", "AD"];
    const cx = 60;
    const cy = 120;
    return (
        <div ref={ref} className="rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-5" role="img" aria-label="Illustration: a compromised identity with standing privilege reaches six systems; with just-in-time access it reaches one, for a limited time">
            <div className="flex items-center justify-between gap-3">
                <span className="text-[0.8125rem] font-semibold text-[#0a1628] dark:text-white">{after ? "With OmniPriv: one task, one system, for 30 min" : "Standing privilege: everything is reachable"}</span>
                <span className={`shrink-0 rounded-md border px-2 py-0.5 text-[0.6875rem] font-semibold transition-colors duration-300 ${after ? "border-[#00B8DB]/35 text-[#00667A] dark:text-[#7FD9EA]" : "border-rose-500/30 text-rose-600 dark:text-rose-300"}`}>
                    {after ? "1 of 6 reachable" : "6 of 6 reachable"}
                </span>
            </div>
            <svg viewBox="0 0 320 240" className="mt-3 w-full h-auto" aria-hidden="true">
                {targets.map((t, i) => {
                    const y = 20 + i * 40;
                    const live = !after || i === 0;
                    return (
                        <g key={t}>
                            <motion.line x1={cx + 22} y1={cy} x2={200} y2={y} strokeWidth={1.6} initial={false} animate={{ opacity: live ? 1 : 0.12, stroke: after ? "#00B8DB" : "#f43f5e" }} strokeDasharray={after && i === 0 ? "0" : "4 4"} transition={{ duration: 0.4, ease: EASE }} />
                            <rect x={200} y={y - 14} width={112} height={28} rx={8} className="fill-white dark:fill-[#15171a]" stroke={live ? (after ? "#00B8DB" : "#f43f5e") : "rgba(148,163,184,0.3)"} strokeOpacity={live ? 0.7 : 1} style={{ transition: "stroke .4s" }} />
                            <text x={212} y={y + 4} fontSize="10.5" className="fill-slate-700 dark:fill-slate-300" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                                {t}
                            </text>
                        </g>
                    );
                })}
                <circle cx={cx} cy={cy} r={24} fill={after ? "#00B8DB" : "#f43f5e"} style={{ transition: "fill .4s" }} />
                <text x={cx} y={cy + 42} textAnchor="middle" fontSize="10" className="fill-slate-500" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    compromised identity
                </text>
            </svg>
            <span className="sr-only">{after ? "One system reachable" : "Six systems reachable"}</span>
            {after && (
                <div className="mt-1 inline-flex items-center gap-1.5 text-[0.75rem] text-slate-500">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Access expires with the task
                </div>
            )}
        </div>
    );
}

/* Seven patterns, scanned in turn; flagged ones light up. */
export function PatternScan({ patterns }: { patterns: string[] }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.4 });
    const [k, setK] = useState(-1);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setK((v) => (v + 1) % (patterns.length + 2)), 700);
        return () => window.clearInterval(t);
    }, [seen, reduce, patterns.length]);
    return (
        <div ref={ref} className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Anomaly scoring · privileged sessions</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-[#7FE3F2] shrink-0">39 features</span>
            </div>
            <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {patterns.map((p, i) => {
                    const scanning = i === k;
                    const hit = i === 3 || i === 5; // illustrative detections
                    const lit = reduce ? hit : i < k && hit;
                    return (
                        <li key={p} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.8125rem] transition-colors duration-200 ${lit ? "border-rose-500/40 bg-rose-500/10 text-rose-200" : scanning ? "border-[#00B8DB]/60 bg-[#00B8DB]/[0.08] text-white" : "border-white/[0.07] bg-white/[0.02] text-slate-300"}`}>
                            <span className={`w-2 h-2 rounded-full shrink-0 ${lit ? "bg-rose-400" : scanning ? "bg-[#7FE3F2]" : "bg-white/20"}`} />
                            <span className="truncate">{p}</span>
                            {lit && <span className="ml-auto text-[0.6875rem] font-semibold shrink-0">flagged</span>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* Containment: the compromised node's paths are cut one by one. */
export function ContainVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.5 });
    const [cut, setCut] = useState(reduce ? 4 : 0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setCut((c) => (c >= 6 ? 0 : c + 1)), 700);
        return () => window.clearInterval(t);
    }, [seen, reduce]);
    const nodes = [
        { x: 250, y: 40, l: "db-02", i: Database },
        { x: 270, y: 120, l: "k8s-prod", i: Server },
        { x: 250, y: 200, l: "billing", i: Lock },
        { x: 70, y: 200, l: "AD", i: User },
    ];
    const done = cut >= 4;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a suspicious identity's attempts to move to other systems are restricted and its session is terminated">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Containment · svc-deploy</span>
                <span className={`ml-auto text-[0.6875rem] font-semibold shrink-0 ${done ? "text-emerald-300" : "text-amber-300"}`}>{done ? "Contained" : "Restricting access"}</span>
            </div>
            <svg viewBox="0 0 340 240" className="w-full h-auto p-3" aria-hidden="true">
                {nodes.map((n, i) => {
                    const blocked = cut > i;
                    const mx = (110 + n.x) / 2;
                    const my = (110 + n.y) / 2;
                    return (
                        <g key={n.l}>
                            <line x1={110} y1={110} x2={n.x} y2={n.y} stroke={blocked ? "#f43f5e" : "#f59e0b"} strokeWidth={1.6} strokeDasharray="5 5" opacity={blocked ? 0.35 : 0.9} style={{ transition: "stroke .25s, opacity .25s" }} />
                            {blocked && (
                                <g>
                                    <circle cx={mx} cy={my} r={9} fill="#15171a" stroke="#f43f5e" />
                                    <path d={`M${mx - 3.5} ${my - 3.5} L${mx + 3.5} ${my + 3.5} M${mx + 3.5} ${my - 3.5} L${mx - 3.5} ${my + 3.5}`} stroke="#fda4af" strokeWidth={1.8} />
                                </g>
                            )}
                        </g>
                    );
                })}
                {nodes.map((n) => (
                    <g key={`box-${n.l}`}>
                        <rect x={n.x - 34} y={n.y - 14} width={68} height={28} rx={8} fill="#1b1d21" stroke="rgba(255,255,255,0.15)" />
                        <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="10.5" fill="#cbd5e1" style={{ fontFamily: "var(--font-jetbrains), monospace" }}>
                            {n.l}
                        </text>
                    </g>
                ))}
                <circle cx={110} cy={110} r={26} fill="#15171a" />
                <circle cx={110} cy={110} r={26} fill={done ? "rgba(244,63,94,0.15)" : "rgba(245,158,11,0.15)"} stroke={done ? "#f43f5e" : "#f59e0b"} strokeWidth={1.6} />
                <text x={110} y={114} textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    {done ? "isolated" : "suspect"}
                </text>
            </svg>
            <div className="px-4 pb-4 grid grid-cols-3 gap-2 text-[0.6875rem]">
                {["Investigate", "Restrict access", "Terminate session"].map((t, i) => (
                    <span key={t} className={`rounded-lg border px-2 py-1.5 text-center transition-colors duration-300 ${cut > [0, 1, 3][i] ? "border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] text-[#7FE3F2]" : "border-white/[0.07] text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* Prompt-injection guard: a manipulated tool call is re-verified against policy. */
export function AgentGuard({ capabilities }: { capabilities: string[] }) {
    return (
        <div className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Bot className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">ai-agent-07 · deterministic policy</span>
            </div>
            <div className="p-4 space-y-2.5">
                <div className="rounded-xl border border-amber-400/30 bg-amber-400/[0.07] px-3.5 py-2.5 text-[0.75rem]" data-aos="fade-up">
                    <div className="text-amber-300 font-semibold">Unsafe input reached the model</div>
                    <div className="mt-1 font-mono text-slate-300 truncate">tool_call: db.drop_table(&quot;orders&quot;)</div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2.5 text-[0.75rem] font-semibold text-rose-200" data-aos="fade-up" data-aos-delay="150">
                    <Ban className="w-4 h-4 shrink-0" /> Re-verified against policy: not on the allowlist, blocked
                </div>
                <ul className="pt-1 grid grid-cols-2 gap-1.5">
                    {capabilities.map((c) => (
                        <li key={c} className="flex items-center gap-1.5 text-[0.75rem] text-slate-300 min-w-0">
                            <Check className="w-3.5 h-3.5 text-[#7FE3F2] shrink-0" strokeWidth={3} />
                            <span className="truncate">{c}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

