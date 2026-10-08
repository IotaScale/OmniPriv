# Component reference — OmniPriv

The reuse lookup. **Search this before creating anything.** If a component here
is close, add a prop rather than forking it — a near-duplicate that drifts is
the main way this codebase degrades.

All paths are relative to the project root. Every component is a **default
export** unless noted.

---

## 1. Pick a component

| I need… | Use | Where |
|---|---|---|
| A page band / section wrapper | `Section` | `sections/Section.tsx` |
| A section title + eyebrow + intro | `SectionHeading` | `sections/SectionHeading.tsx` |
| A paragraph, optionally with inline links | `Prose` | `sections/Prose.tsx` |
| Copy beside a framed photo | `MediaSplit` | `sections/MediaSplit.tsx` |
| An interior page hero | `SplitHero` | `sections/SplitHero.tsx` |
| A grid of icon cards | `IconCardGrid` | `sections/IconCardGrid.tsx` |
| A ticked bullet list | `CheckList` | `sections/CheckList.tsx` |
| A short chip row (or a sequence) | `ChipList` | `sections/ChipList.tsx` |
| A scrolling logo wall | `LogoMarquee` | `sections/LogoMarquee.tsx` |
| A standalone "Explore X →" | `ArrowLink` | `sections/ArrowLink.tsx` |
| The closing CTA band | `CtaBand` | `sections/CtaBand.tsx` |
| An FAQ band + structured data | `FaqSection` | `sections/FaqSection.tsx` |
| A demo request form | `DemoForm` | `demo/DemoForm.tsx` |
| A blog listing with filters | `BlogIndex` | `blog/BlogIndex.tsx` |

**Never** use `FaqAccordion` directly — `FaqSection` adds the band, the heading
and the `FAQPage` JSON-LD, all server-rendered.

---

## 2. `components/sections/` — the library

Read the in-repo `components/sections/README.md` too; if the two ever disagree,
the README wins. **Server components** except `LogoMarquee` and `FaqAccordion`.

### `Section`

| Prop | Type | Default |
|---|---|---|
| `children` | `ReactNode` | — |
| `tone` | `"default" \| "muted" \| "dark"` | `"default"` |
| `border` | `"none" \| "bottom"` | `"none"` |
| `container` | `boolean` | `true` |
| `containerClassName` | `string` | — |
| `className` | `string` | — (lands on the `<section>`, not the container) |

- `muted` → `bg-slate-50 dark:bg-[#050a14]`; `dark` → solid `bg-[#050b16]`.
- **`tone="dark"` wraps itself in `<div className="dark">`.** That is what keeps
  theme-aware text readable inside it while the site is in light mode. Never
  hand-roll the ancestor.
- There is deliberately no `"top"` border — it stacks against the previous
  section's and reads as 2px.

### `SectionHeading`

| Prop | Type | Default |
|---|---|---|
| `title` | `ReactNode` | — |
| `badge` | `string` | — (renders `badge-cyan`) |
| `as` | `"h2" \| "h3"` | `"h2"` |
| `align` | `"left" \| "center"` | `"left"` |
| `size` | `"md" \| "lg" \| "sm"` | `"md"` |
| `className` / `titleClassName` | `string` | — |
| `children` | `ReactNode` | — (intro copy, below the heading) |

Carries `data-aos="fade-up"` on its wrapper and the stable `section-heading`
class that `globals.css` hooks for centring. `h3` is `font-bold`, `h2` is
`font-extrabold`; both get the display font inline.

### `Prose`

| Prop | Type | Default |
|---|---|---|
| `segments` | `RichText` | — |
| `tone` | `"muted" \| "strong" \| "kicker" \| "none"` | `"muted"` |
| `className` | `string` | — |

Each segment is either a plain string or `{ text, href }` which renders as an
inline accent link. Use `tone` rather than merging a size class — the tones
carry their own line-heights.

### `MediaSplit`

| Prop | Type | Default |
|---|---|---|
| `media` | `{ src, alt, priority?, sizes? }` | — |
| `heading` | `ReactNode` | — (renders full width above the two columns) |
| `children` | `ReactNode` | — (the copy column) |
| `ratio` | `"even" \| "wide-first" \| "wide-last"` | `"even"` |
| `height` | `"sm" \| "md" \| "video"` | `"sm"` |
| `align` | `"center" \| "start"` | `"center"` |
| `reverse` | `boolean` | `false` |

All three `height` aliases resolve to `aspect-video` — the frame can never crop
its source. The frame carries `data-aos="fade-up"`. Default `sizes` is
`"(max-width: 1024px) 100vw, 560px"`. Collapses to one column below `lg`;
`reverse` puts the media first in the DOM so it stacks above the copy.

