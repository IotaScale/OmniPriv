import {
    BadgeCheck,
    ClipboardList,
    Eye,
    FileBarChart,
    FileCheck2,
    Fingerprint,
    Globe2,
    HeartPulse,
    Landmark,
    Layers,
    Network,
    ScrollText,
    ShieldAlert,
    ShieldCheck,
    UserCheck,
    Workflow,
    CreditCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface } from "@/lib/styles";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /privileged-access-audit-compliance ("Audit, Governance &
 * Compliance"), rendered by app/privileged-access-audit-compliance/page.tsx.
 * SEO metadata comes from the "audit-compliance" module entry in
 * app/platform/data.ts. The old /platform/audit-compliance URL redirects here
 * (next.config.js).
 *
 * Copy supplied by the marketing team (October 2026). Primary keyword:
 * privileged access management audit.
 */

/* Two columns: heading on the left, copy on the right. */
function SplitText({ title, paragraphs, strongIndex }: { title: string; paragraphs: RichText[]; strongIndex?: number }) {
    return (
        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-8 lg:gap-16">
            <SectionHeading title={title} />
            <div className="space-y-4" data-aos="fade-up">
                {paragraphs.map((p, i) => (
                    <Prose key={i} segments={p} tone={i === strongIndex ? "strong" : "muted"} className="text-[1.0625rem]" />
                ))}
            </div>
        </div>
    );
}

/* ─── Content ────────────────────────────────────────────────────────── */

const hero = {
    titleLead: "Simplify Privileged Access Management",
    titleAccent: "Audit & Compliance",
    paragraphs: [
        [
            "Gain complete visibility into privileged activities, strengthen access governance, and simplify security compliance audits with OmniPriv. Monitor sensitive sessions, track user actions, and maintain reliable audit records across your critical IT infrastructure.",
        ],
        [
            "OmniPriv brings Privileged Access Management, real-time monitoring, and centralized compliance reporting together, helping security teams reduce risks and demonstrate accountability without complex manual processes.",
        ],
    ] as RichText[],
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
    image: {
        src: "/product/compliance.png",
        alt: "OmniPriv compliance reports with framework coverage and control status",
        fit: "contain" as const,
    },
};

const simpler = {
    title: "Make Security Audits Simpler with Centralized Privileged Access Visibility",
    paragraphs: [
        ["Preparing for a security compliance audit shouldn't mean spending days collecting logs, reviewing spreadsheets, and investigating who accessed critical systems."],
        ["As organizations grow, privileged access spreads across servers, databases, cloud platforms, and third-party environments. Without centralized visibility, tracking administrative activity and demonstrating compliance becomes increasingly difficult."],
        ["OmniPriv simplifies the process by bringing privileged access controls, activity records, and audit reporting into one platform. Security and compliance teams can review access history, investigate suspicious actions, and gather relevant evidence with less manual effort."],
        ["Whether preparing for an internal security audit or meeting external regulatory requirements, OmniPriv helps organizations maintain better oversight of privileged operations."],
    ] as RichText[],
};

const strengthen = {
    title: "Strengthen Audit, Governance & Compliance with OmniPriv",
    cards: [
        {
            icon: ClipboardList,
            title: "Privileged Access Management Audit",
            text: "Know exactly who accessed your critical systems, when access occurred, and what actions were performed. OmniPriv maintains detailed, tamper-resistant audit trails that support accountability, incident investigations, and compliance reviews.",
        },
        {
            icon: Eye,
            title: "Privileged Session Monitoring",
            text: "Gain visibility into administrator and vendor sessions through real-time monitoring, secure session recordings, and searchable activity history. Review privileged operations and respond to suspicious behavior before it creates additional risk.",
        },
        {
            icon: UserCheck,
            title: "Privileged Access Governance",
            text: "Bring greater control to privileged permissions with role-based policies, approval workflows, and Just-in-Time access. Limit unnecessary administrative privileges and keep sensitive access aligned with business requirements.",
        },
        {
            icon: FileBarChart,
            title: "Automated Compliance Reporting",
            text: "Reduce manual reporting with centralized audit records and scheduled compliance reports. Give auditors and security stakeholders access to relevant evidence, access history, and policy compliance information.",
        },
        {
            icon: ShieldAlert,
            title: "Security Policy Enforcement",
            text: "Strengthen security controls with credential policies, access restrictions, and alerts for non-compliant privileged accounts. Identify policy violations and address potential security gaps before they become larger problems.",
        },
        {
            icon: ScrollText,
            title: "Centralized Security Audit Logs",
            text: "Maintain a consistent record of privileged activity across connected systems. Bring user actions, access events, and session details into one place to support ongoing monitoring and more effective investigations.",
        },
    ] as IconCard[],
};

const sessions = {
    title: "Monitor Every Privileged Session with Greater Confidence",
    paragraphs: [
        ["Privileged accounts can make significant changes to enterprise systems. Without proper oversight, unauthorized commands, configuration changes, and risky administrative actions may go unnoticed."],
        ["OmniPriv provides privileged session monitoring to help security teams understand what happens during sensitive access sessions."],
        ["From live session visibility to recorded activity and command history, teams can investigate incidents, review administrator actions, and maintain a clearer picture of privileged behavior."],
    ] as RichText[],
    listLead: "Session monitoring capabilities help organizations:",
    points: [
        "Track administrative activity across critical assets.",
        "Record privileged sessions for investigation and review.",
        "Search historical sessions to examine specific actions.",
        "Identify unusual behavior and policy violations.",
        "Terminate suspicious sessions when intervention is necessary.",
    ],
    closing: "With session-level visibility, organizations can improve security accountability while supporting internal audit and compliance requirements.",
    image: {
        src: "/product/dashboard.png",
        alt: "OmniPriv console showing privileged session activity and risk posture",
        fit: "contain" as const,
    },
};

const governance = {
    title: "Take Control of Privileged Access Governance",
    paragraphs: [
        ["Effective privileged access governance requires more than knowing who has administrator permissions. Organizations also need to understand why those permissions are granted, how long they remain active, and whether they follow internal security policies."],
        ["OmniPriv helps security teams establish consistent access controls through role-based permissions, Just-in-Time access, and approval workflows."],
        ["Instead of maintaining unnecessary standing privileges, organizations can provide access for defined tasks and durations. Sensitive operations can require authorization before access is granted, helping reduce the risk of excessive privileges and unauthorized changes."],
        ["By combining least privilege principles with centralized policy enforcement, OmniPriv supports stronger governance without creating unnecessary obstacles for IT operations."],
    ] as RichText[],
};

const dataAudit = {
    title: "Improve Data Security Audit Readiness with Detailed Access Records",
    paragraphs: [
        ["A successful data security audit depends on reliable evidence showing how sensitive systems are accessed, managed, and protected."],
        ["Incomplete logs and uncontrolled privileged credentials can make it difficult to demonstrate whether security policies are being followed."],
        ["OmniPriv helps organizations maintain detailed records of privileged activity, including user identity, access time, target assets, and session actions. Centralized reporting makes it easier to examine privileged access to systems that store or process sensitive business information."],
        ["With searchable session histories and tamper-resistant logs, security teams can identify access patterns, investigate incidents, and provide relevant evidence during audit reviews."],
        ["This visibility supports a more consistent approach to data protection and compliance across enterprise environments."],
    ] as RichText[],
    image: {
        src: "/product/asset.png",
        alt: "OmniPriv asset inventory with privileged accounts and access records",
        fit: "contain" as const,
    },
};

const regulatory = {
    title: "Support Regulatory Compliance with Stronger PAM Controls",
    paragraphs: [
        ["Security regulations and industry standards require organizations to implement appropriate access controls, maintain activity records, and protect sensitive systems."],
        ["OmniPriv helps organizations align privileged access practices with applicable security and compliance frameworks."],
    ] as RichText[],
    cards: [
        {
            icon: BadgeCheck,
            title: "ISO 27001",
            text: "Support information security management requirements with controlled privileged access, access accountability, and traceable security activity.",
        },
        {
            icon: FileCheck2,
            title: "SOC 2",
            text: "Strengthen evidence collection for relevant security and access controls through privileged session records, monitoring, and compliance reporting.",
        },
        {
            icon: CreditCard,
            title: "PCI DSS",
            text: "Help protect systems within the cardholder data environment by restricting administrative access, monitoring sensitive activity, and maintaining access records.",
        },
        {
            icon: HeartPulse,
            title: "HIPAA",
            text: "Support safeguards for systems containing electronic protected health information through controlled administrative permissions and privileged activity auditing.",
        },
        {
            icon: Landmark,
            title: "NIST 800-53",
            text: "Align privileged access practices with access control, audit logging, accountability, and security monitoring control families.",
        },
        {
            icon: Globe2,
            title: "GDPR",
            text: "Support appropriate security measures for systems handling personal data with privileged access restrictions, user accountability, and activity monitoring.",
        },
    ] as IconCard[],
    note: "OmniPriv also provides compliance mappings for frameworks including SOX, Basel II, MAS TRM, and NERC CIP. These capabilities support control implementation and audit evidence collection; regulatory compliance still depends on the organization's wider security program.",
};

const reporting = {
    title: "Reduce Manual Security Audit Work with Automated Reporting",
    paragraphs: [
        ["When audit evidence is stored across multiple systems, preparing reports can consume valuable time and resources."],
        ["OmniPriv simplifies compliance management by centralizing privileged access information and supporting automated report generation."],
        ["Security teams can review account entitlements, privileged activity, asset inventories, and policy compliance information without manually assembling records from disconnected tools."],
        ["Scheduled reports help organizations maintain ongoing visibility into access controls instead of collecting evidence only when an audit approaches."],
        ["This approach reduces administrative effort, improves reporting consistency, and gives security teams more time to address meaningful risks."],
    ] as RichText[],
};

const whyChoose: { title: string; items: { icon: LucideIcon; title: string; text: string }[] } = {
    title: "Why Choose OmniPriv for Audit, Governance & Compliance?",
    items: [
        { icon: Layers, title: "Centralized Privileged Access Visibility", text: "Bring privileged activity, session records, and access information together for easier security oversight." },
        { icon: Fingerprint, title: "Stronger Access Accountability", text: "Maintain traceable records of sensitive administrative actions to support investigations and compliance reviews." },
        { icon: ShieldCheck, title: "Reduced Privileged Access Risk", text: "Apply least privilege, access approvals, and time-limited permissions to minimize unnecessary administrative exposure." },
        { icon: Workflow, title: "Simplified Compliance Operations", text: "Use centralized records, scheduled reports, and regulatory control mappings to streamline recurring audit preparation." },
        { icon: Network, title: "Security Across Hybrid Environments", text: "Maintain consistent privileged access controls and monitoring across connected on-premises, cloud, and hybrid infrastructure." },
    ],
};

const closing = {
    title: "Turn Privileged Access Visibility into Audit Confidence",
    body: [
        "Security audits become easier when privileged activity is continuously monitored, governed, and documented.",
        "With OmniPriv, organizations can move beyond manual log collection and build a more proactive approach to privileged access security. Strengthen accountability, reduce unnecessary access, and keep relevant audit evidence within reach.",
    ],
    kicker: "See how OmniPriv helps your organization simplify privileged access management audit and compliance.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is a privileged access management audit?",
        answer:
            "A privileged access management audit evaluates how an organization controls, monitors, and records access to sensitive systems through privileged accounts. It helps identify excessive permissions, unauthorized activity, security policy gaps, and weaknesses in administrative access controls.",
    },
    {
        question: "How does Privileged Access Management help with security compliance audits?",
        answer:
            "Privileged Access Management helps organizations enforce least privilege, monitor administrative sessions, protect sensitive credentials, and maintain detailed access records. These controls provide supporting evidence for a security compliance audit and improve visibility into activities that may affect regulatory requirements.",
    },
    {
        question: "Why is privileged session monitoring important for compliance?",
        answer:
            "Privileged session monitoring allows security teams to observe and record actions performed during administrative access. These records help establish user accountability, investigate security incidents, and provide evidence of privileged activity during compliance reviews.",
    },
    {
        question: "What is privileged access governance?",
        answer:
            "Privileged access governance refers to the policies and processes used to manage elevated permissions throughout their lifecycle. It includes defining access rights, approving sensitive requests, applying least privilege, and reviewing whether permissions remain appropriate for users and systems.",
    },
    {
        question: "How does OmniPriv support a data security audit?",
        answer:
            "OmniPriv supports a data security audit by maintaining privileged access logs, session recordings, user activity history, and centralized reports for connected systems. This helps organizations review how administrative access to sensitive environments is controlled and documented.",
    },
    {
        question: "Can OmniPriv help automate security audit reporting?",
        answer:
            "Yes. OmniPriv provides centralized audit records and scheduled reporting capabilities covering privileged activities, access entitlements, assets, and compliance information. These features help reduce manual evidence collection and improve audit preparation.",
    },
    {
        question: "Which security compliance standards does OmniPriv support?",
        answer:
            "OmniPriv provides controls and reporting capabilities that help organizations align privileged access practices with frameworks such as ISO 27001, PCI DSS, HIPAA, NIST 800-53, SOX, GDPR, and others. Specific compliance obligations depend on the organization's industry, environment, and applicable regulations.",
    },
    {
        question: "How can organizations improve privileged access audit readiness?",
        answer:
            "Organizations can improve audit readiness by enforcing least privilege, using approval workflows, monitoring privileged sessions, retaining reliable activity logs, and regularly reviewing access permissions. A centralized PAM platform such as OmniPriv makes these practices easier to manage and document.",
    },
];

