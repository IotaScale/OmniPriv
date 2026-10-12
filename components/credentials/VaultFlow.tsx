"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Database, EyeOff, KeyRound, Lock, RotateCcw, ScanSearch, Server, Upload } from "lucide-react";

/*
 * Credential vault hero: one privileged account at a time goes through the
 * four automated stages, Discover → Vault → Rotate → Push. During Rotate the
 * masked secret scrambles and comes back as a new value nobody can read; on
 * Push the target confirms. Accounts and times are illustrative.
 *
 * Reduced motion: the first account is shown with every stage complete.
 */

const ACCOUNTS = [
    { name: "root", target: "prod-db-01", kind: "Password", icon: Database },
    { name: "deploy", target: "linux_prod_01", kind: "SSH key pair", icon: KeyRound },
    { name: "billing-api", target: "Billing service", kind: "API token", icon: Lock },
    { name: "svc-backup", target: "postgres_prod", kind: "Service account", icon: Server },
];

const STAGES = [
    { k: "Discover", icon: ScanSearch, note: "Found on the asset" },
    { k: "Vault", icon: Lock, note: "Encrypted, never shown" },
    { k: "Rotate", icon: RotateCcw, note: "New secret by policy" },
    { k: "Push", icon: Upload, note: "Asset updated, no outage" },
];

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789#$%&*+=?";
const LEN = 18;
const randomSecret = () => Array.from({ length: LEN }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join("");

const STAGE_MS = 1050;

export default function VaultFlow() {
    const reduce = useReducedMotion();
    const [acct, setAcct] = useState(0);
    const [stage, setStage] = useState(reduce ? 4 : 0); // 0..3 active, 4 done
    const [scramble, setScramble] = useState<string | null>(null);
    const [rotations, setRotations] = useState([3, 7, 2, 5]);
    const timer = useRef<number[]>([]);

    useEffect(() => {
        if (reduce) return;
        const t = timer.current;
        const push = (fn: () => void, ms: number) => t.push(window.setTimeout(fn, ms));
        setStage(0);
        setScramble(null);
        push(() => setStage(1), STAGE_MS);
        push(() => setStage(2), STAGE_MS * 2);
        // start the scramble only once Rotate begins
        push(() => {
            let k = 0;
            const id = window.setInterval(() => {
                k++;
                setScramble(randomSecret());
                if (k >= 12) {
                    window.clearInterval(id);
                    setScramble(null);
                }
            }, 65);
            t.push(id as unknown as number);
        }, STAGE_MS * 2 + 120);
        push(() => setStage(3), STAGE_MS * 3);
        push(() => {
            setStage(4);
            setRotations((r) => r.map((v, i) => (i === acct ? 0 : v)));
        }, STAGE_MS * 4);
        push(() => {
            setRotations((r) => r.map((v, i) => (i === acct ? 0 : v + 1)));
            setAcct((a) => (a + 1) % ACCOUNTS.length);
        }, STAGE_MS * 5 + 400);
        return () => {
            t.forEach((x) => {
                window.clearTimeout(x);
                window.clearInterval(x);
            });
            timer.current = [];
        };
    }, [acct, reduce]);

    const a = ACCOUNTS[acct];
    const AIcon = a.icon;

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: OmniPriv discovers, vaults, rotates and pushes privileged credentials without anyone seeing them">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Credential vault · rotation policy</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            <div className="p-4 sm:p-5">
                {/* the account in focus */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={acct}
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            className="flex items-center gap-3"
                        >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2] shrink-0">
                                <AIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <div className="min-w-0 flex-1">
                                <div className="font-mono text-[0.875rem] text-white truncate">
                                    {a.name} <span className="text-slate-500">@</span> {a.target}
                                </div>
                                <div className="text-[0.75rem] text-slate-400">{a.kind}</div>
                            </div>
                            <span className="shrink-0 inline-flex items-center gap-1 text-[0.6875rem] font-semibold px-2 py-1 rounded-md border border-white/15 bg-white/[0.06] text-slate-200">
                                <EyeOff className="w-3 h-3" aria-hidden="true" /> <span className="hidden sm:inline">Hidden from every user</span><span className="sm:hidden">Hidden</span>
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* the secret */}
                    <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#0b0c0e] border border-white/[0.06] px-3.5 py-3">
                        <Lock className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                        <span className={`font-mono text-[0.9375rem] tracking-[0.12em] truncate ${scramble ? "text-[#7FE3F2]" : "text-slate-300"}`}>
                            {scramble ?? "•".repeat(LEN)}
                        </span>
                        <span className="ml-auto shrink-0 text-[0.6875rem] font-mono text-slate-500">{scramble ? "rotating" : stage >= 4 ? "v" + (12 + acct) : "v" + (11 + acct)}</span>
                    </div>

                    {/* stages */}
                    <ol className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {STAGES.map((s, i) => {
                            const done = stage > i;
                            const on = stage === i;
                            const Icon = s.icon;
                            return (
                                <li key={s.k} className="relative">
                                    <div
                                        className={`rounded-xl border px-2.5 py-2.5 transition-colors duration-300 ${
                                            on ? "border-[#00B8DB]/60 bg-[#00B8DB]/[0.12]" : done ? "border-[#00B8DB]/25 bg-[#00B8DB]/[0.05]" : "border-white/[0.07] bg-white/[0.02]"
                                        }`}
                                    >
                                        <div className="flex items-center gap-1.5">
                                            {done ? (
                                                <Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} aria-hidden="true" />
                                            ) : (
                                                <Icon className={`w-3.5 h-3.5 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`} aria-hidden="true" />
                                            )}
                                            <span className={`text-[0.75rem] font-semibold ${on || done ? "text-white" : "text-slate-500"}`}>{s.k}</span>
                                        </div>
                                        <div className="hidden sm:block mt-1 text-[0.6875rem] leading-tight text-slate-400">{s.note}</div>
                                    </div>
                                    {on && !reduce && (
                                        <span className="absolute left-2 right-2 -bottom-1 h-[2px] rounded-full bg-white/[0.08] overflow-hidden" aria-hidden="true">
                                            <motion.span className="block h-full bg-[#00B8DB] origin-left" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: STAGE_MS / 1000, ease: "linear" }} />
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {/* the estate */}
                <ul className="mt-3 space-y-1.5">
                    {ACCOUNTS.map((x, i) => {
                        const XI = x.icon;
                        const focus = i === acct;
                        return (
                            <li key={x.name} className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-300 ${focus ? "bg-white/[0.05]" : ""}`}>
                                <XI className="w-3.5 h-3.5 text-slate-500 shrink-0" aria-hidden="true" />
                                <span className="font-mono text-[0.75rem] text-slate-300 truncate">{x.name}@{x.target}</span>
                                <span className="ml-auto shrink-0 text-[0.6875rem] text-slate-500">
                                    {focus && stage < 4 ? <span className="text-[#7FE3F2]">in progress</span> : rotations[i] === 0 ? <span className="text-emerald-300">rotated just now</span> : `rotated ${rotations[i]}h ago`}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span>Access to the resource, never the password</span>
                <span className="font-mono">illustrative</span>
            </div>
        </div>
    );
}
