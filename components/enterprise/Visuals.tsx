"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, CheckCircle2, Clock, Headphones, Layers, Server, ShieldCheck, UserCheck, Users, Zap } from "lucide-react";

/*
 * Illustrations and the plan picker for /enterprise. Org names, user counts
 * and timings in the illustrations are illustrative.
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

export interface Plan {
    name: string;
    seats: string;
    assets: string;
    ha: string;
    highlight: boolean;
    badge?: string;
    description: string;
    features: string[];
}

/* ─── Hero: the platform sized to the organisation ─── */
const SIZES = [
    { users: "40 users", plan: "Basic", nodes: 1, ha: "Single node", where: "On-premises" },
    { users: "420 users", plan: "Standard", nodes: 2, ha: "Active-standby", where: "Private cloud" },
    { users: "3,800 users", plan: "Professional", nodes: 2, ha: "Cluster · active-standby", where: "Multi-cloud" },
    { users: "25,000 users", plan: "Enterprise", nodes: 3, ha: "Full HA cluster", where: "Any topology · air-gapped" },
];
export function EnterpriseHero() {
    const { ref, i } = useLoop(SIZES.length, 2200, 0.3);
    const s = SIZES[i];
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: the same complete OmniPriv platform sized to the organisation, from a single node for a small team on the Basic plan, to active-standby on Standard, a cluster on Professional, and a full high-availability cluster in any topology on Enterprise">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">One platform · sized to you</span>
            </div>

            <div className="px-4 pt-4" aria-hidden="true">
                <div className="flex items-center justify-between text-[0.6875rem] text-slate-500">
                    <span>Organisation size</span>
                    <span className="font-mono tabular-nums text-white">{s.users}</span>
                </div>
                <div className="relative mt-2 h-2 rounded-full bg-white/[0.06]">
                    <motion.span className="absolute inset-y-0 left-0 rounded-full bg-[#00B8DB]" initial={false} animate={{ width: `${((i + 1) / SIZES.length) * 100}%` }} transition={{ duration: 0.6, ease }} />
                </div>
                <ol className="mt-3 grid grid-cols-4 gap-1.5">
                    {SIZES.map((x, k) => (
                        <li key={x.plan} className={`truncate rounded-lg py-1.5 text-center text-[0.6875rem] font-semibold transition-colors duration-300 ${k === i ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                            {x.plan}
                        </li>
                    ))}
                </ol>
            </div>

            <div className="px-4 pt-4" aria-hidden="true">
                <div className="flex h-36 items-center justify-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-3">
                    {Array.from({ length: s.nodes }).map((_, k) => (
                        <motion.div key={`${s.plan}-${k}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: k * 0.08, ease }} className="flex items-center gap-3">
                            {k > 0 && <span className="h-px w-4 sm:w-7 bg-[#00B8DB]/40" />}
                            <div className={`flex w-[4.75rem] sm:w-24 flex-col items-center gap-1.5 rounded-xl border px-2 py-3 ${s.plan !== "Enterprise" && k === 1 ? "border-dashed border-white/[0.15]" : "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08]"}`}>
                                <Layers className={`w-5 h-5 ${s.plan !== "Enterprise" && k === 1 ? "text-slate-500" : "text-[#7FE3F2]"}`} />
                                <span className="font-mono text-[0.6875rem] text-white">node-0{k + 1}</span>
                                <span className="text-[0.5625rem] uppercase tracking-[0.08em] text-slate-500">{s.plan !== "Enterprise" && k === 1 ? "standby" : "active"}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <dl className="grid grid-cols-2 gap-2 p-4" aria-hidden="true">
                {[
                    { k: "High availability", v: s.ha, i: Zap },
                    { k: "Deployment", v: s.where, i: Server },
                ].map((d) => (
                    <div key={d.k} className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2.5">
                        <dt className="flex items-center gap-1.5 text-[0.625rem] text-slate-500">
                            <d.i className="w-3 h-3" /> {d.k}
                        </dt>
                        <dd className="mt-1 truncate text-[0.75rem] font-semibold text-white">{d.v}</dd>
                    </div>
                ))}
            </dl>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Complete security platform on every plan</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Plans, with a size picker that points at the right one ─── */
const PICKS = [
    { t: "Up to 50", plan: "Basic" },
    { t: "Up to 500", plan: "Standard" },
    { t: "Up to 5,000", plan: "Professional" },
    { t: "More than 5,000", plan: "Enterprise" },
];
export function PlanPicker({ plans }: { plans: Plan[] }) {
    const [pick, setPick] = useState<string | null>(null);
    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3" data-aos="fade-up">
                <span className="text-[0.875rem] font-semibold text-[#0a1628] dark:text-white">How many users need privileged access?</span>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Number of users">
                    {PICKS.map((p) => {
                        const on = pick === p.plan;
                        return (
                            <button
                                key={p.plan}
                                type="button"
                                aria-pressed={on}
                                onClick={() => setPick(on ? null : p.plan)}
                                className={`h-9 rounded-full border px-3.5 text-[0.8125rem] font-semibold transition-colors duration-150 active:scale-[0.97] ${on ? "border-[#00B8DB] bg-[#00B8DB]/[0.1] text-[#00667A] dark:text-[#7FE3F2]" : "border-slate-900/[0.1] dark:border-white/[0.1] text-slate-600 dark:text-slate-400 hover:border-[#00B8DB]/50"}`}
                            >
                                {p.t}
                            </button>
                        );
                    })}
                </div>
            </div>
            <p className="sr-only" aria-live="polite">
                {pick ? `${pick} plan highlighted` : ""}
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {plans.map((plan) => {
                    const chosen = pick === plan.name;
                    const dim = pick !== null && !chosen;
                    const lead = chosen || (pick === null && plan.highlight);
                    return (
                        <li
                            key={plan.name}
                            className={`relative flex flex-col rounded-3xl border bg-white dark:bg-[#15171A] transition-[opacity,border-color,box-shadow] duration-300 ${lead ? "border-[#00B8DB]/60 shadow-[0_18px_40px_-20px_rgba(0,184,219,0.45)]" : "border-slate-900/[0.08] dark:border-white/[0.08]"} ${dim ? "opacity-55" : "opacity-100"}`}
                        >
                            <div className="p-6 border-b border-slate-900/[0.06] dark:border-white/[0.06]">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="op-h3">{plan.name}</h3>
                                    {plan.badge && <span className="badge-cyan text-[0.625rem]">{plan.badge}</span>}
                                    {chosen && <span className="rounded-full bg-[#00B8DB] px-2 py-0.5 text-[0.625rem] font-semibold text-[#04222a]">Fits your size</span>}
                                </div>
                                <p className="op-card-text mt-2">{plan.description}</p>
                                <ul className="mt-4 space-y-2 text-[0.875rem] text-slate-600 dark:text-slate-400">
                                    {[
                                        { i: Users, t: plan.seats },
                                        { i: Server, t: plan.assets },
                                        { i: Zap, t: `HA: ${plan.ha}` },
                                    ].map((r) => (
                                        <li key={r.t} className="flex items-center gap-2">
                                            <r.i className="w-4 h-4 shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                            {r.t}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5">
                                    <div className="text-[0.875rem] font-semibold text-[#0a1628] dark:text-white">Custom Pricing</div>
                                    <p className="mt-1 text-[0.875rem] text-slate-500 dark:text-slate-400">Contact us for a quote tailored to your needs.</p>
                                </div>
                            </div>
                            <ul className="p-6 flex-1 space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                        <span className={`text-[0.875rem] ${f.startsWith("Everything in") ? "font-semibold text-[#0a1628] dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="p-6 pt-0">
                                <Link href="/demo?intent=sales" className={`${lead ? "hp-btn-primary" : "hp-btn-secondary"} w-full`}>
                                    {plan.name === "Enterprise" ? "Contact Sales" : "Request a Demo"}
                                </Link>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

/* ─── Multi-tenant: subsidiaries isolated, each with its own policy ─── */
const TENANTS = [
    { t: "Group HQ", u: "1,240 users", p: "JIT · 4-eyes" },
    { t: "Retail subsidiary", u: "610 users", p: "JIT · 1 approver" },
    { t: "EU operations", u: "380 users", p: "office hours only" },
];
export function TenantVisual() {
    const { ref, i } = useLoop(TENANTS.length + 1, 1400, 0.4);
    const probe = i === TENANTS.length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: three business units run as separate tenants on one OmniPriv deployment, each with its own users and access policy; an attempt to reach another tenant's assets is refused">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Building2 className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">one deployment · isolated tenants</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-2" aria-hidden="true">
                {TENANTS.map((t, k) => {
                    const on = k === i;
                    return (
                        <li key={t.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-9 h-9 items-center justify-center rounded-lg ${on ? "bg-[#00B8DB]/20 text-[#7FE3F2]" : "bg-white/[0.05] text-slate-500"}`}>
                                <Building2 className="w-4 h-4" />
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate text-[0.8125rem] font-semibold text-white">{t.t}</span>
                                <span className="block truncate text-[0.6875rem] text-slate-400">
                                    {t.u} · own policies, users and assets
                                </span>
                            </span>
                            <span className="hidden sm:inline rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[0.625rem] text-slate-300">{t.p}</span>
                        </li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${probe ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-300" : "border-white/[0.07] text-slate-500"}`}>
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="truncate">{probe ? "Retail admin → HQ asset: refused, outside tenant" : "Complete resource isolation per tenant"}</span>
            </div>
        </div>
    );
}

/* ─── Support: what happens when a P1 is raised ─── */
const P1 = [
    { t: "P1 raised", d: "production access gateway degraded", i: Clock },
    { t: "Expert responds", d: "inside the critical response window", i: Headphones },
    { t: "Success Manager engaged", d: "named CSM joins the bridge", i: UserCheck },
    { t: "Failover holds service", d: "HA cluster keeps sessions running", i: Zap },
    { t: "Resolved, reviewed", d: "root cause shared with your team", i: CheckCircle2 },
];
export function SupportTimeline() {
    const { ref, i, reduce } = useLoop(P1.length + 2, 1000, 0.4);
    const n = reduce ? P1.length : Math.min(i + 1, P1.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a priority-one incident is raised, an expert responds within the critical response window, the named Customer Success Manager joins, the high-availability cluster keeps service running and the incident is resolved and reviewed">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Headphones className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">incident · severity P1</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">24/7</span>
            </div>
            <ol className="relative p-4 space-y-2" aria-hidden="true">
                <span className="absolute left-[2.1rem] top-7 bottom-7 w-px bg-white/[0.08]" />
                {P1.map((s, k) => {
                    const on = k < n;
                    const cur = k === n - 1 && i < P1.length;
                    return (
                        <li key={s.t} className={`relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${cur ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : on ? "border-white/[0.08] bg-white/[0.03]" : "border-white/[0.04]"}`}>
                            <span className={`relative inline-flex w-8 h-8 items-center justify-center rounded-lg ${on ? "bg-[#0d2a33] text-[#7FE3F2]" : "bg-[#111418] text-slate-600"}`}>
                                <s.i className="w-4 h-4" />
                            </span>
                            <span className="min-w-0">
                                <span className={`block truncate text-[0.8125rem] font-semibold ${on ? "text-white" : "text-slate-600"}`}>{s.t}</span>
                                <span className={`block truncate text-[0.6875rem] ${on ? "text-slate-400" : "text-slate-700"}`}>{s.d}</span>
                            </span>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
