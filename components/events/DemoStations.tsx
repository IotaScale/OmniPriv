"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, ClipboardCheck, KeyRound, UserCheck, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { JitTerminal, RotationRun } from "@/components/features/Visuals";
import { PolicyCard } from "@/components/secureagents/Visuals";
import { ReportVisual } from "@/components/audit/Visuals";

/*
 * "What we're showing" as four demo stations: pick a topic on the left and
 * the live product illustration for it plays on the right. It advances on
 * its own every few seconds until the visitor picks one, then stays put.
 * Copy comes from the page so it stays in one place.
 */

export type Station = {
    key: "ai" | "secrets" | "access" | "evidence";
    eyebrow: string;
    title: string;
    text: string;
    href: string;
};

const ICONS: Record<Station["key"], LucideIcon> = {
    ai: Bot,
    secrets: KeyRound,
    access: UserCheck,
    evidence: ClipboardCheck,
};

const VISUALS: Record<Station["key"], () => JSX.Element> = {
    ai: PolicyCard,
    secrets: RotationRun,
    access: JitTerminal,
    evidence: ReportVisual,
};

const AUTO_MS = 7000;
const ease = [0.23, 1, 0.32, 1] as const;

export default function DemoStations({ stations }: { stations: Station[] }) {
    const [active, setActive] = useState(0);
    const [touched, setTouched] = useState(false);
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const seen = useInView(ref, { amount: 0.35 });

    useEffect(() => {
        if (touched || reduce || !seen) return;
        const t = window.setTimeout(() => setActive((v) => (v + 1) % stations.length), AUTO_MS);
        return () => window.clearTimeout(t);
    }, [active, touched, reduce, seen, stations.length]);

    const pick = (k: number) => {
        setTouched(true);
        setActive(k);
    };

    const s = stations[active];
    const Visual = VISUALS[s.key];

    return (
        <div ref={ref} className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            <div role="tablist" aria-label="Demo stations" aria-orientation="vertical" className="flex flex-col gap-2.5">
                {stations.map((st, k) => {
                    const Icon = ICONS[st.key];
                    const on = k === active;
                    return (
                        <button
                            key={st.key}
                            type="button"
                            role="tab"
                            id={`station-tab-${st.key}`}
                            aria-selected={on}
                            aria-controls="station-panel"
                            tabIndex={on ? 0 : -1}
                            onClick={() => pick(k)}
                            onKeyDown={(e) => {
                                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                                    e.preventDefault();
                                    pick((k + 1) % stations.length);
                                    (e.currentTarget.parentElement?.children[(k + 1) % stations.length] as HTMLElement)?.focus();
                                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                                    e.preventDefault();
                                    const n = (k - 1 + stations.length) % stations.length;
                                    pick(n);
                                    (e.currentTarget.parentElement?.children[n] as HTMLElement)?.focus();
                                }
                            }}
                            className={cn(
                                "group relative overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,background-color,box-shadow] duration-200",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB]",
                                on
                                    ? "border-[#00B8DB]/45 bg-white shadow-[0_18px_40px_-28px_rgba(0,102,122,0.55)] dark:bg-[#15171A]"
                                    : "border-slate-900/[0.08] bg-white/60 hover:border-slate-900/[0.16] dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.16]",
                            )}
                        >
                            <div className="flex items-start gap-4">
                                <span
                                    className={cn(
                                        "mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                                        on
                                            ? "bg-[#00B8DB] text-[#03121C]"
                                            : "bg-[#00B8DB]/10 text-[#00667A] dark:text-[#7FE3F2]",
                                    )}
                                >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#00667A] dark:text-[#7FE3F2]">
                                        Station {k + 1} · {st.eyebrow}
                                    </span>
                                    <span className="mt-1 block text-[1.0625rem] font-semibold text-[#0A1628] dark:text-white">
                                        {st.title}
                                    </span>
                                    <span
                                        className={cn(
                                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none",
                                            on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                        )}
                                    >
                                        <span className="overflow-hidden">
                                            <span className="mt-2 block text-[0.9375rem] leading-[1.6] text-slate-600 dark:text-slate-400">
                                                {st.text}
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </div>
                            {/* Auto-advance progress, only until the visitor takes over. */}
                            {on && !touched && !reduce && seen && (
                                <motion.span
                                    key={`p-${active}`}
                                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-[#00B8DB]"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div
                id="station-panel"
                role="tabpanel"
                aria-labelledby={`station-tab-${s.key}`}
                className="relative min-w-0 lg:sticky lg:top-28"
            >
                <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(60%_60%_at_60%_40%,rgba(0,184,219,0.14),transparent_70%)]" aria-hidden="true" />
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={s.key}
                        initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={reduce ? undefined : { opacity: 0, y: -6, filter: "blur(4px)" }}
                        transition={{ duration: 0.28, ease }}
                        className="relative"
                    >
                        <Visual />
                    </motion.div>
                </AnimatePresence>
                <div className="relative mt-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-[0.8125rem] text-slate-500 dark:text-slate-400">
                        Illustration. At the show we walk through it on the product itself.
                    </p>
                    <Link href={s.href} className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold op-link hover:underline">
                        Read about {s.eyebrow.toLowerCase()}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