**Use `ratio="wide-last"`** for every body `MediaSplit` — the image column
should be the wider one. Never put a dashboard screenshot in a fixed-height
frame.

**Pass the section heading through `heading`, not inside `children`.** Like
`SplitHero`, the heading spans the full content width and the copy sits beside
the image underneath it; a heading inside the copy column is the old layout.

### `SplitHero`

| Prop | Type | Default |
|---|---|---|
| `titleLead` | `ReactNode` | — |
| `titleAccent` | `string` | — (rendered in `text-gradient`) |
| `badge` | `string` | — |
| `primary` | `{ href, label }` (optional) | — |
| `secondary` | `{ href, label }` | — |
| `media` | `{ src, alt, priority? }` | — (`priority` forced true) |
| `ratio` / `height` | as `MediaSplit` | `"wide-last"` / `"md"` |
| `children` | `ReactNode` | — (between the `h1` and the buttons) |

The heading spans the full content width above the copy/media columns. Supplies
its own padding (`pt-16 pb-20`) — do not wrap it in `Section`.

### `IconCardGrid` / `IconCard`

```ts
export interface IconCard {
  icon: LucideIcon;   // import type { LucideIcon } from "lucide-react"
  title: string;
  text: string;
  eyebrow?: string;
  href?: string;
}
```

| Prop | Type | Default |
|---|---|---|
| `items` | `IconCard[]` | — |
| `columns` | `2 \| 3 \| 4` | `4` |
| `className` | `string` | — |

`data-aos="fade-up"` sits on the **container, not the cards** — the cards lift
on hover and AOS's leftover transform would out-specify it. With `href` the
whole card becomes a link with a hover lift and a trailing "Learn more →".
`key` is `item.title`, so titles must be unique.

### `CheckList`

`items: string[]` — a `space-y-2.5` list of `CheckCircle2` + text. `className`
goes on the `<ul>`.

### `ChipList`

| Prop | Type | Default |
|---|---|---|
| `items` | `string[]` | — |
| `variant` | `"accent" \| "neutral"` | `"neutral"` |
| `align` | `"center" \| "start"` | `"start"` |
| `separator` | `ReactNode` | — |

Pass an arrow icon as `separator` to express a **sequence** — the separator
renders *between* chips, never after the last. Good for a fixed set of
protocols, request types or control names that would bloat a paragraph.

### `CtaBand`

| Prop | Type | Default |
|---|---|---|
| `title` | `ReactNode` | — |
| `badge` | `string` | — |
| `body` | `string[]` | — |
| `kicker` | `ReactNode` | — |
| `primary` | `{ href, label }` | — |
| `secondary` | `{ href, label }` | — |
| `children` | `ReactNode` | — |

Wraps itself in `.dark` and uses the hardcoded `darkSurface`. `primary` gets an
`ArrowRight`; **`secondary` does not**. Body paragraphs are `mb-4` except the
last, which is `mb-10`.

### `FaqSection` / `FaqEntry`

```ts
export interface FaqEntry { question: string; answer: string | string[] }
```

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | — |
| `subtitle` | `string` | — |
| `items` | `FaqEntry[]` | — |
| `emitSchema` | `boolean` | `true` |
| `className` | `string` | — |

Renders `<Section tone="muted" border="bottom" container={false}>` plus a
centred `SectionHeading size="lg"` and a `FAQPage` JSON-LD block. **`FaqEntry` is
imported from `FaqSection`, not from `FaqAccordion`** — that is the canonical
path.

Closed answers stay in the DOM behind `hidden`, so the copy is still in the
server-rendered HTML. Only one item is open at a time. `initialOpen` defaults to
`0`; pass `null` to start collapsed. **Set a distinct `idPrefix` if two
accordions share a page.**

### `LogoMarquee`

`label: string` (required). Two hardcoded rows of 18 brand marks from
`/public/tech/`. Client component. Only usage difference between the two call
sites is the caption.

### `ArrowLink`

`{ href, children, className? }` — a link with a trailing `ArrowRight` whose gap
grows on hover (`gap-2` → `hover:gap-3`). Use it to close out a section.

---

## 3. `components/layout/`

Both are **client components**.

- **`Header`** — no props. Fixed 72px bar that gains a frosted background past
  `scrollY > 20`. Platform and Resources dropdowns (click to open, close on
  outside `mousedown`, one at a time). Mobile menu is a fixed overlay under the
  bar and locks body scroll. Contains `ThemeToggle`, so it needs `ThemeProvider`
  as an ancestor.
