import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    Activity,
    ArrowRight,
    Bot,
    Boxes,
    Cloud,
    Database,
    Eye,
    FileSearch,
    GitBranch,
    KeyRound,
    Layers,
    Lock,
    ScanSearch,
    ShieldCheck,
    Sparkles,
    Timer,
    Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import EnginePipeline, { type Stage } from "@/components/aipam/EnginePipeline";
import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import ClosingChecks from "@/components/aipam/ClosingChecks";
import IntegrationHub from "@/components/aipam/IntegrationHub";
import CountUp from "@/components/home/CountUp";
import FaqAccordion from "@/components/sections/FaqAccordion";
import HeroFlow from "@/components/aipam/HeroFlow";
import IdentityTabs, { type IdentityTab } from "@/components/aipam/IdentityTabs";
import { AgentVisual, AuditVisual, BehaviorVisual, JitVisual, SessionVisual, VaultVisual } from "@/components/aipam/Visuals";
import BgMotif from "@/components/home/BgMotif";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { RichText } from "@/lib/rich-text";

/*
 * /ai-pam: AI PAM and privileged access management.
 *
 * Copy supplied by the marketing team (October 2026), including its inline
 * links, kept verbatim. Layout is bespoke to this page (components/aipam):
 *
 *   Hero            copy + live AI-PAM decision stream
 *   Evolve          then vs now identity sprawl, before / during / after
 *   What is AI PAM  the two requirements converging on the engine
 *   Identities      four identity types as tabs
 *   Capabilities    bento of six, each with a small product illustration
 *   Engine          dark band, Detect -> Govern -> Respond pipeline
 *   Why OmniPriv    editorial list beside a sticky heading
 *   Across          four environments
 *   AI-ready        product screenshot with its integration points
 *   Closing, FAQ
 *
 * Sample names and values in the illustrations are illustrative.
 */

export const metadata: Metadata = {
    // Absolute: the root layout's "%s | OmniPriv" template would repeat the brand.
    title: { absolute: "AI PAM & Privileged Access Management | OmniPriv" },
    description:
        "Secure human, machine and AI identities with OmniPriv AI PAM solution. Enforce JIT access, protect credentials and detect privileged threats in real time.",
};

interface RichCard {
    icon: LucideIcon;
    title: string;
    paragraphs: RichText[];
}

interface Capability extends RichCard {
    visual: "jit" | "vault" | "agent" | "session" | "behavior" | "audit";
}

/* ─── Content (verbatim) ─────────────────────────────────────────────── */

const hero = {
    titleLead: "AI PAM &",
    titleAccent: "Privileged Access Management",
    tagline: ["Secure Every Identity. Control Every Privilege. Stay Ahead of AI-Driven Threats."] as RichText,
    paragraphs: [
        [
            "As AI agents, machine identities, and automated workflows become part of everyday business operations, traditional access controls are no longer enough. Organizations need to secure not only who accesses critical systems, but also what they can do, how long access lasts, and whether their activity creates risk.",
        ],
        [
            "OmniPriv delivers an intelligent ",
            { text: "AI PAM solution", href: "https://omnipriv.com/blog/ai-pam-solutions" },
            " that combines Zero Trust security, Just-in-Time (JIT) access, privileged credential management, AI-powered threat detection, and continuous session visibility.",
        ],
        [
            "Protect human, machine, and AI identities through a unified privileged access management platform built to reduce security risks without slowing down business operations.",
        ],
    ] as RichText[],
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
    image: {
        src: "/hero/pam-guardian-ai.png",
        alt: "AI guardian head with a padlock, representing AI-powered privileged access management",
    },
};

const evolve = {
    title: "Why Traditional PAM Security Needs to Evolve",
    paragraphs: [
        [
            "Privileged access used to be mainly about IT administrators and powerful accounts. Today, access extends across cloud infrastructure, remote employees, third-party vendors, applications, service accounts, and autonomous AI agents.",
        ],
        [
            "These identities often require elevated permissions to perform legitimate tasks. When privileges remain active unnecessarily or credentials are poorly managed, a single compromised identity can expose sensitive systems.",
        ],
        [
            "Modern PAM security must address these challenges by controlling access before, during, and after privileged activity.",
        ],
        [
            "OmniPriv brings identity verification, least-privilege enforcement, intelligent behavioral monitoring, and automated controls together. Instead of trusting an identity simply because it has been authenticated, organizations can continuously govern privileged operations.",
        ],
    ] as RichText[],
};

