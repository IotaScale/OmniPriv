/**
 * A paragraph expressed as data.
 *
 * A plain string renders as text; `{ text, href }` renders as an inline
 * accent link. This lets page copy live entirely in a `data.ts` file instead
 * of being split between data and JSX.
 *
 * @example
 * const paragraph: RichText = [
 *   "OmniPriv delivers human identity security through enterprise ",
 *   { text: "Privileged Access Management", href: "https://omnipriv.com/" },
 *   ", combining verification and least privilege.",
 * ];
 */
export type RichText = readonly (string | { text: string; href: string })[];
