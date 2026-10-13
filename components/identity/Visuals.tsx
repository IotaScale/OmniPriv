"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    AlertTriangle,
    BarChart3,
    Bot,
    Building2,
    Check,
    Clock,
    Cpu,
    Eye,
    KeyRound,
    Link2,
    ScanSearch,
    ScrollText,
    ShieldCheck,
    Timer,
    UserCheck,
    Users,
} from "lucide-react";

/*
 * Illustrations for /platform/identity-security.
 * Identities, systems, times and hashes are illustrative.
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

const CLASS_ICON = { Human: Users, Machine: Cpu, Vendor: Building2, AI: Bot } as const;
type Cls = keyof typeof CLASS_ICON;

/* ─── Hero: four identity classes, one engine asking who, to what and when ─── */
const REQS: { cls: Cls; who: string; what: string; when: string; out: string; hash: string }[] = [
    { cls: "Human", who: "j.carter", what: "esxi-03", when: "14:02 · change window", out: "JIT 30 min · approved", hash: "a91f02" },
    { cls: "Machine", who: "svc-backup", what: "sql-prod-02", when: "02:00 · scheduled", out: "credential injected", hash: "3c7e88" },
    { cls: "Vendor", who: "acme-support", what: "crm-app", when: "09:15 · contract hours", out: "recorded · ends 17:00", hash: "d04b1a" },
    { cls: "AI", who: "ops-assistant", what: "billing-db", when: "10:40 · task-bound", out: "scoped grant · 15 min", hash: "7be2c9" },
];
export function IdentityHero() {
    const { ref, i, reduce } = useLoop(REQS.length * 4, 650, 0.3);
    const r = Math.floor(i / 4);
    const t = i % 4;
    const req = REQS[r];
    const trail = Array.from({ length: 3 }, (_, k) => REQS[(r - k + REQS.length) % REQS.length]);
    const qs = [
        { k: "Who", v: `${req.cls === "AI" ? "AI agent" : req.cls.toLowerCase()} · ${req.who}` },
        { k: "To what", v: req.what },
        { k: "When", v: req.when },
    ];
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: requests from a human administrator, a machine service account, a vendor and an AI agent all pass through one OmniPriv policy engine, which asks who, to what and when, decides each one and writes it to one shared audit trail">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">One policy engine · every identity</span>
            </div>

            <ul className="grid grid-cols-4 gap-1.5 px-4 pt-4" aria-hidden="true">
                {REQS.map((x, k) => {
                    const Icon = CLASS_ICON[x.cls];
                    const on = k === r;
                    return (
                        <li key={x.cls} className={`flex min-w-0 flex-col items-center gap-1 rounded-xl border px-1 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.12]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <Icon className={`w-4 h-4 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} />
                            <span className={`w-full truncate text-center text-[0.625rem] font-semibold ${on ? "text-white" : "text-slate-500"}`}>{x.cls === "AI" ? "AI agent" : x.cls}</span>
                        </li>
                    );
                })}
            </ul>

            <div className="mx-4 mt-3 rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.04] p-3.5" aria-hidden="true">
                <div className="flex items-center gap-2 text-[0.75rem] font-semibold text-[#7FE3F2]">
                    <ShieldCheck className="w-4 h-4" /> Policy engine
                </div>
                <ul className="mt-3 space-y-1.5">
                    {qs.map((q, k) => {
                        const on = k < t;
                        return (
                            <li key={q.k} className="grid grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                                <span className="text-[0.6875rem] font-semibold text-slate-500">{q.k}</span>
                                <motion.span key={`${r}-${q.k}`} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.25 }} className="truncate font-mono text-[0.6875rem] text-slate-200">
                                    {q.v}
                                </motion.span>
                                <Check className={`w-3.5 h-3.5 transition-opacity duration-200 ${on ? "opacity-100 text-[#7FE3F2]" : "opacity-0"}`} strokeWidth={3} />
                            </li>
                        );
                    })}
                </ul>
                <div className={`mt-2.5 flex h-9 items-center gap-2 rounded-lg border px-3 text-[0.75rem] font-semibold transition-colors duration-300 ${t === 3 ? "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.06] text-slate-500"}`}>
                    {t === 3 ? <Check className="w-4 h-4 shrink-0" strokeWidth={3} /> : <Clock className="w-4 h-4 shrink-0" />}
                    <span className="truncate">{t === 3 ? req.out : "Evaluating"}</span>
                </div>
            </div>

            <div className="px-4 pt-4 pb-4" aria-hidden="true">
                <div className="flex items-center gap-2 text-[0.6875rem] font-semibold text-slate-500">
                    <ScrollText className="w-3.5 h-3.5" /> One audit trail
                </div>
                <ul className="mt-2 space-y-1.5">
                    {trail.map((x, k) => {
                        const Icon = CLASS_ICON[x.cls];
                        const pending = k === 0 && t < 3;
                        return (
                            <li key={k} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 transition-opacity duration-300 ${pending ? "opacity-30" : ""}`} style={{ opacity: pending ? 0.3 : 1 - k * 0.22 }}>
                                <Icon className="w-3.5 h-3.5 text-slate-400" />
                                <span className="truncate font-mono text-[0.6875rem] text-slate-300">
                                    {x.who} → {x.what}
                                </span>
                                <span className="font-mono text-[0.625rem] text-slate-500">#{x.hash}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Same engine, same vault, same trail</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Four tools leave gaps where identities overlap; one model closes them ─── */
const GAPS = [
    { a: "AI agent", b: "Human", t: "acts on behalf of a person" },
    { a: "Vendor", b: "Machine", t: "signs in as a service account" },
    { a: "Machine", b: "Human", t: "outlives the person who created it" },
];
export function GapsVisual() {
    const { ref, i, reduce } = useLoop(2, 3400, 0.4);
    const one = reduce || i === 1;
    const tools = ["Human", "Machine", "Vendor", "AI agent"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: with four separate tools, gaps open where identities overlap, such as an AI agent acting for a person, a vendor signing in as a service account, or a machine identity outliving its creator; with one authorization model, each of those paths is evaluated by the same policy">
            <div className="grid grid-cols-2 gap-1.5 px-4 pt-4" aria-hidden="true">
                {["Four tools", "One model"].map((t, k) => (
                    <span key={t} className={`rounded-lg py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${(k === 1) === one ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : "text-slate-500"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="p-4" aria-hidden="true">
                <div className={`grid grid-cols-4 gap-1.5 rounded-2xl p-1.5 transition-colors duration-300 ${one ? "border border-[#00B8DB]/40 bg-[#00B8DB]/[0.05]" : "border border-transparent"}`}>
                    {tools.map((t) => (
                        <span key={t} className={`truncate rounded-xl border px-1 py-3 text-center text-[0.6875rem] font-semibold transition-colors duration-300 ${one ? "border-[#00B8DB]/25 bg-white/[0.03] text-white" : "border-dashed border-white/[0.14] text-slate-400"}`}>
                            {t}
                        </span>
                    ))}
                </div>
                <div className={`mt-2 flex h-8 items-center justify-center gap-2 rounded-lg text-[0.6875rem] font-semibold transition-opacity duration-300 ${one ? "opacity-100 text-[#7FE3F2]" : "opacity-0"}`}>
                    <ShieldCheck className="w-3.5 h-3.5" /> One policy engine evaluates all four
                </div>
                <ul className="mt-2 space-y-1.5">
                    {GAPS.map((g, k) => (
                        <motion.li
                            key={g.t}
                            initial={false}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: reduce ? 0 : k * 0.08, ease }}
                            className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors duration-300 ${one ? "border-[#00B8DB]/25 bg-[#00B8DB]/[0.05]" : "border-amber-400/35 bg-amber-400/[0.06]"}`}
                        >
                            {one ? <Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />}
                            <span className="min-w-0 truncate text-[0.6875rem] text-slate-200">
                                <span className="font-semibold">{g.a}</span> {g.t}
                            </span>
                            <span className={`shrink-0 text-[0.625rem] font-semibold ${one ? "text-[#7FE3F2]" : "text-amber-300"}`}>{one ? "same policy" : "gap"}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ─── The six areas, read in order, are one lifecycle ─── */
const STAGES = [
    { t: "Discover", d: "unregistered accounts surfaced", i: ScanSearch },
    { t: "Protect", d: "secret vaulted, rotation on", i: KeyRound },
    { t: "Grant", d: "time-bound, 4-eyes approved", i: Timer },
    { t: "Access", d: "brokered session, recorded", i: Eye },
    { t: "Analyse", d: "closed session scored", i: AlertTriangle },
    { t: "Prove", d: "hash-chained record written", i: BarChart3 },
];
export function LifecycleStrip() {
    const { ref, i } = useLoop(STAGES.length, 1200, 0.4);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: one privileged identity moves through the lifecycle in order: discovered, its credential protected, access granted for a limited time with approval, its session brokered and recorded, the session scored for risk and a tamper-evident record written">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Users className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">lifecycle · svc-reporting</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ol className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-4" aria-hidden="true">
                {STAGES.map((s, k) => {
                    const on = k === i;
                    const done = k < i;
                    return (
                        <li key={s.t} className={`relative flex min-w-0 flex-col items-center gap-1.5 rounded-xl border px-1.5 py-3 text-center transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : done ? "border-[#00B8DB]/20 bg-white/[0.02]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#00B8DB]/20 text-[#7FE3F2]" : done ? "text-[#7FE3F2]/70" : "text-slate-600"}`}>
                                {done ? <Check className="w-4 h-4" strokeWidth={3} /> : <s.i className="w-4 h-4" />}
                            </span>
                            <span className={`w-full truncate text-[0.6875rem] font-semibold ${on ? "text-white" : done ? "text-slate-300" : "text-slate-500"}`}>{s.t}</span>
                        </li>
                    );
                })}
            </ol>
            <div className="mx-4 mb-4 flex h-10 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 text-[0.75rem]" aria-hidden="true">
                <span className="font-semibold text-[#7FE3F2]">{STAGES[i].t}</span>
                <span className="truncate text-slate-400">· {STAGES[i].d}</span>
            </div>
        </div>
    );
}

/* ─── Operating model: entitlements that pile up versus nothing standing ─── */
const DAYS = 12;
const STANDING = [3, 4, 4, 6, 7, 7, 9, 10, 10, 12, 13, 14];
const TASKS = [0, 2, 0, 0, 1, 0, 3, 0, 1, 0, 0, 2];
export function StandingChart() {
    const { ref, i, reduce } = useLoop(DAYS + 3, 380, 0.4);
    const n = reduce ? DAYS : Math.min(i + 1, DAYS);
    const max = 14;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: over twelve days, standing entitlements for one identity pile up from 3 to 14, while under zero standing privilege the identity holds nothing between tasks and short grants appear only while a task runs">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Timer className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">entitlements held · one identity</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4" aria-hidden="true">
                {[
                    { t: "Standing access", data: STANDING, tone: "bg-rose-400/70", txt: "text-rose-300", v: STANDING[n - 1] },
                    { t: "Zero standing privilege", data: TASKS, tone: "bg-[#00B8DB]", txt: "text-[#7FE3F2]", v: 0 },
                ].map((c) => (
                    <div key={c.t} className="min-w-0 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                        <div className="truncate text-[0.6875rem] font-semibold text-slate-400">{c.t}</div>
                        <div className={`mt-1 text-[1.75rem] leading-none font-bold tabular-nums ${c.txt}`} style={{ fontFamily: "var(--font-syne)" }}>
                            {c.v}
                        </div>
                        <div className="text-[0.625rem] text-slate-500">held right now</div>
                        <div className="mt-3 flex h-24 items-end gap-[3px]">
                            {c.data.map((v, k) => (
                                <motion.span
                                    key={k}
                                    className={`flex-1 rounded-t-sm ${v === 0 ? "bg-white/[0.06]" : c.tone}`}
                                    initial={false}
                                    animate={{ height: k < n ? `${Math.max(v, 0.4) / max * 100}%` : "4%", opacity: k < n ? 1 : 0.3 }}
                                    transition={{ duration: 0.3, ease }}
                                />
                            ))}
                        </div>
                        <div className="mt-1.5 flex justify-between font-mono text-[0.5625rem] text-slate-600">
                            <span>day 1</span>
                            <span>day 12</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mx-4 mb-4 grid grid-cols-2 gap-3 text-[0.6875rem]" aria-hidden="true">
                <span className="rounded-lg border border-rose-400/25 bg-rose-500/[0.05] px-3 py-2 text-rose-200">To review, forget, or inherit</span>
                <span className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-3 py-2 text-[#7FE3F2]">Granted per task, gone after</span>
            </div>
        </div>
    );
}

/* ─── Governance: one trail, agent activity beside the human who authorised it ─── */
const TRAIL = [
    { ts: "10:38:02", cls: "Human" as Cls, who: "s.noor", t: "approved task #4471 for ops-assistant", link: false },
    { ts: "10:40:11", cls: "AI" as Cls, who: "ops-assistant", t: "SELECT invoices · billing-db", link: true },
    { ts: "10:41:47", cls: "AI" as Cls, who: "ops-assistant", t: "UPDATE ledger · billing-db", link: true },
    { ts: "10:55:00", cls: "Machine" as Cls, who: "omnipriv", t: "grant expired · credential rotated", link: false },
];
export function OneTrail() {
    const { ref, i } = useLoop(TRAIL.length + 2, 1000, 0.4);
    const n = Math.min(i + 1, TRAIL.length);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: one audit trail shows a human approving a task, the AI agent's database actions linked back to that approval, and the grant expiring with the credential rotated">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ScrollText className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">audit trail · all identities</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {TRAIL.map((e, k) => {
                    const Icon = CLASS_ICON[e.cls];
                    const on = k < n;
                    return (
                        <li key={e.ts} className={`relative rounded-xl border px-3 py-2.5 transition-all duration-300 ${e.link ? "ml-5" : ""} ${on ? (e.cls === "Human" ? "border-amber-400/35 bg-amber-400/[0.06]" : "border-white/[0.09] bg-white/[0.03]") : "border-white/[0.04] opacity-30"}`}>
                            {e.link && <span className="absolute -left-3.5 top-1/2 h-px w-3 bg-amber-400/50" />}
                            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5">
                                <Icon className={`w-3.5 h-3.5 ${e.cls === "Human" ? "text-amber-300" : "text-[#7FE3F2]"}`} />
                                <span className="truncate text-[0.6875rem] text-slate-200">
                                    <span className="font-mono font-semibold text-white">{e.who}</span> {e.t}
                                </span>
                                <span className="font-mono text-[0.625rem] tabular-nums text-slate-500">{e.ts}</span>
                            </div>
                            {e.link && on && (
                                <div className="mt-1 flex items-center gap-1 pl-6 text-[0.625rem] text-amber-200/80">
                                    <Link2 className="w-3 h-3" /> authorised by s.noor · #4471
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-white/[0.07] px-3.5 py-2.5 text-[0.75rem] font-semibold text-slate-400">
                <UserCheck className="w-4 h-4 shrink-0 text-[#7FE3F2]" /> Synced with LDAP and Active Directory
            </div>
        </div>
    );
}
