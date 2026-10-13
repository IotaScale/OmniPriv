import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { AgentReplay, InjectVisual, ThreatResponse } from "@/components/agent/Visuals";
import AiPamHero from "@/components/aipamsol/AiPamHero";
import CapabilityTimeline from "@/components/aipamsol/CapabilityTimeline";
import EraMap, { ZeroTrustLoop } from "@/components/aipamsol/EraMap";
import { AgenticGates, PolicyVisual } from "@/components/aipamsol/Visuals";
import { ExposureVisual } from "@/components/human/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";

import { requireSolution } from "../data";
import {
    agenticSection,
    capabilities,
    changedEraSection,
    closing,
    environmentSection,
    faqSection,
    faqs,
    hero,
    identityLayersSection,
    meta,
    strengthenSection,
    whyChooseSection,
} from "./data";

/*
 * /solutions/ai-pam-solutions. Copy lives in ./data.ts; this file is layout
 * only, built from the shared page kit (components/pageui) so it matches the
 * redesigned platform pages. Sample values in illustrations are illustrative.
 */

/** Single source of truth for slug, eyebrow and SEO metadata */
const solution = requireSolution("ai-pam-solutions");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
    keywords: [
        "AI PAM solutions",
        "AI privileged access management",
        "PAM AI",
        "AI agent security",
        "AI agent access control",
        "secure AI agents",
        "agentic AI security",
        "AI identity security",
        "machine identity security",
        "non-human identity security",
        "just-in-time access for AI agents",
        "Zero Standing Privileges",
        "runtime access control",
        "AI credential security",
        "privileged session monitoring",
        "Privileged Access Management",
    ],
    alternates: { canonical: "/solutions/ai-pam-solutions" },
};

const NAV = [
    { id: "ap-era", label: "The AI era" },
    { id: "ap-layers", label: "Every identity" },
    { id: "ap-strengthen", label: "How it works" },
    { id: "ap-agentic", label: "Agentic AI" },
    { id: "ap-environments", label: "Environments" },
    { id: "ap-why", label: "Why OmniPriv" },
    { id: "ap-faq", label: "FAQ" },
];

/* From this page's copy, plus the verified 39-feature behavioral model. */
const FACTS = [
    { value: 9, label: "kinds of identity that now touch privileged access" },
    { value: 3, label: "identity layers under one privileged access layer" },
    { value: 5, label: "session types monitored: SSH, RDP, VNC, HTTP, database" },
    { value: 39, label: "behavioral features scored on privileged activity" },
];

/* Who sits in each identity layer, from that card's own copy. */
const LAYER_TAGS = {
    human: ["Administrators", "Employees", "Developers", "Contractors", "Vendors"],
    machine: ["Service accounts", "Workloads", "APIs", "SSH keys", "Tokens", "Cloud roles"],
    ai: ["AI agents", "AI-enabled workflows", "Automated processes"],
};

/* What the Zero Trust paragraph says OmniPriv supports today. */
const SUPPORTED = ["Identity integrations", "Service-account management", "Workload identities", "Dynamic secrets", "Short-lived credentials"];

/* "one PAM platform for controlling privileged access across …" */
const COVERS = ["People", "Infrastructure", "Workloads", "Automation"];

const keepReading = [
    { href: "/ai-pam", label: "OmniPriv AI-PAM" },
    { href: "/blog/ai-pam-solutions", label: "Guide: AI PAM explained" },
    { href: "/solutions/ai-agent-security", label: "AI agent security" },
];

function Pillar({ title, children, visual, flip }: { title: string; children: React.ReactNode; visual: React.ReactNode; flip?: boolean }) {
    return (
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
            <div className={cn("min-w-0", flip && "lg:order-2")}>
                <h3 className="op-h3" data-aos="fade-up">
                    {title}
                </h3>
                <div className="mt-4 space-y-4">{children}</div>
            </div>
            <div className={cn("min-w-0", flip && "lg:order-1")} data-aos="fade-up" data-aos-delay="100">
                {visual}
            </div>
        </div>
    );
}

