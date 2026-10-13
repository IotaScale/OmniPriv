import type { Metadata } from "next";
import { BarChart3, Bell, CalendarClock, ScrollText, UserCheck } from "lucide-react";

import SectionNav from "@/components/aipam/SectionNav";
import Spotlight from "@/components/aipam/Spotlight";
import HumanHero from "@/components/human/HumanHero";
import { AnomalyVisual, ExposureVisual, RotationVisual } from "@/components/human/Visuals";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, KeepReading, PageHero, mutedBand, sectionLine } from "@/components/pageui/blocks";
import { SessionRecord } from "@/components/remote/Visuals";
import CheckList from "@/components/sections/CheckList";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";

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

/*
 * /solutions/human-identity-security. Copy lives in ./data.ts; this file is
 * layout only, built from the shared page kit (components/pageui) so it
 * matches the redesigned platform pages. Sample values in illustrations are
 * illustrative.
 */

/** Single source of truth for the slug, eyebrow and SEO metadata. */
const solution = requireSolution("human-identity-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};

const NAV = [
    { id: "hi-people", label: "Who we protect" },
    { id: "hi-jit", label: "JIT access" },
    { id: "hi-credentials", label: "Credentials & sessions" },
    { id: "hi-ai", label: "AI detection" },
    { id: "hi-governance", label: "Governance" },
    { id: "hi-faq", label: "FAQ" },
];

/* From this page's copy, plus the verified 39-feature behavioral model. */
const FACTS = [
    { value: 4, label: "kinds of human identity protected, from admins to vendors" },
    { value: 5, label: "lifecycle steps: verify, authorize, grant, monitor, revoke" },
    { value: 39, label: "behavioral features scored on privileged sessions" },
    { value: 0, label: "standing privilege left once the task window closes" },
];

/* The controls each persona card names, as a short profile row. */
const PROFILES = [
    ["MFA", "JIT access", "Monitored sessions"],
    ["No long-lived credentials"],
    ["Least privilege", "Conditional access"],
    ["Approvals", "Time limits", "Session visibility"],
];

const INTEGRATIONS = ["Identity providers", "Cloud platforms", "SIEM", "ITSM", "Databases", "Development environments"];

const GOV_ICONS = [ScrollText, UserCheck, BarChart3, Bell, CalendarClock];

/* Values for the session record, in the order of sessionInsights. */
const RECORD_VALUES = [
    "vendor.acme · win-db-02",
    "14:02, inside the approved window",
    "42 commands, recorded and searchable",
    "None flagged by behavioral analysis",
    "Closed on time, access revoked",
];

const keepReading = [
    { href: "/platform/workflow-access-control", label: "How JIT approvals are configured" },
    { href: "/platform/secure-remote-access", label: "Privileged session management" },
    { href: "/solutions/machine-identity-security", label: "Machine identity security" },
];

export default function HumanIdentitySecurityPage() {
    return (
        <div className="aip">
            <SectionNav items={NAV} startId="hi-hero" />
            <Spotlight />

            <PageHero
                id="hi-hero"
                titleLead={meta.titleLead}
                titleAccent={meta.titleAccent}
                paragraphs={[hero.intro, hero.body]}
                primary={hero.primary}
                secondary={hero.secondary}
                visual={<HumanHero />}
            >
                <FactsStrip facts={FACTS} />
            </PageHero>

            {/* ─── WHO WE PROTECT ───────────────────── */}
            <section id="hi-people" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={personaSection.title}>
                        <Prose segments={personaSection.intro} className="text-[1.0625rem]" />
                        <Prose segments={[personaSection.prompt]} tone="strong" />
                    </Heading>
                    <div className="op-body grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {personas.map((p, i) => (
                            <article key={p.title} className="aip-card min-w-0 rounded-3xl border p-6 flex flex-col" data-aos="fade-up" data-aos-delay={String(i * 70)}>
                                <span className="icon-wrapper">
                                    <p.icon className="w-5 h-5" aria-hidden="true" />
                                </span>
                                <h3 className="op-card-title mt-5">{p.title}</h3>
                                <p className="op-card-text mt-2">{p.text}</p>
                                <ul className="mt-auto pt-5 flex flex-wrap gap-1.5" aria-label={`${p.title} controls`}>
                                    {PROFILES[i].map((c) => (
                                        <li key={c} className="rounded-lg border border-[#00B8DB]/25 bg-[#00B8DB]/[0.06] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {c}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        ))}
                    </div>
                    <div className="mt-10 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6 lg:p-7 grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-5 items-center" data-aos="fade-up">
                        <Prose segments={personaSection.closing} className="text-[1.0156rem]" />
                        <ul className="flex flex-wrap gap-2 lg:justify-end">
                            {INTEGRATIONS.map((t) => (
                                <li key={t} className="rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-3 py-1.5 text-[0.8125rem] font-medium text-slate-700 dark:text-slate-300">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── JIT ACCESS ───────────────────────── */}
            <section id="hi-jit" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={jitSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={jitSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={jitSection.body} className="text-[1.0156rem]" />
                                <Prose segments={jitSection.note} className="text-[1.0156rem]" />
                            </div>
                            <Prose segments={[jitSection.prompt]} tone="strong" className="mt-8" />
                            <div className="mt-4">
                                <CheckChips steps={lifecycle.slice(0, -1)} outcome={lifecycle[lifecycle.length - 1]} />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <ExposureVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── CREDENTIALS + SESSIONS (dark band) ── */}
            <div className="dark">
                <section id="hi-credentials" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative space-y-20 lg:space-y-24">
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0">
                                <Heading title={credentials.title} />
                                <div className="mt-6 space-y-4">
                                    <Prose segments={credentials.lead} className="text-[1.0156rem]" />
                                    <Prose segments={credentials.body} className="text-[1.0156rem]" />
                                    <Prose segments={credentials.note} className="text-[1.0156rem]" />
                                </div>
                            </div>
                            <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                                <RotationVisual />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                            <div className="min-w-0 order-2 lg:order-1" data-aos="fade-up" data-aos-delay="100">
                                <SessionRecord labels={sessionInsights} values={RECORD_VALUES} />
                            </div>
                            <div className="min-w-0 order-1 lg:order-2">
                                <Heading title={sessions.title} />
                                <div className="mt-6 space-y-4">
                                    <Prose segments={sessions.lead} className="text-[1.0156rem]" />
                                    <Prose segments={sessions.body} className="text-[1.0156rem]" />
                                </div>
                                <Prose segments={[sessions.prompt]} tone="strong" className="mt-7" />
                                <CheckList items={sessionInsights} className="mt-4" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ─── AI ───────────────────────────────── */}
            <section id="hi-ai" className={sectionLine}>
                <div className="container-xl op-sec">
                    <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
                        <div className="min-w-0">
                            <Heading title={aiSection.title} />
                            <div className="mt-6 space-y-4">
                                <Prose segments={aiSection.lead} className="text-[1.0156rem]" />
                                <Prose segments={aiSection.body} className="text-[1.0156rem]" />
                                <Prose segments={aiSection.note} className="text-[1.0156rem]" />
                            </div>
                        </div>
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="100">
                            <AnomalyVisual />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── GOVERNANCE ───────────────────────── */}
            <section id="hi-governance" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <Heading title={governanceSection.title}>
                        <Prose segments={governanceSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <ul className="op-body grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                        {governancePoints.map((g, i) => {
                            const Icon = GOV_ICONS[i] ?? ScrollText;
                            return (
                                <li key={g} className="aip-card min-w-0 rounded-2xl border p-5 flex items-center gap-3 lg:flex-col lg:items-start" data-aos="fade-up" data-aos-delay={String(i * 60)}>
                                    <span className="icon-wrapper shrink-0">
                                        <Icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <span className="op-card-title text-[0.9844rem]">{g}</span>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-8 max-w-3xl" data-aos="fade-up">
                        <Prose segments={governanceSection.note} className="text-[1.0156rem]" />
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
                accent={<CheckChips steps={["Right person", "Right privilege", "Right reason"]} outcome="Right amount of time" />}
                lead={closing.body[0]}
                body={[...closing.body.slice(1), closing.kicker]}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="hi-faq" title={faqSection.title} items={faqs} />
        </div>
    );
}
