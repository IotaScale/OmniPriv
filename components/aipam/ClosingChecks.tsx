"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Clock } from "lucide-react";

/*
 * Closing band: the request flow from the hero, as one line that settles
 * when it scrolls into view. Identity, policy and risk tick in turn, then
 * access opens for a limited time.
 */
const STEPS = ["Identity verified", "Policy matched", "Risk scored"];

export default function ClosingChecks() {
    const reduce = useReducedMotion();
    return (
        <motion.ol
            className="flex flex-wrap items-center gap-2"
            initial={reduce ? false : "hide"}
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            variants={{ show: { transition: { staggerChildren: 0.28, delayChildren: 0.2 } } }}
            aria-label="Every request: identity verified, policy matched, risk scored, then time-limited access"
        >
            {STEPS.map((s) => (
                <motion.li
                    key={s}
                    variants={{ hide: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#00B8DB]/30 bg-[#00B8DB]/[0.08] px-3 py-1.5 text-[0.8125rem] font-medium text-[#7FE3F2]"
                >
                    <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                    {s}
                </motion.li>
            ))}
            <motion.li
                variants={{ hide: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#00B8DB] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#03121c]"
            >
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                Access granted, time-limited
            </motion.li>
        </motion.ol>
    );
}
