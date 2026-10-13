"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Building2, Check, Code2, UserCheck, Users } from "lucide-react";

/*
 * Human identity hero: four kinds of people, one access lifecycle.
 * Each round picks a person (admin, developer, employee, vendor) and walks
 * their request through Verify → Authorize → Grant → Monitor → Revoke,
 * ending with nothing left standing. Loops while in view; names, systems
 * and durations are illustrative.
 */

const PEOPLE = [
    {
        role: "IT Administrator",
        who: "a.khan",
        i: UserCheck,
        target: "esxi-03",
        task: "Host patching",
        steps: ["MFA verified · hardware token", "Policy allows · change window open", "Admin rights for 60 min", "Session recorded · 18 commands", "Admin rights removed"],
    },
    {
        role: "Developer",
        who: "s.patel",
        i: Code2,
        target: "k8s-prod",
        task: "Hotfix deploy",
        steps: ["MFA verified · TOTP", "Approved by team lead", "Scoped access for 30 min · no key handed over", "Session recorded · kubectl only", "Access removed, secret rotated"],
    },
    {
        role: "Employee",
        who: "l.martin",
        i: Users,
        target: "hr-db",
        task: "Payroll export",
        steps: ["MFA verified · biometric", "Least-privilege role · read only", "Read access for 15 min", "Query volume within baseline", "Access removed"],
    },
    {
        role: "Vendor",
        who: "vendor.acme",
        i: Building2,
        target: "win-db-02",
        task: "Database upgrade",
        steps: ["MFA verified · email code", "Two approvals · contract on file", "Brokered RDP for 2 h · password never shown", "Session recorded · live view on", "Access removed on time"],
    },
];
const STAGES = ["Verify", "Authorize", "Grant", "Monitor", "Revoke"];
const STEP_MS = 1150;

export default function HumanHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [t, setT] = useState(reduce ? STAGES.length - 1 : 1);

    useEffect(() => {
        if (reduce || !seen) return;
        const last = t % (STAGES.length + 1) === STAGES.length;
        const id = window.setTimeout(() => setT((v) => v + 1), last ? STEP_MS * 1.6 : STEP_MS);
        return () => window.clearTimeout(id);
    }, [t, seen, reduce]);

    const round = Math.floor(t / (STAGES.length + 1));
    const stage = Math.min(t % (STAGES.length + 1), STAGES.length - 1);
    const done = reduce || t % (STAGES.length + 1) === STAGES.length;
    const p = PEOPLE[round % PEOPLE.length];

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: administrators, developers, employees and vendors each request privileged access, which is verified, authorized, granted for a limited time, monitored and then revoked">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Privileged access · human identities</span>
            </div>

            {/* who */}
            <ul className="grid grid-cols-4 gap-1.5 px-4 pt-4" aria-hidden="true">
                {PEOPLE.map((x, k) => {
                    const on = k === round % PEOPLE.length;
                    return (
                        <li key={x.role} className={`flex min-w-0 flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2.5 transition-colors duration-300 ${on ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full transition-colors duration-300 ${on ? "bg-[#00B8DB] text-[#03121c]" : "bg-white/[0.05] text-slate-400"}`}>
                                <x.i className="w-3.5 h-3.5" />
                            </span>
                            <span className={`max-w-full text-center text-[0.625rem] font-semibold leading-tight transition-colors duration-300 ${on ? "text-white" : "text-slate-500"}`}>{x.role}</span>
                        </li>
                    );
                })}
            </ul>

            {/* request */}
            <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-2.5 text-[0.75rem]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={p.who}
                        initial={reduce ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="min-w-0 truncate"
                    >
                        <span className="font-semibold text-white">{p.who}</span>
                        <span className="text-slate-400"> requests </span>
                        <span className="font-mono text-[#7FE3F2]">{p.target}</span>
                        <span className="text-slate-500"> · {p.task}</span>
                    </motion.span>
                </AnimatePresence>
            </div>

            {/* lifecycle */}
            <ol className="p-4 space-y-1.5">
                {STAGES.map((s, k) => {
                    const passed = k < stage || (done && k <= stage);
                    const now = k === stage && !done;
                    const revoke = k === 4 && passed;
                    return (
                        <li key={s} className={`grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2 transition-colors duration-300 ${now ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.09]" : revoke ? "border-emerald-400/35 bg-emerald-400/[0.07]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <span className={`text-[0.75rem] font-semibold ${passed || now ? "text-white" : "text-slate-500"}`}>{s}</span>
                            <span className={`truncate text-[0.6875rem] transition-colors duration-300 ${passed || now ? "text-slate-300" : "text-slate-600"}`}>{passed || now ? p.steps[k] : "waiting"}</span>
                            <span className={`inline-flex w-4 h-4 items-center justify-center rounded-full border transition-colors duration-300 ${passed ? (revoke ? "border-emerald-400/60 bg-emerald-400/20 text-emerald-300" : "border-[#00B8DB]/60 bg-[#00B8DB]/20 text-[#7FE3F2]") : now ? "border-[#00B8DB]/70" : "border-white/15"}`}>
                                {passed ? <Check className="w-2.5 h-2.5" strokeWidth={3.5} /> : now ? <span className="w-1.5 h-1.5 rounded-full bg-[#7FE3F2] aip-blink" /> : null}
                            </span>
                        </li>
                    );
                })}
            </ol>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem]">
                <span className={`truncate font-semibold transition-colors duration-300 ${done ? "text-emerald-300" : "text-slate-500"}`}>{done ? "Standing privilege left behind: none" : "Elevated only while the task runs"}</span>
                <span className="font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
        </div>
    );
}
