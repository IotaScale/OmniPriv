"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AlertTriangle, Check, KeyRound, Link2, RefreshCw, Upload, Users } from "lucide-react";

/* Small illustrations for /platform/password-credential-management. Values are illustrative. */

const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";

/* Validation and de-sync resolution: vault and asset disagree, then agree. */
export function DriftVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.5 });
    const [step, setStep] = useState(reduce ? 3 : 0); // 0 checking, 1 mismatch, 2 pushing, 3 in sync

    useEffect(() => {
        if (reduce || !seen) return;
        const ts = [
            window.setTimeout(() => setStep(1), 900),
            window.setTimeout(() => setStep(2), 2300),
            window.setTimeout(() => setStep(3), 3400),
            window.setTimeout(() => setStep(0), 7400),
        ];
        const loop = window.setInterval(() => {
            setStep(0);
            ts.push(window.setTimeout(() => setStep(1), 900), window.setTimeout(() => setStep(2), 2300), window.setTimeout(() => setStep(3), 3400));
        }, 7400);
        return () => {
            ts.forEach(window.clearTimeout);
            window.clearInterval(loop);
        };
    }, [seen, reduce]);

    const assetHash = step >= 3 ? "a91f" : "7c2e";
    const mismatch = step === 1 || step === 2;
    const status =
        step === 0 ? { t: "Validating against the live asset", c: "text-slate-300 border-white/15 bg-white/[0.05]", I: RefreshCw }
        : step === 1 ? { t: "Out of sync: changed on the asset", c: "text-rose-300 border-rose-500/30 bg-rose-500/10", I: AlertTriangle }
        : step === 2 ? { t: "Pushing the corrected credential", c: "text-amber-300 border-amber-400/30 bg-amber-400/10", I: Upload }
        : { t: "In sync, nobody had to step in", c: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10", I: Check };

    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a stored credential is validated against the asset, a mismatch is found and corrected automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Reconciliation · root@prod-db-01</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500">illustrative</span>
            </div>
            <div className="p-5 space-y-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-3">
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5">
                        <div className="text-[0.6875rem] text-slate-400">In the vault</div>
                        <div className="mt-1 font-mono text-[0.875rem] text-white">••••••••a91f</div>
                    </div>
                    <div className="relative w-8 sm:w-14 h-px bg-white/15">
                        <span className={`absolute left-1/2 -translate-x-1/2 -top-3 inline-flex items-center justify-center w-6 h-6 rounded-full border transition-colors duration-300 ${mismatch ? "border-rose-500/50 bg-rose-500/15 text-rose-300" : step === 3 ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-300" : "border-white/20 bg-[#15171a] text-slate-400"}`}>
                            {mismatch ? <span className="text-[0.75rem] font-bold">≠</span> : step === 3 ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : <RefreshCw className="w-3 h-3 aip-spin" />}
                        </span>
                        {step === 2 && !reduce && (
                            <motion.span className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-amber-300" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />
                        )}
                    </div>
                    <div className={`rounded-xl border p-3.5 transition-colors duration-300 ${mismatch ? "border-rose-500/30 bg-rose-500/[0.06]" : step === 3 ? "border-emerald-400/30 bg-emerald-400/[0.05]" : "border-white/[0.08] bg-white/[0.03]"}`}>
                        <div className="text-[0.6875rem] text-slate-400">On the asset</div>
                        <div className="mt-1 font-mono text-[0.875rem] text-white">••••••••{assetHash}</div>
                    </div>
                </div>
                <div className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.8125rem] font-medium transition-colors duration-300 ${status.c}`}>
                    <status.I className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {status.t}
                </div>
                <div className="grid grid-cols-3 gap-2 text-[0.6875rem]">
                    {["Validate", "Resolve de-sync", "Reconcile on schedule"].map((t, i) => (
                        <span key={t} className={`rounded-lg border px-2.5 py-1.5 text-center transition-colors duration-300 ${step >= [0, 2, 3][i] ? "border-[#00B8DB]/30 bg-[#00B8DB]/[0.08] text-[#7FE3F2]" : "border-white/[0.07] text-slate-500"}`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function SshVisual() {
    return (
        <div className={`${frame} p-4 space-y-2`} aria-hidden="true">
            {[
                { k: "Public key", v: "ssh-ed25519 AAAAC3Nz…", c: "text-slate-600 dark:text-slate-300" },
                { k: "Private key", v: "Encrypted in the vault", c: "text-[#00667A] dark:text-[#7FD9EA]" },
            ].map((r) => (
                <div key={r.k} className="flex items-center gap-2.5 rounded-xl bg-white dark:bg-[#15171a] border border-slate-900/[0.06] dark:border-white/[0.06] px-3 py-2">
                    <KeyRound className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-[0.75rem] text-slate-700 dark:text-slate-300 whitespace-nowrap">{r.k}</span>
                    <span className={`ml-auto text-[0.6875rem] font-mono truncate ${r.c}`}>{r.v}</span>
                </div>
            ))}
            <div className="flex items-center justify-between text-[0.6875rem] text-slate-500 px-1">
                <span>Change Secret engine</span>
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-300">
                    <RefreshCw className="w-3 h-3 aip-spin" /> Rotated and pushed
                </span>
            </div>
        </div>
    );
}

export function OtpVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="flex items-center gap-3">
                <span className="aip-otp-used font-mono text-[1.125rem] tracking-[0.18em] text-slate-400">K7#q-29xF</span>
                <span className="text-[0.6875rem] font-semibold rounded-md border border-rose-500/25 bg-rose-500/[0.06] text-rose-600 dark:text-rose-300 px-2 py-0.5">Used, retired</span>
            </div>
            <div className="mt-2.5 flex items-center gap-3">
                <span className="font-mono text-[1.125rem] tracking-[0.18em] text-[#0a1628] dark:text-white">••••••••</span>
                <span className="text-[0.6875rem] font-semibold rounded-md border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] text-[#00667A] dark:text-[#7FD9EA] px-2 py-0.5">New value, vaulted</span>
            </div>
        </div>
    );
}

export function GroupVisual() {
    return (
        <div className={`${frame} p-4 flex items-center gap-3`} aria-hidden="true">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#00B8DB]/35 bg-[#00B8DB]/[0.08] px-3 py-2 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FD9EA] shrink-0">
                <Users className="w-3.5 h-3.5" /> Group value
            </span>
            <span className="flex-1 flex flex-col gap-1.5 min-w-0">
                {["admin@app-01", "admin@app-02", "admin@app-03"].map((t, i) => (
                    <span key={t} className="flex items-center gap-1.5 min-w-0">
                        <Link2 className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="font-mono text-[0.6875rem] text-slate-600 dark:text-slate-300 truncate">{t}</span>
                        <span className="aip-sync ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" style={{ animationDelay: `${i * 0.15}s` }} />
                    </span>
                ))}
            </span>
        </div>
    );
}

export function BulkVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="flex items-center justify-between text-[0.6875rem]">
                <span className="text-slate-500">Bulk onboarding</span>
                <span className="font-mono text-slate-600 dark:text-slate-300">248 accounts</span>
            </div>
            <div className="mt-2 h-2.5 rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06] overflow-hidden">
                <span className="block h-full rounded-full bg-[#00B8DB] aip-window" />
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 text-[0.6875rem]">
                {["Privileges", "Rights", "Permissions"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-md border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-2 py-0.5 text-slate-600 dark:text-slate-300">
                        <Check className="w-3 h-3 text-emerald-500" /> {t}
                    </span>
                ))}
            </div>
        </div>
    );
}
