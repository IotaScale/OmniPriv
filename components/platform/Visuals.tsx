"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, Check, ClipboardList, Database, KeyRound, Link2, Lock, Monitor, Scale, Server, Smartphone, Terminal, Workflow } from "lucide-react";

/* Illustrations for /platform. Values are illustrative. */

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
    return { ref, i: reduce ? 0 : i, reduce: !!reduce, seen };
}

/* Architecture: the layers one appliance carries, on infrastructure you own,
 * with tenants kept apart by org_id. A pulse walks down the stack. */
const LAYERS = [
    { t: "Nine capability modules", s: "credentials · sessions · workflow · audit · threat · more", i: ClipboardList },
    { t: "One policy engine", s: "every request decided in one place", i: Scale },
    { t: "One credential store", s: "encrypted at rest and in transit", i: Database },
    { t: "One audit trail", s: "tamper-proof, hash-chained", i: Link2 },
    { t: "Software appliance", s: "clustered, health-checked, replicated", i: Server },
];
export function CoreStack() {
    const { ref, i } = useLoop(LAYERS.length + 1, 900);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: nine modules sit on one policy engine, one credential store and one audit trail inside a single software appliance, deployed on your own infrastructure, with tenants isolated by org_id">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Server className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Architecture · one appliance</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ol className="p-4 space-y-1.5">
                {LAYERS.map((l, k) => {
                    const on = k === i;
                    return (
                        <li key={l.t} className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.09]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-[#7FE3F2]"}`}>
                                <l.i className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[0.8125rem] font-semibold text-white truncate">{l.t}</span>
                                <span className="block text-[0.6875rem] text-slate-400 truncate">{l.s}</span>
                            </span>
                        </li>
                    );
                })}
            </ol>
            <div className="px-4">
                <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                    {["VMware", "Red Hat", "OpenStack"].map((p) => (
                        <span key={p} className={`rounded-lg border py-1.5 text-center text-[0.6875rem] font-semibold transition-colors duration-300 ${i === LAYERS.length ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08] text-[#7FE3F2]" : "border-white/[0.07] text-slate-400"}`}>
                            {p}
                        </span>
                    ))}
                </div>
                <div className="mt-1.5 text-center text-[0.625rem] text-slate-500">your infrastructure, your hardware</div>
            </div>
            <div className="m-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2" aria-hidden="true">
                {["subsidiary-a", "subsidiary-b"].map((t, k) => (
                    <span key={t} className={`flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3 py-2 text-[0.6875rem] ${k === 1 ? "col-start-3" : ""}`}>
                        <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span className="min-w-0">
                            <span className="block text-slate-500">org_id · own RBAC</span>
                            <span className="block truncate font-mono text-slate-200">{t}</span>
                        </span>
                    </span>
                ))}
                <span className="col-start-2 row-start-1 inline-flex w-7 h-7 items-center justify-center rounded-full border border-[#00B8DB]/40 text-[#7FE3F2]">
                    <Lock className="w-3.5 h-3.5" />
                </span>
            </div>
        </div>
    );
}

/* One console: the same window for vaulting, sessions, approvals and reports,
 * a CLI underneath and approvals on a phone browser. */
