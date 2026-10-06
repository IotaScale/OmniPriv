---
name: ui-ux
description: "Use when designing or changing anything a visitor sees in the OmniPriv marketing site: layout, visual hierarchy, typography, spacing, colour, navigation, headers, footers, cards, buttons, forms, tables, dropdowns, modals, tabs, tooltips, toasts, loading/empty/error/success states, or hover/focus/active states. USE FOR: building a page or section, restyling a component, adding a UI state, judging whether a design looks intentional or generated. DO NOT USE FOR: animation mechanics (see the animations skill), breakpoint behaviour (see responsive-design), WCAG compliance (see accessibility)."
---

# UI/UX — OmniPriv marketing site

## Rule 0 — look before you build

Every change starts with a search, not a new component. **The lookup table is
[`./references/components.md`](./references/components.md)** — read it first.

```
cat .github/skills/ui-ux/references/components.md   # every component + its props
cat components/sections/README.md                  # the section library contract
grep -rn "the-thing-I-want" app components          # has this been solved already?
cat lib/styles.ts                                  # the shared class tokens
```

If an existing component is 80% of the way there, add a prop. Do not fork it.
A near-duplicate that drifts from the original is the single most common way
this codebase gets worse.

## Non-negotiables

1. **Reuse the design system.** Serve colour through the CSS variables and
   Tailwind theme below. Never hardcode a hex that already exists as a token.
2. **Do not add decoration.** No gradients, glows, shadows, borders, rounded
   corners, glassmorphism, or background ornaments unless the section you are
   copying already has them. The treatments that are actually live are
   `.card-shine`, `.badge-cyan`, `.bg-grid`, `.icon-wrapper` and
   `.feature-card`. Stacking more on top is what makes a page read as generated.
   (`.card-glass`, `.card-glass-cyan`, `.glow-cyan`, `.glow-cyan-sm`, `.dot-cyan`,
   `.underline-cyan` and `.noise-overlay` are **defined but used nowhere** — using
   one gives you an unstyled element. See the `animations` skill for the full list.)
3. **Light default, `dark:` variant.** Every colour is chosen twice. A colour
   with no `dark:` variant is a bug — see `accessibility` for the numbers.
4. **Same section means same shape.** Match the band rhythm of neighbouring
   sections (surface tone, border, heading size, padding) before inventing one.

## The visual language

**Colour.** Accent is `#00B8FF` (`primary-500`). Headline accents use the
`.text-gradient` class — despite the name it sets a flat `#00B8FF`, not a
gradient. The purple secondary is `a78bfa` — `.text-gradient-warm` and
`.text-gradient-subtle` exist but are **dead**, so use the hex directly.

| Purpose | Use |
|---|---|
| Page / band background | `bg-white dark:bg-[#030711]`, `mutedSurface`, `darkSurface` from `@/lib/styles` |
| Body copy | `text-slate-600 dark:text-slate-400`, or the `prose` token |
| Emphasised copy | `text-slate-950 dark:text-white` |
| Accent phrase in a heading | `<span className="text-gradient">` |
| Card surface | `cardSurface` token from `@/lib/styles` — or `bg-white dark:bg-[#070e1c]` |
| Eyebrow / badge | `.badge-cyan` on the section library's `SectionHeading` |

Semantic fill colours are reserved: `emerald` = success/verified, `amber` =
warning, `red` = risk/denied, `#00B8FF` = the product accent. Do not use these
decoratively.

**Type.** Three faces, all loaded through `next/font`:

| Token | Face | Use |
|---|---|---|
| `var(--font-inter)` | Inter | Body. Already the default. |
| `var(--font-syne)` | **Plus Jakarta Sans** | Display headings. The variable name is a legacy leftover — don't rename it. |
| `var(--font-jetbrains)` | JetBrains Mono | Eyebrows, labels, codes, anything that should read as technical. |

Headings set the display face with an inline style, not a class:
`style={{ fontFamily: "var(--font-syne)" }}`. `displayFont` in `@/lib/styles`
exports the same object. Headline scale is `text-3xl sm:text-4xl md:text-5xl`
for section `h2`s; heroes go up to `xl:text-7xl`. Tracking is `tracking-tight`
on large type.

**Spacing.** Sections use `.section-padding` and wrap content in `.container-xl`
— the section library does both for you. Inside a section, use Tailwind's
4px scale and stay on it; arbitrary values (`mt-[18px]`) are a smell. The
convention is `mb-12` under a section header and `gap-4`/`gap-6` in card grids.

