# Animation patterns — OmniPriv

15 patterns. Each is marked:

- **ESTABLISHED** — already shipping. Copy the code exactly; do not vary it.
- **NEW** — no precedent in the codebase. Build it from the recipe and match
  the house timings in `SKILL.md`.

Read `SKILL.md` first for the rules. Everything here assumes them.

---

## 0. The one addition that makes NEW patterns safe

Several patterns below animate with Tailwind utilities rather than a keyframe,
so they have no class for a `@media (prefers-reduced-motion: reduce)` block to
target. Opt them in with one shared attribute.

Add this **once** to `app/globals.css`, next to the existing reduced-motion
blocks:

```css
/*
 * Opt-in motion guard. Any element carrying [data-motion] stops animating
 * entirely when the visitor asks for reduced motion. Utility-driven
 * transitions have no class of their own to target, so they mark themselves
 * instead. Keyframe classes keep using the per-class blocks above.
 */
@media (prefers-reduced-motion: reduce) {
  [data-motion] {
    transition: none !important;
    animation: none !important;
  }
}
```

Put `data-motion` on every element animated by one of the **NEW** patterns.
Nothing else needs it.

---

## 1. Page transitions — **NEW**

The App Router has no page transition today and there is no `template.tsx`.
`template.tsx` is the right hook: unlike `layout.tsx` it **remounts on every
navigation**, which is what makes an entrance replay.

```tsx
// app/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
```

```css
/* app/globals.css */
@keyframes pageEnter {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-enter {
  animation: pageEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .page-enter { animation: none; }
}
```

**Cautions.** Keep it under 400ms — a route change should feel instant.
`translateY` must stay small (8px), never a full slide. If the user dislikes it
on a slow connection, the fix is to shorten it, not to move it to JS. Do not add
an exit animation; the App Router makes those unreliable, and AOS already
handles the entrance of each section.

---

## 2. Hero animations — **ESTABLISHED**

Above-the-fold copy uses `.hero-reveal` with an inline `animationDelay`. Never
`data-aos` — see `SKILL.md` rule 2.

```tsx
<div className="hero-reveal inline-flex items-center gap-2 ...">          {/* eyebrow  */}
<h1 className="hero-reveal ..." style={{ fontFamily: "var(--font-syne)", animationDelay: "0.1s" }}>
<p  className="hero-reveal ..." style={{ animationDelay: "0.2s" }}>
<div className="hero-reveal ..." style={{ animationDelay: "0.3s" }}>     {/* CTAs     */}
```

The ladder is **0 / 0.1 / 0.2 / 0.3s**. Site-wide config is
`heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both`, and `globals.css` already
sets `animation: none` for it under reduced motion.

**Photo hero** (`app/page.tsx`, and the same stack on `/features`) — three
overlay layers over an `object-cover` image. Reuse it rather than inventing
overlays; it is tuned for arbitrary photography:

```tsx
<Image fill priority sizes="100vw" className="object-cover object-center opacity-60" />
<div className="absolute inset-0 bg-[#030711]/25" />
<div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 68% 64% at 50% 47%, transparent 0%, rgba(3,7,17,0.55) 100%)" }} />
<div className="absolute inset-0 bg-gradient-to-b from-[#030711]/45 via-transparent to-[#030711]/80" />
```

The section gets `bg-[#030711]` so the photo never shows against white.

**Slideshow crossfade** (`components/ui/HeroSlideshow.tsx`) — 7s rotation,
`transition-opacity duration-[1400ms] ease-in-out`, and the interval returns
early when `prefers-reduced-motion` matches. Copy that guard exactly.

---

## 3. Scroll reveals — **ESTABLISHED**

An AOS attribute on the **container**, never on a card that also has a hover
transform (rule 1).

```tsx
<div data-aos="fade-up">                      {/* section header wrapper */}
  <div data-aos="fade-up" data-aos-delay={index * 100}>   {/* grid of cards */}
```

Values actually in use — stay inside this set:

| Value | Used for |
|---|---|
| `fade-up` | almost everything: headers, grids, panels |
| `fade-right` | a copy column sitting left of a stat/graphic pair |
| `fade-left` | the matching right-hand column (certs, stat grids) |

`zoom-in`, `fade-down` and the `flip-*` family are **not** used anywhere. Do not
introduce them.

Site-wide settings live in `AosProvider.tsx` and must not be overridden
per element: `duration: 600`, `easing: "ease-out-cubic"`, `offset: 60`,
`once: true`, `mirror: false`. There is no `data-aos-anchor`,
`data-aos-duration` or `data-aos-easing` anywhere — do not add one.

