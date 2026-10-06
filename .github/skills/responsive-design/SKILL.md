---
name: responsive-design
description: "Use when a change affects layout at any screen size — building or editing a section, grid, card, form, table, modal, sidebar, nav, hero, or image; or when asked to check mobile, tablet, laptop or desktop behaviour. USE FOR: making something work across viewports, fixing horizontal overflow, fixing cramped or overlapping layouts, choosing breakpoints. DO NOT USE FOR: static visual design (see ui-ux) or animation timing (see animations)."
---

# Responsive design — OmniPriv

Tailwind default breakpoints, unmodified in `tailwind.config.ts`:

| | `sm` | `md` | `lg` | `xl` | `2xl` |
|---|---|---|---|---|---|
| min-width | 640px | 768px | 1024px | 1280px | 1536px |

The widths this project is actually verified at — use these, not the breakpoint
values:

| Target | Width | Why |
|---|---|---|
| Large desktop | 1440 | Primary design target |
| Desktop | 1280 | Where two-column layouts and the nav are tightest |
| Laptop | 1024 | `lg` boundary — most layout switches happen here |
| Tablet | 768 | `md` boundary; grids go 2-up |
| Mobile | 390 | iPhone-width; the real constraint |

## The rule

**Do not shrink the desktop design.** Reflow it. When a row stops fitting, the
answer is a different arrangement — stacking, collapsing, or dropping to a
carousel — not smaller type.

Decide deliberately, per element:

| Element | Desktop | Mobile |
|---|---|---|
| Navigation | Horizontal nav + hover dropdowns | Collapsed menu (`components/layout/Header.tsx` already has the toggle) |
| Type | `text-5xl` / `text-7xl` heroes | `text-3xl` / `text-4xl` — the existing `sm:`/`md:` ladder |
| Spacing | `.section-padding` | Same class; it already tightens below 768px |
| Grids | `lg:grid-cols-3` | 1 column, `gap-4` |
| Two-column section | `lg:grid-cols-2` / `MediaSplit` | Stacks; photo above copy |
| Tables | `.comparison-table` | Wrap in `overflow-x-auto`, or restructure to stacked cards — never let it set the page width |
| Modals | Centred, max-width | Near-full-bleed, bottom sheet |
| Cards | Equal height in a row | Full width, natural height |
| Images | `next/image` with `sizes` | Confirm the `sizes` value actually matches the rendered width |

## Mobile is a different page, not a narrower one

This site's own history is the lesson: the homepage hero sets
`object-cover object-right`, and at phone widths the right-anchored crop leaves
almost no room, so an overlay anchored to it lands on top of the copy. Any
absolutely-positioned decoration must be explicitly hidden or repositioned
below `lg` — do not assume it degrades.

**Patterns that work here:**

- Hide decoration that has no room: `hidden lg:block`.
- Turn an overlay into a normal grid: base `grid`, promote to `absolute` only
  at the breakpoint where the gutter exists.
- Give grids explicit column counts at each step rather than relying on
  `auto-fit`, which produces a different count than intended at 768.

## Two offsets that are not obvious

The header is `position: fixed` and **72px** tall. `<main>` carries `pt-[72px]`
and the mobile overlay uses `top-[72px]` — any new full-height overlay must
match that or it will sit under the bar.

`html` has `scroll-behavior: smooth`, so anchor targets need an offset of their
own or the header covers the heading: `scroll-mt-24` (used on `/features`) or
`scroll-mt-28` (used on `/demo`).

## Verification

`body` sets `overflow-x: hidden`, which **silently hides overflow bugs.** The
absence of a horizontal scrollbar proves nothing. Measure instead:

```js
document.documentElement.scrollWidth - document.documentElement.clientWidth  // must be 0
```

For each changed section, walk every direct child and require the left gap and
right gap to be equal; a large asymmetry means a column is not centred.
Then check for overlap between absolutely-positioned elements and text.

Screenshot at 1440 and 390 at minimum. Long `page.screenshot({ fullPage: true })`
calls hang on this site — take small, element-scoped captures instead.

**Known non-bug, do not "fix":** two certification cards use
`data-aos="fade-left"`, which holds them at `translateX(100px)` until they
enter the viewport, so they measure ~46px past the right edge at 1280. With
AOS neutralised the page reports clean. It is the reveal offset, not a layout
fault.

## Before you call it done

- [ ] Checked 1440, 1280, 1024, 768 and 390.
- [ ] `scrollWidth - clientWidth === 0` at every one of those widths.
- [ ] Any absolutely-positioned element has an explicit plan below `lg`.
- [ ] No text is overlapped by an image, scrim, or decoration.
- [ ] Nav collapses and the menu opens and closes.
- [ ] Forms are usable with a thumb; tap targets are at least 44×44px.
- [ ] Tables and code blocks have their own scroll container.
- [ ] Nothing relies on hover to be understandable.
