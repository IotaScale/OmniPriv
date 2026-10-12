"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Building2, CheckCircle2, Server, Users } from "lucide-react";

import Prose from "@/components/sections/Prose";
import type { RichText } from "@/lib/rich-text";

/*
 * "Unified PAM for every identity": four identity types as tabs. The open
 * one shows its copy beside a small diagram of the controls OmniPriv puts
 * around that identity. Click or arrow keys to switch; no auto-advance, so
 * the reader stays in charge.
 */

export interface IdentityTab {
    key: "human" | "agent" | "machine" | "vendor";
    title: string;
    short: string;
    paragraphs: RichText[];
    controls: string[];
}

const ICON = { human: Users, agent: Bot, machine: Server, vendor: Building2 } as const;

export default function IdentityTabs({ items }: { items: IdentityTab[] }) {
    const [active, setActive] = useState(0);
    const reduce = useReducedMotion();
    const item = items[active];
    const Icon = ICON[item.key];

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => (a + 1) % items.length);
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => (a - 1 + items.length) % items.length);
        }
    };

    return (
        <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 lg:gap-10 items-start">
            <div role="tablist" aria-label="Identity types" aria-orientation="vertical" className="grid grid-cols-2 lg:grid-cols-1 gap-2.5" onKeyDown={onKey}>
                {items.map((it, i) => {
                    const on = i === active;
                    const TabIcon = ICON[it.key];
                    return (
                        <button
                            key={it.key}
                            type="button"
                            role="tab"
                            id={`idtab-${it.key}`}
                            aria-selected={on}
                            aria-controls="idtab-panel"
                            tabIndex={on ? 0 : -1}
                            onClick={() => setActive(i)}
                            className={`aip-tab group relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left ${on ? "is-on" : ""}`}
                        >
                            {on && (
                                <motion.span
                                    layoutId={reduce ? undefined : "aip-tab-pill"}
                                    className="absolute inset-0 rounded-2xl aip-tab-pill"
                                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                                    aria-hidden="true"
                                />
                            )}
                            <span className="aip-tab-icon relative inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0">
                                <TabIcon className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <span className="relative min-w-0">
                                <span className="block op-card-title text-[0.9375rem] sm:text-[1rem]">{it.title}</span>
                                <span className="hidden sm:block text-[0.8125rem] text-slate-500 dark:text-slate-400 truncate">{it.short}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <div
                id="idtab-panel"
                role="tabpanel"
                aria-labelledby={`idtab-${item.key}`}
                className="relative rounded-3xl border border-slate-900/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#15171a] p-6 sm:p-8 overflow-hidden min-h-[22rem]"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={item.key}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                        className="grid md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-8"
                    >
                        <div>
                            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#00B8DB] text-[#03121c]">
                                <Icon className="w-6 h-6" aria-hidden="true" />
                            </span>
                            <h3 className="op-h3 mt-5">{item.title}</h3>
                            <div className="mt-3 space-y-3">
                                {item.paragraphs.map((p, i) => (
                                    <Prose key={i} segments={p} className="text-[0.9844rem]" />
                                ))}
                            </div>
                        </div>

                        {/* the controls around this identity */}
                        <div className="relative rounded-2xl border border-dashed border-[#00B8DB]/35 bg-[#00B8DB]/[0.04] p-5">
                            <div className="flex items-center gap-2.5">
                                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#00B8DB]/15 text-[#00667A] dark:text-[#7FD9EA]">
                                    <Icon className="w-4 h-4" aria-hidden="true" />
                                </span>
                                <span className="text-[0.8125rem] font-semibold text-slate-900 dark:text-white">Controls in place</span>
                            </div>
                            <ul className="mt-4 space-y-2.5">
                                {item.controls.map((c, i) => (
                                    <motion.li
                                        key={c}
                                        initial={reduce ? false : { opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.08 + i * 0.06, duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                        className="flex items-start gap-2.5 text-[0.875rem] text-slate-700 dark:text-slate-300"
                                    >
                                        <CheckCircle2 className="w-4 h-4 mt-[0.15rem] shrink-0 text-[#00667A] dark:text-[#00B8DB]" aria-hidden="true" />
                                        {c}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
