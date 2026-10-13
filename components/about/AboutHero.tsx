"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, FileText, KeyRound, Link2, ScrollText, ShieldCheck, UserCheck, X } from "lucide-react";

/*
 * /about hero: the founding observation, told as two states.
 *   Before: the controls exist on paper, the evidence does not.
 *   OmniPriv: the record comes first; every action leaves something an
 *   auditor can follow.
 * Alternates while in view; values are illustrative.
 */

const PAPER = [
    { t: "Access policy", d: "written, approved, filed", ok: true, i: FileText },
    { t: "Privileged account", d: "granted for the incident", ok: true, i: KeyRound },
    { t: "Who used it, and for what", d: "no record anyone can vouch for", ok: false, i: UserCheck },
    { t: "Evidence for the auditor", d: "reconstructed from memory", ok: false, i: ScrollText },
];
const RECORD = [
    { t: "Request", d: "j.carter · esxi-03 · TCK-2041", i: UserCheck },
    { t: "Approval", d: "2 independent approvers", i: ShieldCheck },
    { t: "Session", d: "recorded, indexed, searchable", i: FileText },
    { t: "Credential", d: "vaulted, rotated after use", i: KeyRound },
    { t: "Audit entry", d: "hash-chained, verified", i: Link2 },
];

export default function AboutHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [after, setAfter] = useState(true);

    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setAfter((v) => !v), after ? 5200 : 3600);
        return () => window.clearInterval(t);
    }, [seen, reduce, after]);

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: before, privileged access controls exist on paper but nobody can show who used an account or produce evidence; with OmniPriv, every request, approval, session, credential and audit entry is recorded as the work happens">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Why OmniPriv exists</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {["The failure we kept seeing", "So the record came first"].map((t, k) => (
                    <span key={t} className={`rounded-lg px-2 py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === after ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="p-4 min-h-[19.5rem]" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                    {!after ? (
                        <motion.ul key="paper" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="space-y-2">
                            {PAPER.map((r, k) => (
                                <motion.li key={r.t} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: reduce ? 0 : k * 0.15, ease: [0.23, 1, 0.32, 1] }} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 ${r.ok ? "border-white/[0.08] bg-white/[0.03]" : "border-rose-400/35 bg-rose-500/[0.07]"}`}>
                                    <r.i className={`w-4 h-4 ${r.ok ? "text-slate-300" : "text-rose-300"}`} />
                                    <span className="min-w-0">
                                        <span className="block text-[0.8125rem] font-semibold text-white">{r.t}</span>
                                        <span className={`block truncate text-[0.6875rem] ${r.ok ? "text-slate-400" : "text-rose-200"}`}>{r.d}</span>
                                    </span>
                                    {r.ok ? <Check className="w-4 h-4 text-slate-400" strokeWidth={3} /> : <X className="w-4 h-4 text-rose-300" strokeWidth={3} />}
                                </motion.li>
                            ))}
                            <li className="pt-2 text-center text-[0.75rem] text-slate-500">The controls existed on paper. The evidence did not.</li>
                        </motion.ul>
                    ) : (
                        <motion.ol key="record" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="relative space-y-1.5 pl-9">
                            <span className="absolute left-[0.85rem] top-3 bottom-8 w-px bg-[#00B8DB]/40" />
                            {RECORD.map((r, k) => (
                                <motion.li key={r.t} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay: reduce ? 0 : k * 0.16, ease: [0.23, 1, 0.32, 1] }} className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] px-3.5 py-2.5">
                                    <span className="absolute -left-[2.05rem] top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-full bg-[#00B8DB] text-[#03121c]">
                                        <r.i className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-[0.8125rem] font-semibold text-white">{r.t}</span>
                                        <span className="block truncate font-mono text-[0.6875rem] text-slate-400">{r.d}</span>
                                    </span>
                                    <Check className="w-4 h-4 text-[#7FE3F2]" strokeWidth={3} />
                                </motion.li>
                            ))}
                            <li className="pt-2 text-center text-[0.75rem] text-emerald-300">Every privileged action leaves something an auditor can follow</li>
                        </motion.ol>
                    )}
                </AnimatePresence>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">On infrastructure you control</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
