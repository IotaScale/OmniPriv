import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CountUp from "@/components/home/CountUp";
import Breadcrumbs from "@/components/pageui/Breadcrumbs";
import FaqAccordion, { type FaqEntry } from "@/components/sections/FaqAccordion";
import Prose from "@/components/sections/Prose";
import { cn } from "@/lib/utils";
import type { RichText } from "@/lib/rich-text";

/*
 * Shared building blocks for the redesigned interior pages (first used on
 * /ai-pam). One heading style, one copy rhythm, one hero, one figures strip,
 * one closing band and one FAQ layout, so every page reads as the same site.
 * Classes prefixed `aip-` live in app/globals.css.
 */

export const sectionLine = "border-b border-slate-900/[0.05] dark:border-white/[0.04]";
export const mutedBand = "op-band-muted bg-slate-50";

export function Heading({ title, children, className, as: Tag = "h2" }: { title: React.ReactNode; children?: React.ReactNode; className?: string; as?: "h2" | "h3" }) {
    return (
        <div className={cn("max-w-3xl", className)} data-aos="fade-up">
            <Tag className="op-h2">{title}</Tag>
            {children && <div className="mt-4 space-y-3 aip-lede">{children}</div>}
        </div>
    );
}

export function Paras({ items, className, size = "text-[1.0156rem]" }: { items: RichText[]; className?: string; size?: string }) {
    return (
        <div className={cn("space-y-4", className)}>
            {items.map((p, i) => (
                <Prose key={i} segments={p} className={size} />
            ))}
        </div>
    );
}

export interface Action {
    href: string;
    label: string;
}

/* Interior hero: copy on the left, a live product visual on the right. */
export function PageHero({
    id = "page-hero",
    titleLead,
    titleAccent,
    tagline,
    paragraphs,
    primary,
    secondary,
    visual,
    children,
}: {
    id?: string;
    titleLead: React.ReactNode;
    titleAccent?: React.ReactNode;
    tagline?: string;
    paragraphs: RichText[];
    primary: Action;
    secondary?: Action;
    visual: React.ReactNode;
    /** Rendered under the two columns, e.g. a FactsStrip. */
    children?: React.ReactNode;
}) {
    return (
        <section id={id} className={cn("relative overflow-hidden", sectionLine)}>
            <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="container-xl relative pt-14 pb-12 lg:pt-20 lg:pb-16">
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] gap-12 lg:gap-14 items-center">
                    <div className="min-w-0">
                        <Breadcrumbs />
                        <h1 className="op-h1 aip-h1" data-aos="fade-up">
                            {titleLead} {titleAccent && <span className="text-gradient">{titleAccent}</span>}
                        </h1>
                        {tagline && (
                            <p className="mt-6 text-[1.125rem] sm:text-[1.25rem] leading-snug font-semibold text-[#0a1628] dark:text-white max-w-[36rem]" data-aos="fade-up" data-aos-delay="60">
                                {tagline}
                            </p>
                        )}
                        <div className="mt-6 max-w-[38rem]" data-aos="fade-up" data-aos-delay="120">
                            <Paras items={paragraphs} />
                        </div>
                        <div className="mt-9 flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="180">
                            <Link href={primary.href} className="hp-btn-primary group">
                                {primary.label}
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                            {secondary && (
                                <Link href={secondary.href} className="hp-btn-secondary">
                                    {secondary.label}
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="min-w-0" data-aos="fade-up" data-aos-delay="120">
                        {visual}
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
}

export interface Fact {
    value: number | string;
    suffix?: string;
    label: string;
}

export function FactsStrip({ facts }: { facts: Fact[] }) {
    return (
        <dl className="mt-14 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-white/[0.02]" data-aos="fade-up">
            {facts.map((f) => (
                <div key={f.label} className="aip-fact px-5 py-5 lg:px-6">
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                        <span className="block text-[2rem] leading-none font-bold tracking-[-0.03em] text-[#0a1628] dark:text-white" style={{ fontFamily: "var(--font-syne)" }}>
                            {typeof f.value === "number" ? <CountUp to={f.value} suffix={f.suffix ?? ""} /> : f.value}
                        </span>
                        <span className="mt-2 block text-[0.8125rem] leading-snug text-slate-600 dark:text-slate-400">{f.label}</span>
                    </dd>
                </div>
            ))}
        </dl>
    );
}

/* Dark closing band: copy left, actions right, optional element under the title. */
export function ClosingBand({
    title,
    lead,
    body,
    primary,
    secondary,
    accent,
}: {
    title: string;
    lead?: string;
    body: string[];
    primary: Action;
    secondary?: Action;
    accent?: React.ReactNode;
}) {
    return (
        <div className="dark">
            <section className="relative overflow-hidden op-band-navy">
                <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl op-sec relative">
                    <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-10 items-center">
                        <div data-aos="fade-up">
                            <h2 className="op-h2 op-h2-lg">{title}</h2>
                            {accent && <div className="mt-6">{accent}</div>}
                            {lead && <p className="mt-5 text-[1.1875rem] font-semibold text-white">{lead}</p>}
                            <div className="mt-4 space-y-3 max-w-[40rem]">
                                {body.map((b) => (
                                    <p key={b} className="text-[1.0156rem] leading-[1.7] text-slate-400">
                                        {b}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-stretch lg:max-w-[18rem] lg:ml-auto w-full" data-aos="fade-up" data-aos-delay="100">
                            <Link href={primary.href} className="hp-btn-primary group">
                                {primary.label}
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                            {secondary && (
                                <Link href={secondary.href} className="hp-btn-secondary">
                                    {secondary.label}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

/* FAQ: sticky heading + contact card left, accordion right, FAQPage schema. */
export function FaqSplit({ id = "page-faq", title, lead, items }: { id?: string; title: string; lead?: string; items: FaqEntry[] }) {
    return (
        <section id={id} className={sectionLine}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: items.map((f) => ({
                            "@type": "Question",
                            name: f.question,
                            acceptedAnswer: { "@type": "Answer", text: Array.isArray(f.answer) ? f.answer.join(" ") : f.answer },
                        })),
                    }),
                }}
            />
            <div className="container-xl op-sec">
                <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 lg:gap-16 items-start">
                    <div className="lg:sticky lg:top-40" data-aos="fade-up">
                        <h2 className="op-h2">{title}</h2>
                        {lead && <p className="mt-4 text-[1.0156rem] leading-relaxed text-slate-600 dark:text-slate-400">{lead}</p>}
                        <div className="mt-8 rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-slate-50 dark:bg-[#15171a] p-6">
                            <div className="op-card-title">Have a question that is not here?</div>
                            <p className="mt-2 text-[0.9375rem] text-slate-600 dark:text-slate-400">Talk to the OmniPriv team about your identities, systems and AI agents.</p>
                            <Link href="/demo" className="mt-5 op-link inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold group">
                                Request a Demo
                                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="80">
                        <FaqAccordion items={items} idPrefix={id} />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* "Keep reading" row of linked cards. */
export function KeepReading({ links }: { links: Action[] }) {
    return (
        <div className="grid sm:grid-cols-3 gap-4" data-aos="fade-up">
            {links.map((l) => (
                <Link key={l.href} href={l.href} className="aip-card group flex items-center justify-between gap-4 rounded-2xl border p-5">
                    <span className="op-card-title text-[0.9844rem]">{l.label}</span>
                    <ArrowRight className="w-4 h-4 shrink-0 op-link transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
            ))}
        </div>
    );
}
