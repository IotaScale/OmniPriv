"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Check, ClipboardList, Database, KeyRound, Link2, Lock, Monitor, Radar, Scale, Server, Workflow } from "lucide-react";

/*
 * /platform hero: nine modules over one shared core.
 * Each beat lights one module; its action drops into the core, where the
 * policy engine decides, the credential store answers and the audit trail
 * records, then the entry lands in the hash-linked log. Loops while in
 * view; every event is illustrative.
 */

const MODULES = [
    { t: "AI Agents", i: Bot, e: "agent-billing · tool call checked against allowlist" },
    { t: "Deployment", i: Server, e: "node-2 · health check passed" },
    { t: "Credentials", i: KeyRound, e: "oracle-fin · password rotated" },
    { t: "App Security", i: Lock, e: "j.carter · MFA verified" },
    { t: "Integration", i: Link2, e: "TCK-2041 · level 2 approved" },
    { t: "Remote Access", i: Monitor, e: "vendor.acme · SSH session brokered" },
    { t: "Workflow", i: Workflow, e: "m.alvi · JIT window granted" },
    { t: "Audit", i: ClipboardList, e: "weekly report · generated" },
    { t: "Threat", i: Radar, e: "svc-deploy · risk score normal" },
];
const CORE = [
    { t: "Policy engine", i: Scale },
    { t: "Credential store", i: Database },
    { t: "Audit trail", i: Link2 },
];
const BEAT_MS = 1600;
const hash = (n: number) => ((n * 2654435761) >>> 0).toString(16).slice(0, 6);

export default function PlatformHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [n, setN] = useState(2);
    const [core, setCore] = useState(reduce ? 3 : 0);

    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setN((v) => v + 1), BEAT_MS);
        return () => window.clearInterval(t);
    }, [seen, reduce]);

    useEffect(() => {
        if (reduce) return;
        setCore(0);
        const ts = [1, 2, 3].map((k) => window.setTimeout(() => setCore(k), 220 + k * 230));
        return () => ts.forEach(window.clearTimeout);
    }, [n, reduce]);

    const active = n % MODULES.length;
    const log = [n, n - 1, n - 2];

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: nine OmniPriv modules share one policy engine, one credential store and one audit trail; each module's action is decided, served and recorded by the same core">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">OmniPriv · nine modules, one core</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 aip-blink" /> Running
                </span>
            </div>

            {/* modules */}
            <ul className="grid grid-cols-3 gap-1.5 p-4 pb-0" aria-hidden="true">
                {MODULES.map((m, k) => {
                    const on = k === active;
                    return (
                        <li key={m.t} className={`relative flex min-w-0 flex-col sm:flex-row items-center gap-1.5 sm:gap-2 rounded-xl border px-1.5 sm:px-2.5 py-2 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className={`relative inline-flex w-6 h-6 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-slate-400"}`}>
                                <m.i className="w-3.5 h-3.5" />
                                {on && !reduce && <span className="absolute inset-0 rounded-md ring-2 ring-[#00B8DB]/60 aip-ping" />}
                            </span>
                            <span className={`max-w-full text-center sm:text-left leading-tight sm:truncate text-[0.625rem] sm:text-[0.6875rem] font-semibold transition-colors duration-300 ${on ? "text-white" : "text-slate-400"}`}>{m.t}</span>
                        </li>
                    );
                })}
            </ul>

            {/* drop into the core */}
            <div className="relative mx-auto h-6 w-px bg-white/10 overflow-hidden" aria-hidden="true">
                {!reduce && <motion.span key={n} className="absolute inset-x-0 top-0 h-1/2 bg-[#7FE3F2]" initial={{ y: "-100%" }} animate={{ y: "220%" }} transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }} />}
            </div>

            {/* shared core */}
            <div className="mx-4 rounded-2xl border border-[#00B8DB]/30 bg-[#0b0c0e] p-2.5">
                <div className="mb-2 px-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-slate-500">Shared core</div>
                <ol className="grid grid-cols-3 gap-1.5" aria-hidden="true">
                    {CORE.map((c, k) => {
                        const lit = core > k;
                        return (
                            <li key={c.t} className={`flex min-w-0 flex-col items-start gap-1.5 rounded-lg border px-2.5 py-2 transition-colors duration-200 ${lit ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.09]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <c.i className={`w-3.5 h-3.5 transition-colors duration-200 ${lit ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                                <span className={`truncate text-[0.6875rem] font-semibold transition-colors duration-200 ${lit ? "text-white" : "text-slate-400"}`}>{c.t}</span>
                            </li>
                        );
                    })}
                </ol>
            </div>

            {/* hash-linked log */}
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {log.map((r, k) => {
                    const m = MODULES[((r % 9) + 9) % 9];
                    return (
                        <motion.li
                            key={r}
                            layout={!reduce}
                            initial={reduce ? false : { opacity: 0, y: -8 }}
                            animate={{ opacity: k === 0 ? 1 : 0.6 - k * 0.15, y: 0 }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                            className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-1.5 text-[0.6875rem] ${k === 0 ? "border-white/[0.12] bg-white/[0.04]" : "border-white/[0.05]"}`}
                        >
                            <span className="font-semibold text-[#7FE3F2]">{m.t}</span>
                            <span className="truncate text-slate-300">{m.e}</span>
                            <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] text-slate-500">
                                <Check className="w-3 h-3 text-emerald-400" strokeWidth={3} />#{hash(r + 1040)}
                            </span>
                        </motion.li>
                    );
                })}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">No identity can step between modules to escape a control</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
