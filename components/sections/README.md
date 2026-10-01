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
- **Server components by default.** Only `FaqAccordion` is a client component,
  because a closeable list needs state. Everything else ships no JavaScript.
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
| `FaqAccordion` | **Client.** Closeable question list — the homepage accordion, shared by every page. |
| `FaqSection` | Band + heading + `FAQPage` structured data wrapping `FaqAccordion`. |

### `Section`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tone` | `"default" \| "muted" \| "dark"` | `"default"` | `muted` = slate band. `dark` = `#050b16` **and** wraps itself in `.dark`. |
| `border` | `"none" \| "bottom"` | `"none"` | Uses the shared border token. Only ever `bottom` — a top border stacks against the previous section's and reads as 2px. |
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
| `size` | `"md" \| "lg" \| "sm"` | `"md"` | `sm` pairs with `as="h3"`. |
| `titleClassName` | `string` | — | Appended to the heading, e.g. `"md:text-5xl"`. |
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

### `FaqAccordion`

| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `FaqEntry[]` | — | `answer` may be a string or an array of paragraphs. |
| `initialOpen` | `number \| null` | `0` | Index open on first render. `null` starts fully collapsed. |
| `idPrefix` | `string` | `"faq"` | Set a distinct value if two accordions share a page. |

Closed answers stay in the DOM behind `hidden` rather than being unmounted, so
the copy is still in the server-rendered HTML for search engines. Only one item
is open at a time.

Prefer `FaqSection` over `FaqAccordion` directly: it adds the band, the centred
heading and the `FAQPage` structured data, and those stay server-rendered.

## Adding a platform capability page

The nine modules in `app/platform/data.ts` each have a bespoke page under
`components/solutions/`, registered in the `bespokePages` map inside
`app/platform/[slug]/page.tsx`.

1. Update the module in `app/platform/data.ts` (`SolutionMeta`). That entry
   drives the `/platform` index cards, the nav dropdown, `generateStaticParams`
   and the per-page metadata — so the page, its card and its SEO tags cannot
   drift apart.
2. Create `components/solutions/<Name>Page.tsx`. Keep the copy in plain `const`
   objects at the top of the file and compose the layout underneath, so the
   words can be edited without reading JSX.
3. Register it: `import` the component, then add `"<slug>": <Name>Page` to
   `bespokePages`.
4. Do **not** create `app/platform/<slug>/page.tsx`. A static sibling segment
   takes precedence over `[slug]`, so it would shadow the dynamic route that
   already handles metadata and `notFound()`.

### Page rhythm

Every platform page opens the same way and closes the same way, with a variable
number of content bands in between — seven to nine sections in total, depending
on how much the module needs to say.

Invariants, verified across all nine pages at the time of writing:

- One `SplitHero` first, on the default (transparent) surface.
- The second band is `tone="muted"`.
- Exactly **two** dark bands: one content band, and the closing `CtaBand`. Three
  hardcoded dark bands read as a different site.
- The page ends `CtaBand` (dark) → `FaqSection` (muted).
- Every top-level `<section>` carries **one** `border-b`. Never `border-t` or
  `border-y` — a top border stacks against the previous section's and reads 2px.
- No horizontal overflow at 1440×900.

What is *not* fixed is the middle. Some pages run `dark → muted → default`,
some run `dark → default → muted`, and some add a second `muted` band. Place the
dark band wherever the technical content sits and alternate the surrounding
bands so no two adjacent sections share a surface.

Other rules that are easiest to get wrong:

- `tone="dark"` wraps itself in `.dark`; never hand-roll the ancestor.
- `SplitHero` supplies its own padding (`pt-16 pb-20`). Do not wrap it in a
  `Section`.
- `ChipList` takes a `separator` node to express a sequence and a `variant`
  (`accent` for emphasis, `neutral` for a capability set). It is a good fit for
  a fixed-length list — protocols, request types, control names — that would
  bloat a paragraph.

### The generic template is a fallback

`app/platform/[slug]/page.tsx` still renders a generic capability body for any
slug in `data.ts` that is **not** in `bespokePages`. All nine current modules are
bespoke, so that branch is dormant — it stays as the default for a module added
before its bespoke page exists. Do not delete it.

## Not yet unified

- Thirteen pages still hand-roll the centred hero markup. Prefer `SplitHero`.
