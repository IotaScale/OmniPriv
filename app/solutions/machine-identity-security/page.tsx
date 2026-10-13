import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import { ThreatResponse } from "@/components/agent/Visuals";
import MachineHero from "@/components/machine/MachineHero";
import { IdentityAnatomy, MachineSessions, PipelineVisual, RiskControlMap, ScopeVisual } from "@/components/machine/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";

import { requireSolution } from "../data";
import {
    capabilityBlocks,
    closing,
    credentialsSection,
    definitionSection,
    faqSection,
    faqs,
    hero,
    infrastructureSection,
    intelligenceSection,
    leastPrivilegeSection,
    meta,
    monitoringSection,
    risksSection,
} from "./data";

/*
 * /solutions/machine-identity-security. Copy lives in ./data.ts; this file is
 * layout only, built from the shared page kit (components/pageui) so it
 * matches the redesigned platform pages. Sample values in illustrations are
 * illustrative.
 */

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("machine-identity-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

const NAV = [
    { id: "mi-what", label: "What it is" },
    { id: "mi-risks", label: "Risks" },
    { id: "mi-credentials", label: "Credentials" },
    { id: "mi-least", label: "Least privilege" },
    { id: "mi-intel", label: "Detection & monitoring" },
    { id: "mi-coverage", label: "Coverage" },
    { id: "mi-faq", label: "FAQ" },
];

/* From this page's copy, plus the verified 39-feature behavioral model. */
const FACTS = [
    { value: 3, label: "credential types rotated automatically: passwords, SSH keys, API tokens" },
    { value: 9, label: "named platforms, from AWS and Kubernetes to Terraform" },
    { value: 6, label: "environments under one strategy, cloud to hybrid" },
    { value: 39, label: "behavioral features scored on privileged activity" },
];

/* What each capability card names, as a footer row. */
const CAP_TAGS = [
    ["Central credential control", "Secret rotation"],
    ["Azure", "Google Cloud", "AWS IAM", "Native secret managers"],
    ["Short-lived tokens", "Dynamic secrets", "Credential injection"],
];

/* The four parts of the least-privilege principle sentence. */
const PRINCIPLE = ["Grant only the access required", "Protect the credential", "Monitor sensitive activity"];

const PLATFORMS = ["AWS", "Azure", "GCP", "Kubernetes", "HashiCorp Vault", "GitHub", "GitLab", "Jenkins", "Terraform", "Databases"];

const keepReading = [
    { href: "/platform/password-credential-management", label: "Credential rotation and vaulting" },
    { href: "/solutions/ai-agent-security", label: "AI agent security" },
    { href: "/solutions/human-identity-security", label: "Human identity security" },
];

export default function MachineIdentitySecurityPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="mi-hero" />
            <Spotlight />

            <PageHero
                id="mi-hero"
                titleLead={meta.titleLead}
                titleAccent={meta.titleAccent}
                paragraphs={[hero.intro, hero.body, hero.note]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<MachineHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── WHAT IS MACHINE IDENTITY MANAGEMENT ── */}
            <section id="mi-what" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={definitionSection.title} />
                            <Paras items={definitionSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <IdentityAnatomy />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── RISKS ────────────────────────────── */}
            <section id="mi-risks" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0 order-2 lg:order-1 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <RiskControlMap />
                        </div>
                        <div className="min-w-0 order-1 lg:order-2">
                            <Heading title={risksSection.title} />
                            <Paras items={risksSection.paragraphs} className="mt-6" />
                            <CheckList items={risksSection.controls} className="mt-6" />
                            <Prose segments={risksSection.note} className="mt-6 text-[1.0156rem]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS WITHOUT SLOWING AUTOMATION ── */}
            <section id="mi-credentials" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={credentialsSection.title} />
                            <Paras items={credentialsSection.paragraphs} className="mt-6" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <PipelineVisual />
                        </div>
                    </div>
                    <div className="mt-16 grid gap-4 md:grid-cols-3">
                        {capabilityBlocks.map((b, i) => (
                            <article key={b.title} className="aip-card min-w-0 rounded-3xl border p-6 lg:p-7 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                <span className="icon-wrapper">
                                    <b.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="op-card-title mt-5">{b.title}</h3>
                                <div className="mt-2 space-y-2">
                                    {b.paragraphs.map((p, k) => (
                                        <Prose key={k} segments={p} className="op-card-text" />
                                    ))}
                                </div>
                                <ul className="mt-auto pt-5 flex flex-wrap gap-1.5">
                                    {CAP_TAGS[i].map((t) => (
                                        <li key={t} className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── LEAST PRIVILEGE ──────────────────── */}
            <section id="mi-least" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={leastPrivilegeSection.title} />
                            <Paras items={leastPrivilegeSection.paragraphs} className="mt-6" />
                            <blockquote className="mt-6 rounded-2xl border border-[#00B8DB]/30 bg-[#00B8DB]/[0.06] px-5 py-4 text-[1.0625rem] font-semibold leading-snug text-[#0a1628] dark:text-white" data-aos="fade-up">
                                {leastPrivilegeSection.principle}
                            </blockquote>
                            <div className="mt-5" aria-hidden="true">
                                <CheckChips steps={PRINCIPLE} outcome="Remove unnecessary privilege" />
                            </div>
                            <Prose segments={leastPrivilegeSection.note} className="mt-6 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <ScopeVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── INTELLIGENCE + MONITORING (dark band) ── */}
            <div className="dark">
                <section id="mi-intel" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative space-y-20 lg:space-y-24">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <Heading title={intelligenceSection.title} />
                                <Paras items={intelligenceSection.paragraphs} className="mt-6" />
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <ThreatResponse />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                                <MachineSessions />
                            </div>
                            <div className="min-w-0 order-1 lg:order-2">
                                <Heading title={monitoringSection.title} />
                                <Paras items={monitoringSection.paragraphs} className="mt-6" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── COVERAGE ─────────────────────────── */}
            <section id="mi-coverage" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={infrastructureSection.title} />
                    <div className="op-body grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0">
                            <Paras items={infrastructureSection.paragraphs} />
                            <Prose segments={[infrastructureSection.prompt]} tone="strong" className="mt-7" />
                            <ol className="mt-4 flex flex-wrap items-center gap-2" data-aos="fade-up">
                                {infrastructureSection.flow.map((f, k) => (
                                    <li key={f} className="flex items-center gap-2">
                                        <span className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1.5 text-[0.8125rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">{f}</span>
                                        {k < infrastructureSection.flow.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />}
                                    </li>
                                ))}
                            </ol>
                            <Prose segments={infrastructureSection.note} className="mt-5 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <div className="rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6">
                                <div className="text-[0.8125rem] font-semibold text-slate-500">Machine-access use cases across</div>
                                <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {PLATFORMS.map((p) => (
                                        <li key={p} className="aip-card rounded-xl border px-3 py-3 text-center text-[0.875rem] font-semibold text-slate-800 dark:text-slate-200">
                                            {p}
                                        </li>
                                    ))}
                                    <li className="rounded-xl border border-dashed border-slate-900/[0.12] dark:border-white/[0.12] px-3 py-3 text-center text-[0.8125rem] text-slate-500">and other enterprise systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── KEEP READING ─────────────────────── */}
            <section className={sectionLine}>
                <div className="container-xl py-12 lg:py-14">
                    <h2 className="op-h3 mb-6" data-aos="fade-up">Keep reading</h2>
                    <KeepReading links={keepReading} />
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Rotated", "Scoped", "Monitored"]} outcome="No permanent privilege" />}
                lead={closing.body[0]}
                body={[...closing.body.slice(1), closing.kicker]}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="mi-faq" title={faqSection.title} items={faqs} />
        </div>
    );
}
