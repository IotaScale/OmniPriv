"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock, ScanSearch, ShieldCheck } from "lucide-react";

import Prose from "@/components/sections/Prose";
import type { RichText } from "@/lib/rich-text";

/*
 * The engine's three moves, Detect → Govern → Respond, as a connected
 * pipeline. The connector draws once when the row scrolls into view and each
 * stage lights up in turn. On phones the pipeline runs top to bottom.
 */

/* Icons live here: a server page cannot pass components to a client one. */
const STEP_ICON = { Detect: ScanSearch, Govern: Lock, Respond: ShieldCheck } as const;

export interface Stage {
    step: keyof typeof STEP_ICON;
    title: string;
    paragraphs: RichText[];
}

export default function EnginePipeline({ stages }: { stages: Stage[] }) {
    const reduce = useReducedMotion();
    return (
        <div className="relative">
            {/* connector: horizontal from lg, vertical below */}
            <div className="absolute hidden lg:block left-[16.66%] right-[16.66%] top-[1.75rem] h-px bg-white/[0.08]" aria-hidden="true">
                <motion.span
                    className="absolute inset-0 origin-left bg-[#00B8DB]"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                />
                {!reduce && <span className="aip-run" />}
            </div>
            <div className="absolute lg:hidden left-[1.75rem] top-8 bottom-8 w-px bg-white/[0.08]" aria-hidden="true" />

            <ol className="relative grid lg:grid-cols-3 gap-8 lg:gap-10">
                {stages.map((s, i) => {
                    const Icon = STEP_ICON[s.step];
                    return (
                    <motion.li
                        key={s.title}
                        className="relative pl-[4.75rem] lg:pl-0 lg:text-center"
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.15 + i * 0.35 }}
                    >
                        <span className="absolute left-0 top-0 lg:static lg:mx-auto inline-flex items-center justify-center w-14 h-14 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB] shadow-[0_0_0_6px_rgba(0,184,219,0.06)]">
                            <Icon className="w-6 h-6" aria-hidden="true" />
                        </span>
                        <div className="lg:mt-6 text-[0.8125rem] font-semibold text-[#7FD9EA]">{s.step}</div>
                        <h3 className="mt-1.5 op-card-title text-[1.1875rem]">{s.title}</h3>
                        <div className="mt-2.5 space-y-2 lg:max-w-[22rem] lg:mx-auto">
                            {s.paragraphs.map((p, j) => (
                                <Prose key={j} segments={p} className="text-[0.9375rem]" />
                            ))}
                        </div>
                    </motion.li>
                    );
                })}
            </ol>
        </div>
    );
}
