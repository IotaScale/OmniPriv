import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, ClipboardCheck, Clock, Compass, ShieldCheck, Terminal, Timer } from "lucide-react";

import Spotlight from "@/components/aipam/Spotlight";
import BlogExplorer from "@/components/blog/BlogExplorer";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import CheckChips from "@/components/pageui/CheckChips";
import { ClosingBand, FactsStrip, FaqSplit, Heading, Paras, mutedBand, sectionLine } from "@/components/pageui/blocks";
import Prose from "@/components/sections/Prose";
import { getCover } from "@/lib/blog-covers";
import { posts } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import type { BlogCard, BlogCategory } from "@/components/blog/BlogIndex";
import type { FaqEntry } from "@/components/sections/FaqAccordion";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /blog, the article index. Server component; the search, topic filter and
 * grid live in components/blog/BlogExplorer.tsx and the signup in
 * BlogNewsletter.tsx. Built from the shared page kit (components/pageui) so
 * it matches the redesigned pages.
 *
 * The category list and every figure on the page are derived from the posts
 * themselves rather than hardcoded, so nothing drifts when posts change.
 */

export const metadata: Metadata = {
    title: { absolute: "Blog | OmniPriv Privileged Access Management Solution" },
    description:
        "Best practices, security research, compliance guidance and product updates on privileged access management from the OmniPriv team.",
};

/* Display-only overrides. The stored value stays singular so filtering works. */
const CATEGORY_LABELS: Record<string, string> = {
    "Case Study": "Case Studies",
};

const allEntries = Object.entries(posts);

/* Newest first, used for the fallback featured pick. */
const byNewest = [...allEntries].sort(
    (a, b) => new Date(b[1].date).getTime() - new Date(a[1].date).getTime(),
);

/*
 * The featured post is pinned by slug, but falls back to the newest post if
 * that slug is ever renamed. The previous version indexed the record directly
 * and then called .charAt() on the result, so removing the slug crashed the
 * build rather than degrading.
 */
const FEATURED_SLUG = "privileged-access-management-solutions-guide-2026";
const featuredSlug = posts[FEATURED_SLUG] ? FEATURED_SLUG : byNewest[0][0];

function toCard(slug: string, post: (typeof posts)[string]): BlogCard {
    return {
        category: post.category,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        readTime: post.readTime,
        author: post.author,
        authorTitle: post.authorTitle,
        href: `/blog/${slug}`,
        tags: post.tags,
        image: getCover(slug),
    };
}

const featured = toCard(featuredSlug, posts[featuredSlug]);
const gridPosts = byNewest
    .filter(([slug]) => slug !== featuredSlug)
    .map(([slug, post]) => toCard(slug, post));

/* Derived from the post data, so a new category in blog-data.ts appears here
   automatically instead of being silently unreachable. */
const counts = new Map<string, number>();
for (const [, post] of allEntries) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
}

