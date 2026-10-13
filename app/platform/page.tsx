import type { Metadata } from "next";
import { ArrowRight, Building2, Layers, Server, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import CountUp from "@/components/home/CountUp";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import PlatformHero from "@/components/platform/PlatformHero";
import { ConsoleMock, CoreStack } from "@/components/platform/Visuals";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import { solutions, datasheetStats, complianceStandards, solutionHref } from "./data";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { RichText } from "@/lib/rich-text";

/*
 * /platform, the capability index.
 *
 * Built from the shared page kit (components/pageui) so it matches the nine
 * module pages it links to. The module grid is driven straight from
 * ./data.ts, so adding a module there adds its card here with no code change.
 *
 * Everything quoted comes from ./data.ts: the module list, datasheetStats
 * and complianceStandards. Sample values in illustrations are illustrative.
 */

export const metadata: Metadata = {
    title: "Platform: Enterprise PAM Capabilities & Specifications",
    description:
        "Explore OmniPriv's 9 core PAM capability modules covering 80+ enterprise requirements, compliance mappings, and on-premise deployment specifications.",
};

const hero = {
    badge: "Enterprise PAM Platform",
    titleLead: "Nine capabilities.",
    titleAccent: "One policy engine.",
    intro: [
        "Privileged access work usually ends up spread across a vault, a session recorder, a workflow tool and a reporting add-on. OmniPriv covers the same ground in one platform you run on your own infrastructure.",
    ] as RichText,
    body: [
        "Each module below addresses one part of the privileged access lifecycle. They share one credential store, one policy engine and one audit trail, so an identity cannot move between them to escape a control.",
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform/identity-security", label: "See How It Fits Together" },
    image: {
        src: "/product/dashboard.png",
        alt: "OmniPriv platform dashboard with risk posture, compliance score and asset health",
        fit: "contain" as const,
    },
};

const architectureSection = {
    title: "One platform, on your own infrastructure",
    lead: [
        "The deployment model is part of the security argument. OmniPriv runs where your other critical systems run, on hardware you already own.",
    ] as RichText,
};

const architecturePillars = [
    {
        icon: Zap,
        title: "Deployed as a software appliance",
        text: "Delivered as a single hardware-agnostic software appliance, so it can be deployed on the infrastructure you already run.",
    },
    {
        icon: Server,
        title: "Your topology, your hardware",
        text: "Deploys on-premise across VMware, Red Hat and OpenStack as a hardware-agnostic software appliance. Multi-node clustering, health checks, database replication and load balancing for high availability.",
    },
    {
        icon: Building2,
        title: "Strict tenant isolation",
        text: "Isolation via org_id on every resource, with per-organization RBAC, built for MSSPs and enterprises running subsidiaries from one platform.",
    },
    {
        icon: ShieldCheck,
        title: "Evidence that holds up",
        text: "Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, preserving integrity and non-repudiation rather than simply retaining entries.",
    },
];

const consoleSection = {
    icon: Layers,
    title: "One console, one credential repository",
    paragraphs: [
        [
            "Consolidation only counts if the day-to-day work actually moves. Administrators get a single web console and a CLI against a central credential repository, instead of a different interface for vaulting, sessions, approvals and reporting.",
        ],
    ] as RichText[],
    image: {
        src: "https://images.unsplash.com/photo-1663932210347-164a05ed0ccd?auto=format&fit=crop&w=1200&q=70",
        alt: "Network switch with blue and black structured cabling",
    },
    points: [
        "Browser console across Edge, Chrome, Firefox and Safari, plus a command-line interface",
        "A built-in mobile browser client with TOTP and approvals, no app to install",
        "Centralised administration in a single UI with one credential repository",
        "Credentials encrypted at rest and in transit, with a layered key hierarchy",
    ],
};

const standardsSection = {
    title: "Six frameworks, mapped out of the box",
    lead: [
        "Compliance mappings are pre-configured rather than assembled by hand, and the reports arrive in the shape an auditor expects.",
    ] as RichText,
};

const keepReading = [
    { href: "/platform/identity-security", label: "How the identities fit together" },
    { href: "/platform/consolidation", label: "Consolidating a fragmented PAM stack" },
    { href: "/features", label: "The full capability list" },
];

const closing = {
    title: "See the whole platform, not one module",
    body: [
        "Request a demo or talk to our engineering team about your deployment requirements.",
        "We will walk through the modules that matter to your environment and the ones you can ignore for now.",
    ],
    kicker: "Nine capabilities. One credential store. One audit trail.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/enterprise", label: "Enterprise Deployment" },
};

const faqs: FaqEntry[] = [
    {
        question: "What is the OmniPriv platform?",
        answer:
            "OmniPriv is a privileged access management platform delivered as a software appliance you deploy on your own infrastructure. It covers credential management, session management, workflow and approval, audit and compliance, threat detection, application security, enterprise integration, infrastructure and deployment, and AI agent governance.",
    },
    {
        question: "Are the nine modules separate products?",
        answer:
            "They are capability modules of one platform rather than separate tools bolted together. That distinction is the point: they share a single credential store, a single policy engine and a single audit trail, so access granted in one area is visible and governed in all of them.",
    },
    {
        question: "Does OmniPriv need inbound ports opened to managed systems?",
        answer:
            "No. Privileged connections are brokered through the platform rather than intercepted at the machine, so an inbound port does not have to be opened on the target system.",
    },
    {
        question: "Where can OmniPriv be deployed?",
        answer:
            "On-premise across VMware, Red Hat and OpenStack or other OpenSource-based platforms, and in private or public cloud. It supports standalone, active-standby and full high-availability cluster topologies, with multi-node clustering, database replication and load balancing.",
    },
    {
        question: "Which regulatory frameworks does OmniPriv map to?",
        answer:
            "Six, with pre-configured mappings: SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404. Audit records are held in tamper-proof storage with cryptographic audit-chain hashing, and reports can be generated on a schedule.",
    },
];

const NAV = [
    { id: "pl-modules", label: "Modules" },
    { id: "pl-architecture", label: "Architecture" },
    { id: "pl-console", label: "One console" },
    { id: "pl-compliance", label: "Compliance" },
    { id: "pl-figures", label: "Figures" },
    { id: "pl-faq", label: "FAQ" },
];

/* Taken from the copy on this page: one store, one engine, one trail, no inbound ports. */
const FACTS = [
    { value: 1, label: "credential store shared by every module" },
    { value: 1, label: "policy engine deciding every request" },
    { value: 1, label: "audit trail, tamper-proof and hash-chained" },
    { value: 0, label: "inbound ports to open on managed systems" },
];

/* "80+" → 80 with a "+" suffix, "100%" → 100 with "%", so the figures count up. */
const parseStat = (v: string) => {
    const m = v.match(/^(\d+)(.*)$/);
    return m ? { n: Number(m[1]), suffix: m[2] } : null;
};

export default function PlatformPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="pl-hero" />
            <Spotlight />

            <PageHero
                id="pl-hero"
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<PlatformHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── THE NINE MODULES ───────────────────────────────── */}
            <section id="pl-modules" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title="Nine capability modules">
                        <p>
                            Each one below is a working page. Read together, they are the privileged access lifecycle from discovery and credentials through to sessions, workflow and audit.
                        </p>
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {solutions.map((s, i) => (
                            <Link
                                key={s.slug}
                                href={solutionHref(s)}
                                className="aip-card group min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col"
                                data-aos="fade-up"
                                data-aos-delay={String((i % 3) * 70)}
                            >
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

            {/* ─── ARCHITECTURE (dark band) ───────────────────────── */}
            <div className="dark">
                <section id="pl-architecture" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0">
                                <Heading title={architectureSection.title}>
                                    <Prose segments={architectureSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-10 grid sm:grid-cols-2 gap-4">
                                    {architecturePillars.map((p, i) => (
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
                                <CoreStack />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── ONE CONSOLE ────────────────────────────────────── */}
            <section id="pl-console" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={consoleSection.title} />
                            <Paras items={consoleSection.paragraphs} className="mt-6" />
                            <CheckList items={consoleSection.points} className="mt-8" />
                            <ArrowLink href="/platform/infrastructure-deployment" className="mt-8">
                                See the deployment specifications
                            </ArrowLink>
                        </div>
                        <div className="min-w-0 sm:pb-16" data-aos="fade-up" data-aos-delay="100">
                            <ConsoleMock />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── COMPLIANCE STANDARDS ───────────────────────────── */}
            <section id="pl-compliance" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={standardsSection.title}>
                        <Prose segments={standardsSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {complianceStandards.map((c, i) => (
                            <article key={c.code} className="aip-card min-w-0 rounded-3xl border p-6" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-[1.375rem] font-bold tracking-[-0.02em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                        {c.code}
                                    </span>
                                    <span className="inline-flex items-center gap-1 rounded-full bg-[#00B8DB]/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Mapped
                                    </span>
                                </div>
                                <div className="mt-3 text-[0.8125rem] font-semibold text-slate-700 dark:text-slate-300">{c.fullName}</div>
                                <p className="op-card-text mt-1.5">{c.applicability}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-10" data-aos="fade-up">
                        <ArrowLink href="/privileged-access-audit-compliance">See how the evidence is produced</ArrowLink>
                    </div>
                </div>
            </section>

            {/* ─── FIGURES ────────────────────────────────────────── */}
            <section id="pl-figures" className={sectionLine}>
                <div className="container-xl op-sec">
                    <Heading title="Platform figures you can point at">
                        <p>Not a capability slide. These are the numbers the platform is specified against.</p>
                    </Heading>
                    <dl className="op-body grid grid-cols-2 lg:grid-cols-4 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-white/[0.02]" data-aos="fade-up">
                        {datasheetStats.map((stat) => {
                            const p = parseStat(stat.value);
                            return (
                                <div key={stat.label} className="aip-fact px-6 py-7 lg:px-8 lg:py-9">
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <span className="block text-[2.75rem] leading-none font-bold tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                            {p ? <CountUp to={p.n} suffix={p.suffix} /> : stat.value}
                                        </span>
                                        <span className="mt-3 block text-[0.9375rem] font-semibold text-slate-800 dark:text-slate-200">{stat.label}</span>
                                        <span className="mt-1 block text-[0.8125rem] text-slate-500">{stat.sub}</span>
                                    </dd>
                                </div>
                            );
                        })}
                    </dl>
                    <div className="mt-12">
                        <h3 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h3>
                        <KeepReading links={keepReading} />
                    </div>
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Nine capabilities", "One credential store"]} outcome="One audit trail" />}
                lead={closing.body[0]}
                body={closing.body.slice(1)}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="pl-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
