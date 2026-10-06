import {
    Activity,
    ArrowRight,
    ClipboardCheck,
    Clock,
    Eye,
    Fingerprint,
    Key,
    KeyRound,
    Monitor,
    ScanSearch,
    ShieldCheck,
    Timer,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import ChipList from "@/components/sections/ChipList";
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
 * Bespoke layout for /platform/secure-remote-access — the destination of the
 * "Remote Access / Secure remote & hybrid access" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. SEO metadata continues to come from the module
 * entry in app/platform/data.ts. The former /platform/session-management URL
 * 301s here (see next.config.js).
 *
 * Claims here are limited to what this repository already states: the
 * protocol and asset coverage in app/features/page.tsx and app/platform/data.ts,
 * the no-inbound-port model, 4-eyes approval, and the
 * 9 mapped regulatory standards.
 */

const hero = {
    badge: "Secure Remote & Hybrid Access",
    titleLead: "Secure Remote Access for",
    titleAccent: "Your Modern Workforce",
    intro: [
        "Remote administrators, engineers, employees, contractors, and vendors need fast access to critical systems wherever they work. But traditional remote connectivity can create unnecessary exposure when privileged credentials, permanent permissions, or direct connections are left uncontrolled.",
    ] as RichText,
    body: [
        "OmniPriv provides secure remote access through an enterprise ",
        { text: "PAM solution", href: "/" },
        " built around identity verification, least privilege, Just-in-Time access, credential protection, and complete session visibility.",
    ] as RichText,
    kicker: [
        "Give authorized users access to the systems they need — without giving them unrestricted privilege.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/features", label: "Browse All Capabilities" },
    image: {
        src: "/challenges/secure-remote-hybrid-access.jpeg",
        alt: "Secure remote access illustration showing verified identities, governed privileged sessions and audited access to enterprise systems",
    },
};

const surfaceSection = {
    title: "Secure Remote Access Without Expanding Your Attack Surface",
    paragraphs: [
        [
            "Remote work changes where access happens, but it should not change how privileged access is controlled.",
        ],
        [
            "OmniPriv provides access to RDP, SSH, databases, and other enterprise resources from remote locations. Connections are brokered through the platform rather than by exposing target systems directly to the internet.",
        ],
        [
            "Every privileged request can be authenticated, authorized, logged, and governed through centralized PAM controls.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure remote access dashboard on a laptop, showing a remote worker reaching enterprise systems without expanding the attack surface",
    },
};

const zeroTrustSection = {
    title: "Privileged Remote Access with Zero Trust Control",
    subheading: "Verify Every Remote Identity",
    lead: [
        "A remote connection should never be trusted simply because a user has valid credentials.",
    ] as RichText,
    body: [
        "OmniPriv applies strong identity assurance with MFA, enterprise SSO integrations, contextual risk controls, and least-privilege enforcement for privileged sessions. This gives organizations stronger privileged remote access for:",
    ] as RichText,
    personas: [
        "IT administrators",
        "Engineers and DevOps teams",
        "Remote employees",
        "Contractors",
        "Service providers",
        "Third-party vendors",
    ],
    note: ["Users receive only the permissions required for an approved task."] as RichText,
};

const jitSection = {
    title: "Replace Permanent Privileges with JIT Access",
    paragraphs: [
        ["Remote users do not need administrator rights active all day."],
        [
            "OmniPriv uses Just-in-Time access to provide temporary, purpose-specific privileges that expire automatically. This reduces standing access and helps limit the privilege available if an identity becomes compromised. For a secure remote workforce, the access model becomes:",
        ],
    ] as RichText[],
    flow: ["Verify", "Approve", "Grant", "Monitor", "Revoke"],
    note: [
        "Instead of permanent trust, privilege exists only when it is needed.",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1688380692117-63178554d76d?auto=format&fit=crop&w=1200&q=70",
        alt: "Secure remote access workflow requesting just-in-time privileged access for an approved task",
    },
};

const credentialsSection = {
    title: "Protect Credentials During Remote Access",
    paragraphs: [
        [
            "Passwords, SSH keys, and administrative credentials should not be unnecessarily exposed to remote users.",
        ],
        [
            "OmniPriv combines encrypted credential vaulting with automated credential lifecycle management so organizations can control sensitive secrets centrally rather than sharing privileged passwords between employees, administrators, and vendors. Its platform includes ",
            { text: "credential vaulting and automated credential management", href: "/platform" },
            " as core PAM capabilities. This helps reduce risks associated with:",
        ],
    ] as RichText[],
    risks: [
        "Shared admin passwords",
        "Long-lived credentials",
        "Credential reuse",
        "Uncontrolled third-party access",
        "Manually distributed privileged secrets",
    ],
};

const monitorSection = {
    title: "Monitor Every Privileged Remote Session",
    paragraphs: [
        ["Secure access does not end when a user signs in."],
        [
            "OmniPriv gives security teams visibility into active privileged sessions and supports session recording, searchable activity, command-level context, and centralized investigation of privileged activity. The platform supports protocols and resources including SSH, RDP, VNC, Kubernetes, databases, web applications, and cloud environments.",
        ],
    ] as RichText[],
    flowLabel: "With privileged remote access, security teams can understand",
    flow: [
        "Who connected",
        "What they accessed",
        "What they did",
        "When it happened",
        "Whether intervention was required",
    ],
    note: [
        "This provides greater accountability for administrators, contractors, and remote support teams.",
    ] as RichText,
};

const workforceSection = {
    title: "Build a Secure Remote Workforce Without Slowing Productivity",
    paragraphs: [
        [
            "A ",
            { text: "secure remote workforce", href: "/solutions/human-identity-security" },
            " needs both security and usability.",
        ],
        [
            "Requiring employees and engineers to work through fragmented VPNs, shared credentials, separate access tools, and manual approvals can slow legitimate work while still leaving security gaps.",
        ],
        [
            "OmniPriv centralizes identity verification, JIT privilege, credential protection, remote sessions, policy enforcement, and auditability in one PAM solution. Its ",
            { text: "identity-security model", href: "/platform/identity-security" },
            " covers human, machine, vendor, and AI identities through a common authorization and audit framework.",
        ],
    ] as RichText[],
};

const vendorSection = {
    title: "Secure Vendor and Third-Party Remote Access",
    lead: [
        "Vendors often need legitimate access to sensitive infrastructure — but that should not require permanent accounts or unrestricted network access. OmniPriv helps organizations control third-party access using:",
    ] as RichText,
    image: {
        src: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=70",
        alt: "Authorisation document being signed and reviewed, representing approval workflows for secure vendor remote access",
    },
};

const vendorControls: IconCard[] = [
    {
        icon: Fingerprint,
        title: "MFA & Identity Verification",
        text: "Confirm who is requesting access.",
    },
    {
        icon: ClipboardCheck,
        title: "Approval Workflows",
        text: "Require authorization before sensitive access begins.",
    },
    {
        icon: Clock,
        title: "Time-Limited Privileges",
        text: "Provide access only for the approved period.",
    },
    {
        icon: Key,
        title: "Credential Protection",
        text: "Reduce direct exposure to privileged secrets.",
    },
    {
        icon: Activity,
        title: "Session Monitoring",
        text: "Maintain visibility into vendor activity.",
    },
];

const solutionsSection = {
    title: "OmniPriv Remote Access Security Solutions",
    lead: [
        "OmniPriv remote access security solutions combine enterprise PAM controls with an architecture designed for cloud, on-premises, database, and hybrid environments.",
    ] as RichText,
};

const solutionCapabilities: IconCard[] = [
    {
        icon: Monitor,
        title: "Brokered Remote Access",
        text: "Enable privileged SSH, RDP, and database access from any location, brokered through the platform.",
    },
    {
        icon: Timer,
        title: "Just-in-Time Privileges",
        text: "Replace unnecessary standing access with time-limited permissions.",
    },
    {
        icon: ShieldCheck,
        title: "MFA & Zero Trust",
        text: "Authenticate and authorize every privileged session instead of trusting network location.",
    },
    {
        icon: KeyRound,
        title: "Credential Protection",
        text: "Vault and manage privileged credentials instead of exposing administrative secrets.",
    },
    {
        icon: Eye,
        title: "Session Visibility",
        text: "Monitor privileged activity and maintain searchable evidence.",
    },
    {
        icon: ScanSearch,
        title: "Intelligent Threat Detection",
        text: "Identify suspicious behavior and privileged-access anomalies before they become larger incidents.",
    },
];

const stats = [
    { value: "16", label: "Protocols and platforms", sub: "SSH through Kubernetes" },
    { value: "0", label: "Standing privileges", sub: "Access expires with the task" },
    { value: "100%", label: "Credential vault encryption", sub: "Encrypted at rest and in transit" },
    { value: "6", label: "Regulatory standards mapped", sub: "SOC 2 through SOX 404" },
];

const keepReading = [
    { href: "/features", label: "See the full capability list" },
    { href: "/integrations", label: "Check directory and ITSM integrations" },
    { href: "/security", label: "Security architecture and certifications" },
];

const closing = {
    title: "Secure Remote Access with OmniPriv PAM",
    body: [
        "Remote work should not mean weaker privileged-access controls.",
        "OmniPriv brings secure remote access, identity verification, JIT privileges, credential protection, session security, and centralized auditing together in one enterprise PAM solution.",
        "Whether users connect from the office, home, another country, or a third-party environment, privileged access remains governed by the same security policies.",
    ],
    kicker: "Give people access to what they need — not permanent access to everything.",
    primary: { href: "/demo", label: "Request an OmniPriv Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is secure remote access?",
        answer:
            "Secure remote access allows authorized users to connect to enterprise systems from outside the traditional network while applying authentication, authorization, least privilege, monitoring, and security policies.",
    },
    {
        question: "What is privileged remote access?",
        answer:
            "Privileged remote access specifically protects remote connections to sensitive systems such as servers, databases, cloud infrastructure, and administrative applications where elevated permissions are required.",
    },
    {
        question: "How does OmniPriv secure remote users?",
        answer:
            "OmniPriv combines MFA, policy-based authorization, JIT access, credential protection, a brokered proxy architecture, and privileged-session visibility to control remote access to sensitive resources.",
    },
    {
        question: "Does OmniPriv support remote SSH and RDP access?",
        answer:
            "Yes. OmniPriv lists SSH, RDP, VNC, database, Kubernetes, web-application, and cloud access among its supported protocols and asset types.",
    },
    {
        question: "How does PAM help secure a remote workforce?",
        answer:
            "A PAM platform reduces remote-access risk by verifying identities, applying least privilege, securing privileged credentials, limiting access duration, and monitoring sensitive sessions.",
    },
    {
        question: "Can OmniPriv secure vendor remote access?",
        answer:
            "Yes. OmniPriv's identity model includes vendor and third-party identities, with policy controls designed to give external users access for defined work and revoke it when that access is no longer required.",
    },
];

export default function SecureRemoteAccessPage() {
    return (
        <>
            <SplitHero
                badge={hero.badge}
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
                ratio="wide-last"
                height="video"
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-5" />
                <Prose segments={hero.kicker} tone="kicker" className="mb-8" />
            </SplitHero>

            {/* ─── ATTACK SURFACE ───────────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit media={surfaceSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={surfaceSection.title}>
                        {surfaceSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === surfaceSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </MediaSplit>
            </Section>

            {/* ─── ZERO TRUST CONTROL ───────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={zeroTrustSection.title} />

                    <SectionHeading
                        as="h3"
                        size="sm"
                        title={zeroTrustSection.subheading}
                        className="mt-10 mb-4"
                    >
                        <Prose segments={zeroTrustSection.lead} className="mb-4" />
                        <Prose segments={zeroTrustSection.body} />
                    </SectionHeading>

                    <CheckList items={zeroTrustSection.personas} className="mt-6" />

                    <Prose segments={zeroTrustSection.note} className="mt-8" />
                </div>
            </Section>

            {/* ─── JUST-IN-TIME ACCESS ──────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit media={jitSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={jitSection.title}>
                        <Prose segments={jitSection.paragraphs[0]} className="mb-4" />
                        <Prose segments={jitSection.paragraphs[1]} />
                    </SectionHeading>

                    <ChipList
                        items={jitSection.flow}
                        variant="accent"
                        separator={<ArrowRight className="h-4 w-4 text-[#00B8FF]" />}
                        className="mt-8"
                    />

                    <Prose segments={jitSection.note} className="mt-8" />
                </MediaSplit>
            </Section>

            {/* ─── CREDENTIALS ──────────────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={{
                        src: "https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?auto=format&fit=crop&w=1200&q=70",
                        alt: "Secure remote access protecting privileged credentials inside an encrypted vault",
                    }}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                >
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

                    <CheckList items={credentialsSection.risks} className="mt-8" />
                </MediaSplit>
            </Section>

            {/* ─── SESSION MONITORING ─────────────────
                Hardcoded dark band. `tone="dark"` also wraps the section in a
                `.dark` ancestor, which is what switches the `Prose` body copy and
                the ChipList chips to their dark palette while the site is in
                light mode. Sitting between two light bands keeps the rhythm. */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={monitorSection.title}>
                        <Prose segments={monitorSection.paragraphs[0]} className="mb-4" />
                        <Prose segments={monitorSection.paragraphs[1]} />
                    </SectionHeading>

                    <div className="mt-10 mb-4 text-xs font-mono font-semibold uppercase tracking-[0.14em] text-[#00B8FF]">
                        {monitorSection.flowLabel}
                    </div>

                    <ChipList
                        items={monitorSection.flow}
                        variant="accent"
                        separator={<ArrowRight className="h-4 w-4 text-[#00B8FF]" />}
                    />

                    <Prose segments={monitorSection.note} className="mt-8" />
                </div>
            </Section>

            {/* ─── THE WORKFORCE ────────────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={workforceSection.title}>
                        {workforceSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === workforceSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>
            </Section>

            {/* ─── VENDORS ──────────────────────────── */}
            <Section tone="muted" border="bottom">
                <MediaSplit media={vendorSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={vendorSection.title}>
                        <Prose segments={vendorSection.lead} />
                    </SectionHeading>
                </MediaSplit>

                <IconCardGrid items={vendorControls} columns={3} className="mt-12" />
            </Section>

            {/* ─── REMOTE ACCESS SECURITY SOLUTIONS (dark band) ── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={solutionsSection.title}>
                        <Prose segments={solutionsSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={solutionCapabilities} columns={3} className="mt-12" />
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Secure remote access you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a policy document. These are the controls standing behind remote access.
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
                subtitle="Common questions about secure remote access, privileged remote access and controlling third-party access."
                items={faqs}
            />
        </>
    );
}
