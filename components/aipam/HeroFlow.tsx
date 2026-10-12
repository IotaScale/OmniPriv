"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Bot, Check, Cloud, CreditCard, Database, Hourglass, LayoutGrid, Server, User, X } from "lucide-react";

/*
 * /ai-pam hero visual: one privileged request at a time, end to end.
 *
 *   identity  ──►  OmniPriv AI-PAM engine  ──►  target
 *   (human, machine, AI agent)   checks identity, policy, risk
 *
 * A request leaves its identity, reaches the engine, the three checks tick
 * in turn, and then it either continues to its target (granted, in scope,
 * rotated after use), waits at the engine for a human (held), or stops
 * there (blocked). Five scenarios loop. Everything is drawn in one SVG so it
 * scales as a single picture; names and targets are illustrative.
 *
 * Reduced motion: the first scenario is shown resolved, nothing moves.
 */

const W = 600;
const H = 400;
const CORE = { x: 300, y: 200, r: 58 };

const IDS = [
    { key: "human", label: "Human", icon: User, y: 100 },
    { key: "machine", label: "Machine", icon: Server, y: 200 },
    { key: "agent", label: "AI agent", icon: Bot, y: 300 },
] as const;

const TARGETS = [
    { key: "db", label: "prod-db-01", icon: Database, y: 80 },
    { key: "cloud", label: "Cloud", icon: Cloud, y: 160 },
    { key: "crm", label: "CRM", icon: LayoutGrid, y: 240 },
    { key: "billing", label: "Billing", icon: CreditCard, y: 320 },
] as const;

type Outcome = "pass" | "hold" | "block";
interface Scenario {
    from: 0 | 1 | 2;
    to: 0 | 1 | 2 | 3;
    who: string;
    action: string;
    outcome: Outcome;
    verdict: string;
    note: string;
}

const SCENARIOS: Scenario[] = [
    { from: 0, to: 0, who: "j.rahman", action: "JIT access, 30 min", outcome: "pass", verdict: "Granted", note: "Revoked automatically at 10:00" },
    { from: 2, to: 2, who: "ai-agent-07", action: "crm.read_customers", outcome: "pass", verdict: "In scope", note: "Tool on the agent's allowlist" },
    { from: 1, to: 1, who: "svc-backup", action: "Dynamic secret, 15 min", outcome: "pass", verdict: "Rotated after use", note: "No standing credential left behind" },
    { from: 2, to: 3, who: "ai-agent-07", action: "billing.send_invoice", outcome: "hold", verdict: "Held for approval", note: "Sensitive action waits for a human" },
    { from: 2, to: 0, who: "ai-agent-07", action: "db.drop_table", outcome: "block", verdict: "Blocked", note: "Outside the agent's policy" },
];

/* ─── geometry ─── */
const inPath = (y: number) => ({ p0: [128, y], p1: [190, y], p2: [205, CORE.y], p3: [CORE.x - CORE.r, CORE.y] });
const outPath = (y: number) => ({ p0: [CORE.x + CORE.r, CORE.y], p1: [395, CORE.y], p2: [410, y], p3: [468, y] });
type Bez = ReturnType<typeof inPath>;
const d = (b: Bez) => `M${b.p0} C${b.p1} ${b.p2} ${b.p3}`;
const at = (b: Bez, t: number) => {
    const u = 1 - t;
    const f = (i: 0 | 1) => u * u * u * b.p0[i] + 3 * u * u * t * b.p1[i] + 3 * u * t * t * b.p2[i] + t * t * t * b.p3[i];
    return [f(0), f(1)] as const;
};

/* ─── timing (ms) ─── */
const T_IN = 850;
const T_CHECK = 300; // per check, three checks
const T_OUT = 800;
const T_HOLD = 1400;
const T_REST = 900;

type Phase = "in" | "check" | "out" | "stop" | "rest";

const EASE_MOVE = [0.65, 0, 0.35, 1] as const;

