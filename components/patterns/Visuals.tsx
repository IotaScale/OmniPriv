"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Clock, Eye, FileText, KeyRound, Layers, Link2, Mail, MessagesSquare, Monitor, Network, RefreshCw, ScrollText, ShieldCheck, Ticket, UserCheck } from "lucide-react";

/* Illustrations for /case-studies (problem patterns). Findings are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;

function useLoop(steps: number, ms: number, amount = 0.35) {
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

/* Hero: a review of one estate turns up each pattern, and names the module that resolves it. */
const FINDINGS = [
    { p: "The stack nobody chose", f: "4 consoles each keep their own copy of who can do what", m: "Consolidation", i: Layers },
    { p: "Privilege that never expires", f: "incident access granted in 2024, still active", m: "Workflow & Access Control", i: Clock },
    { p: "Credentials hiding in plain sight", f: "database password in web.config since install", m: "Credential Management", i: KeyRound },
    { p: "Logs you cannot vouch for", f: "audit table editable by a database admin", m: "Audit & Compliance", i: ShieldCheck },
    { p: "Sessions nobody can inspect", f: "prod change made over SSH, no recording", m: "Secure Remote Access", i: Eye },
    { p: "Standing keys for third parties", f: "CI/CD token, 380 days old, never rotated", m: "Enterprise Integration", i: Network },
];
export function PatternsHero() {
    const { ref, i, reduce } = useLoop(FINDINGS.length + 2, 1300, 0.3);
    const found = reduce ? FINDINGS.length : Math.min(i + 1, FINDINGS.length);
    const cur = Math.min(i, FINDINGS.length - 1);
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a privileged access review of one estate turns up all six patterns, from tooling sprawl to long-lived third-party keys, and names the capability module that resolves each">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Privileged access review · one estate</span>
                <span className="ml-auto text-[0.6875rem] font-semibold tabular-nums text-amber-300 shrink-0">{found} of 6 patterns</span>
            </div>
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {FINDINGS.map((x, k) => {
                    const on = k < found;
                    const now = k === cur && !reduce && i < FINDINGS.length;
                    return (
                        <li key={x.p} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${now ? "border-amber-400/45 bg-amber-400/[0.07]" : on ? "border-white/[0.08] bg-white/[0.03]" : "border-white/[0.05] bg-transparent"}`}>
                            <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-amber-400/15 text-amber-200" : "bg-white/[0.04] text-slate-600"}`}>
                                <x.i className="w-4 h-4" />
                            </span>
                            <span className="min-w-0">
                                <span className={`block truncate text-[0.8125rem] font-semibold ${on ? "text-white" : "text-slate-600"}`}>{x.p}</span>
                                <motion.span initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }} className="mt-0.5 flex min-w-0 items-center gap-1.5 text-[0.6875rem]">
                                    <span className="truncate text-slate-400">{x.f}</span>
                                    <ArrowRight className="w-3 h-3 shrink-0 text-slate-600" />
                                    <span className="shrink-0 font-semibold text-[#7FE3F2]">{x.m}</span>
                                </motion.span>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Six situations, one platform to resolve them</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* The review: reconstruction from scattered sources, versus reading out one record. */
export function ReviewVisual() {
    const { ref, i, reduce } = useLoop(2, 3200, 0.4);
    const after = reduce || i === 1;
    const sources = [
        { t: "Server logs", i: FileText },
        { t: "Ticket history", i: Ticket },
        { t: "Email threads", i: Mail },
        { t: "Chat messages", i: MessagesSquare },
        { t: "Someone's memory", i: UserCheck },
    ];
    const rows = ["Who: j.carter · MFA verified", "What: esxi-03 · 18 commands, recorded", "Approved: s.noor + d.okafor", "When: 14:02 to 14:38, in window", "Record: hash-chained, verified"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: before, an access review is reconstructed from logs, tickets, emails, chat and memory; after, the platform produces one record that is simply read out">
            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {["Reconstructed", "Read out"].map((t, k) => (
                    <span key={t} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === after ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="p-4 min-h-[18rem]">
                <AnimatePresence mode="wait" initial={false}>
                    {!after ? (
                        <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="space-y-1.5">
                            {sources.map((s, k) => (
                                <motion.div key={s.t} initial={reduce ? false : { opacity: 0, x: k % 2 ? 10 : -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: k * 0.08, ease }} className="flex items-center gap-3 rounded-xl border border-dashed border-amber-400/30 bg-amber-400/[0.04] px-3.5 py-2.5 text-[0.8125rem] text-amber-100" style={{ marginLeft: `${(k % 3) * 6}%`, marginRight: `${((k + 1) % 3) * 6}%` }}>
                                    <s.i className="w-4 h-4 shrink-0 text-amber-300" aria-hidden="true" />
                                    {s.t}
                                    <span className="ml-auto text-[0.6875rem] text-amber-300/70">?</span>
                                </motion.div>
                            ))}
                            <div className="pt-2 text-center text-[0.75rem] text-slate-500">Assembled by hand, then defended in the meeting</div>
                        </motion.div>
                    ) : (
                        <motion.div key="after" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                            <div className="rounded-2xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.05] p-4">
                                <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                                    <ScrollText className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" /> Privileged access record · Q3 review
                                </div>
                                <ul className="mt-3 space-y-1.5">
                                    {rows.map((r, k) => (
                                        <motion.li key={r} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: k * 0.09, ease }} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2 text-[0.75rem] text-slate-200">
                                            <Check className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />
                                            <span className="truncate">{r}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                            <div className="pt-3 text-center text-[0.75rem] text-emerald-300">Produced as a side effect of doing the work</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

/* What the platform emits: the four artefacts an audit asks for, as one evidence bundle. */
const ARTEFACTS = [
    { t: "Session recording", d: "SSH · linux-prod-01 · 36 min · indexed", i: Monitor },
    { t: "Approval trail", d: "2 independent approvers · requester excluded", i: UserCheck },
    { t: "Audit record", d: "#104 233 · prev a91f02 · chain verified", i: Link2 },
    { t: "Rotation event", d: "IIS App Pool secret · rotated, no downtime", i: RefreshCw },
];
export function EvidenceBundle() {
    const { ref, i, reduce } = useLoop(ARTEFACTS.length + 2, 900, 0.4);
    const shown = reduce ? ARTEFACTS.length : Math.min(i + 1, ARTEFACTS.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: one privileged change produces four artefacts: a session recording, an approval trail with two approvers, a hash-chained audit record and a credential rotation event">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Evidence for change CHG-2041</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-2 min-h-[17rem]">
                {ARTEFACTS.map((a, k) => {
                    const on = k < shown;
                    return (
                        <motion.li
                            key={a.t}
                            initial={false}
                            animate={{ opacity: on ? 1 : 0.25, x: on ? 0 : -4 }}
                            transition={{ duration: 0.35, ease }}
                            className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 ${on ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.05]" : "border-white/[0.06]"}`}
                        >
                            <span className="inline-flex w-9 h-9 items-center justify-center rounded-lg bg-white/[0.05] text-[#7FE3F2]">
                                <a.i className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[0.8125rem] font-semibold text-white">{a.t}</span>
                                <span className="block truncate font-mono text-[0.6875rem] text-slate-400">{a.d}</span>
                            </span>
                            {on && <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} aria-hidden="true" />}
                        </motion.li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${shown >= ARTEFACTS.length ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <Check className="w-4 h-4 shrink-0" strokeWidth={3} aria-hidden="true" /> The same artefacts an audit asks for
            </div>
        </div>
    );
}
