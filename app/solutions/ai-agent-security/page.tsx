import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

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

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("ai-agent-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

export default function AiAgentSecurityPage() {
    return (
        <>
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

            {/* ─── THE SHIFTED ACCESS MODEL ─────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={modelSection.title}>
                        <Prose segments={modelSection.lead} className="mb-4" />
                        <Prose segments={modelSection.body} />
                    </SectionHeading>
                </div>

                <div className="max-w-3xl mt-14">
                    <SectionHeading
                        as="h3"
                        size="sm"
                        title={modelSection.subTitle}
                        titleClassName="mb-5"
                    >
                        <Prose segments={modelSection.subLead} className="mb-6" />
                    </SectionHeading>

                    <CheckList items={modelSection.questions} />

                    <Prose segments={modelSection.subNote} className="mt-6" />
                </div>
            </Section>

            {/* ─── JUST-IN-TIME ACCESS ──────────────── */}
            <Section border="bottom">
                <MediaSplit media={jitSection.image} ratio="wide-last" height="sm" align="start">
                    <SectionHeading title={jitSection.title}>
                        <Prose segments={jitSection.lead} className="mb-4" />
                        <Prose segments={jitSection.body} />
                    </SectionHeading>

                    <Prose segments={[jitSection.prompt]} tone="strong" className="mt-8 mb-4" />

                    <ChipList
                        items={lifecycle}
                        variant="accent"
                        align="center"
                        separator={
                            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                        }
                    />

                    <Prose segments={jitSection.note} className="mt-8" />
                </MediaSplit>
            </Section>

            {/* ─── CREDENTIALS ──────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-3xl">
                    <div className="icon-wrapper mb-5">
                        <credentialsSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={credentialsSection.title}>
                        <Prose segments={credentialsSection.lead} className="mb-4" />
                        <Prose segments={credentialsSection.body} className="mb-8" />
                    </SectionHeading>

                    <ChipList
                        items={credentialsSection.capabilities}
                        variant="neutral"
                        className="mb-8 gap-2.5"
                    />

                    <Prose segments={credentialsSection.note} className="mb-8" />

                    <ArrowLink href={credentialsSection.link.href}>
                        {credentialsSection.link.label}
                    </ArrowLink>
                </div>
            </Section>

            {/* ─── AFTER ACCESS IS GRANTED (dark band) ── */}
            <Section tone="dark" border="bottom">
                <SectionHeading
                    title={afterAccessSection.title}
                    className="max-w-3xl mb-14"
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <div className="icon-wrapper mb-5">
                            <afterAccessSection.monitoring.icon className="w-5 h-5" />
                        </div>

                        <SectionHeading
                            as="h3"
                            size="sm"
                            title={afterAccessSection.monitoring.title}
                            titleClassName="max-w-3xl"
                        >
                            <Prose segments={afterAccessSection.monitoring.lead} className="mb-4" />
                            <Prose
                                segments={afterAccessSection.monitoring.body}
                                className="mb-4"
                            />
                            <Prose segments={afterAccessSection.monitoring.note} className="mb-6" />
                        </SectionHeading>

                        <Prose
                            segments={[afterAccessSection.monitoring.prompt]}
                            tone="strong"
                            className="mb-4"
                        />
                        <CheckList items={afterAccessSection.monitoring.insights} />

                        <ArrowLink
                            href={afterAccessSection.monitoring.link.href}
                            className="mt-8"
                        >
                            {afterAccessSection.monitoring.link.label}
                        </ArrowLink>
                    </div>

                    <div>
                        <div className="icon-wrapper mb-5">
                            <afterAccessSection.detection.icon className="w-5 h-5" />
                        </div>

                        <SectionHeading
                            as="h3"
                            size="sm"
                            title={afterAccessSection.detection.title}
                            titleClassName="max-w-3xl"
                        >
                            <Prose segments={afterAccessSection.detection.lead} className="mb-4" />
                            <Prose segments={afterAccessSection.detection.body} className="mb-4" />
                            <Prose segments={afterAccessSection.detection.note} />
                        </SectionHeading>

                        <ArrowLink href={afterAccessSection.detection.link.href} className="mt-8">
                            {afterAccessSection.detection.link.label}
                        </ArrowLink>
                    </div>
                </div>
            </Section>

            {/* ─── LEAST-PRIVILEGE PILLARS ──────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={pillarsSection.title} className="mb-2">
                        <Prose segments={pillarsSection.lead} className="mb-4" />
                        <Prose segments={pillarsSection.body} className="mb-4" />
                        <Prose segments={[pillarsSection.prompt]} tone="strong" />
                    </SectionHeading>
                </div>

                <IconCardGrid items={pillars} columns={3} className="mt-12" />

                <Prose segments={pillarsSection.note} className="mt-10 max-w-3xl" />
            </Section>

            {/* ─── SECURE AI WITHOUT PERMANENT PRIVILEGE ── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading title={finalSection.title}>
                        <Prose segments={finalSection.lead} className="mb-4" />
                        <Prose segments={finalSection.body} />
                    </SectionHeading>
                </div>
            </Section>

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                primary={closing.primary}
            />

            {/* ─── FAQ ──────────────────────────────── */}
            <FaqSection
                title={faqSection.title}
                subtitle={faqSection.subtitle}
                items={faqs}
            />
        </>
    );
}
