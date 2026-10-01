"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ChevronRight, Clock } from "lucide-react";

import Section from "@/components/sections/Section";
import { cardBorder, cardSurface, sectionBorder } from "@/lib/styles";
import { cn } from "@/lib/utils";

/*
 * The interactive half of /blog: the category filter, the featured post and
 * the posts grid.
 *
 * Split out of app/blog/page.tsx so that page can be a server component and
 * use the shared section library.
 *
 * The category filter used to be driven by a hardcoded array in the page
 * while posts carried their own `category` strings, and the two had drifted
 * apart. Two bugs followed:
 *
 *   1. The chip was labelled "Case Studies" but every post's category is
 *      "Case Study", so selecting it filtered to nothing — an empty grid.
 *   2. "PAM Solutions", "Enterprise Security" and "Security Advisory" (six
 *      posts) had no chip at all and were only reachable under "All".
 *
 * The chip list is now passed in from the server page, derived from the post
 * data itself, so it cannot drift again. Filtering still matches on the raw
 * category value while the chip displays a friendlier label.
 */

export interface BlogCard {
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    author: string;
    authorTitle: string;
    href: string;
    tags: string[];
    /** Cover art. Optional so the index renders before covers are populated. */
    image?: { src: string; alt: string };
}

export interface BlogCategory {
    /** Raw category value as stored on the post. */
    value: string;
    /** Display label for the chip. */
    label: string;
    count: number;
}

export interface BlogIndexProps {
    featured: BlogCard;
    posts: BlogCard[];
    categories: BlogCategory[];
}

function getTagColor(category: string) {
    const colors: Record<string, string> = {
        "Best Practices": "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
        "Security Research": "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
        "Case Study": "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
        "Product Updates": "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
        "Compliance": "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20",
        "DevSecOps": "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20",
        "PAM Solutions": "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
        "Enterprise Security": "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20",
        "Security Advisory": "bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20",
    };
    return colors[category] ?? "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
}

