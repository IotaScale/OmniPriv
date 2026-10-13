import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
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

import AboutHero from "@/components/about/AboutHero";
import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { CoreStack } from "@/components/platform/Visuals";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { complianceStandards, solutions, solutionHref } from "@/app/platform/data";
import { cn } from "@/lib/utils";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /about. Everything asserted here traces to something the site already
 * publishes: the module list and complianceStandards in
 * app/platform/data.ts, and the security page. No invented headcount,
 * offices, customers or leadership bios. Built from the shared page kit
 * (components/pageui); values in illustrations are illustrative.
 */

export const metadata: Metadata = {
    title: {
        absolute: "About OmniPriv | Advanced PAM Solutions",
    },
    description:
        "OmniPriv builds privileged access management for on-premise, regulated environments, nine capability modules, with controls mapped to the major compliance frameworks.",
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
        src: "/product/compliance.png",
        alt: "OmniPriv compliance reports view: framework coverage and control status built from the audit trail",
        fit: "contain" as const,
    },
};

const buildSection = {
    title: "What we build",
    lead: [
        "Nine capability modules over one policy engine and one audit trail, the same list the platform index is generated from.",
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
        "On-premise deployment across VMware, Red Hat and OpenStack as a hardware-agnostic appliance",
        "Multi-node clustering with container health checks, heartbeat monitoring and database replication",
        "Strict multi-tenancy through org_id isolation on every resource, schema-per-tenant",
        "Layered key protection, with an external installation key you hold",
        "Break-glass emergency procedure and granular credential restore without a full system restore",
    ],
};

const assuranceSection = {
    title: "Mapped to the frameworks you report against",
    lead: [
        "We would rather be checked than believed. These are the frameworks the platform's controls are mapped to out of the box.",
    ] as RichText,
};

const assurancePillars = [
    {
        icon: ShieldCheck,
        title: "SOC 2",
        text: "Controls mapped to the Trust Services Criteria: security, availability, processing integrity, confidentiality and privacy.",
    },
    {
        icon: Award,
        title: "ISO 27001",
        text: "Controls mapped to the ISO 27001 information security management requirements, across platform operations and development.",
    },
    {
        icon: CreditCard,
        title: "PCI DSS",
        text: "Controls mapped to PCI DSS requirements for environments that handle payment card data.",
    },
    {
        icon: Lock,
        title: "NIST SP 800-53",
        text: "Controls mapped to the federal security and privacy control catalogue that regulated environments are assessed against.",
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
        text: "Control mappings are published rather than implied, so a capability can be checked instead of taken on trust.",
    },
    {
        icon: KeyRound,
        title: "You hold the keys",
        text: "The installation key is generated at installation and stored independently of the platform, so a compromise of our storage is not a compromise of yours.",
    },
];

const closing = {
    title: "See what the platform does before you take our word for it",
    body: [
        "Nine modules, one audit trail, and a deployment model that matches the infrastructure you already run.",
        "We will walk through the capability set and the control mappings against your own environment.",
    ],
    kicker: "On-premise. Mapped to your frameworks. Yours to run.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is OmniPriv built for?",
        answer:
            "On-premise, regulated environments that need to prove what happened to a privileged account. The platform covers the full privileged access lifecycle, vaulting, session control, approval workflow, integration and audit, in nine capability modules that share one policy engine and one audit trail.",
    },
    {
        question: "Does OmniPriv need inbound ports opened to managed systems?",
        answer:
            "No. Privileged connections are brokered through the platform rather than intercepted at the machine, so an inbound port does not have to be opened on the target system.",
    },
    {
        question: "Which compliance frameworks does OmniPriv map to?",
        answer:
            "SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404. Controls are mapped out of the box to those same six frameworks, and reporting templates are available pre-formatted for each of them.",
    },
    {
        question: "Who holds the encryption keys?",
        answer:
            "You do. Data is encrypted at rest and in transit, with a layered key hierarchy protecting stored keys. The installation key is generated at installation and must be stored externally and independently of the platform, then carried forward across upgrades and migrations.",
    },
    {
        question: "Where can I see the full technical specification?",
        answer:
            "The platform index lists every module, and the specification covers deployment model, architecture, supported protocols, high availability, multi-tenancy, encryption, approval principles and disaster recovery. We can also walk through it against your environment on a call.",
    },
];