export default function AiPamSolutionsPage() {
    const sj = strengthenSection.jit;
    const sc = strengthenSection.credentials;
    const sa = strengthenSection.accessControl;
    const ss = strengthenSection.sessionMonitoring;
    const sb = strengthenSection.behavioralAnalysis;
    const layers = [identityLayersSection.human, identityLayersSection.machine, identityLayersSection.ai];
    const tags = [LAYER_TAGS.human, LAYER_TAGS.machine, LAYER_TAGS.ai];
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="ap-hero" />
            <Spotlight />

            <PageHero
                id="ap-hero"
                titleLead={meta.titleLead}
                titleAccent={meta.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<AiPamHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── PRIVILEGED ACCESS HAS CHANGED IN THE AI ERA ── */}
            <section id="ap-era" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 lg:gap-16 items-end">
                        <Heading title={changedEraSection.title}>
                            <Prose segments={changedEraSection.lead} className="text-[1.0625rem]" />
                        </Heading>
                        <dl className="grid grid-cols-2 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a]" data-aos="fade-up">
                            <div className="px-5 py-4">
                                <dt className="text-[0.75rem] font-semibold text-slate-500">Traditional PAM</dt>
                                <dd className="mt-1">
                                    <span className="block text-[2rem] font-bold leading-none tracking-[-0.03em] text-slate-400" style={{ fontFamily: "var(--font-syne)" }}>1</span>
                                    <span className="mt-1 block text-[0.75rem] text-slate-500">admins on servers</span>
                                </dd>
                            </div>
                            <div className="aip-fact px-5 py-4">
                                <dt className="text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">The AI era</dt>
                                <dd className="mt-1">
                                    <span className="block text-[2rem] font-bold leading-none tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>{changedEraSection.dependencies.length}</span>
                                    <span className="mt-1 block text-[0.75rem] text-slate-500">kinds of identity near privilege</span>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    <div className="op-body" data-aos="fade-up" data-aos-delay="80">
                        <EraMap identities={changedEraSection.dependencies} prompt={changedEraSection.prompt} />
                    </div>

                    <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
                        <div className="min-w-0 space-y-4" data-aos="fade-up">
                            <Prose segments={changedEraSection.body} tone="strong" className="text-[1.125rem]" />
                            <Prose segments={changedEraSection.zeroTrustBody} className="text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0 space-y-4" data-aos="fade-up" data-aos-delay="100">
                            <ZeroTrustLoop />
                            <ul className="flex flex-wrap gap-2" aria-label="Supported today">
                                {SUPPORTED.map((t) => (
                                    <li key={t} className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ONE PRIVILEGED ACCESS LAYER FOR EVERY IDENTITY ── */}
            <section id="ap-layers" className={sectionLine}>
                <div className="container-xl op-sec">
                    <Heading title={identityLayersSection.title}>
                        <Prose segments={identityLayersSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-4 lg:grid-cols-3">
                        {layers.map((l, i) => (
                            <article key={l.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                <div className="flex items-center gap-3">
                                    <span className="icon-wrapper">
                                        <l.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title">{l.title}</h3>
                                </div>
                                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${l.title} include`}>
                                    {tags[i].map((t) => (
                                        <li key={t} className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-5 space-y-3">
                                    <Prose segments={l.lead} className="op-card-text" />
                                    <Prose segments={l.body} className="op-card-text" />
                                </div>
                                {"controls" in l && (
                                    <>
                                        <Prose segments={[l.prompt]} tone="strong" className="mt-5 text-[0.9375rem]" />
                                        <CheckList items={l.controls} className="mt-3" />
                                    </>
                                )}
                                {"link" in l && (
                                    <ArrowLink href={l.link.href} className="mt-auto pt-6">
                                        {l.link.label}
                                    </ArrowLink>
                                )}
                            </article>
                        ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-3 rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-5 py-3.5 text-center text-[0.9375rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]" data-aos="fade-up">
                        One privileged access layer: verify, authorize, protect, monitor, audit
                    </div>
                </div>
            </section>

            {/* ─── HOW OMNIPRIV STRENGTHENS AI-DRIVEN PRIVILEGED ACCESS ── */}
            <section id="ap-strengthen" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec space-y-20 lg:space-y-24">
                    <Heading title={strengthenSection.title}>
                        <Prose segments={strengthenSection.lead} className="text-[1.0625rem]" />
                    </Heading>

                    <Pillar title={sj.title} visual={<ExposureVisual />}>
                        <Prose segments={sj.lead} className="text-[1.0156rem]" />
                        <Prose segments={sj.body} className="text-[1.0156rem]" />
                        <div className="rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] p-5">
                            <h4 className="op-card-title">{sj.calloutTitle}</h4>
                            <Prose segments={sj.calloutBody} className="mt-2 text-[0.9375rem]" />
                        </div>
                    </Pillar>

                    <Pillar title={sc.title} visual={<InjectVisual />} flip>
                        <Prose segments={sc.lead} className="text-[1.0156rem]" />
                        <Prose segments={sc.body} className="text-[1.0156rem]" />
                        <ul className="flex flex-wrap gap-2">
                            {sc.chips.map((c) => (
                                <li key={c} className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </Pillar>

                    <Pillar title={sa.title} visual={<PolicyVisual />}>
                        <Prose segments={sa.lead} className="text-[1.0156rem]" />
                        <Prose segments={sa.body} className="text-[1.0156rem]" />
                        <CheckChips steps={sa.flow.slice(0, -1)} outcome={sa.flow[sa.flow.length - 1]} />
                        <Prose segments={sa.note} className="text-[1.0156rem]" />
                    </Pillar>
                </div>
            </section>

            {/* ─── SESSIONS + BEHAVIOR (dark band) ── */}
            <div className="dark">
                <section className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative space-y-20 lg:space-y-24">
                        <Pillar title={ss.title} visual={<AgentReplay />} flip>
                            <Prose segments={ss.lead} className="text-[1.0156rem]" />
                            <Prose segments={ss.body} className="text-[1.0156rem]" />
                            <Prose segments={[ss.prompt]} tone="strong" />
                            <CheckList items={ss.visibilityItems} />
                        </Pillar>
                        <Pillar title={sb.title} visual={<ThreatResponse />}>
                            <Prose segments={sb.lead} className="text-[1.0156rem]" />
                            <Prose segments={sb.body} className="text-[1.0156rem]" />
                        </Pillar>
                    </div>
                </section>
            </div>

            {/* ─── DESIGNED FOR AGENTIC AI SECURITY ── */}
            <section id="ap-agentic" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={agenticSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={agenticSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={agenticSection.body} className="text-[1.0156rem]" />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <AgenticGates />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── AI PAM ACROSS YOUR ENTERPRISE ENVIRONMENT ── */}
            <section id="ap-environments" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={environmentSection.title}>
                        <Prose segments={environmentSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {environmentSection.environments.map((env, i) => (
                            <Link key={env.title} href={env.link.href} className="aip-card group min-w-0 rounded-3xl border p-6 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                                <span className="icon-wrapper transition-colors duration-200 group-hover:bg-[#00B8DB] group-hover:text-[#03121c]">
                                    <env.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="op-card-title mt-5">{env.title}</h3>
                                <p className="op-card-text mt-2">{env.text}</p>
                                <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold op-link">
                                    {env.link.label}
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── WHY CHOOSE OMNIPRIV ── */}
            <section id="ap-why" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0 lg:sticky lg:top-40">
                            <Heading title={whyChooseSection.title}>
                                <Prose segments={whyChooseSection.lead} className="text-[1.0625rem]" />
                                <Prose segments={whyChooseSection.body} className="text-[1.0156rem]" />
                            </Heading>
                            <div className="mt-8 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-6" data-aos="fade-up">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-[2.75rem] font-bold leading-none tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                                        1
                                    </span>
                                    <span className="text-[0.9375rem] font-semibold text-slate-700 dark:text-slate-300">PAM platform for</span>
                                </div>
                                <ul className="mt-4 grid grid-cols-2 gap-2">
                                    {COVERS.map((t) => (
                                        <li key={t} className="rounded-xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-3 py-2.5 text-center text-[0.875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="min-w-0">
                            <CapabilityTimeline items={capabilities.map((c) => ({ title: c.title, text: c.text }))} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── KEEP READING ─────────────────────── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["No more privilege than it needs"]} outcome="No longer than it needs it" />}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="ap-faq" title={faqSection.title} items={faqs} />
        </div>
    );
}
