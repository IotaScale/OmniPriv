import { Clock, Key, Layers, Lock, Network, Shield, Smartphone, Users, Zap } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import ChipList from "@/components/sections/ChipList";
import Prose from "@/components/sections/Prose";
import ApprovalFlow from "@/components/workflow/ApprovalFlow";
import { AnywhereVisual, ChainVisual, ConfigVisual, ExpiryVisual, FourEyesVisual } from "@/components/workflow/Visuals";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/workflow-access-control ("Workflow & Access
 * Control"). Routing belongs to app/platform/[slug]/page.tsx; SEO metadata
 * comes from the module entry in app/platform/data.ts.
 *
 * All nine features of the module are represented (4-eyes with no
 * self-approval, mobile and email approvals, multi-level workflows,
 * time-based conditions, temporary assignment with ACL auto-revert,
 * application credential management, zero-latency retrieval, application
 * authentication, API rate and access controls). Built from the shared page
 * kit (components/pageui). Sample values in illustrations are illustrative.
 */

const hero = {
    badge: "Workflow & Access Control",
    titleLead: "Nobody approves",
    titleAccent: "their own access.",
    intro: [
        "The 4-eyes principle is the floor here, not a feature. A minimum of two independent approvers is required before privileged access is granted, and no user can approve their own request.",
    ] as RichText,
    body: [
        "From that starting point the workflow bends to how your organisation actually approves, multi-level chains, decisions made from a phone or an email link, and rules that change with the time of day, while privileged accounts are handed out with an expiry date attached.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/privileged-access-audit-compliance", label: "See the Audit Trail" },
    image: {
        src: "/identities/human-identities.jpeg",
        alt: "Approvers reviewing access requests for governed identities",
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
        text: "Requests, approvals and credential retrieval all work from a mobile device. Approvers can act through the web GUI, a mobile client, or an email link directly, no login into the console required.",
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
            "Because the entitlement is expressed as an ACL-based mapping rather than a note on a ticket, expiry is enforced in permissions, the account reverts to its standard restricted state the moment the window closes.",
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
        text: "Every application that requests credentials is authenticated, and protected against unauthorised changes, so the credential cannot be intercepted by tampering with the caller.",
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

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/password-credential-management", label: "How vaulting and rotation work" },
    { href: "/privileged-access-audit-compliance", label: "Where approvals are recorded" },
];

const closing = {
    title: "Put two approvers between the request and the credential",
    body: [
        "Approved by two independent people, granted for a defined window, then reverted automatically, with application secrets rotated instead of hard-coded.",
        "We will walk through the approval model and the temporary assignment rules against your environment.",
    ],
    kicker: "Approved by two. Granted for a window. Reverted on expiry.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/privileged-access-audit-compliance", label: "Audit & Compliance" },
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
            "Authorisation is granted for a specific timeframe and a specific target asset, and the mapping is ACL-based. When the window expires the account automatically reverts to its standard restricted state, the revocation is enforced in permissions, so it does not depend on anyone remembering to remove it.",
    },
    {
        question: "How are application credentials removed from config files and services?",
        answer:
            "OmniPriv eliminates hard-coded credentials in configuration files, databases, registries, Windows Services, scheduled tasks and IIS App Pools, and rotates them automatically instead. Applications retrieve credentials with zero added latency and no reliance on a remote repository, and every application requesting one is authenticated and protected against unauthorised change.",
    },
];


const NAV = [
    { id: "wac-approval", label: "Approval" },
    { id: "wac-expiry", label: "Expiry" },
    { id: "wac-apps", label: "Application credentials" },
    { id: "wac-faq", label: "FAQ" },
];

const FACTS = [
    { value: 2, label: "independent approvers, minimum, on every request" },
    { value: 0, label: "self-approvals possible: the requester is excluded" },
    { value: 6, label: "credential locations cleaned, config files to IIS App Pools" },
    { value: 4, label: "API access controls: RPS, IP/CIDR, time and usage limits" },
];

const APPROVAL_VISUAL = [FourEyesVisual, AnywhereVisual, ChainVisual];

export default function WorkflowAccessControlPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="wac-hero" />
            <Spotlight />

            <PageHero
                id="wac-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<ApprovalFlow />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── APPROVAL ───────────────────────────────────────── */}
            <section id="wac-approval" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={approvalSection.title}>
                        <Prose segments={approvalSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 md:grid-cols-3">
                        {approvalCards.map((c, i) => {
                            const V = APPROVAL_VISUAL[i];
                            return (
                                <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col gap-5" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper">
                                                <c.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="text-[0.8125rem] font-semibold op-link">{c.eyebrow}</span>
                                        </div>
                                        <h3 className="op-card-title mt-5">{c.title}</h3>
                                        <p className="op-card-text mt-2">{c.text}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <V />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── EXPIRY ─────────────────────────────────────────── */}
            <section id="wac-expiry" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={expirySection.title} />
                            <Paras items={expirySection.paragraphs} className="mt-6" />
                            <CheckList items={expirySection.points} className="mt-8" />
                            <ArrowLink href="/privileged-access-audit-compliance" className="mt-8">
                                See how each assignment is evidenced
                            </ArrowLink>
                        </div>
                        <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <ExpiryVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── APPLICATION CREDENTIALS (dark band) ────────────── */}
            <div className="dark">
                <section id="wac-apps" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <Heading title={applicationSection.title}>
                                    <Prose segments={applicationSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-8" data-aos="fade-up">
                                    <p className="text-[0.875rem] font-semibold text-slate-300 mb-3">Credentials removed from</p>
                                    <ChipList items={credentialTargets} variant="accent" />
                                </div>
                                <div className="mt-6" data-aos="fade-up">
                                    <p className="text-[0.875rem] font-semibold text-slate-300 mb-3">Applied to every token request</p>
                                    <ChipList items={apiControls} variant="neutral" />
                                </div>
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <ConfigVisual />
                            </div>
                        </div>
                        <div className="op-body grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {applicationPillars.map((p, i) => (
                                <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                                    <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                        <p.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title mt-5">{p.title}</h3>
                                    <p className="op-card-text mt-2">{p.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── KEEP READING ───────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Approved by two", "Granted for a window"]} outcome="Reverted on expiry" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="wac-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
