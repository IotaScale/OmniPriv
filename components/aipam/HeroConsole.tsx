"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Building2, Server, User } from "lucide-react";

/*
 * /ai-pam hero visual: the AI-PAM engine as a live decision stream.
 *
 * One privileged event every ~2s, for a person, a machine, a vendor or an
 * AI agent, each with the decision OmniPriv made. Newest on top; the list
 * keeps five rows. Names, targets and scores are illustrative.
 *
 * Reduced motion: the first five events are shown, nothing cycles.
 */

type Kind = "human" | "machine" | "agent" | "vendor";
type Verdict = "granted" | "rotated" | "allowed" | "held" | "blocked" | "recording" | "scored";

const EVENTS: { kind: Kind; who: string; what: string; target: string; verdict: Verdict; label: string }[] = [
    { kind: "human", who: "j.rahman", what: "JIT access, 30 min", target: "prod-db-01", verdict: "granted", label: "Granted" },
    { kind: "agent", who: "ai-agent-07", what: "crm.read_customers", target: "CRM", verdict: "allowed", label: "In scope" },
    { kind: "machine", who: "svc-backup", what: "Secret checked out", target: "postgres_prod", verdict: "rotated", label: "Rotated after use" },
    { kind: "agent", who: "ai-agent-07", what: "billing.send_invoice", target: "Billing", verdict: "held", label: "Held for approval" },
    { kind: "vendor", who: "vendor.acme", what: "RDP maintenance window", target: "win-app-03", verdict: "recording", label: "Recording" },
    { kind: "agent", who: "ai-agent-07", what: "db.drop_table", target: "orders", verdict: "blocked", label: "Blocked by policy" },
    { kind: "human", who: "session 4f2a", what: "39 behavioral features", target: "linux_prod_01", verdict: "scored", label: "Risk 0.08" },
    { kind: "machine", who: "ci-deploy", what: "Dynamic secret issued", target: "k8s-prod", verdict: "rotated", label: "Expires in 15 min" },
];

const KIND_ICON = { human: User, machine: Server, agent: Bot, vendor: Building2 } as const;
const KIND_LABEL = { human: "Human", machine: "Machine", agent: "AI agent", vendor: "Vendor" } as const;

const VERDICT_CLASS: Record<Verdict, string> = {
    granted: "text-[#7FE3F2] bg-[#00B8DB]/[0.12] border-[#00B8DB]/30",
    allowed: "text-[#7FE3F2] bg-[#00B8DB]/[0.12] border-[#00B8DB]/30",
    rotated: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25",
    recording: "text-slate-200 bg-white/[0.06] border-white/15",
    scored: "text-emerald-300 bg-emerald-400/10 border-emerald-400/25",
    held: "text-amber-300 bg-amber-400/10 border-amber-400/30",
    blocked: "text-rose-300 bg-rose-500/10 border-rose-500/30",
};

const ROWS = 5;
const STEP_MS = 2100;

export default function HeroConsole() {
    const reduce = useReducedMotion();
    const [head, setHead] = useState(ROWS - 1); // index of the newest event

    useEffect(() => {
        if (reduce) return;
        const t = window.setInterval(() => setHead((h) => h + 1), STEP_MS);
        return () => window.clearInterval(t);
    }, [reduce]);

    const rows = Array.from({ length: ROWS }, (_, i) => {
        const n = head - i;
        return { n, ...EVENTS[((n % EVENTS.length) + EVENTS.length) % EVENTS.length] };
    });
    const counts = rows.reduce(
        (acc, r) => {
            if (r.verdict === "held") acc.held++;
            else if (r.verdict === "blocked") acc.blocked++;
            else acc.ok++;
            return acc;
        },
        { ok: 0, held: 0, blocked: 0 }
    );

    return (
        <div className="aip-console relative" aria-label="Illustrative stream of privileged access decisions" role="img">
            {/* window chrome */}
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400">AI-PAM engine · decisions</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            {/* summary tiles */}
            <div className="grid grid-cols-3 gap-2.5 p-4 pb-2">
                {[
                    { k: "Allowed with limits", v: counts.ok, c: "text-[#7FE3F2]" },
                    { k: "Held for a human", v: counts.held, c: "text-amber-300" },
                    { k: "Blocked", v: counts.blocked, c: "text-rose-300" },
                ].map((t) => (
                    <div key={t.k} className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5">
                        <div className={`text-xl font-bold tabular-nums ${t.c}`} style={{ fontFamily: "var(--font-syne)" }}>
                            {t.v}
                        </div>
                        <div className="text-[0.6875rem] text-slate-400 leading-tight">{t.k}</div>
                    </div>
                ))}
            </div>

            {/* stream */}
            <ul className="px-4 pb-4 pt-2 space-y-2 min-h-[19.5rem]">
                <AnimatePresence initial={false}>
                    {rows.map((r) => {
                        const Icon = KIND_ICON[r.kind];
                        return (
                            <motion.li
                                key={r.n}
                                layout={!reduce}
                                initial={reduce ? false : { opacity: 0, y: -14, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.18 } }}
                                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                                className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                                    r.verdict === "blocked"
                                        ? "border-rose-500/20 bg-rose-500/[0.05]"
                                        : r.verdict === "held"
                                          ? "border-amber-400/20 bg-amber-400/[0.04]"
                                          : "border-white/[0.06] bg-white/[0.025]"
                                }`}
                            >
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] text-slate-300 shrink-0">
                                    <Icon className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-baseline gap-2">
                                        <span className="font-mono text-[0.8125rem] text-white truncate">{r.who}</span>
                                        <span className="text-[0.6875rem] text-slate-500 shrink-0">{KIND_LABEL[r.kind]}</span>
                                    </span>
                                    <span className="block text-[0.75rem] text-slate-400 truncate">
                                        {r.what} <span className="text-slate-600">→</span> {r.target}
                                    </span>
                                </span>
                                <span
                                    className={`shrink-0 text-[0.6875rem] font-semibold px-2 py-1 rounded-md border whitespace-nowrap ${VERDICT_CLASS[r.verdict]}`}
                                >
                                    {r.label}
                                </span>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span>Every decision is recorded with who, what and why</span>
                <span className="font-mono">illustrative</span>
            </div>
        </div>
    );
}
