---
name: animations
description: "Use when adding, changing or reviewing motion in the OmniPriv site — page transitions, hero entrance, scroll reveals, staggered grids, card hover, buttons, navigation, dropdowns, modals, drawers, loading spinners, skeletons, hover effects, micro-interactions, text effects, counters, or progress. USE FOR: making something animate, fixing an animation that never plays, respecting prefers-reduced-motion, or deciding whether motion is worth adding. DO NOT USE FOR: static styling (see ui-ux), breakpoint behaviour (see responsive-design), or WCAG compliance (see accessibility)."
---

# Animations — OmniPriv

## Before anything else

**Read [`./references/patterns.md`](./references/patterns.md).** It holds 15
copy-ready patterns covering every motion type this site needs. Each is marked
**ESTABLISHED** (already in the codebase — copy it exactly) or **NEW** (no
precedent yet — it must still match the house timings below).

Then check what already exists, because most of it does:

```
grep -rn "data-aos" app components    # scroll reveals already declared
grep -n "@keyframes" app/globals.css  # CSS motion already defined
```

## The motion stack — this is all of it

| Layer | What it does |
|---|---|
| **AOS 2.3.4** | Scroll reveals site-wide, driven by `data-aos` attributes. Initialised once in `components/ui/AosProvider.tsx`. |
| **CSS keyframes + transitions** in `app/globals.css` | Everything that loops or plays without scrolling. |
| **Tailwind transition utilities** | Hover, focus and colour changes on individual elements. |

**JavaScript animation does not exist here.** The only three JS motion effects
in the whole codebase are one scroll listener (`Header.tsx`), one
`IntersectionObserver` (`LogoMarquee.tsx`) and one `setInterval` crossfade
(`HeroSlideshow.tsx`).

### Two hard rules about libraries

1. **Do not install anything.** Not GSAP, not Motion One, not Lenis, not a
   smooth-scroll library.
2. **`framer-motion@12` is installed and imported nowhere.** It is dead weight.
   Do not treat it as "the animation library that's already available" — using
   it would force every animated section to become a client component and break
   the property that `components/sections/` ships no JavaScript.

## Pick the right tool

| I want to… | Use |
|---|---|
| Reveal something as it scrolls into view | AOS `data-aos="fade-up"` on the **container** |
| Animate content above the fold | `.hero-reveal` + inline `animationDelay` |
| Loop something forever (marquee, pulse, ring) | A CSS class + `@keyframes` in `globals.css` |
| React to hover or focus | Tailwind `transition-*` + `hover:` / `group-hover:` |
| Stagger a list or grid | `data-aos-delay` arithmetic, or `.reveal-item` |
| Reveal once and keep it revealed | `.reveal-item` + the `useScrollReveal` hook |
| Animate a number or a progress bar | JS + a `matchMedia` gate — see patterns |

## The rules

**1. AOS goes on containers; hover transforms go on cards. Never both on the
same element.** AOS's selector is `[data-aos^=fade][data-aos^=fade].aos-animate`
— three class selectors, which out-specifies Tailwind's two-selector
`hover:-translate-y-1`. A `data-aos` on a card silently kills its hover lift.
Documented in-repo at `components/sections/IconCardGrid.tsx:38-39`: the grid
carries the AOS attribute, each card carries the hover.

**2. Above the fold never uses AOS.** AOS starts at `opacity: 0` and needs JS;
if `.aos-animate` is ever missed the hero is invisible. `.hero-reveal` is
CSS-only with `animation-fill-mode: both`, so it paints with no JS.

> Known inconsistency: `app/security/page.tsx:168` uses `data-aos` on its hero.
> Do not copy it — `/` and `/features` are the correct reference.

**3. Only `transform` and `opacity`.** Anything else animates layout or paint
every frame. For a progress bar use `transform: scaleX()`.

**4. Every new animation needs a reduced-motion path.** Add your class to a
`@media (prefers-reduced-motion: reduce)` block in `globals.css` that sets
`animation: none`, and make the resting state the **finished, fully readable**
state — never `opacity: 0`. For JS-driven motion, gate on
`window.matchMedia("(prefers-reduced-motion: reduce)")`, listen for `change`,
and render the end state immediately. `HeroSlideshow.tsx:37-44` is the
reference.

