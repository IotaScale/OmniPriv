import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
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

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { EvidenceBundle, PatternsHero, ReviewVisual } from "@/components/patterns/Visuals";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /case-studies, framed as problem patterns rather than customer stories.
 *
 * The earlier version presented nine anonymous "customers" with precise,
 * uncheckable metrics; none of it was real. This page describes the problem
 * shapes privileged access programmes run into and the platform controls
 * that address them. Every capability referenced comes from
 * app/platform/data.ts: no invented customers, percentages or testimonials.
 * Built from the shared page kit (components/pageui); findings shown in
 * illustrations are illustrative.
 */

export const metadata: Metadata = {
    title: {
        absolute: "Privileged Access Patterns | OmniPriv",
    },
    description:
        "The problem patterns privileged access programmes run into, fragmented tooling, standing privilege, stale credentials, unprovable audit trails, and the platform controls that address them.",
};

const hero = {
    badge: "Patterns & Outcomes",
    titleLead: "The problem shape",
    titleAccent: "is always the same.",
    intro: [
        "Privileged access failures rarely come from a missing control. They come from the same six situations, repeated across industries and organisation sizes, a secret nobody owns, a permission nobody removed, a record nobody can vouch for.",
    ] as RichText,
    body: [
        "So this page describes the patterns rather than the customers. Each one below names the situation, and links to the capability module built to resolve it.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "See the Capabilities" },
    image: {
        src: "/identities/human-identities.jpeg",
        alt: "Security leaders reviewing governed identities around a table",
    },
};

const patternsSection = {
    title: "Patterns, not logos",
    lead: [
        "We do not name customers without written consent, and we do not publish figures we cannot stand behind. What follows is the set of problems, not attributed results from organisations you cannot call to verify.",
    ] as RichText,
};

const patterns: IconCard[] = [
    {
        icon: Layers,
        eyebrow: "Pattern 01",
        title: "The stack nobody chose",
        text: "A vault was bought for secrets, a recorder for sessions, a workflow tool for approvals and a reporting add-on for the audit, each with its own console and its own copy of who can do what.",
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
        text: "The events exist, but they sit in storage an administrator can edit, so in an investigation or an audit they prove nothing about what happened.",
        href: "/privileged-access-audit-compliance",
    },
    {
        icon: Eye,
        eyebrow: "Pattern 05",
        title: "Sessions nobody can inspect",
        text: "A privileged session ran, the change landed, and the only account of how it happened is the operator's memory several weeks later.",
        href: "/platform/secure-remote-access",
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
        "Six regulatory frameworks mapped out of the box, so a report arrives in the auditor's shape",
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
        text: "Every privileged session is fully monitored and recorded, with high-fidelity playback stored securely under controlled access and indexed for later search, no agent on the target.",
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
        "Tell us which of the six situations matches your environment and we will show you the controls that address it, including the ones you would have to give up to get there.",
        "No invented percentages required on either side.",
    ],
    kicker: "On-premise. Independently audited. Yours to run.",
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
            "It is scoped against your environment rather than sold as a fixed number. A rollout plan is produced during the architecture review, before any commitment.",
    },
    {
        question: "Where does the platform run?",
        answer:
            "On-premise, on infrastructure you control: VMware, Red Hat and OpenStack, as a hardware-agnostic software appliance. Multi-node clustering, automated health checks, continuous heartbeat monitoring, database replication and load balancing are available for high availability.",
    },
    {
        question: "What does a proof-of-concept involve?",
        answer:
            "A 30-minute introductory call, a tailored walkthrough configured for your use cases, an architecture review of your existing infrastructure, and optionally 30 days running OmniPriv in your own environment at no cost with support from our engineering team.",
    },
    {
        question: "Who owns the audit data and the encryption keys?",
        answer:
            "You do, on both counts. Data is encrypted at rest and in transit, with a layered key hierarchy protecting stored keys, and the installation key is generated at installation and stored externally and independently of the platform. Audit records are hash-chained in tamper-proof storage, so they cannot be altered or deleted, including by an administrator.",
    },
];

