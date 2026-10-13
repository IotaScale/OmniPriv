"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { KeyRound, Monitor, ScrollText, Search, ShieldCheck, SlidersHorizontal, Zap } from "lucide-react";

/*
 * "Why Choose OmniPriv": the seven capabilities as one continuous lifecycle.
 * A rail fills as the reader scrolls; each step lights as it reaches the
 * middle of the screen. Icons live here (not passed from the server page).
 */

const ICONS: Record<string, typeof Search> = {
    Discover: Search,
    Verify: ShieldCheck,
    Control: SlidersHorizontal,
    Protect: KeyRound,
    Monitor: Monitor,
    Respond: Zap,
    Audit: ScrollText,
};
const OUTCOME: Record<string, string> = {
    Discover: "Know what exists",
    Verify: "Know who, or what, is asking",
    Control: "Only what the task needs",
    Protect: "Secrets never exposed",
    Monitor: "See every privileged session",
    Respond: "Stop it while it happens",
    Audit: "Prove what happened",
};

export default function CapabilityTimeline({ items }: { items: { title: string; text: string }[] }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
    const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

    return (
        <ol ref={ref} className="relative">
            {/* rail */}
            <span className="absolute left-[1.375rem] top-3 bottom-3 w-px bg-slate-900/[0.08] dark:bg-white/[0.08]" aria-hidden="true" />
            <motion.span className="absolute left-[1.375rem] top-3 bottom-3 w-px origin-top bg-[#00B8DB]" style={{ scaleY: reduce ? 1 : fill }} aria-hidden="true" />
            {items.map((c, k) => {
                const Icon = ICONS[c.title] ?? ShieldCheck;
                return (
                    <motion.li
                        key={c.title}
                        className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 pb-6 last:pb-0"
                        initial={reduce ? false : "off"}
                        whileInView="on"
                        viewport={{ once: true, amount: 0.9, margin: "0px 0px -35% 0px" }}
                        variants={{ off: {}, on: {} }}
                    >
                        <motion.span
                            className="relative z-10 inline-flex w-11 h-11 items-center justify-center rounded-2xl border"
                            variants={{
                                off: { backgroundColor: "rgba(0,184,219,0.08)", color: "#00B8DB", borderColor: "rgba(0,184,219,0.25)" },
                                on: { backgroundColor: "#00B8DB", color: "#03121c", borderColor: "#00B8DB" },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Icon className="w-5 h-5" aria-hidden="true" />
                        </motion.span>
                        <motion.div
                            className="aip-card min-w-0 rounded-2xl border p-5 lg:p-6 grid sm:grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-2 items-start"
                            variants={{ off: { opacity: 0.55, x: 0 }, on: { opacity: 1, x: 4 } }}
                            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                        >
                            <div className="min-w-0">
                                <h3 className="op-card-title">{c.title}</h3>
                                <p className="op-card-text mt-1.5">{c.text}</p>
                            </div>
                            <span className="justify-self-start sm:justify-self-end rounded-full bg-[#00B8DB]/10 px-3 py-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2] whitespace-nowrap">
                                {OUTCOME[c.title]}
                            </span>
                        </motion.div>
                    </motion.li>
                );
            })}
        </ol>
    );
}
