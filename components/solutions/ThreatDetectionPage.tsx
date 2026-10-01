import {
    Activity,
    Eye,
    Fingerprint,
    KeyRound,
    Lock,
    Network,
    ScrollText,
    ShieldCheck,
    Timer,
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
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/threat-detection — the destination of the
 * "AI Threat Defense / Defend against AI-era attacks" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. The SEO metadata continues to come from the
 * module entry in app/platform/data.ts.
 *
 * Every figure quoted below is OmniPriv's own and is verifiable in this
 * repository — see app/ai-pam/page.tsx for the 39-feature model, its
 * escalation tiers and the 10-second sweeper.
 */

const hero = {
    badge: "Threat Detection & Response",
    titleLead: "Attackers get in.",
    titleAccent: "Identity decides how far they get.",
    intro: [
        "Compromise is a question of when, not if. What you control is how much access an attacker inherits once they are already inside.",
    ] as RichText,
    body: [
        "Standing privilege is the difference between a contained incident and a breach that spreads. OmniPriv limits how far a compromised identity can move — whether that identity is an AI agent, a person or a service account — and records what it does along the way.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/ai-pam", label: "Explore AI-PAM" },
    image: {
        src: "https://images.unsplash.com/photo-1751448555253-f39c06e29d82?auto=format&fit=crop&w=1200&q=70",
        alt: "Security dashboard displaying live threat and privacy status indicators",
    },
};

const inheritSection = {
    icon: KeyRound,
    title: "Remove the access an attacker would inherit",
    paragraphs: [
        [
            "An attacker can only use the access an identity already holds. Standing privilege — credentials that exist whether or not anyone is using them — is what turns a single compromised account into a route across your estate.",
        ],
        [
            "OmniPriv removes that access rather than monitoring it. Credentials are issued for the task in front of the identity and expire with it, so there is nothing left sitting in place to claim.",
        ],
    ] as RichText[],
    remove: [
        "Just-in-time access — granted when it is needed, for only as long as it is needed",
        "Brokered credentials — people and agents never hold the raw secret",
        "Zero standing privilege — no dormant entitlement left to inherit",
        "4-eyes approval — a minimum of two independent approvers, with no self-approval",
    ],
};

const enforceSection = {
    title: "Authorize every action, not just the login",
    lead: [
        "Controlling access at the door is not enough. What matters is what an identity can do once it is through it.",
    ] as RichText,
};

const enforceCards: IconCard[] = [
    {
        icon: ShieldCheck,
        title: "Per-action authorization",
        text: "Policy is evaluated on every action — each command, query and tool call — rather than once at login and assumed afterwards.",
    },
    {
        icon: Lock,
        title: "Blocked in the moment",
        text: "An action outside policy does not run. It is refused before it starts, not interrupted once it is already touching production.",
    },
    {
        icon: Network,
        title: "One enforcement point",
        text: "SSH, RDP, databases, Kubernetes and cloud consoles sit behind a single policy and a single audit trail, instead of one control per tool.",
    },
    {
        icon: Fingerprint,
        title: "Adaptive step-up",
        text: "Keystroke-dynamics analysis compares live input against the identity's baseline and raises an MFA challenge mid-session when it drifts.",
    },
];

const containSection = {
    title: "Contain the movement, record the session",
    lead: [
        "If an identity is compromised, the aim is to keep the damage small and visible. These are the controls that do it.",
    ] as RichText,
};

const containPillars = [
    {
        icon: Network,
        title: "Contained blast radius",
        text: "Privileged administrators are restricted to their specifically authorized applications on the target system, so a compromised session cannot walk sideways through your infrastructure.",
    },
    {
        icon: Timer,
        title: "Immediate revocation",
        text: "Cut an identity's access across every target at once, without disrupting the services and sessions that are behaving correctly.",
    },
    {
        icon: Activity,
        title: "Behavioural scoring",
        text: "Every closed session is scored 0–1 across 39 features by an IsolationForest model, with tiered escalation from dashboard alert to admin alert to automatic block.",
    },
    {
        icon: ScrollText,
        title: "Full session recording",
        text: "Indexed session recordings and command-level logs capture what each identity did, start to finish — AI agents recorded alongside the people directing them.",
    },
];

const proveSection = {
    icon: Eye,
    title: "Prove your defenses when someone asks",
    paragraphs: [
        [
            "When the board or an auditor asks what happened, the answer should already exist. Reconstructing it months later from scattered logs is not an audit trail — it is a research project.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1667372283496-893f0b1e7c16?auto=format&fit=crop&w=1200&q=70",
        alt: "Data layers above a padlock, representing protected and auditable access",
    },
    points: [
        "Named accountability — every action ties back to a specific identity, never a shared account",
        "One audit trail — agent and human activity recorded together, so one system holds the answer",
        "Board-ready reporting — evidence you can show, rather than reconstruct on request",
        "Nine standards mapped out of the box — SOX, PCI-DSS, HIPAA, Basel II, MAS TRM, NIST 800-53, FERC/NERC CIP, GDPR and ISO 27001",
    ],
};

const stats = [
    { value: "39", label: "ML features scored per session", sub: "IsolationForest model" },
    { value: "10s", label: "Auto-block sweep interval", sub: "Tiered escalation" },
    { value: "0", label: "Software agents required", sub: "100% agentless" },
    { value: "9", label: "Regulatory standards mapped", sub: "SOX through ISO 27001" },
];

const keepReading = [
    { href: "/ai-pam", label: "How the anomaly scoring engine works" },
    { href: "/case-studies", label: "Read the anomaly detection case study" },
    { href: "/security", label: "Security architecture and certifications" },
];

const closing = {
    title: "Contain the next attack before it spreads",
    body: [
        "OmniPriv removes standing access, authorizes every action at runtime and records what each identity does.",
        "Run it against your own environment and read your own numbers, rather than someone else's benchmark.",
    ],
    kicker: "Nothing standing. Every action authorized. Every session recorded.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is privileged access threat detection?",
        answer:
            "Privileged access threat detection is the continuous analysis of privileged activity — logins, sessions, commands and credential use — to identify insider misuse, stolen credentials, lateral movement and attempts to bypass access controls. It differs from perimeter monitoring because the identities being watched already hold legitimate access.",
    },
    {
        question: "How quickly does OmniPriv respond to a detected threat?",
        answer:
            "Every closed session is scored 0–1 across 39 behavioural features, and a 10-second sweeper reviews the results. Escalation is tiered: a dashboard alert first, then an admin alert, then an automatic block when the score crosses the configured threshold.",
    },
    {
        question: "What does per-action authorization actually check?",
        answer:
            "Policy is evaluated against each individual action — the specific command, database query or tool call an identity is attempting — rather than once when the session opens. If the action falls outside policy it is refused before it executes, so nothing partially completes against a production system.",
    },
    {
        question: "Can OmniPriv limit lateral movement after a compromise?",
        answer:
            "Yes. Privileged administrators are confined to the specific applications they are authorized to use on a target system, so a compromised session cannot pivot across your infrastructure. Access is scoped to the task at hand and can be revoked across every target at once.",
    },
    {
        question: "Does this cover AI agents as well as people?",
        answer:
            "Yes. AI agents and machine identities are recorded in the same audit trail as human activity, so agent actions tie back to the person or service account that authorized them. Nothing an agent does is invisible to the same detection and reporting that covers your privileged users.",
    },
];

export default function ThreatDetectionPage() {
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

            {/* ─── REMOVE THE INHERITED ACCESS ──────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <div className="icon-wrapper mb-5">
                        <inheritSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={inheritSection.title}>
                        {inheritSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === inheritSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>

                <CheckList items={inheritSection.remove} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── PER-ACTION ENFORCEMENT ───────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={enforceSection.title} className="mb-2">
                        <Prose segments={enforceSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={enforceCards} columns={4} className="mt-12" />
            </Section>

            {/* ─── CONTAINMENT (dark band) ──────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={containSection.title} className="mb-2">
                        <Prose segments={containSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {containPillars.map((pillar) => (
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

            {/* ─── PROVE IT ─────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={proveSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <proveSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={proveSection.title}>
                        {proveSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === proveSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={proveSection.points} className="mt-8" />

                    <ArrowLink href="/security" className="mt-8">
                        See how OmniPriv itself is secured and certified
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Detection you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Threat detection is not a dashboard screenshot. These are the controls
                        running behind it.
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
                subtitle="Common questions about detecting insider threats, credential abuse and lateral movement under privileged access management."
                items={faqs}
            />
        </>
    );
}