export default function BlogIndex({ featured, posts, categories }: BlogIndexProps) {
    const [activeCategory, setActiveCategory] = useState("All");

    const labelOf = (value: string) =>
        categories.find((category) => category.value === value)?.label ?? value;

    const filteredPosts =
        activeCategory === "All"
            ? posts
            : posts.filter((post) => post.category === activeCategory);

    return (
        <>
            {/* ─── FILTER BAR ─────────────────────────────────────── */}
            <section
                className={cn(
                    "sticky top-[72px] z-30 py-5 border-b backdrop-blur-xl bg-white/95 dark:bg-[#030711]/95",
                    sectionBorder,
                )}
            >
                <div className="container-xl">
                    <div
                        role="group"
                        aria-label="Filter articles by category"
                        className="flex items-center gap-2 overflow-x-auto pb-1"
                    >
                        <button
                            type="button"
                            onClick={() => setActiveCategory("All")}
                            aria-pressed={activeCategory === "All"}
                            className={cn(
                                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                                activeCategory === "All"
                                    ? "bg-[#00B8FF]/15 border-[#00B8FF]/30 text-[#00B8FF]"
                                    : "bg-transparent border-slate-900/[0.08] dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:border-[#00B8FF]/20 hover:text-slate-950 dark:hover:text-white",
                            )}
                        >
                            All
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category.value}
                                type="button"
                                onClick={() => setActiveCategory(category.value)}
                                aria-pressed={activeCategory === category.value}
                                className={cn(
                                    "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
                                    activeCategory === category.value
                                        ? "bg-[#00B8FF]/15 border-[#00B8FF]/30 text-[#00B8FF]"
                                        : "bg-transparent border-slate-900/[0.08] dark:border-white/[0.06] text-slate-600 dark:text-slate-400 hover:border-[#00B8FF]/20 hover:text-slate-950 dark:hover:text-white",
                                )}
                            >
                                {category.label}
                                <span className="ml-1.5 opacity-60">{category.count}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FEATURED + GRID ────────────────────────────────── */}
            <Section tone="muted" border="bottom">
                <Link
                    href={featured.href}
                    className={cn(
                        "group block relative rounded-2xl border overflow-hidden transition-all duration-300 card-shine hover:border-[#00B8FF]/40",
                        cardBorder,
                        cardSurface,
                    )}
                >
                    <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
                    <div
                        className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none z-10"
                        style={{
                            background: "radial-gradient(circle, #00B8FF 0%, transparent 60%)",
                        }}
                        aria-hidden="true"
                    />

                    <div className="relative z-20 grid lg:grid-cols-[1.15fr_1fr]">
                        <div className="p-8 md:p-12 order-2 lg:order-1">
                            <div className="flex items-center gap-3 mb-5">
                                <span
                                    className={cn(
                                        "px-3 py-1 rounded-full border text-xs font-semibold",
                                        getTagColor(featured.category),
                                    )}
                                >
                                    {labelOf(featured.category)}
                                </span>
                                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                                    Featured
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-950 dark:text-white mb-4 leading-tight group-hover:text-[#00B8FF] transition-colors max-w-3xl">
                                {featured.title}
                            </h2>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 max-w-2xl">
                                {featured.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                {featured.tags.map((tag) => (
                                    <span key={tag} className="tag text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00B8FF]/40 to-[#0060FF]/40 flex items-center justify-center text-slate-950 dark:text-white text-sm font-bold">
                                        {featured.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-slate-950 dark:text-white text-sm font-semibold">
                                            {featured.author}
                                        </div>
                                        <div className="text-slate-500 text-xs">
                                            {featured.authorTitle}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" aria-hidden="true" />
                                        {featured.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" aria-hidden="true" />
                                        {featured.readTime}
                                    </span>
                                    <span className="text-[#00B8FF] font-semibold flex items-center gap-1">
                                        Read Article
                                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                                    </span>
                                </div>
                            </div>
                        </div>

                        {featured.image && (
                            <div className="relative h-56 lg:h-auto lg:min-h-[320px] order-1 lg:order-2">
                                <Image
                                    src={featured.image.src}
                                    alt={featured.image.alt}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                </Link>

                <div className="mt-12">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
                        {activeCategory === "All"
                            ? `All articles (${posts.length})`
                            : `${labelOf(activeCategory)} (${filteredPosts.length})`}
                    </h2>

                    {filteredPosts.length === 0 ? (
                        <p className="text-slate-600 dark:text-slate-400">
                            No articles in this category yet.
                        </p>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <Link
                                    key={post.href}
                                    href={post.href}
                                    className={cn(
                                        "group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 card-shine hover:border-[#00B8FF]/40 hover:-translate-y-1",
                                        cardBorder,
                                        cardSurface,
                                    )}
                                >
                                    {post.image && (
                                        <div className="relative h-40 w-full overflow-hidden">
                                            <Image
                                                src={post.image.src}
                                                alt={post.image.alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                    )}

                                    <div className="flex flex-col flex-1 p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span
                                                className={cn(
                                                    "px-2.5 py-1 rounded-full border text-xs font-semibold",
                                                    getTagColor(post.category),
                                                )}
                                            >
                                                {labelOf(post.category)}
                                            </span>
                                        </div>

                                        <h3 className="text-base font-bold text-slate-950 dark:text-white mb-3 group-hover:text-[#00B8FF] transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="tag text-[11px]">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between border-t border-slate-900/[0.06] dark:border-white/[0.05] pt-4 mt-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00B8FF]/30 to-[#0060FF]/30 flex items-center justify-center text-slate-950 dark:text-white text-xs font-bold">
                                                    {post.author.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-950 dark:text-white font-medium leading-tight">
                                                        {post.author}
                                                    </div>
                                                    <div className="text-[10px] text-slate-500">
                                                        {post.readTime}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Calendar className="w-3 h-3" aria-hidden="true" />
                                                {post.date.split(",")[0].split(" ").slice(0, 2).join(" ")}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </Section>
        </>
    );
}