/* The module that resolves each pattern, by its link. */
const MODULE_NAME: Record<string, string> = {
    "/platform/consolidation": "PAM Consolidation",
    "/platform/workflow-access-control": "Workflow & Access Control",
    "/platform/password-credential-management": "Password & Credential Management",
    "/privileged-access-audit-compliance": "Audit, Governance & Compliance",
    "/platform/secure-remote-access": "Secure Remote & Hybrid Access",
    "/platform/enterprise-integration": "Enterprise & Identity Integration",
};

const NAV = [
    { id: "cs-patterns", label: "The six patterns" },
    { id: "cs-review", label: "The review" },
    { id: "cs-outputs", label: "What it produces" },
    { id: "cs-deeper", label: "Go deeper" },
    { id: "cs-faq", label: "FAQ" },
];

/* From this page's own copy. */
const FACTS = [
    { value: patterns.length, label: "problem patterns, repeated across industries and sizes" },
    { value: protocols.length, label: "session protocols recorded: SSH, RDP, VNC, HTTP, database" },
    { value: 2, label: "independent approvers minimum, never the requester" },
    { value: 6, label: "regulatory frameworks mapped out of the box" },
];

export default function CaseStudiesPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="cs-hero" />
            <Spotlight />

            <PageHero
                id="cs-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<PatternsHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── THE PATTERNS ───────────────────────────────────── */}
            <section id="cs-patterns" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={patternsSection.title}>
                        <Prose segments={patternsSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {patterns.map((p, i) => (
                            <Link key={p.title} href={p.href ?? "/platform"} className="aip-card group min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                <span className="inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-600 dark:text-amber-300 transition-colors duration-200 group-hover:bg-[#00B8DB] group-hover:text-[#03121c]">
                                    <p.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="op-card-title mt-5">{p.title}</h3>
                                <p className="op-card-text mt-2">{p.text}</p>
                                <div className="mt-auto pt-6">
                                    <div className="border-t border-slate-900/[0.06] dark:border-white/[0.06] pt-4 flex items-center gap-3">
                                        <span className="min-w-0">
                                            <span className="block text-[0.6875rem] font-semibold text-slate-500">Resolved by</span>
                                            <span className="block truncate text-[0.875rem] font-semibold op-link">{MODULE_NAME[p.href ?? ""] ?? "The platform"}</span>
                                        </span>
                                        <ArrowRight className="ml-auto w-4 h-4 shrink-0 op-link transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── THE REVIEW ─────────────────────────────────────── */}
            <section id="cs-review" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={reviewSection.title} />
                            <Paras items={reviewSection.paragraphs} className="mt-6" />
                            <CheckList items={reviewSection.points} className="mt-7" />
                            <ArrowLink href="/privileged-access-audit-compliance" className="mt-7">
                                See how the evidence is recorded
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <ReviewVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── WHAT THE PLATFORM PRODUCES (dark band) ─────────── */}
            <div className="dark">
                <section id="cs-outputs" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                <Heading title={outputSection.title}>
                                    <Prose segments={outputSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                                    {outputPillars.map((p, i) => (
                                        <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 2) * 70)}>
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                                <p.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h3 className="op-card-title mt-5">{p.title}</h3>
                                            <p className="op-card-text mt-2">{p.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <div className="min-w-0 lg:sticky lg:top-40 space-y-4" data-aos="fade-up" data-aos-delay="100">
                                <EvidenceBundle />
                                <div>
                                    <div className="text-[0.8125rem] font-semibold text-slate-400">Session protocols covered</div>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {protocols.map((p) => (
                                            <li key={p} className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#7FE3F2]">
                                                {p}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── GO DEEPER ──────────────────────────────────────── */}
            <section id="cs-deeper" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <div data-aos="fade-up">
                        <h2 className="op-h3">Go deeper</h2>
                        <p className="mt-2 mb-6 text-[0.9844rem] text-slate-600 dark:text-slate-400">Two long-form write-ups, plus the full capability set.</p>
                    </div>
                    <KeepReading links={deepDives} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Name your pattern", "See the controls"]} outcome="Decide on evidence" />}
                lead={closing.body[0]}
                body={[...closing.body.slice(1), closing.kicker]}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="cs-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
