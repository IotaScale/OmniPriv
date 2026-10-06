import {
    ClipboardCheck,
    KeyRound,
    Lock,
    RotateCcw,
    Shield,
    Terminal,
    Timer,
    Users,
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
 * Bespoke layout for /platform/audit-compliance — the destination of the
 * "Compliance / Prove compliance with evidence" challenge card.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic capability template when the slug appears
 * in its `bespokePages` map. SEO metadata already comes from the module entry
 * in app/platform/data.ts.
 *
 * Claims are limited to what this repository states: the audit-compliance
 * module's five features, the audit capability set on app/features/page.tsx,
 * the segregation-of-duties and immutable-trail statements on
 * app/security/page.tsx, and the cryptographic audit-chain hashing and
 * 4-eyes rule in app/platform/data.ts.
 */

const hero = {
    badge: "Audit, Governance & Compliance",
    titleLead: "When the auditor asks,",
    titleAccent: "the answer should already exist.",
    intro: [
        "Compliance is rarely short of controls. It is short of evidence — the kind that can be produced months later, in the format somebody else asks for.",
    ] as RichText,
    body: [
        "OmniPriv records every privileged action in a tamper-proof audit trail, enforces segregation of duties rather than merely recommending it, and maps that evidence against six regulatory frameworks out of the box.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
    image: {
        src: "https://images.unsplash.com/photo-1754548930574-6a995e5eb5a7?auto=format&fit=crop&w=1200&q=70",
        alt: "A hand ticking checkboxes on a tablet screen, representing audit requirements being satisfied",
    },
};

const framingSection = {
    title: "Most audits fail on evidence, not on controls",
    lead: [
        "Three requirements turn up in nearly every framework, and each one is easy to claim and hard to prove.",
    ] as RichText,
};

const framingCards: IconCard[] = [
    {
        icon: KeyRound,
        title: "Credential hygiene",
        text: "Frameworks require privileged passwords to be complex, rotated regularly and stored securely. Left to manual effort, that requirement quietly stops being true.",
    },
    {
        icon: Lock,
        title: "Granular access limits",
        text: "Unknown, unmanaged and unprotected privileged accounts are a violation on their own. An inventory you cannot produce is a finding waiting to be written up.",
    },
    {
        icon: Users,
        title: "Individual accountability",
        text: "Frameworks expect privileged accounts tied to individual users rather than shared. A shared login can never answer who actually did it.",
    },
];

const trailSection = {
    icon: Shield,
    title: "Accountability that survives an investigation",
    paragraphs: [
        [
            "Every privileged action is written to a complete audit trail — the user, the time, the asset and the outcome — held in tamper-proof storage with cryptographic audit-chain hashing, so integrity and non-repudiation hold up under examination instead of resting on trust.",
        ],
        [
            "Segregation of duties is enforced by the platform rather than agreed in a policy document. Administrators cannot reach the audit logs or alter session recordings they might appear in, and security and operations roles stay separated.",
        ],
    ] as RichText[],
    points: [
        "Complete audit trail — every privileged action logged with user, time, asset and outcome",
        "Cryptographic audit-chain hashing — integrity and non-repudiation, not just retention",
        "Segregation of duties — roles separated, with audit logs out of reach of the administrators they record",
        "Exclusive session access — accounts can be limited to a single concurrent session, so a shared credential cannot be used in parallel",
        "Immutable session recordings and command history, replayable from any point in time",
    ],
};

const standardsSection = {
    title: "Six frameworks, mapped out of the box",
    lead: [
        "Mappings are pre-configured rather than assembled by hand, and the reports already arrive in the shape an auditor expects.",
    ] as RichText,
    standards: [
        "SOC 2",
        "ISO 27001",
        "NIST SP 800-53",
        "HIPAA",
        "PCI DSS",
        "SOX 404",
    ],
    points: [
        "One-click reports pre-formatted for SOC 2, ISO 27001, PCI DSS and HIPAA",
        "Detailed reporting across entitlements, user activity, asset inventory and compliance posture",
        "Scheduled generation — evidence produced on a timetable rather than under deadline pressure",
        "Policy compliance alerts when a privileged account drifts outside its credential policy",
    ],
};

const leastPrivilegeSection = {
    title: "Least privilege, demonstrated rather than asserted",
    lead: [
        "A framework can mandate least privilege. Only the access model can show it was actually enforced.",
    ] as RichText,
};

const leastPrivilegePillars = [
    {
        icon: Timer,
        title: "Nothing standing",
        text: "Just-in-time access is time-boxed to the task and expires automatically, so the standing privilege an auditor objects to never accumulates in the first place.",
    },
    {
        icon: ClipboardCheck,
        title: "Approval with 4-eyes",
        text: "Sensitive grants require a minimum of two independent approvers, no requester may approve their own request, and requests can be driven from an ITSM ticket.",
    },
    {
        icon: Users,
        title: "Granular by role and asset",
        text: "Role-based access control with custom roles assignable at the organization, project or asset level, alongside IP-range and time-window restrictions.",
    },
    {
        icon: Terminal,
        title: "Enforced inside the session",
        text: "Command-level controls whitelist or blacklist specific shell commands, and database query controls do the same for SQL — scope holds after the session opens, not just at login.",
    },
];

const rotationSection = {
    icon: RotateCcw,
    title: "The password requirements nobody keeps up with by hand",
    paragraphs: [
        [
            "Rotation on a calendar, complexity rules, secure storage — every framework asks for them, and every manual process eventually drifts. Automation is the only version of this that stays true a year later.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=1200&q=70",
        alt: "Stacked paperwork and forms, representing audit evidence gathered ahead of a review",
    },
    points: [
        "Encrypted credential vault, and no user ever sees a raw password",
        "Automated rotation of passwords, SSH keys and API tokens on a schedule or on demand, across thousands of assets at once",
        "Credential push to target assets after rotation — no manual step and no outage window",
        "Asset and account discovery across on-prem, cloud and hybrid, so the inventory is generated rather than assembled",
        "Account lifecycle management — provisioning, modification and deprovisioning from one control plane",
    ],
};

const stats = [
    { value: "6", label: "Regulatory frameworks mapped", sub: "SOC 2 through SOX 404" },
    { value: "4", label: "Report formats pre-built", sub: "SOC 2 · ISO 27001 · PCI DSS · HIPAA" },
    { value: "SOC 2", label: "Type II certified", sub: "Independently audited" },
    { value: "100%", label: "Credential vault encryption", sub: "Encrypted at rest and in transit" },
];

const keepReading = [
    { href: "/security", label: "Certifications and security posture" },
    { href: "/case-studies", label: "How customers approached their audits" },
    { href: "/features", label: "See the full capability list" },
];

const closing = {
    title: "Pass the audit, then get back to work",
    body: [
        "OmniPriv turns privileged activity into evidence — logged, hash-chained and mapped to the framework you report against.",
        "Most of the effort in an audit goes into reconstructing what already happened. That work only exists because nobody captured it at the time.",
    ],
    kicker: "Logged. Hashed. Mapped. Ready.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/case-studies", label: "Read the Case Studies" },
};

const faqs: FaqEntry[] = [
    {
        question: "Which regulatory frameworks does OmniPriv map to?",
        answer:
            "OmniPriv ships pre-configured compliance mappings for six frameworks: SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404. Reporting templates are available pre-formatted for the certification set.",
    },
    {
        question: "How is the audit trail tamper-proof?",
        answer:
            "Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, which preserves integrity and non-repudiation rather than simply retaining the entries. Session recordings and command history are immutable, and can be replayed from any point in time.",
    },
    {
        question: "Does OmniPriv support segregation of duties?",
        answer:
            "Yes, and it is enforced by the platform rather than left to policy. Administrators cannot access the audit logs or modify session recordings they might appear in, and security and operations roles are kept separate. Sensitive grants additionally follow a 4-eyes rule with a minimum of two independent approvers.",
    },
    {
        question: "How do we prove who did what if accounts are shared?",
        answer:
            "Shared access is the problem the audit trail is designed to remove. Actions tie back to an authenticated identity rather than a shared login, accounts can be restricted to one concurrent session so a credential cannot be used in parallel, and the full session recording captures what happened inside it.",
    },
    {
        question: "How much effort does producing audit evidence take?",
        answer:
            "Reports are generated from data that was captured as the work happened, not reconstructed afterwards. Detailed reports cover entitlements, user activity, asset inventory and compliance posture, they can be scheduled to run automatically, and the one-click formats for the common frameworks are ready to hand over.",
    },
];

export default function AuditCompliancePage() {
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

            {/* ─── WHY EVIDENCE IS THE GAP ──────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={framingSection.title} className="mb-2">
                        <Prose segments={framingSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={framingCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── THE AUDIT TRAIL ──────────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <div className="icon-wrapper mb-5">
                        <trailSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={trailSection.title}>
                        {trailSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === trailSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>
                </div>

                <CheckList items={trailSection.points} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── THE SIX FRAMEWORKS ──────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={standardsSection.title} className="mb-6">
                        <Prose segments={standardsSection.lead} />
                    </SectionHeading>
                </div>

                <ChipList items={standardsSection.standards} variant="accent" />

                <CheckList items={standardsSection.points} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── LEAST PRIVILEGE (dark band) ──────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={leastPrivilegeSection.title} className="mb-2">
                        <Prose segments={leastPrivilegeSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {leastPrivilegePillars.map((pillar) => (
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

            {/* ─── CREDENTIAL HYGIENE ───────────────── */}
            <Section border="bottom">
                <MediaSplit media={rotationSection.image} ratio="wide-last" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <rotationSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={rotationSection.title}>
                        {rotationSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === rotationSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={rotationSection.points} className="mt-8" />

                    <ArrowLink href="/platform/password-credential-management" className="mt-8">
                        See how credentials are vaulted and rotated
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── OUTCOMES ─────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Compliance you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a policy binder. These are the controls and mappings behind the reports.
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
                subtitle="Common questions about audit trails, segregation of duties and regulatory reporting under privileged access management."
                items={faqs}
            />
        </>
    );
}