- **`Footer`** — no props. The newsletter form is **local-only** — it sets a
  success state and clears the field with no network request.

There is no `TechMarquee.tsx`; it was replaced by `sections/LogoMarquee.tsx`.

---

## 4. `components/ui/` — homepage sections

All take **no props** and are **hardcoded**. To change their content you edit
the file; nothing is injectable.

| Component | Client? | Notes |
|---|---|---|
| `HeroSlideshow` | ✅ | Decorative `aria-hidden` background. 5 Unsplash photos, 7s rotation, 1400ms crossfade, rotation stops under reduced motion. |
| `ChallengesSection` | — | 6 challenge cards linking to `/platform/*`. |
| `ControlPlaneSection` | — | Identities/targets rails around 3 stage cards. |
| `AiPamTeaser` | — | 4 stat cards linking to `/ai-pam`. |
| `ClosingCtaSection` | ✅ | Hardcoded CTA card. Distinct from the `CtaBand` primitive. |
| `PamFaqSection` | ✅ | Exports `faqs` and `FaqItem` (whose `answer` is **array-only**, unlike `FaqEntry`). Emits its own JSON-LD. |
| `AosProvider` | ✅ | Returns `null`; mounts AOS site-wide. |

**Dormant — do not import:** `PamGuardian.tsx` (untracked orbit hero) and
`FourPillarsSection.tsx` (commented out of `app/page.tsx`).

---

## 5. Forms and blog

- **`DemoForm`** — no props, self-contained. Owns its nine-field state and posts
  to EmailJS. On success it replaces itself with a `role="status"` panel and
  moves focus to it; on failure it shows a `role="alert"` message. Also exports
  `companySizes` and `useCases` arrays. **This is the reference implementation
  for any new form.**
- **`BlogNewsletter`** — no props. Posts to EmailJS, but
  `EMAILJS_NEWSLETTER_TEMPLATE_ID` is still the placeholder in `lib/emailjs.ts`,
  so submits currently fail.
- **`BlogIndex`** — `{ featured: BlogCard; posts: BlogCard[]; categories:
  BlogCategory[] }`, all required. Filtering matches the raw `category` value
  while the chip shows `label`. Do **not** pass an "All" entry in `categories` —
  it is handled internally.

---

## 6. Shared types — canonical imports

| Type | Import from |
|---|---|
| `RichText` | `@/lib/rich-text` |
| `IconCard` | `@/components/sections/IconCardGrid` |
| `FaqEntry` | `@/components/sections/FaqSection` |
| `HeroAction` | `@/components/sections/SplitHero` |
| `CtaBandAction` | `@/components/sections/CtaBand` |
| `BlogCard`, `BlogCategory` | `@/components/blog/BlogIndex` |

`RichText` is `readonly (string | { text: string; href: string })[]` — a literal
array assigned to it needs `as const` compatibility.

---

## 7. Design tokens — `@/lib/styles`

Class strings, not types. Change them there, never in a page.

| Export | Purpose |
|---|---|
| `sectionBorder` / `cardBorder` / `mediaBorder` | hairlines — always use these rather than a raw border colour |
| `prose` / `proseStrong` / `proseKicker` | three body-copy tones |
| `cardSurface` / `mutedSurface` / `darkSurface` | band and card surfaces |
| `accentLink` / `accentText` | `#00B8FF` link and accent |
| `displayFont` | `{ fontFamily: "var(--font-syne)" }` for headings |

`cn()` from `@/lib/utils` merges classes so a caller can override any default of
the same utility group (last one wins).

---

## 8. Composition rules

**Page rhythm** (verified across the nine platform pages):

- One `SplitHero` first, on the default surface.
- Second band is `tone="muted"`.
- **Exactly two dark bands** — one content band plus the closing `CtaBand`.
  Three reads as a different site.
- Ends `CtaBand` (dark) → `FaqSection` (muted).
- **One `border-b` per top-level section.** Never `border-t` or `border-y`.
- No horizontal overflow at 1440×900.

The middle is free, but alternate surfaces so no two adjacent sections match.

**The one deliberate exception is `/demo`** — a single dark band, no `CtaBand`,
ending on `FaqSection`, because the form *is* the CTA. Do not "fix" it.

**Adding a platform capability page:** update the module in
`app/platform/data.ts` (that entry drives the index card, the nav dropdown and
the metadata, so they cannot drift), create
`components/solutions/<Name>Page.tsx` with the copy in plain consts at the top,
then register it in the `bespokePages` map in `app/platform/[slug]/page.tsx`.
**Do not create `app/platform/<slug>/page.tsx`** — a static sibling segment
shadows `[slug]`.
