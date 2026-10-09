import type { Metadata } from "next";
import {
    Activity,
    Bot,
    Boxes,
    Building2,
    Cloud,
    Database,
    Eye,
    FileSearch,
    GitBranch,
    KeyRound,
    Layers,
    Lock,
    ScanSearch,
    Server,
    ShieldCheck,
    Sparkles,
    Timer,
    UserCheck,
    Users,
    Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { RichText } from "@/lib/rich-text";

/*
 * /ai-pam: AI PAM and privileged access management.
 *
 * Copy supplied by the marketing team (October 2026), including its inline
 * links. Laid out on the interior-page pattern: SplitHero, alternating muted
 * and default bands, exactly one dark band, media splits, a closing band and
 * the FAQ.
 */

export const metadata: Metadata = {
    // Absolute: the root layout's "%s | OmniPriv" template would repeat the brand.
    title: { absolute: "AI PAM & Privileged Access Management | OmniPriv" },
    description:
        "Secure human, machine and AI identities with OmniPriv AI PAM solution. Enforce JIT access, protect credentials and detect privileged threats in real time.",
};

/* ─── Card grid with rich paragraphs (inline links allowed) ─────────── */

interface RichCard {
    icon: LucideIcon;
    title: string;
    paragraphs: RichText[];
}

const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

function RichCardGrid({
    items,
    columns = 3,
    className,
    extra,
}: {
    items: RichCard[];
    columns?: keyof typeof gridCols;
    className?: string;
    /** Rendered as the last cell, e.g. a summary that fills an empty slot. */
    extra?: React.ReactNode;
}) {
    return (
        <div className={cn("grid gap-5", gridCols[columns], className)} data-aos="fade-up">
            {items.map((item) => (
                <div
                    key={item.title}
                    className={cn("flex flex-col rounded-2xl border p-6", cardBorder, cardSurface)}
                >
                    <div className="icon-wrapper mb-5">
                        <item.icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="op-card-title mb-2">{item.title}</h3>
                    <div className="space-y-3">
                        {item.paragraphs.map((p, i) => (
                            <Prose key={i} segments={p} className="text-[0.9375rem]" />
                        ))}
                    </div>
                </div>
            ))}
            {extra}
        </div>
    );
}

/* ─── Content ────────────────────────────────────────────────────────── */

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
            icon: Users,
            title: "Human Identity Security",
            paragraphs: [
                ["Protect administrators, developers, employees, and contractors with multi-factor authentication, role-based permissions, JIT privileges, and monitored sessions."],
                ["OmniPriv helps organizations provide legitimate access while reducing unnecessary standing administrative permissions."],
            ],
        },
        {
            icon: Bot,
            title: "AI Agent Security",
            paragraphs: [
                [
                    { text: "AI agents", href: "https://omnipriv.com/platform/secure-ai-agents-omnipriv" },
                    " can interact with databases, enterprise applications, APIs, and automation tools. Without clear authorization boundaries, these interactions can create new paths to sensitive information.",
                ],
                ["OmniPriv supports agent-specific identities, scoped permissions, tool-level authorization, human approval for sensitive actions, and auditable activity. This enables businesses to adopt agentic AI without granting unrestricted privileged access."],
            ],
        },
        {
            icon: Server,
            title: "Machine Identity Security",
            paragraphs: [
                ["Machine identities, including service accounts, workloads, and applications, often operate without direct human supervision."],
                ["OmniPriv helps protect their credentials through centralized management, automated rotation, short-lived secrets, and policy-based privileged controls across supported cloud and DevOps environments."],
            ],
        },
        {
            icon: UserCheck,
            title: "Third-Party and Vendor Access",
            paragraphs: [
                ["External vendors sometimes require administrative access to perform maintenance, troubleshoot infrastructure, or deliver technical support."],
                ["OmniPriv enables time-limited, policy-controlled privileged access with session recording and accountability, reducing the risks associated with unmanaged vendor credentials."],
            ],
        },
    ] as RichCard[],
};

