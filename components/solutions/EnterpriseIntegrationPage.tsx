import {
    CheckCircle2,
    FileSearch,
    Globe,
    Monitor,
    Network,
    Radar,
    Server,
    Shield,
    UserCheck,
    Users,
    Workflow,
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
 * Bespoke layout for /platform/enterprise-integration, the destination of
 * "Enterprise & Identity Integration" in the platform dropdown.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic template when the slug appears in its
 * `bespokePages` map.
 *
 * All seven features from ../data.ts are represented: six built-in ticket
 * request types with multi-level approvals, pre-access ticket verification,
 * automatic ticket creation on credential retrieval, real-time SIEM
 * forwarding, Identity Management lifecycle integration, bidirectional
 * LDAP/AD sync with entitlement management, and the RDP/SSH/VNC/HTTP
 * proxies that carry vault access by privilege level.
 */

const hero = {
    badge: "Enterprise & Identity Integration",
    titleLead: "Privileged access that fits",
    titleAccent: "the systems you already run.",
    intro: [
        "Privileged access management fails when it becomes a second place to manage users. OmniPriv connects natively to the ticketing, monitoring and directory systems that already hold your identities and your events.",
    ] as RichText,
    body: [
        "Approvals run through tickets your teams already understand, access events reach the SIEM you already correlate in, and users, groups and entitlements stay sourced from LDAP or Active Directory rather than duplicated beside it.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/integrations", label: "See All Integrations" },
    image: {
        src: "https://images.unsplash.com/photo-1698668975271-2ba9a323be6b?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of servers with dense cabling attached to each unit",
    },
};

const ticketingSection = {
    title: "A ticket is a gate, not a paper trail",
    lead: [
        "Every privileged action can be made to depend on an approved ticket, checked at the moment of release rather than reconciled afterwards.",
    ] as RichText,
};

const ticketingCards: IconCard[] = [
    {
        icon: FileSearch,
        eyebrow: "Six request types",
        title: "Requests shaped like the work",
        text: "General, Asset Permission, Application, Command Confirm, Login Confirm and Login Asset Confirm, each raised as its own request type, with configurable multi-level approvals behind it.",
    },
    {
        icon: Workflow,
        eyebrow: "On retrieval",
        title: "Tickets raised automatically",
        text: "Requesting a privileged password raises a ticket and the full approval workflow on its own. The credential stays withheld until that workflow completes, so nobody has to remember to open one first.",
    },
    {
        icon: CheckCircle2,
        eyebrow: "Before release",
        title: "Pre-access verification",
        text: "A ticket is a mandatory prerequisite before privileged credentials are released. Ticket status is checked in real time, so pending, rejected and closed tickets block the release automatically.",
    },
];

const directorySection = {
    icon: Users,
    title: "Connect to whatever already holds your identities",
    paragraphs: [
        [
            "Directories are the source of truth, and they are treated that way. Users and groups are synchronised against LDAP or Active Directory in both directions, so a joiner, a mover or a leaver is reflected in privileged access without a second provisioning process to keep in step.",
        ],
        [
            "Identity Management platforms plug in at the same layer for user lifecycle management and automated provisioning, which keeps entitlement decisions in the system that already owns them.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1531668383211-64743e924c66?auto=format&fit=crop&w=1200&q=70",
        alt: "Blue LAN cable plugged into a green and black network router",
    },
    points: [
        "LDAP and Active Directory integration with bidirectional synchronisation",
        "Automatic user and group provisioning driven by the directory itself",
        "User entitlement management, so privileged access follows the directory rather than a copy of it",
        "Identity Management integration for lifecycle management and automated provisioning",
    ],
};

const telemetrySection = {
    title: "One event stream into the systems you already monitor",
    lead: [
        "Privileged activity is only useful when it lands where your analysts are already looking, and when the access path itself carries no permanent credentials.",
    ] as RichText,
};

const telemetryPillars = [
    {
        icon: Radar,
        title: "Real-time SIEM forwarding",
        text: "Privileged access events are forwarded to your SIEM platforms in real time for centralised security monitoring and event correlation, rather than exported on a nightly schedule.",
    },
    {
        icon: Monitor,
        title: "RDP, SSH, VNC and HTTP proxies",
        text: "Sessions to targets run through protocol proxies for RDP, SSH, VNC and HTTP, keeping the credential on the platform side of the connection.",
    },
    {
        icon: Shield,
        title: "Vault access by privilege level",
        text: "On top of standard proxied connections, users can reach the Password Vault itself according to their privilege level in OmniPriv, so access is scoped to the role, not the network position.",
    },
    {
        icon: Server,
        title: "No parallel monitoring stack",
        text: "Nothing has to be stood up alongside your existing tooling. Events, tickets and entitlements all flow through the systems your teams already operate.",
    },
];

const protocols = ["RDP", "SSH", "VNC", "HTTP"];

const stats = [
    { value: "6", label: "Built-in request types", sub: "Each with multi-level approvals" },
    { value: "AD / LDAP", label: "Bidirectional sync", sub: "Users, groups and entitlements" },
    { value: "Real time", label: "SIEM event forwarding", sub: "No batch exports" },
    { value: "4", label: "Protocol proxies", sub: "RDP, SSH, VNC and HTTP" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/audit-compliance", label: "How approval evidence is recorded" },
    { href: "/integrations", label: "Full integration catalogue" },
];

const closing = {
    title: "Fit privileged access into the stack you already have",
    body: [
        "Tickets gate the release, directories source the identities, and privileged events reach the monitoring you already trust.",
        "We will walk through the integration points against your ticketing, SIEM and directory systems.",
    ],
    kicker: "Ticketing, directories and telemetry, connected, not copied.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/integrations", label: "View Integrations" },
};

const faqs: FaqEntry[] = [
    {
        question: "Which ticket request types does OmniPriv support?",
        answer:
            "Six: General, Asset Permission, Application, Command Confirm, Login Confirm and Login Asset Confirm. Each has configurable multi-level approvals, so a request can be routed differently depending on the asset, the application or the action being confirmed.",
    },
    {
        question: "How does pre-access ticket verification actually block access?",
        answer:
            "A ticket is a mandatory prerequisite before privileged credentials are released, and its status is checked in real time at the moment of release. Pending, rejected and closed tickets block that release automatically, there is no window where an unapproved ticket still yields a credential.",
    },
    {
        question: "When is a ticket created automatically?",
        answer:
            "On every privileged password retrieval request. OmniPriv raises the ticket and the full approval workflow itself, and the credential is withheld until the workflow completes. The practical effect is that the approval step cannot be skipped by simply not asking for it.",
    },
    {
        question: "How does LDAP and Active Directory integration work?",
        answer:
            "OmniPriv synchronises with LDAP and Active Directory in both directions, with automatic user and group provisioning and support for user entitlement management. Identity Management platforms integrate at the same layer for user lifecycle management and automated provisioning.",
    },
    {
        question: "Which protocols can be proxied, and what about the vault itself?",
        answer:
            "RDP, SSH, VNC and HTTP sessions are proxied so the credential stays on the platform side. Beyond those standard connections, users can also reach the Password Vault directly according to their privilege level in OmniPriv.",
    },
];

export default function EnterpriseIntegrationPage() {
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

            {/* ─── TICKETING AS A GATE ────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    badge="Approval Workflow"
                    title={ticketingSection.title}
                    className="mb-2"
                >
                    <Prose segments={ticketingSection.lead} />
                </SectionHeading>

                <IconCardGrid items={ticketingCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── DIRECTORY INTEGRATION ──────────────────────────── */}
            <Section border="bottom">
                <MediaSplit
                    media={directorySection.image}
                    ratio="wide-last"
                    height="sm"
                    align="start"
                    heading={<SectionHeading title={directorySection.title} />}
                >
                    <div className="op-hero-copy">
                        {directorySection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === directorySection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </div>

                    <CheckList items={directorySection.points} className="mt-8" />

                    <ArrowLink href="/platform/audit-compliance" className="mt-8">
                        See how entitlement changes are evidenced
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── TELEMETRY & ACCESS PATHS (dark band) ───────────── */}
            <Section tone="dark" border="bottom">
                <SectionHeading badge="Telemetry & Access Paths" title={telemetrySection.title} className="mb-2">
                    <Prose segments={telemetrySection.lead} />
                </SectionHeading>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {telemetryPillars.map((pillar) => (
                        <div key={pillar.title}>
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

                <ChipList
                    items={protocols}
                    variant="accent"
                    separator={<span className="text-slate-500 dark:text-slate-500 text-sm">/</span>}
                    className="mt-14"
                />
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Integrations you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Every connection listed here is built in, not a professional-services project.
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
                subtitle="Common questions about ticketing, directory synchronisation and event forwarding."
                items={faqs}
            />
        </>
    );
}
