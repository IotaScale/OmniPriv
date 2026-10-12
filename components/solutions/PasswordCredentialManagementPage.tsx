import { Database, Globe, Key, KeyRound, Layers, Lock, Monitor, RefreshCw, RotateCcw, ScanSearch, Upload } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import VaultFlow from "@/components/credentials/VaultFlow";
import { BulkVisual, DriftVisual, GroupVisual, OtpVisual, SshVisual } from "@/components/credentials/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * Bespoke layout for /platform/password-credential-management, the
 * destination of "Credential Management" in the platform dropdown.
 *
 * Routing belongs to app/platform/[slug]/page.tsx; SEO metadata comes from
 * the module entry in app/platform/data.ts.
 *
 * Built from the shared page kit (components/pageui) so it matches /ai-pam:
 * live hero visual, figures strip, on-this-page bar, bento cards with small
 * product illustrations, one dark band, the closing band and the split FAQ.
 * All ten features of the module are covered. Sample values in the
 * illustrations are illustrative.
 */

const hero = {
    badge: "Password & Credential Management",
    titleLead: "Nobody holds the secret.",
    titleAccent: "Not even the vault administrator.",
    intro: [
        "A privileged credential is only as safe as the number of people who can read it. OmniPriv vaults every secret and hands out access to the resource, never the password itself.",
    ] as RichText,
    body: [
        "Rotation, validation, reconciliation and SSH key lifecycle run on a policy you configure rather than on somebody remembering. When a stored credential drifts out of step with the live asset, the platform notices and corrects it.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/application-security", label: "See the Encryption Layer" },
    image: {
        src: "/challenges/defend-ai-driven-threats.jpeg",
        alt: "Privileged credentials and keys held in a governed vault",
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
        text: "Secrets are stored in an encrypted vault with hardware-backed key protection. No user ever sees a raw password, they authenticate through OmniPriv.",
    },
    {
        icon: RotateCcw,
        eyebrow: "Rotate",
        title: "On your schedule, not ours",
        text: "Policy-driven rotation with configurable recurrence, rotation period and daily start time, applied globally, or per platform and per policy.",
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
        "Credential validation, stored secrets are actively tested against the live asset rather than assumed to be correct",
        "De-sync resolution, a corrected password is pushed automatically the moment a mismatch is found",
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
        text: "Where several accounts genuinely must share one value, they are grouped, an update propagates instantly to every linked account instead of being applied one at a time.",
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
        text: "A built-in mobile browser client with TOTP two-factor authentication, ticket approvals and role-based vault access.",
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

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/workflow-access-control", label: "Application credential management" },
    { href: "/privileged-access-audit-compliance", label: "Proving credential hygiene" },
];

const closing = {
    title: "Put the secrets somewhere nobody can read them",
    body: [
        "OmniPriv vaults, rotates, validates and reconciles every privileged credential, and hands out access instead of passwords.",
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
            "Those are handled as password groups. When several accounts must hold the same value, grouping them means an update propagates instantly to every linked account instead of being applied one by one, which is where shared passwords usually fall out of step.",
    },
];


const NAV = [
    { id: "pcm-lifecycle", label: "Lifecycle" },
    { id: "pcm-drift", label: "Validation & reconciliation" },
    { id: "pcm-keys", label: "Keys, OTP & groups" },
    { id: "pcm-reach", label: "Anywhere access" },
    { id: "pcm-faq", label: "FAQ" },
];

const FACTS = [
    { value: 0, label: "users who ever see a raw privileged password" },
    { value: 4, label: "lifecycle stages automated: discover, vault, rotate, push" },
    { value: 10, label: "credential lifecycle controls in this module" },
    { value: 3, suffix: "-tier", label: "encryption key hierarchy: KEK, DEK and SEK" },
];

const KEY_VISUAL = [SshVisual, OtpVisual, GroupVisual, BulkVisual];

export default function PasswordCredentialManagementPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="pcm-hero" />
            <Spotlight />

            <PageHero
                id="pcm-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<VaultFlow />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── LIFECYCLE ─────────────────────────────────────── */}
            <section id="pcm-lifecycle" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={lifecycleSection.title}>
                        <Prose segments={lifecycleSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body relative">
                        <ol className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {lifecycleCards.map((c, i) => (
                                <li key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                    <div className="flex items-center gap-3">
                                        <span className="relative z-10 inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-[#00B8DB] text-[#03121c] shadow-[0_0_0_6px_rgba(0,184,219,0.1)]">
                                            <c.icon className="w-5 h-5" aria-hidden="true" />
                                        </span>
                                        <span className="text-[0.8125rem] font-semibold op-link">
                                            {i + 1}. {c.eyebrow}
                                        </span>
                                    </div>
                                    <h3 className="op-card-title mt-5">{c.title}</h3>
                                    <p className="op-card-text mt-2">{c.text}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* ─── VALIDATION & RECONCILIATION ───────────────────── */}
            <section id="pcm-drift" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={driftSection.title} />
                            <Paras items={driftSection.paragraphs} className="mt-6" />
                            <CheckList items={driftSection.points} className="mt-8" />
                        </div>
                        <div className="min-w-0 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <DriftVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── KEYS, OTP, GROUPS, BULK (bento) ──────────────── */}
            <section id="pcm-keys" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={keysSection.title}>
                        <Prose segments={keysSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-5 sm:grid-cols-2">
                        {keysPillars.map((p, i) => {
                            const V = KEY_VISUAL[i];
                            return (
                                <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col gap-5" data-aos="fade-up" data-aos-delay={String((i % 2) * 80)}>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="icon-wrapper">
                                                <p.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <h3 className="op-card-title">{p.title}</h3>
                                        </div>
                                        <p className="op-card-text mt-4">{p.text}</p>
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

            {/* ─── ANYWHERE ACCESS (dark band) ──────────────────── */}
            <div className="dark">
                <section id="pcm-reach" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <Heading title={reachSection.title}>
                            <Prose segments={reachSection.lead} className="text-[1.0625rem]" />
                        </Heading>
                        <div className="op-body grid gap-5 md:grid-cols-3">
                            {reachCards.map((c, i) => (
                                <article key={c.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                        <c.icon className="w-6 h-6" aria-hidden="true" />
                                    </span>
                                    <div className="mt-5 text-[0.8125rem] font-semibold text-[#7FD9EA]">{c.eyebrow}</div>
                                    <h3 className="op-card-title mt-1 text-[1.1875rem]">{c.title}</h3>
                                    <p className="op-card-text mt-2">{c.text}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── KEEP READING ─────────────────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Vaulted", "Rotated", "Validated"]} outcome="Never handed over" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="pcm-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
