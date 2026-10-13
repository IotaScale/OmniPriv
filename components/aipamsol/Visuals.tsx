"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Bot, Check, Clock, Fingerprint, KeyRound, Link2, Monitor, Scale, Server, UserCheck, UserRound } from "lucide-react";

/* Illustrations for /solutions/ai-pam-solutions. Values are illustrative. */

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

/* Policy decisions: the same evaluation for a person, a pipeline and an agent. */
const DECISIONS = [
    { who: "j.carter", kind: "Human", i: UserRound, req: "sudo on linux-prod-01", rule: "RBAC: Linux admins", out: "allow", note: "JIT · 60 min" },
    { who: "vendor.acme", kind: "Human", i: UserRound, req: "RDP to win-db-02", rule: "Conditional: approval + window", out: "approval", note: "waiting on 2nd approver" },
    { who: "deploy-prod", kind: "Machine", i: Server, req: "kubectl rollout k8s-prod", rule: "Time-based: change window", out: "allow", note: "short-lived token" },
    { who: "billing-reconciler", kind: "AI agent", i: Bot, req: "UPDATE ledger", rule: "Agent scope: ledger write", out: "allow", note: "15 min" },
    { who: "billing-reconciler", kind: "AI agent", i: Bot, req: "DROP TABLE audit_log", rule: "Command-level control", out: "deny", note: "blocked, alert raised" },
];
export function PolicyVisual() {
    const { ref, i, reduce } = useLoop(DECISIONS.length + 1, 1300, 0.4);
    const shown = reduce ? DECISIONS.length : Math.min(i + 2, DECISIONS.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: one policy engine evaluates requests from people, pipelines and AI agents using RBAC, conditional access, time-based restrictions, approvals and command-level controls, allowing, holding for approval or denying each">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Scale className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Policy decisions · centralized</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-1.5 min-h-[18rem]" aria-hidden="true">
                {DECISIONS.slice(0, shown).map((d, k) => (
                    <motion.li
                        key={k}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2.5 ${d.out === "deny" ? "border-rose-400/40 bg-rose-500/[0.07]" : d.out === "approval" ? "border-amber-400/35 bg-amber-400/[0.05]" : "border-white/[0.07] bg-white/[0.02]"}`}
                    >
                        <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-white/[0.05] text-slate-300">
                            <d.i className="w-3.5 h-3.5" />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-[0.75rem]">
                                <span className="font-mono font-semibold text-white">{d.who}</span>
                                <span className="text-slate-500"> · </span>
                                <span className={`font-mono ${d.out === "deny" ? "text-rose-200" : "text-slate-300"}`}>{d.req}</span>
                            </span>
                            <span className="block truncate text-[0.625rem] text-slate-500">
                                {d.kind} · {d.rule}
                            </span>
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[0.625rem] font-semibold ${d.out === "deny" ? "text-rose-300" : d.out === "approval" ? "text-amber-300" : "text-emerald-300"}`}>
                            {d.out === "deny" ? <Ban className="w-3 h-3" /> : d.out === "approval" ? <UserCheck className="w-3 h-3" /> : <Check className="w-3 h-3" strokeWidth={3} />}
                            <span className="hidden sm:inline">{d.note}</span>
                        </span>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

/* Agentic AI: one autonomous action, held to the six things the copy says it needs. */
const GATES = [
    { t: "Clear identity", d: "agent registered as its own identity", i: Fingerprint },
    { t: "Scoped permissions", d: "restart billing-api only", i: Scale },
    { t: "Secure credentials", d: "injected, never stored in the agent", i: KeyRound },
    { t: "Temporary elevation", d: "10 minutes, then gone", i: Clock },
    { t: "Monitoring", d: "session recorded live", i: Monitor },
    { t: "Traceability", d: "hash-linked audit record", i: Link2 },
];
export function AgenticGates() {
    const { ref, i, reduce } = useLoop(GATES.length + 2, 750, 0.4);
    const passed = reduce ? GATES.length : Math.min(i, GATES.length);
    const done = passed >= GATES.length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an AI agent's action that once needed an administrator passes six controls: clear identity, scoped permissions, secure credentials, temporary elevation, monitoring and traceability">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
                <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                    <Bot className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                    <span className="block truncate text-[0.6875rem] text-slate-500">Agent initiates an admin-level action</span>
                    <span className="block truncate font-mono text-[0.8125rem] font-semibold text-white">systemctl restart billing-api</span>
                </span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ol className="p-4 grid sm:grid-cols-2 gap-1.5">
                {GATES.map((g, k) => {
                    const ok = k < passed;
                    const now = k === passed && !reduce;
                    return (
                        <li key={g.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.09]" : ok ? "border-[#00B8DB]/25 bg-[#00B8DB]/[0.04]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <g.i className={`w-4 h-4 transition-colors duration-300 ${ok || now ? "text-[#7FE3F2]" : "text-slate-600"}`} aria-hidden="true" />
                            <span className="min-w-0">
                                <span className={`block text-[0.75rem] font-semibold ${ok || now ? "text-white" : "text-slate-500"}`}>{g.t}</span>
                                <span className="block truncate text-[0.625rem] text-slate-500">{g.d}</span>
                            </span>
                            <span className={`inline-flex w-4 h-4 items-center justify-center rounded-full border ${ok ? "border-[#00B8DB]/60 bg-[#00B8DB]/20 text-[#7FE3F2]" : "border-white/15"}`} aria-hidden="true">
                                {ok && <Check className="w-2.5 h-2.5" strokeWidth={3.5} />}
                            </span>
                        </li>
                    );
                })}
            </ol>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${done ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <Check className="w-4 h-4 shrink-0" strokeWidth={3} aria-hidden="true" /> {done ? "Automation ran, infrastructure stayed governed" : "Not unrestricted machine privilege"}
            </div>
        </div>
    );
}