**Never use AOS's `disable` option.** It switches the whole library off and
strips the attributes, so a reduced-motion visitor gets no reveal at all. The
site keeps the fade and drops only the movement, in `globals.css`.

**5. `data-aos` is only ever a plain attribute.** That is the point — it keeps
sections as server components. Never convert a section to a client component
just to animate it.

**6. `.reveal-item` is the only IntersectionObserver pattern.** If you need a
reveal that is not AOS-shaped, reuse `useScrollReveal` from
`components/sections/LogoMarquee.tsx:72-90` rather than writing a second one.
It is safe by construction: the hidden state applies only inside
`@media (prefers-reduced-motion: no-preference)`, so the default is visible.

**7. Do not reach for dead code.** These are defined in `globals.css` and
referenced nowhere — using one produces an element that looks unstyled:

```
.card-glass  .card-glass-cyan  .glow-cyan  .glow-cyan-sm  .dot-cyan
.underline-cyan  .nav-dropdown  .nav-item  .step-connector  .code-block
.code-block-header  .code-dot  .comparison-table  .noise-overlay
.reveal  .text-gradient-warm  .text-gradient-subtle
```

The eight `animate-*` utilities in `tailwind.config.ts` (`animate-fade-up`,
`animate-glow-pulse`, `animate-marquee`, `animate-float`, `animate-spin-slow`,
`animate-border-anim`, …) are **also unused**.

Live CSS motion: `.hero-reveal`, `.reveal-item`, `.marquee-track` /
`.marquee-track-reverse`, `.feature-card`, `.card-shine`, `.icon-wrapper`,
`.cp-*`, `.btn-primary`, `.btn-secondary`.

## Timing budget — match these, do not invent

| Effect | Duration | Easing |
|---|---|---|
| Scroll reveal | 600ms | `ease-out-cubic` |
| Above-the-fold entrance | 800ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hover / colour / border | 200–300ms | default `ease` |
| Image zoom on card hover | 500–700ms | default `ease` |
| Hero crossfade | 1400ms | `ease-in-out` |
| Ambient loop | 3–7s | `ease-in-out` or `linear` |
| Marquee | 52s / 60s | `linear`, paused on hover |

Stagger steps in use: `80`, `100`, `120`, `160`, `200`, `240` ms statically, or
computed `(index % 4) * 70`, `index * 60`, `index * 100`.

Slower than 300ms on a control the user just clicked feels broken. Faster than
150ms feels like a glitch.

## Known gaps — you would be first

These do **not** animate today. If your task touches one, implement it from the
patterns file and match the timings above; do not leave a second, inconsistent
treatment behind.

| Gap | Today |
|---|---|
| FAQ accordion | `hidden={!isOpen}` — a hard show/hide, no height transition (`FaqAccordion.tsx`) |
| Desktop nav dropdowns | Conditional render — the panel pops in with no transition |
| Mobile menu | Conditional render + body scroll lock, no enter animation |
| Modals, drawers, toasts, tooltips | **Do not exist** |
| Skeletons | **None anywhere** |
| Counters, progress bars | **None** |
| Page transitions | **None** — and there is no `template.tsx`, `loading.tsx`, `error.tsx` or `not-found.tsx` |

## Verify

```js
await page.emulateMedia({ reducedMotion: 'reduce' });  // assert the finished state
await page.emulateMedia({ reducedMotion: null });      // ALWAYS reset
```

- [ ] Only `transform` / `opacity` are animated.
- [ ] Reduced motion leaves content fully visible and complete.
- [ ] No `data-aos` sits on an element that has a hover transform.
- [ ] Above-the-fold motion uses `.hero-reveal`.
- [ ] No dependency added; no dead class used.
- [ ] `npx tsc --noEmit` clean; `npm run build` still 63/63 pages.
- [ ] If a section became a client component, it was genuinely necessary.
