"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, Ban, Bell, ShieldAlert, Terminal } from "lucide-react";

/*
 * AI threat protection hero: one privileged session going wrong, and the
 * platform catching it. Commands stream in; the behavioral risk score
 * climbs with each suspicious one; escalation is tiered (dashboard alert,
 * admin alert, automatic block); the 10-second sweep isolates the session
 * and closes it after its 10-second grace window. Sessions and commands are
 * illustrative.
 */

type Cmd = { c: string; risk: number; flag?: string };
const SESSIONS: { who: string; target: string; cmds: Cmd[] }[] = [
    {
        who: "svc-deploy",
        target: "linux_prod_01",
        cmds: [
            { c: "uptime", risk: 0.04 },
            { c: "cat /etc/passwd", risk: 0.22, flag: "Reconnaissance" },
            { c: "sshpass -p **** ssh db-02", risk: 0.58, flag: "Lateral movement" },
            { c: "tar czf /tmp/x.tgz /var/lib/pgsql", risk: 0.86, flag: "Unexpected data volume" },
        ],
    },
    {
        who: "j.rahman",
        target: "win-app-03",
        cmds: [
            { c: "Get-Service", risk: 0.05 },
            { c: "whoami /priv", risk: 0.24, flag: "Privilege enumeration" },
            { c: "reg save HKLM\\SAM sam.hiv", risk: 0.62, flag: "Credential harvesting" },
            { c: "Invoke-Mimikatz", risk: 0.93, flag: "Credential harvesting" },
        ],
    },
];

const TIERS = [
    { k: "Dashboard alert", at: 0.4, icon: Bell },
    { k: "Admin alert", at: 0.6, icon: AlertTriangle },
    { k: "Automatic block", at: 0.8, icon: Ban },
];

const CMD_MS = 1050;

export default function ThreatHero() {
    const reduce = useReducedMotion();
    const [si, setSi] = useState(0);
    const [n, setN] = useState(reduce ? 4 : 0); // commands shown
    const [grace, setGrace] = useState(10);
    const s = SESSIONS[si];
    const risk = n ? s.cmds[Math.min(n, s.cmds.length) - 1].risk : 0;
    const blocked = risk >= 0.8;
    const closed = blocked && grace <= 0;

    useEffect(() => {
        if (reduce) return;
        if (n < s.cmds.length) {
            const t = window.setTimeout(() => setN((v) => v + 1), n === 0 ? 600 : CMD_MS);
            return () => window.clearTimeout(t);
        }
        // grace countdown, sped up 4x for the illustration
        if (grace > 0) {
            const t = window.setTimeout(() => setGrace((g) => g - 1), 160);
            return () => window.clearTimeout(t);
        }
        const t = window.setTimeout(() => {
            setSi((v) => (v + 1) % SESSIONS.length);
            setN(0);
            setGrace(10);
        }, 2200);
        return () => window.clearTimeout(t);
    }, [n, grace, reduce, s.cmds.length]);

    const gaugeColor = risk >= 0.8 ? "#f43f5e" : risk >= 0.4 ? "#f59e0b" : "#00B8DB";

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: a privileged session's behavioral risk score rises with suspicious commands, alerts escalate, and the session is blocked and closed automatically">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">AI-PAM engine · behavioral analysis</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300 shrink-0">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            <div className="grid sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] gap-3 p-4">
                {/* session */}
                <div className="rounded-2xl border border-white/[0.07] bg-[#0b0c0e] p-3.5 font-mono text-[0.6875rem] leading-relaxed min-h-[14rem] min-w-0">
                    <div className="flex items-center justify-between gap-2 text-slate-500">
                        <span className="inline-flex items-center gap-1.5 truncate">
                            <Terminal className="w-3.5 h-3.5 shrink-0" /> {s.who} → {s.target}
                        </span>
                        {closed ? (
                            <span className="text-rose-300 shrink-0">terminated</span>
                        ) : (
                            <span className="inline-flex items-center gap-1 text-rose-300 shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 aip-blink" /> REC
                            </span>
                        )}
                    </div>
                    <ul className="mt-2.5 space-y-1.5">
                        <AnimatePresence initial={false}>
                            {s.cmds.slice(0, n).map((c) => (
                                <motion.li
                                    key={`${si}-${c.c}`}
                                    initial={reduce ? false : { opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="min-w-0"
                                >
                                    <div className={`truncate ${c.risk >= 0.8 ? "text-rose-300" : c.flag ? "text-amber-200" : "text-slate-300"}`}>
                                        <span className="text-[#7FD9EA]">$</span> {c.c}
                                    </div>
                                    {c.flag && <div className={`pl-3 font-sans text-[0.6875rem] ${c.risk >= 0.8 ? "text-rose-300" : "text-amber-300"}`}>flagged: {c.flag}</div>}
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    {blocked && (
                        <div className="mt-3 rounded-lg border border-rose-500/30 bg-rose-500/10 px-2.5 py-2 font-sans text-rose-200">
                            {closed ? "Session closed after the grace window. Identity isolated." : `Isolated by the 10-second sweep · closing in ${grace}s`}
                        </div>
                    )}
                </div>

                {/* score + tiers */}
                <div className="flex flex-col gap-3 min-w-0">
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3.5">
                        <div className="text-[0.6875rem] text-slate-400">Behavioral risk score</div>
                        <div className="mt-1 text-[2rem] leading-none font-bold tabular-nums" style={{ fontFamily: "var(--font-syne)", color: gaugeColor, transition: "color .3s" }}>
                            {risk.toFixed(2)}
                        </div>
                        <div className="mt-3 relative h-2 rounded-full bg-white/[0.07] overflow-hidden">
                            <motion.span className="absolute inset-y-0 left-0 rounded-full" style={{ background: gaugeColor }} animate={{ width: `${risk * 100}%` }} transition={{ duration: reduce ? 0 : 0.5, ease: [0.23, 1, 0.32, 1] }} />
                            {TIERS.map((t) => (
                                <span key={t.k} className="absolute inset-y-0 w-px bg-white/30" style={{ left: `${t.at * 100}%` }} />
                            ))}
                        </div>
                        <div className="mt-1.5 text-[0.625rem] text-slate-500">39 features, scored 0 to 1</div>
                    </div>
                    <ul className="space-y-1.5">
                        {TIERS.map((t) => {
                            const on = risk >= t.at;
                            const Icon = t.icon;
                            return (
                                <li key={t.k} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[0.75rem] font-semibold transition-colors duration-300 ${on ? (t.at >= 0.8 ? "border-rose-500/40 bg-rose-500/10 text-rose-200" : "border-amber-400/35 bg-amber-400/10 text-amber-200") : "border-white/[0.07] text-slate-500"}`}>
                                    <Icon className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{t.k}</span>
                                </li>
                            );
                        })}
                    </ul>
                    {closed && (
                        <div className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-emerald-300">
                            <ShieldAlert className="w-4 h-4" /> Contained, evidence recorded
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Detection and response at the privileged-access layer</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}
