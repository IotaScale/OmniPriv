import { CheckCircle2, FileSearch, Monitor, Radar, Server, Shield, Users, Workflow } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import IntegrationHero from "@/components/integration/IntegrationHero";
import { AutoTicket, DirectorySync, IntegrationMap, RequestTypes, SiemStream, StatusGate } from "@/components/integration/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/enterprise-integration, the destination of
 * "Enterprise & Identity Integration" in the platform dropdown.
 *
 * Routing belongs to app/platform/[slug]/page.tsx; SEO metadata comes from
 * the module entry in app/platform/data.ts.
 *
 * All seven features from ../data.ts are represented: six built-in ticket
 * request types with multi-level approvals, pre-access ticket verification,
 * automatic ticket creation on credential retrieval, real-time SIEM
 * forwarding, Identity Management lifecycle integration, bidirectional
 * LDAP/AD sync with entitlement management, and the RDP/SSH/VNC/HTTP
 * proxies that carry vault access by privilege level. Built from the shared
 * page kit (components/pageui); sample values in illustrations are
 * illustrative.
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

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/privileged-access-audit-compliance", label: "How approval evidence is recorded" },
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

const NAV = [
    { id: "ei-ticketing", label: "Ticketing" },
    { id: "ei-directory", label: "Directories" },
    { id: "ei-telemetry", label: "Telemetry & access paths" },
    { id: "ei-map", label: "Integration map" },
    { id: "ei-faq", label: "FAQ" },
];

/* The four figures the old outcomes row carried, now in the hero strip. */
const FACTS = [
    { value: 6, label: "built-in request types, each with multi-level approvals" },
    { value: "2-way", label: "LDAP and Active Directory sync for users, groups and entitlements" },
    { value: "Live", label: "SIEM event forwarding, no batch exports" },
    { value: 4, label: "protocol proxies: RDP, SSH, VNC and HTTP" },
];

const TICKET_VISUAL = [RequestTypes, AutoTicket, StatusGate];

export default function EnterpriseIntegrationPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="ei-hero" />
            <Spotlight />

            <PageHero
                id="ei-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<IntegrationHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── TICKETING AS A GATE ────────────────────────────── */}
            <section id="ei-ticketing" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={ticketingSection.title}>
                        <Prose segments={ticketingSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 md:grid-cols-3">
                        {ticketingCards.map((c, i) => {
                            const V = TICKET_VISUAL[i];
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

            {/* ─── DIRECTORY INTEGRATION ──────────────────────────── */}
            <section id="ei-directory" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={directorySection.title} />
                            <Paras items={directorySection.paragraphs} className="mt-6" />
                            <CheckList items={directorySection.points} className="mt-8" />
                            <ArrowLink href="/privileged-access-audit-compliance" className="mt-8">
                                See how entitlement changes are evidenced
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <DirectorySync />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── TELEMETRY & ACCESS PATHS (dark band) ───────────── */}
            <div className="dark">
                <section id="ei-telemetry" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                <Heading title={telemetrySection.title}>
                                    <Prose segments={telemetrySection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                                    {telemetryPillars.map((p, i) => (
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
                            <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                                <SiemStream />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── INTEGRATIONS YOU CAN POINT AT ──────────────────── */}
            <section id="ei-map" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title="Integrations you can point at">
                        <p>Every connection listed here is built in, not a professional-services project.</p>
                    </Heading>
                    <div className="op-body" data-aos="fade-up" data-aos-delay="80">
                        <IntegrationMap />
                    </div>
                    <div className="mt-14">
                        <h3 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h3>
                        <KeepReading links={keepReading} />
                    </div>
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Ticketing", "Directories", "Telemetry"]} outcome="Connected, not copied" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="ei-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