const whatIs = {
    title: "What Is AI PAM and How Does It Improve Security?",
    paragraphs: [
        [
            { text: "AI Privileged Access Management", href: "https://omnipriv.com/" },
            " (AI PAM) combines traditional privileged access controls with artificial intelligence, behavioral analytics, and governance for automated identities.",
        ],
        [
            "While conventional PAM focuses on securing privileged credentials and administrator sessions, AI PAM also helps organizations detect unusual behavior and control the permissions used by AI-enabled applications and autonomous agents.",
        ],
        [
            "An effective PAM AI strategy focuses on two critical security requirements: using AI to identify privileged-access threats and preventing AI systems from receiving uncontrolled permissions.",
        ],
        [
            "OmniPriv supports both approaches through its integrated AI-PAM engine, access policies, credential protection, and identity governance controls.",
        ],
    ] as RichText[],
    kicker: "The result is more informed security decisions, better visibility, and stronger protection for enterprise infrastructure.",
    image: {
        src: "/identities/ai-automated-identities.jpeg",
        alt: "Glowing AI brain above a secured platform",
    },
};

const identities = {
    title: "Unified Privileged Access Management Solutions for Every Identity",
    lead: ["Modern enterprises depend on different types of identities, but privileged access should remain consistently governed."] as RichText,
    cards: [
        {
            key: "human",
            title: "Human Identity Security",
            short: "Administrators, developers, employees, contractors",
            controls: ["Multi-factor authentication", "Role-based permissions", "JIT privileges", "Monitored sessions"],
            paragraphs: [
                ["Protect administrators, developers, employees, and contractors with multi-factor authentication, role-based permissions, JIT privileges, and monitored sessions."],
                ["OmniPriv helps organizations provide legitimate access while reducing unnecessary standing administrative permissions."],
            ],
        },
        {
            key: "agent",
            title: "AI Agent Security",
            short: "Agents acting on databases, apps, APIs and tools",
            controls: ["Agent-specific identities", "Scoped permissions", "Tool-level authorization", "Human approval for sensitive actions", "Auditable activity"],
            paragraphs: [
                [
                    { text: "AI agents", href: "https://omnipriv.com/platform/secure-ai-agents-omnipriv" },
                    " can interact with databases, enterprise applications, APIs, and automation tools. Without clear authorization boundaries, these interactions can create new paths to sensitive information.",
                ],
                ["OmniPriv supports agent-specific identities, scoped permissions, tool-level authorization, human approval for sensitive actions, and auditable activity. This enables businesses to adopt agentic AI without granting unrestricted privileged access."],
            ],
        },
        {
            key: "machine",
            title: "Machine Identity Security",
            short: "Service accounts, workloads and applications",
            controls: ["Centralized credential management", "Automated rotation", "Short-lived secrets", "Policy-based privileged controls"],
            paragraphs: [
                ["Machine identities, including service accounts, workloads, and applications, often operate without direct human supervision."],
                ["OmniPriv helps protect their credentials through centralized management, automated rotation, short-lived secrets, and policy-based privileged controls across supported cloud and DevOps environments."],
            ],
        },
        {
            key: "vendor",
            title: "Third-Party and Vendor Access",
            short: "External vendors and support partners",
            controls: ["Time-limited access", "Policy-controlled privileges", "Session recording", "Accountability for every action"],
            paragraphs: [
                ["External vendors sometimes require administrative access to perform maintenance, troubleshoot infrastructure, or deliver technical support."],
                ["OmniPriv enables time-limited, policy-controlled privileged access with session recording and accountability, reducing the risks associated with unmanaged vendor credentials."],
            ],
        },
    ] as IdentityTab[],
};

