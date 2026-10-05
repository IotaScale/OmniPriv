import {
    Database,
    Globe,
    Key,
    KeyRound,
    Layers,
    Lock,
    Monitor,
    RefreshCw,
    RotateCcw,
    ScanSearch,
    Upload,
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
 * Bespoke layout for /platform/password-credential-management — the
 * destination of "Credential Management" in the platform dropdown.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic template when the slug appears in its
 * `bespokePages` map.
 *
 * All ten features from ../data.ts are represented: rotation, SSH key
 * lifecycle, one-time passwords, validation and de-sync resolution,
 * reconciliation, password groups, history, bulk onboarding, the mobile
 * client and offline device credentials. Figures come from that file and
 * from app/features/page.tsx.
 */

const hero = {
    badge: "Password & Credential Management",
    titleLead: "Nobody holds the secret.",
    titleAccent: "Not even the vault administrator.",
    intro: [
        "A privileged credential is only as safe as the number of people who can read it. OmniPriv vaults every secret and hands out access to the resource — never the password itself.",
    ] as RichText,
    body: [
        "Rotation, validation, reconciliation and SSH key lifecycle run on a policy you configure rather than on somebody remembering. When a stored credential drifts out of step with the live asset, the platform notices and corrects it.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/application-security", label: "See the Encryption Layer" },
    image: {
        src: "https://images.unsplash.com/photo-1614064548237-096f735f344f?auto=format&fit=crop&w=1200&q=70",
        alt: "Closed padlock resting on a laptop keyboard lit by light trails",
    },
};

const lifecycleSection = {
    title: "The lifecycle, without the manual steps",
    lead: [
        "Four stages, each automated, each with the handover between them handled by the platform rather than by a runbook.",
    ] as RichText,
};

const lifecycleCards: IconCard[] = [
    {
        icon: ScanSearch,
        eyebrow: "Discover",
        title: "Know what you are rotating",
        text: "Privileged accounts are discovered across on-prem, cloud and hybrid environments, so the estate you rotate is the estate you actually have.",
    },
    {
        icon: KeyRound,
        eyebrow: "Vault",
        title: "Nobody reads the password",
        text: "Secrets are stored with AES-256 encryption and HSM-backed key protection. No user ever sees a raw password — they authenticate through OmniPriv.",
    },
    {
        icon: RotateCcw,
        eyebrow: "Rotate",
        title: "On your schedule, not ours",
        text: "Policy-driven rotation with configurable recurrence, rotation period and daily start time — applied globally, or per platform and per policy.",
    },
    {
        icon: Upload,
        eyebrow: "Push",
        title: "No step left to a human",
        text: "Updated credentials are pushed out to target assets after rotation, so dependent services keep running without a manual step or an outage window.",
    },
];

const driftSection = {
    icon: RefreshCw,
    title: "When a credential drifts, the platform notices",
    paragraphs: [
        [
            "Out-of-sync credentials are the quiet failure mode of every vault. A password changes on the asset, the vault does not hear about it, and the next administrator to need it finds out the hard way.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1611187400871-4227c006c5e7?auto=format&fit=crop&w=1200&q=70",
        alt: "Black and silver key resting on a laptop keyboard",
    },
    points: [
        "Credential validation — stored secrets are actively tested against the live asset rather than assumed to be correct",
        "De-sync resolution — a corrected password is pushed automatically the moment a mismatch is found",
        "Scheduled reconciliation plans detect and repair out-of-sync or lost passwords without external utilities",
        "MFA required before an updated credential can be viewed",
        "Full password history, versioned and available to approved users for a configured retention period",
    ],
};

const keysSection = {
    title: "Keys, one-time passwords and shared groups",
    lead: [
        "Three cases the simple rotate-and-store model does not cover well, and how OmniPriv handles each.",
    ] as RichText,
};

const keysPillars = [
    {
        icon: Key,
        title: "SSH key lifecycle",
        text: "Key pairs are stored, rotated and pushed through the Change Secret engine. Private keys stay encrypted inside the vault and are never exposed outside it, with a self-service reset workflow for the user.",
    },
    {
        icon: Lock,
        title: "One-time passwords",
        text: "Single-use credentials that rotate the moment they are used, so a password observed in transit is worthless by the time anybody could try to reuse it.",
    },
    {
        icon: Layers,
        title: "Password groups",
        text: "Where several accounts genuinely must share one value, they are grouped — an update propagates instantly to every linked account instead of being applied one at a time.",
    },
    {
        icon: Database,
        title: "Bulk onboarding",
        text: "Mass enrollment of privileged entities, with built-in accounts, privileges, rights and permissions provisioned to your organisational standards rather than left at defaults.",
    },
];

const reachSection = {
    title: "Reachable from anywhere, including offline",
    lead: [
        "Credentials are not much use if the person who needs one cannot reach the vault. Neither are the ones on hardware that is rarely plugged in.",
    ] as RichText,
};

const reachCards: IconCard[] = [
    {
        icon: Monitor,
        eyebrow: "Mobile client",
        title: "No app to install",
        text: "A built-in mobile browser client with TOTP two-factor authentication, ticket approvals, geofencing controls and role-based vault access.",
    },
    {
        icon: Globe,
        eyebrow: "Offline devices",
        title: "Credentials for hard-to-reach kit",
        text: "Devices that rarely connect to the corporate network still have their credentials managed, maintained and kept ready for the day they do.",
    },
    {
        icon: Layers,
        eyebrow: "Account lifecycle",
        title: "Provisioned to deprovisioned",
        text: "Privileged accounts are provisioned, modified and deprovisioned from one control plane, so a leaver does not leave a working credential behind.",
    },
];

const stats = [
    { value: "AES-256", label: "Credential vault encryption", sub: "With SHA-512 and HSM" },
    { value: "0", label: "Users who see a raw password", sub: "Access is brokered" },
    { value: "10", label: "Credential lifecycle controls", sub: "This capability module" },
    { value: "9", label: "Regulatory frameworks mapped", sub: "SOX through ISO 27001" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/workflow-access-control", label: "Application credential management" },
    { href: "/platform/audit-compliance", label: "Proving credential hygiene" },
];

const closing = {
    title: "Put the secrets somewhere nobody can read them",
    body: [
        "OmniPriv vaults, rotates, validates and reconciles every privileged credential — and hands out access instead of passwords.",
        "We will walk through rotation policy, SSH key lifecycle and de-sync handling against your environment.",
    ],
    kicker: "Vaulted. Rotated. Never handed over.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is automated credential rotation?",
        answer:
            "It is the scheduled replacement of privileged passwords, SSH keys and API tokens by the platform itself, rather than by an administrator working through a list. OmniPriv applies a policy with a configurable recurrence, rotation period and daily start time, globally or per platform and per policy.",
    },
    {
        question: "What happens when a stored credential no longer matches the asset?",
        answer:
            "OmniPriv tests stored secrets against the live asset rather than assuming they are correct. When a mismatch is found, the corrected password is pushed back automatically. Scheduled reconciliation plans also detect and repair out-of-sync or lost passwords without needing external utilities.",
    },
    {
        question: "Do administrators ever see the actual password?",
        answer:
            "No. Credentials are held in an encrypted vault with HSM-backed key protection, and users authenticate through OmniPriv rather than being shown the secret. Where a credential has been updated, viewing it requires MFA first, and history is versioned for a configured retention period.",
    },
    {
        question: "How are SSH keys handled differently from passwords?",
        answer:
            "Key pairs go through a full lifecycle rather than a simple rotation: they are stored, rotated and pushed through a dedicated Change Secret engine. Private keys remain encrypted inside the vault and are never exposed outside it, and there is a self-service reset workflow for the user.",
    },
    {
        question: "What about accounts that genuinely have to share a password?",
        answer:
            "Those are handled as password groups. When several accounts must hold the same value, grouping them means an update propagates instantly to every linked account instead of being applied one by one — which is where shared passwords usually fall out of step.",
    },
];

export default function PasswordCredentialManagementPage() {
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

            {/* ─── THE LIFECYCLE ──────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Credential Lifecycle"
                        title={lifecycleSection.title}
                        className="mb-2"
                    >
                        <Prose segments={lifecycleSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={lifecycleCards} columns={4} className="mt-12" />
            </Section>

            {/* ─── DE-SYNC AND RECONCILIATION ─────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={driftSection.image} ratio="wide-last" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <driftSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={driftSection.title}>
                        {driftSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === driftSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={driftSection.points} className="mt-8" />

                    <ArrowLink href="/platform/audit-compliance" className="mt-8">
                        See how this becomes audit evidence
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── KEYS AND GROUPS (dark band) ────────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading badge="Beyond Rotation" title={keysSection.title} className="mb-2">
                        <Prose segments={keysSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {keysPillars.map((pillar) => (
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

            {/* ─── REACH ──────────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading badge="Reach" title={reachSection.title} className="mb-2">
                        <Prose segments={reachSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={reachCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading
                    title="Credential hygiene you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a policy statement. These are the controls standing behind the vault.
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
                subtitle="Common questions about rotation, de-sync resolution, SSH keys and shared credentials."
                items={faqs}
            />
        </>
    );
}
