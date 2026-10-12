"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ban, Check, Clock, Mail, RotateCcw, ShieldCheck, Smartphone, User } from "lucide-react";

/*
 * Workflow hero: one privileged request through a two-level approval chain.
 * The requester is shown excluded from approving, level 1 signs off from a
 * phone, level 2 from an email link, access is granted for a window, and the
 * account reverts on expiry. Three requests loop; names are illustrative.
 */

const REQS = [
    { who: "j.rahman", role: "dba", target: "prod-db-01", window: "2 h", a1: "s.khan", a2: "m.ortiz" },
    { who: "vendor.acme", role: "admin", target: "win-app-03", window: "45 min", a1: "l.chen", a2: "s.khan" },
    { who: "d.lee", role: "root", target: "linux_prod_01", window: "30 min", a1: "m.ortiz", a2: "a.patel" },
];

/* 0 requested, 1 self-approval refused, 2 level 1, 3 level 2, 4 granted, 5 reverted */
const T = [800, 1100, 900, 900, 2200, 1500];

export default function ApprovalFlow() {
    const reduce = useReducedMotion();
    const [i, setI] = useState(0);
    const [ph, setPh] = useState(reduce ? 4 : 0);

    useEffect(() => {
        if (reduce) return;
        if (ph > 5) {
            setI((n) => (n + 1) % REQS.length);
            setPh(0);
            return;
        }
        const t = window.setTimeout(() => setPh((p) => p + 1), T[ph]);
        return () => window.clearTimeout(t);
    }, [ph, reduce]);

    const r = REQS[i];
    const row = (on: boolean, done: boolean) =>
        `flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${done ? "border-[#00B8DB]/35 bg-[#00B8DB]/[0.08]" : on ? "border-[#00B8DB]/60 bg-white/[0.03]" : "border-white/[0.07] bg-white/[0.02]"}`;

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a privileged request is approved by two independent people, granted for a time window and reverted automatically; the requester cannot approve their own request">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Access request · 4-eyes workflow</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            <div className="p-4 sm:p-5 space-y-2.5">
                {/* request */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                    >
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2] shrink-0">
                                <User className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="font-mono text-[0.875rem] text-white truncate">
                                    {r.who} <span className="text-slate-500">requests</span> {r.role}
                                </div>
                                <div className="text-[0.75rem] text-slate-400 truncate">
                                    on {r.target} · for {r.window}
                                </div>
                            </div>
                            <span className="shrink-0 text-[0.6875rem] font-semibold px-2 py-1 rounded-md border border-white/15 bg-white/[0.06] text-slate-200">
                                {ph >= 5 ? "Expired" : ph >= 4 ? "Granted" : "Pending"}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* self-approval refused */}
                <div className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${ph >= 1 ? "border-rose-500/30 bg-rose-500/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                    <Ban className={`w-4 h-4 shrink-0 ${ph >= 1 ? "text-rose-300" : "text-slate-500"}`} aria-hidden="true" />
                    <span className="text-[0.8125rem] text-slate-300 min-w-0 truncate">
                        <span className="font-mono">{r.who}</span> cannot approve their own request
                    </span>
                    {ph >= 1 && <span className="ml-auto shrink-0 text-[0.6875rem] font-semibold text-rose-300">Excluded</span>}
                </div>

                {/* level 1 */}
                <div className={row(ph === 2, ph >= 3)}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] text-[0.6875rem] font-bold text-slate-300 shrink-0">1</span>
                    <span className="min-w-0 flex-1 text-[0.8125rem] text-slate-200 truncate">
                        <span className="font-mono">{r.a1}</span> <span className="text-slate-500">approves from</span> mobile
                    </span>
                    <Smartphone className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    {ph >= 3 && <Check className="w-4 h-4 text-[#7FE3F2] shrink-0" strokeWidth={3} aria-hidden="true" />}
                </div>

                {/* level 2 */}
                <div className={row(ph === 3, ph >= 4)}>
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] text-[0.6875rem] font-bold text-slate-300 shrink-0">2</span>
                    <span className="min-w-0 flex-1 text-[0.8125rem] text-slate-200 truncate">
                        <span className="font-mono">{r.a2}</span> <span className="text-slate-500">approves from</span> an email link
                    </span>
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                    {ph >= 4 && <Check className="w-4 h-4 text-[#7FE3F2] shrink-0" strokeWidth={3} aria-hidden="true" />}
                </div>

                {/* grant + expiry */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-3.5">
                    <div className="flex items-center gap-2 text-[0.8125rem]">
                        {ph >= 5 ? (
                            <>
                                <RotateCcw className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                                <span className="text-emerald-300 font-semibold">Reverted to the restricted account</span>
                            </>
                        ) : ph >= 4 ? (
                            <>
                                <ShieldCheck className="w-4 h-4 text-[#7FE3F2] shrink-0" aria-hidden="true" />
                                <span className="text-white font-semibold">Granted by two approvers, ACL mapped</span>
                            </>
                        ) : (
                            <>
                                <Clock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                                <span className="text-slate-500">Waiting for both levels to complete</span>
                            </>
                        )}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-[0.6875rem] text-slate-500">
                        <span className="shrink-0">Access window</span>
                        <span className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.span
                                key={`${i}-${ph >= 4}`}
                                className="block h-full rounded-full bg-[#00B8DB] origin-left"
                                initial={{ scaleX: ph === 4 && !reduce ? 1 : ph >= 5 ? 0 : 0 }}
                                animate={{ scaleX: ph === 4 ? (reduce ? 1 : 0.05) : 0 }}
                                transition={{ duration: ph === 4 ? T[4] / 1000 : 0.3, ease: "linear" }}
                            />
                        </span>
                        <span className="shrink-0 tabular-nums">{r.window}</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Two independent approvers, every time</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
