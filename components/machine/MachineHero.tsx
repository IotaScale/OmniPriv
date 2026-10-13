"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { AppWindow, Boxes, Check, Cloud, Database, GitBranch, KeyRound, ServerCog } from "lucide-react";

/*
 * Machine identity hero: the non-human identities in an estate, brought
 * under PAM one by one. Each beat takes the next identity off a static,
 * long-lived secret and onto a rotated or short-lived credential, and the
 * counters move with it. Loops while in view; names and ages are
 * illustrative.
 */

const IDS = [
    { n: "svc-backup", k: "Service account", i: ServerCog, before: "password · 412 days old", after: "rotated automatically" },
    { n: "payments-sa", k: "Kubernetes service account", i: Boxes, before: "token in a ConfigMap", after: "scoped, policy-bound" },
    { n: "deploy-prod", k: "GitHub Actions", i: GitBranch, before: "secret in pipeline config", after: "OIDC token · 15 min" },
    { n: "billing-api", k: "API token", i: KeyRound, before: "static token · never rotated", after: "rotated · vaulted" },
    { n: "etl-worker", k: "Azure workload identity", i: Cloud, before: "client secret on disk", after: "workload identity" },
    { n: "orders-db", k: "Database credential", i: Database, before: "shared admin password", after: "dynamic secret · per run" },
    { n: "crm-app", k: "Application", i: AppWindow, before: "hard-coded in source", after: "injected at run time" },
];
const STEP_MS = 1200;

export default function MachineHero() {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [n, setN] = useState(reduce ? IDS.length : 2);

    useEffect(() => {
        if (reduce || !seen) return;
        const hold = n >= IDS.length ? STEP_MS * 2.5 : STEP_MS;
        const t = window.setTimeout(() => setN((v) => (v >= IDS.length ? 0 : v + 1)), hold);
        return () => window.clearTimeout(t);
    }, [n, seen, reduce]);

    const controlled = Math.min(n, IDS.length);
    const longLived = IDS.length - controlled;

    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: service accounts, Kubernetes service accounts, pipelines, API tokens, workload identities, database credentials and applications are moved one by one from long-lived static secrets onto rotated or short-lived credentials under PAM control">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">Non-human identities · under PAM</span>
            </div>

            {/* counters */}
            <div className="grid grid-cols-2 gap-2 px-4 pt-4" aria-hidden="true">
                <div className="rounded-xl border border-amber-400/25 bg-amber-400/[0.05] px-3.5 py-2.5">
                    <div className="text-[0.6875rem] text-amber-200/80">Long-lived secrets</div>
                    <div className="mt-0.5 text-[1.5rem] font-bold leading-none tabular-nums text-amber-200" style={{ fontFamily: "var(--font-syne)" }}>
                        {longLived}
                    </div>
                </div>
                <div className="rounded-xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-3.5 py-2.5">
                    <div className="text-[0.6875rem] text-[#7FE3F2]/80">Under PAM control</div>
                    <div className="mt-0.5 text-[1.5rem] font-bold leading-none tabular-nums text-[#7FE3F2]" style={{ fontFamily: "var(--font-syne)" }}>
                        {controlled}
                    </div>
                </div>
            </div>

            {/* identities */}
            <ul className="p-4 space-y-1.5" aria-hidden="true">
                {IDS.map((x, k) => {
                    const done = k < controlled;
                    const now = k === controlled - 1 && !reduce;
                    return (
                        <li key={x.n} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2 transition-colors duration-300 ${now ? "border-[#00B8DB]/55 bg-[#00B8DB]/[0.1]" : "border-white/[0.06] bg-white/[0.02]"}`}>
                            <span className={`inline-flex w-7 h-7 items-center justify-center rounded-lg transition-colors duration-300 ${done ? "bg-[#00B8DB]/15 text-[#7FE3F2]" : "bg-white/[0.05] text-slate-400"}`}>
                                <x.i className="w-3.5 h-3.5" />
                            </span>
                            <span className="min-w-0">
                                <span className="block truncate font-mono text-[0.75rem] font-semibold text-white">{x.n}</span>
                                <span className="block truncate text-[0.625rem] text-slate-500">{x.k}</span>
                            </span>
                            <motion.span
                                key={done ? "a" : "b"}
                                initial={reduce ? false : { opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                className={`inline-flex max-w-[11.5rem] items-center gap-1 truncate rounded-md px-2 py-1 text-[0.625rem] font-semibold ${done ? "bg-[#00B8DB]/[0.12] text-[#7FE3F2]" : "bg-amber-400/[0.1] text-amber-200"}`}
                            >
                                {done && <Check className="w-3 h-3 shrink-0" strokeWidth={3} />}
                                <span className="truncate">{done ? x.after : x.before}</span>
                            </motion.span>
                        </li>
                    );
                })}
            </ul>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem]">
                <span className={`truncate font-semibold transition-colors duration-300 ${longLived === 0 ? "text-emerald-300" : "text-slate-500"}`}>{longLived === 0 ? "No permanent, uncontrolled privilege" : "Bringing machine access under PAM"}</span>
                <span className="font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
        </div>
    );
}
