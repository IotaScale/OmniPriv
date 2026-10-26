"use client";

import { ArrowRight, CalendarDays, Shuffle } from "lucide-react";

import { cn } from "@/lib/utils";

/*
 * Three show days plus "any day". Choosing one preselects that day in the
 * meeting form (EventForm listens for "omnipriv:event-day") and scrolls to it.
 * Indexes match the form's DAYS list: 0-2 = days 1-3, 3 = any day.
 */

const DAYS = [
    { k: 0, label: "Day 1", weekday: "Tuesday", date: "1", month: "December" },
    { k: 1, label: "Day 2", weekday: "Wednesday", date: "2", month: "December" },
    { k: 2, label: "Day 3", weekday: "Thursday", date: "3", month: "December" },
];

function choose(k: number) {
    window.dispatchEvent(new CustomEvent("omnipriv:event-day", { detail: k }));
    const target = document.getElementById("meeting");
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("event-firstName")?.focus({ preventScroll: true }), reduce ? 0 : 700);
}

export default function DayPicker() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-aos="fade-up">
            {DAYS.map((d) => (
                <button
                    key={d.k}
                    type="button"
                    onClick={() => choose(d.k)}
                    className={cn(
                        "aip-card group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border p-6 text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] active:scale-[0.99]",
                    )}
                >
                    <span className="flex items-center justify-between">
                        <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#00667A] dark:text-[#7FE3F2]">
                            {d.label}
                        </span>
                        <CalendarDays className="h-4 w-4 text-slate-400" aria-hidden="true" />
                    </span>
                    <span className="mt-5 flex items-end gap-3">
                        <span className="font-display text-[3.25rem] font-extrabold leading-[0.85] tracking-[-0.04em] text-[#0A1628] dark:text-white">
                            {d.date}
                        </span>
                        <span className="pb-0.5 text-[0.9375rem] leading-tight text-slate-600 dark:text-slate-400">
                            {d.weekday}
                            <br />
                            {d.month}
                        </span>
                    </span>
                    <span className="mt-6 inline-flex items-center gap-1.5 border-t border-slate-900/[0.08] pt-4 text-[0.875rem] font-semibold text-[#00667A] dark:border-white/[0.08] dark:text-[#7FE3F2]">
                        Request a {d.label} slot
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                </button>
            ))}
            <button
                type="button"
                onClick={() => choose(3)}
                className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-dashed border-[#00B8DB]/40 bg-[#00B8DB]/[0.04] p-6 text-left transition-colors duration-200 hover:bg-[#00B8DB]/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] active:scale-[0.99]"
            >
                <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#00667A] dark:text-[#7FE3F2]">
                    Flexible
                </span>
                <span className="mt-5 inline-flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-xl bg-[#00B8DB]/15 text-[#00667A] dark:text-[#7FE3F2]">
                    <Shuffle className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-3 text-[0.9375rem] leading-snug text-slate-600 dark:text-slate-400">
                    Any of the three days. We will find a time that suits you.
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[#00B8DB]/20 pt-4 text-[0.875rem] font-semibold text-[#00667A] dark:text-[#7FE3F2]">
                    Request any day
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
            </button>
        </div>
    );
}
