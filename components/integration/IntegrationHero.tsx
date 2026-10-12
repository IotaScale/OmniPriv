"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, FileSearch, Globe, KeyRound, Lock, Monitor, Network, UserCheck } from "lucide-react";

/*
 * Enterprise integration hero: one privileged request travelling through the
 * systems a customer already runs.
 *   request → ticket raised automatically → two approval levels →
 *   directory entitlement check → credential released over a proxy →
 *   event forwarded to the SIEM.
 * Loops while in view; names, ids and hosts are illustrative.
 */

const SYSTEMS = [
    { k: "ticket", t: "Ticketing", s: "6 request types", i: FileSearch },
    { k: "dir", t: "LDAP / Active Directory", s: "bidirectional sync", i: Globe },
    { k: "idm", t: "Identity Management", s: "lifecycle", i: UserCheck },
    { k: "proxy", t: "RDP · SSH · VNC · HTTP", s: "protocol proxies", i: Monitor },
    { k: "siem", t: "SIEM", s: "real-time events", i: Network },
] as const;

const STEPS: { sys: (typeof SYSTEMS)[number]["k"] | null; line: string; note: string }[] = [
    { sys: null, line: "j.carter requests the password for oracle-fin", note: "Credential withheld" },
    { sys: "ticket", line: "Ticket TCK-2041 raised automatically · Asset Permission", note: "Credential withheld" },
    { sys: "ticket", line: "Level 1 approved · s.noor", note: "Credential withheld" },
    { sys: "ticket", line: "Level 2 approved · d.okafor", note: "Credential withheld" },
    { sys: "dir", line: "Entitlement confirmed · AD group DBA-Prod", note: "Ticket status checked" },
    { sys: "proxy", line: "Released over SSH proxy · credential stays server-side", note: "Released" },
    { sys: "siem", line: "Event forwarded to SIEM", note: "Released" },
];
const STEP_MS = 1250;

export default function IntegrationHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [step, setStep] = useState(reduce ? STEPS.length - 1 : 2);

    useEffect(() => {
        if (reduce || !seen) return;
        const hold = step === STEPS.length - 1 ? STEP_MS * 2.6 : STEP_MS;
        const t = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), hold);
        return () => window.clearTimeout(t);
    }, [step, seen, reduce]);

    const cur = STEPS[step];
    const released = step >= 5;
    const lit = new Set(STEPS.slice(0, step + 1).map((s) => s.sys));

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a privileged password request raises a ticket automatically, passes two approval levels and a directory entitlement check, is released over a protocol proxy and is forwarded to the SIEM">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">One request · the systems you already run</span>
            </div>

            <div className="grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 p-4">
                {/* connected systems */}
                <ul className="space-y-1.5" aria-hidden="true">
                    {SYSTEMS.map((s) => {
                        const active = cur.sys === s.k;
                        const passed = lit.has(s.k) && !active;
                        return (
                            <li key={s.k} className={`relative flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-colors duration-300 ${active ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                                <span className={`relative inline-flex w-7 h-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${active ? "bg-[#00B8DB] text-[#03121c]" : passed ? "bg-[#00B8DB]/15 text-[#7FE3F2]" : "bg-white/[0.05] text-slate-400"}`}>
                                    <s.i className="w-3.5 h-3.5" />
                                    {active && !reduce && <span className="absolute inset-0 rounded-lg ring-2 ring-[#00B8DB]/60 aip-ping" />}
                                </span>
                                <span className="min-w-0">
                                    <span className={`block text-[0.75rem] font-semibold truncate ${active || passed ? "text-white" : "text-slate-300"}`}>{s.t}</span>
                                    <span className="block text-[0.625rem] text-slate-500 truncate">{s.s}</span>
                                </span>
                                {passed && <Check className="ml-auto w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} />}
                            </li>
                        );
                    })}
                </ul>

                {/* activity log */}
                <div className="min-w-0 flex flex-col rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-3">
                    <div className="text-[0.6875rem] text-slate-500 mb-2">Request log</div>
                    <ol className="space-y-1 flex-1" aria-hidden="true">
                        {STEPS.slice(0, step + 1)
                            .slice(-5)
                            .map((s, k, arr) => {
                                const last = k === arr.length - 1;
                                return (
                                    <motion.li
                                        key={s.line}
                                        initial={reduce ? false : { opacity: 0, x: -6 }}
                                        animate={{ opacity: last ? 1 : 0.6, x: 0 }}
                                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                        className="flex items-start gap-2 text-[0.6875rem] leading-snug"
                                    >
                                        <Check className={`w-3 h-3 mt-0.5 shrink-0 ${last ? "text-[#7FE3F2]" : "text-slate-600"}`} strokeWidth={3} />
                                        <span className={last ? "text-white" : "text-slate-400"}>{s.line}</span>
                                    </motion.li>
                                );
                            })}
                    </ol>
                </div>
            </div>

            {/* credential state */}
            <div className="mx-4 mb-4 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3">
                <span className={`inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${released ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/10 text-amber-300"}`}>
                    {released ? <KeyRound className="w-4 h-4" aria-hidden="true" /> : <Lock className="w-4 h-4" aria-hidden="true" />}
                </span>
                <span className="min-w-0">
                    <span className="block text-[0.75rem] font-mono text-slate-400 truncate">oracle-fin / sys</span>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={cur.note}
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className={`block text-[0.8125rem] font-semibold ${released ? "text-emerald-300" : "text-amber-200"}`}
                        >
                            {cur.note}
                        </motion.span>
                    </AnimatePresence>
                </span>
                <span className="ml-auto flex gap-1 shrink-0" aria-hidden="true">
                    {STEPS.map((_, k) => (
                        <span key={k} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${k <= step ? "bg-[#00B8DB]" : "bg-white/15"}`} />
                    ))}
                </span>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Connected, not copied</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
