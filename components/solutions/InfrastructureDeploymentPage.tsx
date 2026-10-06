import {
    Building2,
    Cpu,
    Globe,
    Key,
    Layers,
    Lock,
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
import { cardBorder, cardSurface } from "@/lib/styles";
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
    titleAccent: "Managed from one control plane.",
    intro: [
        "OmniPriv deploys on-premise across VMware, Red Hat and OpenStack as a hardware-agnostic software appliance, on the infrastructure you already run.",
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
        eyebrow: "On-premise",
        title: "Runs where your systems run",
        text: "Deployed on your own infrastructure rather than reached as a service over the internet, so privileged traffic stays inside your estate.",
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
        "Multi-node clustering with container-based health checks and automatic restart",
        "Heartbeat monitoring between nodes, so a stalled node is noticed rather than waited on",
        "Database replication and load balancing across the cluster",
        "Granular disaster recovery — credentials restored without restoring the entire system",
        "Offline device management — credentials for devices that rarely reach the corporate network stay managed and current",
    ],
};

const isolationSection = {
    title: "Tenants and emergency access",
    lead: [
        "Remote sites, subsidiaries and the worst day of the year each need an answer that does not undermine the rest of the model.",
    ] as RichText,
};

const isolationPillars = [
    {
        icon: RefreshCw,
        title: "Offline device management",
        text: "Credentials for devices that rarely reach the corporate network stay managed and current, rather than drifting out of the vault.",
    },
    {
        icon: Building2,
        title: "Strict multi-tenancy",
        text: "Isolation via org_id on every resource with schema-per-tenant data separation and per-organization RBAC, including dedicated ROOT, DEFAULT and SYSTEM organizations.",
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
        "The deployment facts, stated plainly. Nothing here depends on a particular hypervisor.",
    ] as RichText,
};

const closing = {
    title: "Deploy it on hardware you already own",
    body: [
        "OmniPriv runs on-premise as a software appliance, with clustering and disaster recovery built in.",
        "We will walk through the topology that suits your estate — standalone, active-standby or a full HA cluster.",
    ],
    kicker: "Your infrastructure. Your keys. Your topology.",
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
        question: "Does OmniPriv need inbound ports opened to managed systems?",
        answer:
            "No. Privileged connections are brokered through the platform rather than intercepted at the machine, so an inbound port does not have to be opened on the target system.",
    },
    {
        question: "How does high availability actually work?",
        answer:
            "OmniPriv clusters across multiple nodes with container-based health checks and automatic restart, heartbeat monitoring between nodes, database replication and load balancing. A node that stops responding is detected and worked around rather than waited on.",
    },
    {
        question: "What happens if the PAM platform itself is unavailable?",
        answer:
            "There is a built-in break-glass procedure for exactly that emergency. It lets administrators bypass the platform to reach a system, and every use is written to the audit trail — so the exception is available without becoming an invisible bypass.",
    },
    {
        question: "Can we run separate tenants for subsidiaries or customers?",
        answer:
            "Yes. Isolation is enforced via org_id on every resource with schema-per-tenant data separation, and each organization gets its own RBAC. The model includes dedicated ROOT, DEFAULT and SYSTEM organizations, which is what makes it workable for MSPs as well as for enterprises with subsidiaries.",
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
                        See how privileged sessions are brokered
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── TENANTS AND RECOVERY (dark band) ───────────────── */}
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
                subtitle="Common questions about deployment targets, clustering and tenant isolation."
                items={faqs}
            />
        </>
    );
}
