---
name: debugging
description: "Use when something in the OmniPriv site is broken and the cause is unknown — a build failure, a TypeScript error, a page that is blank or invisible, a layout that overflows, an animation that never plays, a form that does not submit. USE FOR: diagnosing a failure, finding a root cause, fixing a regression. DO NOT USE FOR: reviewing a finished change (see code-review) or adding a feature."
---

# Debugging — OmniPriv

## Never guess

The failure mode to avoid is editing code until the error text goes away. That
replaces one bug with an unknown number of silent ones.

## The method

1. **Reproduce it.** Get the exact command, the exact URL, and the exact
   message. If you cannot reproduce it, say so rather than "fixing" a guess.
2. **State the expected behaviour.** One sentence.
3. **Capture the actual behaviour.** The verbatim error, the measured number,
   the screenshot. Never paraphrase an error.
4. **Trace the relevant code.** Follow it from the symptom to the source — the
   component, the data it reads, the style that applies.
5. **Find the root cause.** Not the line that threw. Ask why that line was
   reachable.
6. **Apply the smallest correct fix.** The fix should touch one thing. If it
   needs three files, you have probably not found the cause yet.
7. **Check related functionality.** If `Section` was wrong, every page using
   `Section` was wrong.
8. **Run the validation** that applies (below).
9. **Read the final diff** as a whole before saying it's done.

**Do not change unrelated files.** A layout fix does not need a naming tidy-up.

## Validation battery

```
npx tsc --noEmit      # must exit 0
npm run build         # expect 63/63 pages
```

**Kill port 3000 before building.** `next build` and `next dev` share `.next`;
running one against the other corrupts it. Restart `npm run dev` afterwards.

```
for PID in $(netstat -ano | grep LISTENING | grep ":3000" | awk '{print $NF}' | sort -u); do taskkill //PID $PID //F; done
```

`npm run lint` is not a reliable gate — `eslint-config-next` is installed but
**no ESLint config file exists**, so it has nothing to enforce.

## Traps that have already cost time on this project

**The editor's error checker can be stale.** It has reported "No errors found"
while `npx tsc --noEmit` found seven real type errors. **Always trust `tsc`.**

**`Cannot find module './682.js'`** — `.next` corruption, caused by building
while dev is running. Fix: kill 3000, `rm -rf .next`, restart.

**`Cannot find module '../../../../app/<route>/page.js'`** — stale
`.next/types/` left behind after deleting a route. Not a real error. `rm -rf
.next` clears it. Do not chase it or restore the deleted file.

**A hover transform silently stops working on an element with `data-aos`.**
AOS's selector `[data-aos^=fade][data-aos^=fade].aos-animate` is three class
selectors and out-specifies Tailwind's two-selector `hover:-translate-y-1`, so
the lift dies with no error and no visual clue. Documented in-repo at
`components/sections/IconCardGrid.tsx:38-39`. Fix: move the `data-aos` attribute
to the container.

**Content invisible but present in the DOM** — AOS. `data-aos` starts at
`opacity: 0` and only becomes visible once `.aos-animate` is applied. If a
reveal never fires the content is still there and still selectable, which makes
it look like a styling bug. Check for the class, not the computed opacity —
**in a background browser tab CSS transitions never advance, so computed opacity
stays 0 even when AOS worked correctly.**

**`overflow-x: hidden` hides layout bugs.** `body` sets it, so a page can
overflow to the right with no scrollbar to warn you. Measure
`document.documentElement.scrollWidth - document.documentElement.clientWidth`
and require 0 — do not infer from the absence of a scrollbar.

**Unlayered CSS beats Tailwind utilities.** The custom classes in
`globals.css` are outside `@layer utilities`, so they out-rank Tailwind. A
`xl:absolute` utility did **not** override a base `position: relative`, and
`lg:mx-0` did not override the site-wide centring rule. When a Tailwind class
appears to do nothing, this is why. The fix is a plain CSS media query, or
matching specificity in `globals.css`.

**The centring rule fires on more than you expect.**
`.container-xl:not(:has(img)) > .max-w-3xl { margin-inline: auto }` matches any
`.max-w-3xl` that is a *direct child* of a container with no `<img>`
descendant. A hero whose background image is a sibling counts as "no image".

**A browser tab must be visible** for scroll, wheel events, `scrollIntoView`
and screenshots to behave. In a background tab `window.scrollTo` silently does
nothing, scrollY stays 0, and wheel events never fire — which looks exactly
like a broken animation.

**`grep -c` on rendered HTML double-counts.** Next inlines the RSC payload, so
every class string appears twice. Count real elements
(`grep -o '<div class="feature-card"'`) or measure in the DOM.

**`getComputedStyle` on an SVG `<text>` reports `color`, not `fill`.** Read
`fill` or you will measure the wrong thing.

**Duplicate imports when re-enabling commented code.** Restoring a previously
disabled import while the original was never removed gives
`the name 'X' is defined multiple times`. Keep the top-level import, delete the
other.

## Reporting

Say what the cause was, what changed, and how you verified it. If you could not
reproduce it, say that plainly instead of shipping a speculative change.
