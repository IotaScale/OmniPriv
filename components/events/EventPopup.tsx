"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, CalendarDays, MapPin, X } from "lucide-react";

import { cn } from "@/lib/utils";
import EventPoster from "./EventPoster";
import { EVENT, EVENT_END } from "./event";

/*
 * Black Hat MEA announcement.
 *
 * Once per browser session, after the first paint has settled, and never on
 * the event page itself (the visitor is already there) or once the show has
 * closed. `Maybe later` and the close button remember the dismissal for the
 * rest of the session; navigating away closes it without storing anything.
 *
 * Accessibility: the dialog moves focus in, traps Tab, closes on Escape,
 * locks the page behind it and returns focus where the visitor was. Clicking
 * anywhere on the card opens the event page; the buttons opt out.
 */

const SEEN_KEY = "omnipriv-event-popup-2026";
const OPEN_DELAY = 1200;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

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
        try {
            sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
            /* Storage blocked: it shows again on the next load. */
        }
    }, []);

    /* Decide once, after the first paint has settled. */
    useEffect(() => {
        if (SUPPRESSED_ROUTES.some((route) => window.location.pathname.startsWith(route))) return;
        if (Date.now() > EVENT_END.getTime()) return;
        try {
            if (sessionStorage.getItem(SEEN_KEY)) return;
        } catch {
            /* No storage access: still show it. */
        }

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
                className="absolute inset-0 bg-[#030711]/70 backdrop-blur-sm"
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
                    "relative w-full max-w-[54rem] cursor-pointer overflow-hidden rounded-2xl",
                    "border border-white/[0.12] bg-[#0a1628] shadow-[0_40px_100px_-40px_rgba(3,7,17,0.9)]",
                    "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                    open ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.98] opacity-0",
                    "sm:rounded-3xl",
                )}
            >
                <button
                    ref={closeRef}
                    type="button"
                    onClick={dismiss}
                    aria-label="Close event announcement"
                    className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0a1628]/80 text-slate-300 backdrop-blur transition-colors duration-200 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] motion-reduce:transition-none"
                >
                    <X className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="max-h-[calc(100dvh_-_1.5rem)] overflow-y-auto overflow-x-hidden sm:max-h-[calc(100dvh_-_3rem)]">
                    <div className="grid md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
                        <div className="border-b border-white/[0.08] md:border-b-0 md:border-r">
                            <EventPoster className="h-full" />
                        </div>

                        <div className="min-w-0 px-6 pb-7 pt-6 sm:px-8 sm:pb-8 sm:pt-7">
                            <p className="font-mono text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[#7FD9EA]">
                                OmniPriv at {EVENT.name}
                            </p>

                            <h2
                                id="event-popup-title"
                                className="mt-3 font-display text-[1.25rem] font-bold leading-snug text-white sm:text-[1.375rem]"
                            >
                                Meet us at {EVENT.name}.
                            </h2>

                            <p
                                id="event-popup-description"
                                className="mt-3 text-[0.9375rem] leading-[1.7] text-slate-300"
                            >
                                Discover how AI-powered PAM secures privileged users, machines and AI agents.
                                Connect with our team in Riyadh for a product conversation.
                            </p>

                            <dl className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                                <div className="inline-flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 shrink-0 text-[#00B8DB]" aria-hidden="true" />
                                    <dt className="sr-only">Dates</dt>
                                    <dd className="text-[0.875rem] font-semibold text-white">{EVENT.dates}</dd>
                                </div>
                                <div className="inline-flex items-center gap-2">
                                    <MapPin className="h-4 w-4 shrink-0 text-[#00B8DB]" aria-hidden="true" />
                                    <dt className="sr-only">Location</dt>
                                    <dd className="text-[0.875rem] font-semibold text-white">{EVENT.location}</dd>
                                </div>
                            </dl>

                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    href={EVENT.href}
                                    className="btn-primary w-full justify-center sm:w-auto"
                                >
                                    Book a meeting with OmniPriv
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                </Link>
                                <button
                                    type="button"
                                    onClick={dismiss}
                                    className="inline-flex min-h-[2.75rem] items-center justify-center whitespace-nowrap rounded-lg px-3 text-[0.875rem] font-semibold text-slate-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00B8DB] motion-reduce:transition-none sm:px-4"
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
