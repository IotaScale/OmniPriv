"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Ban, Building2, Check, Database, Globe, Lock, RefreshCw, Server, Shield, Siren, Terminal, Wifi, WifiOff } from "lucide-react";

/* Illustrations for /platform/infrastructure-deployment. Values are illustrative. */

const ease = [0.23, 1, 0.32, 1] as const;
const frame = "rounded-2xl border border-slate-900/[0.07] dark:border-white/[0.07] bg-slate-50 dark:bg-[#111214]";
const chip = "rounded-lg border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a]";

function useLoop(steps: number, ms: number, amount = 0.45) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % steps), ms);
        return () => window.clearInterval(t);
    }, [seen, reduce, steps, ms]);
    return { ref, i: reduce ? 0 : i, reduce: !!reduce };
}

/* On-premise: the platform and its targets sit inside your estate. */
export function EstateVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="rounded-xl border border-dashed border-[#00B8DB]/45 p-2.5">
                <div className="text-[0.625rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">Your estate</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className={`${chip} inline-flex items-center gap-1 px-2 py-1 text-[0.6875rem] font-semibold text-slate-800 dark:text-slate-200`}>
                        <Shield className="w-3.5 h-3.5 text-[#00667A] dark:text-[#00B8DB]" /> OmniPriv
                    </span>
                    {["servers", "databases"].map((t) => (
                        <span key={t} className={`${chip} px-2 py-1 text-[0.6875rem] text-slate-600 dark:text-slate-400`}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[0.6875rem] text-slate-500">
                <Ban className="w-3.5 h-3.5 text-rose-500" /> no internet-hosted control plane
            </div>
        </div>
    );
}

/* Software appliance over any of the supported platforms. */
export function HypervisorVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="rounded-lg border border-[#00B8DB]/40 bg-[#00B8DB]/[0.07] py-1.5 text-center text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">OmniPriv software appliance</div>
            <div className="mt-1.5 flex flex-wrap justify-center gap-1.5">
                {["VMware", "Red Hat", "OpenStack"].map((p) => (
                    <span key={p} className={`${chip} flex-1 py-1.5 px-2 text-center text-[0.6875rem] text-slate-700 dark:text-slate-300 whitespace-nowrap`}>
                        {p}
                    </span>
                ))}
            </div>
            <div className="mt-1.5 rounded-lg bg-slate-900/[0.04] dark:bg-white/[0.04] py-1.5 text-center text-[0.625rem] text-slate-500">any vendor&apos;s hardware</div>
        </div>
    );
}

