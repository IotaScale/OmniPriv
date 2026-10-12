"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Check, Clock, Cloud, Database, FileText, Search, Server, ShieldCheck, Users, X } from "lucide-react";

/* Illustrations for /privileged-access-audit-compliance. Values are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;

/* Hook: a counter that advances while the element is in view. */
function useLoop(steps: number, ms: number, amount = 0.45) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % steps), ms);
        return () => window.clearInterval(t);
    }, [seen, reduce, steps, ms]);
    return { ref, i: reduce ? steps - 1 : i, reduce: !!reduce, seen };
}

/* Scattered sources converge into one record. */
export function SourcesVisual() {
    const { ref, i } = useLoop(4, 1400);
    const sources = [
        { t: "Servers", i: Server },
        { t: "Databases", i: Database },
        { t: "Cloud platforms", i: Cloud },
        { t: "Third-party access", i: Users },
    ];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: privileged activity from servers, databases, cloud platforms and third-party access is brought into one audit record">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Privileged activity · one view</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-4 grid grid-cols-[minmax(0,1fr)_2.5rem_minmax(0,0.9fr)] items-center gap-0">
                <ul className="space-y-2">
                    {sources.map((s, k) => (
                        <li key={s.t} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[0.75rem] transition-colors duration-300 ${k === i ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08] text-white" : "border-white/[0.07] bg-white/[0.02] text-slate-300"}`}>
                            <s.i className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" aria-hidden="true" />
                            <span className="truncate">{s.t}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col justify-around h-full py-3" aria-hidden="true">
                    {sources.map((s, k) => (
                        <span key={s.t} className="relative block h-px bg-white/15 overflow-hidden">
                            {k === i && <motion.span className="absolute inset-y-0 left-0 w-1/2 bg-[#7FE3F2]" initial={{ x: "-100%" }} animate={{ x: "200%" }} transition={{ duration: 0.9, ease }} />}
                        </span>
                    ))}
                </div>
                <div className="rounded-2xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.06] p-3.5">
                    <ShieldCheck className="w-5 h-5 text-[#7FE3F2]" aria-hidden="true" />
                    <div className="mt-2 text-[0.8125rem] font-semibold text-white">One audit record</div>
                    <ul className="mt-2 space-y-1 text-[0.6875rem] text-slate-400">
                        <li>access controls</li>
                        <li>activity records</li>
                        <li>audit reporting</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

/* Session replay: commands play back, a search hit lights up, the flagged step can be stopped. */
const LINES = [
    { c: "ssh admin@linux-prod-01", f: false },
    { c: "sudo systemctl status nginx", f: false },
    { c: "cat /etc/nginx/nginx.conf", f: false },
    { c: "sudo vi /etc/sudoers", f: true },
    { c: "exit", f: false },
];
export function SessionPlayer() {
    const { ref, i, reduce } = useLoop(LINES.length + 2, 1200);
    const shown = Math.min(i + 2, LINES.length);
    const flagged = shown >= 4;
    const stopped = i >= LINES.length - 1;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a recorded privileged session replays command by command; a risky command is flagged and the session can be terminated">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                </span>
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">j.carter · linux-prod-01 · SSH</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="px-4 pt-4">
                <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-[#0b0c0e] px-3 py-2 text-[0.75rem]">
                    <Search className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-slate-300">sudo</span>
                    <span className="ml-auto text-[0.6875rem] text-slate-500 shrink-0">2 matches in history</span>
                </div>
            </div>
            <ol className="p-4 space-y-1 font-mono text-[0.75rem]">
                {LINES.slice(0, shown).map((l, k) => {
                    const hit = l.c.includes("sudo");
                    return (
                        <motion.li
                            key={l.c}
                            initial={reduce ? false : { opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className={`flex items-center gap-2 rounded-md px-2 py-1 ${l.f && flagged ? "bg-amber-400/[0.1] ring-1 ring-amber-400/40" : hit ? "bg-[#00B8DB]/[0.07]" : ""}`}
                        >
                            <span className="text-slate-600 w-4 shrink-0 text-right">{k + 1}</span>
                            <span className="text-[#7FE3F2] shrink-0">$</span>
                            <span className="text-slate-200 truncate">{l.c}</span>
                            {l.f && flagged && <span className="ml-auto shrink-0 font-sans text-[0.625rem] font-semibold text-amber-300">policy violation</span>}
                        </motion.li>
                    );
                })}
            </ol>
            {/* scrubber */}
            <div className="px-4 pb-4">
                <div className="relative h-1.5 rounded-full bg-white/[0.07]">
                    <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[#00B8DB]" initial={false} animate={{ scaleX: shown / LINES.length }} transition={{ duration: reduce ? 0 : 0.4, ease }} />
                    <span className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-[#15171a]" style={{ left: "70%" }} />
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[0.6875rem] text-slate-400">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" /> 14:02 · 4 min 12 s
                    </span>
                    <span className={`ml-auto inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.6875rem] font-semibold transition-colors duration-300 ${stopped ? "border-rose-400/40 bg-rose-500/[0.12] text-rose-200" : "border-white/[0.08] text-slate-400"}`}>
                        <X className="w-3.5 h-3.5" aria-hidden="true" /> {stopped ? "Session terminated" : "Terminate session"}
                    </span>
                </div>
            </div>
        </div>
    );
}

/* Just-in-Time grant: requested, approved, used inside a window, then gone. */
export function GrantTimeline() {
    const { ref, i, reduce } = useLoop(7, 1300);
    const steps = ["Requested", "Approved", "Granted", "Expired"];
    const at = i <= 1 ? i : i <= 4 ? 2 : 3;
    const left = [120, 120, 120, 80, 40, 0, 0][i];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: privileged access is requested, approved, granted for a defined task and duration, and removed automatically when the window ends">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Access request · m.alvi → oracle-fin</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-5">
                <ol className="grid grid-cols-4 gap-2">
                    {steps.map((s, k) => (
                        <li key={s} className="min-w-0">
                            <span className={`block h-1 rounded-full transition-colors duration-300 ${k <= at ? (k === 3 ? "bg-emerald-400" : "bg-[#00B8DB]") : "bg-white/10"}`} />
                            <span className={`mt-2 flex items-center gap-1 text-[0.6875rem] font-semibold truncate transition-colors duration-300 ${k <= at ? "text-white" : "text-slate-500"}`}>
                                {k < at && <Check className="w-3 h-3 shrink-0 text-[#7FE3F2]" strokeWidth={3} />}
                                {s}
                            </span>
                        </li>
                    ))}
                </ol>
                <div className="mt-5 grid grid-cols-2 gap-2 text-[0.75rem]">
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                        <span className="block text-[0.6875rem] text-slate-500">Task</span>
                        <span className="text-white">Quarter-end patch</span>
                    </div>
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                        <span className="block text-[0.6875rem] text-slate-500">Approver</span>
                        <span className="text-white">s.noor · DBA lead</span>
                    </div>
                </div>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-3">
                    <div className="flex items-center gap-2 text-[0.75rem]">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                        <span className="text-slate-300">Access window</span>
                        <span className={`ml-auto font-mono tabular-nums font-semibold ${at === 3 ? "text-emerald-300" : at === 2 ? "text-[#7FE3F2]" : "text-slate-500"}`}>{at === 3 ? "revoked" : at === 2 ? `${left} min left` : "120 min"}</span>
                    </div>
                    <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                        <motion.div className="h-full w-full origin-left rounded-full bg-[#00B8DB]" initial={false} animate={{ scaleX: at === 2 ? left / 120 : at === 3 ? 0 : 1, opacity: at < 2 ? 0.25 : 1 }} transition={{ duration: reduce ? 0 : 0.6, ease }} />
                    </div>
                </div>
                <div className={`mt-3 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${at === 3 ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" /> Standing privilege left behind: none
                </div>
            </div>
        </div>
    );
}

/* Access records: who, when, which asset, what was done. A filter walks the rows. */
const RECORDS = [
    { who: "j.carter", when: "09:12", asset: "oracle-fin", act: "14 commands" },
    { who: "vendor.acme", when: "10:40", asset: "win-db-02", act: "RDP, recorded" },
    { who: "m.alvi", when: "11:05", asset: "oracle-fin", act: "JIT, 1 query export" },
    { who: "svc-etl", when: "13:22", asset: "pg-billing", act: "read only" },
    { who: "r.lee", when: "15:58", asset: "oracle-fin", act: "session terminated" },
];
export function RecordTable() {
    const { ref, i } = useLoop(4, 1600);
    const filter = i % 2 === 1;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a searchable table of privileged access records showing identity, time, target asset and session actions">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Access records · today</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="px-4 pt-4 flex flex-wrap items-center gap-2 text-[0.6875rem]">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#0b0c0e] px-2.5 py-1.5 text-slate-400">
                    <Search className="w-3.5 h-3.5" aria-hidden="true" /> filter
                </span>
                <span className={`rounded-lg border px-2.5 py-1.5 font-mono transition-colors duration-300 ${filter ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1] text-[#7FE3F2]" : "border-white/[0.07] text-slate-500"}`}>asset: oracle-fin</span>
                <span className="ml-auto text-slate-500">{filter ? "3 of 5" : "5 of 5"} records</span>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-[minmax(0,1.1fr)_3rem_minmax(0,1fr)_minmax(0,1.2fr)] gap-2 px-3 pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-slate-500">
                    <span>Identity</span>
                    <span>Time</span>
                    <span>Asset</span>
                    <span>Actions</span>
                </div>
                <ul className="space-y-1">
                    {RECORDS.map((r) => {
                        const dim = filter && r.asset !== "oracle-fin";
                        return (
                            <li key={r.who} className={`grid grid-cols-[minmax(0,1.1fr)_3rem_minmax(0,1fr)_minmax(0,1.2fr)] gap-2 rounded-lg border px-3 py-2 text-[0.75rem] transition-[opacity,border-color,background-color] duration-300 ${dim ? "opacity-30 border-transparent" : filter ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.06]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <span className="truncate font-semibold text-white">{r.who}</span>
                                <span className="font-mono text-slate-400">{r.when}</span>
                                <span className="truncate font-mono text-slate-300">{r.asset}</span>
                                <span className="truncate text-slate-400">{r.act}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex items-center gap-2 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> Tamper-resistant log, integrity verified
            </div>
        </div>
    );
}

/* Scheduled report: sections assemble, then it goes out on schedule. */
export function ReportVisual() {
    const { ref, i, reduce } = useLoop(6, 1100);
    const parts = ["Account entitlements", "Privileged activity", "Asset inventory", "Policy compliance"];
    const done = i >= parts.length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a scheduled compliance report assembles account entitlements, privileged activity, asset inventory and policy compliance information automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <FileText className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Scheduled report · privileged access review</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-2 text-[0.75rem] text-slate-400">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" /> Runs every Monday, 07:00
                </div>
                <ul className="mt-4 space-y-2">
                    {parts.map((p, k) => {
                        const ok = k < i || done;
                        const now = k === i && !done;
                        return (
                            <li key={p} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[0.8125rem] transition-colors duration-300 ${now ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                                <span className={`inline-flex w-5 h-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${ok ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300" : now ? "border-[#00B8DB]/60 text-[#7FE3F2]" : "border-white/15 text-transparent"}`}>
                                    {now ? <span className="w-2 h-2 rounded-full border-2 border-current border-t-transparent aip-spin" /> : <Check className="w-3 h-3" strokeWidth={3} />}
                                </span>
                                <span className={ok || now ? "text-white" : "text-slate-500"}>{p}</span>
                                {ok && <span className="ml-auto text-[0.6875rem] text-slate-500">from the audit record</span>}
                            </li>
                        );
                    })}
                </ul>
                <AnimatePresence initial={false}>
                    {done && (
                        <motion.div
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.35, ease }}
                            className="mt-3 flex items-center gap-2 rounded-xl border border-emerald-400/35 bg-emerald-400/[0.08] px-3.5 py-2.5 text-[0.75rem] font-semibold text-emerald-300"
                        >
                            <Check className="w-4 h-4 shrink-0" strokeWidth={3} aria-hidden="true" /> Shared with auditors and security stakeholders
                        </motion.div>
                    )}
                </AnimatePresence>
                {!done && (
                    <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] px-3.5 py-2.5 text-[0.75rem] text-slate-500">
                        <Ban className="w-4 h-4 shrink-0" aria-hidden="true" /> No manual log collection
                    </div>
                )}
            </div>
        </div>
    );
}

