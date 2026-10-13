"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    Activity,
    AlertTriangle,
    Ban,
    Boxes,
    Bot,
    Check,
    Clock,
    Cloud,
    Database,
    Eye,
    Fingerprint,
    GitBranch,
    Globe,
    KeyRound,
    Lock,
    Radar,
    RefreshCw,
    ScrollText,
    Search,
    Server,
    ShieldCheck,
    Timer,
    UserCheck,
    Users,
    X,
} from "lucide-react";

/*
 * Illustrations for /platform/secure-ai-agents.
 * Agents, systems, scores and timings are illustrative.
 */

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

function Bar({ icon: Icon, title, right }: { icon: React.ComponentType<{ className?: string }>; title: string; right?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
            <Icon className="w-4 h-4 shrink-0 text-[#7FE3F2]" />
            <span className="text-[0.75rem] font-mono text-slate-400 truncate">{title}</span>
            <span className="ml-auto shrink-0 text-[0.6875rem] font-mono text-slate-500">{right ?? "illustrative"}</span>
        </div>
    );
}

/* ─── Hero: every tool call is evaluated against identity, tool, data, approval and time ─── */
type Res = "pass" | "fail" | "hold";
const CHECKS = ["Identity", "Tool", "Data", "Approval", "Time"];
const REQS: { call: string; arg: string; res: Res[]; out: "allow" | "deny" | "hold"; note: string }[] = [
    { call: "query_db", arg: "billing.invoices", res: ["pass", "pass", "pass", "pass", "pass"], out: "allow", note: "scoped grant · 15 min" },
    { call: "export_table", arg: "customers.pii", res: ["pass", "pass", "fail"], out: "deny", note: "outside data scope" },
    { call: "restart_service", arg: "billing-api", res: ["pass", "pass", "pass", "hold"], out: "hold", note: "waiting for a human approver" },
    { call: "shell_exec", arg: "rm -rf /backups", res: ["pass", "fail"], out: "deny", note: "tool not on the allowlist" },
];
const TICKS = 8;
export function SecureHero() {
    const { ref, i, reduce } = useLoop(REQS.length * TICKS, 420, 0.3);
    const r = Math.floor(i / TICKS);
    const t = i % TICKS;
    const req = REQS[r];
    const done = t > req.res.length;
    const past = [1, 2, 3].map((d) => REQS[(r - d + REQS.length) % REQS.length]);
    const outTone = req.out === "allow" ? "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300" : req.out === "deny" ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-300" : "border-amber-400/40 bg-amber-400/[0.08] text-amber-200";
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: each tool call an AI agent makes is checked against its identity, tool allowlist, data scope, approval rules and time limit; an in-scope query is allowed with a 15 minute grant, a PII export is denied, a service restart waits for a human approver and an unlisted shell command is denied">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Agent tool calls · policy evaluation</span>
            </div>

            <div className="flex min-w-0 items-center gap-3 px-4 pt-4">
                <span className="relative inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                    <Bot className="w-5 h-5" aria-hidden="true" />
                    {!reduce && <span className="absolute inset-0 rounded-xl ring-2 ring-[#00B8DB]/40 aip-ping" aria-hidden="true" />}
                </span>
                <span className="min-w-0">
                    <span className="block truncate font-mono text-[0.8125rem] font-semibold text-white">agent · ops-assistant</span>
                    <span className="block truncate text-[0.6875rem] text-slate-500">own identity · no borrowed human account</span>
                </span>
                <span className="ml-auto shrink-0 rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[0.625rem] tabular-nums text-slate-400">call {r + 1}/4</span>
            </div>

            <div className="px-4 pt-4" aria-hidden="true">
                <motion.div key={r} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="truncate rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-3 font-mono text-[0.8125rem] text-slate-200">
                    <span className="text-[#7FE3F2]">{req.call}</span>(<span className="text-amber-200">&quot;{req.arg}&quot;</span>)
                </motion.div>

                <ol className="mt-3 grid grid-cols-5 gap-1.5">
                    {CHECKS.map((c, k) => {
                        const res = req.res[k];
                        const lit = res !== undefined && k < t;
                        const tone = !lit ? "border-white/[0.06] text-slate-600" : res === "pass" ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.08] text-[#7FE3F2]" : res === "fail" ? "border-rose-400/45 bg-rose-500/[0.1] text-rose-300" : "border-amber-400/45 bg-amber-400/[0.1] text-amber-200";
                        const skipped = res === undefined;
                        return (
                            <li key={c} className={`flex min-w-0 flex-col items-center gap-1 rounded-lg border px-1 py-2 transition-colors duration-200 ${tone} ${skipped && done ? "opacity-40" : ""}`}>
                                <span className="inline-flex h-4 items-center">
                                    {lit ? res === "pass" ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : res === "fail" ? <X className="w-3.5 h-3.5" strokeWidth={3} /> : <UserCheck className="w-3.5 h-3.5" /> : <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                                </span>
                                <span className="w-full truncate text-center text-[0.625rem] font-semibold">{c}</span>
                            </li>
                        );
                    })}
                </ol>

                <div className={`mt-3 flex h-11 items-center gap-2 rounded-xl border px-3.5 text-[0.75rem] font-semibold transition-colors duration-300 ${done ? outTone : "border-white/[0.07] text-slate-500"}`}>
                    {done ? req.out === "allow" ? <ShieldCheck className="w-4 h-4 shrink-0" /> : req.out === "deny" ? <Ban className="w-4 h-4 shrink-0" /> : <UserCheck className="w-4 h-4 shrink-0" /> : <Clock className="w-4 h-4 shrink-0" />}
                    <span className="truncate">{done ? `${req.out === "allow" ? "Allowed" : req.out === "deny" ? "Denied" : "Held"} · ${req.note}` : "Evaluating before anything runs"}</span>
                </div>
            </div>

            <ul className="px-4 pt-4 pb-4 space-y-1.5" aria-hidden="true">
                {past.map((p, k) => (
                    <li key={k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1.5" style={{ opacity: 1 - k * 0.25 }}>
                        <span className="truncate font-mono text-[0.6875rem] text-slate-400">
                            {p.call}(&quot;{p.arg}&quot;)
                        </span>
                        <span className={`text-[0.625rem] font-semibold ${p.out === "allow" ? "text-emerald-300" : p.out === "deny" ? "text-rose-300" : "text-amber-200"}`}>{p.out === "allow" ? "allowed" : p.out === "deny" ? "denied" : "held"}</span>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Authenticated is not the same as allowed</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Who holds privilege: from administrators to every kind of identity ─── */
const NOW_IDS = [
    { t: "People", i: Users },
    { t: "Applications", i: Globe },
    { t: "Workloads", i: Boxes },
    { t: "Service accounts", i: KeyRound },
    { t: "Automation", i: GitBranch },
    { t: "AI agents", i: Bot },
];
export function IdentityShift() {
    const { ref, i, reduce } = useLoop(2, 3200, 0.4);
    const now = reduce || i === 1;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: traditional PAM covered administrators only; a modern environment has people, applications, workloads, service accounts, automation and AI agents, all governed by one identity-security model">
            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {["Traditional PAM", "Modern environment"].map((t, k) => (
                    <span key={t} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === now ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="grid p-4" aria-hidden="true">
                <div className={`[grid-area:1/1] flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/[0.1] p-6 transition-opacity duration-300 ${now ? "invisible opacity-0" : "visible opacity-100"}`}>
                    <span className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 text-[0.875rem] font-semibold text-white">
                        <UserCheck className="w-4 h-4 text-[#7FE3F2]" /> Administrators
                    </span>
                    <span className="text-center text-[0.75rem] text-slate-500">One kind of privileged identity, managed in one place</span>
                </div>
                <div className={`[grid-area:1/1] rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.04] p-4 transition-opacity duration-300 ${now ? "visible opacity-100" : "invisible opacity-0"}`}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {NOW_IDS.map((x, k) => (
                            <motion.span
                                key={x.t}
                                initial={false}
                                animate={{ opacity: now ? 1 : 0, y: now ? 0 : 6 }}
                                transition={{ duration: 0.35, delay: now && !reduce ? k * 0.07 : 0, ease }}
                                className={`flex min-w-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-[0.75rem] font-semibold ${x.t === "AI agents" ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.12] text-white" : "border-white/[0.08] bg-white/[0.03] text-slate-200"}`}
                            >
                                <x.i className="w-4 h-4 shrink-0 text-[#7FE3F2]" />
                                <span className="truncate">{x.t}</span>
                            </motion.span>
                        ))}
                    </div>
                    <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] px-3 py-2.5 text-[0.75rem] font-semibold text-[#7FE3F2]">
                        <ShieldCheck className="w-4 h-4 shrink-0" /> One identity-security model
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Zero Trust PAM: an agent's policy, evaluated control by control ─── */
const POLICY = [
    { k: "Tools it may call", v: ["query_db", "read_docs", "open_ticket"], i: Boxes },
    { k: "Systems it may access", v: ["billing-db", "crm-api"], i: Server },
    { k: "Data it may reach", v: ["invoices", "ledger"], i: Database },
    { k: "Needs approval", v: ["write ledger", "restart service"], i: UserCheck },
    { k: "Elevation lasts", v: ["15 min, then revoked"], i: Timer },
];
export function PolicyCard() {
    const { ref, i } = useLoop(POLICY.length + 1, 1100, 0.4);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an AI agent's access policy lists the tools it may call, the systems and data it may reach, the actions that need human approval and how long elevated access lasts; authentication alone does not grant any of them">
            <Bar icon={ScrollText} title="policy · agent ops-assistant" />
            <div className="px-4 pt-4" aria-hidden="true">
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[0.75rem]">
                    <Fingerprint className="w-4 h-4 shrink-0 text-[#7FE3F2]" />
                    <span className="font-semibold text-white">Authenticated</span>
                    <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
                    <span className="ml-auto truncate text-slate-500">that alone grants nothing</span>
                </div>
            </div>
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {POLICY.map((p, k) => {
                    const on = k === i;
                    return (
                        <li key={p.k} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <p.i className={`mt-0.5 w-4 h-4 transition-colors duration-300 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                            <span className="min-w-0">
                                <span className={`block text-[0.75rem] font-semibold transition-colors duration-300 ${on ? "text-white" : "text-slate-400"}`}>{p.k}</span>
                                <span className="mt-1.5 flex flex-wrap gap-1.5">
                                    {p.v.map((v) => (
                                        <span key={v} className={`rounded-md px-2 py-0.5 font-mono text-[0.6875rem] ${k === 3 ? "bg-amber-400/[0.1] text-amber-200" : "bg-white/[0.06] text-slate-300"}`}>
                                            {v}
                                        </span>
                                    ))}
                                </span>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${i === POLICY.length ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <ShieldCheck className="w-4 h-4 shrink-0" /> Identity verified, then every action authorized by policy
            </div>
        </div>
    );
}

/* ─── JIT: standing privilege versus privilege that exists only for the task ─── */
const SLICES: [number, number][] = [
    [2.1, 2.35],
    [9.6, 10.05],
    [16, 16.2],
];
function jitHours(h: number) {
    return SLICES.reduce((s, [a, b]) => s + Math.max(0, Math.min(h, b) - a), 0);
}
function fmt(h: number) {
    const m = Math.round(h * 60);
    return m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m` : `${m}m`;
}
export function StandingVsJit() {
    const { ref, i, reduce } = useLoop(26, 260, 0.5);
    const h = reduce ? 24 : Math.min(i, 24);
    const pct = (h / 24) * 100;
    return (
        <div ref={ref} className="aip-card rounded-3xl border p-5 sm:p-6" role="img" aria-label="Illustration: over 24 hours, a permanently privileged agent holds access the whole day, while a just-in-time agent holds access only during three approved tasks, under one hour in total">
            <div className="flex items-center justify-between gap-3 text-[0.75rem] font-semibold text-slate-500">
                <span>Privileged access available · 24 hours</span>
                <span className="font-mono text-[0.6875rem]">illustrative</span>
            </div>
            <div className="mt-5 space-y-5" aria-hidden="true">
                {[
                    { t: "Permanent access", v: fmt(h), tone: "bg-rose-400/70", jit: false },
                    { t: "JIT access", v: fmt(jitHours(h)), tone: "bg-[#00B8DB]", jit: true },
                ].map((lane) => (
                    <div key={lane.t}>
                        <div className="flex items-center justify-between gap-3 text-[0.8125rem]">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">{lane.t}</span>
                            <span className={`tabular-nums font-semibold ${lane.jit ? "text-[#00667A] dark:text-[#7FE3F2]" : "text-rose-600 dark:text-rose-300"}`}>{lane.v}</span>
                        </div>
                        <div className="relative mt-2 h-3 overflow-hidden rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06]">
                            {lane.jit ? (
                                SLICES.map(([a, b]) => (
                                    <span key={a} className={`absolute inset-y-0 rounded-full ${lane.tone} transition-opacity duration-200`} style={{ left: `${(a / 24) * 100}%`, width: `${((b - a) / 24) * 100}%`, opacity: h >= a ? 1 : 0.15 }} />
                                ))
                            ) : (
                                <span className={`absolute inset-y-0 left-0 ${lane.tone} transition-[width] duration-200 ease-linear`} style={{ width: `${pct}%` }} />
                            )}
                            <span className="absolute inset-y-0 w-px bg-slate-900/40 dark:bg-white/60" style={{ left: `${pct}%` }} />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between font-mono text-[0.625rem] text-slate-400">
                    {["00:00", "06:00", "12:00", "18:00", "24:00"].map((x) => (
                        <span key={x}>{x}</span>
                    ))}
                </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 text-[0.75rem]" aria-hidden="true">
                <div className="rounded-xl border border-rose-400/25 bg-rose-500/[0.05] px-3 py-2.5 text-rose-700 dark:text-rose-200">Inherited by anyone who compromises it</div>
                <div className="rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-3 py-2.5 text-[#00667A] dark:text-[#7FE3F2]">Granted per task, removed afterward</div>
            </div>
        </div>
    );
}

/* ─── Credentials: the vault connects the session, the agent never holds the secret ─── */
const BROKER = [
    { t: "Agent asks to reach billing-db", n: 0 },
    { t: "Policy approves the task", n: 1 },
    { t: "Vault injects the credential into the session", n: 1 },
    { t: "Agent works through a session handle", n: 2 },
    { t: "Session ends, credential rotated", n: 1 },
];
export function CredentialBroker() {
    const { ref, i } = useLoop(BROKER.length, 1500, 0.4);
    const nodes = [
        { t: "AI agent", s: "session handle only", i: Bot },
        { t: "OmniPriv vault", s: "holds the secret", i: Lock },
        { t: "billing-db", s: "privileged account", i: Database },
    ];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an AI agent asks to reach a database, policy approves the task, the OmniPriv vault injects the credential directly into the session, the agent works through a session handle without ever seeing the password, and the credential is rotated when the session ends">
            <Bar icon={KeyRound} title="credential brokering" />
            <div className="relative grid grid-cols-3 gap-2 px-4 pt-5" aria-hidden="true">
                <span className="absolute left-[16%] right-[16%] top-[2.6rem] h-px bg-white/[0.1]" />
                {nodes.map((n, k) => {
                    const on = BROKER[i].n === k;
                    return (
                        <div key={n.t} className="relative flex min-w-0 flex-col items-center text-center">
                            <span className={`relative inline-flex w-11 h-11 items-center justify-center rounded-xl border transition-colors duration-300 ${on ? "border-[#00B8DB]/60 bg-[#0d2a33] text-[#7FE3F2]" : "border-white/[0.1] bg-[#111418] text-slate-500"}`}>
                                <n.i className="w-5 h-5" />
                            </span>
                            <span className={`mt-2 w-full truncate text-[0.75rem] font-semibold ${on ? "text-white" : "text-slate-400"}`}>{n.t}</span>
                            <span className="w-full truncate text-[0.625rem] text-slate-500">{n.s}</span>
                        </div>
                    );
                })}
            </div>
            <ol className="p-4 space-y-1.5" aria-hidden="true">
                {BROKER.map((b, k) => (
                    <li key={b.t} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-[0.75rem] transition-colors duration-300 ${k === i ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08] text-white" : k < i ? "border-white/[0.06] text-slate-400" : "border-white/[0.04] text-slate-600"}`}>
                        {k === 4 ? <RefreshCw className="w-3.5 h-3.5 shrink-0" /> : <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} />}
                        <span className="truncate">{b.t}</span>
                    </li>
                ))}
            </ol>
            <div className="mx-4 mb-4 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl border border-white/[0.07] px-3.5 py-2.5 font-mono text-[0.6875rem] text-slate-400">
                <span className="font-sans font-semibold text-slate-500">agent sees</span>
                <span className="truncate">DB_PASSWORD = ••••••••  (never exposed)</span>
            </div>
        </div>
    );
}

/* ─── Session monitoring: a recorded agent session, replayed ─── */
const EVENTS = [
    { ts: "00:00", t: "session opened · billing-db via OmniPriv", f: false },
    { ts: "00:12", t: "SELECT * FROM invoices WHERE month = 3", f: false },
    { ts: "00:31", t: "UPDATE ledger SET status = 'matched'", f: false },
    { ts: "00:47", t: "SELECT email FROM customers", f: true },
    { ts: "01:05", t: "session closed · recording sealed", f: false },
];
export function SessionReplay() {
    const { ref, i } = useLoop(EVENTS.length + 1, 1100, 0.4);
    const n = Math.min(i, EVENTS.length - 1);
    const flagged = i >= 3;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a recorded AI agent session on a billing database is replayed step by step: the session opens, two in-task queries and an update run, a query on customer emails is flagged as outside the task, and the session closes with the recording sealed">
            <Bar icon={Eye} title="session replay · ops-assistant" right={<span className="inline-flex items-center gap-1.5 text-rose-300"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> REC</span>} />
            <div className="px-4 pt-4" aria-hidden="true">
                <div className="relative h-1.5 rounded-full bg-white/[0.06]">
                    <motion.span className="absolute inset-y-0 left-0 rounded-full bg-[#00B8DB]" initial={false} animate={{ width: `${(n / (EVENTS.length - 1)) * 100}%` }} transition={{ duration: 0.5, ease }} />
                    {EVENTS.map((e, k) => (
                        <span key={e.ts} className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-[#0b0d10] ${e.f ? "bg-amber-400" : k <= n ? "bg-[#7FE3F2]" : "bg-white/20"}`} style={{ left: `${(k / (EVENTS.length - 1)) * 100}%` }} />
                    ))}
                </div>
            </div>
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {EVENTS.map((e, k) => {
                    const on = k <= n;
                    const cur = k === n;
                    return (
                        <li key={e.ts} className={`grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${e.f && on ? "border-amber-400/45 bg-amber-400/[0.08]" : cur ? "border-white/[0.14] bg-white/[0.05]" : "border-white/[0.05] bg-white/[0.02]"}`}>
                            <span className={`font-mono text-[0.625rem] tabular-nums ${on ? "text-slate-400" : "text-slate-600"}`}>{e.ts}</span>
                            <span className={`truncate font-mono text-[0.6875rem] ${on ? (e.f ? "text-amber-100" : "text-slate-200") : "text-slate-600"}`}>{e.t}</span>
                            {e.f && on ? <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold text-amber-300"><AlertTriangle className="w-3 h-3" /> outside task</span> : <span className="w-3" />}
                        </li>
                    );
                })}
            </ul>
            <div className="grid grid-cols-3 gap-2 px-4 pb-4 text-center" aria-hidden="true">
                {[
                    { k: "Accessed", v: "billing-db" },
                    { k: "Actions", v: String(Math.max(0, Math.min(n, 3))) },
                    { k: "Unusual", v: flagged ? "1 flagged" : "none" },
                ].map((s) => (
                    <div key={s.k} className={`rounded-xl border px-2 py-2 ${s.k === "Unusual" && flagged ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                        <div className="text-[0.625rem] text-slate-500">{s.k}</div>
                        <div className={`truncate text-[0.75rem] font-semibold tabular-nums ${s.k === "Unusual" && flagged ? "text-amber-200" : "text-white"}`}>{s.v}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ─── Detection: signals add up to a risk score, and the score picks the response ─── */
const SIGNALS = [
    { t: "Off its normal pattern", s: 18 },
    { t: "Unexpected privileged command", s: 26 },
    { t: "Unusual access time", s: 12 },
    { t: "Excessive data activity", s: 22 },
];
const TIERS = [
    { t: "Observe", from: 0, tone: "text-slate-300" },
    { t: "Escalate", from: 40, tone: "text-amber-300" },
    { t: "Block", from: 70, tone: "text-rose-300" },
];
export function RiskScore() {
    const { ref, i, reduce } = useLoop(SIGNALS.length + 3, 1100, 0.4);
    const n = Math.min(i, SIGNALS.length);
    const score = SIGNALS.slice(0, n).reduce((s, x) => s + x.s, 0);
    const tier = [...TIERS].reverse().find((t) => score >= t.from)!;
    const sweep = reduce ? 10 : 10 - ((i * 1.1) % 10);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: the AI-PAM engine scores an agent's privileged activity on a continuous sweep; behaviour off its normal pattern, an unexpected privileged command, an unusual access time and excessive data activity add up to a high risk score, which escalates and then blocks the session">
            <Bar icon={Radar} title="AI-PAM engine · risk scoring" right={<span className="tabular-nums">next sweep {Math.ceil(sweep)}s</span>} />
            <div className="p-4" aria-hidden="true">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <div className="text-[0.6875rem] text-slate-500">Risk score · ops-assistant</div>
                        <div className="mt-1 text-[2.25rem] leading-none font-bold tabular-nums text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            {score}
                        </div>
                    </div>
                    <span className={`rounded-lg border border-white/[0.1] bg-white/[0.04] px-2.5 py-1.5 text-[0.75rem] font-semibold transition-colors duration-300 ${tier.tone}`}>{tier.t}</span>
                </div>
                <div className="relative mt-4 h-2.5 rounded-full bg-gradient-to-r from-slate-600/40 via-amber-400/40 to-rose-500/50">
                    <motion.span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white bg-[#0b0d10]" initial={false} animate={{ left: `${Math.min(score, 100)}%` }} transition={{ duration: 0.5, ease }} />
                </div>
                <div className="mt-1.5 grid grid-cols-[40fr_30fr_30fr] text-[0.625rem] text-slate-500">
                    {TIERS.map((t) => (
                        <span key={t.t}>{t.t}</span>
                    ))}
                </div>
                <ul className="mt-4 space-y-1.5">
                    {SIGNALS.map((s, k) => {
                        const on = k < n;
                        return (
                            <li key={s.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${on ? "border-white/[0.1] bg-white/[0.04]" : "border-white/[0.04]"}`}>
                                <Activity className={`w-3.5 h-3.5 ${on ? "text-amber-300" : "text-slate-600"}`} />
                                <span className={`truncate text-[0.75rem] ${on ? "text-slate-200" : "text-slate-600"}`}>{s.t}</span>
                                <span className={`font-mono text-[0.6875rem] tabular-nums ${on ? "text-amber-200" : "text-slate-600"}`}>+{s.s}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${tier.t === "Block" ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-300" : "border-white/[0.07] text-slate-500"}`}>
                {tier.t === "Block" ? <Ban className="w-4 h-4 shrink-0" /> : <Search className="w-4 h-4 shrink-0" />}
                <span className="truncate">{tier.t === "Block" ? "Session blocked, security team alerted" : "PAM controls stay in force, scoring adds context"}</span>
            </div>
        </div>
    );
}

/* ─── Boundaries: the six things every agent should carry ─── */
const PASSPORT = [
    { k: "Identity", v: "agt_7f3c · its own", i: Fingerprint },
    { k: "Tool scope", v: "3 tools allowed", i: Boxes },
    { k: "Data scope", v: "invoices, ledger", i: Database },
    { k: "Privilege", v: "none standing · JIT 15 min", i: Timer },
    { k: "Approval", v: "high-risk → 2 approvers", i: UserCheck },
    { k: "Activity", v: "every action recorded", i: ScrollText },
];
export function AgentPassport() {
    const { ref, i } = useLoop(PASSPORT.length, 1100, 0.4);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an AI agent's governance profile carries its own identity, a defined tool scope, a bounded data scope, no standing privilege, human approval for high-risk actions and a record of every action">
            <Bar icon={Bot} title="agent profile · ops-assistant" />
            <ul className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2" aria-hidden="true">
                {PASSPORT.map((p, k) => {
                    const on = k === i;
                    return (
                        <li key={p.k} className={`flex min-w-0 items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB]/20 text-[#7FE3F2]" : "bg-white/[0.04] text-slate-500"}`}>
                                <p.i className="w-4 h-4" />
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[0.6875rem] text-slate-500">{p.k}</span>
                                <span className={`block truncate text-[0.75rem] font-semibold ${on ? "text-white" : "text-slate-300"}`}>{p.v}</span>
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.07] px-3.5 py-2.5 text-[0.75rem] font-semibold text-emerald-300">
                <Check className="w-4 h-4 shrink-0" strokeWidth={3} /> Every action explainable and auditable
            </div>
        </div>
    );
}

/* ─── Infrastructure: one control point between agents and everything they touch ─── */
const TARGETS = [
    { t: "Cloud environments", s: "AWS · Azure · GCP · Kubernetes", i: Cloud },
    { t: "Databases", s: "production data stores", i: Database },
    { t: "Applications and APIs", s: "enterprise tools · internal services", i: Globe },
    { t: "DevOps environments", s: "CI/CD · repositories · secrets", i: GitBranch },
];
export function InfraReach() {
    const { ref, i } = useLoop(TARGETS.length, 1300, 0.4);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: AI agents reach cloud environments, databases, applications and APIs, and DevOps environments only through OmniPriv, which applies the same identity, policy and recording to each">
            <Bar icon={Server} title="agent reach · one control point" />
            <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,0.9fr)_minmax(0,1.6fr)] items-center gap-2 p-4" aria-hidden="true">
                <div className="flex flex-col items-center gap-1.5 text-center">
                    <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                        <Bot className="w-5 h-5" />
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-slate-300">AI agents</span>
                </div>
                <div className="relative flex flex-col items-center gap-1.5 text-center">
                    <span className="absolute right-full top-[1.375rem] w-[40%] h-px bg-[#00B8DB]/40" />
                    <span className="inline-flex w-12 h-12 items-center justify-center rounded-2xl border border-[#00B8DB]/50 bg-[#0d2a33] text-[#7FE3F2]">
                        <ShieldCheck className="w-6 h-6" />
                    </span>
                    <span className="text-[0.6875rem] font-semibold text-white">OmniPriv</span>
                </div>
                <ul className="space-y-1.5">
                    {TARGETS.map((t, k) => {
                        const on = k === i;
                        return (
                            <li key={t.t} className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <t.i className={`w-4 h-4 shrink-0 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                                <span className="min-w-0">
                                    <span className={`block truncate text-[0.6875rem] font-semibold ${on ? "text-white" : "text-slate-300"}`}>{t.t}</span>
                                    <span className="block truncate text-[0.625rem] text-slate-500">{t.s}</span>
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="grid grid-cols-3 gap-2 px-4 pb-4 text-center text-[0.6875rem] font-semibold" aria-hidden="true">
                {["Same identity", "Same policy", "Same recording"].map((x) => (
                    <span key={x} className="truncate rounded-lg border border-white/[0.07] bg-white/[0.02] px-2 py-2 text-slate-300">
                        {x}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── Why OmniPriv: the seven capabilities, lit one after another, in one platform ─── */
const WHY_ICONS = [Search, ShieldCheck, KeyRound, Eye, Radar, Bot, ScrollText];
export function WhyStack({ reasons }: { reasons: string[] }) {
    const { ref, i, reduce } = useLoop(reasons.length + 2, 700, 0.4);
    const lit = reduce ? reasons.length : Math.min(i + 1, reasons.length);
    return (
        <div ref={ref} className="aip-card rounded-3xl border p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
                <span className="op-card-title text-[0.9375rem]">One platform</span>
                <span className="text-[0.75rem] font-semibold tabular-nums text-[#00667A] dark:text-[#7FE3F2]" aria-hidden="true">
                    {lit} of {reasons.length}
                </span>
            </div>
            <ul className="mt-4 space-y-2">
                {reasons.map((r, k) => {
                    const Icon = WHY_ICONS[k % WHY_ICONS.length];
                    const on = k < lit;
                    return (
                        <li key={r} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.06]" : "border-slate-900/[0.06] dark:border-white/[0.06]"}`}>
                            <span className={`inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB]/15 text-[#00667A] dark:text-[#7FE3F2]" : "bg-slate-900/[0.04] dark:bg-white/[0.04] text-slate-400"}`}>
                                <Icon className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span className={`text-[0.875rem] font-medium transition-colors duration-300 ${on ? "text-slate-900 dark:text-white" : "text-slate-500"}`}>{r}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
