import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

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
    aiSection,
    closing,
    credentials,
    faqSection,
    faqs,
    governancePoints,
    governanceSection,
    hero,
    jitSection,
    lifecycle,
    meta,
    personaSection,
    personas,
    sessionInsights,
    sessions,
} from "./data";

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("human-identity-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

export default function HumanIdentitySecurityPage() {
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

            {/* ─── WHO NEEDS PRIVILEGED ACCESS ──────── */}
            <Section tone="muted" border="bottom">
                <SectionHeading
                    badge={personaSection.badge}
                    title={personaSection.title}
                    className="max-w-3xl mb-12"
                >
                    <Prose segments={personaSection.intro} className="text-lg mb-4" />
                    <Prose segments={[personaSection.prompt]} tone="strong" />
                </SectionHeading>

                <IconCardGrid items={personas} columns={4} />

                <Prose segments={personaSection.closing} className="text-base mt-10 max-w-3xl" />
            </Section>

            {/* ─── JIT ACCESS ───────────────────────── */}
            <Section border="bottom">
                <MediaSplit media={jitSection.image} ratio="even" height="sm">
                    <SectionHeading badge={jitSection.badge} title={jitSection.title}>
                        <Prose segments={jitSection.lead} className="mb-4" />
                        <Prose segments={jitSection.body} className="mb-4" />
                        <Prose segments={jitSection.note} />
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
                </MediaSplit>
            </Section>

            {/* ─── CREDENTIALS + SESSIONS (dark band) ── */}
            <Section tone="dark" border="both">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                        <div className="icon-wrapper mb-5">
                            <credentials.icon className="w-5 h-5" />
                        </div>

                        <SectionHeading title={credentials.title}>
                            <Prose segments={credentials.lead} className="mb-4" />
                            <Prose segments={credentials.body} className="mb-4" />
                            <Prose segments={credentials.note} />
                        </SectionHeading>
                    </div>

                    <div>
                        <div className="icon-wrapper mb-5">
                            <sessions.icon className="w-5 h-5" />
                        </div>

                        <SectionHeading title={sessions.title}>
                            <Prose segments={sessions.lead} className="mb-4" />
                            <Prose segments={sessions.body} className="mb-6" />
                        </SectionHeading>

                        <Prose segments={[sessions.prompt]} tone="strong" className="mb-4" />
                        <CheckList items={sessionInsights} />
                    </div>
                </div>
            </Section>

            {/* ─── AI + GOVERNANCE ──────────────────── */}
            <Section border="bottom">
                <div className="mb-16">
                    <div className="icon-wrapper mb-5">
                        <aiSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={aiSection.title} titleClassName="max-w-3xl">
                        <div className="max-w-3xl">
                            <Prose segments={aiSection.lead} className="mb-4" />
                            <Prose segments={aiSection.body} className="mb-4" />
                            <Prose segments={aiSection.note} />
                        </div>
                    </SectionHeading>
                </div>

                <div>
                    <div className="icon-wrapper mb-5">
                        <governanceSection.icon className="w-5 h-5" />
                    </div>

                    <SectionHeading title={governanceSection.title} titleClassName="max-w-3xl">
                        <div className="max-w-3xl">
                            <Prose segments={governanceSection.lead} className="mb-6" />
                            <ChipList
                                items={governancePoints}
                                variant="neutral"
                                className="mb-6 gap-2.5"
                            />
                            <Prose segments={governanceSection.note} />
                        </div>
                    </SectionHeading>
                </div>
            </Section>

            {/* ─── CLOSING ──────────────────────────── */}
            <CtaBand
                badge={closing.badge}
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