const capabilities = {
    title: "AI-Powered Privileged Access Management Software: Core Capabilities",
    lead: ["OmniPriv combines essential privileged access management software capabilities with intelligent security controls to support modern enterprise environments."] as RichText,
    cards: [
        {
            icon: Timer,
            title: "Just-in-Time Access and Zero Standing Privileges",
            visual: "jit",
            paragraphs: [
                ["Permanent administrative permissions increase exposure when credentials are stolen or accounts are compromised."],
                ["OmniPriv enables JIT access that grants approved privileges for a defined period and removes them after the authorized window expires. Least-privilege policies help ensure users and automated identities receive only the access required for their tasks."],
            ],
        },
        {
            icon: KeyRound,
            title: "Intelligent Credential and Secrets Management",
            visual: "vault",
            paragraphs: [
                ["Privileged passwords, SSH keys, API tokens, and service-account credentials require protection throughout their lifecycle."],
                ["OmniPriv provides an encrypted credential vault, automated credential rotation, and integration with dynamic secrets. This reduces dependence on hardcoded credentials and helps prevent unnecessary exposure of sensitive authentication information."],
            ],
        },
        {
            icon: Bot,
            title: "AI Agent Governance and Access Control",
            visual: "agent",
            paragraphs: [
                ["Autonomous systems should not inherit unrestricted permissions from human accounts."],
                ["OmniPriv applies identity-specific policies, tool allowlists, access scoping, and approval requirements to supported AI-agent workflows. High-risk actions can require human authorization before execution, helping security teams maintain control over sensitive operations."],
            ],
        },
        {
            icon: Eye,
            title: "Privileged Session Monitoring and Recording",
            visual: "session",
            paragraphs: [
                ["A successful login should never mark the end of security oversight."],
                ["OmniPriv records and monitors supported SSH, RDP, VNC, HTTP, and database sessions. Searchable activity histories, command-level restrictions, and session intervention capabilities help teams investigate suspicious behavior and maintain accountability."],
            ],
        },
        {
            icon: Activity,
            title: "AI-Powered Behavioral Threat Detection",
            visual: "behavior",
            paragraphs: [
                ["Static access rules cannot identify every form of suspicious activity."],
                ["OmniPriv uses machine-learning behavioral analysis to identify unusual privileged activity, including abnormal commands, unexpected access patterns, and potential privilege misuse."],
                [
                    "Its ",
                    { text: "AI-PAM engine", href: "https://omnipriv.com/" },
                    " combines behavioral scoring with live threat detection and response controls, helping security teams investigate and contain risky activity.",
                ],
            ],
        },
        {
            icon: FileSearch,
            title: "Centralized Audit, Governance, and Compliance",
            visual: "audit",
            paragraphs: [
                ["Security teams need reliable records of privileged activity for internal oversight and regulatory audits."],
                ["OmniPriv brings access approvals, activity logs, session records, and reporting into a centralized governance framework. Organizations can collect evidence, investigate access events, and support compliance requirements without relying entirely on disconnected manual processes."],
            ],
        },
    ] as Capability[],
};

const engine = {
    title: "How the OmniPriv AI-PAM Engine Strengthens Security",
    paragraphs: [
        ["Traditional privileged security tools can generate large volumes of alerts without always connecting them to specific access decisions or activities."],
        ["OmniPriv brings behavioral threat intelligence and deterministic AI-agent authorization into a single security platform."],
    ] as RichText[],
    cards: [
        {
            icon: ScanSearch,
            step: "Detect",
            title: "Detect Suspicious Activity with Machine Learning",
            paragraphs: [
                ["The OmniPriv AI-PAM engine evaluates privileged-session behavior using 39 behavioral features. Its threat detection controls help identify suspicious commands, credential harvesting, lateral movement indicators, and other abnormal privileged operations."],
            ],
        },
        {
            icon: Lock,
            step: "Govern",
            title: "Govern AI Agents Before They Act",
            paragraphs: [
                ["For supported Model Context Protocol (MCP) workflows, OmniPriv can verify agent identity, restrict available tools, enforce data-access boundaries, and require approval for sensitive actions."],
            ],
        },
        {
            icon: ShieldCheck,
            step: "Respond",
            title: "Respond and Maintain Accountability",
            paragraphs: [
                ["When predefined risk conditions are detected, the platform can generate alerts, restrict activity, or terminate affected sessions. Detailed audit records help security teams understand why an access decision was made and what happened afterward."],
            ],
        },
    ] as (Stage & { icon: LucideIcon })[],
};

const whyChoose = {
    title: "Why Choose OmniPriv Over Traditional PAM Solutions?",
    paragraphs: [
        ["Choosing among the best PAM solutions requires more than comparing password vaults or administrative login features."],
        ["Organizations should evaluate how well a platform secures different identity types, enforces privileges, detects threats, supports existing infrastructure, and simplifies security operations."],
        ["OmniPriv offers several practical advantages for organizations modernizing their privileged access strategy."],
    ] as RichText[],
    cards: [
        {
            icon: Layers,
            title: "Unified Access Control Across Identity Types",
            paragraphs: [
                ["Instead of separating human administrators, service accounts, and AI agents into unrelated security workflows, OmniPriv provides a shared privileged-access governance approach."],
                ["This helps organizations apply consistent security principles as their identity environments grow."],
            ],
        },
        {
            icon: Sparkles,
            title: "Built-In AI Threat Detection and Agent Governance",
            paragraphs: [
                ["OmniPriv combines machine-learning-based privileged threat detection with agent-level access policies."],
                ["Security teams can address both suspicious activity and unauthorized AI-agent actions without treating them as entirely separate security challenges."],
            ],
        },
        {
            icon: Boxes,
            title: "Agentless Architecture and Deployment Control",
            paragraphs: [
                ["OmniPriv supports agentless privileged access and on-premises deployment, helping enterprises manage access without installing software agents on every endpoint or server."],
                ["Organizations can retain greater control over the infrastructure supporting their PAM deployment."],
            ],
        },
        {
            icon: ShieldCheck,
            title: "Security Controls Beyond Authentication",
            paragraphs: [
                ["MFA verifies identity, but privileged operations require additional protection."],
                ["OmniPriv adds least privilege, approval workflows, credential protection, command restrictions, JIT access, and session monitoring to help enforce authorization throughout the access lifecycle."],
            ],
        },
        {
            icon: Eye,
            title: "Centralized Governance and Visibility",
            paragraphs: [
                ["OmniPriv connects privileged-access policies with session visibility, behavioral threat analytics, and audit reporting."],
                ["Security teams can investigate activity and manage access decisions from a more consistent operational framework."],
            ],
        },
    ] as RichCard[],
    difference:
        "One privileged-access platform that brings identity governance, credential security, AI-driven monitoring, and controlled automation together.",
};

