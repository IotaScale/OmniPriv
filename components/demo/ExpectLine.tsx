"use client";

import { motion, useReducedMotion } from "framer-motion";

/* The line joining the four "What to expect" steps draws in when it scrolls into view. */
export default function ExpectLine() {
    const reduce = useReducedMotion();
    return (
        <span className="hidden lg:block absolute left-[12%] right-[12%] top-[2.6rem] h-px bg-[#00B8DB]/15" aria-hidden="true">
            <motion.span
                className="absolute inset-0 origin-left bg-gradient-to-r from-[#00B8DB]/40 via-[#00B8DB] to-[#00B8DB]/40"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            />
        </span>
    );
}
