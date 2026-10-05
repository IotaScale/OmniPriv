import Image from "next/image";
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
   A challenge may carry a screenshot instead of the generated
   visual; the rest fall back to `ChallengeVisual`.
───────────────────────────────────────────────────────────── */
interface Challenge {
    id: string;
    headline: string;
    body: string;
    caption: string;
    href: string;
    icon: typeof Bot;
    accent: string;
    /** Optional screenshot rendered in place of the generated visual. */
    image?: string;
    imageAlt?: string;
}

const challenges: Challenge[] = [
    {
        id: "ai-agents",
        headline: "Secure AI Agents",
        body: "Strengthen AI agent security with JIT access, least privilege, credential protection, and governed access for AI-powered identities and automated workflows.",
        caption: "MCP · 100+ TOOLS",
        href: "/platform/secure-ai-agents-omnipriv",
        icon: Bot,
        accent: "#00B8FF",
        image: "/challenges/secure-ai-agents.jpeg",
        imageAlt:
            "Secure AI agents illustration showing an AI agent shielded inside a central control point, with blocked attack paths on one side and verified privileged resources on the other",
    },
    {
        id: "ai-attacks",
        headline: "Defend Against AI-Driven Threats",
        body: "Improve AI threat protection with intelligent anomaly detection, privileged access controls, session monitoring, and rapid response to suspicious activity.",
        caption: "ML · ISOLATIONFOREST",
        href: "/platform/ai-threat-protection",
        icon: ShieldAlert,
        accent: "#818cf8",
        image: "/challenges/defend-ai-driven-threats.jpeg",
        imageAlt:
            "Defend against AI-driven threats illustration showing a central privileged access shield governing identity, credentials, key material and privileged systems",
    },
    {
        id: "remote",
        headline: "Secure Remote & Hybrid Access",
        body: "Enable secure remote access for administrators, employees, and vendors with MFA, JIT privileges, credential protection, and monitored sessions.",
        caption: "AGENTLESS · RDP / SSH",
        href: "/platform/secure-remote-access",
        icon: Globe,
        accent: "#38bdf8",
        image: "/challenges/secure-remote-hybrid-access.jpeg",
        imageAlt:
            "Secure remote access illustration showing verified identities and audited sessions reaching enterprise systems through a central control point",
    },
    {
        id: "compliance",
        headline: "Audit, Governance & Compliance",
        body: "Simplify privileged access audits with centralized activity logs, policy controls, session records, and compliance-ready reporting across critical systems.",
        caption: "SOC 2 · ISO 27001",
        href: "/platform/audit-compliance",
        icon: ScrollText,
        accent: "#34d399",
        image: "/challenges/audit-governance-compliance.jpeg",
        imageAlt:
            "Audit, governance and compliance illustration showing governed privileged access across laptops, servers, cloud and databases with verification checks",
    },
    {
        id: "risk",
        headline: "Reduce Privileged Identity Risk",
        body: "Identify excessive privileges, risky access, and unusual behavior while enforcing least privilege, JIT access, and stronger controls across privileged identities.",
        caption: "JIT · ZERO STANDING",
        href: "/platform/identity-security",
        icon: Layers,
        accent: "#fbbf24",
        image: "/challenges/reduce-privileged-identity-risk.jpeg",
        imageAlt:
            "Privileged identity risk illustration separating verified least-privilege identities from flagged risky access attempts",
    },
    {
        id: "consolidation",
        headline: "Consolidate PAM & Identity Security",
        body: "Bring privileged access, identity controls, credential security, session monitoring, and policy enforcement together in one unified OmniPriv platform.",
        caption: "9 MODULES · 1 PLATFORM",
        href: "/platform/consolidation",
        icon: Boxes,
        accent: "#a78bfa",
        image: "/challenges/consolidate-pam-identity-security.jpeg",
        imageAlt:
            "Consolidate PAM and identity security illustration showing cloud, database, code and server access converging on a single central security control point",
    },
];

/* ─────────────────────────────────────────────────────────────
   Card visual — screenshot variant used when a challenge
   supplies its own image.
───────────────────────────────────────────────────────────── */
function ChallengeImage({
    src,
    alt,
    caption,
    accent,
}: {
    src: string;
    alt: string;
    caption: string;
    accent: string;
}) {
    return (
        <div className="relative aspect-[3/1] w-full overflow-hidden rounded-xl border border-slate-900/[0.06] dark:border-white/[0.06] bg-white dark:bg-[#060b14]">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                className="object-cover object-center"
            />

            {/* Scrim so the caption stays legible over the artwork */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

            {/* Caption */}
            <div
                className="absolute inset-x-0 bottom-2 text-center font-mono text-[10px] font-semibold tracking-[0.14em]"
                style={{ color: accent }}
            >
                {caption}
            </div>
        </div>
    );
}

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
                            {challenge.image ? (
                                <ChallengeImage
                                    src={challenge.image}
                                    alt={challenge.imageAlt ?? challenge.headline}
                                    caption={challenge.caption}
                                    accent={challenge.accent}
                                />
                            ) : (
                                <ChallengeVisual
                                    icon={challenge.icon}
                                    accent={challenge.accent}
                                    caption={challenge.caption}
                                />
                            )}

                            <h3
                                className="mt-5 text-xl font-bold tracking-tight mb-2"
                                style={{ fontFamily: "var(--font-syne)", color: challenge.accent }}
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
