"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Bot, Check, Clock, Database, Eye, KeyRound, Lock, ShieldCheck, Timer, UserCheck, X } from "lucide-react";

/* Illustrations for /solutions/ai-agent-security. Values are illustrative. */

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

/* JIT for agents: grants per request, an approval for the risky one, every grant expires. */
const GRANTS = [
    { t: "read billing-db", how: "within policy", from: 4, len: 9, kind: "auto" },
    { t: "write ledger", how: "approved by s.noor", from: 16, len: 10, kind: "human" },
    { t: "restart billing-api", how: "time window 02:00-04:00", from: 30, len: 6, kind: "auto" },
    { t: "delete backups", how: "command-level control", from: 40, len: 0, kind: "deny" },
];
export function AgentGrants() {
    const { ref, i, reduce } = useLoop(GRANTS.length + 2, 1000, 0.5);
    const shown = Math.min(i + 1, GRANTS.length);
    const SPAN = 60;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an AI workflow receives temporary grants per request over one hour; a write needs human approval, a restart is limited to a time window, a destructive command is denied, and every grant expires automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Clock className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Agent grants · one hour</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-3">
                {GRANTS.map((g, k) => {
                    const on = k < shown;
                    return (
                        <li key={g.t} className="min-w-0">
                            <div className="flex items-center gap-2 text-[0.75rem]">
                                {g.kind === "deny" ? <X className="w-3.5 h-3.5 shrink-0 text-rose-300" aria-hidden="true" /> : g.kind === "human" ? <UserCheck className="w-3.5 h-3.5 shrink-0 text-amber-300" aria-hidden="true" /> : <Check className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />}
                                <span className={`truncate font-mono ${on ? "text-white" : "text-slate-600"}`}>{g.t}</span>
                                <span className={`ml-auto shrink-0 text-[0.625rem] ${on ? (g.kind === "deny" ? "text-rose-300" : g.kind === "human" ? "text-amber-300" : "text-slate-400") : "text-slate-600"}`}>{g.how}</span>
                            </div>
                            <div className="relative mt-1.5 h-2 rounded-full bg-white/[0.05]">
                                {g.kind === "deny" ? (
                                    <motion.span className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-rose-400" style={{ left: `${(g.from / SPAN) * 100}%` }} initial={false} animate={{ opacity: on ? 1 : 0 }} />
                                ) : (
                                    <motion.span
                                        className={`absolute inset-y-0 origin-left rounded-full ${g.kind === "human" ? "bg-amber-400/80" : "bg-[#00B8DB]"}`}
                                        style={{ left: `${(g.from / SPAN) * 100}%`, width: `${(g.len / SPAN) * 100}%` }}
                                        initial={false}
                                        animate={{ scaleX: on ? 1 : 0 }}
                                        transition={{ duration: reduce ? 0 : 0.5, ease }}
                                    />
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${i >= GRANTS.length ? "border-emerald-400/30 bg-emerald-400/[0.07] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" /> {i >= GRANTS.length ? "Every grant expired on its own · no standing permissions" : "Grants expire automatically"}
            </div>
        </div>
    );
}

/* Credentials: the secret is not in the workflow; a short-lived one is issued at run time. */
export function InjectVisual() {
    const { ref, i, reduce } = useLoop(16, 1000, 0.5);
    const ttl = 15 - i;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: instead of a password embedded in the workflow, the agent receives a short-lived credential from the vault at run time, which expires and rotates automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <KeyRound className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">reconcile.py · credentials</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-4 space-y-3 font-mono text-[0.75rem]">
                <div className="rounded-xl border border-rose-400/30 bg-rose-500/[0.05] p-3">
                    <div className="mb-1.5 font-sans text-[0.6875rem] font-semibold text-rose-300">Before: embedded in the workflow</div>
                    <div className="text-slate-500 line-through decoration-rose-400/70">
                        DB_PASSWORD = <span className="text-rose-200">&quot;Spr1ng2024!&quot;</span>
                    </div>
                    <div className="text-slate-500 line-through decoration-rose-400/70">
                        API_TOKEN = <span className="text-rose-200">&quot;sk_live_9f2c…&quot;</span>
                    </div>
                </div>
                <div className="rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.05] p-3">
                    <div className="mb-1.5 font-sans text-[0.6875rem] font-semibold text-[#7FE3F2]">With OmniPriv: issued at run time</div>
                    <div className="text-slate-300">
                        DB_PASSWORD = <span className="rounded bg-[#00B8DB]/15 px-1.5 py-0.5 font-sans text-[0.6875rem] text-[#7FE3F2]">issued by the vault</span>
                    </div>
                    <div className="mt-1 text-slate-300">
                        API_TOKEN = <span className="rounded bg-[#00B8DB]/15 px-1.5 py-0.5 font-sans text-[0.6875rem] text-[#7FE3F2]">short-lived token</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 font-sans">
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 text-[0.6875rem] text-slate-300">
                            <Lock className="w-3 h-3" aria-hidden="true" /> short-lived
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5 text-[0.6875rem] tabular-nums text-slate-300">
                            <Timer className="w-3 h-3" aria-hidden="true" /> {reduce ? "15 min" : ttl > 0 ? `expires in ${ttl} min` : "expired · rotated"}
                        </span>
                    </div>
                    <div className="mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div className="h-full w-full origin-left bg-[#00B8DB]" initial={false} animate={{ scaleX: reduce ? 1 : Math.max(ttl, 0) / 15 }} transition={{ duration: 0.4, ease }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Access model: one control plane between every identity and every system ─── */
const CP_IDS = ["Human", "Machine", "Vendor", "AI / automated"];
const CP_CTRL = ["MFA", "JIT access", "Zero Standing Privileges", "Session security"];
const CP_TGT = ["Cloud", "SaaS", "On-premises", "Databases"];
export function ControlPlaneVisual() {
    const { ref, i, reduce } = useLoop(4, 1400, 0.35);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: human, machine, vendor and AI or automated identities reach cloud, SaaS, on-premises systems and databases only through one privileged access control plane that applies MFA, JIT access, Zero Standing Privileges and session security">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Privileged Access Control Plane</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#7FE3F2] shrink-0">machine speed</span>
            </div>
            <div className="p-4 grid grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1.15fr)_1.25rem_minmax(0,1fr)] items-stretch">
                <ul className="space-y-1.5">
                    {CP_IDS.map((t, k) => (
                        <li key={t} className={`flex h-9 items-center justify-center rounded-lg border px-1.5 text-center text-[0.6875rem] font-semibold leading-tight transition-colors duration-300 ${k === i ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.12] text-white" : "border-white/[0.07] bg-white/[0.02] text-slate-400"}`}>
                            {k === 3 && <Bot className="w-3.5 h-3.5 mr-1 shrink-0" aria-hidden="true" />}
                            {t}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-col justify-around" aria-hidden="true">
                    {CP_IDS.map((t, k) => (
                        <span key={t} className="relative block h-px bg-white/10 overflow-hidden">
                            {k === i && !reduce && <motion.span className="absolute inset-y-0 left-0 w-1/2 bg-[#7FE3F2]" initial={{ x: "-100%" }} animate={{ x: "220%" }} transition={{ duration: 0.6, ease }} />}
                        </span>
                    ))}
                </div>
                <div className="rounded-xl border border-[#00B8DB]/40 bg-[#0b0c0e] p-2 shadow-[0_0_30px_-10px_rgba(0,184,219,0.6)]">
                    <div className="px-1 pb-1.5 text-center text-[0.5625rem] font-semibold uppercase tracking-[0.08em] text-slate-500">applies to every request</div>
                    <ul className="space-y-1">
                        {CP_CTRL.map((c) => (
                            <li key={c} className="flex items-center gap-1.5 rounded-md bg-[#00B8DB]/[0.08] px-2 py-1.5 text-[0.6875rem] font-semibold leading-tight text-[#7FE3F2]">
                                <Check className="w-3 h-3 shrink-0" strokeWidth={3} aria-hidden="true" />
                                <span className="min-w-0">{c}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col justify-around" aria-hidden="true">
                    {CP_TGT.map((t, k) => (
                        <span key={t} className="relative block h-px bg-white/10 overflow-hidden">
                            {k === i && !reduce && <motion.span className="absolute inset-y-0 left-0 w-1/2 bg-[#7FE3F2]" initial={{ x: "-100%" }} animate={{ x: "220%" }} transition={{ duration: 0.6, delay: 0.5, ease }} />}
                        </span>
                    ))}
                </div>
                <ul className="space-y-1.5">
                    {CP_TGT.map((t, k) => (
                        <li key={t} className={`flex h-9 items-center justify-center rounded-lg border px-1.5 text-center text-[0.6875rem] font-semibold transition-colors duration-500 ${k === i ? "border-emerald-400/45 bg-emerald-400/[0.08] text-white" : "border-white/[0.07] bg-white/[0.02] text-slate-400"}`}>
                            {t}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">No identity reaches a privileged system around the plane</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Control privilege, not just identity: who first, then four PAM answers ─── */
export function QuestionStrip({ questions }: { questions: string[] }) {
    const { ref, i, reduce } = useLoop(questions.length + 2, 1200, 0.35);
    const answers = [
        { a: "billing-db and the ledger, nothing else", i: Database },
        { a: "SELECT on invoices, UPDATE on ledger", i: KeyRound },
        { a: "15 minutes, then it expires", i: Timer },
        { a: "Recorded, every query checked", i: Eye },
    ];
    return (
        <div ref={ref} role="img" aria-label="Authentication answers who or what is asking. PAM then answers four more questions: what it can access, which privileges it receives, how long access lasts and what happens during the session">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-hidden="true">
                <li className="min-w-0 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-5">
                    <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-slate-500">Authentication</div>
                    <div className="mt-3 text-[0.9375rem] font-semibold text-slate-800 dark:text-white">Who or what is asking?</div>
                    <div className="mt-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] px-3 py-2.5 text-[0.75rem] text-slate-700 dark:text-slate-300">
                        <div className="flex items-center gap-2">
                            <Bot className="w-4 h-4 shrink-0 text-[#00667A] dark:text-[#7FE3F2]" />
                            <span className="font-semibold">AI agent</span>
                            <ShieldCheck className="ml-auto w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="mt-1 font-mono text-[0.6875rem] text-slate-500">billing-reconciler</div>
                    </div>
                    <div className="mt-3 text-[0.6875rem] text-slate-500">Where most tools stop.</div>
                </li>
                {questions.map((q, k) => {
                    const A = answers[k] ?? answers[0];
                    const on = reduce || k < i;
                    const now = k === i - 1 && !reduce;
                    return (
                        <li key={q} className={`relative min-w-0 rounded-2xl border p-5 transition-colors duration-300 ${now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.07]" : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a]"}`}>
                            <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-[#00667A] dark:text-[#7FE3F2]">PAM controls</div>
                            <div className="mt-3 text-[0.9375rem] font-semibold text-slate-800 dark:text-white">{q}</div>
                            <motion.div initial={false} animate={{ opacity: on ? 1 : 0.3, y: on ? 0 : 4 }} transition={{ duration: 0.35, ease }} className="mt-4 flex items-start gap-2 rounded-xl bg-[#00B8DB]/[0.07] px-3 py-2.5 text-[0.75rem] font-medium text-slate-800 dark:text-slate-200">
                                <A.i className="w-4 h-4 mt-px shrink-0 text-[#00667A] dark:text-[#7FE3F2]" />
                                <span>{A.a}</span>
                            </motion.div>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

/* ─── Credential lifecycle under the workflow ─── */
export function CredentialLoop() {
    const { ref, i } = useLoop(4, 1300, 0.4);
    const stages = [
        { t: "Vaulted", s: "stored encrypted", i: Lock },
        { t: "Issued", s: "short-lived, at run time", i: KeyRound },
        { t: "Validated", s: "checked against the target", i: ShieldCheck },
        { t: "Rotated", s: "after use, automatically", i: Timer },
    ];
    return (
        <div ref={ref} className="aip-console overflow-hidden" aria-hidden="true">
            <ol className="grid grid-cols-4">
                {stages.map((s, k) => (
                    <li key={s.t} className={`relative min-w-0 px-3 py-3.5 text-center transition-colors duration-300 ${k > 0 ? "border-l border-white/[0.06]" : ""} ${k === i ? "bg-[#00B8DB]/[0.09]" : ""}`}>
                        <s.i className={`mx-auto w-4 h-4 transition-colors duration-300 ${k === i ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                        <div className={`mt-1.5 text-[0.75rem] font-semibold ${k === i ? "text-white" : "text-slate-300"}`}>{s.t}</div>
                        <div className="mt-0.5 text-[0.625rem] leading-snug text-slate-500">{s.s}</div>
                        {k === i && <motion.span layoutId="cred-loop" className="absolute inset-x-0 bottom-0 h-0.5 bg-[#00B8DB]" />}
                    </li>
                ))}
            </ol>
        </div>
    );
}

/* ─── After access: an agent session across protocols, replayed ─── */
const PROTOCOLS = ["SSH", "RDP", "VNC", "HTTP", "Database"];
const REPLAY = [
    { t: "02:14:03", c: "reconcile.py started", s: "script", ok: true },
    { t: "02:14:05", c: "SELECT * FROM invoices WHERE month = 3", s: "query", ok: true },
    { t: "02:14:09", c: "POST /api/ledger/match · 200", s: "HTTP", ok: true },
    { t: "02:14:12", c: "DROP TABLE audit_log", s: "query", ok: false },
    { t: "02:14:12", c: "command blocked · alert raised", s: "control", ok: true },
    { t: "02:29:03", c: "grant expired · session closed", s: "session", ok: true },
];
export function AgentReplay() {
    const { ref, i, reduce } = useLoop(REPLAY.length + 2, 1000, 0.35);
    const shown = reduce ? REPLAY.length : Math.min(i + 1, REPLAY.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a recorded agent session replays its scripts, queries and HTTP calls in order; a destructive query is blocked and alerted on, and the session closes when the grant expires">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                </span>
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">agent · billing-reconciler → billing-db</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="flex gap-1 px-4 pt-3" aria-hidden="true">
                {PROTOCOLS.map((p) => (
                    <span key={p} className={`flex-1 rounded-md py-1 text-center text-[0.625rem] font-semibold ${p === "Database" || p === "HTTP" ? "bg-[#00B8DB]/[0.14] text-[#7FE3F2]" : "bg-white/[0.03] text-slate-500"}`}>
                        {p}
                    </span>
                ))}
            </div>
            <ol className="p-4 space-y-1 font-mono text-[0.6875rem] min-h-[13rem]" aria-hidden="true">
                {REPLAY.slice(0, shown).map((r) => (
                    <motion.li
                        key={r.t + r.c}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className={`grid grid-cols-[4rem_3.5rem_minmax(0,1fr)_auto] items-center gap-2 rounded-md px-2 py-1.5 ${!r.ok ? "bg-rose-500/[0.1] ring-1 ring-rose-400/40" : r.s === "control" ? "bg-amber-400/[0.08]" : ""}`}
                    >
                        <span className="text-slate-600">{r.t}</span>
                        <span className="font-sans text-[0.5625rem] font-semibold uppercase tracking-[0.06em] text-slate-500">{r.s}</span>
                        <span className={`truncate ${!r.ok ? "text-rose-200 line-through decoration-rose-400/60" : r.s === "control" ? "text-amber-200" : "text-slate-200"}`}>{r.c}</span>
                        {r.ok ? <Check className="w-3 h-3 text-[#7FE3F2]" strokeWidth={3} /> : <X className="w-3 h-3 text-rose-300" strokeWidth={3} />}
                    </motion.li>
                ))}
            </ol>
            <div className="grid grid-cols-3 border-t border-white/[0.08] text-center text-[0.625rem]" aria-hidden="true">
                {[
                    ["Searchable", "history"],
                    ["Script", "monitoring"],
                    ["HTTP-level", "visibility"],
                ].map(([a, b], k) => (
                    <span key={a} className={`px-2 py-2.5 ${k > 0 ? "border-l border-white/[0.06]" : ""}`}>
                        <span className="block font-semibold text-white">{a}</span>
                        <span className="text-slate-500">{b}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Detection: a legitimate-looking identity, scored, then the response ─── */
const THREATS = ["Unusual commands", "Abnormal access times", "Unexpected data volumes", "Privilege abuse", "Credential harvesting", "Lateral movement", "Attempts to bypass PAM controls"];
export function ThreatResponse() {
    const { ref, i, reduce } = useLoop(THREATS.length + 4, 650, 0.35);
    const scanned = reduce ? THREATS.length : Math.min(i, THREATS.length);
    const hits = [0, 4];
    const resp = reduce ? 3 : Math.max(0, i - THREATS.length);
    const score = Math.min(0.12 + hits.filter((h) => h < scanned).length * 0.33, 0.78);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an identity that looks legitimate is scored on behavior; unusual commands and credential harvesting are flagged across seven threat patterns, and the response escalates from alert to restricting access to terminating the session">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Behavioral analysis · svc-deploy</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-[#7FE3F2] shrink-0">39 features</span>
            </div>
            <div className="px-4 pt-4 grid grid-cols-2 gap-2 text-[0.75rem]">
                <span className="flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-2 text-emerald-200">
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" /> Identity: valid
                </span>
                <span className={`flex items-center gap-2 rounded-xl border px-3 py-2 tabular-nums transition-colors duration-300 ${score > 0.5 ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-200" : score > 0.3 ? "border-amber-400/40 bg-amber-400/[0.07] text-amber-200" : "border-white/[0.08] text-slate-300"}`}>
                    Risk score <span className="ml-auto font-mono font-semibold">{score.toFixed(2)}</span>
                </span>
            </div>
            <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5" aria-hidden="true">
                {THREATS.map((t, k) => {
                    const done = k < scanned;
                    const hit = done && hits.includes(k);
                    const now = k === scanned && !reduce && scanned < THREATS.length;
                    return (
                        <li key={t} className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[0.6875rem] transition-colors duration-200 ${hit ? "border-rose-400/40 bg-rose-500/[0.1] text-rose-200" : now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.08] text-white" : "border-white/[0.06] bg-white/[0.02] text-slate-400"} ${k === THREATS.length - 1 ? "sm:col-span-2" : ""}`}>
                            <span className={`w-1.5 h-1.5 shrink-0 rounded-full ${hit ? "bg-rose-400" : done ? "bg-emerald-400/70" : now ? "bg-[#7FE3F2]" : "bg-white/20"}`} />
                            <span className="truncate">{t}</span>
                            {hit && <span className="ml-auto shrink-0 font-semibold">flagged</span>}
                        </li>
                    );
                })}
            </ul>
            <ol className="mx-4 mb-4 grid grid-cols-3 gap-1.5 text-[0.6875rem] font-semibold" aria-hidden="true">
                {["Alert", "Restrict access", "Terminate session"].map((r, k) => (
                    <li key={r} className={`rounded-lg border py-2 text-center transition-colors duration-300 ${k < resp ? (k === 2 ? "border-rose-400/45 bg-rose-500/[0.12] text-rose-200" : "border-amber-400/45 bg-amber-400/[0.08] text-amber-200") : "border-white/[0.07] text-slate-500"}`}>
                        {r}
                    </li>
                ))}
            </ol>
        </div>
    );
}
