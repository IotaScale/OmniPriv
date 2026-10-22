import Image from "next/image";

import { cn } from "@/lib/utils";
import { EVENT } from "./event";

/*
 * The "we're exhibiting" poster. Rendered in the popup and as the event
 * page's hero visual, so the two cannot drift apart.
 *
 * Every colour is hardcoded light-on-navy: the surface is navy in both
 * themes, so no `dark:` variants belong here. The block is hidden from
 * assistive technology because the page h1 and the popup h2 carry the same
 * words, and reading them twice adds nothing.
 */
export default function EventPoster({
    className,
    meta = false,
}: {
    className?: string;
    /** Show the dates and city strip under the headline. */
    meta?: boolean;
}) {
    return (
        <div className={cn("relative overflow-hidden bg-[#0a1628]", className)} aria-hidden="true">
            <div className="aip-hero-grid pointer-events-none absolute inset-0 opacity-70" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#00B8DB]/20 blur-3xl" />

            <div className="relative px-6 py-8 sm:px-9 sm:py-10">
                <div>
                    <Image
                        src="/omniprivdark.png"
                        alt=""
                        width={160}
                        height={40}
                        className="h-6 w-auto object-contain"
                    />
                    <p className="mt-2.5 font-mono text-[0.625rem] font-medium uppercase tracking-[0.2em] text-[#7FD9EA]">
                        {EVENT.name}
                    </p>
                </div>

                <p className="mt-9 text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
                    We&apos;re exhibiting
                </p>

                <p className="mt-3 font-display text-[2rem] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-[2.625rem]">
                    The future
                    <br />
                    of access.
                </p>

                <p className="mt-2 font-display text-[1.0625rem] font-bold uppercase tracking-[0.02em] text-[#00B8DB] sm:text-[1.1875rem]">
                    Live in Riyadh.
                </p>

                {meta && (
                    <dl className="mt-9 grid grid-cols-2 gap-5 border-t border-white/[0.12] pt-6">
                        <div>
                            <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Dates
                            </dt>
                            <dd className="mt-1.5 text-[0.9375rem] font-semibold text-white">{EVENT.dates}</dd>
                        </div>
                        <div>
                            <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                                Location
                            </dt>
                            <dd className="mt-1.5 text-[0.9375rem] font-semibold text-white">{EVENT.location}</dd>
                        </div>
                    </dl>
                )}
            </div>
        </div>
    );
}
