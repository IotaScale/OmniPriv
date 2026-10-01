import {
    AlertTriangle,
    Database,
    Fingerprint,
    Key,
    Lock,
    Network,
    Shield,
    UserCheck,
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
 * Bespoke layout for /platform/application-security — the destination of
 * "Application Security" in the platform dropdown.
 *
 * Routing still belongs to app/platform/[slug]/page.tsx, which renders this
 * component instead of the generic template when the slug appears in its
 * `bespokePages` map.
 *
 * All ten features from ../data.ts are represented: MFA, HSM integration,
 * adaptive MFA, SHA-512/AES-256-GCM, mutually encrypted component traffic,
 * encrypted backups, role-based access isolation, tamper-proof audit
 * storage, zero hard-coded credentials and the independent SECRET_KEY.
 */

const hero = {
    badge: "Application Security & Encryption",
    titleLead: "Assume the perimeter is already gone.",
    titleAccent: "Encrypt and verify anyway.",
    intro: [
        "OmniPriv is built on the assumption that something will eventually end up somewhere it should not. Every secret is encrypted, every component talks over mutual TLS, and every login can be made to prove more than a password.",
    ] as RichText,
    body: [
        "Multi-factor authentication is enforced up front, HSM-backed keys protect what is stored, and cryptographic hash-chaining protects what is recorded — so integrity holds even when the storage layer underneath is not trusted.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/password-credential-management", label: "See Credential Vaulting" },
    image: {
        src: "https://images.unsplash.com/photo-1675602488512-bdd631490fcb?auto=format&fit=crop&w=1200&q=70",
        alt: "Close-up of a computer chip mounted on a printed circuit board",
    },
};

const verificationSection = {
    title: "Verification before authorization",
    lead: [
        "Identity is checked continuously rather than once. Nothing in the platform treats a successful login as proof of anything that happens afterwards.",
    ] as RichText,
};

const verificationCards: IconCard[] = [
    {
        icon: Fingerprint,
        eyebrow: "Multi-factor",
        title: "The factor your users actually carry",
        text: "Biometric, hardware token, TOTP, SMS-based two-factor and email one-time codes are all supported, so the second factor can match the hardware your people already have.",
    },
    {
        icon: AlertTriangle,
        eyebrow: "Keystroke dynamics",
        title: "Adaptive MFA at login",
        text: "Keystroke rhythm, speed and pattern are compared against the identity's learned baseline. A drift triggers an MFA challenge automatically rather than being logged and ignored.",
    },
    {
        icon: UserCheck,
        eyebrow: "Role boundaries",
        title: "Isolation between administrators",
        text: "An administrator cannot reach credentials or approve requests outside their defined role boundaries — enforced at every access layer, not only in the interface.",
    },
];

const encryptionSection = {
    icon: Lock,
    title: "Encrypted at rest, in transit, and between components",
    paragraphs: [
        [
            "Encryption only means something if it covers the whole path. Stored credentials, data in flight, and the internal traffic between OmniPriv's own components are each encrypted separately, so no single layer is the only thing standing between an attacker and a secret.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1617839625591-e5a789593135?auto=format&fit=crop&w=1200&q=70",
        alt: "Printed circuit board showing intricate gold conductive pathways and solder points",
    },
    points: [
        "HSM integration — a hardware security module provides root-of-trust protection for stored keys",
        "SHA-256 and SHA-512 with AES-256-GCM envelope encryption, covering data at rest and in transit",
        "Mutual TLS between platform components, so nothing crosses the wire in plaintext at any layer",
    ],
};

const custodySection = {
    title: "Integrity and key custody",
    lead: [
        "The harder question is not whether data is encrypted, but who holds the keys and whether anyone could change the record afterwards.",
    ] as RichText,
};

const custodyPillars = [
    {
        icon: Shield,
        title: "Tamper-proof audit storage",
        text: "Audit records are held in tamper-proof storage with cryptographic audit-chain hashing — preserving integrity and non-repudiation, not merely retaining entries.",
    },
    {
        icon: Key,
        title: "Zero hard-coded credentials",
        text: "The platform itself contains no hard-coded credentials. Every secret it uses is vault-managed and auditable, including the ones that keep the platform running.",
    },
    {
        icon: Lock,
        title: "Independent key backup",
        text: "The SECRET_KEY is generated at installation and must be stored externally and independently of the platform, then carried forward across upgrades and migrations.",
    },
    {
        icon: Database,
        title: "Encrypted backups",
        text: "Backups are fully encrypted with independent, secure key management, so a stolen backup is not a stolen credential store.",
    },
];

const stats = [
    { value: "AES-256", label: "Envelope encryption", sub: "With SHA-512, at rest and in transit" },
    { value: "HSM", label: "Root-of-trust key protection", sub: "Hardware security module" },
    { value: "mTLS", label: "Between platform components", sub: "No plaintext on the wire" },
    { value: "0", label: "Hard-coded credentials", sub: "Every secret vault-managed" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/password-credential-management", label: "How credentials are vaulted" },
    { href: "/security", label: "Certifications and security posture" },
];

const closing = {
    title: "Put the encryption where the risk actually is",
    body: [
        "MFA at the front, HSM-backed keys behind it, mutual TLS between every component and hash-chained records underneath.",
        "We will walk through the encryption model and the key custody arrangements against your environment.",
    ],
    kicker: "Encrypted in transit. Encrypted at rest. Hash-chained throughout.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "Which multi-factor authentication methods are supported?",
        answer:
            "Biometric factors, hardware tokens, TOTP authenticator apps, SMS-based two-factor and email one-time codes. Supporting several matters in practice, because a second factor only helps if the people who need it are willing and able to use it.",
    },
    {
        question: "What is adaptive MFA, and how does keystroke analysis work?",
        answer:
            "Keystroke dynamics are the rhythm, speed and pattern of how a person types. OmniPriv compares those characteristics against the identity's learned baseline at login, and a meaningful deviation triggers an MFA challenge automatically rather than being recorded and left alone.",
    },
    {
        question: "How is data encrypted at rest and in transit?",
        answer:
            "Sensitive data is encrypted with SHA-256 and SHA-512 hashing and AES-256-GCM envelope encryption, both at rest and in transit, with a hardware security module providing root-of-trust key protection. Traffic between the platform's own components is mutually TLS-encrypted, so there is no plaintext layer inside the stack.",
    },
    {
        question: "What is the SECRET_KEY and why does it need separate storage?",
        answer:
            "It is the key generated when the platform is installed, and it must be stored externally and independently of OmniPriv itself. Keeping it separate is what stops a compromise of the platform's storage from also handing over the means to decrypt what is in it, and it has to be carried forward across upgrades and migrations.",
    },
    {
        question: "Does the platform itself contain any hard-coded credentials?",
        answer:
            "No. OmniPriv contains zero hard-coded credentials — every secret it uses is vault-managed and auditable. That is a deliberate design constraint rather than a configuration option, because a hard-coded credential is one that no rotation policy can ever reach.",
    },
];

export default function ApplicationSecurityPage() {
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

            {/* ─── VERIFICATION ───────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Identity Verification"
                        title={verificationSection.title}
                        className="mb-2"
                    >
                        <Prose segments={verificationSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={verificationCards} columns={3} className="mt-12" />
            </Section>

            {/* ─── ENCRYPTION LAYERS ──────────────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={encryptionSection.image} ratio="even" height="sm" align="start">
                    <div className="icon-wrapper mb-5">
                        <encryptionSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={encryptionSection.title}>
                        {encryptionSection.paragraphs.map((paragraph, index) => (
                            <Prose
                                key={index}
                                segments={paragraph}
                                className={
                                    index === encryptionSection.paragraphs.length - 1 ? "" : "mb-4"
                                }
                            />
                        ))}
                    </SectionHeading>

                    <CheckList items={encryptionSection.points} className="mt-8" />

                    <ArrowLink href="/security" className="mt-8">
                        See the certifications behind it
                    </ArrowLink>
                </MediaSplit>
            </Section>

            {/* ─── KEY CUSTODY (dark band) ────────────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading badge="Key Custody" title={custodySection.title} className="mb-2">
                        <Prose segments={custodySection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {custodyPillars.map((pillar) => (
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

            {/* ─── OUTCOMES ───────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title="Encryption you can point at"
                    align="center"
                    size="lg"
                    className="mb-12 sm:mb-16"
                >
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Not a trust statement. These are the mechanisms standing behind it.
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
                subtitle="Common questions about authentication factors, encryption and key custody."
                items={faqs}
            />
        </>
    );
}
