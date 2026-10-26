import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import Countdown from "./Countdown";
import { EVENT } from "./event";

/*
 * The event photo card: a Black Hat MEA show-floor photo with the
 * OmniPriv x Black Hat MEA lockup, used as the event page's hero visual.
 * The popup uses the same photo and lockup (EventLockup) so the two match.
 *
 * Surface is dark in both themes (it sits on a photo), so no `dark:`
 * variants. Decorative: the page h1 carries the same words.
 */

export const EVENT_PHOTO = "/events/black-hat-mea-2026.webp";
export const EVENT_PHOTO_CROP = "/events/black-hat-mea-2026-crop.webp";

/** OmniPriv logo | Black Hat MEA 2026, set in type (no third-party logo artwork). */
export function EventLockup({ className, size = "md" }: { className?: string; size?: "sm" | "md" }) {
    const sm = size === "sm";
    return (
        <div className={cn("flex items-center", sm ? "gap-3" : "gap-4", className)}>
            <Image
                src="/omniprivdark.png"
                alt="OmniPriv"
                width={835}
                height={175}
                className={cn("w-auto object-contain", sm ? "h-5" : "h-6")}
            />
            <span className={cn("w-px self-stretch bg-white/30", sm ? "my-0.5" : "my-0")} aria-hidden="true" />
            <span className="flex flex-col leading-none text-white">
                <span className={cn("font-display font-extrabold tracking-[-0.03em]", sm ? "text-[1.0625rem]" : "text-[1.25rem]")}>
                    Black Hat
                </span>
                <span className={cn("mt-1 font-mono uppercase tracking-[0.32em] text-white/75", sm ? "text-[0.5625rem]" : "text-[0.625rem]")}>
                    MEA 2026
                </span>
            </span>
        </div>
    );
}

export default function EventPoster({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "relative isolate aspect-[4/3.6] overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0B0C0E] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.7)]",
                className,
            )}
            aria-hidden="true"
        >
            <Image
                src={EVENT_PHOTO}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover object-[45%_center]"
            />
            {/* Legibility: darken the bottom for the lockup, and tint toward the brand cyan. */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/45 to-[#0B0C0E]/10" />
            <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,rgba(0,184,219,0.22),transparent_70%)]" />

            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0C0E]/60 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00B8DB] opacity-60 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00B8DB]" />
                </span>
                We&apos;re exhibiting
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <div className="mb-6 hidden sm:block">
                    <p className="mb-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Doors open in</p>
                    <Countdown />
                </div>
                <EventLockup />
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.14] pt-4 text-[0.875rem] font-semibold text-white">
                    <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#00B8DB]" />
                        {EVENT.dates}
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#00B8DB]" />
                        {EVENT.location}
                    </span>
                </div>
            </div>
        </div>
    );
}