const categories: BlogCategory[] = Array.from(counts.entries())
    .map(([value, count]) => ({
        value,
        label: CATEGORY_LABELS[value] ?? value,
        count,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));

const hero = {
    badge: "Blog & Insights",
    titleLead: "Guides for people who have to",
    titleAccent: "defend the decision.",
    intro: [
        "Best practices, security research, compliance guidance and product updates on privileged access, written to be read by the engineer, the auditor and the person signing the budget.",
    ] as RichText,
    body: [
        `${allEntries.length} articles across ${categories.length} topics, from first-principles explainers to deployment and protocol detail.`,
    ] as RichText,
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/platform", label: "Explore the Platform" },
    image: {
        src: "https://images.unsplash.com/photo-1653656120510-b800119e5b73?auto=format&fit=crop&w=1200&q=70",
        alt: "Person reading through printed documents beside a laptop at a desk",
    },
};

const picksSection = {
    title: "Where to start",
    lead: [
        "Four pieces that answer the questions we get asked most often before an evaluation.",
    ] as RichText,
};

const picks: IconCard[] = [
    {
        icon: BookOpen,
        eyebrow: "Start here",
        title: "What Is Privileged Access Management",
        text: "The category from first principles: what privileged access actually is, and why it is treated differently from ordinary user access.",
        href: "/blog/what-is-privileged-access-management",
    },
    {
        icon: Timer,
        eyebrow: "Just-in-time",
        title: "Why JIT Is Replacing Standing Access",
        text: "Standing privilege is the thing most organisations regret. How time-bound access changes the risk profile of an estate.",
        href: "/blog/jit-access-guide",
    },
    {
        icon: ShieldCheck,
        eyebrow: "Zero trust",
        title: "How to Implement Zero-Trust PAM",
        text: "A step-by-step enterprise guide to verifying privileged access regardless of where the request comes from.",
        href: "/blog/zero-trust-pam-guide",
    },
    {
        icon: ClipboardCheck,
        eyebrow: "Compliance",
        title: "SOC 2 Type II and PAM",
        text: "What auditors look for in privileged access controls, and which evidence they expect to be produced rather than reconstructed.",
        href: "/blog/soc2-pam-audit",
    },
];

const editorialSection = {
    title: "What we publish, and what we don't",
    lead: [
        "An editorial policy is only worth stating if it rules some things out. These four do.",
    ] as RichText,
};

const editorialPillars = [
    {
        icon: BookOpen,
        title: "No vendor league tables",
        text: "We do not write \u201ctop 10 PAM vendors\u201d pieces that happen to rank us first. If a comparison is useful, it explains the trade-offs rather than declaring a winner.",
    },
    {
        icon: ShieldCheck,
        title: "Framework-mapped, not framework-flavoured",
        text: "Compliance articles reference the actual control sets: SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404, rather than gesturing at \u201ccompliance\u201d generally.",
    },
    {
        icon: Terminal,
        title: "Deployment detail over positioning",
        text: "Protocol behaviour, architecture and operational consequences, because those are the things that decide whether a rollout succeeds.",
    },
    {
        icon: Compass,
        title: "Corrected, not quietly rewritten",
        text: "Articles are revised as the guidance changes. The date on each card reflects the published version, and substantive corrections are made in the open.",
    },
];

const closing = {
    title: "Read the deep dives, then test the claims",
    body: [
        "Nothing here needs to be taken on trust. The platform index lists what each module does, and the security page lists the frameworks its controls are mapped to.",
    ],
    kicker: "Explanations, not positioning.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "What does the blog cover?",
        answer:
            "Best practices, security research, compliance guidance, product updates and DevSecOps, across privileged access management generally rather than only our own product. Some articles are general explainers, what PAM is, how just-in-time access works, and others are implementation-level.",
    },
    {
        question: "Who writes the articles?",
        answer:
            "Articles are published under a team byline rather than individual attribution, because they are reviewed and updated by more than one person over their life. If you need to know who specifically authored or reviewed something, email us and we will tell you.",
    },
    {
        question: "How current are the guides?",
        answer:
            "Each card shows the publication date of the version you are reading. We update articles when the underlying guidance changes, including after platform releases, rather than leaving superseded advice live, but a dated guide is always worth checking against the current product documentation before you rely on a specific detail.",
    },
    {
        question: "Can I quote or republish an article?",
        answer:
            "Quoting with attribution and a link back is fine and needs no permission. For republishing an article in full, or translating one, email info@omnipriv.com and we will confirm.",
    },
    {
        question: "Where should I start if I am evaluating PAM?",
        answer:
            "The four pieces above, in order: what privileged access management is, why standing access is being replaced by just-in-time, how zero-trust changes the model, and what an auditor expects to see. After that the platform index is a better use of time than the blog.",
    },
];

/* Total reading time across every article, derived from the posts. */
const totalMinutes = allEntries.reduce((a, [, p]) => a + (parseInt(p.readTime, 10) || 0), 0);

const FACTS = [
    { value: allEntries.length, label: "articles, from explainers to deployment detail" },
    { value: categories.length, label: "topics, from best practice to security research" },
    { value: totalMinutes, suffix: " min", label: "of reading across the whole library" },
    { value: 6, label: "compliance frameworks referenced by their actual control sets" },
];

/* Every post, newest first, for the explorer (the featured one included). */
const allPosts = byNewest.map(([slug, post]) => toCard(slug, post));

/* Latest three after the featured post, for the hero rail. */
const latest = gridPosts.slice(0, 3);

