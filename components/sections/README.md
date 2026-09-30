# `components/sections`

Reusable marketing-section primitives.

These exist so a page describes *what* it contains, not *how* it looks. Every
component renders the same markup the site already used — they were extracted
from `app/solutions/human-identity-security/page.tsx` without changing a
single class, so adopting them is not a redesign.

## Conventions

- **Light default + `dark:` variant.** Never hardcode a dark background without
  also marking the band `tone="dark"`.
- **`cn()` merges classes.** Import from `@/lib/utils`. A caller can override
  any default by passing a class of the same utility group (last one wins).
- **Server components.** Nothing here ships client JavaScript.
- **Tokens live in `@/lib/styles`.** Border, surface and prose class strings
  are defined once. Change them there, not in a page.

## Components

| Component | Renders |
|---|---|
| `Section` | The band wrapper: padding, surface tone, hairline border, `container-xl`. |
| `SectionHeading` | `badge-cyan` eyebrow + `h2` + intro copy. |
| `Prose` | A paragraph from data, with inline accent links. |
| `MediaSplit` | Two columns — copy beside framed photography. |
| `SplitHero` | Interior page hero: copy left, framed photo right. |
| `IconCardGrid` | Responsive grid of icon cards. |
| `CheckList` | Accent-ticked bullet list. |
| `ChipList` | Row of chips, optionally joined into a flow. |
| `ArrowLink` | Standalone "Explore X →" link that closes out a section. |
| `CtaBand` | Full-width closing CTA on the dark surface. |
| `FaqSection` | Question/answer cards plus `FAQPage` structured data. |

### `Section`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tone` | `"default" \| "muted" \| "dark"` | `"default"` | `muted` = slate band. `dark` = `#050b16` **and** wraps itself in `.dark`. |
| `border` | `"none" \| "bottom" \| "both"` | `"none"` | Uses the shared border token. |
| `container` | `boolean` | `true` | Renders the `container-xl` wrapper. |
| `containerClassName` | `string` | — | e.g. `"max-w-3xl mx-auto"`. |

`tone="dark"` adds the `.dark` ancestor for you — that is what keeps
theme-aware text readable inside a hardcoded dark band while the site is in
light mode. Do not hand-roll it.

### `SectionHeading`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `title` | `React.ReactNode` | — | |
| `badge` | `string` | — | Eyebrow pill above the title. |
| `as` | `"h2" \| "h3"` | `"h2"` | Use `h3` for a sub-section inside a section that already has an `h2`. Switches the weight to `font-bold`. |
| `align` | `"left" \| "center"` | `"left"` | |
| `size` | `"md" \| "lg" \| "sm"` | `"md"` | `sm` pairs with `as="h3"`. || `titleClassName` | `string` | — | e.g. `"max-w-3xl"`. |
| `className` | `string` | — | Wrapper, e.g. `"max-w-3xl mb-12"`. |

### `Prose`

| Prop | Type | Notes |
|---|---|---|
| `segments` | `RichText` | `string` renders as text; `{ text, href }` as an inline accent link. |
| `tone` | `"muted" \| "strong" \| "kicker" \| "none"` | `muted` = default body copy. |
| `className` | `string` | Size and spacing, e.g. `"text-lg mb-5"`. |

`tone` exists instead of relying on class overrides because the tones carry
different line-heights — merging `text-lg` onto the muted treatment would
silently change the leading of a paragraph that never had it.

## Adding a solution page

1. Add an entry to `app/solutions/data.ts` (`SolutionMeta`) — slug, eyebrow,
   card title, summary and SEO metadata. This is what the `/solutions` index
   will read and what `app/sitemap.ts` already uses to emit URLs, so the page,
   its card and its sitemap entry cannot drift.
2. Create `app/solutions/<slug>/data.ts` with the page copy. Keep it plain
   data — strings, `RichText` paragraphs, `IconCard` arrays, `FaqEntry`
   arrays. Import the shared types (`IconCard`, `FaqEntry`, `RichText`) so the
   shape stays in one place.
3. Create `app/solutions/<slug>/page.tsx` that composes the components. Start
   from an existing page and change the imports.
4. Call `requireSolution("<slug>")` and build `metadata` from it.

```tsx
const solution = requireSolution("human-identity-security");

export const metadata: Metadata = {
    title: { absolute: solution.metaTitle },
    description: solution.metaDescription,
};
```

## Not yet unified

- `components/ui/PamFaqSection.tsx` (homepage) is still its own accordion. Its
  header design differs, so folding it in needs the homepage re-verified.
  `FaqSection` is static by design and ships no JS.
- `components/ui/PageHero.tsx` is a full-bleed image-background hero and does
  not match `SplitHero`. It is superseded — prefer `SplitHero`.
- Thirteen pages still hand-roll the centred hero markup.
