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

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { AgentPassport, CredentialBroker, IdentityShift, InfraReach, PolicyCard, RiskScore, SecureHero, SessionReplay, StandingVsJit, WhyStack } from "@/components/secureagents/Visuals";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/secure-ai-agents, the destination of
 * the "AI Governance / Govern AI agents securely" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. SEO metadata continues to come from the module
 * entry in app/platform/data.ts. The former /platform/ai-agent-governance URL
 * 301s here (see next.config.js).
 *
 * Built from the shared page kit (components/pageui) so it matches the other
 * redesigned pages. Copy below is unchanged; values inside illustrations are
 * illustrative.
 *
 * Claims here are limited to what this repository already states: the agent
 * governance model (per-agent identity, tool allowlist, bounded data scope,
 * human approval, runtime enforcement, session audit) and the AI-PAM engine's
 * machine-learning scoring, escalation tiers and 10-second sweeper.
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
    primary: { href: "/demo?intent=ai", label: "Request a Demo" },
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
        src: "/challenges/secure-ai-agents.jpeg",
        alt: "An AI agent allowed through approved paths while out-of-policy requests are blocked",
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
        src: "/product/dashboard.png",
        alt: "OmniPriv dashboard recording privileged activity and risk across sessions",
        fit: "contain" as const,
    },
};