const fmt = (d: string) => {
    const t = new Date(d);
    return Number.isNaN(t.getTime()) ? d : t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function BlogPage() {
    return (
        <div className="aip">
            <Spotlight />

            {/* ─── HERO: copy + featured article ─────────────────── */}
            <section id="bl-hero" className={cn("relative overflow-hidden", sectionLine)}>
                <div className="aip-hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                <div className="container-xl relative pt-14 pb-12 lg:pt-20 lg:pb-16">
                    <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-12 lg:gap-14 items-start">
                        <div className="min-w-0">
                            <h1 className="op-h1 aip-h1" data-aos="fade-up">
                                {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
                            </h1>
                            <div className="mt-6 max-w-[38rem]" data-aos="fade-up" data-aos-delay="120">
                                <Paras items={[hero.intro, hero.body]} />
                            </div>
                            <div className="mt-9 flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="180">
                                <Link href="#bl-articles" className="hp-btn-primary group">
                                    Browse the articles
                                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                </Link>
                                <Link href={hero.primary.href} className="hp-btn-secondary">
                                    {hero.primary.label}
                                </Link>
                            </div>

                            {/* latest rail */}
                            <div className="mt-10" data-aos="fade-up" data-aos-delay="220">
                                <div className="text-[0.8125rem] font-semibold text-slate-500">Latest</div>
                                <ul className="mt-3 divide-y divide-slate-900/[0.06] dark:divide-white/[0.06] border-y border-slate-900/[0.06] dark:border-white/[0.06]">
                                    {latest.map((p) => (
                                        <li key={p.href}>
                                            <Link href={p.href} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
                                                <span className="min-w-0">
                                                    <span className="block truncate text-[0.9375rem] font-semibold text-slate-800 dark:text-slate-100 transition-colors group-hover:text-[#00667A] dark:group-hover:text-[#7FE3F2]">{p.title}</span>
                                                    <span className="block text-[0.75rem] text-slate-500">
                                                        {CATEGORY_LABELS[p.category] ?? p.category} · {p.readTime}
                                                    </span>
                                                </span>
                                                <ArrowRight className="w-4 h-4 shrink-0 op-link transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* featured */}
                        <div className="min-w-0" data-aos="fade-up" data-aos-delay="120">
                            <Link href={featured.href} className="aip-card group block overflow-hidden rounded-3xl border">
                                {featured.image && (
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-[#15171a]">
                                        <Image src={featured.image.src} alt={featured.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 via-transparent to-transparent" aria-hidden="true" />
                                        <span className="absolute left-4 top-4 rounded-full bg-[#00B8DB] px-3 py-1 text-[0.75rem] font-semibold text-[#03121c]">Featured</span>
                                        <span className="absolute left-4 bottom-4 rounded-full bg-white/90 dark:bg-[#0b0c0e]/85 backdrop-blur px-3 py-1 text-[0.75rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                                            {CATEGORY_LABELS[featured.category] ?? featured.category}
                                        </span>
                                    </div>
                                )}
                                <div className="p-6 lg:p-8">
                                    <div className="flex flex-wrap items-center gap-3 text-[0.8125rem] text-slate-500">
                                        <span>{fmt(featured.date)}</span>
                                        <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                            {featured.readTime}
                                        </span>
                                    </div>
                                    <h2 className="mt-3 text-[1.5rem] lg:text-[1.75rem] font-bold leading-[1.15] tracking-[-0.02em] text-[#0a1628] dark:text-white transition-colors group-hover:text-[#00667A] dark:group-hover:text-[#7FE3F2]" style={{ fontFamily: "var(--font-syne)" }}>
                                        {featured.title}
                                    </h2>
                                    <p className="op-card-text mt-3 line-clamp-3">{featured.excerpt}</p>
                                    <div className="mt-5 flex flex-wrap gap-1.5">
                                        {featured.tags.slice(0, 4).map((t) => (
                                            <span key={t} className="rounded-lg border border-slate-900/[0.08] dark:border-white/[0.08] px-2.5 py-1 text-[0.75rem] text-slate-600 dark:text-slate-400">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold op-link">
                                        Read the guide
                                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <FactsStrip facts={FACTS} />
                </div>
            </section>

            {/* ─── ARTICLES ─────────────────────────────────────── */}
            <section id="bl-articles" className={cn(mutedBand, sectionLine, "scroll-mt-24")}>
                <div className="container-xl op-sec">
                    <Heading title="Every article" className="mb-8">
                        <p>Search the library, or narrow it to one topic.</p>
                    </Heading>
                    <BlogExplorer posts={allPosts} categories={categories} />
                </div>
            </section>

            {/* ─── WHERE TO START: a reading path ───────────────── */}
            <section id="bl-start" className={sectionLine}>
                <div className="container-xl op-sec">
                    <Heading title={picksSection.title}>
                        <Prose segments={picksSection.lead} className="text-[1.0625rem]" />
                    </Heading>
                    <ol className="op-body relative grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <span className="hidden xl:block absolute left-[12%] right-[12%] top-[2.1rem] h-px bg-gradient-to-r from-[#00B8DB]/10 via-[#00B8DB]/60 to-[#00B8DB]/10" aria-hidden="true" />
                        {picks.map((p, i) => (
                            <li key={p.title} className="relative min-w-0" data-aos="fade-up" data-aos-delay={String(i * 80)}>
                                <Link href={p.href ?? "/blog"} className="aip-card group flex h-full flex-col rounded-3xl border p-6">
                                    <span className="relative z-10 inline-flex w-11 h-11 items-center justify-center rounded-2xl bg-[#00B8DB] text-[#03121c] shadow-[0_0_0_6px_rgba(0,184,219,0.12)]">
                                        <p.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <span className="mt-5 text-[0.75rem] font-semibold op-link">{p.eyebrow}</span>
                                    <h3 className="op-card-title mt-1.5">{p.title}</h3>
                                    <p className="op-card-text mt-2">{p.text}</p>
                                    <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold op-link">
                                        {i === 0 ? "Start reading" : "Read next"}
                                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ol>
                    <div className="mt-8" data-aos="fade-up">
                        <Link href="/platform" className="inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold op-link group">
                            Browse the platform capabilities instead
                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── EDITORIAL POLICY (dark band) ───────────────────── */}
            <div className="dark">
                <section id="bl-policy" className="relative overflow-hidden op-band-navy">
                    <div className="aip-engine-glow pointer-events-none absolute inset-0" aria-hidden="true" />
                    <div className="container-xl op-sec relative">
                        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 lg:gap-16 items-start">
                            <div className="min-w-0 lg:sticky lg:top-32">
                                <Heading title={editorialSection.title}>
                                    <Prose segments={editorialSection.lead} className="text-[1.0625rem]" />
                                </Heading>
                                <div className="mt-8" data-aos="fade-up">
                                    <div className="text-[0.8125rem] font-semibold text-slate-400">Topics covered</div>
                                    <ul className="mt-3 flex flex-wrap gap-2">
                                        {categories.map((c) => (
                                            <li key={c.value} className="rounded-lg border border-[#00B8DB]/30 bg-[#00B8DB]/[0.07] px-2.5 py-1 text-[0.75rem] font-semibold text-[#7FE3F2]">
                                                {c.label} <span className="opacity-60 tabular-nums">{c.count}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="min-w-0 grid sm:grid-cols-2 gap-4">
                                {editorialPillars.map((p, i) => (
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
                    </div>
                </section>
            </div>

            {/* ─── NEWSLETTER ─────────────────────────────────────── */}
            <section id="bl-newsletter" className={cn(mutedBand, sectionLine)}>
                <div className="container-xl op-sec">
                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-8 lg:p-12" data-aos="fade-up">
                        <div className="pointer-events-none absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(0,184,219,0.18),transparent_65%)]" aria-hidden="true" />
                        <div className="relative grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8 lg:gap-14 items-center">
                            <div className="min-w-0">
                                <h2 className="op-h2">Get PAM insights in your inbox</h2>
                                <p className="mt-4 text-[1.0156rem] leading-[1.7] text-slate-600 dark:text-slate-400">
                                    New articles, plus product updates when a release changes something documented here. No spam, and you can unsubscribe at any time.
                                </p>
                            </div>
                            <div className="min-w-0">
                                <BlogNewsletter />
                                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.8125rem] text-slate-500">
                                    <li>New articles</li>
                                    <li>Release notes that change guidance</li>
                                    <li>Unsubscribe any time</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ClosingBand
                title={closing.title}
                accent={<CheckChips steps={["Read the deep dives"]} outcome="Test the claims" />}
                lead={closing.kicker}
                body={closing.body}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            <FaqSplit id="bl-faq" title="Frequently Asked Questions" items={faqs} />
        </div>
    );
}
