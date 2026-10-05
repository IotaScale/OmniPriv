import type { Metadata } from "next";
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bot,
    Building2,
    Cpu,
    Eye,
    KeyRound,
    ScanSearch,
    ScrollText,
    Timer,
    Users,
} from "lucide-react";

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
 * /platform/identity-security — the cross-cutting hub.
 *
 * It sits inside the /platform namespace because every challenge card now
 * points there, but it is not a capability module and is deliberately absent
 * from `solutions` in ../data.ts: it describes the whole identity estate
 * rather than one capability. That is also why it is a real route rather than
 * an entry in the bespokePages map — a static segment takes precedence over
 * the neighbouring [slug] route, so no module entry is needed for it to
 * resolve, and the module count stays at nine.
 *
 * It is the only page that links the two halves of the site together: the
 * identity classes under /solutions and the capability modules under
 * It is also the destination of the "Reduce Privileged Identity Risk"
 * challenge card, which previously pointed at a single credential module
 * that did not describe it.
 *
 * The four identity classes come from app/solutions/ai-agent-security/data.ts:
 * "human, machine, vendor, and AI/automated identities". Every destination
 * below is a page that exists.
 */

export const metadata: Metadata = {
    // The name carries the brand, so it must bypass the "%s | OmniPriv"
    // template in app/layout.tsx or the suffix doubles up.
    title: { absolute: "Reduce Privileged Identity Risk | OmniPriv" },
    description:
        "Identify excessive privileges, risky access, and unusual behavior while enforcing least privilege, JIT access, and stronger controls across privileged identities.",
};

