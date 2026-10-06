# Website Development Rules

Always analyze the existing project before making changes.

Reuse existing:
- components
- styles
- utilities
- design patterns
- animation patterns
- libraries

Do not introduce unnecessary dependencies.

Do not rewrite working code unnecessarily.

For every UI change consider:

1. UI/UX
2. responsiveness
3. accessibility
4. animation
5. performance

Animations should be:
- smooth
- subtle
- purposeful
- modern
- performant

Do not add animations just for decoration.

Before creating a new component, search for an existing reusable component.

Before creating an animation, search for existing animation patterns.

After implementation:
- review the changes
- check responsive behavior
- check accessibility
- check animation performance
- check for duplicated code
- run available lint/typecheck/tests
- fix issues before completing the task.

## What "run available lint/typecheck/tests" means here

There is no ESLint config file and no test suite, so `npm run lint` enforces
nothing and there is nothing to test against. The gates that actually exist:

1. **Stop the dev server first.** `next build` and `next dev` share `.next`, and
   building while dev is running corrupts it.

   ```
   for PID in $(netstat -ano | grep LISTENING | grep ":3000" | awk '{print $NF}' | sort -u); do taskkill //PID $PID //F; done
   ```

2. **`npx tsc --noEmit`** — must exit 0. Trust this, not the editor's inline
   error checker, which has reported "no errors" while `tsc` found several.

3. **`npm run build`** — expect **63/63** pages. Restart `npm run dev` after.

## Detail lives in the skills

This file is the summary. Exact class strings, timings, tokens, known traps and
copy-ready patterns are in `.github/skills/`. Read the matching `SKILL.md`
before starting work:

| Work you are about to do | Skill |
|---|---|
| Anything a visitor sees: layout, type, colour, interaction states | `ui-ux` |
| Motion of any kind — reveal, hover, dropdown, modal, loading | `animations` (then `references/patterns.md`) |
| Code under `app/`, `components/` or `lib/` | `frontend` |
| Layout across screen sizes | `responsive-design` |
| Semantics, focus, contrast, forms, keyboard | `accessibility` |
| Bundle size, images, client components | `performance` |
| Something is broken and the cause is unknown | `debugging` |
| Reviewing your own change before reporting it done | `code-review` |

Three traps worth knowing before you touch anything, because they fail
silently rather than loudly:

- **Never put `data-aos` on an element that has a hover transform.** AOS's
  selector out-specifies Tailwind's hover utilities and the lift dies with no
  error. Put the AOS attribute on the container instead.
- **A set of classes in `globals.css` is defined but used nowhere** —
  `.card-glass`, `.glow-cyan`, `.dot-cyan`, `.nav-dropdown`, and others. Using
  one gives you an unstyled element. The full list is in the `animations` skill.
- **Never overwrite an existing file in `public/`.** `next/image` caches
  optimised output keyed by URL, so the old image keeps being served until the
  next fresh build. Always give a new asset a new filename.
