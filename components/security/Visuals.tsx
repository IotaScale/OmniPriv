"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, Check, Fingerprint, Globe, KeyRound, Link2, Lock, Network, Scale, ShieldCheck, Wifi, X } from "lucide-react";

/* Illustrations for /security. Values are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;

function useLoop(steps: number, ms: number, amount = 0.35) {
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

/* Hero: one privileged request crossing every layer before it reaches a target. */
const LAYERS = [
    { t: "Identity", d: "MFA verified, tied to one person", i: Fingerprint },
    { t: "Policy", d: "least privilege for this session only", i: Scale },
    { t: "Proxy", d: "target never exposed to the user", i: Network },
    { t: "Encryption", d: "in transit and at rest", i: Lock },
    { t: "Audit", d: "signed, write-once record", i: Link2 },
];
export function SecurityHero() {
    const { ref, i, reduce } = useLoop(LAYERS.length + 2, 900, 0.3);
    const at = reduce ? LAYERS.length : Math.min(i, LAYERS.length);
    const done = at >= LAYERS.length;
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a privileged request passes identity verification, a least-privilege policy check, the access proxy, encryption and a signed audit record before it reaches the target system">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">j.carter → oracle-fin · privileged session</span>
            </div>
            <div className="relative p-4 pl-14">
                <span className="absolute left-[1.875rem] top-8 bottom-8 w-px bg-white/10" aria-hidden="true" />
                <motion.span className="absolute left-[1.875rem] top-8 bottom-8 w-px origin-top bg-[#00B8DB]" initial={false} animate={{ scaleY: at / LAYERS.length }} transition={{ duration: reduce ? 0 : 0.5, ease }} aria-hidden="true" />
                <ol className="space-y-1.5" aria-hidden="true">
                    {LAYERS.map((l, k) => {
                        const ok = k < at;
                        const now = k === at && !reduce;
                        return (
                            <li key={l.t} className={`relative grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.09]" : ok ? "border-[#00B8DB]/25 bg-[#00B8DB]/[0.04]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                                <span className={`absolute -left-[2.5rem] top-1/2 -translate-y-1/2 inline-flex w-7 h-7 items-center justify-center rounded-full border transition-colors duration-300 ${ok ? "border-[#00B8DB] bg-[#00B8DB] text-[#03121c]" : now ? "border-[#00B8DB]/70 bg-[#0b0c0e] text-[#7FE3F2]" : "border-white/15 bg-[#0b0c0e] text-slate-600"}`}>
                                    <l.i className="w-3.5 h-3.5" />
                                </span>
                                <span className={`text-[0.8125rem] font-semibold ${ok || now ? "text-white" : "text-slate-500"}`}>{l.t}</span>
                                <span className={`truncate text-[0.75rem] ${ok || now ? "text-slate-300" : "text-slate-600"}`}>{l.d}</span>
                                {ok ? <Check className="w-4 h-4 text-[#7FE3F2]" strokeWidth={3} /> : <span className="w-4 h-4" />}
                            </li>
                        );
                    })}
                </ol>
            </div>
            <div className={`mx-4 mb-4 flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${done ? "border-emerald-400/35 bg-emerald-400/[0.08]" : "border-white/[0.07]"}`}>
                <span className={`inline-flex w-8 h-8 items-center justify-center rounded-lg ${done ? "bg-emerald-400/15 text-emerald-300" : "bg-white/[0.05] text-slate-500"}`}>
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                    <span className="block font-mono text-[0.75rem] text-slate-400">oracle-fin</span>
                    <span className={`block text-[0.8125rem] font-semibold ${done ? "text-emerald-300" : "text-slate-500"}`}>{done ? "Reached, through every layer" : "Not reachable directly"}</span>
                </span>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">No user, device or network is trusted by default</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* Principle 1: the same checks whatever the origin. */
const ORIGINS = [
    { o: "Office LAN", i: Building2, ok: true },
    { o: "Home Wi-Fi", i: Wifi, ok: true },
    { o: "Vendor network", i: Globe, ok: true },
    { o: "Unknown device", i: Globe, ok: false },
];
export function TrustVisual() {
    const { ref, i, reduce } = useLoop(ORIGINS.length, 1800, 0.4);
    const o = ORIGINS[i];
    const checks = ["Authenticated", "Authorized", "Logged"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: requests from the office network, home, a vendor network or an unknown device all go through the same authentication, authorization and logging; nothing is trusted because of where it comes from">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Access request · origin ignored</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 px-4 pt-4" aria-hidden="true">
                {ORIGINS.map((x, k) => (
                    <span key={x.o} className={`flex flex-col items-center gap-1 rounded-xl border px-1.5 py-2.5 text-center text-[0.625rem] font-semibold leading-tight transition-colors duration-300 ${k === i ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1] text-white" : "border-white/[0.07] text-slate-500"}`}>
                        <x.i className="w-4 h-4" />
                        {x.o}
                    </span>
                ))}
            </div>
            <div className="p-4">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.ul key={o.o} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.3, ease }} className="space-y-1.5">
                        {checks.map((c, k) => {
                            const fail = !o.ok && k === 0;
                            const skip = !o.ok && k === 1;
                            return (
                                <motion.li key={c} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: reduce ? 0 : k * 0.18 }} className={`flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[0.8125rem] ${fail ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-200" : skip ? "border-white/[0.05] text-slate-600" : "border-[#00B8DB]/25 bg-[#00B8DB]/[0.05] text-white"}`}>
                                    {fail ? <X className="w-4 h-4 shrink-0" aria-hidden="true" /> : skip ? <span className="w-4 h-4 shrink-0" /> : <Check className="w-4 h-4 shrink-0 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />}
                                    {c}
                                    <span className="ml-auto text-[0.6875rem] text-slate-500">{fail ? "MFA failed · denied" : skip ? "not reached" : k === 2 ? "always, allowed or not" : "required"}</span>
                                </motion.li>
                            );
                        })}
                    </motion.ul>
                </AnimatePresence>
            </div>
        </div>
    );
}

