import {
    Clock,
    Key,
    Layers,
    Lock,
    Network,
    Shield,
    Smartphone,
    Users,
    Zap,
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
 * Bespoke layout for /platform/workflow-access-control — the destination of
 * "Workflow & Access Control" in the platform dropdown.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic template when the slug appears in its
 * `bespokePages` map.
 *
 * All nine features from ../data.ts are represented: the 4-eyes approval
 * principle with no self-approval, mobile and email approvals, multi-level
 * flexible workflows, time-based workflow conditions, temporary privileged
 * account assignment with ACL auto-revert, application credential management
 * across config files / databases / registries / Windows Services /
 * scheduled tasks / IIS App Pools, zero-latency credential handling,
 * application authentication and protection, and the API rate and access
 * controls (RPS, IP/CIDR allowlist, time limit, usage limit).
 */

const hero = {
    badge: "Workflow & Access Control",
    titleLead: "Nobody approves",
    titleAccent: "their own access.",
    intro: [
        "The 4-eyes principle is the floor here, not a feature. A minimum of two independent approvers is required before privileged access is granted, and no user can approve their own request.",
    ] as RichText,
    body: [
        "From that starting point the workflow bends to how your organisation actually approves — multi-level chains, decisions made from a phone or an email link, and rules that change with the time of day — while privileged accounts are handed out with an expiry date attached.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/audit-compliance", label: "See the Audit Trail" },
    image: {
        src: "https://images.unsplash.com/photo-1646066490241-d386dbb63539?auto=format&fit=crop&w=1200&q=70",
        alt: "Group of colleagues seated around a wooden table in a working session",
    },
};

const approvalSection = {
    title: "Approval, not assumption",
    lead: [
        "Approval is a step the platform enforces, not a convention teams are trusted to follow voluntarily.",
    ] as RichText,
};

const approvalCards: IconCard[] = [
    {
        icon: Users,
        eyebrow: "4-Eyes",
        title: "Two independent approvers, minimum",
        text: "Access is granted only once a minimum of two independent approvers sign off. The requester is excluded from the approval path by design, so a privileged request can never be self-approved.",
    },
    {
        icon: Smartphone,
        eyebrow: "Anywhere",
        title: "Approvals from mobile or email",
        text: "Requests, approvals and credential retrieval all work from a mobile device. Approvers can act through the web GUI, a mobile client, or an email link directly — no login into the console required.",
    },
    {
        icon: Layers,
        eyebrow: "Multi-level",
        title: "Chains that finish each step",
        text: "Approval chains are configurable and multi-level, with multiple approvers supported at each step. Every level has to complete before the request progresses, so no stage can be short-circuited.",
    },
];

const expirySection = {
    icon: Clock,
    title: "Privilege with an expiry date",
    paragraphs: [
        [
            "Standing privilege is the thing most organisations regret. OmniPriv grants account authorisation for a defined timeframe and a specific target asset, which turns revocation from an administrative task into an automatic consequence.",
        ],
        [
            "Because the entitlement is expressed as an ACL-based mapping rather than a note on a ticket, expiry is enforced in permissions — the account reverts to its standard restricted state the moment the window closes.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&w=1200&q=70",
        alt: "Colleague signing an authorisation document while a second person reviews the paperwork",
    },
    points: [
        "Account authorisation scoped to a specific timeframe and a specific target asset",
        "ACL-based mapping, so the entitlement is enforced in permissions rather than described in text",
        "Automatic reversion to the standard restricted account when the window expires",
        "Workflows, policies and approval rules that respond to time-of-day and calendar-based conditions",
    ],
};

const applicationSection = {
    title: "Credentials that stop living in config files",
    lead: [
        "Hard-coded application passwords are the ones no rotation policy ever reaches. OmniPriv takes them out of the places they hide and rotates what replaces them.",
    ] as RichText,
};

const applicationPillars = [
    {
        icon: Key,
        title: "Application credential management",
        text: "Hard-coded credentials are eliminated from configuration files, databases, registries, Windows Services, scheduled tasks and IIS App Pools, with automated rotation replacing manual change windows.",
    },
    {
        icon: Zap,
        title: "Zero-latency retrieval",
        text: "Critical applications retrieve credentials without added latency and without relying on a remote repository, so removing hard-coded secrets does not cost performance.",
    },
    {
        icon: Shield,
        title: "Applications are authenticated too",
        text: "Every application that requests credentials is authenticated, and protected against unauthorised changes — so the credential cannot be intercepted by tampering with the caller.",
    },
    {
        icon: Network,
        title: "API rate and access controls",
        text: "Application token requests can be constrained by an RPS limiter, a client IP or CIDR allowlist, a time limit and a usage limit, applied to every request rather than sampled.",
    },
];

const credentialTargets = [
    "Config files",
    "Databases",
    "Registries",
    "Windows Services",
    "Scheduled tasks",
    "IIS App Pools",
];

const apiControls = [
    "RPS limiter",
    "Client IP / CIDR allowlist",
    "Time limit",
    "Usage limit",
];

const stats = [
    { value: "2", label: "Independent approvers, minimum", sub: "4-eyes enforced on every request" },
    { value: "0", label: "Self-approvals possible", sub: "Requester excluded from the chain" },
    { value: "6", label: "Credential locations cleaned", sub: "Config files to IIS App Pools" },
    { value: "4", label: "API access controls", sub: "RPS, IP/CIDR, time and usage limits" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/password-credential-management", label: "How vaulting and rotation work" },
    { href: "/platform/audit-compliance", label: "Where approvals are recorded" },
];

const closing = {
    title: "Put two approvers between the request and the credential",
    body: [
        "Approved by two independent people, granted for a defined window, then reverted automatically — with application secrets rotated instead of hard-coded.",
        "We will walk through the approval model and the temporary assignment rules against your environment.",
    ],
    kicker: "Approved by two. Granted for a window. Reverted on expiry.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/audit-compliance", label: "Audit & Compliance" },
};

const faqs: FaqEntry[] = [
    {
        question: "How does the 4-eyes approval principle work in practice?",
        answer:
            "Access is granted only after a minimum of two independent approvers have signed off, and no user can approve their own privileged access request. The requester is kept out of the approval path entirely, so the separation of duties is structural rather than something the system merely discourages.",
    },
    {
        question: "Can approvers act from a phone or from an email?",
        answer:
            "Yes. Privileged access requests, approvals and credential retrieval are all supported from mobile devices, and an approver can act through the web GUI, a mobile client, or an email link without logging into anything. That matters because an approval queue that only works at a desk becomes the bottleneck that gets bypassed.",
    },
    {
        question: "What does a multi-level workflow look like?",
        answer:
            "Approval chains are configurable and can run several levels deep, with more than one approver permitted at each step. Each level has to complete before the request moves to the next, so an approval cannot skip ahead of a stage that is still outstanding.",
    },
    {
        question: "How does temporary privileged account assignment revert?",
        answer:
            "Authorisation is granted for a specific timeframe and a specific target asset, and the mapping is ACL-based. When the window expires the account automatically reverts to its standard restricted state — the revocation is enforced in permissions, so it does not depend on anyone remembering to remove it.",
    },
    {
        question: "How are application credentials removed from config files and services?",
        answer:
            "OmniPriv eliminates hard-coded credentials in configuration files, databases, registries, Windows Services, scheduled tasks and IIS App Pools, and rotates them automatically instead. Applications retrieve credentials with zero added latency and no reliance on a remote repository, and every application requesting one is authenticated and protected against unauthorised change.",
    },
];

export default function WorkflowAccessControlPage() {
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

            {/* ─── APPROVAL WORKFLOW ──────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Approval Workflow"
                        title={approvalSection.title}
                        className="mb-2"
                    >
                        <Prose segments={approvalSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={approvalCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── TEMPORARY ASSIGNMENT ───────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={expirySection.image} ratio="wide-last" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <expirySection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={expirySection.title}>
                        {expirySection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === expirySection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={expirySection.points} className="mt-8" />

                    <ArrowLink href="/platform/audit-compliance" className="mt-8">
                        See how each assignment is evidenced
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── APPLICATION CREDENTIALS (dark band) ────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Application Credentials"
                        title={applicationSection.title}
                        className="mb-2"
                    >
                        <Prose segments={applicationSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {applicationPillars.map((pillar) => (
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
                        Credentials removed from
                    </p>
                    <ChipList
                        items={credentialTargets}
                        variant="accent"
                        separator={<span className="text-slate-500 text-sm">·</span>}
                    />
                </div>

                <div className="mt-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                        Applied to every token request
                    </p>
                    <ChipList
                        items={apiControls}
                        variant="neutral"
                        separator={<span className="text-slate-500 text-sm">·</span>}
                    />
                </div>
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Controls you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a policy statement. These are the rules the platform enforces.
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
                subtitle="Common questions about approvals, temporary assignment and application credentials."
                items={faqs}
            />
        </>
    );
}