const across = {
    title: "AI PAM Security Across Cloud, DevOps, and Enterprise Infrastructure",
    cards: [
        {
            icon: Cloud,
            title: "Cloud and Hybrid Infrastructure",
            paragraphs: [
                ["Apply controlled privileged access across supported AWS, Microsoft Azure, Google Cloud, Kubernetes, databases, and hybrid environments. Reduce the risks of excessive permissions and disconnected administrative controls."],
            ],
        },
        {
            icon: GitBranch,
            title: "DevOps and Automated Workflows",
            paragraphs: [
                ["Protect CI/CD pipelines and infrastructure automation through short-lived credentials, dynamic secrets, and privileged-access policies. Reduce the need to embed sensitive credentials in scripts or deployment workflows."],
            ],
        },
        {
            icon: Database,
            title: "Enterprise Applications and Databases",
            paragraphs: [
                ["Control access to critical systems through secure credentials, session monitoring, approval policies, and activity records."],
            ],
        },
        {
            icon: Workflow,
            title: "AI-Powered Business Operations",
            paragraphs: [
                ["Allow supported AI agents to interact with approved enterprise tools while enforcing scoped privileges, access policies, human oversight for sensitive actions, and auditable activity."],
            ],
        },
    ] as RichCard[],
};

const aiReady = {
    title: "Make Your Access Management System AI-Ready",
    paragraphs: [
        ["A modern access management system should do more than authenticate employees and assign roles."],
        ["As organizations introduce more automated and AI-driven services, they need to govern privileged actions across human and non-human identities."],
        ["OmniPriv complements existing identity and security infrastructure with privileged-access authorization, credential management, session controls, and intelligent monitoring. Its enterprise integrations support directory services, cloud environments, IT service management processes, and security monitoring workflows."],
        ["This enables organizations to strengthen their existing security investments while extending Privileged Access Management into new AI-driven use cases."],
    ] as RichText[],
    image: {
        src: "/product/dashboard.png",
        alt: "OmniPriv security dashboard with risk posture, compliance score and asset health",
        fit: "contain" as const,
    },
};

const closing = {
    title: "Secure Your Enterprise with OmniPriv AI PAM",
    body: [
        "Your AI systems are becoming more capable. Your privileged access security should keep pace.",
        "Every privileged identity represents both an operational requirement and a potential security risk. OmniPriv helps organizations reduce that risk through centralized access governance, temporary privileges, secure credentials, AI-powered threat detection, and complete accountability for governed sessions.",
        "Whether you're replacing legacy privileged access management solutions or extending security to AI agents and machine identities, OmniPriv provides a practical foundation for modern privileged security.",
    ],
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is an AI PAM solution?",
        answer:
            "An AI PAM solution combines Privileged Access Management with AI-powered security analytics and controls for automated identities. It helps organizations manage elevated permissions, protect credentials, monitor privileged sessions, detect unusual activity, and govern access involving people, machines, and AI agents.",
    },
    {
        question: "What is the difference between PIM vs PAM?",
        answer: [
            "In a PIM vs PAM comparison, Privileged Identity Management (PIM) primarily focuses on managing privileged identities, roles, and the activation of elevated permissions. Privileged Access Management (PAM) provides broader protection for privileged access, often including credential vaulting, session recording, access enforcement, and auditing.",
            "The capabilities overlap, and many modern platforms combine both approaches.",
        ],
    },
    {
        question: "How does PAM AI improve cybersecurity?",
        answer:
            "PAM AI brings behavioral analytics and intelligent detection into privileged security operations. It can help identify abnormal access patterns, suspicious commands, and potential privilege misuse. When combined with access policies, JIT permissions, and session controls, AI-assisted detection supports faster investigation and response.",
    },
    {
        question: "What features should the best PAM solutions include?",
        answer:
            "The best PAM solutions for an organization depend on its infrastructure and risk requirements. Important capabilities commonly include credential vaulting, automated password rotation, MFA, least privilege, JIT access, privileged-session monitoring, threat detection, audit reporting, and integration with existing identity systems.",
    },
    {
        question: "How is AI PAM different from traditional PAM security?",
        answer:
            "Traditional PAM concentrates on protecting administrator credentials and controlling elevated access. AI PAM extends these controls with intelligent threat analytics and security policies for machine and AI-driven activity.",
    },
    {
        question: "Can OmniPriv secure AI agents and machine identities?",
        answer:
            "Yes. OmniPriv supports privileged access controls for AI agents, automated workflows, service accounts, and machine identities. Depending on the workflow and integration, capabilities include scoped permissions, JIT access, secure credentials, automated rotation, agent authorization, monitoring, and auditing.",
    },
    {
        question: "Can OmniPriv integrate with an existing access management system?",
        answer:
            "OmniPriv supports integration with enterprise identity services, cloud infrastructure, ITSM workflows, and security monitoring systems. This helps organizations extend privileged-access governance without replacing every existing identity management investment. Integration requirements should be validated against the systems in use.",
    },
    {
        question: "Why should enterprises choose OmniPriv privileged access management software?",
        answer:
            "OmniPriv combines credential security, privileged session management, JIT authorization, centralized auditing, intelligent behavioral analytics, and AI-agent governance in one enterprise PAM platform.",
    },
];


