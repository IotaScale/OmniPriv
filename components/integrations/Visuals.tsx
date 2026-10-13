"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    Check,
    Cloud,
    Database,
    GitBranch,
    Layers,
    Search,
    ShieldCheck,
    Ticket,
    Users,
    Activity,
    X,
} from "lucide-react";

/*
 * Illustrations and the browsable directory for /integrations.
 * Events, users and payloads in the illustrations are illustrative.
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

/* Icon per category, keyed by the category label on the page. */
const CAT_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
    "Identity & Access Management": Users,
    "SIEM & Security Operations": Activity,
    "ITSM & Ticketing": Ticket,
    "Cloud Platforms": Cloud,
    "DevOps & CI/CD": GitBranch,
    Databases: Database,
};

/* ─── Hero: OmniPriv in the middle of the stack, events flowing both ways ─── */
const FLOWS = [
    { cat: "Identity & Access Management", short: "Identity", from: "Okta", ev: "j.carter signed in · MFA verified", dir: "in" },
    { cat: "ITSM & Ticketing", short: "ITSM", from: "ServiceNow", ev: "JIT request CHG-2041 approved", dir: "in" },
    { cat: "Databases", short: "Databases", from: "PostgreSQL", ev: "session proxied · queries audited", dir: "out" },
    { cat: "SIEM & Security Operations", short: "SIEM", from: "Splunk", ev: "session events streamed", dir: "out" },
    { cat: "DevOps & CI/CD", short: "CI/CD", from: "GitHub Actions", ev: "short-lived token injected", dir: "out" },
    { cat: "Cloud Platforms", short: "Cloud", from: "AWS", ev: "IAM secret rotated", dir: "out" },
];
export function IntegrationsHero() {
    const { ref, i } = useLoop(FLOWS.length, 1300, 0.3);
    const f = FLOWS[i];
    const log = Array.from({ length: 4 }, (_, k) => FLOWS[(i - k + FLOWS.length) % FLOWS.length]);
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: OmniPriv sits in the middle of the existing stack; a sign-in arrives from the identity provider, a just-in-time request is approved in the ticketing system, a database session is proxied and audited, events stream to the SIEM, a short-lived token is injected into a CI pipeline and a cloud secret is rotated">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">OmniPriv · connected to your stack</span>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 p-4" aria-hidden="true">
                <ul className="space-y-1.5">
                    {FLOWS.slice(0, 3).map((x) => {
                        const Icon = CAT_ICON[x.cat];
                        const on = x === f;
                        return (
                            <li key={x.cat} className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                                <Icon className={`w-4 h-4 shrink-0 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                                <span className={`truncate text-[0.6875rem] font-semibold ${on ? "text-white" : "text-slate-400"}`}>{x.short}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="relative flex flex-col items-center">
                    <span className="relative inline-flex w-14 h-14 items-center justify-center rounded-2xl border border-[#00B8DB]/55 bg-[#0d2a33] text-[#7FE3F2]">
                        <Layers className="w-6 h-6" />
                        <motion.span key={i} className="absolute inset-0 rounded-2xl ring-2 ring-[#00B8DB]/50" initial={{ opacity: 0.9, scale: 1 }} animate={{ opacity: 0, scale: 1.35 }} transition={{ duration: 0.9, ease }} />
                    </span>
                    <span className="mt-1.5 text-[0.625rem] font-semibold text-white">OmniPriv</span>
                </div>
                <ul className="space-y-1.5">
                    {FLOWS.slice(3).map((x) => {
                        const Icon = CAT_ICON[x.cat];
                        const on = x === f;
                        return (
                            <li key={x.cat} className={`flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                                <Icon className={`w-4 h-4 shrink-0 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                                <span className={`truncate text-[0.6875rem] font-semibold ${on ? "text-white" : "text-slate-400"}`}>{x.short}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <ul className="px-4 pb-4 space-y-1.5" aria-hidden="true">
                {log.map((x, k) => (
                    <li key={`${x.from}-${k}`} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${k === 0 ? "border-white/[0.12] bg-white/[0.05]" : "border-white/[0.05] bg-white/[0.02]"}`} style={{ opacity: 1 - k * 0.2 }}>
                        <span className={`rounded px-1.5 py-0.5 font-mono text-[0.5625rem] font-semibold ${x.dir === "in" ? "bg-amber-400/[0.12] text-amber-200" : "bg-[#00B8DB]/[0.14] text-[#7FE3F2]"}`}>{x.dir === "in" ? "IN" : "OUT"}</span>
                        <span className="truncate text-[0.6875rem] text-slate-200">
                            <span className="font-semibold text-white">{x.from}</span> · {x.ev}
                        </span>
                        <Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} />
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Works with your workflows, not against them</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── REST API: a call and its response ─── */
const CALLS = [
    { m: "GET", p: "/api/v1/sessions?status=active", r: ['{ "id": "ses_8f21",', '  "user": "j.carter",', '  "asset": "sql-prod-02",', '  "protocol": "ssh",', '  "recording": true }'] },
    { m: "POST", p: "/api/v1/access-requests", r: ['{ "id": "req_4471",', '  "asset": "esxi-03",', '  "duration": "30m",', '  "status": "pending_approval",', '  "approvers": 2 }'] },
    { m: "POST", p: "/api/v1/credentials/rotate", r: ['{ "job": "rot_2207",', '  "targets": 312,', '  "status": "running",', '  "push": true,', '  "started": "02:00" }'] },
];
export function ApiConsole() {
    const { ref, i } = useLoop(CALLS.length, 2600, 0.4);
    const c = CALLS[i];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: the OmniPriv REST API lists active privileged sessions, creates a just-in-time access request and starts a credential rotation job, each returning JSON">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">REST API</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-4 font-mono text-[0.75rem]" aria-hidden="true">
                <motion.div key={`req-${i}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-3">
                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[0.625rem] font-semibold ${c.m === "GET" ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-200"}`}>{c.m}</span>
                    <span className="truncate text-slate-200">{c.p}</span>
                </motion.div>
                <div className="mt-3 flex items-center gap-2 text-[0.6875rem] text-slate-500">
                    <span className="rounded bg-emerald-400/15 px-1.5 py-0.5 font-semibold text-emerald-300">{c.m === "GET" ? "200" : "201"}</span> application/json
                </div>
                <pre className="mt-2 h-[8.5rem] overflow-hidden rounded-xl border border-white/[0.06] bg-black/30 px-3.5 py-3 leading-relaxed text-slate-300">
                    {c.r.map((line, k) => (
                        <motion.span key={`${i}-${k}`} className="block truncate" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay: 0.15 + k * 0.07 }}>
                            {line}
                        </motion.span>
                    ))}
                </pre>
            </div>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.07] px-3.5 py-2.5 text-[0.75rem] font-semibold text-slate-400">
                <Check className="w-4 h-4 shrink-0 text-[#7FE3F2]" strokeWidth={3} /> Every platform action is API-accessible
            </div>
        </div>
    );
}

/* ─── Directory: search and filter every integration listed on the page ─── */
export interface Integration {
    name: string;
    desc: string;
    category: string;
}
export interface IntegrationCategory {
    label: string;
    description: string;
    integrations: Integration[];
}

export function IntegrationExplorer({ categories }: { categories: IntegrationCategory[] }) {
    const [q, setQ] = useState("");
    const [cat, setCat] = useState<string>("All");
    const query = q.trim().toLowerCase();
    const total = categories.reduce((s, c) => s + c.integrations.length, 0);

    const visible = useMemo(
        () =>
            categories
                .filter((c) => cat === "All" || c.label === cat)
                .map((c) => ({
                    ...c,
                    integrations: c.integrations.filter((x) => !query || `${x.name} ${x.desc} ${x.category}`.toLowerCase().includes(query)),
                }))
                .filter((c) => c.integrations.length > 0),
        [categories, cat, query],
    );
    const shown = visible.reduce((s, c) => s + c.integrations.length, 0);

    return (
        <div>
            <div>
                <div className="flex flex-col gap-3">
                    <label className="relative block sm:max-w-sm">
                        <span className="sr-only">Search integrations</span>
                        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search Okta, Splunk, Kubernetes…"
                            className="w-full h-11 rounded-xl border border-slate-900/[0.1] dark:border-white/[0.1] bg-white dark:bg-[#15171a] pl-10 pr-10 text-[0.9375rem] text-slate-900 dark:text-white placeholder:text-slate-500 outline-none focus-visible:border-[#00B8DB] focus-visible:ring-2 focus-visible:ring-[#00B8DB]/30"
                        />
                        {q && (
                            <button type="button" onClick={() => setQ("")} className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex w-8 h-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-900/[0.05] dark:hover:bg-white/[0.06]" aria-label="Clear search">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </label>
                    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0" role="group" aria-label="Filter by category">
                        {["All", ...categories.map((c) => c.label)].map((l) => {
                            const on = cat === l;
                            const Icon = CAT_ICON[l];
                            return (
                                <button
                                    key={l}
                                    type="button"
                                    onClick={() => setCat(l)}
                                    aria-pressed={on}
                                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 h-9 text-[0.8125rem] font-semibold transition-colors duration-150 active:scale-[0.97] ${on ? "border-[#00B8DB] bg-[#00B8DB]/[0.1] text-[#00667A] dark:text-[#7FE3F2]" : "border-slate-900/[0.1] dark:border-white/[0.1] text-slate-600 dark:text-slate-400 hover:border-[#00B8DB]/50"}`}
                                >
                                    {Icon && <Icon className="w-3.5 h-3.5" aria-hidden="true" />}
                                    {l === "All" ? `All · ${total}` : l}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <p className="mt-3 text-[0.8125rem] text-slate-500" aria-live="polite">
                    {shown === total ? `${total} integrations listed` : `${shown} of ${total} integrations`}
                </p>
            </div>

            {visible.length === 0 ? (
                <div className="mt-10 rounded-3xl border border-dashed border-slate-900/[0.12] dark:border-white/[0.12] px-6 py-14 text-center">
                    <div className="op-card-title">No listed integration matches “{q}”</div>
                    <p className="mt-2 text-[0.9375rem] text-slate-600 dark:text-slate-400">Custom connectors can be built with the open SDK, or requested from the integration team below.</p>
                    <button type="button" onClick={() => { setQ(""); setCat("All"); }} className="mt-5 op-link text-[0.9375rem] font-semibold">
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className="mt-10 space-y-16 lg:space-y-20">
                    {visible.map((c) => {
                        const Icon = CAT_ICON[c.label] ?? Layers;
                        return (
                            <div key={c.label}>
                                <div className="grid lg:grid-cols-[minmax(0,1fr)_auto] gap-4 items-end">
                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper shrink-0">
                                                <Icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h2 className="op-h3">{c.label}</h2>
                                        </div>
                                        <p className="mt-3 text-[1.0156rem] leading-relaxed text-slate-600 dark:text-slate-400">{c.description}</p>
                                    </div>
                                    <span className="text-[0.8125rem] font-semibold tabular-nums text-slate-500">{c.integrations.length} listed</span>
                                </div>
                                <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {c.integrations.map((x) => (
                                        <li key={x.name} className="aip-card min-w-0 rounded-2xl border p-5">
                                            <div className="flex items-center gap-3">
                                                <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/[0.08] text-[0.625rem] font-bold text-[#00667A] dark:text-[#7FE3F2] ring-1 ring-[#00B8DB]/20" aria-hidden="true">
                                                    {x.name.substring(0, 3).toUpperCase()}
                                                </span>
                                                <span className="min-w-0">
                                                    <h3 className="op-card-title text-[0.9375rem] leading-tight">{x.name}</h3>
                                                    <span className="mt-0.5 block text-[0.75rem] text-slate-500 dark:text-slate-400">{x.category}</span>
                                                </span>
                                            </div>
                                            <p className="op-card-text mt-3 text-[0.875rem]">{x.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
