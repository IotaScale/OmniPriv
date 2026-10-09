/**
 * Shared class tokens.
 *
 * These are the exact class strings the site already uses. Centralising them
 * means a border or surface change happens once instead of in twenty pages,
 * and it keeps the `light-default + dark:` convention consistent.
 */

/** Hairline rule between stacked marketing sections. */
export const sectionBorder = "border-slate-900/[0.05] dark:border-white/[0.04]";

/** Slightly stronger rule used on cards and chips. */
export const cardBorder = "border-slate-900/[0.08] dark:border-white/[0.07]";

/** Frame around editorial photography. */
export const mediaBorder = "border-slate-900/[0.08] dark:border-white/[0.08]";

/** Default body copy. */
export const prose = "text-slate-600 dark:text-slate-400 leading-[1.7]";

/** Body copy used as a lead-in above a list or chip row. */
export const proseStrong = "text-[#0a1628] dark:text-slate-200 font-semibold";

/** Emphasised sentence directly above a call to action. */
export const proseKicker = "text-[#0a1628] dark:text-white font-semibold";

/** Card surface that lifts off a white page and a near-black one. */
export const cardSurface = "bg-white dark:bg-[#15171a]";

/** Recessed band surface (`bg-slate-50` in light). */
export const mutedSurface = "bg-slate-50 dark:bg-[#111214]";

/**
 * Hardcoded dark band. Must be solid, a slash-opacity value lets the page
 * behind it bleed through and the band reads as washed-out grey.
 */
export const darkSurface = "bg-[#0a1628]";

/** Inline text link inside body copy. */
export const accentLink = "text-[#00667A] dark:text-[#00B8DB] font-semibold underline-offset-2 hover:underline";

/** Accent applied to a phrase inside a heading. */
export const accentText = "text-[#00667A] dark:text-[#00B8DB]";

/**
 * The display typeface. Headings set it with an inline style rather than a
 * utility class, so it is exported as a style object.
 */
export const displayFont = { fontFamily: "var(--font-syne)" } as const;
