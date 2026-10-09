"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export interface FaqEntry {
    question: string;
    /** A single paragraph, or several rendered as separate paragraphs. */
    answer: string | string[];
}

export interface FaqAccordionProps {
    items: FaqEntry[];
    /** Index open on first render. `null` starts fully collapsed. */
    initialOpen?: number | null;
    /**
     * Prefix for the generated button/region ids. Set a distinct value when
     * more than one accordion can appear on the same page.
     */
    idPrefix?: string;
}

/**
 * Expand/collapse question list, the design used on the homepage.
 *
 * Closed answers stay in the DOM behind `hidden` rather than being unmounted,
 * so the copy is still in the server-rendered HTML for search engines while
 * looking and behaving identically.
 */
export default function FaqAccordion({
    items,
    initialOpen = 0,
    idPrefix = "faq",
}: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(initialOpen);

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="space-y-3.5">
            {items.map((faq, idx) => {
                const isOpen = openIndex === idx;
                const buttonId = `${idPrefix}-btn-${idx}`;
                const regionId = `${idPrefix}-region-${idx}`;
                const paragraphs = Array.isArray(faq.answer) ? faq.answer : [faq.answer];

                return (
                    <div
                        key={faq.question}
                        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                            isOpen
                                ? "border-[#00B8DB]/35 bg-slate-100 dark:bg-[#15171A] shadow-[0_4px_24px_rgba(0, 184, 219,0.04)]"
                                : "border-slate-900/[0.09] dark:border-white/[0.07] bg-slate-100 dark:bg-[#0b0c0e] hover:border-slate-900/[0.16] dark:hover:border-white/[0.14] hover:bg-slate-100 dark:hover:bg-[#0b0c0e]"
                        }`}
                    >
                        <button
                            id={buttonId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={regionId}
                            onClick={() => toggle(idx)}
                            className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB]"
                        >
                            <span
                                className={`text-base sm:text-lg font-semibold transition-colors ${
                                    isOpen
                                        ? "text-slate-950 dark:text-white"
                                        : "text-slate-800 dark:text-slate-200"
                                }`}
                                style={{ fontFamily: "var(--font-syne)" }}
                            >
                                {faq.question}
                            </span>

                            <span
                                className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    isOpen
                                        ? "bg-[#00B8DB]/20 text-[#00667A] dark:text-[#00B8DB]"
                                        : "bg-slate-900/[0.03] dark:bg-white/[0.04] text-slate-600 dark:text-slate-400"
                                }`}
                            >
                                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                            </span>
                        </button>

                        <div
                            id={regionId}
                            role="region"
                            aria-labelledby={buttonId}
                            hidden={!isOpen}
                            className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 border-t border-slate-900/[0.05] dark:border-white/[0.04]"
                        >
                            {paragraphs.map((para, pIdx) => (
                                <p key={pIdx} className="text-slate-700 dark:text-slate-300">
                                    {para}
                                </p>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
