"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Ban, Check, FileText, Globe, KeyRound, Lock, Network, Shield, UserMinus, UserPlus, Users } from "lucide-react";

/* Illustrations for /platform/enterprise-integration. Values are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;
const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";

function useLoop(steps: number, ms: number, amount = 0.45) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % steps), ms);
        return () => window.clearInterval(t);
    }, [seen, reduce, steps, ms]);
    return { ref, i: reduce ? 0 : i, reduce: !!reduce };
}

/* Six request types; the highlighted one shows its approval levels. */
export function RequestTypes() {
    const { ref, i } = useLoop(6, 1300);
    const types = ["General", "Asset Permission", "Application", "Command Confirm", "Login Confirm", "Login Asset Confirm"];
    return (
        <div ref={ref} className={`${frame} p-4`} aria-hidden="true">
            <div className="flex flex-wrap gap-1.5">
                {types.map((t, k) => (
                    <span key={t} className={`rounded-lg border px-2.5 py-1 text-[0.6875rem] font-medium transition-colors duration-300 ${k === i ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.1] text-[#00667A] dark:text-[#7FE3F2]" : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] text-slate-600 dark:text-slate-400"}`}>
                        {t}
                    </span>
                ))}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[0.6875rem] text-slate-500">
                <span className="rounded-md bg-slate-900/[0.05] dark:bg-white/[0.05] px-1.5 py-0.5 font-semibold text-slate-700 dark:text-slate-300">L1</span>
                <ArrowRight className="w-3 h-3" />
                <span className="rounded-md bg-slate-900/[0.05] dark:bg-white/[0.05] px-1.5 py-0.5 font-semibold text-slate-700 dark:text-slate-300">L2</span>
                <span className="ml-1">configurable multi-level approvals</span>
            </div>
        </div>
    );
}

/* Asking for the password is what opens the ticket. */
export function AutoTicket() {
    const { ref, i, reduce } = useLoop(4, 1200);
    return (
        <div ref={ref} className={`${frame} p-4`} aria-hidden="true">
            <div className="grid grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)] items-center gap-1">
                <span className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-3 py-2 text-[0.75rem]">
                    <span className="block text-[0.625rem] text-slate-500">j.carter</span>
                    <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <KeyRound className="w-3.5 h-3.5 text-[#00667A] dark:text-[#00B8DB]" /> Get password
                    </span>
                </span>
                <span className="relative h-px bg-slate-300 dark:bg-white/15 overflow-hidden">{!reduce && <span className="aip-signal" />}</span>
                <span className={`rounded-xl border px-3 py-2 text-[0.75rem] transition-colors duration-300 ${i >= 1 ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08]" : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a]"}`}>
                    <span className="block text-[0.625rem] text-slate-500">raised for you</span>
                    <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">TCK-2041</span>
                </span>
            </div>
            <div className={`mt-3 flex items-center gap-1.5 text-[0.6875rem] font-semibold transition-colors duration-300 ${i >= 3 ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                {i >= 3 ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <Lock className="w-3.5 h-3.5" />}
                {i >= 3 ? "Workflow complete, credential released" : "Credential withheld until approved"}
            </div>
        </div>
    );
}

/* Release gate: only an approved ticket gets through. */
export function StatusGate() {
    const rows = [
        { s: "Pending", ok: false },
        { s: "Rejected", ok: false },
        { s: "Closed", ok: false },
        { s: "Approved", ok: true },
    ];
    return (
        <div className={`${frame} p-4 grid grid-cols-2 gap-2`} aria-hidden="true">
            {rows.map((r) => (
                <span key={r.s} className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-[0.75rem] ${r.ok ? "border-emerald-500/30 bg-emerald-500/[0.07]" : "border-rose-500/20 bg-rose-500/[0.04]"}`}>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{r.s}</span>
                    {r.ok ? (
                        <span className="inline-flex items-center gap-1 text-[0.6875rem] font-semibold text-emerald-700 dark:text-emerald-300">
                            <Check className="w-3.5 h-3.5" strokeWidth={3} /> release
                        </span>
                    ) : (
                        <Ban className="w-3.5 h-3.5 text-rose-600 dark:text-rose-300" />
                    )}
                </span>
            ))}
        </div>
    );
}

