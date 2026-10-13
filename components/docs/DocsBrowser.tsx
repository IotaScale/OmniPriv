"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Code, Mail, Play, Server, Settings, Shield, Zap } from "lucide-react";

import { SUPPORT, ask } from "@/components/docs/support";
import { cn } from "@/lib/utils";

/*
 * Documentation browser for /docs. The guides are planned but not yet
 * published, so nothing here links to a /docs/<…> route (those would 404).
 * Each guide instead offers a pre-addressed email to support, which is the
 * real way to get that answer today. Icons are mapped here by title because
 * the server page cannot pass icon components to a client component.
 */

export interface DocSection {
    title: string;
    description: string;
    articles: { title: string; href: string }[];
}

const ICONS: Record<string, typeof Play> = {
    "Quick Start": Play,
    Administration: Settings,
    "Security & Compliance": Shield,
    "API Reference": Code,
    Integrations: Zap,
    Deployment: Server,
};


/* Hero: a preview of the documentation map, section by section. */
export function DocsHero({ sections }: { sections: DocSection[] }) {
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.3 });
    const [i, setI] = useState(0);
    useEffect(() => {
        if (reduce || !seen) return;
        const t = window.setInterval(() => setI((v) => (v + 1) % sections.length), 2400);
        return () => window.clearInterval(t);
    }, [seen, reduce, sections.length]);
    const s = sections[i];
    return (
        <div ref={ref} className="aip-console relative overflow-hidden" role="img" aria-label="Illustration: the OmniPriv documentation map, with six sections and the guides planned for each">
            <div className="flex items-center gap-2 px-4 h-11 border-b border-white/[0.08]">
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-[0.75rem] font-mono text-slate-400 truncate">docs · OmniPriv</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold text-amber-300 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 aip-blink" /> Being written
                </span>
            </div>
            <div className="grid grid-cols-[9.5rem_minmax(0,1fr)] min-h-[19rem]" aria-hidden="true">
                <ul className="border-r border-white/[0.06] p-2 space-y-0.5">
                    {sections.map((x, k) => {
                        const Icon = ICONS[x.title] ?? BookOpen;
                        return (
                            <li key={x.title} className={cn("flex items-center gap-2 rounded-lg px-2.5 py-2 text-[0.75rem] font-semibold transition-colors duration-300", k === i ? "bg-[#00B8DB]/[0.14] text-white" : "text-slate-500")}>
                                <Icon className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">{x.title}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="min-w-0 p-4">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={s.title} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                            <div className="text-[0.9375rem] font-semibold text-white">{s.title}</div>
                            <p className="mt-1 text-[0.75rem] leading-snug text-slate-400">{s.description}</p>
                            <ul className="mt-4 space-y-1.5">
                                {s.articles.map((a, k) => (
                                    <motion.li key={a.title} initial={reduce ? false : { opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: reduce ? 0 : 0.08 + k * 0.06 }} className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[0.75rem] text-slate-200">
                                        <BookOpen className="w-3.5 h-3.5 shrink-0 text-[#7FE3F2]" />
                                        <span className="truncate">{a.title}</span>
                                        <span className="ml-auto shrink-0 rounded bg-amber-400/10 px-1.5 py-0.5 text-[0.5625rem] font-semibold text-amber-300">planned</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3 px-4 h-10 border-t border-white/[0.08] text-[0.6875rem] text-slate-500">
                <span className="truncate">Until a guide is live, support answers it directly</span>
                <span className="font-mono shrink-0">{sections.reduce((a, x) => a + x.articles.length, 0)} guides</span>
            </div>
        </div>
    );
}

/* Section browser: pick a section, see its planned guides, ask support about any of them. */
export function DocsBrowser({ sections }: { sections: DocSection[] }) {
    const reduce = useReducedMotion();
    const [i, setI] = useState(0);
    const s = sections[i];
    const Icon = ICONS[s.title] ?? BookOpen;
    return (
        <div className="grid lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-5 items-start">
            <div role="tablist" aria-label="Documentation sections" className="aip-noscroll flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:sticky lg:top-40">
                {sections.map((x, k) => {
                    const I = ICONS[x.title] ?? BookOpen;
                    const on = k === i;
                    return (
                        <button
                            key={x.title}
                            role="tab"
                            type="button"
                            aria-selected={on}
                            aria-controls="docs-panel"
                            onClick={() => setI(k)}
                            className={cn("group relative shrink-0 flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors duration-200", on ? "border-[#00B8DB]/50 bg-[#00B8DB]/[0.07]" : "border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] hover:border-[#00B8DB]/35")}
                        >
                            <span className={cn("inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200", on ? "bg-[#00B8DB] text-[#03121c]" : "bg-[#00B8DB]/10 text-[#00667A] dark:text-[#7FE3F2]")}>
                                <I className="w-4 h-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                                <span className="block whitespace-nowrap text-[0.9375rem] font-semibold text-slate-800 dark:text-white">{x.title}</span>
                                <span className="hidden lg:block text-[0.75rem] text-slate-600 dark:text-slate-400">{x.articles.length} guides</span>
                            </span>
                            <ArrowRight className={cn("ml-auto hidden lg:block w-4 h-4 shrink-0 transition-all duration-200", on ? "op-link translate-x-0" : "text-slate-300 dark:text-slate-600 -translate-x-1")} aria-hidden="true" />
                        </button>
                    );
                })}
            </div>

            <div id="docs-panel" role="tabpanel" className="min-w-0 rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6 lg:p-8">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={s.title} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.12 } }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                        <div className="flex items-start gap-4">
                            <span className="icon-wrapper shrink-0">
                                <Icon className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                                <h3 className="op-h3">{s.title}</h3>
                                <p className="op-card-text mt-1.5">{s.description}</p>
                            </div>
                        </div>
                        <ul className="mt-6 divide-y divide-slate-900/[0.06] dark:divide-white/[0.06] border-y border-slate-900/[0.06] dark:border-white/[0.06]">
                            {s.articles.map((a) => (
                                <li key={a.title} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3.5">
                                    <span className="flex min-w-0 items-center gap-3">
                                        <BookOpen className="w-4 h-4 shrink-0 op-link" aria-hidden="true" />
                                        <span className="text-[0.9375rem] font-medium text-slate-800 dark:text-slate-200">{a.title}</span>
                                    </span>
                                    <span className="sm:ml-auto flex shrink-0 items-center gap-3 pl-7 sm:pl-0">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[0.6875rem] font-semibold text-amber-700 dark:text-amber-300">
                                            <Clock className="w-3 h-3" aria-hidden="true" /> Coming soon
                                        </span>
                                        <a href={ask(a.title)} className="inline-flex items-center gap-1 text-[0.8125rem] font-semibold op-link hover:underline">
                                            <Mail className="w-3.5 h-3.5" aria-hidden="true" /> Ask support
                                        </a>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-[0.8125rem] text-slate-500">
                            Need this today? Email{" "}
                            <a href={ask(s.title)} className="font-semibold op-link hover:underline">
                                {SUPPORT}
                            </a>{" "}
                            and the support team will answer it directly.
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
