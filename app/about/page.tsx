import type { Metadata } from "next";
import {
    Award,
    CreditCard,
    Eye,
    KeyRound,
    Lock,
    Server,
    Shield,
    ShieldCheck,
    Target,
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
import { complianceStandards, solutions } from "@/app/platform/data";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /about
 *
 * Rebuilt on the shared section library. Everything asserted here traces to
 * something the site already publishes: the module list, platformSpecs and
 * complianceStandards in app/platform/data.ts, and the certifications on
 * app/security/page.tsx.
 *
 * Deliberately removed from the previous version: an invented headcount,
 * office count and customer count ("500+ employees", "10+ countries",
 * "100+ enterprise customers", "over 3,000 organizations across six
 * continents"), and a leadership grid of six invented people whose bios
 * cited real employers. None of it was verifiable, and the bios in
 * particular attributed fabricated employment histories to named
 * individuals at named companies.
 */

export const metadata: Metadata = {
    title: {
        absolute: "About OmniPriv | Advanced PAM Solutions",
    },
    description:
        "OmniPriv builds privileged access management for on-premise, regulated environments — nine capability modules, 100% agentless, independently certified.",
};

const hero = {
    badge: "About OmniPriv",
    titleLead: "We build the audit trail",
    titleAccent: "before the incident.",
    intro: [
        "OmniPriv was built by people who had already run privileged access programmes and watched the same failure repeat: the controls existed on paper, and the evidence did not exist at all.",
    ] as RichText,
    body: [
        "So the record came first. Every privileged action produces something an auditor can follow, every secret is encrypted and vault-managed, and the whole platform runs on infrastructure you control rather than ours.",
    ] as RichText,
    primary: { href: "/platform", label: "Explore the Platform" },
    secondary: { href: "/demo", label: "Talk to Us" },
    image: {
        src: "https://images.unsplash.com/photo-1680992046626-418f7e910589?auto=format&fit=crop&w=1200&q=70",
        alt: "Rack of electronic equipment with indicator lights in a dark server room",
    },
};

/* Driven from app/platform/data.ts — the /about grid can never drift from
   the module list the platform index and sitemap are built from. */
const moduleCards: IconCard[] = solutions.map((solution, index) => ({
    icon: solution.icon,
    eyebrow: String(index + 1).padStart(2, "0"),
    title: solution.title,
    text: solution.tagline,
    href: `/platform/${solution.slug}`,
}));

const buildSection = {
    title: "What we build",
    lead: [
        "Nine capability modules over one policy engine and one audit trail — the same list the platform index is generated from.",
    ] as RichText,
};

const deploymentSection = {
    icon: Server,
    title: "Built to be deployed, not demoed",
    paragraphs: [
        [
            "A privileged access platform only counts once it is running against real systems, so the deployment model is treated as part of the security argument rather than an implementation detail. OmniPriv runs where your other critical systems run, and it asks nothing of the machines it protects.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1548544027-1a96c4c24c7a?auto=format&fit=crop&w=1200&q=70",
        alt: "Close-up of a rack-mounted network appliance with status indicator lights",
    },
    points: [
        "100% agentless — no software on endpoints, servers or workstations to roll out or patch",
        "On-premise deployment across VMware, Red Hat and OpenStack as a hardware-agnostic appliance",
        "Multi-node clustering with Docker health checks, WebSocket heartbeat and database replication",
        "Strict multi-tenancy through org_id isolation on every resource, schema-per-tenant",
        "HSM integration for root-of-trust key protection, with an external SECRET_KEY you hold",
        "Break-glass emergency procedure and granular credential restore without a full system restore",
    ],
};

const assuranceSection = {
    title: "How we're independently verified",
    lead: [
        "We would rather be checked than believed. These are the audits behind the platform, and the frameworks its controls are already mapped to.",
    ] as RichText,
};

const assurancePillars = [
    {
        icon: ShieldCheck,
        title: "SOC 2 Type II",
        text: "An annual third-party audit covering security, availability, processing integrity, confidentiality and privacy controls — not a self-assessment.",
    },
    {
        icon: Award,
        title: "ISO 27001",
        text: "An information security management system certification spanning platform operations and the development process behind it.",
    },
    {
        icon: CreditCard,
        title: "PCI-DSS Level 1",
        text: "The highest PCI level, validated by a Qualified Security Assessor, for environments that handle payment card data.",
    },
    {
        icon: Lock,
        title: "FIPS 140-2",
        text: "Validated cryptographic modules used for all key management and encryption operations, alongside TLS 1.3 in transit and AES-256-GCM at rest.",
    },
];

const frameworks = complianceStandards.map((standard) => standard.code);

const principlesSection = {
    title: "What we hold ourselves to",
    lead: [
        "These are positions on how the product gets built, not claims about how many people work here.",
    ] as RichText,
};

const principles: IconCard[] = [
    {
        icon: Shield,
        title: "Security is not a trade-off",
        text: "Security does not lose to shipping speed. The platform itself holds zero hard-coded credentials, and every secret it uses is vault-managed and auditable.",
    },
    {
        icon: Target,
        title: "Built for hard environments",
        text: "Designed for on-premise estates in financial services, healthcare, government and energy, where the network cannot be re-architected around a vendor.",
    },
    {
        icon: Eye,
        title: "Evidence over assertion",
        text: "Certifications and control mappings are published rather than implied, so a capability can be checked instead of taken on trust.",
    },
    {
        icon: KeyRound,
        title: "You hold the keys",
        text: "The SECRET_KEY is generated at installation and stored independently of the platform, so a compromise of our storage is not a compromise of yours.",
    },
];

const closing = {
    title: "See what the platform does before you take our word for it",
    body: [
        "Nine modules, one audit trail, and a deployment model that matches the infrastructure you already run.",
        "We will walk through the capability set and the control mappings against your own environment.",
    ],
    kicker: "Agentless. On-premise. Independently audited.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is OmniPriv built for?",
        answer:
            "On-premise, regulated environments that need to prove what happened to a privileged account. The platform covers the full privileged access lifecycle — vaulting, session control, approval workflow, integration and audit — in nine capability modules that share one policy engine and one audit trail.",
    },
    {
        question: "Do I have to install software on the machines being protected?",
        answer:
            "No. OmniPriv is 100% agentless. There is nothing to deploy to endpoints, servers or workstations, which means nothing new to patch on the hosts you are trying to secure and no rollout project before the platform does anything useful.",
    },
    {
        question: "Which certifications and frameworks does OmniPriv hold?",
        answer:
            "SOC 2 Type II, ISO 27001, PCI-DSS Level 1, HIPAA, GDPR and FIPS 140-2 validated cryptographic modules. Controls are additionally mapped out of the box to nine regulatory frameworks: SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, NIST 800-53, FERC/NERC CIP, GDPR and ISO 27001.",
    },
    {
        question: "Who holds the encryption keys?",
        answer:
            "You do. Data is encrypted at rest with AES-256-GCM and in transit with TLS 1.3, with an HSM providing root-of-trust protection for stored keys. The SECRET_KEY is generated at installation and must be stored externally and independently of the platform, then carried forward across upgrades and migrations.",
    },
    {
        question: "Where can I see the full technical specification?",
        answer:
            "The platform index lists every module, and the specification covers deployment model, architecture, supported protocols, high availability, multi-tenancy, encryption, approval principles and disaster recovery. We can also walk through it against your environment on a call.",
    },
];

export default function AboutPage() {
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

            {/* ─── WHAT WE BUILD ──────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="The Platform"
                        title={buildSection.title}
                        className="mb-2"
                    >
                        <Prose segments={buildSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={moduleCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── DEPLOYMENT MODEL ───────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={deploymentSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <deploymentSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={deploymentSection.title}>
                        {deploymentSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === deploymentSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={deploymentSection.points} className="mt-8" />

                    <ArrowLink href="/platform" className="mt-8">
                        See the full specification
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── INDEPENDENT ASSURANCE (dark band) ──────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Independent Assurance"
                        title={assuranceSection.title}
                        className="mb-2"
                    >
                        <Prose segments={assuranceSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {assurancePillars.map((pillar) => (
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
                        Controls mapped out of the box
                    </p>
                    <ChipList
                        items={frameworks}
                        variant="accent"
                        separator={<span className="text-slate-500 text-sm">·</span>}
                    />
                </div>
            </Section>

            {/* ─── PRINCIPLES ─────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="How We Work"
                        title={principlesSection.title}
                        className="mb-2"
                    >
                        <Prose segments={principlesSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={principles} columns={4} className="mt-12" />
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
                subtitle="Common questions about the platform, its deployment model and its certifications."
                items={faqs}
            />
        </>
    );
}