You often get reveals for free: `SectionHeading`, `IconCardGrid`, `MediaSplit`,
`CtaBand`, `AiPamTeaser`, `ChallengesSection`, `ClosingCtaSection`,
`ControlPlaneSection` and `PamFaqSection` already carry them. Check before
adding a second one to the same section.

---

## 4. Staggered content — **ESTABLISHED**

**Form A — AOS delay arithmetic.** Delay scales with the animation duration, so
the last item in a row lands just as the next row starts. Match the arithmetic
to the column count:

```tsx
data-aos-delay={(index % 4) * 70}   // 4-up grid  (feature cards)
data-aos-delay={index * 60}         // 2-up rows   (certification cards)
data-aos-delay={index * 100}        // wide cards  (blog cards)
```

Fixed steps `80 / 100 / 120 / 160 / 200 / 240` are also in use for small
hand-authored groups — e.g. a 4-cell stat strip.

Never exceed `240ms` on the first item of a group, or the section appears blank
long enough to read as broken.

**Form B — `.reveal-item`.** For a reveal that plays once and stays, outside
AOS. `LogoMarquee` owns the only implementation:

```tsx
const ref = useScrollReveal();                 // components/sections/LogoMarquee.tsx:72
<div ref={ref}>
  <p className="... reveal-item">…</p>
</div>
```

`.reveal-item` starts at `opacity: 0; translateY(24px)` with a 600ms
`cubic-bezier(0.16, 1, 0.3, 1)` transition, and JS adds `.revealed`. The hidden
state lives inside `@media (prefers-reduced-motion: no-preference)`, so the
default is visible — safe without JS. Stagger comes from `nth-child(1..6)` at
80ms steps: **the ladder stops at six**, so do not use it on a longer list.

---

## 5. Cards — **ESTABLISHED**

The canonical hover is border + lift + shadow in one `transition-all`. Copy the
string exactly:

```tsx
className="group rounded-2xl border border-slate-900/[0.08] dark:border-white/[0.07]
           p-5 transition-all duration-300
           hover:-translate-y-1 hover:border-[#00B8FF]/40
           hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]"
```

`IconCardGrid` carries the same treatment with `hover:border-[#00B8FF]/40` only,
and `ControlPlaneSection` adds `hover:shadow-[0_10px_24px_rgba(0,184,255,0.06)]`.
Pick the nearest precedent rather than mixing.

**Overlays that fade in on the same hover:**

```tsx
<span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
```

**Image zoom inside a card** — scale stays tiny; a card is not a lightbox:

```tsx
<Image className="object-cover transition-transform duration-500 group-hover:scale-105" />
```

House values: `scale-105` at `duration-500` (blog covers), `scale-[1.04]` at
`duration-700` (homepage identity cards), `scale-[1.03]` (blog thumbnail).

**Two special card treatments, both live:**

| Class | Effect | Used in |
|---|---|---|
| `.card-shine` | `::after` light sweep across the card on hover | 6 places (blog, enterprise, integrations, security, platform) |
| `.feature-card` / `.feature-card-body` | conic-gradient border that spins up on hover | `app/features/page.tsx` only |

**Icon tiles** — `.icon-wrapper` (~45 usages) transitions colour, border, shadow
and gradient on `:hover` **and** `.group:hover`, so hovering anywhere on the
card lights the icon. Use it rather than styling a tile inline.

---

## 6. Buttons — **ESTABLISHED**

`.btn-primary` and `.btn-secondary` already ship hover (gradient shift +
`translateY(-1px)` + shadow), active (lift reset) and focus states, in
`transition: all 0.22s ease`. **Use the class; never restyle a button per page,
and never add a hover transform on top of it.**

**Arrow / text button** — the site's signature micro-interaction is the gap
growing, not a colour flash:

```tsx
className="inline-flex items-center gap-2 text-sm font-semibold text-[#00B8FF] hover:gap-3 transition-all"
```

Inside a card, drive it from the card's group instead:
`group-hover:gap-2.5`.

**Button in a loading state** — see pattern 11.

---

## 7. Navigation — **ESTABLISHED**

The header is `fixed top-0 left-0 right-0 z-50 transition-all duration-300`
(`app/layout.tsx` compensates with `pt-[72px]` on `<main>`). A passive scroll
listener flips `isScrolled` at `window.scrollY > 20`, swapping transparent for:

```tsx
"bg-white/95 dark:bg-[#030711]/95 backdrop-blur-xl border-b shadow-..."
```

