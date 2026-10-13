"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Ban, Check, Clock, Database, GitBranch, KeyRound, Lock, Server, ServerCog, ShieldCheck, Terminal, User, X } from "lucide-react";

/* Illustrations for /solutions/machine-identity-security. Values are illustrative. */

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

/* What managing a machine identity means: the four questions the copy asks, answered for one. */
export function IdentityAnatomy() {
    const { ref, i } = useLoop(5, 1100);
    const rows = [
        { q: "Who owns this credential?", a: "Payments platform team", i: User },
        { q: "What can it reach?", a: "orders-db, payments-api", i: Server },
        { q: "How much privilege?", a: "read/write on 2 schemas, no admin", i: KeyRound },
        { q: "Is access still necessary?", a: "Yes · last used 2 h ago", i: Clock },
    ];
    const types = ["Password", "API token", "SSH key", "Cloud role", "Secret", "Short-lived token"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a machine identity record shows which credential it uses, who owns it, what resources it can reach, how much privilege it has and whether that access is still needed">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.08]">
                <span className="inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                    <ServerCog className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                    <span className="block truncate font-mono text-[0.8125rem] font-semibold text-white">payments-sa</span>
                    <span className="block text-[0.6875rem] text-slate-500">Kubernetes service account</span>
                </span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="px-4 pt-4">
                <div className="text-[0.6875rem] text-slate-500 mb-2">Credentials a machine identity may rely on</div>
                <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                    {types.map((t) => (
                        <span key={t} className={`rounded-md border px-2 py-1 text-[0.6875rem] ${t === "Short-lived token" ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1] text-[#7FE3F2] font-semibold" : "border-white/[0.07] text-slate-400"}`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <ul className="p-4 space-y-1.5">
                {rows.map((r, k) => (
                    <li key={r.q} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border px-3.5 py-2.5 transition-colors duration-300 ${k === i ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                        <r.i className="w-4 h-4 mt-0.5 text-[#7FE3F2]" aria-hidden="true" />
                        <span className="min-w-0">
                            <span className="block text-[0.6875rem] text-slate-400">{r.q}</span>
                            <span className={`block truncate text-[0.8125rem] font-semibold transition-colors duration-300 ${k <= i ? "text-white" : "text-slate-500"}`}>{r.a}</span>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* Risk → control: each problem the copy names, paired with the control that answers it. */
const PAIRS = [
    { r: "Long-lived secrets stay active past their purpose", c: "Automated rotation for passwords, SSH keys and API tokens" },
    { r: "Service accounts accumulate excessive privilege", c: "Least-privilege policies and service-account controls" },
    { r: "Tokens embedded in scripts and pipelines", c: "Dynamic, short-lived secrets and run-time injection" },
    { r: "Unclear which workload touched a critical resource", c: "Audit, session visibility and SIEM forwarding" },
];
export function RiskControlMap() {
    const { ref, i, reduce } = useLoop(PAIRS.length + 1, 1300);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: four machine identity risks, each paired with the OmniPriv control that reduces it">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Risk → control</span>
            </div>
            <ul className="p-4 space-y-2">
                {PAIRS.map((p, k) => {
                    const on = reduce || k < i;
                    return (
                        <li key={p.r} className="grid grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] items-stretch gap-1.5">
                            <span className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[0.75rem] leading-snug transition-colors duration-300 ${on ? "border-white/[0.06] bg-white/[0.02] text-slate-500 line-through decoration-rose-400/50" : "border-amber-400/35 bg-amber-400/[0.06] text-amber-100"}`}>
                                {p.r}
                            </span>
                            <span className="flex items-center justify-center" aria-hidden="true">
                                <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${on ? "text-[#7FE3F2]" : "text-slate-600"}`} />
                            </span>
                            <motion.span initial={false} animate={{ opacity: on ? 1 : 0.25 }} transition={{ duration: 0.35, ease }} className="flex items-center gap-2 rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.07] px-3 py-2.5 text-[0.75rem] font-medium leading-snug text-white">
                                <Check className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />
                                {p.c}
                            </motion.span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* CI/CD: the pipeline gets a short-lived credential at run time instead of a stored secret. */
const FLOWS = [
    {
        k: "GitHub Actions",
        steps: [
            { t: "checkout", d: "repo · main" },
            { t: "request token", d: "OIDC identity of this run" },
            { t: "inject", d: "short-lived token, scoped to deploy" },
            { t: "deploy", d: "terraform apply · prod" },
            { t: "expire", d: "token gone when the job ends" },
        ],
    },
    {
        k: "Jenkins",
        steps: [
            { t: "build", d: "orders-service #482" },
            { t: "request credential", d: "dynamic, for this build only" },
            { t: "inject", d: "into the job environment" },
            { t: "migrate", d: "orders-db schema update" },
            { t: "revoke", d: "credential retired after the build" },
        ],
    },
];
export function PipelineVisual() {
    const { ref, i, reduce } = useLoop(14, 800, 0.35);
    const flow = FLOWS[Math.floor(i / 7) % 2];
    const step = Math.min(i % 7, 5);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a GitHub Actions run receives an OIDC-based short-lived token at run time and a Jenkins build receives a dynamic credential injected for that build only; neither stores a privileged secret in the pipeline configuration">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <GitBranch className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Pipeline credentials</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {FLOWS.map((f) => (
                    <span key={f.k} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${f.k === flow.k ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {f.k}
                    </span>
                ))}
            </div>
            <AnimatePresence mode="wait" initial={false}>
                <motion.ol key={flow.k} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} className="p-4 space-y-1.5">
                    {flow.steps.map((s, k) => {
                        const done = reduce || k < step;
                        const now = !reduce && k === step;
                        const key = s.t === "inject";
                        return (
                            <li key={s.t} className={`grid grid-cols-[1.25rem_7rem_minmax(0,1fr)] items-center gap-2.5 rounded-lg border px-3 py-2 text-[0.75rem] transition-colors duration-300 ${now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.09]" : key && done ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.05]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <span className={`inline-flex w-4 h-4 items-center justify-center rounded-full border ${done ? "border-[#00B8DB]/60 bg-[#00B8DB]/20 text-[#7FE3F2]" : now ? "border-[#00B8DB]/70" : "border-white/15"}`}>
                                    {done ? <Check className="w-2.5 h-2.5" strokeWidth={3.5} /> : now ? <span className="w-1.5 h-1.5 rounded-full bg-[#7FE3F2] aip-blink" /> : null}
                                </span>
                                <span className={`font-mono font-semibold ${done || now ? "text-white" : "text-slate-500"}`}>{s.t}</span>
                                <span className={`truncate ${done || now ? "text-slate-300" : "text-slate-600"}`}>{s.d}</span>
                            </li>
                        );
                    })}
                </motion.ol>
            </AnimatePresence>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3.5 py-2.5 font-mono text-[0.6875rem] text-slate-400">
                <Ban className="w-3.5 h-3.5 shrink-0 text-rose-300" aria-hidden="true" />
                <span className="truncate">secrets in pipeline config: <span className="text-rose-200 line-through decoration-rose-400/60">PROD_DB_PASSWORD</span></span>
            </div>
        </div>
    );
}

/* Least privilege: an over-scoped service account trimmed to what the job uses. */
const PERMS = [
    { p: "orders-db: SELECT, INSERT", keep: true },
    { p: "orders-db: DROP, ALTER", keep: false },
    { p: "payments-api: POST /charge", keep: true },
    { p: "billing-db: *", keep: false },
    { p: "prod-k8s: cluster-admin", keep: false },
    { p: "logs: write", keep: true },
];
export function ScopeVisual() {
    const { ref, i, reduce } = useLoop(PERMS.length + 3, 700, 0.45);
    const cut = reduce ? PERMS.length : Math.min(i, PERMS.length);
    const removed = PERMS.slice(0, cut).filter((p) => !p.keep).length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a service account's permissions are reviewed and trimmed to only what its job needs; database admin rights, access to an unrelated database and cluster-admin are removed">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ServerCog className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">svc-orders · permissions</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-emerald-300 shrink-0 tabular-nums">{removed} removed</span>
            </div>
            <ul className="p-4 space-y-1.5 font-mono text-[0.75rem]">
                {PERMS.map((p, k) => {
                    const reviewed = k < cut;
                    const gone = reviewed && !p.keep;
                    return (
                        <li key={p.p} className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${gone ? "border-white/[0.04] bg-transparent" : reviewed ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.06]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            {gone ? <X className="w-3.5 h-3.5 shrink-0 text-rose-300" aria-hidden="true" /> : reviewed ? <Check className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" /> : <span className="w-3.5 h-3.5 shrink-0 rounded-full border border-white/15" aria-hidden="true" />}
                            <span className={`truncate ${gone ? "text-slate-600 line-through decoration-rose-400/50" : "text-slate-200"}`}>{p.p}</span>
                            {gone && <span className="ml-auto shrink-0 font-sans text-[0.625rem] text-slate-500">not needed</span>}
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3.5 py-2.5 text-[0.75rem] text-slate-300">
                <Lock className="w-4 h-4 shrink-0 text-[#7FE3F2]" aria-hidden="true" /> Credential vaulted and rotated · activity monitored
            </div>
        </div>
    );
}

/* Monitoring: machine sessions across protocols, with query control and script monitoring. */
const SESSIONS = [
    { who: "svc-etl", via: "Database", what: "SELECT orders WHERE day = today", ok: true, i: Database },
    { who: "terraform", via: "HTTP", what: "PUT /v1/vpc/prod-net · 200", ok: true, i: Server },
    { who: "svc-backup", via: "SSH", what: "backup.sh · 14 commands", ok: true, i: Terminal },
    { who: "svc-etl", via: "Database", what: "DELETE FROM customers", ok: false, i: Database },
    { who: "crm-app", via: "Database", what: "UPDATE contacts SET … (1 row)", ok: true, i: Database },
];
export function MachineSessions() {
    const { ref, i, reduce } = useLoop(SESSIONS.length + 2, 1000, 0.35);
    const shown = reduce ? SESSIONS.length : Math.min(i + 1, SESSIONS.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: privileged sessions opened by machine identities over database, HTTP and SSH are recorded and searchable; a destructive database query is blocked by query controls">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                </span>
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Machine sessions · recorded, isolated</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-1.5 min-h-[14.5rem]" aria-hidden="true">
                {SESSIONS.slice(0, shown).map((s, k) => (
                    <motion.li
                        key={k}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className={`grid grid-cols-[auto_5.5rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 text-[0.6875rem] ${s.ok ? "border-white/[0.06] bg-white/[0.02]" : "border-rose-400/40 bg-rose-500/[0.08]"}`}
                    >
                        <s.i className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate font-mono font-semibold text-white">{s.who}</span>
                        <span className={`truncate font-mono ${s.ok ? "text-slate-300" : "text-rose-200 line-through decoration-rose-400/60"}`}>{s.what}</span>
                        {s.ok ? (
                            <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[0.5625rem] font-semibold text-slate-400">{s.via}</span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-[0.625rem] font-semibold text-rose-300">
                                <Ban className="w-3 h-3" /> query control
                            </span>
                        )}
                    </motion.li>
                ))}
            </ul>
            <div className="grid grid-cols-3 border-t border-white/[0.08] text-center text-[0.625rem]" aria-hidden="true">
                {[
                    ["Searchable", "histories"],
                    ["Script & HTTP", "monitoring"],
                    ["Database", "query controls"],
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
