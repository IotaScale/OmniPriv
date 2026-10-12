"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Cloud, Radar, Ticket, Users } from "lucide-react";

/*
 * AI-ready: OmniPriv in the middle, the four integration areas named in the
 * copy around it. Links draw in when the block scrolls into view, then a
 * soft signal runs along each one. Phones get a 2x2 grid without links.
 */
const ITEMS = [
    { label: "Directory services", icon: Users },
    { label: "Cloud environments", icon: Cloud },
    { label: "IT service management", icon: Ticket },
    { label: "Security monitoring", icon: Radar },
];

function Chip({ label, Icon }: { label: string; Icon: typeof Users }) {
    return (
        <span className="relative z-10 flex items-center gap-2 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] px-3 py-2.5 text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300 shadow-[0_8px_20px_-16px_rgba(10,22,40,0.5)]">
            <Icon className="w-4 h-4 shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
            <span className="truncate">{label}</span>
        </span>
    );
}

export default function IntegrationHub() {
    const reduce = useReducedMotion();
    const line = (origin: "left" | "right", i: number) => (
        <span className="relative block h-px flex-1 bg-slate-900/[0.1] dark:bg-white/[0.1] overflow-hidden" aria-hidden="true">
            <motion.span
                className="absolute inset-0 bg-[#00B8DB]"
                style={{ transformOrigin: origin === "left" ? "right" : "left" }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.77, 0, 0.175, 1] }}
            />
            {!reduce && <span className={`aip-signal ${origin === "left" ? "is-rev" : ""}`} style={{ animationDelay: `${1.2 + i * 0.5}s` }} />}
        </span>
    );
    return (
        <div>
            {/* sm+: hub with links */}
            <div className="hidden sm:grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-y-3">
                {[0, 1].map((row) => (
                    <div key={`l${row}`} className="flex items-center" style={{ gridColumn: 1, gridRow: row + 1 }}>
                        <Chip label={ITEMS[row * 2].label} Icon={ITEMS[row * 2].icon} />
                        {line("left", row * 2)}
                    </div>
                ))}
                <div className="row-span-2 flex items-center" style={{ gridColumn: 2, gridRow: "1 / span 2" }}>
                    <span className="relative inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-[#0a1628] dark:bg-[#0b0c0e] border border-[#00B8DB]/45 shadow-[0_0_0_8px_rgba(0,184,219,0.07)]">
                        <span className="text-[0.6875rem] text-slate-400">OmniPriv</span>
                        <span className="text-[0.9375rem] font-bold text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            AI-PAM
                        </span>
                    </span>
                </div>
                {[0, 1].map((row) => (
                    <div key={`r${row}`} className="flex items-center" style={{ gridColumn: 3, gridRow: row + 1 }}>
                        {line("right", row * 2 + 1)}
                        <Chip label={ITEMS[row * 2 + 1].label} Icon={ITEMS[row * 2 + 1].icon} />
                    </div>
                ))}
            </div>
            {/* phones */}
            <div className="sm:hidden grid grid-cols-2 gap-2.5">
                {ITEMS.map((it) => (
                    <Chip key={it.label} label={it.label} Icon={it.icon} />
                ))}
            </div>
        </div>
    );
}
