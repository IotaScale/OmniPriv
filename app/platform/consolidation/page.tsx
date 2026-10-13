import type { Metadata } from "next";
import { Layers, Server, ShieldCheck } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { ConsolidationHero, RetireMap, RunLoad, TopologyVisual } from "@/components/consolidation/Visuals";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /platform/consolidation, the destination of the "Consolidate PAM &
 * Identity Security" challenge card.
 *
 * A real route rather than an entry in the bespokePages map, for the same
 * reason as its sibling /platform/identity-security: a static segment takes
 * precedence over the neighbouring [slug] route, so this needs no module
 * entry in ../data.ts and the capability count stays at nine.
 *
 * Built from the shared page kit (components/pageui) so it matches the
 * other redesigned pages. Copy is unchanged; values inside illustrations
 * are illustrative.
 *
 * Every figure below is OmniPriv's own, taken from ../data.ts: the nine
 * modules, 80+ requirement points and the compliance mappings
 * vault. The deployment points mirror app/enterprise/page.tsx.
 */

export const metadata: Metadata = {
    title: { absolute: "Consolidate PAM & Identity Security | OmniPriv" },
    description:
        "Bring privileged access, identity controls, credential security, session monitoring, and policy enforcement together in one unified OmniPriv platform.",
};

const hero = {
    badge: "Consolidate PAM & Identity Security",
    titleLead: "Five tools. Five consoles.",
    titleAccent: "One platform.",
    intro: [
        "Most privileged access estates grew one purchase at a time, a vault, a session recorder, a workflow tool, a reporting add-on, and a spreadsheet quietly holding it together.",
    ] as RichText,
    body: [
        "OmniPriv covers the same ground in a single platform: nine capability modules, one policy engine, one credential store and one audit trail, deployed on infrastructure you already own.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "See All Nine Capabilities" },
    image: {
        src: "/challenges/consolidate-pam-identity-security.jpeg",
        alt: "One control point governing human, machine and AI access across connected systems",
    },
};

const benefitsSection = {
    title: "Fewer tools, less to go wrong",
    lead: [
        "Each addition bought a licence, a console, an integration to maintain, and one more place for a gap to hide. Consolidation is not really about a smaller invoice, it is about one policy engine giving one answer, once, to every identity that asks.",
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
        text: "Silos are where risk hides. Nobody should have to reconcile two consoles to find out whether an identity still has access, the answer lives in one place.",
    },
    {
        icon: Server,
        title: "Less to run",
        text: "One platform to upgrade instead of five, on infrastructure you already own, with no per-tool appliance to patch.",
    },
];

const retireSection = {
    title: "Five tools, one platform",
    lead: [
        "Consolidating is only worth doing if the replacement genuinely covers what the point tools did. These are the jobs the capability modules take over.",
    ] as RichText,
};

const retiredTools = [
    "The standalone credential vault, rotation, SSH key lifecycle and password reconciliation move into the platform",
    "The separate session recorder: SSH, RDP, VNC, HTTP and database sessions recorded and searchable in the same console",
    "The bolt-on reporting tool, six regulatory mappings and scheduled reports, built in rather than licensed separately",
    "The email-and-spreadsheet approval chain: 4-eyes and multi-level workflows enforced by policy instead of habit",
    "The separate analytics licence: 39-feature behavioural scoring running on every closed session",
];

const ownershipSection = {
    title: "One platform, on your own infrastructure",
    lead: [
        "Consolidating onto a service you do not control simply trades one dependency for a larger one. OmniPriv runs where your other critical systems run.",
    ] as RichText,
    points: [
        "Runs on your own infrastructure, on-premises, private cloud or public cloud, in any topology",
        "Standalone, active-standby or a full HA cluster, with multi-node clustering and database replication",
        "Strict multi-tenancy with per-organization isolation and RBAC, for MSSPs and enterprises with subsidiaries",
        "Break-glass emergency access with granular credential restore, without a full system restore",
        "Custom connectors through an open SDK, so there is no vendor lock-in",
    ],
};

const stats = [
    { value: "9", label: "Capability modules", sub: "One policy engine" },
    { value: "6", label: "Regulatory frameworks", sub: "SOC 2 through SOX 404" },
    { value: "80+", label: "Requirement points covered", sub: "Enterprise PAM coverage" },
    { value: "100%", label: "Credential vault encryption", sub: "Encrypted at rest and in transit" },
];

const keepReading = [
    { href: "/platform", label: "Browse all nine capabilities" },
    { href: "/platform/identity-security", label: "How the identities fit together" },
    { href: "/features", label: "See the full capability list" },
];

const closing = {
    title: "Replace the stack, then stop maintaining it",
    body: [
        "OmniPriv brings vaulting, session control, workflow, threat detection and reporting into one platform.",
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
            "It means replacing several single-purpose tools, typically a credential vault, a session recording appliance, a workflow or approval tool and a reporting add-on, with one platform that performs all of those jobs against a single policy engine and a single audit trail.",
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
            "No. OmniPriv integrates with the systems you already run: SIEM platforms, ITSM and ticketing, LDAP and Active Directory, and standard single sign-on protocols, and custom connectors can be built through an open SDK. The aim is fewer consoles for privileged access, not fewer connections to the rest of your estate.",
    },
    {
        question: "Where should we start?",
        answer:
            "Start with inventory rather than migration. Discovery turns an unknown estate of privileged accounts into a list you can prioritise, and most teams find stale or orphaned accounts they did not know about before they change a single policy. Enforcement is much easier once the scope is known.",
    },
];

const NAV = [
    { id: "co-benefits", label: "Fewer tools" },
    { id: "co-retire", label: "What you retire" },
    { id: "co-ownership", label: "Your infrastructure" },
    { id: "co-faq", label: "FAQ" },
];

/* The four figures this page already states, in the shared figures strip. */
const FACTS = [
    { value: 9, label: `${stats[0].label} · ${stats[0].sub}` },
    { value: 6, label: `${stats[1].label} · ${stats[1].sub}` },
    { value: 80, suffix: "+", label: `${stats[2].label} · ${stats[2].sub}` },
    { value: 100, suffix: "%", label: `${stats[3].label} · ${stats[3].sub}` },
];

export default function ConsolidationPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="co-hero" />
            <Spotlight />

            <PageHero
                id="co-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<ConsolidationHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── FEWER TOOLS ──────────────────────── */}
            <section id="co-benefits" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={benefitsSection.title}>
                                <Prose segments={benefitsSection.lead} className="text-[1.0625rem]" />
                            </Heading>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <RunLoad />
                        </div>
                    </div>
                    <ul className="op-body grid gap-4 md:grid-cols-3">
                        {benefits.map((b, k) => (
                            <li key={b.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7" data-aos="fade-up" data-aos-delay={String(k * 70)}>
                                <div className="flex items-center gap-3">
                                    <span className="icon-wrapper shrink-0">
                                        <b.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title">{b.title}</h3>
                                </div>
                                <p className="op-card-text mt-4">{b.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── WHAT YOU RETIRE ──────────────────── */}
            <section id="co-retire" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={retireSection.title}>
                                <Prose segments={retireSection.lead} className="text-[1.0625rem]" />
                            </Heading>
                            <CheckList items={retiredTools} className="mt-7" />
                            <ArrowLink href="/platform" className="mt-7">
                                See what replaces each one
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <RetireMap />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── OWNERSHIP (dark band) ────────────── */}
            <div className="dark">
                <section id="co-ownership" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                                <TopologyVisual />
                            </div>
                            <div className="min-w-0 order-1 lg:order-2">
                                <Heading title={ownershipSection.title}>
                                    <Prose segments={ownershipSection.lead} className="text-[1.0625rem] text-slate-600 dark:text-slate-400" />
                                </Heading>
                                <CheckList items={ownershipSection.points} className="mt-7" />
                                <ArrowLink href="/enterprise" className="mt-7">
                                    See enterprise deployment options
                                </ArrowLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── CONSOLIDATION YOU CAN POINT AT / KEEP READING ── */}
            <section className={sectionLine}>
                <div className="container-xl py-12 lg:py-14">
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2" data-aos="fade-up">
                        <h2 className="op-h3">Consolidation you can point at</h2>
                        <p className="max-w-xl text-[0.9375rem] text-slate-600 dark:text-slate-400">
                            Not a slide about reducing tool count. These are the numbers behind it.
                        </p>
                    </div>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                lead={closing.kicker}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="co-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