const hero = {
    badge: "Reduce Privileged Identity Risk",
    titleLead: "Every access point is privileged.",
    titleAccent: "What matters is who, to what, and when.",
    intro: [
        "The old line between privileged and non-privileged identities no longer holds. Across on-premises systems, cloud services and autonomous agents, every path to sensitive data is a privileged one.",
    ] as RichText,
    body: [
        "OmniPriv governs them together — human, machine, vendor and AI identities — under one policy engine, one credential store and one audit trail, rather than four tools that never quite agree with each other.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
    image: {
        src: "https://images.unsplash.com/photo-1759931300350-39eb98d8ed74?auto=format&fit=crop&w=1200&q=70",
        alt: "A person's silhouette rendered on a device screen, representing a digital identity",
    },
};

const classesSection = {
    title: "Four kinds of identity. One authorization model.",
    lead: [
        "Each identity class fails in its own way, which is exactly how gaps open up between tools bought at different times.",
    ] as RichText,
};

const identityClasses: IconCard[] = [
    {
        icon: Users,
        title: "Human identities",
        text: "Administrators, engineers and workforce users — including remote and hybrid workers whose access IT can no longer watch at the network edge.",
        href: "/solutions/human-identity-security",
    },
    {
        icon: Cpu,
        title: "Machine identities",
        text: "Service accounts, workload identities, keys, certificates and secrets — created and destroyed faster than any manual review cycle can follow.",
        href: "/solutions/machine-identity-security",
    },
    {
        icon: Bot,
        title: "AI agents",
        text: "Autonomous agents that authenticate on their own, call tools and act at machine speed with nobody sitting at the keyboard.",
        href: "/solutions/ai-agent-security",
    },
    {
        icon: Building2,
        title: "Vendor & third-party",
        text: "Contractors, suppliers and partners who need genuine access for a defined piece of work — and need it revoked the moment that work ends.",
        href: "/platform/secure-remote-access",
    },
];

const areasSection = {
    title: "Six places identity risk actually accumulates",
    lead: [
        "Each one is a working page. Read together, they are the privileged access lifecycle from discovery to evidence.",
    ] as RichText,
};

const riskAreas: IconCard[] = [
    {
        icon: ScanSearch,
        title: "Discovery & inventory",
        text: "You cannot govern an identity you have not found. Inventory across on-prem, cloud and hybrid surfaces the accounts nobody registered.",
        href: "/features",
    },
    {
        icon: KeyRound,
        title: "Protected credentials",
        text: "Vaulting, policy-driven rotation and full SSH key lifecycle, so secrets are never left in the hands of the identities that use them.",
        href: "/platform/password-credential-management",
    },
    {
        icon: Timer,
        title: "Zero standing privilege",
        text: "Time-bound assignment that reverts automatically on expiry, behind 4-eyes approval. There is nothing permanent left to inherit.",
        href: "/platform/workflow-access-control",
    },
    {
        icon: Eye,
        title: "Privileged secure access",
        text: "Brokered, recorded and monitored sessions across every protocol — agentless, with no VPN client and no inbound port.",
        href: "/platform/secure-remote-access",
    },
    {
        icon: AlertTriangle,
        title: "Posture & threat analysis",
        text: "Behavioural scoring on every closed session, with tiered escalation from dashboard alert to admin alert to automatic block.",
        href: "/platform/ai-threat-protection",
    },
    {
        icon: BarChart3,
        title: "Accountability & audit",
        text: "A tamper-proof trail with cryptographic hash-chaining, mapped against nine regulatory frameworks out of the box.",
        href: "/platform/audit-compliance",
    },
];

const operatingSection = {
    title: "Zero standing privilege is the operating model",
    lead: [
        "Identity sprawl is not solved by reviewing access more often. It is solved by not holding the access in the first place.",
    ] as RichText,
};

const operatingPillars = [
    {
        icon: Timer,
        title: "Nothing standing",
        text: "Access is granted for a task and expires with it, so there is no permanent entitlement to accumulate, review, forget about or inherit.",
    },
    {
        icon: KeyRound,
        title: "Credentials never held",
        text: "Secrets stay in the vault and are injected on the far side of the connection, so the identity making the request never holds the raw credential.",
    },
    {
        icon: Activity,
        title: "Verified continuously",
        text: "Authorization is evaluated on each action rather than assumed from the login, and behavioural scoring runs against every closed session.",
    },
    {
        icon: ScrollText,
        title: "Evidence by default",
        text: "Every action is logged with the user, asset and outcome, so the answer already exists by the time anybody asks for it.",
    },
];

const governancePoints = [
    "One policy engine evaluates human, machine, vendor and AI identities instead of four separate rule sets",
    "Integrates with existing identity management systems for user lifecycle management and provisioning",
    "Bidirectional LDAP and Active Directory sync with automatic user and group provisioning",
    "Records every identity in one audit trail, so agent activity sits beside the human activity that authorised it",
];

const stats = [
    { value: "4", label: "Identity classes governed", sub: "Human · machine · vendor · AI" },
    { value: "39", label: "ML features scored per session", sub: "IsolationForest model" },
    { value: "9", label: "Regulatory frameworks mapped", sub: "SOX through ISO 27001" },
    { value: "0", label: "Software agents required", sub: "100% agentless" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/features", label: "See the full capability list" },
    { href: "/ai-pam", label: "How the AI-PAM engine works" },
];

const closing = {
    title: "One authorization model for every identity",
    body: [
        "OmniPriv governs human, machine, vendor and AI identities together — the same policy engine, the same credential protection and the same audit trail.",
        "Start with the identity class that worries you most. The model does not change for the next one.",
    ],
    kicker: "Nothing standing. Nobody holds the secret. Nothing unrecorded.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is identity security?",
        answer:
            "Identity security is the discipline of controlling who and what can reach your systems, and proving afterwards what they did. It has moved well past usernames and passwords: the estate now includes service accounts, workload identities, certificates, contractors and autonomous AI agents, each with its own failure mode.",
    },
    {
        question: "Why govern human, machine, vendor and AI identities in one model?",
        answer:
            "Because separate tools create gaps exactly where identities overlap. An AI agent acts on behalf of a human, a contractor authenticates as a service account, and a machine identity outlives the person who created it. When one policy engine evaluates them all, an identity cannot move between categories to escape a control.",
    },
    {
        question: "What is zero standing privilege and why does it matter?",
        answer:
            "Zero standing privilege means an identity holds no access when it is not actively performing a task. Access is granted just-in-time, scoped to the task and revoked automatically at expiry. Nothing permanent exists to accumulate, to be forgotten during a review, or to be inherited by whoever compromises the identity.",
    },
    {
        question: "Where do we start if we can only see some of our identities?",
        answer:
            "Start with inventory rather than enforcement. OmniPriv discovers privileged accounts across on-prem, cloud and hybrid environments, which turns an unknown estate into a list you can prioritise. Most teams find the stale and orphaned accounts they did not know about before they change any policy.",
    },
    {
        question: "Does this replace our existing identity governance tooling?",
        answer:
            "No. OmniPriv integrates with enterprise identity management systems for user lifecycle management and provisioning, and syncs bidirectionally with LDAP and Active Directory. It governs privileged access to your systems rather than replacing the directory or IGA platform that defines who your people are.",
    },
];

export default function IdentitySecurityPage() {
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

            {/* ─── FOUR IDENTITY CLASSES ────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={classesSection.title} className="mb-2">
                        <Prose segments={classesSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={identityClasses} columns={4} className="mt-12" />
            </Section>

            {/* ─── SIX AREAS OF RISK ────────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={areasSection.title} className="mb-2">
                        <Prose segments={areasSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={riskAreas} columns={3} className="mt-12" />
            </Section>

            {/* ─── OPERATING MODEL (dark band) ──────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={operatingSection.title} className="mb-2">
                        <Prose segments={operatingSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {operatingPillars.map((pillar) => (
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

            {/* ─── GOVERNANCE ACROSS CLASSES ────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        title="Governance that does not stop at the boundary of a tool"
                        className="mb-6"
                    >
                        <Prose
                            segments={[
                                "Most identity programmes break where one system hands off to another. These are the controls that keep the classes inside a single model, and they stay server-side and policy-driven rather than depending on people remembering a process.",
                            ]}
                        />
                    </SectionHeading>
                </div>

                <CheckList items={governancePoints} className="max-w-3xl" />

                {/* Centred: the heading and tick list above are centred, so a
                    trailing link left-hugging the container reads as a mistake.
                    `ArrowLink` renders an inline-flex anchor, so it follows the
                    parent's text alignment — a plain wrapper is not enough. */}
                <div className="mt-10 flex justify-center">
                    <ArrowLink href="/enterprise">
                        See how OmniPriv runs in enterprise environments
                    </ArrowLink>
                </div>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Identity security you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a diagram of a future state. These are the controls running behind one
                        policy engine today.
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
                subtitle="Common questions about governing human, machine, vendor and AI identities under one privileged access model."
                items={faqs}
            />
        </>
    );
}
