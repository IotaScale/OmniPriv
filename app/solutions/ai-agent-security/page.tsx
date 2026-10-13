import type { Metadata } from "next";
import { ArrowRight, Cloud, KeyRound } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import AgentHero from "@/components/agent/AgentHero";
import { AgentGrants, AgentReplay, ControlPlaneVisual, CredentialLoop, InjectVisual, QuestionStrip, ThreatResponse } from "@/components/agent/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";

import { requireSolution } from "../data";
import {
    afterAccessSection,
    closing,
    credentialsSection,
    faqSection,
    faqs,
    finalSection,
    hero,
    jitSection,
    lifecycle,
    meta,
    modelSection,
    pillars,
    pillarsSection,
} from "./data";

/*
 * /solutions/ai-agent-security. Copy lives in ./data.ts; this file is layout
 * only, built from the shared page kit (components/pageui) so it matches the
 * redesigned platform pages. Sample values in illustrations are illustrative.
 */

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("ai-agent-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

const NAV = [
    { id: "ag-model", label: "Access model" },
    { id: "ag-jit", label: "JIT access" },
    { id: "ag-credentials", label: "Credentials" },
    { id: "ag-after", label: "After access" },
    { id: "ag-pillars", label: "Least privilege" },
    { id: "ag-faq", label: "FAQ" },
];

/* From this page's copy, plus the verified 39-feature behavioral model. */
const FACTS = [
    { value: 6, label: "lifecycle steps, from request to automatic revoke" },
    { value: 4, label: "identity types: human, machine, vendor, AI / automated" },
    { value: 5, label: "session types recorded: SSH, RDP, VNC, HTTP, database" },
    { value: 39, label: "behavioral features scored on privileged activity" },
];

/* The eight credential capabilities, split the way the copy splits them. */
const CRED_GROUPS = [
    { title: "Credential lifecycle", icon: KeyRound, items: credentialsSection.capabilities.slice(0, 4) },
    { title: "Cloud & DevOps integrations", icon: Cloud, items: credentialsSection.capabilities.slice(4) },
];

const IDENTITIES = ["Human", "Machine", "Vendor", "AI / automated"];

const keepReading = [
    { href: "/platform/secure-ai-agents", label: "Secure AI Agents module" },
    { href: "/ai-pam", label: "OmniPriv AI-PAM" },
    { href: "/solutions/machine-identity-security", label: "Machine identity security" },
];

export default function AiAgentSecurityPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="ag-hero" />
            <Spotlight />

            <PageHero
                id="ag-hero"
                titleLead={meta.titleLead}
                titleAccent={meta.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<AgentHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── THE SHIFTED ACCESS MODEL ─────────── */}
            <section id="ag-model" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={modelSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={modelSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={modelSection.body} className="text-[1.0156rem]" />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <ControlPlaneVisual />
                        </div>
                    </div>

                    <div className="mt-20 lg:mt-24">
                        <div className="max-w-3xl" data-aos="fade-up">
                            <h3 className="op-h3">{modelSection.subTitle}</h3>
                            <Prose segments={modelSection.subLead} className="mt-3 text-[1.0156rem]" />
                        </div>
                        <div className="mt-8" data-aos="fade-up" data-aos-delay="80">
                            <QuestionStrip questions={modelSection.questions} />
                        </div>
                        <div className="mt-8 flex items-center gap-3" data-aos="fade-up">
                            <span className="h-px w-10 bg-[#00B8DB]" aria-hidden="true" />
                            <Prose segments={modelSection.subNote} tone="strong" className="text-[1.0625rem]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── JUST-IN-TIME ACCESS ──────────────── */}
            <section id="ag-jit" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={jitSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={jitSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={jitSection.body} className="text-[1.0156rem]" />
                            </div>
                            <Prose segments={[jitSection.prompt]} tone="strong" className="mt-8" />
                            <div className="mt-4">
                                <CheckChips steps={lifecycle.slice(0, -1)} outcome={lifecycle[lifecycle.length - 1]} />
                            </div>
                            <Prose segments={jitSection.note} className="mt-6 text-[1.0156rem]" />
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <AgentGrants />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS ──────────────────────── */}
            <section id="ag-credentials" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
                        <div className="min-w-0 order-2 lg:order-1 space-y-3 lg:sticky lg:top-40" data-aos="fade-up" data-aos-delay="100">
                            <InjectVisual />
                            <CredentialLoop />
                        </div>
                        <div className="min-w-0 order-1 lg:order-2">
                            <Heading title={credentialsSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={credentialsSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={credentialsSection.body} className="text-[1.0156rem]" />
                            </div>
                            <div className="mt-7 grid sm:grid-cols-2 gap-3">
                                {CRED_GROUPS.map((g) => (
                                    <div key={g.title} className="aip-card min-w-0 rounded-2xl border p-5" data-aos="fade-up">
                                        <div className="flex items-center gap-2.5">
                                            <span className="icon-wrapper shrink-0">
                                                <g.icon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                            <span className="op-card-title text-[0.9375rem]">{g.title}</span>
                                        </div>
                                        <ul className="mt-4 space-y-2">
                                            {g.items.map((c) => (
                                                <li key={c} className="flex items-center gap-2 text-[0.875rem] text-slate-700 dark:text-slate-300">
                                                    <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#00B8DB]" aria-hidden="true" />
                                                    {c}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <Prose segments={credentialsSection.note} className="mt-6 text-[1.0156rem]" />
                            <ArrowLink href={credentialsSection.link.href} className="mt-6">
                                {credentialsSection.link.label}
                            </ArrowLink>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── AFTER ACCESS IS GRANTED (dark band) ── */}
            <div className="dark">
                <section id="ag-after" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <Heading title={afterAccessSection.title} />
                            <ul className="flex flex-wrap gap-2" data-aos="fade-up" aria-label="Session types recorded">
                                {["SSH", "RDP", "VNC", "HTTP", "Database"].map((p) => (
                                    <li key={p} className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-3 py-1.5 text-[0.75rem] font-semibold text-[#7FE3F2]">
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="op-body grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <h3 className="op-h3">{afterAccessSection.monitoring.title}</h3>
                                <div className="mt-4 space-y-4">
                                    <Prose segments={afterAccessSection.monitoring.lead} className="text-[1.0156rem]" />
                                    <Prose segments={afterAccessSection.monitoring.body} className="text-[1.0156rem]" />
                                    <Prose segments={afterAccessSection.monitoring.note} className="text-[1.0156rem]" />
                                </div>
                                <Prose segments={[afterAccessSection.monitoring.prompt]} tone="strong" className="mt-7" />
                                <CheckList items={afterAccessSection.monitoring.insights} className="mt-4" />
                                <ArrowLink href={afterAccessSection.monitoring.link.href} className="mt-7">
                                    {afterAccessSection.monitoring.link.label}
                                </ArrowLink>
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <AgentReplay />
                            </div>
                        </div>
                        <div className="mt-20 lg:mt-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                                <ThreatResponse />
                            </div>
                            <div className="min-w-0 order-1 lg:order-2">
                                <h3 className="op-h3">{afterAccessSection.detection.title}</h3>
                                <div className="mt-4 space-y-4">
                                    <Prose segments={afterAccessSection.detection.lead} className="text-[1.0156rem]" />
                                    <Prose segments={afterAccessSection.detection.body} className="text-[1.0156rem]" />
                                    <Prose segments={afterAccessSection.detection.note} className="text-[1.0156rem]" />
                                </div>
                                <ArrowLink href={afterAccessSection.detection.link.href} className="mt-7">
                                    {afterAccessSection.detection.link.label}
                                </ArrowLink>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── LEAST-PRIVILEGE PILLARS ──────────── */}
            <section id="ag-pillars" className={sectionLine}>
                <div className="container-xl op-sec">
                    <Heading title={pillarsSection.title}>
                        <Prose segments={pillarsSection.lead} className="text-[1.0625rem]" />
                        <Prose segments={pillarsSection.body} className="text-[1.0625rem]" />
                        <Prose segments={[pillarsSection.prompt]} tone="strong" />
                    </Heading>
                    <ol className="op-body grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {pillars.map((p, i) => (
                            <li key={p.title} className="aip-card group relative min-w-0 rounded-3xl border p-6 lg:p-7" data-aos="fade-up" data-aos-delay={String((i % 3) * 70)}>
                                <div className="flex items-center gap-3">
                                    <span className="icon-wrapper">
                                        <p.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <h3 className="op-card-title">{p.title}</h3>
                                    {i % 3 !== 2 && <ArrowRight className="ml-auto w-4 h-4 text-slate-300 dark:text-slate-600 hidden lg:block" aria-hidden="true" />}
                                </div>
                                <p className="op-card-text mt-4">{p.text}</p>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-8 max-w-3xl" data-aos="fade-up">
                        <Prose segments={pillarsSection.note} className="text-[1.0156rem]" />
                    </div>
                </div>
            </section>

            {/* ─── SECURE AI WITHOUT PERMANENT PRIVILEGE ── */}
            <section className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={finalSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={finalSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={finalSection.body} className="text-[1.0156rem]" />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <div className="rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6">
                                <div className="text-[0.8125rem] font-semibold text-slate-500">One privileged-access model for</div>
                                <ul className="mt-4 grid grid-cols-2 gap-2">
                                    {IDENTITIES.map((t) => (
                                        <li key={t} className="rounded-xl border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-3 py-3 text-center text-[0.875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {t}
                                        </li>
                                    ))}
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
                accent={<CheckChips steps={["Who, or what", "Approved tasks only"]} outcome="Visible activity" />}
                body={closing.body}
                primary={closing.primary}
            />

            <FaqSplit id="ag-faq" title={faqSection.title} items={faqs} />
        </div>
    );
}