/* One console over one repository. */
export function ConsoleVisual() {
    const { ref, i } = useLoop(4, 1300);
    const tabs = ["Vault", "Sessions", "Policies", "Audit"];
    return (
        <div ref={ref} className={`${frame} p-4`} aria-hidden="true">
            <div className={`${chip} overflow-hidden`}>
                <div className="flex gap-1 border-b border-slate-900/[0.06] dark:border-white/[0.06] p-1.5">
                    {tabs.map((t, k) => (
                        <span key={t} className={`flex-1 rounded-md py-1 text-center text-[0.625rem] font-semibold transition-colors duration-300 ${k === i ? "bg-[#00B8DB]/[0.12] text-[#00667A] dark:text-[#7FE3F2]" : "text-slate-500"}`}>
                            {t}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-2 px-2.5 py-2 text-[0.6875rem] text-slate-600 dark:text-slate-400">
                    <Database className="w-3.5 h-3.5 text-[#00667A] dark:text-[#00B8DB]" /> one central credential repository
                </div>
            </div>
        </div>
    );
}

/* Browser or command line. */
export function BrowserCliVisual() {
    return (
        <div className={`${frame} p-4`} aria-hidden="true">
            <div className="flex flex-wrap gap-1.5">
                {["Edge", "Chrome", "Firefox", "Safari"].map((b) => (
                    <span key={b} className={`${chip} inline-flex items-center gap-1 px-2 py-1 text-[0.6875rem] text-slate-700 dark:text-slate-300`}>
                        <Globe className="w-3 h-3 text-[#00667A] dark:text-[#00B8DB]" /> {b}
                    </span>
                ))}
            </div>
            <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#0b0c0e] px-2.5 py-1.5 font-mono text-[0.6875rem] text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-[#7FE3F2]" />
                <span className="text-[#7FE3F2]">$</span> CLI, same controls
                <span className="aip-caret ml-0.5" />
            </div>
        </div>
    );
}

/* High availability: a node misses its heartbeat, is restarted, traffic rebalances. */
const PHASES = [
    { s: ["ok", "ok", "ok"], share: [34, 33, 33], msg: "All nodes healthy · heartbeat steady" },
    { s: ["ok", "miss", "ok"], share: [34, 33, 33], msg: "node-2 missed its heartbeat" },
    { s: ["ok", "restart", "ok"], share: [50, 0, 50], msg: "Health check failed · container restarting · load moved" },
    { s: ["ok", "sync", "ok"], share: [50, 0, 50], msg: "node-2 back · database replica catching up" },
    { s: ["ok", "ok", "ok"], share: [34, 33, 33], msg: "Cluster rebalanced · nothing was waited on" },
];
export function FailoverVisual() {
    const { ref, i, reduce } = useLoop(PHASES.length, 1700);
    const ph = PHASES[i];
    const tone = (s: string) =>
        s === "ok" ? "border-emerald-400/35 text-emerald-300" : s === "miss" ? "border-amber-400/50 text-amber-300" : s === "restart" ? "border-rose-400/45 text-rose-300" : "border-[#00B8DB]/50 text-[#7FE3F2]";
    const label = (s: string) => (s === "ok" ? "healthy" : s === "miss" ? "no heartbeat" : s === "restart" ? "restarting" : "replicating");
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: in a multi-node cluster a node misses its heartbeat, fails its health check and is restarted automatically while load balancing moves its traffic, then database replication brings it back in line">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <RefreshCw className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Cluster · 3 nodes</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-5">
                <div className="grid grid-cols-3 gap-2">
                    {ph.s.map((s, k) => (
                        <div key={k} className={`rounded-xl border bg-white/[0.02] px-3 py-3 transition-colors duration-300 ${tone(s)}`}>
                            <div className="flex items-center gap-1.5">
                                <Server className="w-4 h-4 shrink-0 text-slate-300" aria-hidden="true" />
                                <span className="font-mono text-[0.75rem] font-semibold text-white">node-{k + 1}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 text-[0.6875rem] font-semibold">
                                {s === "restart" ? <RefreshCw className={`w-3 h-3 ${reduce ? "" : "aip-spin"}`} /> : <span className={`w-1.5 h-1.5 rounded-full bg-current ${s === "ok" && !reduce ? "aip-blink" : ""}`} />}
                                {label(s)}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 text-[0.6875rem] text-slate-500">Load balancer · traffic share</div>
                <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    {ph.share.map((v, k) => (
                        <motion.span key={k} className={`h-full ${["bg-[#00B8DB]", "bg-[#7FE3F2]", "bg-[#0e7490]"][k]}`} initial={false} animate={{ flexGrow: v }} style={{ flexBasis: 0 }} transition={{ duration: reduce ? 0 : 0.6, ease }} />
                    ))}
                </div>
                <motion.div key={ph.msg} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease }} className="mt-4 rounded-xl border border-white/[0.08] bg-[#0b0c0e] px-3.5 py-2.5 text-[0.75rem] text-slate-200">
                    {ph.msg}
                </motion.div>
            </div>
        </div>
    );
}

/* Tenants, emergency access and the extra vault password, in one panel. */
export function TenantVisual() {
    const { ref, i, reduce } = useLoop(4, 1800, 0.35);
    const tenants = [
        { t: "Subsidiary A", s: "schema tenant_a" },
        { t: "Subsidiary B", s: "schema tenant_b" },
        { t: "MSP customer", s: "schema tenant_c" },
    ];
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: dedicated ROOT, DEFAULT and SYSTEM organizations sit above isolated tenants, each with its own schema and RBAC; a break-glass use is written to the audit trail; the vault asks for a secondary security password; offline devices stay managed">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <Building2 className="w-4 h-4 text-[#7FE3F2]" aria-hidden="true" />
                <span className="text-[0.75rem] font-mono text-slate-400 truncate">Organizations · isolation by org_id</span>
                <span className="ml-auto text-[0.6875rem] font-mono text-slate-500 shrink-0">illustrative</span>
            </div>
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-1.5">
                    {["ROOT", "DEFAULT", "SYSTEM"].map((o) => (
                        <span key={o} className="rounded-lg border border-[#00B8DB]/35 bg-[#00B8DB]/[0.07] py-1.5 text-center font-mono text-[0.6875rem] font-semibold text-[#7FE3F2]">
                            {o}
                        </span>
                    ))}
                </div>
                <ul className="space-y-1.5">
                    {tenants.map((t, k) => (
                        <li key={t.t} className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-xl border px-3 py-2 text-[0.75rem] transition-colors duration-300 ${k === i % 3 ? "border-white/[0.16] bg-white/[0.05]" : "border-white/[0.07] bg-white/[0.02]"}`}>
                            <span className="truncate font-semibold text-white">{t.t}</span>
                            <span className="font-mono text-[0.625rem] text-slate-500">{t.s}</span>
                            <span className="rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[0.625rem] font-semibold text-slate-300">own RBAC</span>
                        </li>
                    ))}
                </ul>
                <div className="grid sm:grid-cols-2 gap-1.5">
                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3 py-2.5 text-[0.75rem]">
                        <Lock className="w-4 h-4 shrink-0 text-[#7FE3F2]" aria-hidden="true" />
                        <span className="min-w-0">
                            <span className="block text-white">Password Vault</span>
                            <span className="block text-[0.625rem] text-slate-500">secondary password required</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-[#0b0c0e] px-3 py-2.5 text-[0.75rem]">
                        {i % 2 ? <WifiOff className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" /> : <Wifi className="w-4 h-4 shrink-0 text-[#7FE3F2]" aria-hidden="true" />}
                        <span className="min-w-0">
                            <span className="block text-white">Field laptop</span>
                            <span className="block text-[0.625rem] text-slate-500">{i % 2 ? "offline · credential still managed" : "back online · credential current"}</span>
                        </span>
                    </div>
                </div>
                <motion.div
                    initial={false}
                    animate={{ opacity: i === 3 || reduce ? 1 : 0.55 }}
                    transition={{ duration: 0.3 }}
                    className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${i === 3 ? "border-amber-400/45 bg-amber-400/[0.08] text-amber-200" : "border-white/[0.07] text-slate-400"}`}
                >
                    <Siren className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="truncate">Break-glass used</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[0.6875rem] text-emerald-300 shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" /> in audit trail
                    </span>
                </motion.div>
            </div>
        </div>
    );
}
