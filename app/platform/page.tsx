import type { Metadata } from "next";
import { Building2, Layers, Server, ShieldCheck, Zap } from "lucide-react";

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
import { solutions, datasheetStats, complianceStandards } from "./data";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /platform — the capability index.
 *
 * Rebuilt on the shared section library so it matches the nine pages it
 * links to. The module grid is driven straight from ./data.ts, so adding a
 * module there adds its card here with no code change.
 *
 * Everything quoted comes from ./data.ts: the module list, datasheetStats,
 * complianceStandards and platformSpecs. Nothing new is asserted.
 */

export const metadata: Metadata = {
    title: "Platform: Enterprise PAM Capabilities & Specifications",
    description:
        "Explore OmniPriv's 9 core PAM capability modules covering 80+ enterprise requirements, 100% agentless architecture, regulatory compliance, and on-premise deployment specifications.",
};

const hero = {
    badge: "Enterprise PAM Platform",
    titleLead: "Nine capabilities.",
    titleAccent: "One policy engine.",
    intro: [
        "Privileged access work usually ends up spread across a vault, a session recorder, a workflow tool and a reporting add-on. OmniPriv covers the same ground in one agentless platform you run on your own infrastructure.",
    ] as RichText,
    body: [
        "Each module below addresses one part of the privileged access lifecycle. They share one credential store, one policy engine and one audit trail — so an identity cannot move between them to escape a control.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/identity-security", label: "See How It Fits Together" },
    image: {
        src: "https://images.unsplash.com/photo-1702478475268-aa8ef54c084e?auto=format&fit=crop&w=1200&q=70",
        alt: "Server rack with bundled network cabling connected to patch panels",
    },
};

/* Driven from ./data.ts — adding a module there adds its card here. */
const moduleCards: IconCard[] = solutions.map((solution, index) => ({
    icon: solution.icon,
    eyebrow: String(index + 1).padStart(2, "0"),
    title: solution.title,
    text: solution.tagline,
    href: `/platform/${solution.slug}`,
}));

const architectureSection = {
    title: "One platform, on your own infrastructure",
    lead: [
        "The deployment model is part of the security argument. OmniPriv runs where your other critical systems run, and it asks nothing of the machines it protects.",
    ] as RichText,
};

const architecturePillars = [
    {
        icon: Zap,
        title: "Agentless by default",
        text: "No software agents on devices, servers or workstations. There is nothing to roll out and nothing to keep patched on the machines you are trying to protect.",
    },
    {
        icon: Server,
        title: "Your topology, your hardware",
        text: "Deploys on-premise across VMware, Red Hat and OpenStack as a hardware-agnostic software appliance. Multi-node clustering, health checks, database replication and load balancing for high availability.",
    },
    {
        icon: Building2,
        title: "Strict tenant isolation",
        text: "Isolation via org_id on every resource, with per-organization RBAC — built for MSSPs and enterprises running subsidiaries from one platform.",
    },
    {
        icon: ShieldCheck,
        title: "Evidence that holds up",
        text: "Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, preserving integrity and non-repudiation rather than simply retaining entries.",
    },
];

