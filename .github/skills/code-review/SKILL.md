---
name: code-review
description: "Use after implementing any change to the OmniPriv site, before reporting it as complete — to review the work as a senior frontend engineer would. USE FOR: self-reviewing a diff, checking a feature is finished, catching regressions, deciding a change is ready. DO NOT USE FOR: finding the cause of a failure (see debugging) or planning new work."
---

# Code review — OmniPriv

Run this on your own work before you say it is done. **Fix what you find; do not
report a known problem as a follow-up.**

## 1. Read the whole diff first

```
git --no-pager diff --stat
git --no-pager diff
```

Ask: is every file here necessary? A layout change should not also rename a
variable or reformat an unrelated block.

## 2. Verification battery

```
npx tsc --noEmit        # exit 0
npm run build           # 63/63 pages, or 1 more per added route
```

Kill port 3000 first — `next build` against a live `next dev` corrupts `.next`.
Restart dev after.

`npm run lint` proves nothing: no ESLint config file exists.

## 3. The checklist

**Correctness**
- Does it do what was asked, for every input, including empty and malformed?
- Server/client boundary correct? A client page cannot export `metadata` — it
  belongs in a sibling `layout.tsx`.
- Any title string already containing "OmniPriv" uses `{ absolute: ... }`, or
  the `%s | OmniPriv` template doubles the brand.
- New route added to `app/sitemap.ts`? Renamed URL given a 301 in
  `next.config.js`?

**Maintainability**
- Is there an existing component, token or utility that already does this?
  (`components/sections/` has 13 primitives with a README.)
- Any near-duplicate of an existing component that will now drift from it?
- Is data in a `data.ts` file rather than inline in JSX?
- Would the next developer find this where they'd expect it?

**UI consistency**
- Colours come from tokens, and every one has a `dark:` counterpart.
- Headings use the display font via inline style.
- Section rhythm (padding, surface tone, heading size) matches neighbours.
- No new decoration the original section did not have.

**Responsiveness** — see the `responsive-design` skill
- Checked 1440, 1280, 1024, 768, 390.
- `scrollWidth - clientWidth === 0` at each.
- Absolute-positioned decoration has an explicit plan below `lg`.
- Nothing relies on hover.

**Accessibility** — see the `accessibility` skill
- Every text colour measured at 4.5:1 (3:1 if large). Grep for
  `text-slate-500` with no dark variant.
- Real `<button>` / `<a>`, visible focus rings, labels on every field.
- One `h1`; headings descend correctly.
- Reduced motion renders the finished, readable state.

**Performance** — see the `performance` skill
- Any new client component earned its place.
- New images have a correct `sizes` and a **new filename** if replacing one.
- Only `transform` / `opacity` animated.
- No new dependency.

**Animation quality** — see the `animations` skill
- Existing AOS attribute or `globals.css` class reused where possible.
- Above the fold uses `hero-reveal`, never `data-aos`.
- No `data-aos` on an element that also carries a hover transform.
- No dead class used (`.card-glass`, `.glow-cyan`, the unused `animate-*` set).
- Timings within existing budgets; no bounce or elastic easing.
- If you animated something from the known-gaps list (FAQ row, dropdown, mobile
  menu), it matches the house timings rather than inventing its own.

**Complexity**
- Could this be shorter without being clever? Delete abstraction that has one
  caller.
- Any `useEffect` solving something derivable during render?
- Any state that could be a prop or a constant?

**Edge cases**
- Long text, missing image, zero-length list, double submit, slow network.
- Loading, error, empty and success states all present for data-driven UI.

**Error handling**
- Failures caught and surfaced as text a user can act on — no raw error objects.

**Regressions**
- Did anything else import what you changed? Grep for it.
- Did a shared file (`globals.css`, `lib/styles.ts`, `components/sections/*`)
  change in a way that alters other pages? Those are used across the whole site.

## 4. Check the things that are easy to fake

- Did you actually look at it, or only reason about it? Screenshot at 1440 and
  390.
- Did you check both themes? Most bugs found so far came from a class with no
  `dark:` variant on a dark band.
- Did you emulate reduced motion — and reset the emulation afterwards? Leaving
  it on makes the next test lie.
- Are you claiming a result you did not measure? If you did not run it, say so.

## 5. Report

State what changed, how it was verified, and what you could not verify. Note
anything you deliberately left alone and why. Keep it short and honest — a
clean report that contains a hidden failure is worse than one that names the
uncertainty.