**Layout.** Two columns means `MediaSplit` (copy + framed photo) or a plain
`grid lg:grid-cols-2`. An image-less section's copy column is centred — the
site enforces this in `globals.css` with
`.container-xl:not(:has(img)) > .max-w-3xl { margin-inline: auto }`. Two known
consequences:

- Never put `max-w-3xl` on a direct child of a `.container-xl` that has no
  `<img>` unless you want it centred.
- That rule is **unlayered**, so it out-ranks Tailwind utilities. Trailing
  inline-level elements (an `ArrowLink`, for example) still hug the left — wrap
  them in `<div className="mt-10 flex justify-center">`.

## Components

**The full prop reference is
[`./references/components.md`](./references/components.md)** — read it before
building anything. It maps "I need X" to the component, gives every prop and its
default, and lists the page-rhythm rules.

The short version:

| Element | Use | Not |
|---|---|---|
| Page band | `Section` — `tone` is `default` / `muted` / `dark` | a hand-rolled `<section>` with its own padding |
| Section title + eyebrow | `SectionHeading` | a bare `<h2>` — you lose the badge, the display font and the reveal |
| Copy beside a photo | `MediaSplit ratio="wide-last"` | a screenshot in a fixed-height frame |
| Interior page hero | `SplitHero` | wrapping it in `Section` — it has its own padding |
| Icon cards | `IconCardGrid` | a bespoke grid — you lose the AOS-on-container / hover-on-card split |
| Chips, ticks | `ChipList`, `CheckList` | hand-rolled lists |
| Closing CTA | `CtaBand` | the homepage's `ClosingCtaSection`, which is hardcoded |
| FAQ | `FaqSection` | `FaqAccordion` directly — you lose the band and the `FAQPage` JSON-LD |
| Form | `DemoForm` as the reference implementation | a new input treatment |
| Buttons | `.btn-primary` / `.btn-secondary` | re-styling a button per page |

**Does not exist — confirm before building:** modals, drawers, tabs, tooltips,
toasts, pagination, and any table component. `.comparison-table` in
`globals.css` is **dead CSS**; a table must be built from `cardBorder` and the
`Prose` tones.

## Interaction states

Every interactive element needs all four, and they must be visibly distinct:

- **Hover** — the site's budget is one step: a background tint change, an
  accent border, or `-translate-y-1`. The full table is in the `animations`
  skill; do not invent a fifth treatment.
- **Focus** — already handled globally by `*:focus-visible` in `globals.css`,
  so you do not need to add a ring. What matters is never *removing* it: if you
  write `focus:outline-none`, supply a replacement. See `accessibility`.
- **Active** — a small inset or downward shift; `.btn-primary` already does this.
- **Disabled** — reduced opacity plus `cursor-not-allowed`, and it must be a
  real `disabled` / `aria-disabled`, not just a style.

## States every data-driven surface needs

Design all five before shipping; do not leave three of them as an afterthought.

| State | Treatment |
|---|---|
| Loading | A skeleton that matches the final layout, or a spinner. See `animations` for the mechanics. Reserve the space — never let content jump. |
| Empty | One sentence saying why it's empty and one action to fix it. Never an empty box. |
| Error | What went wrong, what to do next, and a retry. Plain language, no stack traces. |
| Success | Confirm the thing happened and say what's next. |
| Partial | If some data loaded and some did not, render what you have. |

Because the site is fully static, "loading" almost always means a form
submitting or a client-side fetch, not a page render.

## Micro-interactions

Micro-interactions are the last 5%, not the first. Add one only when it
communicates state the user could not otherwise read — a form field confirming
it validated, a copy button confirming it copied, a live indicator showing a
connection is active. If it changes nothing about what the user knows, cut it.
Mechanics live in the `animations` skill.

## Before you call it done

- [ ] Searched for an existing component and reused it, or explained why not.
- [ ] Colours come from tokens, and every one has a `dark:` counterpart.
- [ ] Headings use the display font via inline style; body uses the default.
- [ ] Section rhythm matches its neighbours.
- [ ] All four interaction states exist and are distinguishable.
- [ ] Loading / empty / error / success are all designed.
- [ ] Removed any decoration the reference section didn't already have.
- [ ] Checked at 1440 and 390 wide (see `responsive-design`).
