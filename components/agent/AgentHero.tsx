"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Bot, Check, Clock, KeyRound } from "lucide-react";

/*
 * AI agent security hero: one agent run under PAM.
 * The agent asks for a task, is verified and granted scoped access for a
 * limited window, then each action is checked as it happens: allowed calls
 * pass, the credential is injected without being exposed, an out-of-policy
 * command is blocked, and the grant expires on its own. Loops while in
 * view; agent, systems and timings are illustrative.
 */

type Kind = "ok" | "inject" | "block" | "info";
const STEPS: { stage: string; text: string; kind: Kind }[] = [
    { stage: "Request", text: "reconcile March invoices on billing-db", kind: "info" },
    { stage: "Verify", text: "agent identity confirmed · own credentials", kind: "ok" },
    { stage: "Authorize", text: "policy: read billing-db, write ledger", kind: "ok" },
    { stage: "Grant", text: "scoped access for 15 min", kind: "ok" },
    { stage: "Monitor", text: "SELECT * FROM invoices WHERE month = 3", kind: "ok" },
    { stage: "Monitor", text: "connect billing-db · credential injected, never shown", kind: "inject" },
    { stage: "Monitor", text: "DROP TABLE audit_log", kind: "block" },
    { stage: "Monitor", text: "UPDATE ledger SET status = 'matched'", kind: "ok" },
    { stage: "Revoke", text: "grant expired · nothing left standing", kind: "info" },
];
const STAGES = ["Request", "Verify", "Authorize", "Grant", "Monitor", "Revoke"];
const STEP_MS = 1100;
const VISIBLE = 6;

export default function AgentHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [n, setN] = useState(reduce ? STEPS.length - 1 : 3);

    useEffect(() => {
        if (reduce || !seen) return;
        const hold = n === STEPS.length - 1 ? STEP_MS * 2.4 : STEP_MS;
        const t = window.setTimeout(() => setN((v) => (v + 1) % STEPS.length), hold);
        return () => window.clearTimeout(t);
    }, [n, seen, reduce]);

    const cur = STEPS[n];
    const stageIdx = STAGES.indexOf(cur.stage);
    const rows = STEPS.slice(0, n + 1).slice(-VISIBLE);
    const granted = n >= 3 && n < STEPS.length - 1;
    const minsLeft = granted ? Math.max(1, 15 - (n - 3) * 2) : 0;

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: an AI agent's task is verified, authorized and granted scoped access for a limited time; each action is checked as it runs, the credential is injected without being exposed, an out-of-policy command is blocked and the grant expires automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Agent run · under privileged access control</span>
            </div>

            {/* agent identity + grant */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 pt-4">
                <div className="flex min-w-0 items-center gap-3">
                    <span className="relative inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                        <Bot className="w-5 h-5" aria-hidden="true" />
                        {!reduce && granted && <span className="absolute inset-0 rounded-xl ring-2 ring-[#00B8DB]/50 aip-ping" aria-hidden="true" />}
                    </span>
                    <span className="min-w-0">
                        <span className="block truncate font-mono text-[0.8125rem] font-semibold text-white">agent · billing-reconciler</span>
                        <span className="block text-[0.6875rem] text-slate-500">AI / automated identity</span>
                    </span>
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[0.6875rem] font-semibold tabular-nums transition-colors duration-300 ${granted ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1] text-[#7FE3F2]" : "border-white/[0.08] text-slate-500"}`}>
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {granted ? `${minsLeft} min left` : n === STEPS.length - 1 ? "expired" : "no access"}
                </span>
            </div>

            {/* lifecycle */}
            <ol className="grid grid-cols-6 gap-1 px-4 pt-4" aria-hidden="true">
                {STAGES.map((s, k) => (
                    <li key={s} className="min-w-0">
                        <span className={`block h-1 rounded-full transition-colors duration-300 ${k < stageIdx ? "bg-[#00B8DB]" : k === stageIdx ? (k === 5 ? "bg-emerald-400" : "bg-[#7FE3F2]") : "bg-white/10"}`} />
                        <span className={`mt-1.5 block truncate text-center text-[0.625rem] font-semibold transition-colors duration-300 ${k === stageIdx ? "text-white" : k < stageIdx ? "text-slate-400" : "text-slate-600"}`}>{s}</span>
                    </li>
                ))}
            </ol>

            {/* action log */}
            <ul className="p-4 space-y-1.5 min-h-[15.5rem]" aria-hidden="true">
                {rows.map((r, k) => {
                    const last = k === rows.length - 1;
                    const tone =
                        r.kind === "block"
                            ? "border-rose-400/40 bg-rose-500/[0.08]"
                            : r.kind === "inject"
                              ? "border-[#00B8DB]/35 bg-[#00B8DB]/[0.06]"
                              : last
                                ? "border-white/[0.14] bg-white/[0.05]"
                                : "border-white/[0.06] bg-white/[0.02]";
                    return (
                        <motion.li
                            key={r.text}
                            layout={!reduce}
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: last || r.kind === "block" ? 1 : 0.7, y: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className={`grid grid-cols-[4.75rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 ${tone}`}
                        >
                            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.06em] text-slate-500">{r.stage}</span>
                            <span className={`truncate text-[0.6875rem] ${r.stage === "Monitor" ? "font-mono" : ""} ${r.kind === "block" ? "text-rose-200 line-through decoration-rose-400/60" : "text-slate-200"}`}>{r.text}</span>
                            {r.kind === "block" ? (
                                <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold text-rose-300">
                                    <Ban className="w-3 h-3" /> blocked
                                </span>
                            ) : r.kind === "inject" ? (
                                <KeyRound className="w-3.5 h-3.5 text-[#7FE3F2]" />
                            ) : (
                                <Check className={`w-3.5 h-3.5 ${r.stage === "Revoke" ? "text-emerald-400" : "text-[#7FE3F2]"}`} strokeWidth={3} />
                            )}
                        </motion.li>
                    );
                })}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Every action recorded and tied to the agent</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