/* Directory sync: joiner, mover and leaver changes flow both ways. */
const EVENTS = [
    { i: UserPlus, who: "s.patel", dir: "Added to DBA-Prod", pam: "Privileged access provisioned" },
    { i: Users, who: "r.lee", dir: "Moved Finance → HR", pam: "Entitlements updated to the new role" },
    { i: UserMinus, who: "m.ortiz", dir: "Account disabled", pam: "Privileged access removed" },
];
export function DirectorySync() {
    const { ref, i, reduce } = useLoop(EVENTS.length, 2200);
    const ev = EVENTS[i];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: joiner, mover and leaver changes in LDAP or Active Directory are reflected in privileged access automatically, and synchronised in both directions">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Directory sync · bidirectional</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 aip-blink" /> In sync
                </span>
            </div>
            <div className="p-5 grid grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] items-center">
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                    <Globe className="w-5 h-5 text-slate-300" aria-hidden="true" />
                    <div className="mt-2 text-[0.8125rem] font-semibold text-white">LDAP / AD</div>
                    <div className="text-[0.6875rem] text-slate-500">source of truth</div>
                </div>
                <div className="flex flex-col gap-3 px-1" aria-hidden="true">
                    <span className="relative h-px bg-[#00B8DB]/50 overflow-hidden">{!reduce && <span className="aip-signal" />}</span>
                    <span className="relative h-px bg-[#00B8DB]/50 overflow-hidden">{!reduce && <span className="aip-signal is-rev" />}</span>
                </div>
                <div className="rounded-2xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.06] p-3.5">
                    <Shield className="w-5 h-5 text-[#7FE3F2]" aria-hidden="true" />
                    <div className="mt-2 text-[0.8125rem] font-semibold text-white">OmniPriv</div>
                    <div className="text-[0.6875rem] text-slate-500">privileged access</div>
                </div>
            </div>
            <div className="px-5 pb-5">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={ev.who}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.35, ease }}
                        className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-3"
                    >
                        <ev.i className="w-4 h-4 mt-0.5 text-[#7FE3F2]" aria-hidden="true" />
                        <div className="min-w-0 text-[0.75rem]">
                            <div className="text-slate-400">
                                <span className="font-semibold text-white">{ev.who}</span> · {ev.dir}
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-300">
                                <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={3} aria-hidden="true" /> {ev.pam}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                    {["Joiner", "Mover", "Leaver"].map((t, k) => (
                        <span key={t} className={`flex-1 rounded-md py-1 text-center text-[0.625rem] font-semibold transition-colors duration-300 ${k === i ? "bg-[#00B8DB]/[0.14] text-white" : "text-slate-500"}`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* Events land in the SIEM as they happen, tagged with the protocol that carried them. */
const FEED = [
    { p: "SSH", e: "session opened", t: "linux-prod-01" },
    { p: "RDP", e: "session recorded", t: "win-db-02" },
    { p: "HTTP", e: "console login", t: "vcenter-01" },
    { p: "VNC", e: "session closed", t: "scada-hmi-04" },
    { p: "VAULT", e: "password retrieved", t: "oracle-fin" },
];
export function SiemStream() {
    const { ref, i, reduce } = useLoop(1000, 1300, 0.3);
    const rows = [0, 1, 2, 3].map((k) => i + 3 - k);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: privileged access events from RDP, SSH, VNC and HTTP proxies and from the password vault are forwarded to the SIEM in real time">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Network className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Event forwarding · SIEM</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-emerald-300 shrink-0">Real time</span>
            </div>
            <ul className="p-4 space-y-1.5 min-h-[12.5rem]">
                    {rows.map((n, k) => {
                        const f = FEED[((n % FEED.length) + FEED.length) % FEED.length];
                        return (
                            <motion.li
                                key={n}
                                layout={!reduce}
                                initial={reduce ? false : { opacity: 0, y: -8 }}
                                animate={{ opacity: k === 0 ? 1 : 0.75 - k * 0.15, y: 0 }}
                                transition={{ duration: 0.35, ease }}
                                className={`grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-2.5 rounded-lg border px-3 py-2 text-[0.75rem] ${k === 0 ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.07]" : "border-white/[0.06] bg-white/[0.02]"}`}
                            >
                                <span className="rounded-md bg-white/[0.06] py-0.5 text-center font-mono text-[0.625rem] font-semibold text-[#7FE3F2]">{f.p}</span>
                                <span className="truncate text-slate-300">
                                    {f.e} · <span className="font-mono text-slate-400">{f.t}</span>
                                </span>
                                <span className="inline-flex items-center gap-1 text-[0.625rem] text-emerald-300">
                                    <Check className="w-3 h-3" strokeWidth={3} /> sent
                                </span>
                            </motion.li>
                        );
                    })}
            </ul>
            <div className="grid grid-cols-4 gap-1.5 px-4 pb-4" aria-hidden="true">
                {["RDP", "SSH", "VNC", "HTTP"].map((p) => (
                    <span key={p} className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] py-1.5 text-center text-[0.6875rem] font-semibold text-[#7FE3F2]">
                        {p}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* Integration map: OmniPriv in the middle, every built-in connection around it.
 * Spokes draw in on view, a signal runs along each, and the highlight walks the
 * map with a one-line note on what crosses that link. */
const MAP = [
    { k: "Ticketing", s: "6 request types", note: "Approved tickets gate every credential release.", i: FileText, side: "l" },
    { k: "LDAP / Active Directory", s: "bidirectional sync", note: "Users, groups and entitlements stay sourced from the directory.", i: Globe, side: "l" },
    { k: "Identity Management", s: "lifecycle and provisioning", note: "Joiners, movers and leavers flow in from the platform that owns them.", i: Users, side: "l" },
    { k: "SIEM", s: "real-time forwarding", note: "Privileged access events land where your analysts already look.", i: Network, side: "r" },
    { k: "RDP · SSH · VNC · HTTP", s: "protocol proxies", note: "Sessions run through the proxy, the credential stays platform-side.", i: KeyRound, side: "r" },
    { k: "Password Vault", s: "by privilege level", note: "Direct vault access scoped to the role, not the network position.", i: Lock, side: "r" },
] as const;

export function IntegrationMap() {
    const { ref, i, reduce } = useLoop(MAP.length, 1800, 0.35);
    const cur = MAP[i];
    const chip = (m: (typeof MAP)[number], k: number) => (
        <span className={`relative z-10 flex min-w-0 md:w-[15.5rem] md:shrink-0 items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${k === i ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a]"} shadow-[0_8px_20px_-16px_rgba(10,22,40,0.5)]`}>
            <span className={`inline-flex w-8 h-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 ${k === i ? "bg-[#00B8DB] text-[#03121c]" : "bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB]"}`}>
                <m.i className="w-4 h-4" aria-hidden="true" />
            </span>
            <span className="min-w-0">
                <span className="block truncate text-[0.8125rem] font-semibold text-slate-800 dark:text-slate-100">{m.k}</span>
                <span className="block truncate text-[0.6875rem] text-slate-500">{m.s}</span>
            </span>
        </span>
    );
    const spoke = (side: "l" | "r", k: number) => (
        <span className="relative block h-px flex-1 min-w-[1.5rem] bg-slate-900/[0.1] dark:bg-white/[0.1] overflow-hidden" aria-hidden="true">
            <motion.span
                className="absolute inset-0 bg-[#00B8DB]"
                style={{ transformOrigin: side === "l" ? "right" : "left", opacity: k === i ? 1 : 0.45 }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: 0.15 + (k % 3) * 0.12, ease: [0.77, 0, 0.175, 1] }}
            />
            {!reduce && k === i && <span className={`aip-signal ${side === "l" ? "" : "is-rev"}`} />}
        </span>
    );
    const left = MAP.map((m, k) => ({ m, k })).filter((x) => x.m.side === "l");
    const right = MAP.map((m, k) => ({ m, k })).filter((x) => x.m.side === "r");
    return (
        <div ref={ref} role="img" aria-label="Map of OmniPriv's built-in connections: ticketing, LDAP and Active Directory, Identity Management, SIEM, RDP, SSH, VNC and HTTP proxies, and the Password Vault by privilege level">
            {/* md+: hub with spokes */}
            <div className="hidden md:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center">
                <div className="space-y-3">
                    {left.map(({ m, k }) => (
                        <div key={m.k} className="flex items-center">
                            {chip(m, k)}
                            {spoke("l", k)}
                        </div>
                    ))}
                </div>
                <div className="relative flex items-center justify-center">
                    <span className="relative inline-flex flex-col items-center justify-center w-32 h-32 rounded-full bg-[#0a1628] dark:bg-[#0b0c0e] border border-[#00B8DB]/45 shadow-[0_0_0_10px_rgba(0,184,219,0.07),0_0_0_22px_rgba(0,184,219,0.035)]">
                        {!reduce && <span className="absolute inset-0 rounded-full border border-[#00B8DB]/40 aip-ping" aria-hidden="true" />}
                        <Shield className="w-6 h-6 text-[#7FE3F2]" aria-hidden="true" />
                        <span className="mt-1.5 text-[1rem] font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            OmniPriv
                        </span>
                        <span className="text-[0.625rem] text-slate-400">built in, not bolted on</span>
                    </span>
                </div>
                <div className="space-y-3">
                    {right.map(({ m, k }) => (
                        <div key={m.k} className="flex items-center">
                            {spoke("r", k)}
                            {chip(m, k)}
                        </div>
                    ))}
                </div>
            </div>
            {/* phones: grid */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MAP.map((m, k) => (
                    <div key={m.k} className="min-w-0">{chip(m, k)}</div>
                ))}
            </div>
            <div className="mt-6 flex justify-center">
                <motion.p
                    key={cur.k}
                    initial={reduce ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-4 py-2 text-[0.8125rem] text-slate-700 dark:text-slate-300"
                    aria-hidden="true"
                >
                    <span className="font-semibold text-[#00667A] dark:text-[#7FE3F2] shrink-0">{cur.k}</span>
                    <span className="truncate">{cur.note}</span>
                </motion.p>
            </div>
        </div>
    );
}
