import type { Metadata } from "next";
import Link from "next/link";
import {
    Activity,
    ArrowRight,
    Bot,
    Cpu,
    Crosshair,
    Eye,
    FileSpreadsheet,
    Lock,
    Network,
    RefreshCw,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /ai-pam — the AI-PAM engine deep dive.
 *
 * Rebuilt from the previous tabbed layout. The three tabs meant two thirds
 * of the engine's content was unreachable without a click and invisible to
 * crawlers, and the whole block shipped client JavaScript for what is static
 * copy. Everything is now an always-visible section on the shared section
 * library, so the page is server-rendered and every claim is crawlable.
 *
 * Copy was also lifted out of internal-implementation territory: script
 * filenames, model artefacts, an internal API endpoint and an internal
 * authorisation library are no longer published. The verifiable engineering
 * — 39 scored features, 0–1 scoring, the escalation tiers, the 10-second
 * sweep, the 12 agent pillars, 100+ MCP tools and the detection lanes —
 * is kept in full.
 */

export const metadata: Metadata = {
    title: "AI-PAM Engine: ML Threat Detection & MCP Agent Governance",
    description:
        "OmniPriv's AI-PAM engine pairs IsolationForest behavioral anomaly detection with Model Context Protocol agent governance — 12 agent security pillars, 100+ MCP tools, and a 10-second auto-block sweeper.",
};

const engineSection = {
    title: "Behavioural anomaly detection on every privileged session",
    lead: [
        "The engine scores what actually happened inside a session, not just who opened it. Detection, escalation and enforcement run inside the platform rather than in a separate analytics product.",
    ] as RichText,
};

const engineCards: IconCard[] = [
    {
        icon: Activity,
        eyebrow: "IsolationForest",
        title: "Behavioural anomaly detection",
        text: "39 features are evaluated for every closed session and scored 0–1, with tiered escalation: dashboard alert, then admin alert, then automatic block.",
    },
    {
        icon: Crosshair,
        eyebrow: "Real-time sweeper",
        title: "10-second auto-block",
        text: "An autonomous sweep runs across active sessions every ten seconds, isolating verified offenders with a grace period before force-closing them.",
    },
    {
        icon: RefreshCw,
        eyebrow: "Autonomous pipeline",
        title: "Model retraining in place",
        text: "The model retrains on your own environment without a data-science project — warm-starting from the previous version and swapping the new one in without downtime.",
    },
    {
        icon: FileSpreadsheet,
        eyebrow: "Model evaluation",
        title: "Tuning you can audit",
        text: "Held-out test splits, threshold sweeps and feature-separation analysis, exported as workbooks so thresholds can be reviewed rather than taken on trust.",
    },
];

const threats = [
    {
        name: "Brute force",
        tag: "Authentication lane",
        detects:
            "Rapid failed-login patterns across protocol gateways — scored in flight and terminated at the socket.",
        action: "Instant IP and user auto-block",
        risk: "High",
        riskClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
        name: "Lateral movement",
        tag: "Pivot & reconnaissance",
        detects:
            "Pivot tooling such as sshpass, wmiexec, crackmapexec and impacket, plus behavioural network pivot indicators.",
        action: "10-second sweep isolation and alert",
        risk: "Critical",
        riskClass: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
        name: "Backdoor accounts",
        tag: "Persistence",
        detects:
            "Backdoor command indicators, rogue user-script authoring, and a backdoor risk score per identity.",
        action: "Account lockout and admin alert",
        risk: "Critical",
        riskClass: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
        name: "Credential harvesting",
        tag: "Secret extraction",
        detects:
            "Credential-grabbing commands including mimikatz and LSASS or SAM hive dumps, with harvesting risk scoring.",
        action: "Process killed, session severed",
        risk: "Critical",
        riskClass: "text-rose-400 bg-rose-500/15 border-rose-500/30",
    },
    {
        name: "Off-hours and impossible travel",
        tag: "Behavioural context",
        detects:
            "Impossible-travel geolocation, unfamiliar source IPs, and hour deviation from the identity's learned baseline.",
        action: "Step-up authentication or quarantine",
        risk: "Elevated",
        riskClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
        name: "Script execution abuse",
        tag: "In-session scanner",
        detects:
            "Executed scripts (.sh, .ps1, .bat) scanned live in flight, with obfuscated payloads flagged before they complete.",
        action: "Live script blocked",
        risk: "High",
        riskClass: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
];

const agentsSection = {
    title: "One MCP transport, many first-class identities",
    lead: [
        "An AI agent should not inherit a person's credentials. Every agent gets its own verifiable identity, its own tool policy and its own data scope — and every action traces back to the human who delegated it.",
    ] as RichText,
    principle: "The AI can act, but it never gets unrestricted authority.",
};

const agentPillars: IconCard[] = [
    {
        icon: Bot,
        eyebrow: "Cryptographic attestation",
        title: "Agent identity",
        text: "Each agent is registered with a unique name, type and hashed key — verifiable per organisation, with an auditable lifecycle.",
    },
    {
        icon: Network,
        eyebrow: "Delegator claims",
        title: "Human-to-agent delegation",
        text: "An agent never inherits the human's whole privilege set. The token records who delegated, so accountability stays with the person.",
    },
    {
        icon: Lock,
        eyebrow: "Tool allowlist",
        title: "Tool-level authorization",
        text: "Allow, deny or require approval per MCP tool, per agent — so the same server offers different capabilities to different agents.",
    },
    {
        icon: Eye,
        eyebrow: "Field-level masking",
        title: "Data-level authorization",
        text: "The same tool returns different records per agent. A sales agent sees no salary data; an HR agent sees the full record.",
    },
    {
        icon: Network,
        eyebrow: "Server boundaries",
        title: "MCP server scoping",
        text: "Agent-to-server allowlists — a finance agent can reach the finance server and is refused by the HR server outright.",
    },
    {
        icon: RefreshCw,
        eyebrow: "Zero standing privilege",
        title: "Just-in-time privileges",
        text: "No permanent agent privileges. Short-lived tokens are issued per action and destroyed automatically after use.",
    },
    {
        icon: Lock,
        eyebrow: "Human-in-the-loop",
        title: "Sensitive action approval",
        text: "High-risk tools — delete cluster, refund, transfer, drop table — pause for explicit human approval before executing.",
    },
    {
        icon: Bot,
        eyebrow: "Agent trust graph",
        title: "Agent-to-agent trust",
        text: "Controls which agents may invoke which others: a customer agent may call the finance agent, and may not call payroll.",
    },
    {
        icon: Activity,
        eyebrow: "Deterministic re-verification",
        title: "Prompt-injection guard",
        text: "Even if the model's reasoning is manipulated, the resulting tool call is re-verified against deterministic policy before it runs.",
    },
    {
        icon: FileSpreadsheet,
        eyebrow: "Five-tier trace",
        title: "Agent session audit trail",
        text: "A forensic trace from human to agent to server to tool to resource, recording the decision, privilege level and duration.",
    },
    {
        icon: Crosshair,
        eyebrow: "Rate and tool baseline",
        title: "Agent behavioural analytics",
        text: "A per-agent baseline of tool mix and request rate detects drift, then steps up authentication, requires approval, or revokes.",
    },
    {
        icon: Lock,
        eyebrow: "Dynamic ephemeral secrets",
        title: "Vault-backed secrets",
        text: "Agents never hold permanent credentials. Dynamic secrets are checked out per session and rotated immediately after.",
    },
];

const transportSection = {
    title: "MCP transport and platform integration",
    lead: [
        "The engine is reachable from the tools your teams already use, without handing any of them standing access.",
    ] as RichText,
};

const transportCards: IconCard[] = [
    {
        icon: Bot,
        eyebrow: "Operations assistant",
        title: "Natural-language PAM operations",
        text: "A function-calling assistant answers operational questions — active sessions, pending approvals, session investigations — scoped strictly to the caller's own organisation.",
    },
    {
        icon: Network,
        eyebrow: "Transport layer",
        title: "MCP server, 100+ tools",
        text: "Exposes 100+ platform tools to MCP clients including Claude, GitHub Copilot and Cursor, with device-flow OAuth and scoped, auto-refreshing tokens.",
    },
    {
        icon: Eye,
        eyebrow: "Forensic transparency",
        title: "Threat explainability",
        text: "Every elevated score comes with its indicator breakdown, so security teams and auditors can see why — rather than being asked to trust a black box.",
    },
    {
        icon: Lock,
        eyebrow: "Organisation and role schemas",
        title: "Data-level RBAC for AI",
        text: "Agents see only what the delegating human's organisation and role allow. Filtering happens at the data layer, before anything reaches the model.",
    },
];

const stats = [
    { value: "39", label: "Features scored per session", sub: "IsolationForest model" },
    { value: "10s", label: "Auto-block sweep interval", sub: "Tiered escalation" },
    { value: "12", label: "Agent security pillars", sub: "Multi-agent architecture" },
    { value: "100+", label: "MCP tools governed", sub: "Allowlist and data scope" },
];

const keepReading = [
    { href: "/platform/ai-agent-governance", label: "AI Agent Governance in depth" },
    { href: "/platform/identity-security", label: "How the identities fit together" },
    { href: "/platform/threat-detection", label: "Detection and response across the estate" },
];

const closing = {
    title: "See the engine on your own infrastructure",
    body: [
        "We will walk through live anomaly scoring, MCP agent scoping and the 10-second auto-block sweeper against your environment.",
    ],
    kicker: "Scored, explained and enforced — on your own hardware.",
    primary: { href: "/demo", label: "Book a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is the AI-PAM engine?",
        answer:
            "It is the detection and enforcement layer inside OmniPriv. It scores the behaviour of every privileged session with a machine-learning model, and separately governs autonomous AI agents through the Model Context Protocol — the same policy engine that governs people, applied to non-human identities.",
    },
    {
        question: "How does a session actually get scored?",
        answer:
            "Every closed session is evaluated across 39 behavioural features and scored from 0 to 1. Escalation is tiered rather than binary: a dashboard alert first, then an admin alert, then an automatic block when the score crosses the threshold you have configured.",
    },
    {
        question: "What happens when a session is flagged while it is still running?",
        answer:
            "A sweeper runs every ten seconds across active sessions. Session-level threats — pivot tooling, credential harvesting, obfuscated script payloads — are detected in flight, and verified offenders are isolated with a grace period before the session is force-closed.",
    },
    {
        question: "What is MCP agent governance?",
        answer:
            "Model Context Protocol is how AI agents reach tools and data. OmniPriv governs that path: each agent gets its own verifiable identity, an explicit tool allowlist, a bounded data scope and per-action authorisation, so an agent cannot borrow a person's credentials or reach beyond its task.",
    },
    {
        question: "Can an AI agent act without a human involved?",
        answer:
            "It can act freely inside its policy, and it cannot act outside it. High-risk tools pause for explicit human approval, every tool call is re-verified against deterministic policy even when the model's reasoning has been manipulated, and the full trace from human to agent to resource is recorded.",
    },
];

export default function AiPamPage() {
    return (
        <>
            {/* ─── HERO (fades into the dark engine band) ─────────── */}
            <section className="relative pt-16 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050b16]" />

                <div className="container-xl relative z-10 text-center">
                    <div className="badge-cyan mb-6 inline-flex mx-auto items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5" />
                        AI-PAM Engine
                    </div>

                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 max-w-4xl mx-auto tracking-tight"
                        style={displayFont}
                    >
                        AI-PAM: <span className="text-gradient">Autonomous ML &amp; Multi-Agent Security</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        IsolationForest anomaly detection and Model Context Protocol agent governance — one
                        engine that keeps every privileged action, human or autonomous, inside policy
                        evaluated on the action itself.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/demo" className="btn-primary text-base px-8 py-3.5">
                            Request a Technical Demo
                            <ArrowRight className="w-5 h-5 ml-1.5" />
                        </Link>
                        <Link href="/platform" className="btn-secondary text-base px-8 py-3.5">
                            Explore the Platform
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── THE ML ENGINE (dark band) ──────────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Core ML Detection Engine"
                        title={engineSection.title}
                        className="mb-2"
                    >
                        <Prose segments={engineSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={engineCards} columns={4} className="mt-12" />

                {/* Detection lanes */}
                <div className="mt-14 rounded-2xl border border-white/[0.09] bg-[#070e1a] p-6 lg:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.07]">
                        <div>
                            <div className="badge-cyan mb-2 inline-flex">Live Rule Lanes</div>
                            <h3
                                className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white"
                                style={displayFont}
                            >
                                Real-time in-session threat detection
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                                The command detector scans typed commands as they happen. The script scanner
                                flags executed scripts (.sh, .ps1, .bat) and quarantines the offender only.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-400 font-semibold self-start md:self-center whitespace-nowrap">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            6 DETECTION LANES
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        {threats.map((threat) => (
                            <div
                                key={threat.name}
                                className="p-4 rounded-xl border border-white/[0.06] bg-[#050b14] hover:border-[#00B8FF]/30 transition-colors duration-200"
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[11px] font-mono text-slate-400">
                                        {threat.tag}
                                    </span>
                                    <span
                                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${threat.riskClass}`}
                                    >
                                        {threat.risk}
                                    </span>
                                </div>

                                <h4 className="text-sm font-bold text-slate-950 dark:text-white mb-1.5">
                                    {threat.name}
                                </h4>

                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                                    {threat.detects}
                                </p>

                                <div className="pt-2.5 border-t border-white/[0.05] text-[11px] font-mono text-slate-400 flex items-center justify-between gap-2">
                                    <span>Action</span>
                                    <span className="text-emerald-400 font-semibold text-right">
                                        {threat.action}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ─── MULTI-AGENT ARCHITECTURE ──────────────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Multi-Agent AI Architecture"
                        title={agentsSection.title}
                        className="mb-2"
                    >
                        <Prose segments={agentsSection.lead} />
                    </SectionHeading>

                    <div className="mt-6 inline-flex items-start gap-2 px-4 py-3 rounded-xl border border-[#00B8FF]/25 bg-[#00B8FF]/[0.06]">
                        <Bot className="w-4 h-4 text-[#00B8FF] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            <strong className="text-slate-950 dark:text-white">Core principle:</strong>{" "}
                            {agentsSection.principle}
                        </p>
                    </div>
                </div>

                <IconCardGrid items={agentPillars} columns={3} className="mt-12" />

                <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.05]">
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-950 dark:text-white">Enterprise value:</strong> agents
                        do real work against SAP, production databases and ServiceNow — but every capability
                        is scoped, every secret is transient, and every action is attributable to a human.
                    </p>
                    <Link
                        href="/demo"
                        className="btn-secondary text-sm px-5 py-2.5 flex-shrink-0 whitespace-nowrap"
                    >
                        Schedule an AI-PAM Demo
                        <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                </div>
            </Section>

            {/* ─── TRANSPORT & INTEGRATION ────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="MCP Transport & Platform Integration"
                        title={transportSection.title}
                        className="mb-2"
                    >
                        <Prose segments={transportSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={transportCards} columns={2} className="mt-12" />
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Engine figures you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a roadmap diagram. These are the numbers the engine runs on today.
                    </p>
                </SectionHeading>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className={`p-6 rounded-2xl border text-center ${cardBorder} ${cardSurface}`}
                        >
                            <div
                                className="text-3xl font-extrabold text-slate-950 dark:text-white mb-1"
                                style={displayFont}
                            >
                                {stat.value}
                            </div>
                            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                                {stat.label}
                            </div>
                            <div className="text-xs text-slate-500">{stat.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 grid sm:grid-cols-3 gap-6">
                    {keepReading.map((link) => (
                        <ArrowLink key={link.href} href={link.href}>
                            {link.label}
                        </ArrowLink>
                    ))}
                </div>
            </Section>

            {/* ─── CLOSING ────────────────────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ────────────────────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about anomaly scoring, MCP agent governance and autonomous enforcement."
                items={faqs}
            />
        </>
    );
}