const capabilities = {
    title: "AI-Powered Privileged Access Management Software: Core Capabilities",
    lead: ["OmniPriv combines essential privileged access management software capabilities with intelligent security controls to support modern enterprise environments."] as RichText,
    cards: [
        {
            icon: Timer,
            title: "Just-in-Time Access and Zero Standing Privileges",
            paragraphs: [
                ["Permanent administrative permissions increase exposure when credentials are stolen or accounts are compromised."],
                ["OmniPriv enables JIT access that grants approved privileges for a defined period and removes them after the authorized window expires. Least-privilege policies help ensure users and automated identities receive only the access required for their tasks."],
            ],
        },
        {
            icon: KeyRound,
            title: "Intelligent Credential and Secrets Management",
            paragraphs: [
                ["Privileged passwords, SSH keys, API tokens, and service-account credentials require protection throughout their lifecycle."],
                ["OmniPriv provides an encrypted credential vault, automated credential rotation, and integration with dynamic secrets. This reduces dependence on hardcoded credentials and helps prevent unnecessary exposure of sensitive authentication information."],
            ],
        },
        {
            icon: Bot,
            title: "AI Agent Governance and Access Control",
            paragraphs: [
                ["Autonomous systems should not inherit unrestricted permissions from human accounts."],
                ["OmniPriv applies identity-specific policies, tool allowlists, access scoping, and approval requirements to supported AI-agent workflows. High-risk actions can require human authorization before execution, helping security teams maintain control over sensitive operations."],
            ],
        },
        {
            icon: Eye,
            title: "Privileged Session Monitoring and Recording",
            paragraphs: [
                ["A successful login should never mark the end of security oversight."],
                ["OmniPriv records and monitors supported SSH, RDP, VNC, HTTP, and database sessions. Searchable activity histories, command-level restrictions, and session intervention capabilities help teams investigate suspicious behavior and maintain accountability."],
            ],
        },
        {
            icon: Activity,
            title: "AI-Powered Behavioral Threat Detection",
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
            paragraphs: [
                ["Security teams need reliable records of privileged activity for internal oversight and regulatory audits."],
                ["OmniPriv brings access approvals, activity logs, session records, and reporting into a centralized governance framework. Organizations can collect evidence, investigate access events, and support compliance requirements without relying entirely on disconnected manual processes."],
            ],
        },
    ] as RichCard[],
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
            title: "Detect Suspicious Activity with Machine Learning",
            paragraphs: [
                ["The OmniPriv AI-PAM engine evaluates privileged-session behavior using 39 behavioral features. Its threat detection controls help identify suspicious commands, credential harvesting, lateral movement indicators, and other abnormal privileged operations."],
            ],
        },
        {
            icon: Lock,
            title: "Govern AI Agents Before They Act",
            paragraphs: [
                ["For supported Model Context Protocol (MCP) workflows, OmniPriv can verify agent identity, restrict available tools, enforce data-access boundaries, and require approval for sensitive actions."],
            ],
        },
        {
            icon: ShieldCheck,
            title: "Respond and Maintain Accountability",
            paragraphs: [
                ["When predefined risk conditions are detected, the platform can generate alerts, restrict activity, or terminate affected sessions. Detailed audit records help security teams understand why an access decision was made and what happened afterward."],
            ],
        },
    ] as RichCard[],
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

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function AiPamPage() {
    return (
        <>
            <SplitHero
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                <Prose segments={hero.tagline} tone="kicker" className="text-lg" />
                {hero.paragraphs.map((p, i) => (
                    <Prose key={i} segments={p} className="text-[1.0625rem]" />
                ))}
            </SplitHero>

            {/* ─── WHY PAM NEEDS TO EVOLVE ───────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-16">
                    <SectionHeading title={evolve.title} />
                    <div className="space-y-4" data-aos="fade-up">
                        {evolve.paragraphs.map((p, i) => (
                            <Prose
                                key={i}
                                segments={p}
                                tone={i === 2 ? "strong" : "muted"}
                                className="text-[1.0625rem]"
                            />
                        ))}
                    </div>
                </div>
            </Section>

            {/* ─── WHAT IS AI PAM ────────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={whatIs.image}
                    ratio="even"
                    align="start"
                    heading={<SectionHeading title={whatIs.title} />}
                >
                    <div className="op-hero-copy space-y-4">
                        {whatIs.paragraphs.map((p, i) => (
                            <Prose key={i} segments={p} />
                        ))}
                        <Prose segments={[whatIs.kicker]} tone="kicker" />
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── EVERY IDENTITY ────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={identities.title} className="mb-2">
                    <Prose segments={identities.lead} />
                </SectionHeading>
                <RichCardGrid items={identities.cards} columns={2} className="mt-12" />
            </Section>

            {/* ─── CORE CAPABILITIES ─────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading title={capabilities.title} className="mb-2">
                    <Prose segments={capabilities.lead} />
                </SectionHeading>
                <RichCardGrid items={capabilities.cards} columns={3} className="mt-12" />
            </Section>

            {/* ─── THE ENGINE (dark band) ────────────────────────── */}
            <Section tone="dark" border="bottom">
                <SectionHeading title={engine.title} className="mb-2">
                    {engine.paragraphs.map((p, i) => (
                        <Prose key={i} segments={p} />
                    ))}
                </SectionHeading>
                <RichCardGrid items={engine.cards} columns={3} className="mt-12" />
            </Section>

            {/* ─── WHY CHOOSE OMNIPRIV ───────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={whyChoose.title} className="mb-2">
                    {whyChoose.paragraphs.map((p, i) => (
                        <Prose key={i} segments={p} />
                    ))}
                </SectionHeading>
                <RichCardGrid
                    items={whyChoose.cards}
                    columns={3}
                    className="mt-12"
                    extra={
                        <div className="flex flex-col justify-center rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] p-6">
                            <div className="icon-wrapper mb-5">
                                <Building2 className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <h3 className="op-card-title mb-2">The OmniPriv difference</h3>
                            <p className="text-[1.0625rem] leading-[1.6] font-semibold text-[#0a1628] dark:text-white">
                                {whyChoose.difference}
                            </p>
                        </div>
                    }
                />
            </Section>

            {/* ─── ACROSS THE ESTATE ─────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading title={across.title} className="mb-2" />
                <RichCardGrid items={across.cards} columns={4} className="mt-10" />
            </Section>

            {/* ─── AI-READY ──────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit
                    media={aiReady.image}
                    ratio="wide-last"
                    align="start"
                    heading={<SectionHeading title={aiReady.title} />}
                >
                    <div className="op-hero-copy space-y-4">
                        {aiReady.paragraphs.map((p, i) => (
                            <Prose key={i} segments={p} />
                        ))}
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── CLOSING ───────────────────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ───────────────────────────────────────────── */}
            <FaqSection title="Frequently Asked Questions About AI PAM Solutions" items={faqs} />
        </>
    );
}
