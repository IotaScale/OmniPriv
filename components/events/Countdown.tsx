"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { EVENT } from "./event";

/*
 * Live countdown to the show opening. Renders nothing on the server (the
 * time differs between server and browser), then ticks every second.
 * During the show it reads "Live now"; after it, it renders nothing.
 */

const START = new Date(EVENT.startISO).getTime();
const END = new Date(EVENT.endISO).getTime();

type Parts = { d: number; h: number; m: number; s: number };

function partsUntil(ms: number): Parts {
    const t = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(t / 86400), h: Math.floor((t % 86400) / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
    variant = "tiles",
    className,
}: {
    /** tiles: four boxed numbers. compact: one line of text. */
    variant?: "tiles" | "compact";
    className?: string;
}) {
    const [now, setNow] = useState<number | null>(null);

    useEffect(() => {
        setNow(Date.now());
        const t = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(t);
    }, []);

    if (now === null || now > END) return null;

    if (now >= START) {
        return (
            <span className={cn("inline-flex items-center gap-2 font-semibold text-[#7FE3F2]", className)}>
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00B8DB] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00B8DB]" />
                </span>
                Live now in {EVENT.city}
            </span>
        );
    }

    const p = partsUntil(START - now);
    const label = `${p.d} days, ${p.h} hours and ${p.m} minutes until ${EVENT.name} opens`;

    if (variant === "compact") {
        return (
            <span className={cn("font-mono tabular-nums", className)} role="timer" aria-label={label}>
                {p.d}d · {pad(p.h)}h · {pad(p.m)}m · {pad(p.s)}s
            </span>
        );
    }

    const tiles: [number, string][] = [
        [p.d, "Days"],
        [p.h, "Hours"],
        [p.m, "Min"],
        [p.s, "Sec"],
    ];
    return (
        <div className={cn("flex items-stretch gap-2", className)} role="timer" aria-label={label}>
            {tiles.map(([v, l]) => (
                <div
                    key={l}
                    className="min-w-[3.5rem] rounded-xl border border-white/[0.12] bg-white/[0.05] px-2.5 py-2 text-center backdrop-blur"
                    aria-hidden="true"
                >
                    <div className="font-display text-[1.375rem] font-bold leading-none tabular-nums text-white">
                        {l === "Days" ? v : pad(v)}
                    </div>
                    <div className="mt-1.5 text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-slate-400">{l}</div>
                </div>
            ))}
        </div>
    );
}