/* Principle 3: strong identity, and a fresh check before a sensitive operation. */
export function IdentityVisual() {
    const { ref, i, reduce } = useLoop(4, 1500, 0.4);
    const factors = ["TOTP", "FIDO2 / WebAuthn", "Push approval", "Hardware key"];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a privileged session is opened with multi-factor authentication, carries an identity risk score, and asks the user to re-authenticate before a sensitive operation">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Fingerprint className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Session · m.alvi · prod-db</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-4 space-y-3">
                <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                    {factors.map((f, k) => (
                        <span key={f} className={`rounded-lg border px-2.5 py-1 text-[0.6875rem] font-semibold transition-colors duration-300 ${k === i % 4 ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.12] text-white" : "border-white/[0.08] text-slate-400"}`}>
                            {f}
                        </span>
                    ))}
                </div>
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3.5 py-3">
                    <div className="flex items-center justify-between text-[0.75rem]">
                        <span className="text-slate-400">Identity risk score</span>
                        <span className={`font-mono font-semibold tabular-nums ${i >= 2 ? "text-amber-300" : "text-emerald-300"}`}>{i >= 2 ? "0.46" : "0.12"}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                        <motion.div className={`h-full w-full origin-left rounded-full ${i >= 2 ? "bg-amber-400" : "bg-emerald-400"}`} initial={false} animate={{ scaleX: i >= 2 ? 0.46 : 0.12 }} transition={{ duration: reduce ? 0 : 0.5, ease }} />
                    </div>
                </div>
                <div className={`rounded-xl border px-3.5 py-3 transition-colors duration-300 ${i >= 2 ? "border-amber-400/40 bg-amber-400/[0.06]" : "border-white/[0.07]"}`}>
                    <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                        <KeyRound className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" /> DROP INDEX on prod-db
                    </div>
                    <div className="mt-1.5 text-[0.75rem]">
                        {i < 2 && <span className="text-slate-500">Routine commands run without interruption</span>}
                        {i === 2 && <span className="text-amber-200">Sensitive operation · re-authenticate to continue</span>}
                        {i === 3 && <span className="inline-flex items-center gap-1.5 text-emerald-300"><Check className="w-3.5 h-3.5" strokeWidth={3} /> Re-authenticated with hardware key · allowed</span>}
                    </div>
                </div>
            </div>
        </div>
    );
}
