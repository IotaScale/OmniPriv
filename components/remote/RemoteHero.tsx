"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Ban, Check, Clock, Database, Fingerprint, Globe, Home, Building2, Monitor, ShieldCheck, Terminal } from "lucide-react";

/*
 * Secure remote access hero: one remote session from request to revoke.
 *
 *   remote user  →  OmniPriv (MFA, approval, JIT)  →  target system
 *
 * The direct route from the user to the target is drawn and crossed out:
 * the system is never exposed. Once the checks pass, the session opens
 * through OmniPriv, is recorded while its time window drains, and is
 * revoked automatically. Three scenarios loop; names are illustrative.
 */

const SCENARIOS = [
    { who: "j.rahman", where: "Home office", whereIcon: Home, proto: "RDP", target: "win-app-03", tIcon: Monitor, mins: 60 },
    { who: "vendor.acme", where: "Vendor site", whereIcon: Building2, proto: "SSH", target: "linux_prod_01", tIcon: Terminal, mins: 30 },
    { who: "d.lee", where: "Travelling abroad", whereIcon: Globe, proto: "Database", target: "orders-db", tIcon: Database, mins: 45 },
];

const CHECKS = [
    { k: "MFA", icon: Fingerprint },
    { k: "Approval", icon: ShieldCheck },
    { k: "JIT window", icon: Clock },
];

/* phases: 0 request, 1..3 checks, 4 session live, 5 revoked */
const T = [700, 550, 550, 550, 2600, 1300];

export default function RemoteHero() {
    const reduce = useReducedMotion();
    const [i, setI] = useState(0);
    const [ph, setPh] = useState(reduce ? 4 : 0);

    useEffect(() => {
        if (reduce) return;
        if (ph > 5) {
            setI((n) => (n + 1) % SCENARIOS.length);
            setPh(0);
            return;
        }
        const t = window.setTimeout(() => setPh((p) => p + 1), T[ph]);
        return () => window.clearTimeout(t);
    }, [ph, reduce]);

    const s = SCENARIOS[i];
    const live = ph === 4;
    const revoked = ph >= 5;
    const W = s.whereIcon;
    const TI = s.tIcon;

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a remote user reaches a server only through OmniPriv after MFA, approval and a time-limited grant; the session is recorded and revoked automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Remote access · brokered sessions</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            <div className="p-4 sm:p-5">
                {/* route: user → OmniPriv → target */}
                <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
                    {/* blocked direct path */}
                    <div className="absolute left-[16%] right-[16%] -top-1 h-6 border-t border-x border-dashed border-rose-400/35 rounded-t-xl pointer-events-none" aria-hidden="true">
                        <span className="absolute left-1/2 -translate-x-1/2 -top-[0.6rem] inline-flex items-center gap-1 rounded-full bg-[#15171a] dark:bg-[#111214] px-2 text-[0.625rem] font-semibold text-rose-300 whitespace-nowrap">
                            <Ban className="w-3 h-3" /> No direct connection
                        </span>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`u${i}`}
                            initial={reduce ? false : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 min-w-0"
                        >
                            <W className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                            <div className="mt-2 font-mono text-[0.8125rem] text-white truncate">{s.who}</div>
                            <div className="text-[0.6875rem] text-slate-400 truncate">{s.where}</div>
                        </motion.div>
                    </AnimatePresence>

                    {/* OmniPriv broker */}
                    <div className="mt-5 relative flex flex-col items-center">
                        <span className={`inline-flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0b0c0e] border transition-colors duration-300 ${live ? "border-[#00B8DB] shadow-[0_0_0_8px_rgba(0,184,219,0.1)]" : revoked ? "border-white/20" : "border-[#00B8DB]/45"}`}>
                            <span className="text-[0.625rem] text-slate-400">OmniPriv</span>
                            <span className="text-[0.8125rem] sm:text-[0.9375rem] font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                Gateway
                            </span>
                        </span>
                        {/* links either side */}
                        <span className="absolute top-1/2 right-full w-2 sm:w-3 h-px bg-[#00B8DB]/50" aria-hidden="true" />
                        <span className={`absolute top-1/2 left-full w-2 sm:w-3 h-px transition-colors duration-300 ${live ? "bg-[#00B8DB]" : "bg-white/15"}`} aria-hidden="true" />
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`t${i}`}
                            initial={reduce ? false : { opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className={`mt-5 rounded-2xl border p-3 min-w-0 transition-colors duration-300 ${live ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.08] bg-white/[0.03]"}`}
                        >
                            <TI className={`w-4 h-4 ${live ? "text-[#7FE3F2]" : "text-slate-400"}`} aria-hidden="true" />
                            <div className="mt-2 font-mono text-[0.8125rem] text-white truncate">{s.target}</div>
                            <div className="text-[0.6875rem] text-slate-400 truncate">{s.proto}</div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* checks */}
                <ol className="mt-5 grid grid-cols-3 gap-2">
                    {CHECKS.map((c, k) => {
                        const done = ph > k;
                        const on = ph === k + 1 && !done;
                        const Icon = c.icon;
                        return (
                            <li key={c.k} className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-[0.75rem] font-semibold transition-colors duration-300 ${done ? "border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] text-white" : on ? "border-[#00B8DB]/60 text-white" : "border-white/[0.07] text-slate-500"}`}>
                                {done ? <Check className="w-3.5 h-3.5 text-[#7FE3F2] shrink-0" strokeWidth={3} /> : <Icon className="w-3.5 h-3.5 shrink-0" />}
                                <span className="truncate">{c.k}</span>
                            </li>
                        );
                    })}
                </ol>

                {/* the session */}
                <div className="mt-3 rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-3.5 font-mono text-[0.6875rem] leading-relaxed min-h-[7.5rem]">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="truncate">
                            {s.proto.toLowerCase()} · {s.who} → {s.target}
                        </span>
                        {live ? (
                            <span className="inline-flex items-center gap-1 text-rose-300 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                            </span>
                        ) : revoked ? (
                            <span className="text-slate-400 shrink-0">closed</span>
                        ) : (
                            <span className="shrink-0">waiting</span>
                        )}
                    </div>
                    {ph < 4 && <div className="mt-3 text-slate-500">Checking identity, approval and time window…</div>}
                    {live && (
                        <div className="mt-2 space-y-0.5 text-slate-300">
                            <div><span className="text-[#7FD9EA]">›</span> session brokered by OmniPriv, credential injected</div>
                            <div><span className="text-[#7FD9EA]">›</span> user never sees the password</div>
                            <div><span className="text-[#7FD9EA]">›</span> recording, searchable after the session</div>
                        </div>
                    )}
                    {revoked && (
                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-emerald-300 font-sans font-semibold">
                            <Check className="w-3 h-3" strokeWidth={3} /> Access revoked automatically, nothing left standing
                        </div>
                    )}
                    {/* time window */}
                    <div className="mt-3 flex items-center gap-2 font-sans text-slate-500">
                        <span className="shrink-0">JIT window</span>
                        <span className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.span
                                key={`w${i}-${live}`}
                                className="block h-full rounded-full bg-[#00B8DB] origin-left"
                                initial={{ scaleX: live && !reduce ? 1 : revoked ? 0 : 1 }}
                                animate={{ scaleX: live && !reduce ? 0.08 : revoked ? 0 : 1 }}
                                transition={{ duration: live ? T[4] / 1000 : 0.3, ease: "linear" }}
                            />
                        </span>
                        <span className="shrink-0 tabular-nums">{s.mins} min</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Same policy from the office, home, abroad or a vendor site</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
