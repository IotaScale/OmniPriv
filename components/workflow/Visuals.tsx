"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Clock, Lock, Mail, Monitor, Smartphone, Unlock } from "lucide-react";

/* Illustrations for /platform/workflow-access-control. Values are illustrative. */

const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";

export function FourEyesVisual() {
    return (
        <div className={`${frame} p-4 flex flex-wrap items-center gap-2`} aria-hidden="true">
            {["s.khan", "m.ortiz"].map((n) => (
                <span key={n} className="flex items-center gap-1.5 rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-2.5 py-2">
                    <Check className="w-3.5 h-3.5 text-[#00667A] dark:text-[#7FD9EA] shrink-0" strokeWidth={3} />
                    <span className="font-mono text-[0.75rem] text-slate-700 dark:text-slate-200">{n}</span>
                </span>
            ))}
            <span className="flex items-center gap-1.5 rounded-xl border border-rose-500/25 bg-rose-500/[0.05] px-2.5 py-2">
                <span className="text-[0.75rem] font-bold text-rose-500 shrink-0">✕</span>
                <span className="text-[0.75rem] text-rose-700 dark:text-rose-300">requester</span>
            </span>
        </div>
    );
}

export function AnywhereVisual() {
    const items = [
        { t: "Web GUI", i: Monitor },
        { t: "Mobile", i: Smartphone },
        { t: "Email link", i: Mail },
    ];
    return (
        <div className={`${frame} p-4 grid grid-cols-3 gap-2`} aria-hidden="true">
            {items.map((x, k) => (
                <span key={x.t} className="flex flex-col items-center gap-1.5 rounded-xl bg-white dark:bg-[#15171a] border border-slate-900/[0.06] dark:border-white/[0.06] py-2.5">
                    <x.i className="w-4 h-4 text-[#00667A] dark:text-[#00B8DB]" />
                    <span className="text-[0.6875rem] text-slate-600 dark:text-slate-300">{x.t}</span>
                    <span className="aip-sync w-1.5 h-1.5 rounded-full bg-emerald-500" style={{ animationDelay: `${k * 0.3}s` }} />
                </span>
            ))}
        </div>
    );
}

export function ChainVisual() {
    return (
        <div className={`${frame} p-4 flex items-center gap-1.5`} aria-hidden="true">
            {["Level 1", "Level 2", "Level 3"].map((l, i) => (
                <div key={l} className="flex items-center gap-1.5 flex-1 min-w-0">
                    <span className="flex-1 min-w-0 rounded-xl bg-white dark:bg-[#15171a] border border-slate-900/[0.06] dark:border-white/[0.06] px-2.5 py-2">
                        <span className="block text-[0.6875rem] text-slate-400">{l}</span>
                        <span className="flex -space-x-1 mt-1">
                            {Array.from({ length: i === 1 ? 3 : 2 }, (_, k) => (
                                <span key={k} className="w-4 h-4 rounded-full border-2 border-white dark:border-[#15171a] bg-[#00B8DB]/60" />
                            ))}
                        </span>
                    </span>
                    {i < 2 && <span className="w-2 h-px bg-slate-300 dark:bg-white/20 shrink-0" />}
                </div>
            ))}
        </div>
    );
}

