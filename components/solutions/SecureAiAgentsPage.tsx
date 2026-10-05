import {
    Boxes,
    Database,
    Fingerprint,
    Globe,
    ScrollText,
    Server,
    Timer,
    UserCheck,
    Workflow,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/secure-ai-agents-omnipriv — the destination of
 * the "AI Governance / Govern AI agents securely" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. SEO metadata continues to come from the module
 * entry in app/platform/data.ts. The former /platform/ai-agent-governance URL
 * 301s here (see next.config.js).
 *
 * Claims here are limited to what this repository already states: the agent
 * governance model (per-agent identity, tool allowlist, bounded data scope,
 * human approval, runtime enforcement, session audit) and the AI-PAM engine's
 * IsolationForest scoring, escalation tiers and 10-second sweeper.
 */

const hero = {
    badge: "Secure AI Agents",
    titleLead: "Secure AI Agents with",
    titleAccent: "Privileged Access Management",
    intro: [
        "AI agents are becoming active identities inside enterprise environments. They can call tools, access databases, interact with cloud infrastructure, use credentials, and perform actions faster than a human can review manually.",
    ] as RichText,
    body: [
        "OmniPriv helps organizations secure AI agents by bringing autonomous access under the same Privileged Access Management principles used to protect sensitive human and machine identities.",
    ] as RichText,
    kicker: [
        "Control what AI agents can access, how much privilege they receive, how long that privilege lasts, and what happens after access is granted.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
    image: {
        src: "/challenges/ai-govern.jpg",
        alt: "Secure AI agents governance graphic showing just-in-time access, least privilege, session monitoring, threat detection and full audit across cloud, servers, databases and applications",
    },
};

const whoSection = {
    title: "AI Changes Who Can Hold Privileged Access",
    paragraphs: [
        ["Traditional PAM focused primarily on administrators."],
        [
            "Modern environments now include people, applications, workloads, service accounts, automation, and autonomous AI agents. Each can potentially interact with privileged systems.",
        ],
        [
            "OmniPriv applies ",
            { text: "one identity-security model", href: "/platform/identity-security" },
            " across human, machine, vendor, and AI identities rather than managing each category through disconnected controls.",
        ],
    ] as RichText[],
    prompt: "Effective AI agent security therefore starts with a simple question:",
    question: "What should this identity be allowed to do right now?",
    image: {
        src: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure AI agents represented by a neural network brain above enterprise systems ringed by access controls",
    },
};

const zeroTrustSection = {
    title: "Control AI Agent Access with Zero Trust PAM",
    paragraphs: [
        [
            "Authentication alone does not determine whether an AI agent should be allowed to perform a privileged action.",
        ],
        [
            "OmniPriv combines identity verification with policy-based authorization so organizations can control:",
        ],
    ] as RichText[],
    controls: [
        "Which tools an agent may call",
        "Which systems it may access",
        "Which data it may reach",
        "Which privileged actions require approval",
        "How long elevated access remains active",
    ],
    closing: [
        "OmniPriv's AI-agent governance model includes per-agent identities, explicit tool allowlists, bounded data scopes, and human approval for higher-risk actions.",
    ] as RichText,
    subheading: "Apply JIT Access Instead of Permanent Privilege",
    jit: [
        [
            "Permanent access gives compromised or misconfigured agents more authority than necessary.",
        ],
        [
            "JIT access for AI agents provides privilege only when an approved task requires it and removes that privilege afterward.",
        ],
        [
            "This supports least privilege and Zero Standing Privileges, reducing the amount of privileged access continuously available to human and autonomous identities.",
        ],
    ] as RichText[],
};

const credentialsSection = {
    title: "Keep Credentials Out of AI Workflows",
    paragraphs: [
        [
            "AI agents may need to reach databases, APIs, servers, cloud services, or enterprise applications.",
        ],
        [
            "That does not mean they should permanently possess privileged passwords, SSH keys, or tokens. Strong AI credential security keeps secrets behind controlled infrastructure and provides credentials only when required.",
        ],
        [
            "OmniPriv combines privileged credential management with temporary access and agent-specific controls so automated identities can use approved resources without relying on shared human accounts or unmanaged long-lived secrets. OmniPriv's broader platform includes ",
            {
                text: "credential vaulting and privileged-access lifecycle controls",
                href: "/platform/password-credential-management",
            },
            ".",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1611187400871-4227c006c5e7?auto=format&fit=crop&w=1200&q=70",
        alt: "Privileged credential kept out of AI workflows, shown as a key held behind access control rather than in the agent",
    },
};

const monitorSection = {
    title: "Monitor Every Privileged AI Session",
    paragraphs: [
        [
            "Access decisions are only one part of the security lifecycle. Organizations must also understand what happened after an AI agent received permission.",
        ],
        [
            "OmniPriv records agent activity and privileged sessions so security teams can investigate what an identity accessed, which actions were performed, and whether unusual behavior occurred.",
        ],
        [
            "Its AI-agent governance model is specifically designed around visibility, runtime enforcement, credential protection, and session accountability. This makes privileged session monitoring an important part of AI accountability.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1788790716354-00a65a62bf58?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure AI agents privileged session monitoring console recording agent activity and command history on a dark screen",
    },
};

const detectSection = {
    title: "Detect AI-Driven Risk in Real Time",
    paragraphs: [
        ["Static policies cannot identify every abnormal behavior pattern."],
        [
            "OmniPriv's AI-PAM engine applies machine-learning-based anomaly detection to privileged activity. Its current architecture documents IsolationForest analysis, multiple behavioral features, risk scoring, escalation, and automated blocking workflows. This helps security teams identify situations such as:",
        ],
    ] as RichText[],
    patterns: [
        "An identity behaving differently from its normal pattern",
        "Unexpected privileged commands",
        "Unusual access times",
        "Excessive data activity",
        "Attempts to misuse privileged access",
    ],
    closing: [
        "AI does not replace PAM controls. It adds additional context to them.",
    ] as RichText,
};

const boundariesSection = {
    title: "Govern Agentic AI with Clear Boundaries",
    lead: [
        "Agentic identity security requires clear boundaries around autonomous behavior. Every AI agent should have:",
    ] as RichText,
};

const boundaries: IconCard[] = [
    {
        icon: Fingerprint,
        title: "A unique identity",
        text: "Not a borrowed human account — the agent has its own verifiable identity.",
    },
    {
        icon: Boxes,
        title: "A defined tool scope",
        text: "Only approved tools and systems, refused at policy evaluation otherwise.",
    },
    {
        icon: Database,
        title: "A bounded data scope",
        text: "Only information required for the task in front of it.",
    },
    {
        icon: Timer,
        title: "Temporary privilege",
        text: "No unnecessary standing access left available to inherit.",
    },
    {
        icon: UserCheck,
        title: "Human approval",
        text: "Required before designated high-risk actions execute.",
    },
    {
        icon: ScrollText,
        title: "Recorded activity",
        text: "So actions remain explainable and auditable.",
    },
];

const infraSection = {
    title: "Secure AI Across Enterprise Infrastructure",
    lead: ["AI agents rarely operate in isolation. They may interact with:"] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure AI agents reaching enterprise infrastructure held in a data centre server rack under privileged access control",
    },
};

const infraAreas: IconCard[] = [
    {
        icon: Server,
        title: "Cloud environments",
        text: "AWS, Azure, GCP, Kubernetes, workloads, and cloud-native services.",
    },
    {
        icon: Database,
        title: "Databases",
        text: "Production data stores and privileged database accounts.",
    },
    {
        icon: Globe,
        title: "Applications and APIs",
        text: "Enterprise tools, internal services, and automated integrations.",
    },
    {
        icon: Workflow,
        title: "DevOps environments",
        text: "CI/CD pipelines, infrastructure automation, repositories, and secrets.",
    },
];

const whySection = {
    title: "Why OmniPriv for AI Privileged Access?",
    lead: [
        "OmniPriv brings AI security back to a familiar security principle: no identity should receive more privilege than it needs, for longer than it needs it. The platform combines:",
    ] as RichText,
    reasons: [
        "Discover identities and privileges",
        "Control access with JIT, MFA, policies, and Zero Standing Privileges",
        "Protect privileged credentials",
        "Monitor sensitive sessions",
        "Detect abnormal behavior",
        "Govern AI-agent tools and data access",
        "Audit privileged activity",
    ],
    closing: [
        "This creates a unified approach to AI privileged access management instead of adding another disconnected AI security tool.",
    ] as RichText,
};

const stats = [
    { value: "39", label: "ML detection features", sub: "Behavioural analytics" },
    { value: "12", label: "Agent security pillars", sub: "Governance model" },
    { value: "100+", label: "MCP tools governed", sub: "Allowlist and data scope" },
    { value: "10s", label: "Anomaly sweep interval", sub: "Continuous detection" },
];

const keepReading = [
    { href: "/ai-pam", label: "How the AI-PAM engine scores a session" },
    { href: "/case-studies", label: "Read the anomaly detection case study" },
    { href: "/security", label: "Security architecture and certifications" },
];

const closing = {
    title: "Secure AI Without Giving AI Unlimited Privilege",
    body: [
        "AI should be able to work quickly without operating outside enterprise security boundaries.",
        "OmniPriv helps organizations secure AI agents with Privileged Access Management, JIT privileges, credential protection, AI-agent governance, behavioral threat detection, and complete session accountability.",
    ],
    kicker: "Every identity verified. Every privilege scoped. Every sensitive action visible.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
};

const faqs: FaqEntry[] = [
    {
        question: "What does it mean to secure AI agents?",
        answer:
            "To secure AI agents means controlling their identities, permissions, credentials, tools, data access, privileged actions, and activity records so autonomous systems cannot operate with unrestricted enterprise access.",
    },
    {
        question: "What is AI agent security?",
        answer:
            "AI agent security protects autonomous AI identities against excessive privilege, compromised credentials, unsafe tool use, unauthorized data access, and uncontrolled actions.",
    },
    {
        question: "How does PAM help secure AI agents?",
        answer:
            "PAM gives organizations a way to apply least privilege, JIT access, credential controls, approvals, session monitoring, and auditability to AI identities just as they would to privileged human administrators.",
    },
    {
        question: "What is Agentic Identity Security?",
        answer:
            "Agentic Identity Security governs autonomous AI identities as independent actors rather than treating them as extensions of human accounts. Each agent should have its own identity, permissions, scope, and audit history.",
    },
    {
        question: "Can OmniPriv require human approval for AI actions?",
        answer:
            "Yes. OmniPriv's AI-agent governance capability supports human approval before designated high-risk actions execute, with multi-approver chains and no self-approval.",
    },
    {
        question: "Does OmniPriv detect abnormal AI or privileged behavior?",
        answer:
            "Yes. OmniPriv documents machine-learning-based privileged activity analysis using its AI-PAM engine, including behavioural anomaly scoring and automated escalation or blocking.",
    },
];

export default function SecureAiAgentsPage() {
    return (
        <>
            <SplitHero
                badge={hero.badge}
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-5" />
                <Prose segments={hero.kicker} tone="kicker" className="mb-8" />
            </SplitHero>

            {/* ─── WHO HOLDS PRIVILEGE ──────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit media={whoSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={whoSection.title}>
                        {whoSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === whoSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <Prose segments={[whoSection.prompt]} tone="strong" className="mt-8 mb-3" />
                    <Prose segments={[whoSection.question]} tone="kicker" />
                </MediaSplit>
            </Section>

            {/* ─── ZERO TRUST PAM + JIT ─────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={zeroTrustSection.title}>
                        <Prose segments={zeroTrustSection.paragraphs[0]} className="mb-4" />
                        <Prose segments={zeroTrustSection.paragraphs[1]} />
                    </SectionHeading>

                    <CheckList items={zeroTrustSection.controls} className="mt-8" />

                    <Prose segments={zeroTrustSection.closing} className="mt-8" />

                    <SectionHeading
                        as="h3"
                        size="sm"
                        title={zeroTrustSection.subheading}
                        className="mt-14"
                    >
                        {zeroTrustSection.jit.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === zeroTrustSection.jit.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>
            </Section>

            {/* ─── CREDENTIALS ──────────────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit media={credentialsSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={credentialsSection.title}>
                        {credentialsSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === credentialsSection.paragraphs.length - 1
                                        ? ""
                                        : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </MediaSplit>
            </Section>

            {/* ─── SESSION MONITORING ───────────────── */}
            <Section border="bottom">
                <MediaSplit media={monitorSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={monitorSection.title}>
                        {monitorSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === monitorSection.paragraphs.length - 1
                                        ? ""
                                        : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <ArrowLink href="/ai-pam" className="mt-8">
                        See how agent sessions are scored
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── DETECT (dark band) ───────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={detectSection.title}>
                        <Prose segments={detectSection.paragraphs[0]} className="mb-4" />
                        <Prose segments={detectSection.paragraphs[1]} />
                    </SectionHeading>

                    <CheckList items={detectSection.patterns} className="mt-8" />

                    <Prose segments={detectSection.closing} className="mt-8" />
                </div>
            </Section>

            {/* ─── BOUNDARIES ───────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={boundariesSection.title}>
                        <Prose segments={boundariesSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={boundaries} columns={3} className="mt-12" />
            </Section>

            {/* ─── ENTERPRISE INFRASTRUCTURE ────────── */}
            <Section border="bottom">
                <MediaSplit media={infraSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={infraSection.title}>
                        <Prose segments={infraSection.lead} />
                    </SectionHeading>
                </MediaSplit>

                <IconCardGrid items={infraAreas} columns={2} className="mt-12" />
            </Section>

            {/* ─── WHY OMNIPRIV ─────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={whySection.title}>
                        <Prose segments={whySection.lead} />
                    </SectionHeading>

                    <CheckList items={whySection.reasons} className="mt-8" />

                    <Prose segments={whySection.closing} className="mt-8" />
                </div>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Governance you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Agent security is not a policy document. These are the controls running
                        behind it.
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

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ──────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about securing AI agents, agentic identity security and governing privileged AI access."
                items={faqs}
            />
        </>
    );
}
