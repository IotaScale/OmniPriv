import Link from "next/link";
import {
    Bot,
    ShieldAlert,
    Globe,
    ScrollText,
    Layers,
    Boxes,
    ArrowRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Six challenges OmniPriv solves — AI capabilities first.
   Each card maps to a real product module (see `href`).
───────────────────────────────────────────────────────────── */
const challenges = [
    {
        id: "ai-agents",
        tag: "AI Governance",
        headline: "Govern AI agents securely",
        body: "Every MCP agent gets its own verifiable identity, tool allowlist and data scope — with human approval on high-risk actions.",
        caption: "MCP · 100+ TOOLS",
        href: "/platform/ai-agent-governance",
        icon: Bot,
        accent: "#00B8FF",
    },
    {
        id: "ai-attacks",
        tag: "AI Threat Defense",
        headline: "Defend against AI-era attacks",
        body: "Machine-learning anomaly detection scores every privileged login and session in real time, then steps up or blocks automatically.",
        caption: "ML · ISOLATIONFOREST",
        href: "/platform/threat-detection",
        icon: ShieldAlert,
        accent: "#818cf8",
    },
    {
        id: "remote",
        tag: "Remote Access",
        headline: "Secure remote & hybrid access",
        body: "Give engineers agentless RDP, SSH and database access from anywhere — no VPN client, no endpoint agent, no inbound ports.",
        caption: "AGENTLESS · RDP / SSH",
        href: "/platform/session-management",
        icon: Globe,
        accent: "#38bdf8",
    },
    {
        id: "compliance",
        tag: "Compliance",
        headline: "Prove compliance with evidence",
        body: "Indexed session recording and command-level logs turn every privileged action into replayable, tamper-proof evidence.",
        caption: "SOC 2 · ISO 27001",
        href: "/platform/audit-compliance",
        icon: ScrollText,
        accent: "#34d399",
    },
    {
        id: "risk",
        tag: "Identity Risk",
        headline: "Shrink your privilege sprawl",
        body: "Continuous discovery surfaces stale accounts, orphaned keys and excessive rights — just-in-time access removes standing privilege.",
        caption: "JIT · ZERO STANDING",
        href: "/identity-security",
        icon: Layers,
        accent: "#fbbf24",
    },
    {
        id: "consolidation",
        tag: "Consolidation",
        headline: "Consolidate your PAM stack",
        body: "Replace fragmented vaulting, session management and audit tools with one agentless platform you can run on-premise.",
        caption: "9 MODULES · 1 PLATFORM",
        href: "/platform",
        icon: Boxes,
        accent: "#a78bfa",
    },
];

/* ─────────────────────────────────────────────────────────────
   Card visual — tinted panel, orbiting rings, glowing icon
───────────────────────────────────────────────────────────── */
function ChallengeVisual({
    icon: Icon,
    accent,
    caption,
}: {
    icon: typeof Bot;
    accent: string;
    caption: string;
}) {
    return (
        <div className="relative h-[164px] w-full overflow-hidden rounded-xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#060b14]">
            {/* Accent tint */}
            <div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(circle at 50% 40%, ${accent}1f 0%, transparent 62%)`,
                }}
            />

            {/* Orbiting rings */}
            <svg
                viewBox="0 0 200 200"
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[186px] w-[186px] -translate-x-1/2 -translate-y-1/2"
            >
                <circle
                    cx="100"
                    cy="100"
                    r="86"
                    fill="none"
                    stroke={accent}
                    strokeOpacity="0.16"
                    strokeWidth="1"
                    strokeDasharray="3 7"
                    className="cp-ring-spin"
                />
                <circle
                    cx="100"
                    cy="100"
                    r="62"
                    fill="none"
                    stroke={accent}
                    strokeOpacity="0.28"
                    strokeWidth="1"
                    strokeDasharray="2 9"
                    className="cp-ring-spin-reverse"
                />
                <circle cx="100" cy="100" r="40" fill="none" stroke={accent} strokeOpacity="0.1" strokeWidth="1" />
            </svg>

            {/* Glowing icon */}
            <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2">
                <div
                    className="absolute inset-0 rounded-2xl animate-pulse"
                    style={{ background: `${accent}33`, filter: "blur(12px)" }}
                />
                <div
                    className="relative flex h-full w-full items-center justify-center rounded-2xl border backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                    style={{
                        borderColor: `${accent}59`,
                        background: `${accent}1a`,
                        color: accent,
                    }}
                >
                    <Icon className="h-7 w-7" />
                </div>
            </div>

            {/* Caption */}
            <div
                className="absolute inset-x-0 bottom-3 text-center font-mono text-[10px] font-semibold tracking-[0.14em]"
                style={{ color: accent }}
            >
                {caption}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function ChallengesSection() {
    return (
        <section className="section-padding relative overflow-hidden border-b border-slate-900/[0.05] dark:border-white/[0.04] bg-white dark:bg-[#030711]">
            <div
                className="absolute -top-24 left-1/2 h-[420px] w-[820px] -translate-x-1/2 pointer-events-none opacity-60"
                style={{
                    background:
                        "radial-gradient(ellipse, rgba(0, 184, 255, 0.07) 0%, transparent 65%)",
                }}
            />

            <div className="container-xl relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="badge-cyan mb-5 inline-flex">Challenges We Solve</div>
                    <h2
                        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white mb-5 tracking-tight"
                        style={{ fontFamily: "var(--font-syne)" }}
                    >
                        Six challenges{" "}
                        <br />
                        <span className="text-gradient">One agentless platform</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        From governing autonomous AI agents to proving compliance, OmniPriv closes
                        every privileged access gap in your enterprise.
                    </p>
                </div>

                {/* 6 challenge cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {challenges.map((challenge) => (
                        <Link
                            key={challenge.id}
                            href={challenge.href}
                            className="group flex flex-col rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-slate-50 dark:bg-[#070e1c] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#00B8FF]/40 hover:bg-white dark:hover:bg-[#0b1424] hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
                        >
                            <ChallengeVisual
                                icon={challenge.icon}
                                accent={challenge.accent}
                                caption={challenge.caption}
                            />

                            <div
                                className="mt-5 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] mb-2"
                                style={{ color: challenge.accent }}
                            >
                                {challenge.tag}
                            </div>

                            <h3
                                className="text-lg font-bold text-slate-950 dark:text-white tracking-tight mb-2"
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {challenge.headline}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
                                {challenge.body}
                            </p>

                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00B8FF] transition-all duration-300 group-hover:gap-2.5">
                                Learn more
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
