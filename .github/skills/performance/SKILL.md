---
name: performance
description: "Use when a change could affect page weight or rendering speed — adding a client component, an image, a font, a dependency, or an animation; reviewing bundle size, image optimisation, lazy loading, re-renders, network requests, or layout thrashing. USE FOR: checking a section's cost, diagnosing a slow page, or deciding whether an optimisation is worth it. DO NOT USE FOR: finding the cause of a bug (see debugging) or motion design (see animations)."
---

# Performance — OmniPriv

**Do not optimise prematurely.** This is a static marketing site; it is already
fast. Make a change because it is measurably better, not because it looks
tidier. Never trade readability for a speedup you cannot measure.

## Where the cost actually is

For a fully static Next.js site there are only four levers that matter here.

**1. Client components.** This is the big one. Every `"use client"` ships
JavaScript and pulls its whole subtree into the client bundle. It also breaks
the property that `components/sections/` ships no JS — which is why only
`FaqAccordion` and `LogoMarquee` are client components there.

Current baseline for `/`: **6.85 kB** route, **108 kB** first load, 87.3 kB
shared. Compare against that after any change.

Before adding one, ask: can this be a server component with a CSS-only effect?
Scroll reveals need no JS at all — that is what AOS attributes are for.

**2. Images.** Always `next/image`. Check, in order:

- `sizes` matches the rendered width. A `sizes="100vw"` on a card that renders
  380px wide makes the browser download a far larger file than it needs — this
  is the most common image mistake on this site.
- `priority` only on the hero image. Everything else lazy-loads by default.
- The host is allowlisted in `next.config.js` (`images.unsplash.com` only).
- Intrinsic dimensions are correct so nothing shifts.

**Never overwrite an existing asset filename.** `next/image` caches optimised
output keyed by URL alone, so replacing `public/foo.jpg` with different bytes
keeps serving the *old* image from `.next/cache/images` — invisible in dev,
wrong after the next fresh build. Always use a new filename, and grep for the
path first because one asset is sometimes referenced from several places.

**3. Fonts.** Three families via `next/font/google` with `display: "swap"` and
explicit `weight` arrays. If you add a weight, add it to the array — do not let
it fall back to a default set. Do not add a fourth family.

**4. Animations.** Only `transform` and `opacity` (see `animations` for why).
`backdrop-filter` is expensive to composite and is already live in several
places — the fixed header, the mobile menu overlay, the sticky blog filter bar,
`.marquee-wrapper` and `.icon-wrapper`. Do not add another one without a
reason; a solid surface plus a border usually reads the same.

## Requests

There is no API layer and no data fetching — pages are static. The only network
calls are EmailJS form submits, and `localStorage` reads for the theme. If you
find yourself adding a client-side fetch, question whether the data could be
resolved at build time instead.

## Re-renders

Relevant only inside client components:

- Do not put a countdown, clock, or scroll listener in a component that also
  renders a large tree.
- Prefer CSS for anything continuous; a `setInterval` that calls `setState`
  re-renders React on every tick.
- Derive during render rather than mirroring props into state + `useEffect`.
- An `IntersectionObserver` that pauses an ambient loop off-screen is the right
  pattern — it is what `LogoMarquee` does.

## Dead weight worth knowing about

Two dependencies are installed and imported nowhere:

- **`framer-motion@12`** — a large library, never used. Motion here is AOS +
  CSS. Do not "use what's installed" to justify importing it.
- **`jspdf@4`** — never used.

Neither reaches the browser bundle, because nothing imports them. The cost is
install time, audit surface and confusion. Removing them is a tidy-up for the
user to approve — do not delete them unprompted.

Also unused: eight `animate-*` utilities and their keyframes in
`tailwind.config.ts`. They are declared but never applied, so they do not ship.

## Layout thrashing

Do not read `offsetHeight` / `getBoundingClientRect()` inside a loop that also
writes to the DOM. Batch reads, then writes. The verification scripts in
`responsive-design` read in bulk for exactly this reason.

## Before you call it done

- [ ] Any new client component was necessary, and is as small as possible.
- [ ] Every new image has a correct `sizes`, and a new filename if it replaced
      something.
- [ ] No fourth font family, no new font weight outside the declared array.
- [ ] Any new animation animates only `transform` / `opacity`.
- [ ] No new dependency. `package.json` was checked rather than assumed.
- [ ] `npm run build` — the First Load JS figure for the affected route did not
      move meaningfully.

If a change made the code harder to read for a speedup you cannot point at a
number for, revert it.
