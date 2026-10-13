"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Bot, Check, Server, UserRound } from "lucide-react";

/*
 * AI PAM hero: one privileged access layer for three kinds of identity.
 * Requests arrive from a person, a machine and an AI agent in turn; each
 * runs the same five checks (verify, evaluate policy, grant, monitor,
 * revoke) and lands in the decision log, with one out-of-policy action
 * stopped. Loops while in view; names and targets are illustrative.
 */

const LANES = [
    { k: "human", t: "Human", i: UserRound },
    { k: "machine", t: "Machine", i: Server },
    { k: "ai", t: "AI agent", i: Bot },
] as const;

const REQS: { lane: (typeof LANES)[number]["k"]; who: string; what: string; grant: string; deny?: boolean }[] = [
    { lane: "human", who: "a.khan", what: "esxi-03 · patch", grant: "60 min, approved" },
    { lane: "machine", who: "svc-backup", what: "orders-db · nightly dump", grant: "short-lived credential" },
    { lane: "ai", who: "billing-reconciler", what: "billing-db · reconcile", grant: "15 min, scoped" },
    { lane: "ai", who: "billing-reconciler", what: "DROP TABLE audit_log", grant: "blocked by policy", deny: true },
    { lane: "human", who: "vendor.acme", what: "win-db-02 · upgrade", grant: "2 h, two approvals" },
    { lane: "machine", who: "deploy-prod", what: "k8s-prod · rollout", grant: "OIDC token, 15 min" },
];
const CHECKS = ["Verify", "Evaluate policy", "Grant", "Monitor", "Revoke"];
const BEAT = 520;

export default function AiPamHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [t, setT] = useState(reduce ? 26 : 23);

    useEffect(() => {
        if (reduce || !seen) return;
        const id = window.setInterval(() => setT((v) => v + 1), BEAT);
        return () => window.clearInterval(id);
    }, [seen, reduce]);

    const PER = CHECKS.length + 2;
    const r = Math.floor(t / PER);
    const phase = reduce ? CHECKS.length : t % PER;
    const req = REQS[r % REQS.length];
    const stopAt = req.deny ? 1 : CHECKS.length;
    const log = [r - 1, r - 2, r - 3].filter((x) => x >= 0).map((x) => REQS[x % REQS.length]);

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: requests from a person, a machine and an AI agent pass through one privileged access layer that verifies identity, evaluates policy, grants scoped temporary access, monitors activity and revokes it; an out-of-policy agent command is blocked">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">One privileged access layer · every identity</span>
            </div>

            {/* identity lanes */}
            <ul className="grid grid-cols-3 gap-1.5 px-4 pt-4" aria-hidden="true">
                {LANES.map((l) => {
                    const on = l.k === req.lane;
                    return (
                        <li key={l.k} className={`flex items-center justify-center gap-2 rounded-xl border px-2 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className={`relative inline-flex w-7 h-7 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-slate-400"}`}>
                                <l.i className="w-3.5 h-3.5" />
                                {on && !reduce && <span className="absolute inset-0 rounded-lg ring-2 ring-[#00B8DB]/60 aip-ping" />}
                            </span>
                            <span className={`text-[0.75rem] font-semibold transition-colors duration-300 ${on ? "text-white" : "text-slate-500"}`}>{l.t}</span>
                        </li>
                    );
                })}
            </ul>

            {/* current request */}
            <div className="mx-4 mt-3 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-2.5">
                <motion.div key={r} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} className="flex min-w-0 items-center gap-2 text-[0.75rem]">
                    <span className="font-mono font-semibold text-white truncate">{req.who}</span>
                    <span className="text-slate-500 shrink-0">→</span>
                    <span className={`font-mono truncate ${req.deny ? "text-rose-200" : "text-[#7FE3F2]"}`}>{req.what}</span>
                </motion.div>
            </div>

            {/* the five checks */}
            <ol className="grid grid-cols-5 gap-1 px-4 pt-3" aria-hidden="true">
                {CHECKS.map((c, k) => {
                    const reached = phase > k && k <= stopAt;
                    const blocked = req.deny && k === stopAt && phase > k;
                    const skipped = req.deny && k > stopAt;
                    return (
                        <li key={c} className="min-w-0">
                            <span className={`block h-1.5 rounded-full transition-colors duration-200 ${blocked ? "bg-rose-400" : skipped ? "bg-white/[0.06]" : reached ? (k === 4 ? "bg-emerald-400" : "bg-[#00B8DB]") : "bg-white/10"}`} />
                            <span className={`mt-1.5 block truncate text-center text-[0.5625rem] font-semibold transition-colors duration-200 ${blocked ? "text-rose-300" : reached ? "text-white" : "text-slate-600"}`}>{c}</span>
                        </li>
                    );
                })}
            </ol>

            <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300" style={{ borderColor: phase >= CHECKS.length ? (req.deny ? "rgba(251,113,133,0.4)" : "rgba(52,211,153,0.35)") : "rgba(255,255,255,0.08)" }}>
                {phase >= CHECKS.length || (req.deny && phase > stopAt) ? (
                    req.deny ? (
                        <span className="inline-flex items-center gap-1.5 text-rose-200">
                            <Ban className="w-4 h-4" aria-hidden="true" /> {req.grant}
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-1.5 text-emerald-300">
                            <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" /> {req.grant} · then revoked
                        </span>
                    )
                ) : (
                    <span className="text-slate-500">Checking…</span>
                )}
            </div>

            {/* decision log */}
            <ul className="p-4 space-y-1" aria-hidden="true">
                {log.map((x, k) => (
                    <li key={`${x.who}-${x.what}-${k}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-2 rounded-lg px-2.5 py-1.5 text-[0.625rem]" style={{ opacity: 0.85 - k * 0.22 }}>
                        <span className="font-semibold uppercase tracking-[0.06em] text-slate-500">{LANES.find((l) => l.k === x.lane)?.t}</span>
                        <span className="truncate font-mono text-slate-300">
                            {x.who} → {x.what}
                        </span>
                        {x.deny ? <Ban className="w-3 h-3 text-rose-300" /> : <Check className="w-3 h-3 text-[#7FE3F2]" strokeWidth={3} />}
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Same controls for people, machines and AI</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