const VISUAL = {
    jit: JitVisual,
    vault: VaultVisual,
    agent: AgentVisual,
    session: SessionVisual,
    behavior: BehaviorVisual,
    audit: AuditVisual,
} as const;

/* Bento spans on a 6-column grid: 3+3 / 2+2+2 / 6. */
const BENTO_SPAN = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-6"];

const SPRAWL_THEN = ["IT administrators", "Powerful accounts"];
const SPRAWL_NOW = [
    "Cloud infrastructure",
    "Remote employees",
    "Third-party vendors",
    "Applications",
    "Service accounts",
    "Autonomous AI agents",
];

const PHASES = [
    { k: "Before", v: "Identity verification and least-privilege enforcement" },
    { k: "During", v: "Intelligent behavioral monitoring" },
    { k: "After", v: "Automated controls and continuous governance" },
];

const ACROSS_TAGS: Record<string, string[]> = {
    "Cloud and Hybrid Infrastructure": ["AWS", "Microsoft Azure", "Google Cloud", "Kubernetes", "Databases", "Hybrid"],
    "DevOps and Automated Workflows": ["CI/CD pipelines", "Short-lived credentials", "Dynamic secrets"],
    "Enterprise Applications and Databases": ["Secure credentials", "Session monitoring", "Approval policies", "Activity records"],
    "AI-Powered Business Operations": ["Scoped privileges", "Human oversight", "Auditable activity"],
};


const NAV = [
    { id: "aip-evolve", label: "Why evolve" },
    { id: "aip-what", label: "What is AI PAM" },
    { id: "aip-identities", label: "Every identity" },
    { id: "aip-capabilities", label: "Capabilities" },
    { id: "aip-engine", label: "AI-PAM engine" },
    { id: "aip-why", label: "Why OmniPriv" },
    { id: "aip-across", label: "Cloud & DevOps" },
    { id: "aip-ready", label: "AI-ready" },
    { id: "aip-faq", label: "FAQ" },
];

/* Verified product figures (see project notes). */
const FACTS: { value: number | string; suffix?: string; label: string }[] = [
    { value: 39, label: "behavioral features scored per privileged session" },
    { value: 10, suffix: "s", label: "sweep across active sessions, with a 10s grace window" },
    { value: 53, label: "MCP tools governed for AI agents" },
    { value: "5", label: "session types recorded: SSH, RDP, VNC, HTTP, database" },
];

/* ─── Small building blocks ─────────────────────────────────────────── */

function Heading({ title, children, className }: { title: string; children?: React.ReactNode; className?: string }) {
    return (
        <div className={cn("max-w-3xl", className)} data-aos="fade-up">
            <h2 className="op-h2">{title}</h2>
            {children && <div className="mt-4 space-y-3 aip-lede">{children}</div>}
        </div>
    );
}