/* ─── Page ───────────────────────────────────────────────────────────── */

export default function AuditCompliancePage() {
    return (
        <>
            <SplitHero
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                {hero.paragraphs.map((p, i) => (
                    <Prose key={i} segments={p} className="text-[1.0625rem]" />
                ))}
            </SplitHero>

            {/* ─── SIMPLER AUDITS ───────────────────── */}
            <Section tone="muted" border="bottom">
                <SplitText title={simpler.title} paragraphs={simpler.paragraphs} />
            </Section>

            {/* ─── SIX CAPABILITIES ─────────────────── */}
            <Section border="bottom">
                <SectionHeading title={strengthen.title} />
                <IconCardGrid items={strengthen.cards} columns={3} className="mt-12" />
            </Section>

            {/* ─── SESSION MONITORING ───────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit
                    media={sessions.image}
                    ratio="wide-last"
                    align="start"
                    heading={<SectionHeading title={sessions.title} />}
                >
                    <div className="op-hero-copy space-y-4">
                        {sessions.paragraphs.map((p, i) => (
                            <Prose key={i} segments={p} />
                        ))}
                    </div>
                    <Prose segments={[sessions.listLead]} tone="strong" className="mt-6" />
                    <CheckList items={sessions.points} className="mt-4" />
                    <Prose segments={[sessions.closing]} className="mt-6" />
                </MediaSplit>
            </Section>

            {/* ─── GOVERNANCE (dark band) ───────────── */}
            <Section tone="dark" border="bottom">
                <SplitText title={governance.title} paragraphs={governance.paragraphs} />
            </Section>

            {/* ─── DATA SECURITY AUDIT ──────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={dataAudit.image}
                    ratio="wide-last"
                    align="start"
                    heading={<SectionHeading title={dataAudit.title} />}
                >
                    <div className="op-hero-copy space-y-4">
                        {dataAudit.paragraphs.map((p, i) => (
                            <Prose key={i} segments={p} />
                        ))}
                    </div>
                </MediaSplit>
            </Section>

            {/* ─── FRAMEWORKS ───────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={regulatory.title}>
                    {regulatory.paragraphs.map((p, i) => (
                        <Prose key={i} segments={p} />
                    ))}
                </SectionHeading>
                <IconCardGrid items={regulatory.cards} columns={3} className="mt-12" />
                <p
                    className="mt-8 max-w-4xl text-[0.9375rem] leading-[1.7] text-slate-600 dark:text-slate-400"
                    data-aos="fade-up"
                >
                    {regulatory.note}
                </p>
            </Section>

            {/* ─── AUTOMATED REPORTING ──────────────── */}
            <Section border="bottom">
                <SplitText title={reporting.title} paragraphs={reporting.paragraphs} />
            </Section>

            {/* ─── WHY OMNIPRIV ─────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={whyChoose.title} />
                {/* 3 + 2: the first row in thirds, the second in halves, so five cards leave no hole. */}
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6" data-aos="fade-up">
                    {whyChoose.items.map((item, i) => (
                        <div
                            key={item.title}
                            className={cn(
                                "flex flex-col rounded-2xl border p-6",
                                cardBorder,
                                cardSurface,
                                i < 3 ? "lg:col-span-2" : "lg:col-span-3",
                                i === 4 && "sm:col-span-2 lg:col-span-3"
                            )}
                        >
                            <div className="icon-wrapper mb-5">
                                <item.icon className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <h3 className="op-card-title mb-2">{item.title}</h3>
                            <p className="op-card-text">{item.text}</p>
                        </div>
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
            <FaqSection title="Frequently Asked Questions About Audit, Governance & Compliance" items={faqs} />
        </>
    );
}
