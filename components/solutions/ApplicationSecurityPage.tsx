import { AlertTriangle, Database, Fingerprint, Key, Lock, Shield, UserCheck } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import EnvelopeHero from "@/components/appsec/EnvelopeHero";
import { ChainVisual, IsolationVisual, KeystrokeVisual, MfaVisual, PathVisual } from "@/components/appsec/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/application-security ("Application Security &
 * Encryption"). Routing belongs to app/platform/[slug]/page.tsx; SEO metadata
 * comes from the module entry in app/platform/data.ts.
 *
 * All ten features of the module are represented. Built from the shared
 * page kit (components/pageui). Sample values in illustrations are
 * illustrative.
 */

const hero = {
    badge: "Application Security & Encryption",
    titleLead: "Assume the perimeter is already gone.",
    titleAccent: "Encrypt and verify anyway.",
    intro: [
        "OmniPriv is built on the assumption that something will eventually end up somewhere it should not. Every secret is encrypted, every component talks over mutual TLS, and every login can be made to prove more than a password.",
    ] as RichText,
    body: [
        "Multi-factor authentication is enforced up front, a layered key hierarchy protects what is stored, and cryptographic hash-chaining protects what is recorded, so integrity holds even when the storage layer underneath is not trusted.",
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
        text: "An administrator cannot reach credentials or approve requests outside their defined role boundaries, enforced at every access layer, not only in the interface.",
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
        "A layered key hierarchy (KEK, DEK, SEK) protects stored keys",
        "Envelope encryption covering data at rest and in transit",
        "Mutual authentication between platform components, so nothing crosses the wire in plaintext at any layer",
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
        text: "Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, preserving integrity and non-repudiation, not merely retaining entries.",
    },
    {
        icon: Key,
        title: "Zero hard-coded credentials",
        text: "The platform itself contains no hard-coded credentials. Every secret it uses is vault-managed and auditable, including the ones that keep the platform running.",
    },
    {
        icon: Lock,
        title: "Independent key backup",
        text: "The installation key is generated at installation and must be stored externally and independently of the platform, then carried forward across upgrades and migrations.",
    },
    {
        icon: Database,
        title: "Encrypted backups",
        text: "Backups are fully encrypted with independent, secure key management, so a stolen backup is not a stolen credential store.",
    },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/password-credential-management", label: "How credentials are vaulted" },
    { href: "/security", label: "Framework mappings and security posture" },
];

const closing = {
    title: "Put the encryption where the risk actually is",
    body: [
        "MFA at the front, layered keys behind it, mutual authentication between every component and hash-chained records underneath.",
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
            "Sensitive data is encrypted both at rest and in transit, with a layered key hierarchy (KEK, DEK, SEK) protecting the keys. Traffic between the platform's own components is mutually authenticated and encrypted, so there is no plaintext layer inside the stack.",
    },
    {
        question: "What is the installation key and why does it need separate storage?",
        answer:
            "It is the key generated when the platform is installed, and it must be stored externally and independently of OmniPriv itself. Keeping it separate is what stops a compromise of the platform's storage from also handing over the means to decrypt what is in it, and it has to be carried forward across upgrades and migrations.",
    },
    {
        question: "Does the platform itself contain any hard-coded credentials?",
        answer:
            "No. OmniPriv contains zero hard-coded credentials, every secret it uses is vault-managed and auditable. That is a deliberate design constraint rather than a configuration option, because a hard-coded credential is one that no rotation policy can ever reach.",
    },
];


const NAV = [
    { id: "as-verify", label: "Verification" },
    { id: "as-encrypt", label: "Encryption" },
    { id: "as-custody", label: "Integrity & key custody" },
    { id: "as-faq", label: "FAQ" },
];

const FACTS = [
    { value: 3, suffix: "-tier", label: "key hierarchy: KEK, DEK and SEK" },
    { value: 5, label: "second-factor methods, from biometrics to email codes" },
    { value: 50, label: "audit rows per HMAC-SHA256 checkpoint, verified every 5 minutes" },
    { value: 0, label: "hard-coded credentials inside the platform" },
];

const VERIFY_VISUAL = [MfaVisual, KeystrokeVisual, IsolationVisual];

export default function ApplicationSecurityPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="as-hero" />
            <Spotlight />

            <PageHero
                id="as-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<EnvelopeHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── VERIFICATION ───────────────────────────────────── */}
            <section id="as-verify" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={verificationSection.title}>
                        <Prose segments={verificationSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 md:grid-cols-3">
                        {verificationCards.map((c, i) => {
                            const V = VERIFY_VISUAL[i];
                            return (
                                <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col gap-5" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper">
                                                <c.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="text-[0.8125rem] font-semibold op-link">{c.eyebrow}</span>
                                        </div>
                                        <h3 className="op-card-title mt-5">{c.title}</h3>
                                        <p className="op-card-text mt-2">{c.text}</p>
                                    </div>
                                    <div className="mt-auto">
                                        <V />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── ENCRYPTION ─────────────────────────────────────── */}
            <section id="as-encrypt" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={encryptionSection.title} />
                            <Paras items={encryptionSection.paragraphs} className="mt-6" />
                            <CheckList items={encryptionSection.points} className="mt-8" />
                            <ArrowLink href="/security" className="mt-8">
                                See the framework mappings behind it
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <PathVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── KEY CUSTODY (dark band) ────────────────────────── */}
            <div className="dark">
                <section id="as-custody" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                <Heading title={custodySection.title}>
                                    <Prose segments={custodySection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                                    {custodyPillars.map((p, i) => (
                                        <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 2) * 70)}>
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                                <p.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h3 className="op-card-title mt-5">{p.title}</h3>
                                            <p className="op-card-text mt-2">{p.text}</p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                                <ChainVisual />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── KEEP READING ───────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Encrypted in transit", "Encrypted at rest"]} outcome="Hash-chained throughout" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="as-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
