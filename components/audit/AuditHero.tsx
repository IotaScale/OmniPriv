"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Check, FileText, Link2, ShieldCheck } from "lucide-react";

/*
 * Audit hero: privileged activity becomes evidence.
 *   events stream in, each one hash-linked to the last,
 *   each is counted against the frameworks it maps to,
 *   and the scheduled evidence pack fills until it is ready.
 * Loops while in view; names, hosts and times are illustrative.
 */

const POOL = [
    { who: "j.carter", act: "SSH session recorded", tgt: "linux-prod-01", fw: [0, 1, 2] },
    { who: "vendor.acme", act: "RDP session monitored", tgt: "win-db-02", fw: [0, 4] },
    { who: "m.alvi", act: "JIT access approved", tgt: "oracle-fin", fw: [1, 5] },
    { who: "svc-backup", act: "Password rotated", tgt: "esxi-03", fw: [2, 4] },
    { who: "a.khan", act: "Command blocked", tgt: "k8s-prod", fw: [0, 2, 3] },
    { who: "r.lee", act: "Session terminated", tgt: "pg-billing", fw: [3, 5] },
];

const FRAMEWORKS = ["SOC 2", "ISO 27001", "NIST 800-53", "HIPAA", "PCI DSS", "SOX 404"];
const TICK_MS = 1500;
const PACK_STEPS = 8;
const hash = (n: number) => ((n * 2654435761) >>> 0).toString(16).slice(0, 6);
const time = (n: number) => {
    const s = 41 * 60 + 2 + n * 7;
    return `09:${String(Math.floor(s / 60) % 60).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export default function AuditHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [n, setN] = useState(3);
    const [counts, setCounts] = useState([14, 11, 12, 6, 9, 7]);
    const [pulse, setPulse] = useState<number[]>([]);

    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setN((v) => v + 1), TICK_MS);
        return () => window.clearInterval(t);
    }, [seen, reduce]);

    useEffect(() => {
        if (n === 3) return;
        const ev = POOL[n % POOL.length];
        setCounts((c) => c.map((v, i) => (ev.fw.includes(i) ? v + 1 : v)));
        setPulse(ev.fw);
        const t = window.setTimeout(() => setPulse([]), 700);
        return () => window.clearTimeout(t);
    }, [n]);

    const rows = [n - 3, n - 2, n - 1, n].reverse();
    const pack = reduce ? PACK_STEPS : n % (PACK_STEPS + 2);
    const ready = pack >= PACK_STEPS;

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: privileged activity is captured as hash-linked audit records, counted against mapped compliance frameworks, and gathered into a scheduled evidence report">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Audit evidence · privileged activity</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 aip-blink" /> Live
                </span>
            </div>

            {/* event stream */}
            <ul className="p-4 pb-2 space-y-1.5" aria-hidden="true">
                                    {rows.map((r, k) => {
                        const ev = POOL[((r % POOL.length) + POOL.length) % POOL.length];
                        return (
                            <motion.li
                                key={r}
                                layout={!reduce}
                                initial={reduce ? false : { opacity: 0, y: -10 }}
                                animate={{ opacity: k === 3 ? 0.45 : 1, y: 0 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2 ${k === 0 ? "border-[#00B8DB]/40 bg-[#00B8DB]/[0.07]" : "border-white/[0.07] bg-white/[0.02]"}`}
                            >
                                <span className="font-mono text-[0.6875rem] text-slate-500">{time(r)}</span>
                                <span className="min-w-0 truncate text-[0.75rem]">
                                    <span className="font-semibold text-white">{ev.who}</span>
                                    <span className="text-slate-400"> · {ev.act} · </span>
                                    <span className="font-mono text-slate-300">{ev.tgt}</span>
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-[0.625rem] text-[#7FE3F2]">
                                    <Link2 className="w-3 h-3" /> {hash(r)}
                                </span>
                            </motion.li>
                        );
                    })}
            </ul>

            {/* framework counters */}
            <div className="px-4 pt-2">
                <div className="text-[0.6875rem] text-slate-500 mb-2">Evidence counted against mapped frameworks</div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1.5" aria-hidden="true">
                    {FRAMEWORKS.map((f, i) => {
                        const on = pulse.includes(i);
                        return (
                            <li key={f} className={`flex items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                                <span className="text-[0.6875rem] font-semibold text-slate-200 truncate">{f}</span>
                                <span className={`font-mono text-[0.6875rem] tabular-nums transition-colors duration-300 ${on ? "text-[#7FE3F2]" : "text-slate-500"}`}>{counts[i]}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* scheduled pack */}
            <div className="m-4 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-3">
                <div className="flex items-center gap-2 text-[0.75rem]">
                    <FileText className="w-4 h-4 text-slate-300 shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-white truncate">Scheduled privileged access report</span>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={ready ? "r" : "b"}
                            initial={reduce ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            className={`ml-auto inline-flex items-center gap-1 text-[0.6875rem] font-semibold shrink-0 ${ready ? "text-emerald-300" : "text-slate-400"}`}
                        >
                            {ready ? (
                                <>
                                    <Check className="w-3.5 h-3.5" strokeWidth={3} /> Ready for auditors
                                </>
                            ) : (
                                "Collecting"
                            )}
                        </motion.span>
                    </AnimatePresence>
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">
                    <motion.div
                        className={`h-full w-full origin-left rounded-full transition-colors duration-300 ${ready ? "bg-emerald-400" : "bg-[#00B8DB]"}`}
                        initial={false}
                        animate={{ scaleX: Math.min(pack, PACK_STEPS) / PACK_STEPS }}
                        transition={{ duration: reduce ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="inline-flex items-center gap-1.5 truncate">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" aria-hidden="true" /> Tamper-resistant, hash-linked records
                </span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
