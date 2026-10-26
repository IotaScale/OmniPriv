"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, MapPin, X } from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Countdown from "./Countdown";
import { EVENT_PHOTO_CROP, EventLockup } from "./EventPoster";
import { EVENT, EVENT_END } from "./event";

/*
 * Black Hat MEA announcement.
 *
 * On every full page load (including a reload), after the first paint has
 * settled, and never on the event page itself (the visitor is already there)
 * or once the show has closed. `Maybe later` and the close button hide it
 * until the next load; moving between pages inside the site does not bring
 * it back, because the popup is mounted once per load in AppChrome.
 *
 * Accessibility: the dialog moves focus in, traps Tab, closes on Escape,
 * locks the page behind it and returns focus where the visitor was. Clicking
 * anywhere on the card opens the event page; the buttons opt out.
 */

const OPEN_DELAY = 1200;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Copy rises in one after another once the card has opened. */
function rise(open: boolean, delayMs: number) {
    return {
        className: cn(
            "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
            open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        ),
        style: { transitionDelay: open ? `${delayMs}ms` : "0ms" },
    };
}

/** Never interrupt the event page itself, or an authentication form. */
const SUPPRESSED_ROUTES = ["/events", "/sign-in", "/sign-up"];

export default function EventPopup() {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const returnFocusRef = useRef<HTMLElement | null>(null);
    const pointerStart = useRef<{ x: number; y: number } | null>(null);

    const dismiss = useCallback(() => {
        setOpen(false);
    }, []);

    /* Decide once, after the first paint has settled. */
    useEffect(() => {
        if (SUPPRESSED_ROUTES.some((route) => window.location.pathname.startsWith(route))) return;
        if (Date.now() > EVENT_END.getTime()) return;

        const timer = window.setTimeout(() => {
            // Do not steal focus from someone already filling in a form.
            const active = document.activeElement;
            const typing =
                active instanceof HTMLElement &&
                (active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.isContentEditable);
            if (typing) return;

            returnFocusRef.current = active as HTMLElement | null;
            setOpen(true);
        }, OPEN_DELAY);

        return () => window.clearTimeout(timer);
    }, []);

    /* A client-side navigation closes it, including the card's own link. */
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    /* Escape, Tab trap, scroll lock and focus restoration while open. */
    useEffect(() => {
        if (!open) return;
        const panel = panelRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                dismiss();
                return;
            }
            if (e.key !== "Tab" || !panel) return;

            const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (items.length === 0) return;
            const first = items[0];
            const last = items[items.length - 1];
            const active = document.activeElement;
            const outside = !panel.contains(active);

            if (e.shiftKey && (outside || active === first)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && (outside || active === last)) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", onKeyDown);
        const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            const target = returnFocusRef.current;
            if (target && document.contains(target)) target.focus();
        };
    }, [open, dismiss]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-popup-title"
            aria-describedby="event-popup-description"
            aria-hidden={!open}
            className={cn(
                "fixed inset-0 z-[70] flex items-end justify-center p-3 sm:items-center sm:p-6",
                "transition-opacity duration-200 ease-out motion-reduce:transition-none",
                open ? "visible opacity-100" : "invisible opacity-0",
            )}
        >
            <div
                className="absolute inset-0 bg-[#050608]/75 backdrop-blur-[6px]"
                onClick={dismiss}
                aria-hidden="true"
            />

            <div
                ref={panelRef}
                onPointerDown={(e) => {
                    pointerStart.current = { x: e.clientX, y: e.clientY };
                }}
                onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.closest("button, a")) return;
                    const start = pointerStart.current;
                    // Ignore the click that ends a scroll gesture.
                    if (
                        start &&
                        (Math.abs(e.clientX - start.x) > 8 || Math.abs(e.clientY - start.y) > 8)
                    ) {
                        return;
                    }
                    router.push(EVENT.href);
                }}
                className={cn(
                    "relative isolate w-full max-w-[64rem] cursor-pointer overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem]",
                    "border border-white/[0.1] bg-[#0B0C0E] shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,184,219,0.06)]",
                    "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none",
                    open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.97] opacity-0",
                )}
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={dismiss}
                    aria-label="Close event announcement"
                    className="absolute right-3 top-3 z-30 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0B0C0E]/70 text-slate-300 backdrop-blur transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] active:scale-[0.96] motion-reduce:transition-none sm:right-4 sm:top-4"
                >
                    <X className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="max-h-[calc(100dvh_-_1.5rem)] overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-h-[calc(100dvh_-_3rem)]">
                    <div className="relative grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                        {/* Photo panel: slanted right edge with a cyan light line, like the show's stage lighting. */}
                        <div className="relative h-44 overflow-hidden sm:h-56 md:h-auto md:min-h-[26rem]">
                            <div className="absolute inset-0 overflow-hidden md:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)]">
                                <Image
                                    src={EVENT_PHOTO_CROP}
                                    alt=""
                                    fill
                                    sizes="(min-width: 768px) 32rem, 100vw"
                                    className={cn(
                                        "object-cover object-[50%_40%] transition-transform duration-[9000ms] ease-out motion-reduce:transition-none",
                                        open ? "scale-100" : "scale-110",
                                    )}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/25 to-transparent md:via-[#0B0C0E]/10" />
                                <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-transparent to-[#0B0C0E]/50 md:block" />
                            </div>
                            <svg
                                className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <defs>
                                    <linearGradient id="event-popup-edge" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0" stopColor="#00B8DB" stopOpacity="0.15" />
                                        <stop offset="0.45" stopColor="#7FE3F2" stopOpacity="1" />
                                        <stop offset="1" stopColor="#00B8DB" stopOpacity="0.2" />
                                    </linearGradient>
                                </defs>
                                <line className="motion-safe:animate-pulse" x1="100" y1="0" x2="84" y2="100" stroke="url(#event-popup-edge)" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ filter: "drop-shadow(0 0 6px rgba(0,184,219,0.9))" }} />
                            </svg>
                            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0C0E]/60 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur sm:left-6 sm:top-6">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00B8DB] opacity-70 motion-reduce:animate-none" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00B8DB]" />
                                </span>
                                We&apos;re exhibiting
                            </span>
                            <EventLockup size="sm" className="absolute bottom-4 left-5 sm:bottom-6 sm:left-7" />
                        </div>

                        {/* Copy panel */}
                        <div className="relative min-w-0 overflow-hidden px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-10 md:py-12 md:pl-4 md:pr-12">
                            <div
                                className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-[0.35] [background-image:radial-gradient(rgba(127,227,242,0.35)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_left,black,transparent)]"
                                aria-hidden="true"
                            />
                            <svg
                                className="pointer-events-none absolute right-16 top-0 hidden h-24 w-32 md:block"
                                viewBox="0 0 128 96"
                                fill="none"
                                aria-hidden="true"
                            >
                                <path d="M128 0 L58 96" stroke="#00B8DB" strokeOpacity="0.35" />
                                <path d="M128 18 L72 96" stroke="#00B8DB" strokeOpacity="0.2" />
                                <path d="M110 0 L40 96" stroke="#7FE3F2" strokeOpacity="0.12" />
                            </svg>
                            <p
                                style={rise(open, 80).style}
                                className={cn("relative font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[#00B8DB]", rise(open, 80).className)}
                            >
                                OmniPriv at {EVENT.name}
                            </p>

                            <h2
                                id="event-popup-title"
                                style={rise(open, 140).style}
                                className={cn("relative mt-4 font-display text-[1.875rem] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-[2.375rem] md:text-[2.625rem]", rise(open, 140).className)}
                            >
                                Meet OmniPriv at
                                <br />
                                <span className="text-[#00B8DB]">{EVENT.name}.</span>
                            </h2>

                            <p
                                id="event-popup-description"
                                style={rise(open, 200).style}
                                className={cn("relative mt-4 max-w-[34rem] text-[0.9375rem] leading-[1.65] text-slate-300 sm:text-[1rem]", rise(open, 200).className)}
                            >
                                Join us in {EVENT.city} to see how AI-powered PAM helps secure privileged users,
                                machines and AI agents. Let&apos;s connect at the event and talk about securing
                                privileged access in the AI era.
                            </p>

                            <dl
                                style={rise(open, 260).style}
                                className={cn("relative mt-6 flex flex-wrap items-center gap-x-5 gap-y-3", rise(open, 260).className)}
                            >
                                <div className="inline-flex items-center gap-2.5">
                                    <CalendarDays className="h-5 w-5 shrink-0 text-[#00B8DB]" aria-hidden="true" />
                                    <dt className="sr-only">Dates</dt>
                                    <dd className="text-[0.9375rem] font-semibold text-white">{EVENT.dates}</dd>
                                </div>
                                <span className="hidden h-6 w-px bg-white/15 sm:block" aria-hidden="true" />
                                <div className="inline-flex items-center gap-2.5">
                                    <MapPin className="h-5 w-5 shrink-0 text-[#00B8DB]" aria-hidden="true" />
                                    <dt className="sr-only">Location</dt>
                                    <dd className="text-[0.9375rem] font-semibold text-white">{EVENT.location}</dd>
                                </div>
                            </dl>

                            <div
                                style={rise(open, 320).style}
                                className={cn("relative mt-6 hidden items-center gap-3 sm:flex", rise(open, 320).className)}
                            >
                                <span className="text-[0.625rem] font-semibold uppercase leading-tight tracking-[0.2em] text-slate-400">
                                    Doors
                                    <br />
                                    open in
                                </span>
                                <Countdown />
                            </div>

                            <div
                                style={rise(open, 380).style}
                                className={cn("relative mt-7 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4", rise(open, 380).className)}
                            >
                                <Link
                                    href={`${EVENT.href}#meeting`}
                                    className="btn-primary h-[3.25rem] w-full justify-center px-7 text-[1rem] sm:w-auto"
                                >
                                    Book a Meeting Slot
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={dismiss}
                                    className="inline-flex min-h-[2.75rem] items-center justify-center whitespace-nowrap rounded-lg px-3 text-[0.9375rem] font-semibold text-slate-400 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] motion-reduce:transition-none"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
