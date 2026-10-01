import type { Metadata } from "next";
import {
    ClipboardCheck,
    Clock,
    Eye,
    KeyRound,
    Layers,
    Monitor,
    Network,
    RefreshCw,
    ShieldCheck,
    UserCheck,
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
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /case-studies
 *
 * Rebuilt on the shared section library, and reframed from customer stories
 * to problem patterns.
 *
 * The previous version presented nine anonymous organisations as real
 * customers — "Global Investment Bank", "Regional Health System", "Federal
 * Defense Agency" — each with precise metrics ("68% reduction in privilege
 * account attack surface", "2,400 privileged accounts brought under
 * management", "Zero privilege-related incidents"). None of it was real, and
 * given that no customer is named, none of it was checkable either. It also
 * ran a filter bar that looked interactive but had no handler.
 *
 * This version describes the problem shapes privileged access programmes
 * actually run into and the platform controls that address them. Every
 * capability referenced below comes from app/platform/data.ts. There are no
 * invented customers, no invented percentages, and no implied testimonials.
 */

export const metadata: Metadata = {
    title: {
        absolute: "Privileged Access Patterns | OmniPriv",
    },
    description:
        "The problem patterns privileged access programmes run into — fragmented tooling, standing privilege, stale credentials, unprovable audit trails — and the platform controls that address them.",
};

const hero = {
    badge: "Patterns & Outcomes",
    titleLead: "The problem shape",
    titleAccent: "is always the same.",
    intro: [
        "Privileged access failures rarely come from a missing control. They come from the same six situations, repeated across industries and organisation sizes — a secret nobody owns, a permission nobody removed, a record nobody can vouch for.",
    ] as RichText,
    body: [
        "So this page describes the patterns rather than the customers. Each one below names the situation, and links to the capability module built to resolve it.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "See the Capabilities" },
    image: {
        src: "https://images.unsplash.com/photo-1759310610480-48649b55fbdf?auto=format&fit=crop&w=1200&q=70",
        alt: "Group of colleagues in a business meeting discussing a project",
    },
};

const patternsSection = {
    title: "Patterns, not logos",
    lead: [
        "We do not name customers without written consent, and we do not publish figures we cannot stand behind. What follows is the set of problems — not attributed results from organisations you cannot call to verify.",
    ] as RichText,
};

const patterns: IconCard[] = [
    {
        icon: Layers,
        eyebrow: "Pattern 01",
        title: "The stack nobody chose",
        text: "A vault was bought for secrets, a recorder for sessions, a workflow tool for approvals and a reporting add-on for the audit — each with its own console and its own copy of who can do what.",
        href: "/platform/consolidation",
    },
    {
        icon: Clock,
        eyebrow: "Pattern 02",
        title: "Privilege that never expires",
        text: "Access granted for one incident is still active two years later. Nobody decided to keep it; there was simply never a mechanism that removed it.",
        href: "/platform/workflow-access-control",
    },
    {
        icon: KeyRound,
        eyebrow: "Pattern 03",
        title: "Credentials hiding in plain sight",
        text: "Database passwords in config files, service accounts in scheduled tasks, an IIS App Pool that has used the same secret since install. These are the credentials no rotation policy ever reaches.",
        href: "/platform/password-credential-management",
    },
    {
        icon: ShieldCheck,
        eyebrow: "Pattern 04",
        title: "Logs you cannot vouch for",
        text: "The events exist, but they sit in storage an administrator can edit — so in an investigation or an audit they prove nothing about what happened.",
        href: "/platform/audit-compliance",
    },
    {
        icon: Eye,
        eyebrow: "Pattern 05",
        title: "Sessions nobody can inspect",
        text: "A privileged session ran, the change landed, and the only account of how it happened is the operator's memory several weeks later.",
        href: "/platform/session-management",
    },
    {
        icon: Network,
        eyebrow: "Pattern 06",
        title: "Third parties and automation with standing keys",
        text: "Vendors, CI/CD pipelines and now autonomous agents hold long-lived credentials for systems their operators may never need to touch directly.",
        href: "/platform/enterprise-integration",
    },
];

const reviewSection = {
    icon: ClipboardCheck,
    title: "The review that stops being an argument",
    paragraphs: [
        [
            "Most access reviews are reconstruction work. Somebody assembles a picture from logs, ticket history, emails and memory, and then defends it. When the record is produced by the platform as a side effect of doing the work, the same meeting becomes a matter of reading it out.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1769740333462-9a63bfa914bc?auto=format&fit=crop&w=1200&q=70",
        alt: "Colleagues seated around a conference table reviewing a project together",
    },
    points: [
        "Every privileged action logged with user, time, asset and outcome",
        "Session recordings that are contextual, fully indexed and searchable after the fact",
        "Approvals recorded as evidence rather than reconstructed from an inbox",
        "Audit records held in tamper-proof storage with cryptographic audit-chain hashing",
        "Scheduled reports covering entitlements, user activity and asset inventory",
        "Nine regulatory frameworks mapped out of the box, so a report arrives in the auditor's shape",
    ],
};

const outputSection = {
    title: "What the platform actually produces",
    lead: [
        "Outcomes are only meaningful if something concrete stands behind them. These are the artefacts OmniPriv emits, and they are the same ones an audit asks for.",
    ] as RichText,
};

const outputPillars = [
    {
        icon: Monitor,
        title: "Session recordings",
        text: "Every privileged session is fully monitored and recorded, with high-fidelity playback stored securely under controlled access and indexed for later search — no agent on the target.",
    },
    {
        icon: UserCheck,
        title: "Approval trails",
        text: "4-eyes is enforced: a minimum of two independent approvers, with the requester excluded from the approval path, so no request can be self-approved.",
    },
    {
        icon: ShieldCheck,
        title: "Hash-chained audit records",
        text: "Audit entries are held in tamper-proof storage with cryptographic audit-chain hashing, preserving integrity and non-repudiation rather than merely retaining rows.",
    },
    {
        icon: RefreshCw,
        title: "Rotation events",
        text: "Hard-coded credentials are eliminated from configuration files, databases, registries, Windows Services, scheduled tasks and IIS App Pools, and rotated automatically instead.",
    },
];

const protocols = ["SSH", "RDP", "VNC", "HTTP", "Database"];

const deepDives = [
    { href: "/blog/meridian-bank-case-study", label: "Reading: privileged access in a PCI-DSS programme" },
    { href: "/blog/bank-case-study", label: "Reading: reducing audit preparation effort" },
    { href: "/platform", label: "All nine platform capabilities" },
];

const closing = {
    title: "Start from your pattern, not our template",
    body: [
        "Tell us which of the six situations matches your environment and we will show you the controls that address it — including the ones you would have to give up to get there.",
        "No invented percentages required on either side.",
    ],
    kicker: "Agentless. On-premise. Independently audited.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "Why are there no customer names on this page?",
        answer:
            "Because we do not name customers without their written consent, and we do not publish outcome figures we cannot stand behind. Rather than present unnamed organisations with precise-sounding percentages, this page describes the problem patterns and the platform controls that address them. We are happy to arrange a reference call where one is appropriate and consented to.",
    },
    {
        question: "How long does a deployment take?",
        answer:
            "It is scoped against your environment rather than sold as a fixed number. Because the platform is 100% agentless, there is no software rollout to the machines being protected — which removes the phase that usually dominates a privileged access project. A rollout plan is produced during the architecture review, before any commitment.",
    },
    {
        question: "Where does the platform run?",
        answer:
            "On-premise, on infrastructure you control — VMware, Red Hat and OpenStack, as a hardware-agnostic software appliance. Multi-node clustering, Docker health checks, WebSocket heartbeat, database replication and load balancing are available for high availability.",
    },
    {
        question: "What does a proof-of-concept involve?",
        answer:
            "A 30-minute introductory call, a tailored walkthrough configured for your use cases, an architecture review of your existing infrastructure, and optionally 30 days running OmniPriv in your own environment at no cost with support from our engineering team.",
    },
    {
        question: "Who owns the audit data and the encryption keys?",
        answer:
            "You do, on both counts. Data is encrypted at rest with AES-256-GCM and in transit with TLS 1.3, with an HSM providing root-of-trust key protection. The SECRET_KEY is generated at installation and must be stored externally and independently of the platform. Audit records are hash-chained in tamper-proof storage, so they cannot be altered or deleted — including by an administrator.",
    },
];

export default function CaseStudiesPage() {
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
                <Prose segments={hero.body} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── THE PATTERNS ───────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Problem Patterns"
                        title={patternsSection.title}
                        className="mb-2"
                    >
                        <Prose segments={patternsSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={patterns} columns={3} className="mt-12" />
            </Section>

            {/* ─── THE REVIEW ─────────────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={reviewSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <reviewSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={reviewSection.title}>
                        {reviewSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === reviewSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={reviewSection.points} className="mt-8" />

                    <ArrowLink href="/platform/audit-compliance" className="mt-8">
                        See how the evidence is recorded
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── WHAT THE PLATFORM PRODUCES (dark band) ─────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Concrete Outputs"
                        title={outputSection.title}
                        className="mb-2"
                    >
                        <Prose segments={outputSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {outputPillars.map((pillar) => (
                        <div key={pillar.title}>
                            <div className="icon-wrapper mb-5">
                                <pillar.icon className="w-5 h-5" />
                            </div>

                            <SectionHeading
                                as="h3"
                                size="sm"
                                title={pillar.title}
                                titleClassName="max-w-3xl"
                            >
                                <Prose segments={[pillar.text]} />
                            </SectionHeading>
                        </div>
                    ))}
                </div>

                <div className="mt-14">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                        Session protocols covered
                    </p>
                    <ChipList
                        items={protocols}
                        variant="accent"
                        separator={<span className="text-slate-500 text-sm">·</span>}
                    />
                </div>
            </Section>

            {/* ─── DEEP DIVES ─────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Go deeper"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Two long-form write-ups, plus the full capability set.
                    </p>
                </SectionHeading>

                <div className="grid sm:grid-cols-3 gap-6">
                    {deepDives.map((link) => (
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
                subtitle="Common questions about deployment, evaluation and data ownership."
                items={faqs}
            />
        </>
    );
}
