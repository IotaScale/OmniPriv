"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Check, Database, Fingerprint, KeyRound, Link2, Lock, Mail, MessageSquare, Server, ShieldCheck, Smartphone, User } from "lucide-react";

/* Illustrations for /platform/application-security. Values are illustrative. */

const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";

export function MfaVisual() {
    const items = [
        { t: "Biometric", i: Fingerprint },
        { t: "Hardware token", i: KeyRound },
        { t: "TOTP app", i: Smartphone },
        { t: "SMS", i: MessageSquare },
        { t: "Email code", i: Mail },
    ];
    return (
        <div className={`${frame} p-4 flex flex-wrap gap-1.5`} aria-hidden="true">
            {items.map((x) => (
                <span key={x.t} className="inline-flex items-center gap-1.5 rounded-lg border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-2.5 py-1.5 text-[0.75rem] text-slate-700 dark:text-slate-300">
                    <x.i className="w-3.5 h-3.5 text-[#00667A] dark:text-[#00B8DB]" /> {x.t}
                </span>
            ))}
        </div>
    );
}

export function KeystrokeVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <svg viewBox="0 0 240 64" className="w-full h-14">
                <path d="M0 40 C20 30 30 46 50 38 S80 30 100 38 S130 46 150 38" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 4" />
                <path className="aip-draw" pathLength={1} d="M0 40 C20 30 30 46 50 38 S80 30 100 38 S130 46 150 38 C170 30 180 8 200 14 S230 58 240 50" fill="none" stroke="#00B8DB" strokeWidth="2" />
                <circle cx="200" cy="14" r="4" fill="#f59e0b" />
            </svg>
            <div className="mt-1 flex justify-between text-[0.6875rem]">
                <span className="text-slate-500">learned typing baseline</span>
                <span className="font-semibold text-amber-600 dark:text-amber-300">Drift: MFA challenge sent</span>
            </div>
        </div>
    );
}

export function IsolationVisual() {
    return (
        <div className={`${frame} p-4 grid grid-cols-2 gap-2`} aria-hidden="true">
            <span className="rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-2">
                <span className="block text-[0.6875rem] text-slate-500">admin A · Finance</span>
                <span className="flex items-center gap-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FD9EA]">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} /> Finance vault
                </span>
            </span>
            <span className="rounded-xl border border-rose-500/25 bg-rose-500/[0.05] px-3 py-2">
                <span className="block text-[0.6875rem] text-slate-500">admin A · HR</span>
                <span className="flex items-center gap-1 text-[0.75rem] font-semibold text-rose-700 dark:text-rose-300">
                    <Ban className="w-3.5 h-3.5" /> Out of role
                </span>
            </span>
        </div>
    );
}

/* At rest, in transit, between components: one path, every segment locked. */
export function PathVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { once: true, amount: 0.5 });
    const nodes = [
        { t: "User", i: User },
        { t: "Gateway", i: ShieldCheck },
        { t: "Vault", i: KeyRound },
        { t: "Storage", i: Database },
    ];
    const segs = ["In transit · TLS", "Between components · mutual TLS", "At rest · envelope encryption"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: every segment of the path from user to storage is encrypted">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Lock className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Encryption coverage · whole path</span>
                <span className="ml-auto text-[0.6875rem] font-semibold text-emerald-300 shrink-0">No plaintext layer</span>
            </div>
            <ol className="p-5 space-y-0">
                {nodes.map((n, k) => (
                    <li key={n.t}>
                        <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5">
                            <n.i className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                            <span className="text-[0.8125rem] font-semibold text-white">{n.t}</span>
                            {n.t === "Vault" && <span className="ml-auto text-[0.6875rem] text-slate-400">KEK · DEK · SEK</span>}
                            {n.t === "Storage" && <span className="ml-auto text-[0.6875rem] text-slate-400">backups encrypted too</span>}
                        </div>
                        {k < segs.length && (
                            <div className="relative flex items-center gap-3 py-2 pl-[1.35rem]">
                                <span className="relative w-px h-8 bg-white/10 overflow-hidden">
                                    <motion.span
                                        className="absolute inset-0 bg-[#00B8DB] origin-top"
                                        initial={reduce ? false : { scaleY: 0 }}
                                        animate={{ scaleY: seen || reduce ? 1 : 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 + k * 0.35 }}
                                    />
                                </span>
                                <motion.span
                                    className="inline-flex items-center gap-1.5 rounded-md border border-[#00B8DB]/30 bg-[#00B8DB]/[0.08] px-2 py-0.5 text-[0.6875rem] font-semibold text-[#7FE3F2]"
                                    initial={reduce ? false : { opacity: 0, x: -6 }}
                                    animate={{ opacity: seen || reduce ? 1 : 0, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.45 + k * 0.35 }}
                                >
                                    <Lock className="w-3 h-3" /> {segs[k]}
                                </motion.span>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

/* Audit chain for the dark band: records link by hash, a checkpoint verifies. */
export function ChainVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.4 });
    const [n, setN] = useState(1046);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setN((v) => v + 1), 1800);
        return () => window.clearInterval(t);
    }, [seen, reduce]);
    const rows = [n - 3, n - 2, n - 1, n];
    const h = (x: number) => ((x * 2654435761) >>> 0).toString(16).slice(0, 8);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: each audit record carries the hash of the previous one; a signed checkpoint verifies the chain">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Link2 className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Audit trail · hash-chained</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <ul className="p-4 space-y-1.5 font-mono text-[0.75rem]">
                {rows.map((r, k) => (
                    <motion.li
                        key={r}
                        layout={!reduce}
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2 ${k === rows.length - 1 ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.07]" : "border-white/[0.07] bg-white/[0.02]"}`}
                    >
                        <span className="text-slate-500">#{r}</span>
                        <span className="text-slate-300 truncate">prev {h(r - 1)} · hash {h(r)}</span>
                        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />
                    </motion.li>
                ))}
            </ul>
            <div className="mx-4 mb-4 flex items-center gap-2 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.07] px-3.5 py-2.5 text-[0.75rem] font-semibold text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0" /> HMAC-SHA256 checkpoint every 50 rows, chain verified every 5 minutes
            </div>
            <div className="mx-4 mb-4 flex items-center gap-2 text-[0.6875rem] text-slate-500">
                <Server className="w-3.5 h-3.5" /> Installation key held outside the platform
            </div>
        </div>
    );
}
