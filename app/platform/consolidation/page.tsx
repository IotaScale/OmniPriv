import type { Metadata } from "next";
import { Layers, Server, ShieldCheck } from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import { cardBorder, cardSurface, displayFont } from "@/lib/styles";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /platform/consolidation — the destination of the "Consolidation /
 * Consolidate your PAM stack" challenge card.
 *
 * A real route rather than an entry in the bespokePages map, for the same
 * reason as its sibling /platform/identity-security: a static segment takes
 * precedence over the neighbouring [slug] route, so this needs no module
 * entry in ../data.ts and the capability count stays at nine.
 *
 * Every figure below is OmniPriv's own, taken from ../data.ts: the nine
 * modules, 80+ requirement points, 0 software agents and the AES-256/HSM
 * vault. The deployment points mirror app/enterprise/page.tsx.
 */

export const metadata: Metadata = {
    title: "Consolidation: Replace a Fragmented PAM Stack — OmniPriv",
    description:
        "Replace separate vaulting, session recording, workflow and reporting tools with one agentless PAM platform you deploy on your own infrastructure.",
};

const hero = {
    badge: "Consolidation",
    titleLead: "Five tools. Five consoles.",
    titleAccent: "One platform.",
    intro: [
        "Most privileged access estates grew one purchase at a time — a vault, a session recorder, a workflow tool, a reporting add-on, and a spreadsheet quietly holding it together.",
    ] as RichText,
    body: [
        "OmniPriv covers the same ground in a single agentless platform: nine capability modules, one policy engine, one credential store and one audit trail, deployed on infrastructure you already own.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "See All Nine Capabilities" },
    image: {
        src: "https://images.unsplash.com/photo-1691435828932-911a7801adfb?auto=format&fit=crop&w=1200&q=70",
        alt: "Ethernet cables connected to a network switch in a server rack",
    },
};

const benefitsSection = {
    title: "Fewer tools, less to go wrong",
    lead: [
        "Each addition bought a licence, a console, an integration to maintain, and one more place for a gap to hide. Consolidation is not really about a smaller invoice — it is about one policy engine giving one answer, once, to every identity that asks.",
    ] as RichText,
};

const benefits: IconCard[] = [
    {
        icon: Layers,
        title: "Less complexity",
        text: "One console, one policy engine and one credential store replace a vault, a session recorder, a workflow tool and a reporting add-on.",
    },
    {
        icon: ShieldCheck,
        title: "Less risk",
        text: "Silos are where risk hides. Nobody should have to reconcile two consoles to find out whether an identity still has access — the answer lives in one place.",
    },
    {
        icon: Server,
        title: "Less to run",
        text: "Agentless, with nothing installed on endpoints and no per-tool appliance to patch. One platform to upgrade instead of five, on infrastructure you already own.",
    },
];

const retireSection = {
    title: "Five tools, one platform",
    lead: [
        "Consolidating is only worth doing if the replacement genuinely covers what the point tools did. These are the jobs the capability modules take over.",
    ] as RichText,
};

const retiredTools = [
    "The standalone credential vault — rotation, SSH key lifecycle and password reconciliation move into the platform",
    "The separate session recorder — SSH, RDP, VNC, HTTP and database sessions recorded and searchable in the same console",
    "The bolt-on reporting tool — nine regulatory mappings and scheduled reports, built in rather than licensed separately",
    "The email-and-spreadsheet approval chain — 4-eyes and multi-level workflows enforced by policy instead of habit",
    "The separate analytics licence — 39-feature behavioural scoring running on every closed session",
];

const ownershipSection = {
    title: "One platform, on your own infrastructure",
    lead: [
        "Consolidating onto a service you do not control simply trades one dependency for a larger one. OmniPriv runs where your other critical systems run.",
    ] as RichText,
    points: [
        "Runs on your own infrastructure — on-premises, private cloud or public cloud, in any topology",
        "Standalone, active-standby or a full HA cluster, with multi-node clustering and database replication",
        "Strict multi-tenancy with per-organization isolation and RBAC, for MSSPs and enterprises with subsidiaries",
        "Break-glass emergency access with granular credential restore, without a full system restore",
        "Custom connectors through an open SDK, so there is no vendor lock-in",
    ],
};

const stats = [
    { value: "9", label: "Capability modules", sub: "One policy engine" },
    { value: "0", label: "Software agents required", sub: "100% agentless" },
    { value: "80+", label: "Requirement points covered", sub: "Enterprise PAM coverage" },
    { value: "100%", label: "Credential vault encryption", sub: "AES-256 with HSM" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/identity-security", label: "How the identities fit together" },
    { href: "/features", label: "See the full capability list" },
];

const closing = {
    title: "Replace the stack, then stop maintaining it",
    body: [
        "OmniPriv brings vaulting, session control, workflow, threat detection and reporting into one agentless platform.",
        "Fewer tools, one audit trail, and a deployment you already know how to run.",
    ],
    kicker: "One platform. One policy engine. One source of truth.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/enterprise", label: "Enterprise Deployment" },
};

const faqs: FaqEntry[] = [
    {
        question: "What does consolidating a PAM stack actually involve?",
        answer:
            "It means replacing several single-purpose tools — typically a credential vault, a session recording appliance, a workflow or approval tool and a reporting add-on — with one platform that performs all of those jobs against a single policy engine and a single audit trail.",
    },
    {
        question: "How many tools can one platform replace?",
        answer:
            "OmniPriv covers the work of nine capability modules in one product: credential management, session management, workflow and access control, audit and compliance, threat detection, application security, enterprise integration, infrastructure and deployment, and AI agent governance. Devices and consoles you no longer need are the measurable saving; the reduction in blind spots is the security one.",
    },
    {
        question: "Where does OmniPriv run?",
        answer:
            "On your own infrastructure. It deploys on-premises across VMware, Red Hat and OpenStack platforms, and can also run in private or public cloud, in any topology from a standalone node through active-standby to a full HA cluster. It is a software appliance, not a service you have to reach over the internet.",
    },
    {
        question: "Does consolidating mean giving up our integration points?",
        answer:
            "No. OmniPriv integrates with the systems you already run — SIEM platforms, ITSM and ticketing, LDAP and Active Directory, and standard single sign-on protocols — and custom connectors can be built through an open SDK. The aim is fewer consoles for privileged access, not fewer connections to the rest of your estate.",
    },
    {
        question: "Where should we start?",
        answer:
            "Start with inventory rather than migration. Discovery turns an unknown estate of privileged accounts into a list you can prioritise, and most teams find stale or orphaned accounts they did not know about before they change a single policy. Enforcement is much easier once the scope is known.",
    },
];

export default function ConsolidationPage() {
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

            {/* ─── FEWER TOOLS ──────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title={benefitsSection.title}
                    align="center"
                    size="lg"
                    className="max-w-3xl mx-auto mb-14"
                >
                    <Prose segments={benefitsSection.lead} />
                </SectionHeading>

                <IconCardGrid items={benefits} columns={3} />
            </Section>

            {/* ─── WHAT YOU RETIRE ──────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title={retireSection.title}
                    align="center"
                    size="lg"
                    className="max-w-3xl mx-auto mb-12"
                >
                    <Prose segments={retireSection.lead} />
                </SectionHeading>

                <CheckList items={retiredTools} className="max-w-3xl mx-auto" />

                <div className="text-center mt-10">
                    <ArrowLink href="/platform">See what replaces each one</ArrowLink>
                </div>
            </Section>

            {/* ─── OWNERSHIP ────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title={ownershipSection.title}
                    align="center"
                    size="lg"
                    className="max-w-3xl mx-auto mb-12"
                >
                    <Prose segments={ownershipSection.lead} />
                </SectionHeading>

                <CheckList items={ownershipSection.points} className="max-w-3xl mx-auto" />

                <div className="text-center mt-10">
                    <ArrowLink href="/enterprise">See enterprise deployment options</ArrowLink>
                </div>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Consolidation you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a slide about reducing tool count. These are the numbers behind it.
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

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ──────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about replacing fragmented privileged access tools with a single platform."
                items={faqs}
            />
        </>
    );
}
