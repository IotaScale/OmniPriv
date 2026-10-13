"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { AppWindow, Bot, Building2, Cloud, Cpu, Eye, GitBranch, KeyRound, ScrollText, ServerCog, UserRound, Workflow } from "lucide-react";

/*
 * "Privileged Access Has Changed in the AI Era": the nine kinds of identity
 * the copy lists, arranged around the privileged core they can all reach.
 * Links draw in on view, then one identity at a time sends a request into the
 * core with an example of what it touches. Phones get a stacked list.
 * Examples are illustrative.
 */

const ICONS = [UserRound, Building2, ServerCog, AppWindow, Cloud, GitBranch, Cpu, Workflow, Bot];
const EXAMPLES = [
    "sudo on a production server",
    "remote session into a customer database",
    "nightly backup with a stored password",
    "API token to the billing service",
    "assumes a cloud IAM role",
    "deploys to prod with a pipeline secret",
    "SSH key trusted between hosts",
    "script runs with admin rights",
    "agent queries the customer database",
];
/* Node positions in % of the map (x, y), around the core at 50,50. */
const POS: [number, number][] = [
    [16, 28],
    [37, 11],
    [63, 11],
    [84, 28],
    [88, 57],
    [75, 82],
    [50, 91],
    [25, 82],
    [12, 57],
];