const consoleSection = {
    icon: Layers,
    title: "One console, one credential repository",
    paragraphs: [
        [
            "Consolidation only counts if the day-to-day work actually moves. Administrators get a single web console and a CLI against a central credential repository, instead of a different interface for vaulting, sessions, approvals and reporting.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1663932210347-164a05ed0ccd?auto=format&fit=crop&w=1200&q=70",
        alt: "Network switch with blue and black structured cabling",
    },
    points: [
        "Browser console across Edge, Chrome, Firefox and Safari, plus a command-line interface",
        "A built-in mobile browser client with TOTP, approvals and geofencing — no app to install",
        "Centralised administration in a single UI with one credential repository",
        "Zone and gateway architecture for remote segments, managed from the same control plane",
        "Credentials protected with SHA-512 and AES-256-GCM envelope encryption, with HSM integration",
    ],
};

const standardsSection = {
    title: "Nine frameworks, mapped out of the box",
    lead: [
        "Compliance mappings are pre-configured rather than assembled by hand, and the reports arrive in the shape an auditor expects.",
    ] as RichText,
};

const keepReading = [
    { href: "/platform/identity-security", label: "How the identities fit together" },
    { href: "/platform/consolidation", label: "Consolidating a fragmented PAM stack" },
    { href: "/features", label: "The full capability list" },
];

const closing = {
    title: "See the whole platform, not one module",
    body: [
        "Request a demo or talk to our engineering team about your deployment requirements.",
        "We will walk through the modules that matter to your environment and the ones you can ignore for now.",
    ],
    kicker: "Nine capabilities. One credential store. One audit trail.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/enterprise", label: "Enterprise Deployment" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is the OmniPriv platform?",
        answer:
            "OmniPriv is an agentless privileged access management platform delivered as a software appliance you deploy on your own infrastructure. It covers credential management, session management, workflow and approval, audit and compliance, threat detection, application security, enterprise integration, infrastructure and deployment, and AI agent governance.",
    },
    {
        question: "Are the nine modules separate products?",
        answer:
            "They are capability modules of one platform rather than separate tools bolted together. That distinction is the point: they share a single credential store, a single policy engine and a single audit trail, so access granted in one area is visible and governed in all of them.",
    },
    {
        question: "Does OmniPriv require software agents on my servers?",
        answer:
            "No. The architecture is one hundred percent agentless — no software agents are installed on endpoints, servers or user workstations. Privileged connections are brokered through the platform rather than intercepted at the machine, which also means no inbound port has to be opened to the target.",
    },
    {
        question: "Where can OmniPriv be deployed?",
        answer:
            "On-premise across VMware, Red Hat and OpenStack or other OpenSource-based platforms, and in private or public cloud. It supports standalone, active-standby and full high-availability cluster topologies, with multi-node clustering, database replication and load balancing.",
    },
    {
        question: "Which regulatory frameworks does OmniPriv map to?",
        answer:
            "Nine, with pre-configured mappings: SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, NIST 800-53, FERC/NERC CIP, GDPR and ISO 27001. Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, and reports can be generated on a schedule.",
    },
];

export default function PlatformPage() {
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

            {/* ─── THE NINE MODULES ───────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    badge="Core Capabilities"
                    title="Nine capability modules"
                    align="center"
                    size="lg"
                    className="max-w-2xl mx-auto mb-14"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Each one below is a working page. Read together, they are the privileged access
                        lifecycle from discovery and credentials through to sessions, workflow and audit.
                    </p>
                </SectionHeading>

                <IconCardGrid items={moduleCards} columns={3} />
            </Section>

            {/* ─── ARCHITECTURE (dark band) ───────────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Architecture"
                        title={architectureSection.title}
                        className="mb-2"
                    >
                        <Prose segments={architectureSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {architecturePillars.map((pillar) => (
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

            {/* ─── ONE CONSOLE ────────────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={consoleSection.image} ratio="wide-last" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <consoleSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={consoleSection.title}>
                        {consoleSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === consoleSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={consoleSection.points} className="mt-8" />

                    <ArrowLink href="/platform/infrastructure-deployment" className="mt-8">
                        See the deployment specifications
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── COMPLIANCE STANDARDS ───────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading badge="Compliance" title={standardsSection.title} className="mb-6">
                        <Prose segments={standardsSection.lead} />
                    </SectionHeading>
                </div>

                <ChipList
                    items={complianceStandards.map((standard) => standard.code)}
                    variant="accent"
                />

                <div className="mt-10">
                    <ArrowLink href="/platform/audit-compliance">
                        See how the evidence is produced
                    </ArrowLink>
                </div>
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Platform figures you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a capability slide. These are the numbers the platform is specified against.
                    </p>
                </SectionHeading>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {datasheetStats.map((stat) => (
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
                subtitle="Common questions about the platform, its modules and how it is deployed."
                items={faqs}
            />
        </>
    );
}
