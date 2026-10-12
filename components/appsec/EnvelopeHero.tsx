"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Fingerprint, KeyRound, Link2, Lock, ShieldCheck } from "lucide-react";

/*
 * Application security hero: what happens to one secret.
 *   1. the login proves more than a password (MFA)
 *   2. the secret is wrapped, key inside key: SEK, then DEK, then KEK
 *   3. it crosses between components only over mutual TLS
 *   4. the action is appended to the hash-chained audit trail
 * Loops; values are illustrative.
 */

const STEPS = ["Verify", "Encrypt", "Transmit", "Record"] as const;
const STEP_MS = 1700;
const GLYPHS = "0123456789abcdef";
const hex = (n: number) => Array.from({ length: n }, () => GLYPHS[Math.floor(Math.random() * 16)]).join("");

export default function EnvelopeHero() {
    const reduce = useReducedMotion();
    const [step, setStep] = useState(reduce ? 3 : 0);
    const [rings, setRings] = useState(reduce ? 3 : 0);
    const [chain, setChain] = useState(() => ["9f2c41", "4be013", "d71a7f"]);
    const [cipher, setCipher] = useState("prod-db-01 / root");

    useEffect(() => {
        if (reduce) return;
        const t = window.setTimeout(() => setStep((s) => (s + 1) % 4), STEP_MS);
        return () => window.clearTimeout(t);
    }, [step, reduce]);

    useEffect(() => {
        if (reduce) return;
        if (step === 0) {
            setRings(0);
            setCipher("prod-db-01 / root");
        }
        if (step === 1) {
            const ts = [1, 2, 3].map((k) => window.setTimeout(() => setRings(k), k * 380));
            const c = window.setTimeout(() => setCipher(hex(24)), 1250);
            return () => [...ts, c].forEach(window.clearTimeout);
        }
        if (step === 3) {
            const t = window.setTimeout(() => setChain((c) => [...c.slice(1), hex(6)]), 350);
            return () => window.clearTimeout(t);
        }
    }, [step, reduce]);

    const RING = [
        { k: "SEK", note: "session key", r: 34 },
        { k: "DEK", note: "data key", r: 52 },
        { k: "KEK", note: "key encryption key", r: 70 },
    ];

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a login is verified with MFA, a secret is wrapped in three layers of keys, crosses between components over mutual TLS and is recorded in a hash-chained audit trail">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Security layers · one secret, end to end</span>
            </div>

            {/* step tabs */}
            <ol className="grid grid-cols-4 gap-1.5 px-4 pt-4">
                {STEPS.map((s, i) => (
                    <li key={s} className={`relative rounded-lg px-2 py-1.5 text-center text-[0.75rem] font-semibold transition-colors duration-300 ${i === step ? "bg-[#00B8DB]/[0.14] text-white ring-1 ring-[#00B8DB]/45" : i < step ? "text-[#7FE3F2]" : "text-slate-500"}`}>
                        {i < step && <Check className="inline w-3 h-3 mr-1 -mt-0.5" strokeWidth={3} />}
                        {s}
                    </li>
                ))}
            </ol>

            <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 p-4">
                {/* envelope */}
                <div className="relative flex items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0b0c0e] aspect-square sm:aspect-auto sm:min-h-[15rem]">
                    <svg viewBox="0 0 160 160" className="w-full max-w-[13rem] h-auto" aria-hidden="true">
                        {RING.map((g, k) => (
                            <g key={g.k}>
                                <circle cx="80" cy="80" r={g.r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="9" />
                                <motion.circle
                                    cx="80"
                                    cy="80"
                                    r={g.r}
                                    fill="none"
                                    stroke="#00B8DB"
                                    strokeOpacity={0.35 + k * 0.2}
                                    strokeWidth="9"
                                    strokeLinecap="round"
                                    transform="rotate(-90 80 80)"
                                    initial={false}
                                    animate={{ pathLength: rings > k ? 1 : 0 }}
                                    transition={{ duration: reduce ? 0 : 0.45, ease: [0.77, 0, 0.175, 1] }}
                                />
                                <text x="80" y={80 - g.r + 3} textAnchor="middle" fontSize="7" fontWeight="700" fill={rings > k ? "#03121c" : "#64748b"} style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                                    {g.k}
                                </text>
                            </g>
                        ))}
                        <circle cx="80" cy="80" r="20" fill={rings >= 3 ? "#00B8DB" : "rgba(255,255,255,0.06)"} style={{ transition: "fill .3s" }} />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {rings >= 3 ? <Lock className="w-5 h-5 text-[#03121c]" /> : <KeyRound className="w-5 h-5 text-slate-300" />}
                    </span>
                </div>

                {/* the current layer */}
                <div className="min-w-0 flex flex-col gap-2.5">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step}
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 flex-1"
                        >
                            {step === 0 && (
                                <>
                                    <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                                        <Fingerprint className="w-4 h-4 text-[#7FE3F2]" /> Login proves more than a password
                                    </div>
                                    <ul className="mt-3 space-y-1.5 text-[0.75rem] text-slate-300">
                                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> Password</li>
                                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> Hardware token</li>
                                        <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> Keystroke rhythm on baseline</li>
                                    </ul>
                                </>
                            )}
                            {step === 1 && (
                                <>
                                    <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                                        <Lock className="w-4 h-4 text-[#7FE3F2]" /> Envelope encryption
                                    </div>
                                    <p className="mt-2 text-[0.75rem] text-slate-400">Each key is wrapped by the next: SEK, then DEK, then KEK.</p>
                                    <div className="mt-3 rounded-lg bg-[#0b0c0e] border border-white/[0.06] px-3 py-2 font-mono text-[0.75rem] text-[#7FE3F2] break-all">{cipher}</div>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                                        <ShieldCheck className="w-4 h-4 text-[#7FE3F2]" /> Mutual TLS between components
                                    </div>
                                    <div className="mt-4 flex items-center gap-1.5 text-[0.6875rem] font-mono text-slate-300">
                                        {["web", "vault", "gateway"].map((n, k) => (
                                            <span key={n} className="flex items-center gap-1.5 min-w-0">
                                                <span className="rounded-md border border-white/15 bg-white/[0.04] px-2 py-1">{n}</span>
                                                {k < 2 && (
                                                    <span className="relative w-6 h-px bg-[#00B8DB] overflow-hidden">
                                                        {!reduce && <span className="aip-signal" />}
                                                    </span>
                                                )}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-3 text-[0.75rem] text-slate-400">Both sides prove who they are. No plaintext on the wire.</p>
                                </>
                            )}
                            {step === 3 && (
                                <>
                                    <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-white">
                                        <Link2 className="w-4 h-4 text-[#7FE3F2]" /> Hash-chained audit record
                                    </div>
                                    <p className="mt-2 text-[0.75rem] text-slate-400">HMAC-SHA256 checkpoint every 50 rows, verified every 5 minutes.</p>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* audit chain */}
                    <div className="flex items-center gap-1.5 overflow-hidden" aria-hidden="true">
                        <AnimatePresence initial={false}>
                            {chain.map((h, k) => (
                                <motion.span
                                    key={h}
                                    layout={!reduce}
                                    initial={reduce ? false : { opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                    className={`flex-1 min-w-0 rounded-lg border px-2 py-1.5 font-mono text-[0.6875rem] truncate ${k === chain.length - 1 ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.08] bg-white/[0.02] text-slate-400"}`}
                                >
                                    #{h}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Encrypted at rest, in transit and between components</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
