"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
    Ban,
    BriefcaseBusiness,
    Building2,
    Check,
    Clock,
    Cloud,
    Code2,
    Database,
    Eye,
    Handshake,
    Home,
    KeyRound,
    Monitor,
    ShieldCheck,
    Terminal,
    UserCog,
    UserRound,
    X,
} from "lucide-react";

/* Illustrations for /platform/secure-remote-access. Values are illustrative. */

const EASE = [0.23, 1, 0.32, 1] as const;

/* Users reach targets only through OmniPriv; the internet path is closed. */
export function BrokerDiagram() {
    const reduce = useReducedMotion();
    const users = [
        { t: "Home office", i: Home },
        { t: "Vendor site", i: Building2 },
        { t: "On the road", i: UserRound },
    ];
    const targets = [
        { t: "RDP servers", i: Monitor },
        { t: "SSH hosts", i: Terminal },
        { t: "Databases", i: Database },
        { t: "Cloud", i: Cloud },
    ];
    const chip = "flex items-center gap-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-3 py-2.5 text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300 min-w-0";
    return (
        <div className="relative rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02] p-5 sm:p-6" role="img" aria-label="Remote users connect through OmniPriv to RDP, SSH, database and cloud resources; targets are not exposed to the internet">
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
                <div className="space-y-2.5">
                    {users.map((u) => (
                        <div key={u.t} className={chip}>
                            <u.i className="w-4 h-4 shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                            <span className="truncate">{u.t}</span>
                        </div>
                    ))}
                </div>
                <div className="relative flex flex-col items-center">
                    <span className="relative z-10 inline-flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0a1628] dark:bg-[#0b0c0e] border border-[#00B8DB]/45 shadow-[0_0_0_10px_rgba(0,184,219,0.07)]">
                        <span className="text-[0.6875rem] text-slate-400">OmniPriv</span>
                        <span className="text-[0.875rem] sm:text-[0.9375rem] font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            Broker
                        </span>
                    </span>
                    {/* signal lines */}
                    <span className="absolute top-1/2 -left-3 sm:-left-5 w-3 sm:w-5 h-px bg-[#00B8DB]/60 overflow-hidden" aria-hidden="true">
                        {!reduce && <span className="aip-signal" />}
                    </span>
                    <span className="absolute top-1/2 -right-3 sm:-right-5 w-3 sm:w-5 h-px bg-[#00B8DB]/60 overflow-hidden" aria-hidden="true">
                        {!reduce && <span className="aip-signal" style={{ animationDelay: "0.6s" }} />}
                    </span>
                </div>
                <div className="space-y-2.5">
                    {targets.map((t) => (
                        <div key={t.t} className={chip}>
                            <t.i className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
                            <span className="truncate">{t.t}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-2.5 text-[0.8125rem]">
                <span className="flex items-center gap-2 rounded-xl border border-rose-500/25 bg-rose-500/[0.05] px-3 py-2 text-rose-700 dark:text-rose-300">
                    <Ban className="w-4 h-4 shrink-0" aria-hidden="true" /> Targets not exposed to the internet
                </span>
                <span className="flex items-center gap-2 rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-3 py-2 text-[#00667A] dark:text-[#7FD9EA]">
                    <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" /> Every request authenticated, authorized and logged
                </span>
            </div>
        </div>
    );
}

/* Six remote identity types from the copy, as tiles. */
const PERSONA_ICON = [UserCog, Code2, Home, BriefcaseBusiness, Handshake, Building2];
export function Personas({ items }: { items: string[] }) {
    const reduce = useReducedMotion();
    return (
        <motion.ul
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            initial={reduce ? false : "hide"}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
            {items.map((p, i) => {
                const Icon = PERSONA_ICON[i % PERSONA_ICON.length];
                return (
                    <motion.li
                        key={p}
                        variants={{ hide: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="aip-card min-w-0 rounded-2xl border p-4 flex items-center gap-3"
                    >
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB] shrink-0">
                            <Icon className="w-4 h-4" aria-hidden="true" />
                        </span>
                        <span className="text-[0.875rem] font-semibold text-[#0a1628] dark:text-white leading-snug">{p}</span>
                    </motion.li>
                );
            })}
        </motion.ul>
    );
}

/* Verify → Approve → Grant → Monitor → Revoke, for the dark band. */
export function AccessTrack({ steps }: { steps: string[] }) {
    const reduce = useReducedMotion();
    const notes = ["MFA and identity checks", "Authorized for the task", "Temporary privilege", "Session recorded", "Expires automatically"];
    return (
        <div className="relative">
            <div className="absolute hidden md:block left-[10%] right-[10%] top-7 h-px bg-white/[0.1]" aria-hidden="true">
                <motion.span
                    className="absolute inset-0 origin-left bg-[#00B8DB]"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                />
                {!reduce && <span className="aip-run" />}
            </div>
            <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
                {steps.map((s, i) => (
                    <motion.li
                        key={s}
                        className="flex md:flex-col md:text-center items-center gap-4 md:gap-0"
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.45, ease: EASE, delay: 0.15 + i * 0.22 }}
                    >
                        <span className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl border shrink-0 text-[1.0625rem] font-bold ${i === steps.length - 1 ? "border-emerald-400/45 bg-[#0b0c0e] text-emerald-300" : "border-[#00B8DB]/45 bg-[#0b0c0e] text-[#7FE3F2]"}`} style={{ fontFamily: "var(--font-syne)" }}>
                            {i + 1}
                        </span>
                        <span className="md:mt-4">
                            <span className="block op-card-title text-[1.0625rem]">{s}</span>
                            <span className="block mt-1 text-[0.8125rem] text-slate-400">{notes[i]}</span>
                        </span>
                    </motion.li>
                ))}
            </ol>
        </div>
    );
}

/* Credential risks, each closed off by the vault. */
export function RisksCard({ risks, title = "Remote credential risks", badge = "Vaulted", done = "Controlled" }: { risks: string[]; title?: string; badge?: string; done?: string }) {
    const reduce = useReducedMotion();
    return (
        <div className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <KeyRound className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">{title}</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-emerald-300 shrink-0">{badge}</span>
            </div>
            <motion.ul
                className="p-4 space-y-2"
                initial={reduce ? false : "hide"}
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={{ show: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
            >
                {risks.map((r) => (
                    <motion.li key={r} className="relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 overflow-hidden" variants={{ hide: {}, show: {} }}>
                        <span className="relative inline-flex w-5 h-5 shrink-0">
                            <motion.span className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-rose-500/15 text-rose-300" variants={{ hide: { opacity: 1 }, show: { opacity: 0 } }} transition={{ duration: 0.25 }}>
                                <X className="w-3 h-3" strokeWidth={3} />
                            </motion.span>
                            <motion.span className="absolute inset-0 inline-flex items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300" variants={{ hide: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }} transition={{ type: "spring", stiffness: 500, damping: 26 }}>
                                <Check className="w-3 h-3" strokeWidth={3} />
                            </motion.span>
                        </span>
                        <motion.span className="text-[0.875rem] text-slate-200" variants={{ hide: { opacity: 1 }, show: { opacity: 0.55 } }} transition={{ duration: 0.3 }}>
                            <span className="relative">
                                {r}
                                <motion.span className="absolute left-0 right-0 top-1/2 h-px bg-slate-400 origin-left" variants={{ hide: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 0.3, ease: EASE }} />
                            </span>
                        </motion.span>
                        <motion.span className="ml-auto text-[0.6875rem] font-semibold text-emerald-300 shrink-0" variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }}>
                            {done}
                        </motion.span>
                    </motion.li>
                ))}
            </motion.ul>
        </div>
    );
}

/* Who / what / did / when / intervention, as a session record. */
const DEFAULT_RECORD = ["vendor.acme · MFA verified", "linux_prod_01 over SSH", "42 commands, recorded and searchable", "14:02 to 14:38, inside the approved window", "None needed, session closed on time"];
export function SessionRecord({ labels, values = DEFAULT_RECORD }: { labels: string[]; values?: string[] }) {
    const icons = [UserRound, Terminal, Eye, Clock, ShieldCheck];
    return (
        <div className="aip-console overflow-hidden">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                </span>
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Session record · #4f2a</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <dl className="p-4 space-y-2">
                {labels.map((l, i) => {
                    const Icon = icons[i];
                    return (
                        <div key={l} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                            <Icon className="w-4 h-4 mt-0.5 text-[#7FE3F2]" aria-hidden="true" />
                            <div className="min-w-0">
                                <dt className="text-[0.75rem] text-slate-400">{l}</dt>
                                <dd className="text-[0.875rem] text-white truncate">{values[i]}</dd>
                            </div>
                        </div>
                    );
                })}
            </dl>
        </div>
    );
}