const detectSection = {
    title: "Detect AI-Driven Risk in Real Time",
    paragraphs: [
        ["Static policies cannot identify every abnormal behavior pattern."],
        [
            "OmniPriv's AI-PAM engine applies machine-learning-based anomaly detection to privileged activity. Its current architecture documents behavioural analysis across multiple features, risk scoring, escalation, and automated blocking workflows. This helps security teams identify situations such as:",
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
        text: "Not a borrowed human account, the agent has its own verifiable identity.",
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
    { value: "50", label: "Rows per audit-chain checkpoint", sub: "HMAC-SHA256 signed" },
    { value: "53", label: "MCP tools governed", sub: "Allowlist and data scope" },
    { value: "10s", label: "Anomaly sweep interval", sub: "Continuous detection" },
];

const keepReading = [
    { href: "/ai-pam", label: "How the AI-PAM engine scores a session" },
    { href: "/case-studies", label: "Read the anomaly detection case study" },
    { href: "/security", label: "Security architecture and framework mappings" },
];

const closing = {
    title: "Secure AI Without Giving AI Unlimited Privilege",
    body: [
        "AI should be able to work quickly without operating outside enterprise security boundaries.",
        "OmniPriv helps organizations secure AI agents with Privileged Access Management, JIT privileges, credential protection, AI-agent governance, behavioral threat detection, and complete session accountability.",
    ],
    kicker: "Every identity verified. Every privilege scoped. Every sensitive action visible.",
    primary: { href: "/demo?intent=ai", label: "Request a Demo" },
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

const NAV = [
    { id: "sa-who", label: "Who holds privilege" },
    { id: "sa-zero-trust", label: "Zero Trust & JIT" },
    { id: "sa-credentials", label: "Credentials" },
    { id: "sa-monitor", label: "Sessions" },
    { id: "sa-detect", label: "Detection" },
    { id: "sa-boundaries", label: "Boundaries" },
    { id: "sa-faq", label: "FAQ" },
];

/* The four figures this page already states, in the shared figures strip. */
const FACTS = [
    { value: 39, label: `${stats[0].label} · ${stats[0].sub.toLowerCase()}` },
    { value: 53, label: `${stats[2].label} · ${stats[2].sub.toLowerCase()}` },
    { value: 50, label: `${stats[1].label} · ${stats[1].sub}` },
    { value: "10s", label: `${stats[3].label} · ${stats[3].sub.toLowerCase()}` },
];

function Card({ item, delay }: { item: IconCard; delay: number }) {
    const Icon = item.icon;
    return (
        <li className="aip-card min-w-0 rounded-2xl border p-5" data-aos="fade-up" data-aos-delay={String(delay)}>
            <div className="flex items-center gap-3">
                <span className="icon-wrapper shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="op-card-title text-[0.9844rem]">{item.title}</h3>
            </div>
            <p className="op-card-text mt-3">{item.text}</p>
        </li>
    );
}

export default function SecureAiAgentsPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="sa-hero" />
            <Spotlight />

            <PageHero
                id="sa-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<SecureHero />}
            >
                <div className="mt-8 flex max-w-3xl items-center gap-3" data-aos="fade-up">
                    <span className="hidden sm:block h-px w-10 shrink-0 bg-[#00B8DB]" aria-hidden="true" />
                    <Prose segments={hero.kicker} tone="strong" className="text-[1.0625rem]" />
                </div>
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── WHO HOLDS PRIVILEGE ──────────────── */}
            <section id="sa-who" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={whoSection.title} />
                            <div className="mt-6 space-y-4">
                                {whoSection.paragraphs.map((p, k) => (
                                    <Prose key={k} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <IdentityShift />
                        </div>
                    </div>
                    <div className="mt-14 lg:mt-16 rounded-3xl border border-[#00B8DB]/25 bg-white dark:bg-[#15171a] px-6 py-8 sm:px-10 sm:py-10" data-aos="fade-up">
                        <Prose segments={[whoSection.prompt]} className="text-[1.0156rem]" />
                        <p className="mt-3 text-[1.5rem] sm:text-[1.875rem] leading-tight font-bold tracking-[-0.02em] text-[#0a1628] dark:text-white [text-wrap:balance]" style={{ fontFamily: "var(--font-syne)" }}>
                            {whoSection.question}
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── ZERO TRUST PAM + JIT ─────────────── */}
            <section id="sa-zero-trust" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                            <PolicyCard />
                        </div>
                        <div className="min-w-0 order-1 lg:order-2">
                            <Heading title={zeroTrustSection.title} />
                            <div className="mt-6 space-y-4">
                                {zeroTrustSection.paragraphs.map((p, k) => (
                                    <Prose key={k} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </div>
                            <CheckList items={zeroTrustSection.controls} className="mt-6" />
                            <Prose segments={zeroTrustSection.closing} className="mt-6 text-[1.0156rem]" />
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading as="h3" title={zeroTrustSection.subheading} />
                            <div className="mt-6 space-y-4">
                                {zeroTrustSection.jit.map((p, k) => (
                                    <Prose key={k} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <StandingVsJit />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS ──────────────────────── */}
            <section id="sa-credentials" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={credentialsSection.title} />
                            <div className="mt-6 space-y-4">
                                {credentialsSection.paragraphs.map((p, k) => (
                                    <Prose key={k} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <CredentialBroker />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SESSION MONITORING ───────────────── */}
            <section id="sa-monitor" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                            <SessionReplay />
                        </div>
                        <div className="min-w-0 order-1 lg:order-2">
                            <Heading title={monitorSection.title} />
                            <div className="mt-6 space-y-4">
                                {monitorSection.paragraphs.map((p, k) => (
                                    <Prose key={k} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </div>
                            <ArrowLink href="/ai-pam" className="mt-7">
                                See how agent sessions are scored
                            </ArrowLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DETECT (dark band) ───────────────── */}
            <div className="dark">
                <section id="sa-detect" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <Heading title={detectSection.title} />
                                <div className="mt-6 space-y-4">
                                    {detectSection.paragraphs.map((p, k) => (
                                        <Prose key={k} segments={p} className="text-[1.0156rem] text-slate-600 dark:text-slate-400" />
                                    ))}
                                </div>
                                <CheckList items={detectSection.patterns} className="mt-6" />
                                <div className="mt-7 flex items-center gap-3">
                                    <span className="hidden sm:block h-px w-10 shrink-0 bg-[#00B8DB]" aria-hidden="true" />
                                    <Prose segments={detectSection.closing} tone="strong" className="text-[1.0625rem]" />
                                </div>
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <RiskScore />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── BOUNDARIES ───────────────────────── */}
            <section id="sa-boundaries" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0">
                            <Heading title={boundariesSection.title}>
                                <Prose segments={boundariesSection.lead} className="text-[1.0625rem]" />
                            </Heading>
                            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                                {boundaries.map((b, k) => (
                                    <Card key={b.title} item={b} delay={(k % 2) * 70} />
                                ))}
                            </ul>
                        </div>
                        <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <AgentPassport />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ENTERPRISE INFRASTRUCTURE ────────── */}
            <section className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={infraSection.title}>
                                <Prose segments={infraSection.lead} className="text-[1.0625rem]" />
                            </Heading>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <InfraReach />
                        </div>
                    </div>
                    <ul className="op-body grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {infraAreas.map((a, k) => (
                            <Card key={a.title} item={a} delay={k * 60} />
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── WHY OMNIPRIV ─────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={whySection.title}>
                                <Prose segments={whySection.lead} className="text-[1.0625rem]" />
                            </Heading>
                            <div className="mt-7 flex items-center gap-3" data-aos="fade-up">
                                <span className="hidden sm:block h-px w-10 shrink-0 bg-[#00B8DB]" aria-hidden="true" />
                                <Prose segments={whySection.closing} tone="strong" className="text-[1.0625rem]" />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <WhyStack reasons={whySection.reasons} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── GOVERNANCE YOU CAN POINT AT / KEEP READING ── */}
            <section className={sectionLine}>
                <div className="container-xl py-12 lg:py-14">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2" data-aos="fade-up">
                        <h2 className="op-h3">Governance you can point at</h2>
                        <p className="text-[0.9375rem] text-slate-600 dark:text-slate-400">
                            Agent security is not a policy document. These are the controls running behind it.
                        </p>
                    </div>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                lead={closing.kicker}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="sa-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