const VERDICT_PILL: Record<Outcome, string> = {
    pass: "text-[#7FE3F2] bg-[#00B8DB]/[0.12] border-[#00B8DB]/30",
    hold: "text-amber-300 bg-amber-400/10 border-amber-400/30",
    block: "text-rose-300 bg-rose-500/10 border-rose-500/30",
};

const OUTCOME_COLOR: Record<Outcome, string> = { pass: "#00B8DB", hold: "#fbbf24", block: "#f43f5e" };

function Packet({ bez, t, color }: { bez: Bez; t: MotionValue<number>; color: string }) {
    const cx = useTransform(t, (v) => at(bez, v)[0]);
    const cy = useTransform(t, (v) => at(bez, v)[1]);
    return (
        <g>
            <motion.circle cx={cx} cy={cy} r={11} fill={color} opacity={0.18} />
            <motion.circle cx={cx} cy={cy} r={5} fill={color} />
        </g>
    );
}

export default function HeroFlow() {
    const reduce = useReducedMotion();
    const [i, setI] = useState(0);
    const [phase, setPhase] = useState<Phase>(reduce ? "rest" : "in");
    const [checks, setChecks] = useState(reduce ? 3 : 0);
    const tIn = useMotionValue(reduce ? 1 : 0);
    const tOut = useMotionValue(reduce ? 1 : 0);

    const s = SCENARIOS[i];
    const color = OUTCOME_COLOR[s.outcome];
    const bIn = inPath(IDS[s.from].y);
    const bOut = outPath(TARGETS[s.to].y);

    /* scenario state machine */
    useEffect(() => {
        if (reduce) return;
        let cancelled = false;
        const timers: number[] = [];
        const wait = (ms: number) => new Promise<void>((r) => timers.push(window.setTimeout(r, ms)));

        (async () => {
            tIn.set(0);
            tOut.set(0);
            setChecks(0);
            setPhase("in");
            await animate(tIn, 1, { duration: T_IN / 1000, ease: EASE_MOVE });
            if (cancelled) return;
            setPhase("check");
            for (let k = 1; k <= 3; k++) {
                await wait(T_CHECK);
                if (cancelled) return;
                setChecks(k);
            }
            if (s.outcome === "pass") {
                setPhase("out");
                await animate(tOut, 1, { duration: T_OUT / 1000, ease: EASE_MOVE });
            } else {
                setPhase("stop");
                await wait(T_HOLD);
            }
            if (cancelled) return;
            setPhase("rest");
            await wait(T_REST);
            if (cancelled) return;
            setI((n) => (n + 1) % SCENARIOS.length);
        })();

        return () => {
            cancelled = true;
            timers.forEach((t) => window.clearTimeout(t));
            tIn.stop();
            tOut.stop();
        };
    }, [i, reduce, s.outcome, tIn, tOut]);

    const resolved = phase === "stop" || phase === "rest" || phase === "out";
    const arrived = s.outcome === "pass" && (phase === "rest" || (phase === "out" && tOut.get() > 0.98));
    const checkState = (k: number) => {
        // k: 0 identity, 1 policy, 2 risk
        if (checks <= k) return "idle";
        if (s.outcome === "block" && k === 1) return "fail";
        if (s.outcome === "block" && k > 1) return "idle"; // checks stop at the failure
        if (s.outcome === "hold" && k === 2) return "wait";
        return "ok";
    };
    const CHECKS = ["Identity", "Policy", "Risk"];
    const checkPos = [
        { x: CORE.x, y: CORE.y - CORE.r - 26 },
        { x: CORE.x + 74, y: CORE.y + CORE.r + 18 },
        { x: CORE.x - 74, y: CORE.y + CORE.r + 18 },
    ];

    return (
        <div className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: OmniPriv checks each privileged request from people, machines and AI agents before it reaches a system">
            {/* chrome */}
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400">AI-PAM engine · every request, checked</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-emerald-300">
                    <span className="relative inline-flex w-1.5 h-1.5">
                        {!reduce && <span className="absolute inset-0 rounded-full bg-emerald-400 aip-ping" />}
                        <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live
                </span>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full h-auto" aria-hidden="true">
                <defs>
                    <radialGradient id="aipCoreGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00B8DB" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#00B8DB" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* faint routes */}
                {IDS.map((n) => (
                    <path key={n.key} d={d(inPath(n.y))} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} strokeDasharray="3 6" />
                ))}
                {TARGETS.map((n) => (
                    <path key={n.key} d={d(outPath(n.y))} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} strokeDasharray="3 6" />
                ))}

                {/* live trail: inbound, then outbound */}
                <motion.path d={d(bIn)} fill="none" stroke="#00B8DB" strokeWidth={2} strokeLinecap="round" style={{ pathLength: tIn }} opacity={0.9} />
                {s.outcome === "pass" && (
                    <motion.path d={d(bOut)} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" style={{ pathLength: tOut }} opacity={0.9} />
                )}

                {/* identities */}
                {IDS.map((n, k) => {
                    const on = k === s.from;
                    const Icon = n.icon;
                    return (
                        <g key={n.key}>
                            <rect x={22} y={n.y - 24} width={106} height={48} rx={14} fill={on ? "rgba(0,184,219,0.12)" : "rgba(255,255,255,0.03)"} stroke={on ? "rgba(0,184,219,0.55)" : "rgba(255,255,255,0.10)"} style={{ transition: "fill .3s, stroke .3s" }} />
                            <Icon x={36} y={n.y - 9} width={18} height={18} color={on ? "#7FE3F2" : "#94a3b8"} strokeWidth={1.8} />
                            <text x={62} y={n.y + 4.5} fontSize={13} fontWeight={600} fill={on ? "#ffffff" : "#94a3b8"} style={{ fontFamily: "var(--font-inter), sans-serif", transition: "fill .3s" }}>
                                {n.label}
                            </text>
                        </g>
                    );
                })}

                {/* targets */}
                {TARGETS.map((n, k) => {
                    const on = k === s.to;
                    const lit = on && arrived;
                    const Icon = n.icon;
                    return (
                        <g key={n.key}>
                            <rect x={468} y={n.y - 22} width={112} height={44} rx={12} fill={lit ? "rgba(0,184,219,0.14)" : "rgba(255,255,255,0.03)"} stroke={lit ? "rgba(0,184,219,0.6)" : on && resolved && s.outcome !== "pass" ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)"} style={{ transition: "fill .3s, stroke .3s" }} />
                            <Icon x={480} y={n.y - 8} width={16} height={16} color={lit ? "#7FE3F2" : "#94a3b8"} strokeWidth={1.8} />
                            <text x={503} y={n.y + 4} fontSize={12} fontWeight={600} fill={lit ? "#ffffff" : "#94a3b8"} style={{ fontFamily: "var(--font-jetbrains), monospace", transition: "fill .3s" }}>
                                {n.label}
                            </text>
                        </g>
                    );
                })}

                {/* engine core */}
                <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 34} fill="url(#aipCoreGlow)" />
                <motion.g
                    style={{ originX: `${CORE.x}px`, originY: `${CORE.y}px` }}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 24, ease: "linear", repeat: Infinity }}
                >
                    <circle cx={CORE.x} cy={CORE.y} r={CORE.r + 12} fill="none" stroke="rgba(0,184,219,0.35)" strokeWidth={1.2} strokeDasharray="2 7" />
                </motion.g>
                <circle
                    cx={CORE.x}
                    cy={CORE.y}
                    r={CORE.r}
                    fill="#0b0c0e"
                    stroke={phase === "stop" || (phase === "rest" && s.outcome !== "pass") ? color : phase === "check" ? "#00B8DB" : "rgba(0,184,219,0.45)"}
                    strokeWidth={phase === "check" || phase === "stop" ? 2 : 1.5}
                    style={{ transition: "stroke .3s, stroke-width .3s" }}
                />
                {/* scanning arc while checking */}
                {phase === "check" && !reduce && (
                    <motion.g
                        style={{ originX: `${CORE.x}px`, originY: `${CORE.y}px` }}
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 270 }}
                        transition={{ duration: 0.9, ease: "linear" }}
                    >
                        <path d={`M${CORE.x} ${CORE.y - CORE.r} A${CORE.r} ${CORE.r} 0 0 1 ${CORE.x + CORE.r * 0.71} ${CORE.y - CORE.r * 0.71}`} fill="none" stroke="#7FE3F2" strokeWidth={3} strokeLinecap="round" />
                    </motion.g>
                )}
                <text x={CORE.x} y={CORE.y - 6} textAnchor="middle" fontSize={11} fill="#94a3b8" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
                    OmniPriv
                </text>
                <text x={CORE.x} y={CORE.y + 13} textAnchor="middle" fontSize={15} fontWeight={700} fill="#ffffff" style={{ fontFamily: "var(--font-syne), sans-serif" }}>
                    AI-PAM
                </text>

                {/* the three checks */}
                {CHECKS.map((c, k) => {
                    const st = checkState(k);
                    const p = checkPos[k];
                    const col = st === "ok" ? "#00B8DB" : st === "fail" ? "#f43f5e" : st === "wait" ? "#fbbf24" : "rgba(255,255,255,0.14)";
                    return (
                        <g key={c}>
                            <rect x={p.x - 40} y={p.y - 12} width={80} height={24} rx={12} fill={st === "idle" ? "rgba(255,255,255,0.03)" : `${col}22`} stroke={col} strokeWidth={1} style={{ transition: "fill .25s, stroke .25s" }} />
                            <text x={p.x + (st === "idle" ? 0 : 6)} y={p.y + 4} textAnchor="middle" fontSize={11} fontWeight={600} fill={st === "idle" ? "#64748b" : "#e2e8f0"} style={{ fontFamily: "var(--font-inter), sans-serif", transition: "fill .25s" }}>
                                {c}
                            </text>
                            {st !== "idle" && (
                                <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                                    {st === "ok" && <Check x={p.x - 31} y={p.y - 6} width={12} height={12} color={col} strokeWidth={3} />}
                                    {st === "fail" && <X x={p.x - 31} y={p.y - 6} width={12} height={12} color={col} strokeWidth={3} />}
                                    {st === "wait" && <Hourglass x={p.x - 31} y={p.y - 6} width={12} height={12} color={col} strokeWidth={2.5} />}
                                </motion.g>
                            )}
                        </g>
                    );
                })}

                {/* packet */}
                {!reduce && phase === "in" && <Packet bez={bIn} t={tIn} color="#7FE3F2" />}
                {!reduce && phase === "out" && <Packet bez={bOut} t={tOut} color={color} />}

                {/* held / blocked: the request stays at the engine */}
                {(phase === "stop" || (phase === "rest" && s.outcome !== "pass")) && (
                    <motion.circle
                        cx={CORE.x}
                        cy={CORE.y}
                        r={CORE.r}
                        fill="none"
                        stroke={color}
                        initial={{ opacity: 0.8, r: CORE.r }}
                        animate={{ opacity: 0, r: CORE.r * 1.45 }}
                        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], repeat: s.outcome === "hold" ? Infinity : 0 }}
                    />
                )}
            </svg>

            {/* caption: what just happened */}
            <div className="border-t border-white/[0.08] px-4 py-3 min-h-[4.25rem]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={i}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="flex items-center gap-3"
                    >
                        <div className="min-w-0 flex-1">
                            <div className="font-mono text-[0.8125rem] text-white truncate">
                                {s.who} <span className="text-slate-500">→</span> {TARGETS[s.to].label}
                            </div>
                            <div className="text-[0.75rem] text-slate-400 truncate">
                                {s.action}
                                {resolved && <span className="text-slate-500"> · {s.note}</span>}
                            </div>
                        </div>
                        <span
                            className={`shrink-0 text-[0.6875rem] font-semibold px-2.5 py-1 rounded-md border whitespace-nowrap transition-opacity duration-300 ${VERDICT_PILL[s.outcome]}`}
                            style={{ opacity: resolved ? 1 : 0.25 }}
                        >
                            {resolved ? s.verdict : "Checking"}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