/* Temporary assignment: an ACL entry inside a time window, reverting on expiry. */
export function ExpiryVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.5 });
    const [p, setP] = useState(reduce ? 0.6 : 0);

    useEffect(() => {
        if (reduce || !seen) return;
        let raf = 0;
        let t0 = 0;
        const LOOP = 7000;
        const tick = (t: number) => {
            if (!t0) t0 = t;
            setP(((t - t0) % LOOP) / LOOP);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [seen, reduce]);

    // window from 20% to 70% of the day shown
    const W0 = 0.2;
    const W1 = 0.7;
    const inWin = p >= W0 && p < W1;
    const hour = 8 + p * 10; // 08:00 to 18:00
    const fmt = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.floor((h % 1) * 60)).padStart(2, "0")}`;

    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a privileged ACL entry exists only inside its approved time window and reverts to the restricted account when it closes">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Clock className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Temporary assignment · prod-db-01</span>
                <span className="ml-auto font-mono text-[0.75rem] text-white tabular-nums shrink-0">{fmt(hour)}</span>
            </div>
            <div className="p-5">
                <div className="relative h-14 rounded-xl bg-white/[0.03] border border-white/[0.07] overflow-hidden">
                    <div className="absolute inset-y-2 rounded-lg bg-[#00B8DB]/20 border border-[#00B8DB]/50" style={{ left: `${W0 * 100}%`, width: `${(W1 - W0) * 100}%` }}>
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[0.6875rem] font-semibold text-[#7FE3F2] whitespace-nowrap">Approved window, 10:00 to 15:00</span>
                    </div>
                    <span className="absolute inset-y-0 w-[2px] bg-white/80" style={{ left: `${p * 100}%` }} />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[0.625rem] text-slate-500">
                    <span>08:00</span>
                    <span>13:00</span>
                    <span>18:00</span>
                </div>
                <div className={`mt-4 flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-colors duration-300 ${inWin ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.08]" : "border-white/[0.08] bg-white/[0.02]"}`}>
                    {inWin ? <Unlock className="w-4 h-4 text-[#7FE3F2] shrink-0" /> : <Lock className="w-4 h-4 text-slate-400 shrink-0" />}
                    <div className="min-w-0">
                        <div className="font-mono text-[0.8125rem] text-white truncate">ACL: j.rahman → dba @ prod-db-01</div>
                        <div className="text-[0.75rem] text-slate-400">{inWin ? "Privileged mapping active" : p >= W1 ? "Reverted to the standard restricted account" : "Standard restricted account"}</div>
                    </div>
                    <span className={`ml-auto shrink-0 text-[0.6875rem] font-semibold px-2 py-1 rounded-md border ${inWin ? "border-[#00B8DB]/40 text-[#7FE3F2]" : "border-white/15 text-slate-300"}`}>{inWin ? "Active" : "Restricted"}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[0.6875rem]">
                    <span className="rounded-md border border-white/[0.1] px-2 py-1 text-slate-300">Rule: business hours only</span>
                    <span className="rounded-md border border-white/[0.1] px-2 py-1 text-slate-300">Target: one asset</span>
                    <span className="rounded-md border border-white/[0.1] px-2 py-1 text-slate-300">Auto-revert on expiry</span>
                </div>
            </div>
        </div>
    );
}

/* Hard-coded secret in a config file, replaced by a vaulted lookup. */
export function ConfigVisual() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.6, once: true });
    const fixed = reduce || seen;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a hard-coded password in a configuration file is replaced by a credential retrieved from OmniPriv">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">app/config/database.yml</span>
                <span className={`ml-auto shrink-0 text-[0.6875rem] font-semibold transition-colors duration-500 ${fixed ? "text-emerald-300" : "text-rose-300"}`}>{fixed ? "No secrets in file" : "Hard-coded secret"}</span>
            </div>
            <pre className="p-4 font-mono text-[0.75rem] sm:text-[0.8125rem] leading-[1.75] text-slate-300 overflow-hidden whitespace-pre-wrap">
                <span className="text-slate-500">production:</span>
                {"\n  "}host: orders-db.internal
                {"\n  "}user: app_orders
                {"\n  "}
                <span className="relative inline-block align-top">
                    <motion.span
                        className="block text-rose-300 line-through decoration-rose-400/70"
                        initial={false}
                        animate={{ opacity: fixed ? 0 : 1, height: fixed ? 0 : "auto" }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        password: &quot;Summer2019!&quot;
                    </motion.span>
                    <motion.span
                        className="block text-[#7FE3F2]"
                        initial={false}
                        animate={{ opacity: fixed ? 1 : 0 }}
                        transition={{ duration: 0.4, delay: 0.9 }}
                    >
                        password: omnipriv.get(&quot;orders-db/app&quot;)
                    </motion.span>
                </span>
                {"\n  "}
                <span className="text-slate-500"># rotated automatically, retrieved with zero added latency</span>
            </pre>
        </div>
    );
}
