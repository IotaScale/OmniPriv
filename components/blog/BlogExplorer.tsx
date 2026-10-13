"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Clock, Search, X } from "lucide-react";

import type { BlogCard, BlogCategory } from "@/components/blog/BlogIndex";
import { cn } from "@/lib/utils";

/*
 * /blog article explorer: search, topic filter, sort and progressive
 * loading over the posts passed in from the server page. Categories are
 * derived from the posts (see app/blog/page.tsx), so a chip can never point
 * at an empty or missing category.
 */

const PAGE = 9;
const minutes = (r: string) => parseInt(r, 10) || 0;
const shortDate = (d: string) => {
    const t = new Date(d);
    return Number.isNaN(t.getTime()) ? d : t.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

export default function BlogExplorer({ posts, categories }: { posts: BlogCard[]; categories: BlogCategory[] }) {
    const reduce = useReducedMotion();
    const [cat, setCat] = useState("All");
    const [q, setQ] = useState("");
    const [sort, setSort] = useState<"newest" | "quick">("newest");
    const [shown, setShown] = useState(PAGE);

    const labelOf = (v: string) => categories.find((c) => c.value === v)?.label ?? v;

    const list = useMemo(() => {
        const needle = q.trim().toLowerCase();
        let out = posts.filter((p) => (cat === "All" || p.category === cat) && (!needle || [p.title, p.excerpt, p.category, ...p.tags].join(" ").toLowerCase().includes(needle)));
        if (sort === "quick") out = [...out].sort((a, b) => minutes(a.readTime) - minutes(b.readTime));
        return out;
    }, [posts, cat, q, sort]);

    const visible = list.slice(0, shown);
    const reset = () => {
        setCat("All");
        setQ("");
        setShown(PAGE);
    };
    const pick = (v: string) => {
        setCat(v);
        setShown(PAGE);
    };

    const chip = (value: string, label: string, count: number) => {
        const on = cat === value;
        return (
            <button
                key={value}
                type="button"
                onClick={() => pick(value)}
                aria-pressed={on}
                className={cn(
                    "relative shrink-0 rounded-full border px-3.5 py-1.5 text-[0.8125rem] font-semibold transition-colors duration-200",
                    on ? "border-transparent text-[#03121c]" : "border-slate-900/[0.08] dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:border-[#00B8DB]/35",
                )}
            >
                {on && <motion.span layoutId="blog-chip" className="absolute inset-0 rounded-full bg-[#00B8DB]" transition={{ type: "spring", stiffness: 420, damping: 34 }} aria-hidden="true" />}
                <span className="relative">
                    {label}
                    <span className={cn("ml-1.5 tabular-nums", on ? "opacity-70" : "opacity-50")}>{count}</span>
                </span>
            </button>
        );
    };

    return (
        <div>
            {/* toolbar */}
            <div className="lg:sticky lg:top-[4.75rem] z-20 -mx-4 px-4 py-3 bg-slate-50/90 dark:bg-[#0b0c0e]/90 backdrop-blur-xl border-y border-slate-900/[0.05] dark:border-white/[0.05] sm:mx-0 sm:px-4 sm:rounded-2xl sm:border">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                    <label className="relative flex-1 lg:max-w-xs">
                        <span className="sr-only">Search articles</span>
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                        <input
                            type="search"
                            value={q}
                            onChange={(e) => {
                                setQ(e.target.value);
                                setShown(PAGE);
                            }}
                            placeholder="Search guides, topics, tags"
                            className="w-full rounded-xl border border-slate-900/[0.1] dark:border-white/[0.1] bg-white dark:bg-[#15171a] pl-10 pr-9 py-2.5 text-[0.875rem] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-[#00B8DB]/60 focus:ring-2 focus:ring-[#00B8DB]/20"
                        />
                        {q && (
                            <button type="button" onClick={() => setQ("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex w-6 h-6 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white" aria-label="Clear search">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </label>
                    <div role="group" aria-label="Filter articles by topic" className="aip-noscroll flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
                        {chip("All", "All", posts.length)}
                        {categories.map((c) => chip(c.value, c.label, c.count))}
                    </div>
                    <div role="group" aria-label="Sort articles" className="flex shrink-0 rounded-xl border border-slate-900/[0.08] dark:border-white/[0.08] p-0.5 text-[0.75rem] font-semibold">
                        {(["newest", "quick"] as const).map((s) => (
                            <button key={s} type="button" onClick={() => setSort(s)} aria-pressed={sort === s} className={cn("rounded-lg px-3 py-1.5 transition-colors", sort === s ? "bg-slate-900 text-white dark:bg-white dark:text-[#0b0c0e]" : "text-slate-500 hover:text-slate-900 dark:hover:text-white")}>
                                {s === "newest" ? "Newest" : "Quickest read"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <p className="mt-6 text-[0.875rem] text-slate-500" aria-live="polite">
                {list.length === posts.length && cat === "All" && !q ? `${posts.length} articles` : `${list.length} of ${posts.length} articles`}
                {cat !== "All" && <> in <span className="font-semibold text-slate-700 dark:text-slate-300">{labelOf(cat)}</span></>}
                {q && <> matching “<span className="font-semibold text-slate-700 dark:text-slate-300">{q}</span>”</>}
            </p>

            {list.length === 0 ? (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-900/[0.12] dark:border-white/[0.12] p-10 text-center">
                    <div className="op-card-title">No articles match that yet</div>
                    <p className="mt-2 text-[0.9375rem] text-slate-500">Try a broader term, or browse every topic.</p>
                    <button type="button" onClick={reset} className="hp-btn-secondary mt-5">
                        Show all articles
                    </button>
                </div>
            ) : (
                <motion.ul layout={!reduce} className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((p) => (
                            <motion.li
                                key={p.href}
                                layout={!reduce}
                                initial={reduce ? false : { opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
                                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                className="min-w-0"
                            >
                                <Link href={p.href} className="aip-card group flex h-full flex-col overflow-hidden rounded-3xl border">
                                    {p.image && (
                                        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-[#15171a]">
                                            <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                                            <span className="absolute left-3 top-3 rounded-full bg-white/90 dark:bg-[#0b0c0e]/85 backdrop-blur px-2.5 py-1 text-[0.6875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">{labelOf(p.category)}</span>
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-5 lg:p-6">
                                        <div className="flex items-center gap-3 text-[0.75rem] text-slate-500">
                                            <span>{shortDate(p.date)}</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" aria-hidden="true" />
                                            <span className="inline-flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                                {p.readTime}
                                            </span>
                                        </div>
                                        <h3 className="op-card-title mt-3 line-clamp-2 transition-colors group-hover:text-[#00667A] dark:group-hover:text-[#7FE3F2]">{p.title}</h3>
                                        <p className="op-card-text mt-2 line-clamp-3">{p.excerpt}</p>
                                        <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold op-link">
                                            Read article
                                            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            )}

            {list.length > shown && (
                <div className="mt-10 flex flex-col items-center gap-3">
                    <button type="button" onClick={() => setShown((s) => s + PAGE)} className="hp-btn-secondary">
                        Show more articles
                    </button>
                    <span className="text-[0.75rem] text-slate-500">
                        Showing {visible.length} of {list.length}
                    </span>
                </div>
            )}
        </div>
    );
}
