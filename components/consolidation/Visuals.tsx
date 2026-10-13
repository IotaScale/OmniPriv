"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    BarChart3,
    Check,
    Cloud,
    FileSpreadsheet,
    KeyRound,
    Layers,
    Monitor,
    Radar,
    Server,
    ShieldCheck,
    UserCheck,
    X,
} from "lucide-react";

/*
 * Illustrations for /platform/consolidation.
 * Identities, answers, counts and node names are illustrative.
 */

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
    return { ref, i: reduce ? steps - 1 : i, reduce: !!reduce };
}

/* ─── Hero: five consoles give five answers; one platform gives one ─── */
const TOOLS = [
    { t: "Credential vault", a: "yes", i: KeyRound },
    { t: "Session recorder", a: "no record", i: Monitor },
    { t: "Workflow tool", a: "expired", i: UserCheck },
    { t: "Reporting add-on", a: "last sync 9d", i: BarChart3 },
    { t: "Spreadsheet", a: "?", i: FileSpreadsheet },
];
export function ConsolidationHero() {
    const { ref, i, reduce } = useLoop(TOOLS.length + 5, 700, 0.3);
    const asked = reduce ? TOOLS.length : Math.min(i, TOOLS.length);
    const one = reduce || i >= TOOLS.length + 1;
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: asked whether j.carter still has access to esxi-03, a credential vault, a session recorder, a workflow tool, a reporting add-on and a spreadsheet each give a different answer; consolidated into OmniPriv, one policy engine gives one answer with the grant, its expiry and the session recording">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Does j.carter still have access to esxi-03?</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {["Five consoles", "One platform"].map((t, k) => (
                    <span key={t} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === one ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>

            <div className="grid p-4" aria-hidden="true">
                <ul className={`[grid-area:1/1] space-y-1.5 transition-opacity duration-300 ${one ? "invisible opacity-0" : "visible opacity-100"}`}>
                    {TOOLS.map((x, k) => {
                        const on = k < asked;
                        return (
                            <li key={x.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-dashed px-3 py-2.5 transition-colors duration-300 ${on ? "border-amber-400/35 bg-amber-400/[0.05]" : "border-white/[0.08]"}`}>
                                <span className="inline-flex w-8 h-8 items-center justify-center rounded-lg bg-white/[0.05] text-slate-400">
                                    <x.i className="w-4 h-4" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-[0.8125rem] font-semibold text-slate-200">{x.t}</span>
                                    <span className="block truncate text-[0.625rem] text-slate-500">its own console, its own copy</span>
                                </span>
                                <span className={`shrink-0 rounded-md px-2 py-1 font-mono text-[0.6875rem] transition-opacity duration-200 ${on ? "opacity-100 bg-amber-400/[0.12] text-amber-200" : "opacity-0"}`}>{x.a}</span>
                            </li>
                        );
                    })}
                </ul>

                <div className={`[grid-area:1/1] flex flex-col justify-center transition-opacity duration-300 ${one ? "visible opacity-100" : "invisible opacity-0"}`}>
                    <div className="rounded-2xl border border-[#00B8DB]/40 bg-[#00B8DB]/[0.05] p-4">
                        <div className="flex items-center gap-2.5">
                            <span className="inline-flex w-9 h-9 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                                <Layers className="w-[1.125rem] h-[1.125rem]" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[0.8125rem] font-semibold text-white">OmniPriv · one policy engine</span>
                                <span className="block truncate text-[0.625rem] text-slate-400">one credential store · one audit trail</span>
                            </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-400/[0.08] px-3.5 py-3 text-[0.875rem] font-semibold text-emerald-300">
                            <Check className="w-4 h-4 shrink-0" strokeWidth={3} /> No. Grant expired at 14:38.
                        </div>
                        <ul className="mt-3 space-y-1.5">
                            {["JIT grant · 14:02 to 14:38 · approved by s.noor", "Credential rotated after the session", "Session recorded · 18 commands"].map((r, k) => (
                                <motion.li key={r} initial={false} animate={{ opacity: one ? 1 : 0, y: one ? 0 : 4 }} transition={{ duration: 0.3, delay: one && !reduce ? 0.15 + k * 0.1 : 0, ease }} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[0.6875rem] text-slate-300">
                                    <Check className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} />
                                    <span className="truncate">{r}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">{one ? "One answer, once" : "Five answers to reconcile"}</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Fewer tools: what there is to run, before and after ─── */
const LOAD = [
    { t: "Consoles to log in to", a: 5 },
    { t: "Policy engines to keep in step", a: 5 },
    { t: "Integrations to maintain", a: 8 },
    { t: "Upgrades to plan each cycle", a: 5 },
    { t: "Places an identity can hide", a: 5 },
];
export function RunLoad() {
    const { ref, i, reduce } = useLoop(2, 3000, 0.4);
    const after = reduce || i === 1;
    const max = 8;
    return (
        <div ref={ref} className="aip-card rounded-3xl border p-5 sm:p-6" role="img" aria-label="Illustration: before consolidation there are five consoles, five policy engines, eight integrations, five upgrade plans and five places an identity can hide; after, one of each">
            <div className="grid grid-cols-2 gap-1.5" aria-hidden="true">
                {["Point tools", "One platform"].map((t, k) => (
                    <span key={t} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === after ? "bg-[#00B8DB]/[0.12] text-[#00667A] dark:text-white ring-1 ring-[#00B8DB]/40" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <ul className="mt-5 space-y-4" aria-hidden="true">
                {LOAD.map((l) => {
                    const v = after ? 1 : l.a;
                    return (
                        <li key={l.t}>
                            <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
                                <span className="text-slate-700 dark:text-slate-300">{l.t}</span>
                                <span className={`tabular-nums font-semibold ${after ? "text-[#00667A] dark:text-[#7FE3F2]" : "text-amber-700 dark:text-amber-300"}`}>{v}</span>
                            </div>
                            <div className="mt-1.5 h-2 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06]">
                                <motion.span className={`block h-full origin-left rounded-full ${after ? "bg-[#00B8DB]" : "bg-amber-400/80"}`} initial={false} animate={{ width: `${(v / max) * 100}%` }} transition={{ duration: reduce ? 0 : 0.6, ease }} />
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className="mt-5 flex items-center justify-between gap-3 text-[0.6875rem] text-slate-400">
                <span>Typical point-tool estate</span>
                <span className="font-mono">illustrative</span>
            </div>
        </div>
    );
}

/* ─── What you retire: each point tool, and the module that takes over its job ─── */
const MAP = [
    { from: "Standalone vault", to: "Credential Management", i: KeyRound },
    { from: "Session recorder", to: "Secure Remote Access", i: Monitor },
    { from: "Reporting tool", to: "Audit & Compliance", i: BarChart3 },
    { from: "Email & spreadsheet approvals", to: "Workflow & Access Control", i: UserCheck },
    { from: "Analytics licence", to: "AI Threat Protection", i: Radar },
];
export function RetireMap() {
    const { ref, i, reduce } = useLoop(MAP.length + 2, 900, 0.4);
    const n = reduce ? MAP.length : Math.min(i + 1, MAP.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: the standalone vault is retired into Credential Management, the session recorder into Secure Remote Access, the reporting tool into Audit and Compliance, email and spreadsheet approvals into Workflow and Access Control, and the analytics licence into AI Threat Protection">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Layers className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">retirement plan</span>
                <span className="ml-auto text-[0.6875rem] font-semibold tabular-nums text-[#7FE3F2] shrink-0">
                    {n} of {MAP.length} retired
                </span>
            </div>
            <ul className="p-4 space-y-2" aria-hidden="true">
                {MAP.map((m, k) => {
                    const on = k < n;
                    return (
                        <li key={m.from} className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                            <span className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.6875rem] transition-colors duration-300 ${on ? "border-white/[0.05] text-slate-500" : "border-dashed border-amber-400/35 bg-amber-400/[0.05] text-amber-100"}`}>
                                {on ? <X className="w-3.5 h-3.5 shrink-0 text-slate-600" /> : <m.i className="w-3.5 h-3.5 shrink-0 text-amber-300" />}
                                <span className={`truncate ${on ? "line-through decoration-slate-600" : ""}`}>{m.from}</span>
                            </span>
                            <ArrowRight className={`w-3.5 h-3.5 transition-colors duration-300 ${on ? "text-[#7FE3F2]" : "text-slate-700"}`} />
                            <motion.span initial={false} animate={{ opacity: on ? 1 : 0.25 }} transition={{ duration: 0.3, ease }} className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.6875rem] font-semibold ${on ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.08] text-white" : "border-white/[0.06] text-slate-500"}`}>
                                <m.i className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" />
                                <span className="truncate">{m.to}</span>
                            </motion.span>
                        </li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${n === MAP.length ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <ShieldCheck className="w-4 h-4 shrink-0" /> Same jobs, one policy engine, one audit trail
            </div>
        </div>
    );
}

/* ─── Ownership: the same platform in three topologies, wherever you run it ─── */
const TOPO = [
    { t: "Standalone", nodes: [{ n: "op-01", r: "active" }] },
    { t: "Active-standby", nodes: [{ n: "op-01", r: "active" }, { n: "op-02", r: "standby" }] },
    { t: "HA cluster", nodes: [{ n: "op-01", r: "active" }, { n: "op-02", r: "active" }, { n: "op-03", r: "active" }] },
];
const WHERE = [
    { t: "On-premises", i: Server },
    { t: "Private cloud", i: Cloud },
    { t: "Public cloud", i: Cloud },
];
export function TopologyVisual() {
    const { ref, i } = useLoop(TOPO.length, 2200, 0.4);
    const topo = TOPO[i];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: OmniPriv runs on your own infrastructure, on-premises, in private cloud or public cloud, as a standalone node, an active-standby pair or a high-availability cluster with database replication">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Server className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">your infrastructure · your topology</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 px-4 pt-4" aria-hidden="true">
                {TOPO.map((x, k) => (
                    <span key={x.t} className={`truncate rounded-lg py-1.5 text-center text-[0.6875rem] font-semibold transition-colors duration-300 ${k === i ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {x.t}
                    </span>
                ))}
            </div>
            <div className="px-4 pt-4" aria-hidden="true">
                <div className="flex h-36 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3">
                    {topo.nodes.map((nd, k) => (
                        <motion.div key={`${topo.t}-${nd.n}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: k * 0.08, ease }} className="flex items-center gap-3">
                            {k > 0 && <span className="h-px w-4 sm:w-8 bg-[#00B8DB]/40" />}
                            <div className={`flex w-20 sm:w-24 flex-col items-center gap-1.5 rounded-xl border px-2 py-3 ${nd.r === "standby" ? "border-dashed border-white/[0.15] text-slate-400" : "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08] text-white"}`}>
                                <Layers className={`w-5 h-5 ${nd.r === "standby" ? "text-slate-500" : "text-[#7FE3F2]"}`} />
                                <span className="font-mono text-[0.6875rem]">{nd.n}</span>
                                <span className="text-[0.5625rem] uppercase tracking-[0.08em] text-slate-500">{nd.r}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-2 flex h-5 items-center justify-center text-[0.625rem] text-slate-500">{topo.nodes.length > 1 ? "database replicated between nodes" : "single node, simplest to run"}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4" aria-hidden="true">
                {WHERE.map((w) => (
                    <span key={w.t} className="flex min-w-0 items-center justify-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.02] px-2 py-2 text-[0.6875rem] font-semibold text-slate-300">
                        <w.i className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" />
                        <span className="truncate">{w.t}</span>
                    </span>
                ))}
            </div>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.07] px-3.5 py-2.5 text-[0.75rem] text-slate-400">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#7FE3F2]" /> Not a service you reach over the internet
            </div>
        </div>
    );
}
