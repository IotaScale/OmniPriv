import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import CheckList from "@/components/sections/CheckList";
import ChipList from "@/components/sections/ChipList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";

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

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("machine-identity-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

export default function MachineIdentitySecurityPage() {
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
                <Prose segments={hero.body} className="text-lg mb-5" />
                <Prose segments={hero.note} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── WHAT IS MACHINE IDENTITY MANAGEMENT ── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={definitionSection.title}>
                    {definitionSection.paragraphs.map((paragraph, index) => (
                        <Prose
                            key={index}
                            segments={paragraph}
                            className={index === definitionSection.paragraphs.length - 1 ? "" : "mb-4"}
                        />
                    ))}
                </SectionHeading>
            </Section>

            {/* ─── RISKS ────────────────────────────── */}
            <Section border="bottom">
                <SectionHeading title={risksSection.title}>
                    {risksSection.paragraphs.map((paragraph, index) => (
                        <Prose key={index} segments={paragraph} className="mb-4" />
                    ))}
                </SectionHeading>

                <div className="max-w-3xl">
                    <CheckList items={risksSection.controls} className="mb-8" />

                    <Prose segments={risksSection.note} />
                </div>
            </Section>

            {/* ─── CREDENTIALS + CAPABILITY BLOCKS ──── */}
            <Section tone="muted" border="bottom">
                <SectionHeading title={credentialsSection.title}>
                    {credentialsSection.paragraphs.map((paragraph, index) => (
                        <Prose key={index} segments={paragraph} className="mb-4" />
                    ))}
                </SectionHeading>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 mt-14">
                    {capabilityBlocks.map((block) => (
                        <div key={block.title}>
                            <SectionHeading as="h3" size="sm" title={block.title}>
                                {block.paragraphs.map((paragraph, index) => (
                                    <Prose
                                        key={index}
                                        segments={paragraph}
                                        className={
                                            index === block.paragraphs.length - 1 ? "" : "mb-3"
                                        }
                                    />
                                ))}
                            </SectionHeading>
                        </div>
                    ))}
                </div>
            </Section>

            {/* ─── LEAST PRIVILEGE ──────────────────── */}
            <Section border="bottom">
                <SectionHeading title={leastPrivilegeSection.title}>
                    {leastPrivilegeSection.paragraphs.map((paragraph, index) => (
                        <Prose key={index} segments={paragraph} className="mb-4" />
                    ))}
                </SectionHeading>

                <div className="max-w-3xl">
                    <p className="text-slate-950 dark:text-white font-semibold text-lg mb-6">
                        {leastPrivilegeSection.principle}
                    </p>

                    <Prose segments={leastPrivilegeSection.note} />
                </div>
            </Section>

            {/* ─── INTELLIGENCE + MONITORING (dark band) ── */}
            <Section tone="dark" border="bottom">
                <SectionHeading title={intelligenceSection.title}>
                    {intelligenceSection.paragraphs.map((paragraph, index) => (
                        <Prose
                            key={index}
                            segments={paragraph}
                            className={
                                index === intelligenceSection.paragraphs.length - 1
                                    ? ""
                                    : "mb-4"
                            }
                        />
                    ))}
                </SectionHeading>

                <SectionHeading title={monitoringSection.title} className="mt-16">
                    {monitoringSection.paragraphs.map((paragraph, index) => (
                        <Prose
                            key={index}
                            segments={paragraph}
                            className={
                                index === monitoringSection.paragraphs.length - 1
                                    ? ""
                                    : "mb-4"
                            }
                        />
                    ))}
                </SectionHeading>
            </Section>

            {/* ─── COVERAGE ─────────────────────────── */}
            <Section border="bottom">
                <SectionHeading title={infrastructureSection.title}>
                    {infrastructureSection.paragraphs.map((paragraph, index) => (
                        <Prose key={index} segments={paragraph} className="mb-4" />
                    ))}
                    <Prose
                        segments={[infrastructureSection.prompt]}
                        tone="strong"
                        className="mb-5"
                    />
                </SectionHeading>

                <div className="max-w-3xl">
                    <ChipList
                        items={infrastructureSection.flow}
                        variant="accent"
                        align="center"
                        className="mb-5"
                        separator={
                            <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                        }
                    />

                    <Prose segments={infrastructureSection.note} />
                </div>
            </Section>

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
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