const NAV = [
    { id: "ab-build", label: "What we build" },
    { id: "ab-deploy", label: "Deployment" },
    { id: "ab-assurance", label: "Frameworks" },
    { id: "ab-principles", label: "Principles" },
    { id: "ab-faq", label: "FAQ" },
];

/* From app/platform/data.ts and this page's own copy. */
const FACTS = [
    { value: solutions.length, label: "capability modules over one policy engine" },
    { value: frameworks.length, label: "compliance frameworks mapped out of the box" },
    { value: 0, label: "hard-coded credentials inside the platform" },
    { value: 0, label: "inbound ports to open on managed systems" },
];

export default function AboutPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="ab-hero" />
            <Spotlight />

            <PageHero
                id="ab-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<AboutHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── WHAT WE BUILD ──────────────────────────────── */}
            <section id="ab-build" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={buildSection.title}>
                        <Prose segments={buildSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {solutions.map((s, i) => (
                            <Link key={s.slug} href={solutionHref(s)} className="aip-card group min-w-0 rounded-3xl border p-6 flex flex-col" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="icon-wrapper transition-colors duration-200 group-hover:bg-[#00B8DB] group-hover:text-[#03121c]">
                                        <s.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <span className="rounded-full border border-slate-900/[0.08] dark:border-white/[0.08] px-2.5 py-1 text-[0.6875rem] font-semibold text-slate-500 dark:text-slate-400">
                                        {s.features.length} capabilities
                                    </span>
                                </div>
                                <h3 className="op-card-title mt-5">{s.title}</h3>
                                <p className="op-card-text mt-2">{s.tagline}</p>
                                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold op-link">
                                    Explore
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── DEPLOYMENT MODEL ───────────────────────────── */}
            <section id="ab-deploy" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={deploymentSection.title} />
                            <Paras items={deploymentSection.paragraphs} className="mt-6" />
                            <CheckList items={deploymentSection.points} className="mt-7" />
                            <ArrowLink href="/platform/infrastructure-deployment" className="mt-7">
                                See the full specification
                            </ArrowLink>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <CoreStack />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FRAMEWORKS (dark band) ─────────────────────── */}
            <div className="dark">
                <section id="ab-assurance" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0 lg:sticky lg:top-40">
                                <Heading title={assuranceSection.title}>
                                    <Prose segments={assuranceSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-8" data-aos="fade-up">
                                    <div className="text-[0.8125rem] font-semibold text-slate-400">Controls mapped out of the box</div>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {frameworks.map((f) => (
                                            <li key={f} className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#7FE3F2]">
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <ArrowLink href="/security" className="mt-6">
                                        Security posture and framework detail
                                    </ArrowLink>
                                </div>
                            </div>
                            <div className="min-w-0 grid sm:grid-cols-2 gap-4">
                                {assurancePillars.map((p, i) => (
                                    <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 2) * 70)}>
                                        <div className="flex items-center justify-between gap-3">
                                            <span className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-[#00B8DB]/40 bg-[#0b0c0e] text-[#00B8DB]">
                                                <p.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="inline-flex items-center gap-1 rounded-full bg-[#00B8DB]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#7FE3F2]">
                                                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Mapped
                                            </span>
                                        </div>
                                        <h3 className="mt-5 text-[1.25rem] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                            {p.title}
                                        </h3>
                                        <p className="op-card-text mt-2">{p.text}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── PRINCIPLES ─────────────────────────────────── */}
            <section id="ab-principles" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={principlesSection.title}>
                        <Prose segments={principlesSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <ul className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {principles.map((p, i) => (
                            <li key={p.title} className="aip-card relative min-w-0 overflow-hidden rounded-3xl border p-6 lg:p-7 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                                <span className="pointer-events-none absolute -right-6 -top-6 text-[#00B8DB]/[0.07]" aria-hidden="true">
                                    <p.icon className="w-28 h-28" strokeWidth={1.2} />
                                </span>
                                <span className="relative icon-wrapper">
                                    <p.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="relative mt-5 text-[1.125rem] font-bold leading-snug tracking-[-0.01em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                    {p.title}
                                </h3>
                                <p className="relative op-card-text mt-2">{p.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["On-premise", "Mapped to your frameworks"]} outcome="Yours to run" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="ab-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