const TABS = [
    {
        t: "Vault",
        i: KeyRound,
        rows: [
            ["oracle-fin / sys", "rotated 2 h ago"],
            ["linux-prod-01 / root", "checked out · TCK-2041"],
            ["esxi-03 / admin", "rotated today"],
        ],
    },
    {
        t: "Sessions",
        i: Monitor,
        rows: [
            ["vendor.acme · RDP", "recording"],
            ["j.carter · SSH", "recording"],
            ["svc-etl · DB proxy", "closed"],
        ],
    },
    {
        t: "Approvals",
        i: Workflow,
        rows: [
            ["TCK-2041 · Asset Permission", "level 2 pending"],
            ["TCK-2038 · Login Confirm", "approved"],
            ["TCK-2035 · Command Confirm", "rejected"],
        ],
    },
    {
        t: "Reports",
        i: ClipboardList,
        rows: [
            ["Privileged access review", "scheduled · Monday"],
            ["SOC 2 evidence pack", "ready"],
            ["Entitlement changes", "ready"],
        ],
    },
];
export function ConsoleMock() {
    const { ref, i, reduce } = useLoop(TABS.length, 2000);
    const tab = TABS[i];
    return (
        <div ref={ref} className="relative" role="img" aria-label="Illustration: one web console covers the vault, sessions, approvals and reports over a single credential repository, with a command-line interface and a mobile browser client for TOTP and approvals">
            <div className="aip-console overflow-hidden">
                <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">OmniPriv console</span>
                    <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
                </div>
                <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] min-h-[13.5rem]">
                    <ul className="border-r border-white/[0.06] p-2 space-y-1" aria-hidden="true">
                        {TABS.map((x, k) => (
                            <li key={x.t} className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.75rem] font-semibold transition-colors duration-300 ${k === i ? "bg-[#00B8DB]/[0.14] text-white" : "text-slate-500"}`}>
                                <x.i className="w-3.5 h-3.5 shrink-0" /> {x.t}
                            </li>
                        ))}
                        <li className="pt-3 px-2.5 text-[0.625rem] text-slate-600">one repository</li>
                    </ul>
                    <div className="min-w-0 p-3">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.ul
                                key={tab.t}
                                initial={reduce ? false : { opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                                transition={{ duration: 0.3, ease }}
                                className="space-y-1.5"
                                aria-hidden="true"
                            >
                                {tab.rows.map(([a, b]) => (
                                    <li key={a} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[0.75rem]">
                                        <span className="truncate font-mono text-slate-200">{a}</span>
                                        <span className={`text-[0.6875rem] ${/pending|recording/.test(b) ? "text-amber-300" : /rejected/.test(b) ? "text-rose-300" : "text-slate-400"}`}>{b}</span>
                                    </li>
                                ))}
                            </motion.ul>
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/[0.08] bg-[#0b0c0e] px-4 py-2.5 font-mono text-[0.6875rem] text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-[#7FE3F2]" aria-hidden="true" />
                    <span className="text-[#7FE3F2]">$</span>
                    <span className="truncate">same controls from the CLI</span>
                    <span className="aip-caret ml-0.5" />
                </div>
            </div>
            {/* phone */}
            <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-16 sm:-right-4 lg:-right-8 sm:w-[12.5rem] rounded-[1.4rem] border border-slate-900/10 dark:border-white/10 bg-white dark:bg-[#15171a] p-3 shadow-[0_24px_50px_-24px_rgba(10,22,40,0.55)]" aria-hidden="true">
                <div className="flex items-center gap-1.5 text-[0.625rem] text-slate-500">
                    <Smartphone className="w-3 h-3" /> mobile browser client
                </div>
                <div className="mt-2 text-[0.75rem] font-semibold text-slate-800 dark:text-white">Approve TCK-2041?</div>
                <div className="text-[0.6875rem] text-slate-500">oracle-fin · 60 min</div>
                <div className="mt-2 flex items-center justify-between rounded-lg bg-slate-100 dark:bg-white/[0.05] px-2.5 py-1.5 font-mono text-[0.75rem] tracking-[0.2em] text-slate-700 dark:text-slate-200">
                    482 913 <span className="font-sans text-[0.5625rem] tracking-normal text-slate-500">TOTP</span>
                </div>
                <div className={`mt-2 flex items-center justify-center gap-1 rounded-lg py-1.5 text-[0.6875rem] font-semibold transition-colors duration-300 ${i === 2 ? "bg-[#00B8DB] text-[#03121c]" : "bg-[#00B8DB]/15 text-[#00667A] dark:text-[#7FE3F2]"}`}>
                    <Check className="w-3.5 h-3.5" strokeWidth={3} /> Approve
                </div>
            </div>
        </div>
    );
}
