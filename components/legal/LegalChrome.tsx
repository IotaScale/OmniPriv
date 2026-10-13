"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, Check, Link2, Printer } from "lucide-react";

/*
 * Client pieces for the shared legal layout (components/legal/LegalDocument):
 * a reading progress bar, a contents list that follows the reader, a copy
 * link per section, print, and back to top. The document stays server-rendered.
 */

export function LegalProgress({ targetId }: { targetId: string }) {
    const reduce = useReducedMotion();
    const [el, setEl] = useState<HTMLElement | null>(null);
    useEffect(() => setEl(document.getElementById(targetId)), [targetId]);
    const { scrollYProgress } = useScroll({ target: el ? { current: el } : undefined, offset: ["start 72px", "end end"] });
    const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
    return <motion.div className="fixed left-0 right-0 top-[72px] z-40 h-[3px] origin-left bg-[#00B8DB] print:hidden" style={{ scaleX: reduce ? scrollYProgress : x }} aria-hidden="true" />;
}

export interface TocEntry {
    id: string;
    num: string;
    title: string;
}

export function LegalToc({ items }: { items: TocEntry[] }) {
    const [active, setActive] = useState(items[0]?.id ?? "");
    useEffect(() => {
        const els = items.map((t) => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
        if (!els.length) return;
        const onScroll = () => {
            let cur = els[0].id;
            for (const e of els) {
                if (e.getBoundingClientRect().top - 150 <= 0) cur = e.id;
                else break;
            }
            /* At the very bottom, the last section is current even if it is short. */
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) cur = els[els.length - 1].id;
            setActive(cur);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [items]);

    const idx = Math.max(0, items.findIndex((t) => t.id === active));
    return (
        <nav aria-label="Contents">
            <div className="flex items-center justify-between gap-3">
                <span className="text-[0.8125rem] font-semibold text-[#0a1628] dark:text-white">Contents</span>
                <span className="text-[0.75rem] tabular-nums text-slate-500">
                    {idx + 1} / {items.length}
                </span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-900/[0.06] dark:bg-white/[0.06]" aria-hidden="true">
                <div className="h-full rounded-full bg-[#00B8DB] transition-[width] duration-300 ease-out" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
            </div>
            <ol className="mt-4 space-y-0.5">
                {items.map((t) => {
                    const on = t.id === active;
                    return (
                        <li key={t.id}>
                            <a
                                href={`#${t.id}`}
                                aria-current={on ? "location" : undefined}
                                className={`grid grid-cols-[1.75rem_minmax(0,1fr)] items-baseline gap-1 rounded-lg px-2 py-1.5 text-[0.8125rem] leading-snug transition-colors duration-150 ${on ? "bg-[#00B8DB]/[0.08] font-semibold text-[#00667A] dark:text-[#7FE3F2]" : "text-slate-500 hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.04] hover:text-[#0a1628] dark:hover:text-white"}`}
                            >
                                <span className="tabular-nums text-[0.75rem] opacity-70">{t.num}</span>
                                <span>{t.title}</span>
                            </a>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}

/* Copies a link to one section. */
export function SectionLink({ id, title }: { id: string; title: string }) {
    const [done, setDone] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.href.split("#")[0]}#${id}`);
            setDone(true);
            window.setTimeout(() => setDone(false), 1600);
        } catch {
            window.location.hash = id;
        }
    };
    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 opacity-0 transition-opacity duration-150 hover:bg-slate-900/[0.05] hover:text-[#00667A] focus-visible:opacity-100 group-hover:opacity-100 dark:hover:bg-white/[0.06] dark:hover:text-[#7FE3F2] print:hidden [@media(hover:none)]:opacity-100"
            aria-label={done ? `Link to ${title} copied` : `Copy link to ${title}`}
        >
            {done ? <Check className="w-4 h-4 text-emerald-500" strokeWidth={3} /> : <Link2 className="w-4 h-4" />}
        </button>
    );
}

export function PrintButton() {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-900/[0.1] dark:border-white/[0.1] bg-white dark:bg-[#15171a] px-4 text-[0.875rem] font-semibold text-slate-700 dark:text-slate-200 transition-colors hover:border-[#00B8DB]/50 active:scale-[0.97] print:hidden"
        >
            <Printer className="w-4 h-4" aria-hidden="true" /> Print or save as PDF
        </button>
    );
}

export function BackToTop() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const on = () => setShow(window.scrollY > 900);
        on();
        window.addEventListener("scroll", on, { passive: true });
        return () => window.removeEventListener("scroll", on);
    }, []);
    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-900/[0.1] dark:border-white/[0.12] bg-white/90 dark:bg-[#15171a]/90 text-slate-700 dark:text-slate-200 shadow-lg backdrop-blur transition-[opacity,transform] duration-200 hover:text-[#00667A] active:scale-[0.97] print:hidden ${show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}`}
            aria-label="Back to top"
            tabIndex={show ? 0 : -1}
        >
            <ArrowUp className="w-4 h-4" />
        </button>
    );
}