export default function EraMap({ identities, prompt }: { identities: string[]; prompt: string }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.35 });
    const once = useInView(ref, { amount: 0.35, once: true });
    const [i, setI] = useState(identities.length - 1);

    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % identities.length), 1700);
        return () => window.clearInterval(t);
    }, [seen, reduce, identities.length]);

    const n = Math.min(identities.length, POS.length);

    return (
        <div ref={ref} className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">{prompt}</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>

            {/* lg+: map */}
            <div className="relative hidden lg:block aspect-[16/7.2]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,184,219,0.12),transparent_60%)]" aria-hidden="true" />
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {POS.slice(0, n).map(([x, y], k) => (
                        <g key={k}>
                            <motion.line
                                x1={x}
                                y1={y}
                                x2={50}
                                y2={50}
                                stroke={k === i ? "#00B8DB" : "rgba(255,255,255,0.14)"}
                                strokeWidth={k === i ? 1.6 : 1}
                                vectorEffect="non-scaling-stroke"
                                strokeDasharray={k === i ? "0" : "3 4"}
                                initial={reduce ? false : { pathLength: 0 }}
                                animate={{ pathLength: once || reduce ? 1 : 0 }}
                                transition={{ duration: 0.7, delay: reduce ? 0 : 0.1 + k * 0.06, ease: [0.77, 0, 0.175, 1] }}
                            />
                        </g>
                    ))}
                </svg>
                {/* travelling request */}
                {!reduce && once && (
                    <motion.span
                        key={i}
                        className="absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-[#7FE3F2] shadow-[0_0_0_4px_rgba(0,184,219,0.25),0_0_14px_rgba(0,184,219,0.9)]"
                        initial={{ left: `${POS[i][0]}%`, top: `${POS[i][1]}%`, opacity: 0 }}
                        animate={{ left: "50%", top: "50%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
                        aria-hidden="true"
                    />
                )}

                {/* core */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%]">
                    <div className="relative rounded-2xl border border-[#00B8DB]/45 bg-[#0b0c0e] px-4 py-3.5 text-center shadow-[0_0_0_8px_rgba(0,184,219,0.06),0_0_40px_-8px_rgba(0,184,219,0.6)]">
                        <KeyRound className="mx-auto w-5 h-5 text-[#7FE3F2]" aria-hidden="true" />
                        <div className="mt-1.5 text-[0.8125rem] font-semibold text-white">Privileged core</div>
                        <div className="mt-0.5 text-[0.625rem] leading-snug text-slate-400">infrastructure · credentials · data · privileged functions</div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={i}
                                initial={reduce ? false : { opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                transition={{ duration: 0.3, delay: reduce ? 0 : 0.35 }}
                                className="mt-2.5 rounded-lg bg-[#00B8DB]/[0.1] px-2 py-1.5 text-[0.625rem] font-medium leading-snug text-[#7FE3F2]"
                                aria-hidden="true"
                            >
                                {EXAMPLES[i]}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* nodes */}
                <ul>
                    {identities.slice(0, n).map((d, k) => {
                        const Icon = ICONS[k] ?? UserRound;
                        const on = k === i;
                        const ai = k === identities.length - 1;
                        return (
                            <li key={d} className="absolute -translate-x-1/2 -translate-y-1/2 w-[19%]" style={{ left: `${POS[k][0]}%`, top: `${POS[k][1]}%` }}>
                                <motion.span
                                    initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                                    animate={{ opacity: once || reduce ? 1 : 0, scale: once || reduce ? 1 : 0.94 }}
                                    transition={{ duration: 0.4, delay: reduce ? 0 : 0.35 + k * 0.06, ease: [0.23, 1, 0.32, 1] }}
                                    className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[0.75rem] font-semibold leading-tight transition-colors duration-300 ${on ? "border-[#00B8DB]/60 bg-[#0d2a33] text-white shadow-[0_0_24px_-6px_rgba(0,184,219,0.7)]" : ai ? "border-[#00B8DB]/30 bg-[#111a1d] text-slate-200" : "border-white/[0.1] bg-[#15171a] text-slate-300"}`}
                                >
                                    <span className={`inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.06] text-[#7FE3F2]"}`}>
                                        <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0">{d}</span>
                                </motion.span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* phones: list */}
            <ul className="lg:hidden p-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {identities.map((d, k) => {
                    const Icon = ICONS[k] ?? UserRound;
                    const on = k === i;
                    return (
                        <li key={d} className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 rounded-xl border px-3 py-2 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <Icon className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                            <span className="min-w-0">
                                <span className="block text-[0.75rem] font-semibold text-white">{d}</span>
                                <span className="block truncate text-[0.625rem] text-slate-500" aria-hidden="true">{EXAMPLES[k]}</span>
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* Zero Trust, as the copy states it: verified, restricted, monitored, audited, throughout. */
export function ZeroTrustLoop() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.5 });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % 4), 1200);
        return () => window.clearInterval(t);
    }, [seen, reduce]);
    const steps = [
        { t: "Verified", d: "identity proven before access", i: UserRound },
        { t: "Restricted", d: "only what the task needs", i: KeyRound },
        { t: "Monitored", d: "activity watched as it happens", i: Eye },
        { t: "Audited", d: "every action on the record", i: ScrollText },
    ];
    return (
        <div ref={ref} className="rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6">
            <div className="flex items-center justify-between gap-3">
                <span className="text-[0.8125rem] font-semibold text-slate-800 dark:text-white">Zero Trust, throughout the lifecycle</span>
                <span className="rounded-full bg-[#00B8DB]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">no permanent trust</span>
            </div>
            <ol className="relative mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {steps.map((s, k) => {
                    const on = reduce || k === i;
                    return (
                        <li key={s.t} className={`relative min-w-0 rounded-2xl border p-3.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.07]" : "border-slate-900/[0.07] dark:border-white/[0.07]"}`}>
                            <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-[#00B8DB]/10 text-[#00667A] dark:text-[#7FE3F2]"}`}>
                                <s.i className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <div className="mt-2.5 text-[0.875rem] font-semibold text-slate-800 dark:text-white">{s.t}</div>
                            <div className="mt-0.5 text-[0.75rem] leading-snug text-slate-500">{s.d}</div>
                        </li>
                    );
                })}
            </ol>
            <div className="mt-3 h-1 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06] overflow-hidden" aria-hidden="true">
                <motion.div className="h-full w-full origin-left rounded-full bg-[#00B8DB]" initial={false} animate={{ scaleX: reduce ? 1 : (i + 1) / 4 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} />
            </div>
        </div>
    );
}