function Paras({ items, className }: { items: RichText[]; className?: string }) {
    return (
        <div className={cn("space-y-4", className)}>
            {items.map((p, i) => (
                <Prose key={i} segments={p} className="text-[1.0156rem]" />
            ))}
        </div>
    );
}

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function AiPamPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="aip-hero" />
            <Spotlight />

            {/* ─── HERO ─────────────────────────────────────────── */}
            <section id="aip-hero" className="relative overflow-hidden border-b border-slate-900/[0.05] dark:border-white/[0.05]">
                <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative pt-14 pb-12 lg:pt-20 lg:pb-16">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] gap-12 lg:gap-14 items-center">
                        <div className="min-w-0">
                            <h1 className="op-h1 aip-h1" data-aos="fade-up">
                                {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
                            </h1>
                            <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-snug font-semibold text-[#0a1628] dark:text-white max-w-[36rem]" data-aos="fade-up" data-aos-delay="60">
                                {hero.tagline[0] as string}
                            </p>
                            <div className="mt-6 max-w-[38rem]" data-aos="fade-up" data-aos-delay="120">
                                <Paras items={hero.paragraphs} />
                            </div>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="180">
                                <Link href={hero.primary.href} className="hp-btn-primary group">
                                    {hero.primary.label}
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                                <Link href={hero.secondary.href} className="hp-btn-secondary">
                                    {hero.secondary.label}
                                </Link>
                            </div>
                        </div>
                        <div className="min-w-0 aip-console-wrap" data-aos="fade-up" data-aos-delay="120">
                            <HeroFlow />
                        </div>
                    </div>

                    {/* verified figures */}
                    <dl className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02]" data-aos="fade-up">
                        {FACTS.map((f) => (
                            <div key={f.label} className="aip-fact px-5 py-5 lg:px-6">
                                <dt className="sr-only">{f.label}</dt>
                                <dd>
                                    <span className="block text-[2rem] leading-none font-bold tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                        {typeof f.value === "number" ? <CountUp to={f.value} suffix={f.suffix ?? ""} /> : f.value}
                                    </span>
                                    <span className="mt-2 block text-[0.8125rem] leading-snug text-slate-600 dark:text-slate-400">{f.label}</span>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* ─── WHY PAM NEEDS TO EVOLVE ──────────────────────── */}
            <section id="aip-evolve" className="op-band-muted bg-slate-50 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-start">
                        <div>
                            <Heading title={evolve.title} />
                            <Paras items={evolve.paragraphs} className="mt-6 max-w-[40rem]" />
                        </div>

                        {/* then vs now */}
                        <div className="lg:pt-2 space-y-4 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <div className="rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white/70 dark:bg-white/[0.02] p-6">
                                <div className="text-[0.8125rem] font-semibold text-slate-500 dark:text-slate-400">Privileged access used to mean</div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {SPRAWL_THEN.map((t) => (
                                        <span key={t} className="rounded-full border border-slate-900/[0.1] dark:border-white/[0.1] px-3 py-1.5 text-[0.8125rem] text-slate-500 dark:text-slate-400">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="rounded-3xl border border-[#00B8DB]/30 bg-white dark:bg-[#15171a] p-6 shadow-[0_20px_50px_-30px_rgba(0,102,122,0.45)]">
                                <div className="text-[0.8125rem] font-semibold text-[#00667A] dark:text-[#7FD9EA]">Today it extends across</div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {SPRAWL_NOW.map((t, i) => (
                                        <span
                                            key={t}
                                            className="aip-chip rounded-full border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1.5 text-[0.8125rem] font-medium text-[#00667A] dark:text-[#7FD9EA]"
                                            data-aos="zoom-in"
                                            data-aos-delay={String(150 + i * 70)}
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* before / during / after */}
                    <div className="mt-14 lg:mt-16" data-aos="fade-up">
                        <div className="relative grid md:grid-cols-3 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#15171a] overflow-hidden">
                            {PHASES.map((p, i) => (
                                <div
                                    key={p.k}
                                    className={cn(
                                        "relative p-6 lg:p-7",
                                        i > 0 && "border-t md:border-t-0 md:border-l border-slate-900/[0.07] dark:border-white/[0.07]"
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#00B8DB] text-[#03121c] text-[0.8125rem] font-bold">
                                            {i + 1}
                                        </span>
                                        <span className="op-card-title">{p.k} privileged activity</span>
                                    </div>
                                    <p className="mt-3 text-[0.9375rem] text-slate-600 dark:text-slate-400">{p.v}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WHAT IS AI PAM ───────────────────────────────── */}
            <section id="aip-what" className="border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div>
                            <Heading title={whatIs.title} />
                            <Paras items={whatIs.paragraphs} className="mt-6" />
                            <p className="mt-6 pl-4 border-l-2 border-[#00B8DB] text-[1.0625rem] font-semibold text-[#0a1628] dark:text-white" data-aos="fade-up">
                                {whatIs.kicker}
                            </p>
                        </div>

                        {/* two requirements converging on the engine */}
                        <div className="relative" data-aos="fade-up" data-aos-delay="100">
                            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden border border-slate-900/[0.08] dark:border-white/[0.08]">
                                <Image src={whatIs.image.src} alt={whatIs.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/85 via-[#0a1628]/30 to-transparent" />
                                <div className="absolute inset-x-4 sm:inset-x-6 bottom-4 sm:bottom-6 grid sm:grid-cols-2 gap-3">
                                    <div className="rounded-2xl border border-white/15 bg-[#0b0c0e]/70 backdrop-blur-md p-4">
                                        <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-[#7FD9EA]">
                                            <ScanSearch className="w-4 h-4" aria-hidden="true" /> AI for privileged security
                                        </div>
                                        <p className="mt-1.5 text-[0.8125rem] leading-snug text-slate-200">Using AI to identify privileged-access threats</p>
                                    </div>
                                    <div className="rounded-2xl border border-white/15 bg-[#0b0c0e]/70 backdrop-blur-md p-4">
                                        <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-[#7FD9EA]">
                                            <Lock className="w-4 h-4" aria-hidden="true" /> Security for AI
                                        </div>
                                        <p className="mt-1.5 text-[0.8125rem] leading-snug text-slate-200">Preventing AI systems from receiving uncontrolled permissions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── EVERY IDENTITY ───────────────────────────────── */}
            <section id="aip-identities" className="op-band-muted bg-slate-50 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl op-sec">
                    <Heading title={identities.title}>
                        <Prose segments={identities.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body" data-aos="fade-up">
                        <IdentityTabs items={identities.cards} />
                    </div>
                </div>
            </section>

            {/* ─── CORE CAPABILITIES (bento) ────────────────────── */}
            <section id="aip-capabilities" className="relative overflow-hidden border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <BgMotif kind="key" className="w-[22rem] h-[22rem] -top-24 -right-20" />
                <div className="container-xl op-sec relative">
                    <Heading title={capabilities.title}>
                        <Prose segments={capabilities.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
                        {capabilities.cards.map((c, i) => {
                            const V = VISUAL[c.visual];
                            const wide = i === 5;
                            return (
                                <article
                                    key={c.title}
                                    className={cn(
                                        "aip-card group flex min-w-0 rounded-3xl border p-6 lg:p-7",
                                        BENTO_SPAN[i],
                                        i === 5 && "sm:col-span-2",
                                        wide ? "flex-col lg:flex-row lg:items-center gap-6 lg:gap-8" : "flex-col gap-5"
                                    )}
                                    data-aos="fade-up"
                                    data-aos-delay={String((i % 3) * 70)}
                                >
                                    <div className={cn("min-w-0", wide && "lg:flex-1")}>
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper">
                                                <c.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h3 className="op-card-title">{c.title}</h3>
                                        </div>
                                        <div className="mt-4 space-y-2.5">
                                            {c.paragraphs.map((p, j) => (
                                                <Prose key={j} segments={p} className={cn("text-[0.9375rem]", j === 0 && "text-slate-900 dark:text-slate-200 font-medium")} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className={cn("mt-auto", wide && "lg:mt-0 lg:w-[44%] shrink-0")}>
                                        <V />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── THE ENGINE (dark band) ───────────────────────── */}
            <div className="dark">
                <section id="aip-engine" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] gap-10 items-end">
                            <Heading title={engine.title}>
                                {engine.paragraphs.map((p, i) => (
                                    <Prose key={i} segments={p} className="text-[1.0625rem]" />
                                ))}
                            </Heading>
                            <div className="lg:text-right" data-aos="fade-up" data-aos-delay="120">
                                <div className="text-[4rem] lg:text-[5rem] leading-none font-bold text-white tracking-[-0.04em]" style={{ fontFamily: "var(--font-syne)" }}>
                                    <CountUp to={39} />
                                </div>
                                <div className="mt-2 text-[0.9375rem] text-slate-400">behavioral features evaluated per privileged session</div>
                            </div>
                        </div>
                        <div className="mt-14 lg:mt-16">
                            <EnginePipeline stages={engine.cards.map(({ step, title, paragraphs }) => ({ step, title, paragraphs }))} />
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── WHY CHOOSE OMNIPRIV ──────────────────────────── */}
            <section id="aip-why" className="border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-10 lg:gap-16 items-start">
                        <div className="lg:sticky lg:top-40">
                            <Heading title={whyChoose.title}>
                                {whyChoose.paragraphs.map((p, i) => (
                                    <Prose key={i} segments={p} className="text-[1.0156rem]" />
                                ))}
                            </Heading>
                        </div>
                        <div>
                            <ol className="divide-y divide-slate-900/[0.08] dark:divide-white/[0.08] border-y border-slate-900/[0.08] dark:border-white/[0.08]">
                                {whyChoose.cards.map((c) => (
                                    <li key={c.title} className="aip-row grid grid-cols-[auto_minmax(0,1fr)] gap-5 py-7 px-3 -mx-3" data-aos="fade-up">
                                        <span className="icon-wrapper mt-0.5">
                                            <c.icon className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <div>
                                            <h3 className="op-h3">{c.title}</h3>
                                            <div className="mt-2 space-y-2">
                                                {c.paragraphs.map((p, j) => (
                                                    <Prose key={j} segments={p} className="text-[0.9844rem]" />
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <figure className="mt-10 relative rounded-3xl bg-[#0a1628] dark:bg-[#111214] dark:border dark:border-white/[0.08] p-7 sm:p-9 overflow-hidden" data-aos="fade-up">
                                <div className="aip-quote-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                                <figcaption className="relative text-[0.875rem] font-semibold text-[#7FD9EA]">The OmniPriv difference</figcaption>
                                <blockquote className="relative mt-3 text-[1.375rem] sm:text-[1.625rem] leading-[1.3] font-bold text-white tracking-[-0.02em]" style={{ fontFamily: "var(--font-syne)" }}>
                                    {whyChoose.difference}
                                </blockquote>
                            </figure>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ACROSS THE ESTATE ────────────────────────────── */}
            <section id="aip-across" className="op-band-muted bg-slate-50 border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <div className="container-xl op-sec">
                    <Heading title={across.title} />
                    <div className="op-body grid sm:grid-cols-2 gap-5">
                        {across.cards.map((c, i) => (
                            <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-8 flex flex-col" data-aos="fade-up" data-aos-delay={String((i % 2) * 80)}>
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="op-h3 max-w-[18rem]">{c.title}</h3>
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00B8DB]/10 text-[#00667A] dark:text-[#00B8DB] shrink-0">
                                        <c.icon className="w-6 h-6" aria-hidden="true" />
                                    </span>
                                </div>
                                <div className="mt-3">
                                    {c.paragraphs.map((p, j) => (
                                        <Prose key={j} segments={p} className="text-[0.9844rem]" />
                                    ))}
                                </div>
                                <div className="mt-auto pt-6 flex flex-wrap gap-2">
                                    {(ACROSS_TAGS[c.title] ?? []).map((t) => (
                                        <span key={t} className="rounded-lg border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#111214] px-2.5 py-1 text-[0.75rem] font-medium text-slate-600 dark:text-slate-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── AI-READY ─────────────────────────────────────── */}
            <section id="aip-ready" className="border-b border-slate-900/[0.05] dark:border-white/[0.04] overflow-hidden">
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
                        <div>
                            <Heading title={aiReady.title} />
                            <Paras items={aiReady.paragraphs} className="mt-6" />
                        </div>
                        <div className="relative lg:pl-6" data-aos="fade-up" data-aos-delay="100">
                            <div className="relative rounded-2xl border border-slate-900/[0.1] dark:border-white/[0.1] bg-[#0b0c0e] p-1.5 shadow-[0_40px_80px_-40px_rgba(10,22,40,0.55)]">
                                <div className="relative aspect-[1919/941] rounded-xl overflow-hidden">
                                    <Image src={aiReady.image.src} alt={aiReady.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-contain" />
                                </div>
                            </div>
                            {/* integration points */}
                            <div className="mt-6">
                                <IntegrationHub />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CLOSING ──────────────────────────────────────── */}
            <div className="dark">
                <section className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 items-center">
                            <div data-aos="fade-up">
                                <h2 className="op-h2 op-h2-lg">{closing.title}</h2>
                                <div className="mt-6">
                                    <ClosingChecks />
                                </div>
                                <p className="mt-5 text-[1.1875rem] font-semibold text-white">{closing.body[0]}</p>
                                <div className="mt-4 space-y-3 max-w-[40rem]">
                                    {closing.body.slice(1).map((b) => (
                                        <p key={b} className="text-[1.0156rem] leading-[1.7] text-slate-400">
                                            {b}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch lg:max-w-[18rem] lg:ml-auto w-full" data-aos="fade-up" data-aos-delay="100">
                                <Link href={closing.primary.href} className="hp-btn-primary group">
                                    {closing.primary.label}
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                                <Link href={closing.secondary.href} className="hp-btn-secondary">
                                    {closing.secondary.label}
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── FAQ ──────────────────────────────────────────── */}
            <section id="aip-faq" className="border-b border-slate-900/[0.05] dark:border-white/[0.04]">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faqs.map((f) => ({
                                "@type": "Question",
                                name: f.question,
                                acceptedAnswer: { "@type": "Answer", text: Array.isArray(f.answer) ? f.answer.join(" ") : f.answer },
                            })),
                        }),
                    }}
                />
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
                        <div className="lg:sticky lg:top-40" data-aos="fade-up">
                            <h2 className="op-h2">Frequently Asked Questions About AI PAM Solutions</h2>
                            <div className="mt-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-6">
                                <div className="op-card-title">Have a question that is not here?</div>
                                <p className="mt-2 text-[0.9375rem] text-slate-600 dark:text-slate-400">
                                    Talk to the OmniPriv team about your identities, systems and AI agents.
                                </p>
                                <Link href="/demo" className="mt-5 op-link inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold group">
                                    Request a Demo
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                        <div data-aos="fade-up" data-aos-delay="80">
                            <FaqAccordion items={faqs} idPrefix="aip-faq" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
