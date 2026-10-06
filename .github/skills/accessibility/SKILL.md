---
name: accessibility
description: "Use when checking or fixing accessibility in the OmniPriv site — semantics, headings, keyboard navigation, focus rings and focus order, form labels and errors, colour contrast, link vs button semantics, alt text, ARIA, or reduced-motion support. USE FOR: auditing a page, adding an interactive control, choosing colours for text, or reviewing a form. DO NOT USE FOR: general visual design (see ui-ux) or motion mechanics (see animations)."
---

# Accessibility — OmniPriv

Target: **WCAG 2.1 AA.** Accessibility is a requirement, not a polish pass — and
it is never traded away for a visual effect.

## Contrast — the one that actually breaks here

This site is unusual in that it ships **a full light theme and a full dark
theme**, and the dark bands are hardcoded. Almost every contrast bug found so
far came from a class with no `dark:` variant being dropped onto a dark band.

The pattern that keeps breaking:

```tsx
<span className="text-xs text-slate-500">        {/* 4.07:1 — fails */}
<span className="text-xs text-slate-500 dark:text-slate-400">  {/* 7.6:1 — passes */}
```

`text-slate-500` **in isolation is the tell.** Grep for it before shipping any
new dark surface. It also currently fails on the `LogoMarquee` caption, which
has no dark variant — a known open item.

| Requirement | Threshold |
|---|---|
| Body text under 18.66px (24px bold) | **4.5:1** |
| Large text over that | **3:1** |
| UI component boundaries, icons, focus rings | **3:1** |
| Placeholder text | 4.5:1 — do not treat it as exempt |

**Audit method that works:** for every leaf text element in the section, walk
ancestors for the first non-transparent `backgroundColor`, then compute the
WCAG ratio against the computed `color`. Do not eyeball it, and do not check
against the page background when a card is in between — the card surface is
usually what the text actually sits on.

`.dark` is applied by `Section tone="dark"` automatically. If you hardcode a
dark background without it, theme-aware text inside renders dark-on-dark.

## Semantics

- One `<h1>` per page. Headings descend without skipping — `SectionHeading`
  takes `as="h2" | "h3"` so you can keep the outline correct while changing size.
- Use `<button>` for actions, `<a>`/`<Link>` for navigation. A `<div onClick>`
  is not a control: it is unreachable by keyboard and invisible to assistive tech.
- Landmarks come from `app/layout.tsx` (`header`, `main`, `footer`). Do not add
  a second `<main>`.
- Lists are `<ul>`/`<ol>`, not a stack of `<div>`s.

## Keyboard

Everything operable must be operable without a mouse.

- **Focus is already handled globally.** `globals.css` sets
  `*:focus-visible { outline: 2px solid rgba(0,184,255,0.6); outline-offset: 3px; }`,
  so you do not need to add a ring of your own. What matters is **never removing
  it**: if you write `focus:outline-none`, you must supply a replacement —
  `FaqAccordion.tsx:64` does it with
  `focus-visible:ring-2 focus-visible:ring-[#00B8FF]`.
- **Tab order follows DOM order.** Do not use positive `tabIndex`.
- **Move focus when you open something.** The site has no modals or drawers
  today; if you add one, focus moves in, is trapped while open, and returns to
  the trigger on close.
- **Escape closes** any overlay.
- The mobile nav toggle in `components/layout/Header.tsx` (`lg:hidden`,
  `aria-label="Toggle menu"`) is **missing `aria-expanded`** — a known gap. If
  you are working in that file, fix it. The open menu must also be reachable and
  closable by keyboard.

## Known gaps, not yet fixed

These are real, verified, and unowned. Fix them if your change touches the file
— do not leave a new one behind.

| Where | Issue |
|---|---|
| `components/layout/Header.tsx` | Mobile toggle has no `aria-expanded`. |
| `sections/LogoMarquee.tsx` | Caption uses `text-slate-500` with no `dark:` variant → 4.07:1 on the marquee's dark background. |
| `lib/emailjs.ts` | `EMAILJS_NEWSLETTER_TEMPLATE_ID` is still the literal placeholder `"YOUR_NEWSLETTER_TEMPLATE_ID"`, so the blog newsletter submit fails silently (a functional bug, listed here because it surfaces as an unannounced error). |

## Images and icons

- Content images get descriptive `alt`. Say what the image conveys, not that it
  exists — "AI agent session monitored across the privileged access control
  plane", not "dashboard image".
- Purely decorative images get `alt=""` **and** `aria-hidden`. `HeroSlideshow`
  is the reference: its rotating backgrounds are decorative and marked so.
- **Lucide icons are decorative by default.** Add `aria-hidden="true"` unless
  the icon is the only content of a control, in which case the control needs a
  label.

## Forms

`components/demo/DemoForm.tsx` is the reference implementation — match it.

- Every input has a `<label htmlFor>`. A placeholder is not a label.
- Errors are text, tied to the field with `aria-describedby`, and announced in
  an `aria-live="polite"` region. Do not signal an error by colour alone.
- `aria-invalid` on the failing field.
- Required fields say so in text, not just a red asterisk.
- The submit button is `disabled` while submitting and shows a spinner.
- Never block paste on a field.

## ARIA — only when necessary

Native HTML first. Reach for ARIA only when no element expresses the pattern,
and never to paper over a semantic mistake — an `aria-label` on a `<div>` does
not make it a button.

Do use: `aria-expanded`, `aria-controls`, `aria-current="page"`, `aria-live`
for async status, `aria-hidden` on decoration.

## Reduced motion

See the `animations` skill for the mechanics. From this skill's side the
requirement is: **with `prefers-reduced-motion: reduce`, the page must still be
complete and readable.** Nothing may be left at `opacity: 0`, and nothing may
depend on an animation to appear.

Mechanics — including why AOS's own `disable` option is the wrong
implementation — are in the `animations` skill. From this skill's side the test
is simply that nothing is left hidden or half-rendered.

## Before you call it done

- [ ] Every text colour has a computed ratio of 4.5:1, or 3:1 if large.
- [ ] Tabbed through the whole change; focus is always visible and ordered.
- [ ] Every control is a real `<button>` or `<a>`.
- [ ] Headings descend correctly and there is one `h1`.
- [ ] Images: descriptive `alt`, or `alt=""` + `aria-hidden` if decorative.
- [ ] Every form field has a label and a text error path.
- [ ] Checked with reduced motion emulated, then reset the emulation.
- [ ] Nothing communicates meaning through colour alone.
