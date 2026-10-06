---
name: frontend
description: "Use when writing or modifying application code in the OmniPriv Next.js app — adding a page, section, component, data file, form, or utility; deciding server vs client component; wiring data into a page; adding a route to the sitemap or a redirect; or reviewing whether new code fits the existing architecture. USE FOR: any change under app/, components/, or lib/. DO NOT USE FOR: pure visual design (see ui-ux), motion (see animations), or diagnosing a failure (see debugging)."
---

# Frontend — OmniPriv architecture

## Stack, as it actually is

| | |
|---|---|
| Framework | Next.js 14.2.35, App Router, React 18.3.1 |
| Language | TypeScript 5, `strict: true`, `noEmit` |
| Styling | Tailwind 3.4.7 (`darkMode: "class"`) + CSS custom properties in `app/globals.css` |
| Path alias | `@/*` → project root |
| Icons | `lucide-react@0.400.0` |
| Class merge | `cn()` from `@/lib/utils` (`twMerge(clsx(...))`) |
| State | React Context only — `components/ThemeProvider.tsx`. No Redux, Zustand or React Query. |
| API | **None.** There is no `app/api/`. The site is fully static. |
| Backend calls | `lib/emailjs.ts` (`@emailjs/browser`) from the client; `jspdf` for client-side PDF |
| Lint | `next lint`, but **no ESLint config file exists** — do not assume lint will catch anything |
| Tests | **None.** No runner, no test files, no CI |
| Deploy | Vercel (`vercel.json`); security headers + redirects in `next.config.js` |

## Orientation — where things live

```
app/                     routes; one folder per URL segment
  layout.tsx             fonts, metadata, ThemeProvider, AosProvider, Header/Footer
  globals.css            design tokens + all custom utility classes
  sitemap.ts             HAND-WRITTEN route list — new pages must be added here
  <segment>/page.tsx     the page
  <segment>/layout.tsx   only when the page is a client component (metadata needs it)
  <segment>/data.ts      page copy, co-located
components/
  sections/              13 reusable marketing primitives (+ README.md — read it)
  layout/                Header, Footer — both client components
  ui/                    page-specific section components
  solutions/             one component per bespoke platform module
  blog/ demo/            feature folders
lib/
  styles.ts              shared class-string tokens
  utils.ts               cn()
  blog-data.ts           27 posts (source of truth for /blog and the sitemap)
  rich-text.ts           the RichText type consumed by Prose
  emailjs.ts             form submission
```

## Rules

**1. Default to server components.** Add `"use client"` only for state, effects,
or browser APIs — and only at the smallest scope. `components/sections/`
deliberately contains just two client components (`FaqAccordion`,
`LogoMarquee`); every other component in that library ships no JavaScript. Keep
it that way. A new client component adds JS to every page that renders it and
has to earn its place.

The 15 client components that exist are nearly all genuinely stateful —
`ThemeProvider`, `ThemeToggle`, `AosProvider`, `Header`, `Footer`,
`FaqAccordion`, `LogoMarquee`, `HeroSlideshow`, `DemoForm`, `BlogIndex`,
`BlogNewsletter`, `app/sign-in/page.tsx`. Two are whole sections in
`components/ui/` (`ClosingCtaSection`, `PamFaqSection`); treat those as
exceptions to justify, not a pattern to copy.

**2. Dormant files — do not import them.** `components/ui/PamGuardian.tsx` (an
abandoned orbit hero with a `requestAnimationFrame` loop, untracked) and
`components/ui/FourPillarsSection.tsx` (commented out of `app/page.tsx`) both
sit on disk and are referenced nowhere. Treat the actively rendered six —
`HeroSlideshow`, `ChallengesSection`, `ControlPlaneSection`, `AiPamTeaser`,
`ClosingCtaSection`, `PamFaqSection` — as the `components/ui/` inventory.

**3. A client page cannot export `metadata`.** Put it in a sibling
`layout.tsx` — see `app/demo/layout.tsx` and `app/sign-in/layout.tsx`.

**4. Respect the title template.** `app/layout.tsx` sets
`title.template: "%s | OmniPriv"`. Any page whose title string already contains
the brand must use `title: { absolute: "..." }` or the brand doubles
(`"... — OmniPriv PAM | OmniPriv"`). This bug has shipped before.

**5. Compose, don't duplicate.** Search before writing:

```
cat .github/skills/ui-ux/references/components.md   # every component + its props
cat components/sections/README.md                   # the section library contract
cat lib/styles.ts lib/utils.ts                      # tokens + cn()
```

**6. Data belongs in `data.ts`, not in JSX.** Pages read from a co-located
data file or a registry (`app/platform/data.ts`, `app/solutions/data.ts`). When
a registry drives something else — `app/sitemap.ts`, an index page — the
derivation is automatic so the two cannot drift. Follow that.

**7. Do not create `app/platform/<slug>/page.tsx`.** A static sibling segment
shadows the `[slug]` route. Bespoke module pages go through the `bespokePages`
map in `app/platform/[slug]/page.tsx` and live in `components/solutions/`.

**8. Register new routes.** Hand-edit `app/sitemap.ts`, and add a redirect to
`next.config.js` when renaming an existing URL (301, `permanent: true`).

**9. New image hosts need allowlisting.** `next.config.js`
`images.remotePatterns` currently permits **only** `images.unsplash.com`.
A different host is a broken image, not a warning.

## TypeScript

Keep `strict` clean. `npx tsc --noEmit` is the real gate — the editor's inline
error checker has been stale before and reported "no errors" while `tsc` found
seven.

- Type props inline and explicitly; no `any`.
- Import types with `import type` / inline `type` specifiers.
- Prefer a discriminated union over optional-field soup:
  `tone?: "muted" | "strong" | "kicker" | "none"`.
- Reuse the exported shapes (`RichText`, `IconCard`, `FaqEntry`) rather than
  re-declaring an equivalent.

## Handling state in code

The site is static, so almost all async work is a form submit. Every one needs:

- **Loading** — disable the control and show a spinner (`DemoForm.tsx` does
  this). Never allow a double submit.
- **Error** — catch, and show a message the user can act on. Never surface a
  raw error object.
- **Success** — confirm and say what happens next.
- **Empty** — if a list can legitimately be empty, the page must say so.

Client state that survives a reload goes in `localStorage` through a context,
the way `ThemeProvider` persists `omnipriv-theme`. Keep it to that.

## Avoid

- Wrapping a component in a new abstraction for a single use.
- A second `cn`-like helper, a second token file, or a second section wrapper.
- `useEffect` for anything derivable during render.
- Adding a dependency. The answer is nearly always yes already: AOS for motion,
  `lucide-react` for icons, `cn` for classes, `clsx`/`tailwind-merge` for
  conditionals. **Check `package.json` before assuming something isn't there —
  and check it is actually used before assuming something is** (`framer-motion`
  is installed and imported nowhere).
- Rewriting working code to match a personal preference.

## Verify before finishing

```
npx tsc --noEmit            # must exit 0
npm run build               # expect 63/63 pages; count rises 1 per new route
```

Kill anything on port 3000 first — running `next build` while `next dev` is
live corrupts `.next`. Restart dev afterwards.
