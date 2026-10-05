import type { Metadata } from "next";
import { ArrowRight, Bot, Server, Users } from "lucide-react";
import Link from "next/link";

import ArrowLink from "@/components/sections/ArrowLink";
import CheckList from "@/components/sections/CheckList";
import ChipList from "@/components/sections/ChipList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import MediaSplit from "@/components/sections/MediaSplit";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";

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
};

export default function AiPamSolutionsPage() {
    return (
        <>
            {/* ─── HERO ────────────────────────────── */}
            <SplitHero
                badge={solution.eyebrow}
                titleLead={meta.titleLead}
                titleAccent={meta.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── PRIVILEGED ACCESS HAS CHANGED IN THE AI ERA ── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={changedEraSection.title}>
                        <Prose segments={changedEraSection.lead} className="mb-6" />
                    </SectionHeading>

                    <Prose segments={[changedEraSection.prompt]} tone="strong" className="mb-4" />
                    <CheckList items={changedEraSection.dependencies} className="mb-8" />

                    <Prose segments={changedEraSection.body} className="mb-4" />
                    <Prose segments={changedEraSection.zeroTrustBody} />
                </div>
            </Section>

            {/* ─── ONE PRIVILEGED ACCESS LAYER FOR EVERY IDENTITY ── */}
            <Section border="bottom">
                <SectionHeading
                    title={identityLayersSection.title}
                    className="max-w-3xl mb-12"
                >
                    <Prose segments={identityLayersSection.lead} />
                </SectionHeading>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Human Identities */}
                    <div className="flex flex-col p-7 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 shadow-sm hover:border-[#00B8FF]/40 transition-all duration-300">
                        <div className="icon-wrapper mb-5">
                            <identityLayersSection.human.icon className="w-5 h-5 text-[#00B8FF]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                            {identityLayersSection.human.title}
                        </h3>
                        <Prose segments={identityLayersSection.human.lead} className="text-sm mb-3" />
                        <Prose segments={identityLayersSection.human.body} className="text-sm mb-6 flex-1" />

                        <Prose segments={[identityLayersSection.human.prompt]} tone="strong" className="text-xs mb-3 uppercase tracking-wider text-slate-400" />
                        <CheckList items={identityLayersSection.human.controls} className="text-sm" />
                    </div>

                    {/* Machine & Non-Human Identities */}
                    <div className="flex flex-col p-7 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 shadow-sm hover:border-[#00B8FF]/40 transition-all duration-300">
                        <div className="icon-wrapper mb-5">
                            <identityLayersSection.machine.icon className="w-5 h-5 text-[#00B8FF]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                            {identityLayersSection.machine.title}
                        </h3>
                        <Prose segments={identityLayersSection.machine.lead} className="text-sm mb-3" />
                        <Prose segments={identityLayersSection.machine.body} className="text-sm mb-6 flex-1" />

                        <ArrowLink href={identityLayersSection.machine.link.href} className="mt-auto pt-4">
                            {identityLayersSection.machine.link.label}
                        </ArrowLink>
                    </div>

                    {/* AI & Automated Identities */}
                    <div className="flex flex-col p-7 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 shadow-sm hover:border-[#00B8FF]/40 transition-all duration-300">
                        <div className="icon-wrapper mb-5">
                            <identityLayersSection.ai.icon className="w-5 h-5 text-[#00B8FF]" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-3" style={{ fontFamily: "var(--font-syne)" }}>
                            {identityLayersSection.ai.title}
                        </h3>
                        <Prose segments={identityLayersSection.ai.lead} className="text-sm mb-3" />
                        <Prose segments={identityLayersSection.ai.body} className="text-sm mb-6 flex-1" />

                        <ArrowLink href={identityLayersSection.ai.link.href} className="mt-auto pt-4">
                            {identityLayersSection.ai.link.label}
                        </ArrowLink>
                    </div>
                </div>
            </Section>

            {/* ─── HOW OMNIPRIV STRENGTHENS AI-DRIVEN PRIVILEGED ACCESS ── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title={strengthenSection.title}
                    className="max-w-3xl mb-14"
                >
                    <Prose segments={strengthenSection.lead} />
                </SectionHeading>

                {/* `mx-auto`: the heading above is centred (image-less section), so a
                    left-hugging 896px stack under it leaves all the slack on the right.
                    Only `.max-w-3xl` columns are centred by the rule in globals.css. */}
                <div className="space-y-12 max-w-4xl mx-auto">
                    {/* 1. JIT Access & Zero Standing Privileges */}
                    <div className="p-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/60">
                        <div className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-widest mb-2">
                            Pillar {strengthenSection.jit.step}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                            1. {strengthenSection.jit.title}
                        </h3>
                        <Prose segments={strengthenSection.jit.lead} className="mb-4" />
                        <Prose segments={strengthenSection.jit.body} className="mb-6" />

                        {/* Sub-callout: Zero Standing Privileges */}
                        <div className="p-5 rounded-xl border border-[#00B8FF]/20 bg-[#00B8FF]/[0.05] dark:bg-[#00B8FF]/[0.04]">
                            <h4 className="text-base font-bold text-slate-950 dark:text-white mb-2">
                                {strengthenSection.jit.calloutTitle}
                            </h4>
                            <Prose segments={strengthenSection.jit.calloutBody} className="text-sm" />
                        </div>
                    </div>

                    {/* 2. Protect Credentials */}
                    <div className="p-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/60">
                        <div className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-widest mb-2">
                            Pillar {strengthenSection.credentials.step}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                            2. {strengthenSection.credentials.title}
                        </h3>
                        <Prose segments={strengthenSection.credentials.lead} className="mb-4" />
                        <Prose segments={strengthenSection.credentials.body} className="mb-6" />

                        <ChipList
                            items={strengthenSection.credentials.chips}
                            variant="neutral"
                            className="gap-2.5"
                        />
                    </div>

                    {/* 3. Apply Policy-Based AI Agent Access Control */}
                    <div className="p-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/60">
                        <div className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-widest mb-2">
                            Pillar {strengthenSection.accessControl.step}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                            3. {strengthenSection.accessControl.title}
                        </h3>
                        <Prose segments={strengthenSection.accessControl.lead} className="mb-3" />
                        <Prose segments={strengthenSection.accessControl.body} className="mb-6" />

                        <ChipList
                            items={strengthenSection.accessControl.flow}
                            variant="accent"
                            align="center"
                            separator={
                                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                            }
                            className="mb-6"
                        />

                        <Prose segments={strengthenSection.accessControl.note} />
                    </div>

                    {/* 4. Control Activity During Privileged Sessions */}
                    <div className="p-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/60">
                        <div className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-widest mb-2">
                            Pillar {strengthenSection.sessionMonitoring.step}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                            4. {strengthenSection.sessionMonitoring.title}
                        </h3>
                        <Prose segments={strengthenSection.sessionMonitoring.lead} className="mb-4" />
                        <Prose segments={strengthenSection.sessionMonitoring.body} className="mb-6" />

                        <Prose segments={[strengthenSection.sessionMonitoring.prompt]} tone="strong" className="mb-3" />
                        <CheckList items={strengthenSection.sessionMonitoring.visibilityItems} />
                    </div>

                    {/* 5. Detect Risk with Intelligent Behavioral Analysis */}
                    <div className="p-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/60">
                        <div className="text-xs font-mono font-bold text-[#00B8FF] uppercase tracking-widest mb-2">
                            Pillar {strengthenSection.behavioralAnalysis.step}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-950 dark:text-white mb-4" style={{ fontFamily: "var(--font-syne)" }}>
                            5. {strengthenSection.behavioralAnalysis.title}
                        </h3>
                        <Prose segments={strengthenSection.behavioralAnalysis.lead} className="mb-4" />
                        <Prose segments={strengthenSection.behavioralAnalysis.body} />
                    </div>
                </div>
            </Section>

            {/* ─── DESIGNED FOR AGENTIC AI SECURITY WITHOUT LOSING CONTROL ── */}
            <Section border="bottom">
                <MediaSplit media={agenticSection.image} ratio="wide-last" height="sm" align="center">
                    <SectionHeading title={agenticSection.title}>
                        <Prose segments={agenticSection.lead} className="mb-4" />
                        <Prose segments={agenticSection.body} />
                    </SectionHeading>
                </MediaSplit>
            </Section>

            {/* ─── AI PAM ACROSS YOUR ENTERPRISE ENVIRONMENT ── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    title={environmentSection.title}
                    className="max-w-3xl mb-12"
                >
                    <Prose segments={environmentSection.lead} />
                </SectionHeading>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {environmentSection.environments.map((env) => (
                        <div
                            key={env.title}
                            className="group flex flex-col p-6 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07] bg-white dark:bg-[#0A1628]/40 hover:-translate-y-1 hover:border-[#00B8FF]/40 transition-all duration-300"
                        >
                            <div className="icon-wrapper mb-5">
                                <env.icon className="w-5 h-5 text-[#00B8FF]" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2" style={{ fontFamily: "var(--font-syne)" }}>
                                {env.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                {env.text}
                            </p>
                            <Link
                                href={env.link.href}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00B8FF] hover:gap-2.5 transition-all"
                            >
                                {env.link.label} <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── WHY CHOOSE OMNIPRIV FOR AI-READY PAM? ── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={whyChooseSection.title} className="mb-2">
                        <Prose segments={whyChooseSection.lead} className="mb-4" />
                        <Prose segments={whyChooseSection.body} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={capabilities} columns={4} className="mt-12" />
            </Section>

            {/* ─── CLOSING CTA BAND ──────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FREQUENTLY ASKED QUESTIONS ───────── */}
            <FaqSection
                title={faqSection.title}
                subtitle={faqSection.subtitle}
                items={faqs}
            />
        </>
    );
}
