"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/*
 * "On this page" bar for the long /ai-pam page.
 *
 * Appears under the site header once the hero has scrolled away, highlights
 * the section in view (scroll-spy) and shows reading progress along its
 * bottom edge. Desktop only (lg and up); on phones the page reads top to
 * bottom without it. Clicking a pill glides there through SmoothScroll.
 */

export interface NavItem {
    id: string;
    label: string;
}

const headerPx = () => 4.5 * parseFloat(getComputedStyle(document.documentElement).fontSize || "16");

export default function SectionNav({ items, startId }: { items: NavItem[]; startId: string }) {
    const reduce = useReducedMotion();
    const [shown, setShown] = useState(false);
    const [active, setActive] = useState(items[0]?.id);
    const listRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

    useEffect(() => {
        const update = () => {
            const start = document.getElementById(startId);
            if (start) setShown(start.getBoundingClientRect().bottom < headerPx() + 8);
            const line = window.innerHeight * 0.35;
            let cur = items[0]?.id;
            for (const it of items) {
                const el = document.getElementById(it.id);
                if (el && el.getBoundingClientRect().top <= line) cur = it.id;
            }
            setActive(cur);
        };
        let raf = 0;
        const onScroll = () => {
            if (!raf)
                raf = requestAnimationFrame(() => {
                    raf = 0;
                    update();
                });
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [items, startId]);

    /* keep the active pill in view inside the bar */
    useEffect(() => {
        const list = listRef.current;
        const pill = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
        if (!list || !pill) return;
        const l = pill.offsetLeft - 16;
        const r = pill.offsetLeft + pill.offsetWidth + 16;
        if (l < list.scrollLeft || r > list.scrollLeft + list.clientWidth) {
            list.scrollTo({ left: l, behavior: reduce ? "auto" : "smooth" });
        }
    }, [active, reduce]);

    const go = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - headerPx() - 56;
        if (reduce) window.scrollTo(0, y);
        else if (window.matchMedia("(hover: hover) and (pointer: fine)").matches)
            window.dispatchEvent(new CustomEvent("op:scrollto", { detail: y }));
        else window.scrollTo({ top: y, behavior: "smooth" });
    };

    return (
        <motion.nav
            aria-label="On this page"
            className="aip-nav hidden lg:block fixed inset-x-0 z-40 pointer-events-none"
            initial={false}
            animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
            style={{ top: "4.6rem" }}
        >
            <div className="mx-auto max-w-[77.5rem] px-3 sm:px-4">
                <div className={`aip-nav-bar relative overflow-hidden rounded-2xl ${shown ? "pointer-events-auto" : ""}`}>
                    <div ref={listRef} className="flex items-center gap-1 px-2 py-1.5 overflow-x-auto aip-noscroll">
                        {items.map((it) => {
                            const on = it.id === active;
                            return (
                                <button
                                    key={it.id}
                                    data-id={it.id}
                                    type="button"
                                    onClick={() => go(it.id)}
                                    aria-current={on ? "location" : undefined}
                                    tabIndex={shown ? 0 : -1}
                                    className={`relative shrink-0 rounded-xl px-3 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap transition-colors duration-200 ${
                                        on ? "text-[#0a1628] dark:text-white" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                    }`}
                                >
                                    {on && (
                                        <motion.span
                                            layoutId={reduce ? undefined : "aip-nav-pill"}
                                            className="absolute inset-0 rounded-xl bg-[#00B8DB]/[0.12] ring-1 ring-[#00B8DB]/35"
                                            transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span className="relative">{it.label}</span>
                                </button>
                            );
                        })}
                    </div>
                    <motion.span className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-[#00B8DB]" style={{ scaleX: progress }} aria-hidden="true" />
                </div>
            </div>
        </motion.nav>
    );
}