Nav links share one canonical string — `transition-all duration-200` with
`hover:text-slate-950 dark:hover:text-white hover:bg-slate-900/[0.04]
dark:hover:bg-white/[0.05]`.

**Chevrons** rotate rather than swap icons:

```tsx
className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
```

**Mobile menu** — a fixed overlay below the bar plus a body scroll lock:

```tsx
<div className="lg:hidden fixed inset-0 top-[72px] bg-white/95 dark:bg-[#030711]/98 backdrop-blur-xl overflow-y-auto z-40" />
```

```tsx
useEffect(() => {
  document.body.style.overflow = mobileOpen ? "hidden" : "";
  return () => { document.body.style.overflow = ""; };
}, [mobileOpen]);
```

The overlay currently pops in with no transition. If you add one, use pattern 10
(drawer) so it matches the eventual drawer treatment.

---

## 8. Dropdowns — **NEW** (currently unanimated)

Nav dropdowns are conditionally rendered, so they appear instantly. To animate
one without remounting it, keep it mounted and drive it with classes. This also
fixes a real a11y gap: a hidden panel is still focusable unless you remove it.

```tsx
<div
  data-motion
  className={`absolute left-0 top-full mt-2 w-72 rounded-2xl border border-slate-900/[0.08]
              dark:border-white/[0.07] bg-white dark:bg-[#070e1c] shadow-xl p-2 origin-top-left
              transition-all duration-200 ease-out
              ${open
                ? "opacity-100 translate-y-0 scale-100 visible"
                : "opacity-0 -translate-y-1 scale-[0.98] invisible pointer-events-none"}`}
  role="menu"
>
```

`invisible` (not just `opacity-0`) is what takes it out of the tab order and off
the accessibility tree. `origin-top-left` keeps the scale anchored to the
trigger. Keep it to **200ms** and one direction of travel — this is a menu, not
a reveal.

---

## 9. Modals — **NEW** (none exist)

No modal, dialog or scrim exists in the site. Build it as a client component in
`components/ui/`, and keep all four requirements:

```tsx
"use client";

import { useEffect, useRef } from "react";

export default function Modal({
  open, onClose, labelledBy, children,
}: { open: boolean; onClose: () => void; labelledBy: string; children: React.ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Body scroll lock (same idiom as the mobile menu)
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Move focus in on open, return it to the trigger on close
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => previous?.focus();
  }, [open]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-200
                  ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
    >
      {/* scrim */}
      <div data-motion className="absolute inset-0 bg-[#030711]/70 backdrop-blur-sm" onClick={onClose} />

      {/* panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        data-motion
        className={`relative w-full max-w-lg rounded-3xl border border-slate-900/[0.08]
                    dark:border-white/[0.07] bg-white dark:bg-[#070e1c] p-8 outline-none
                    transition-all duration-200 ease-out
                    ${open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.97] translate-y-1"}`}
      >
        {children}
      </div>
    </div>
  );
}
```

Both transitions are **200ms, opacity + scale + a 4px translate**. The scrim
fades; the panel barely moves. Do not bounce, do not slide the panel in from the
side (that is the drawer), and do not scale past 1.03.

Focus trapping: for a modal with many controls, cycle Tab within the panel.
For a short confirm dialog, moving focus to the panel plus Escape and a close
button is sufficient — verify by tabbing through it.

---

## 10. Drawers — **NEW** (none exist)

Same skeleton as the modal, with the panel sliding horizontally and pinned to an
edge. Match the mobile menu's surface so the two feel related:

```tsx
<div className={`fixed inset-0 z-[60] transition-opacity duration-300
                 ${open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
  <div data-motion className="absolute inset-0 bg-[#030711]/70 backdrop-blur-sm" onClick={onClose} />
  <div
    data-motion
    className={`absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto
                border-l border-slate-900/[0.08] dark:border-white/[0.07]
                bg-white/98 dark:bg-[#030711]/98 backdrop-blur-xl p-8
                transition-transform duration-300 ease-out
                ${open ? "translate-x-0" : "translate-x-full"}`}
  >
```

Translate only — never animate `width` or `right`. 300ms is the ceiling; 200ms
feels tighter for a nav drawer.

---

## 11. Loading states — **ESTABLISHED**

The reference is `components/demo/DemoForm.tsx`. The button disables itself,
swaps its label and shows a spinner:

```tsx
<button type="submit" disabled={loading}
  className="btn-primary w-full justify-center text-base py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
  {loading ? (
    <span className="flex items-center gap-2 justify-center">
      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="…" />
      </svg>
      Submitting…
    </span>
  ) : (<>Request Your Demo <ArrowRight className="w-4 h-4" /></>)}
</button>
```

Rules: always `disabled` during submit (never allow a double submit), always
change the label, always `aria-hidden` the spinner, and keep
`disabled:opacity-60`.

**Status regions** — the result must be announced:

```tsx
<div role="status" aria-live="polite" />     {/* success: DemoForm success panel */}
<p role="alert" aria-live="assertive" />     {/* error: DemoForm:381 */}
```

`BlogNewsletter.tsx` uses a `status: "idle" | "loading" | "success" | "error"`
union — prefer that shape for anything new.

---

## 12. Skeletons — **NEW** (none exist)

Use only where content genuinely arrives late (a client-side fetch). This site
is static, so most "loading" is a form submit — reach for pattern 11 first.

```tsx
<div role="status" aria-label="Loading" className="space-y-3">
  <div className="h-5 w-2/3 rounded-lg bg-slate-900/[0.06] dark:bg-white/[0.06] animate-pulse" />
  <div className="h-4 w-full rounded-lg bg-slate-900/[0.06] dark:bg-white/[0.06] animate-pulse" />
  <div className="h-4 w-5/6 rounded-lg bg-slate-900/[0.06] dark:bg-white/[0.06] animate-pulse" />
</div>
```

`animate-pulse` is the site's only built-in animation utility actually in use
(four status dots). Rules:

- **Match the final layout exactly** — same heights, same widths, same gaps.
  A skeleton that does not match causes a layout shift, which is worse than no
  skeleton.
- Stagger with `style={{ animationDelay: \`${i * 100}ms\` }}` so the whole block
  does not throb in unison.
- Wrap in `role="status"` with a label; the shimmer itself is `aria-hidden` by
  having no text content.
- Never skeleton a hero or anything above the fold that can be server-rendered.

---

## 13. Hover effects — **ESTABLISHED**

This is the whole hover budget. Anything not on this list is decoration.

| Intent | Recipe | Timing |
|---|---|---|
| Card lift | `hover:-translate-y-1` + `hover:border-[#00B8FF]/40` | 300ms |
| Card shadow | `hover:shadow-[0_8px_20px_rgba(0,0,0,0.10)]` | 300ms |
| Nav / menu item | background tint + text to `slate-950`/`white` | 200ms |
| Arrow link | `hover:gap-3` (from `gap-2`) | default |
| Icon tile | `.icon-wrapper` — colour, border, glow, gradient | 300ms |
| Image in card | `group-hover:scale-105` | 500ms |
| Light sweep | `.card-shine` | on hover |
| Button | `.btn-primary` / `.btn-secondary` | 220ms |
| Muted text | `hover:text-slate-950 dark:hover:text-white` — colour only | 200ms |

**Never** animate `box-shadow` on a large surface, scale past `1.05`,
`translateY` past `4px` (8px on a card), or add rotation.

---

## 14. Micro-interactions — **ESTABLISHED**

One-step, one-property changes that confirm an action. The pattern is always
"the thing itself changes", never "a new thing appears".

```tsx
// Footer link: the dot lights up
<span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600 transition-colors group-hover/link:bg-[#00B8FF]" />

// Dropdown item: icon tile washes in
<span className="... transition-colors group-hover/item:bg-[#00B8FF]/20" />

// Theme toggle
className="transition-all duration-200"
```

Colour transitions on text and small elements can use the default duration.
Anything with movement gets 200–300ms.

**Do not** add a ripple, a press-bounce, a particle burst, or a sound. The brand
is enterprise security software.

---

## 15. Text effects — **deliberately minimal**

There is exactly one text treatment: a flat accent colour on part of a heading.

```tsx
<h2 style={{ fontFamily: "var(--font-syne)" }}>
  The Privileged Access <span className="text-gradient">Control Plane</span>
</h2>
```

`.text-gradient` sets a flat `#00B8FF` — despite the name it is not a gradient.
`.text-gradient-warm` and `.text-gradient-subtle` are **dead**; do not use them.

**Do not add:** typewriters, per-letter reveals, scramble/decrypt effects,
gradient sweeps across text, or counters animating in headings. None of it
exists on this site, all of it is a cliché on security-software landing pages,
and the content rules forbid the fabricated-looking emphasis it creates.

Headings animate only through their containing section's reveal
(pattern 3 / pattern 4 `.reveal-item`).
