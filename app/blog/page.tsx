import type { Metadata } from "next";
import {
    BookOpen,
    ClipboardCheck,
    Compass,
    ShieldCheck,
    Terminal,
    Timer,
} from "lucide-react";

import ArrowLink from "@/components/sections/ArrowLink";
import ChipList from "@/components/sections/ChipList";
import CtaBand from "@/components/sections/CtaBand";
import FaqSection from "@/components/sections/FaqSection";
import IconCardGrid from "@/components/sections/IconCardGrid";
import Prose from "@/components/sections/Prose";
import Section from "@/components/sections/Section";
import SectionHeading from "@/components/sections/SectionHeading";
import SplitHero from "@/components/sections/SplitHero";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { getCover } from "@/lib/blog-covers";
import { posts } from "@/lib/blog-data";
import type { BlogCard, BlogCategory } from "@/components/blog/BlogIndex";
import type { FaqEntry } from "@/components/sections/FaqSection";
import type { IconCard } from "@/components/sections/IconCardGrid";
import type { RichText } from "@/lib/rich-text";

/*
 * /blog — the article index.
 *
 * Previously a single "use client" page with five hand-rolled sections, which
 * blocked the shared section library. The filter/grid now live in
 * components/blog/BlogIndex.tsx and the signup in BlogNewsletter.tsx, so this
 * file is a server component and composes the same primitives as the rest of
 * the site. The hero had no imagery; that is fixed below.
 *
 * The category list is derived from the posts themselves rather than a
 * hardcoded array. See BlogIndex.tsx for the two filter bugs that drift caused.
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

/* Newest first — used for the fallback featured pick. */
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
        "Best practices, security research, compliance guidance and product updates on privileged access — written to be read by the engineer, the auditor and the person signing the budget.",
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
        text: "Compliance articles reference the actual control sets — SOC 2, ISO 27001, NIST SP 800-53, HIPAA, PCI DSS and SOX 404 — rather than gesturing at \u201ccompliance\u201d generally.",
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
        "Nothing here needs to be taken on trust. The platform index lists what each module does, and the security page carries the certifications behind it.",
    ],
    kicker: "Explanations, not positioning.",
    primary: { href: "/demo", label: "Request a Demo" },
    secondary: { href: "/security", label: "Security Posture" },
};

const faqs: FaqEntry[] = [
    {
        question: "What does the blog cover?",
        answer:
            "Best practices, security research, compliance guidance, product updates and DevSecOps, across privileged access management generally rather than only our own product. Some articles are general explainers — what PAM is, how just-in-time access works — and others are implementation-level.",
    },
    {
        question: "Who writes the articles?",
        answer:
            "Articles are published under a team byline rather than individual attribution, because they are reviewed and updated by more than one person over their life. If you need to know who specifically authored or reviewed something, email us and we will tell you.",
    },
    {
        question: "How current are the guides?",
        answer:
            "Each card shows the publication date of the version you are reading. We update articles when the underlying guidance changes, including after platform releases, rather than leaving superseded advice live — but a dated guide is always worth checking against the current product documentation before you rely on a specific detail.",
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

export default function BlogPage() {
    return (
        <>
            <SplitHero
                badge={hero.badge}
                titleLead={hero.titleLead}
                titleAccent={hero.titleAccent}
                primary={hero.primary}
                secondary={hero.secondary}
                media={hero.image}
            >
                <Prose segments={hero.intro} className="text-lg mb-5" />
                <Prose segments={hero.body} className="text-lg mb-8" />
            </SplitHero>

            {/* ─── FILTER + FEATURED + GRID ───────────────────────── */}
            <BlogIndex featured={featured} posts={gridPosts} categories={categories} />

            {/* ─── WHERE TO START ─────────────────────────────────── */}
            <Section border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading badge="Editor's Picks" title={picksSection.title} className="mb-2">
                        <Prose segments={picksSection.lead} />
                    </SectionHeading>
                </div>

                <IconCardGrid items={picks} columns={4} className="mt-12" />

                <div className="mt-12">
                    <ArrowLink href="/platform">Browse the platform capabilities instead</ArrowLink>
                </div>
            </Section>

            {/* ─── EDITORIAL POLICY (dark band) ───────────────────── */}
            <Section tone="dark" border="bottom">
                <div className="max-w-3xl">
                    <SectionHeading
                        badge="Editorial Policy"
                        title={editorialSection.title}
                        className="mb-2"
                    >
                        <Prose segments={editorialSection.lead} />
                    </SectionHeading>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mt-14">
                    {editorialPillars.map((pillar) => (
                        <div key={pillar.title}>
                            <div className="icon-wrapper mb-5">
                                <pillar.icon className="w-5 h-5" />
                            </div>

                            <SectionHeading
                                as="h3"
                                size="sm"
                                title={pillar.title}
                                titleClassName="max-w-3xl"
                            >
                                <Prose segments={[pillar.text]} />
                            </SectionHeading>
                        </div>
                    ))}
                </div>

                <div className="mt-14">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
                        Topics covered
                    </p>
                    <ChipList
                        items={categories.map((category) => category.label)}
                        variant="accent"
                        separator={<span className="text-slate-500 text-sm">·</span>}
                    />
                </div>
            </Section>

            {/* ─── NEWSLETTER ─────────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <div className="max-w-2xl mx-auto text-center">
                    <SectionHeading
                        badge="Newsletter"
                        title="Get PAM insights in your inbox"
                        align="center"
                        size="lg"
                        className="mb-7"
                    >
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            New articles, plus product updates when a release changes something
                            documented here. No spam, and you can unsubscribe at any time.
                        </p>
                    </SectionHeading>

                    <BlogNewsletter />
                </div>
            </Section>

            {/* ─── CLOSING ────────────────────────────────────────── */}
            <CtaBand
                title={closing.title}
                body={closing.body}
                kicker={closing.kicker}
                primary={closing.primary}
                secondary={closing.secondary}
            />

            {/* ─── FAQ ────────────────────────────────────────────── */}
            <FaqSection
                title="Frequently Asked Questions"
                subtitle="Common questions about the articles, attribution and where to begin."
                items={faqs}
            />
        </>
    );
}
