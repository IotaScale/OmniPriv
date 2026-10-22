/**
 * Black Hat MEA 2026.
 *
 * The popup, the event page, the footer link and the sitemap all read from
 * here, so a date or a URL cannot drift between them.
 */
export const EVENT = {
    name: "Black Hat MEA 2026",
    dates: "1–3 December 2026",
    startISO: "2026-12-01T09:00:00+03:00",
    endISO: "2026-12-03T18:00:00+03:00",
    city: "Riyadh",
    country: "Saudi Arabia",
    location: "Riyadh, Saudi Arabia",
    href: "/events/black-hat-mea-2026",
} as const;

/** The popup stops appearing once the show has closed. */
export const EVENT_END = new Date(EVENT.endISO);
