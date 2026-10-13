"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Check, Link2, Linkedin, Twitter } from "lucide-react";

/*
 * Client pieces for the blog article template (app/blog/[slug]):
 * a reading progress bar, a table of contents that follows the reader,
 * and share actions. The article itself stays server-rendered.
 */

/* Thin bar under the site header that fills as the article is read. */
export function ReadingProgress({ targetId }: { targetId: string }) {
    const reduce = useReducedMotion();
    const [el, setEl] = useState<HTMLElement | null>(null);
    useEffect(() => setEl(document.getElementById(targetId)), [targetId]);
    const { scrollYProgress } = useScroll({ target: el ? { current: el } : undefined, offset: ["start 72px", "end end"] });
    const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
    return (
        <motion.div
            className="fixed left-0 right-0 top-[72px] z-40 h-[3px] origin-left bg-[#00B8DB]"
            style={{ scaleX: reduce ? scrollYProgress : x }}
            aria-hidden="true"
        />
    );
}

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

/* Sticky "On this page" list; the section in view is highlighted. */
export function ArticleToc({ items }: { items: TocItem[] }) {
    const [active, setActive] = useState(items[0]?.id ?? "");
    useEffect(() => {
        const els = items.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        if (!els.length) return;
        const onScroll = () => {
            const line = 140;
            let cur = els[0].id;
            for (const e of els) {
                if (e.getBoundingClientRect().top - line <= 0) cur = e.id;
                else break;
            }
            setActive(cur);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [items]);

    if (items.length < 2) return null;
    return (
        <nav aria-label="On this page">
            <div className="text-[0.8125rem] font-semibold text-[#0a1628] dark:text-white">On this page</div>
            <ol className="mt-3 space-y-0.5 border-l border-slate-900/[0.08] dark:border-white/[0.08]">
                {items.map((t) => {
                    const on = t.id === active;
                    return (
                        <li key={t.id}>
                            <a
                                href={`#${t.id}`}
                                aria-current={on ? "location" : undefined}
                                className={`-ml-px block border-l-2 py-1.5 pr-2 text-[0.8125rem] leading-snug transition-colors duration-150 ${t.level === 3 ? "pl-6" : "pl-3.5"} ${on ? "border-[#00B8DB] font-semibold text-[#00667A] dark:text-[#7FE3F2]" : "border-transparent text-slate-500 hover:text-[#0a1628] dark:hover:text-white"}`}
                            >
                                {t.text}
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

/* Copy link plus LinkedIn and X share links for the current URL. */
export function ShareRow({ title }: { title: string }) {
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);
    useEffect(() => setUrl(window.location.href.split("#")[0]), []);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable: leave the button as is */
        }
    };
    const btn = "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-900/[0.1] dark:border-white/[0.1] text-slate-600 dark:text-slate-400 transition-colors duration-150 hover:border-[#00B8DB]/50 hover:text-[#00667A] dark:hover:text-[#7FE3F2] active:scale-[0.97]";
    return (
        <div>
            <div className="text-[0.8125rem] font-semibold text-[#0a1628] dark:text-white">Share</div>
            <div className="mt-3 flex items-center gap-2">
                <button type="button" onClick={copy} className={btn} aria-label={copied ? "Link copied" : "Copy link"}>
                    {copied ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} /> : <Link2 className="w-4 h-4" />}
                </button>
                <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                    <Linkedin className="w-4 h-4" />
                </a>
                <a className={btn} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                    <Twitter className="w-4 h-4" />
                </a>
                <span className={`text-[0.75rem] font-medium text-emerald-600 dark:text-emerald-400 transition-opacity duration-200 ${copied ? "opacity-100" : "opacity-0"}`} aria-live="polite">
                    {copied ? "Copied" : ""}
                </span>
            </div>
        </div>
    );
}
