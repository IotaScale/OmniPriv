import {
    Building2,
    Cpu,
    Globe,
    Key,
    Layers,
    Lock,
    Network,
    RefreshCw,
    Zap,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import { platformSpecs } from "@/app/platform/data";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/infrastructure-deployment — the destination
 * of the "Infrastructure & Deployment" entry in the platform dropdown.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic template when the slug appears in its
 * `bespokePages` map.
 *
 * This page is also the natural home for `platformSpecs` from
 * app/platform/data.ts, which the /platform index no longer renders.
 *
 * Every figure quoted comes from that data file: the twelve infrastructure
 * features, the platform specifications and the datasheet figures.
 */

const hero = {
    badge: "Infrastructure & Deployment",
    titleLead: "Runs on your infrastructure.",
    titleAccent: "Asks nothing of your machines.",
    intro: [
        "OmniPriv deploys on-premise across VMware, Red Hat and OpenStack as a hardware-agnostic software appliance. There is no agent to install on the servers, workstations or devices it protects.",
    ] as RichText,
    body: [
        "High availability, tenant isolation, disaster recovery and break-glass access are handled by the platform itself, so the operational questions are answered by the product rather than by a professional services engagement.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/enterprise", label: "Enterprise Deployment" },
    image: {
        src: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of servers in a data centre server room",
    },
};

const postureSection = {
    title: "Four decisions this makes for you",
    lead: [
        "The deployment model is part of the security argument. These are the choices OmniPriv makes so you do not have to.",
    ] as RichText,
};

const postureCards: IconCard[] = [
    {
        icon: Zap,
        eyebrow: "Agentless",
        title: "Nothing on the machines you protect",
        text: "No software agents on devices, servers or user workstations — nothing to roll out, and nothing to keep patched on the estate you are trying to secure.",
    },
    {
        icon: Cpu,
        eyebrow: "Software appliance",
        title: "Hardware-agnostic by design",
        text: "Delivered as a software appliance, so it is not tied to a particular vendor's iron or to a specific hypervisor generation.",
    },
    {
        icon: Layers,
        eyebrow: "Unified administration",
        title: "One console, one repository",
        text: "A single administration UI over one central credential repository, rather than a separate console for every function.",
    },
    {
        icon: Globe,
        eyebrow: "Browser and CLI",
        title: "Reachable the way you work",
        text: "Full control from Edge, Chrome, Firefox or Safari, or from the command line for teams that automate everything.",
    },
];

const availabilitySection = {
    icon: RefreshCw,
    title: "High availability, without a second product",
    paragraphs: [
        [
            "Availability is a property of the deployment rather than an add-on. OmniPriv clusters across nodes with health checking and replication built in, so the platform survives losing a node the same way your other critical systems do.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of electronic equipment with status lights in a dark room",
    },
    points: [
        "Multi-node clustering with Docker-based health checks and automatic restart",
        "WebSocket heartbeat monitoring between nodes, so a stalled node is noticed rather than waited on",
        "Database replication and load balancing across the cluster",
        "Granular disaster recovery — credentials restored without restoring the entire system",
        "Distributed zones with gateways proxying SSH and RDP per remote segment, managed from one control plane",
        "Offline device management — credentials for devices that rarely reach the corporate network stay managed and current",
    ],
};

const isolationSection = {
    title: "Zones, tenants and emergency access",
    lead: [
        "Remote sites, subsidiaries and the worst day of the year each need an answer that does not undermine the rest of the model.",
    ] as RichText,
};

const isolationPillars = [
    {
        icon: Network,
        title: "Zones and gateways",
        text: "Remote segments are modelled as zones, each with a gateway that proxies SSH and RDP locally so traffic does not have to traverse the WAN to be governed.",
    },
    {
        icon: Building2,
        title: "Strict multi-tenancy",
        text: "Isolation via org_id on every resource with PostgreSQL schema-per-tenant and per-organization RBAC, including dedicated ROOT, DEFAULT and SYSTEM organizations.",
    },
    {
        icon: Key,
        title: "Break-glass, still recorded",
        text: "A built-in procedure to bypass the platform in a genuine emergency — available when you need it, and fully written to the audit trail when you use it.",
    },
    {
        icon: Lock,
        title: "Secondary security password",
        text: "An additional mandatory layer in front of password vault access, so reaching stored credentials takes more than an authenticated session.",
    },
];

const specsSection = {
    title: "Platform specifications",
    lead: [
        "The deployment facts, stated plainly. Nothing here depends on a particular hypervisor, and nothing requires an agent on the target.",
    ] as RichText,
};

const stats = [
    { value: "0", label: "Software agents required", sub: "100% agentless architecture" },
    { value: "3", label: "Hypervisor platforms", sub: "VMware · Red Hat · OpenStack" },
    { value: "AES-256", label: "Credential vault encryption", sub: "With SHA-512 and HSM" },
    { value: "9", label: "Regulatory frameworks mapped", sub: "SOX through ISO 27001" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/workflow-access-control", label: "Approval and access governance" },
    { href: "/enterprise", label: "Enterprise deployment options" },
];

const closing = {
    title: "Deploy it on hardware you already own",
    body: [
        "OmniPriv runs on-premise as a software appliance, agentless, with clustering and disaster recovery built in.",
        "We will walk through the topology that suits your estate — standalone, active-standby or a full HA cluster.",
    ],
    kicker: "Your infrastructure. Your keys. No agents.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "Where can OmniPriv be deployed?",
        answer:
            "On-premise across VMware, Red Hat and OpenStack or other OpenSource-based platforms, as well as in private or public cloud. It supports standalone, active-standby and full high-availability cluster topologies, so the same product covers a single site and a distributed one.",
    },
    {
        question: "Does it require agents on my servers or workstations?",
        answer:
            "No. The architecture is one hundred percent agentless — no software agents are installed on endpoints, servers or user workstations. Privileged connections are brokered through the platform rather than intercepted at the machine, which also means no inbound port has to be opened on the target.",
    },
    {
        question: "How does high availability actually work?",
        answer:
            "OmniPriv clusters across multiple nodes with Docker-based health checks and automatic restart, WebSocket heartbeat monitoring between nodes, database replication and load balancing. A node that stops responding is detected and worked around rather than waited on.",
    },
    {
        question: "What happens if the PAM platform itself is unavailable?",
        answer:
            "There is a built-in break-glass procedure for exactly that emergency. It lets administrators bypass the platform to reach a system, and every use is written to the audit trail — so the exception is available without becoming an invisible bypass.",
    },
    {
        question: "Can we run separate tenants for subsidiaries or customers?",
        answer:
            "Yes. Isolation is enforced via org_id on every resource with PostgreSQL schema-per-tenant, and each organization gets its own RBAC. The model includes dedicated ROOT, DEFAULT and SYSTEM organizations, which is what makes it workable for MSPs as well as for enterprises with subsidiaries.",
    },
];

export default function InfrastructureDeploymentPage() {
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

            {/* ─── DEPLOYMENT POSTURE ─────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Deployment Posture"
                        title={postureSection.title}
                        className="mb-2"
                    >
                        <Prose segments={postureSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={postureCards} columns={4} className="mt-12" />
            </Section>

            {/* ─── AVAILABILITY ───────────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={availabilitySection.image} ratio="wide-last" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <availabilitySection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={availabilitySection.title}>
                        {availabilitySection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === availabilitySection.paragraphs.length - 1
                                        ? ""
                                        : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={availabilitySection.points} className="mt-8" />

                    <ArrowLink href="/platform/secure-remote-access" className="mt-8">
                        See how sessions are brokered without an agent
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── ZONES AND TENANTS (dark band) ──────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Isolation & Recovery"
                        title={isolationSection.title}
                        className="mb-2"
                    >
                        <Prose segments={isolationSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {isolationPillars.map((pillar) => (
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
            </Section>

            {/* ─── SPECIFICATIONS ─────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Technical Specifications"
                        title={specsSection.title}
                        className="mb-6"
                    >
                        <Prose segments={specsSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
                    {platformSpecs.map((spec) => (
                        <div
                            key={spec.label}
                            className={`p-5 rounded-2xl border flex flex-col justify-between ${cardBorder} ${cardSurface}`}
                        >
                            <span className="text-xs font-semibold text-[#00B8FF] uppercase tracking-wider mb-1.5">
                                {spec.label}
                            </span>
                            <span className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Infrastructure you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a deployment diagram. These are the constraints the platform is built to.
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
                subtitle="Common questions about deployment targets, agentless architecture, clustering and tenant isolation."
                items={faqs}
            />
        </>
    );
}
