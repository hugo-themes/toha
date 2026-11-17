# Toha documentation

Run `mise run docs` from the repository root, or `mise run build-docs` for a
production build. This example is the maintained documentation source as well as
the modern layout demonstration. Content, search, and edit links are local to each
language. English, French, and Spanish guides are available; two French articles
are still untranslated. Language navigation lists only available translations.

The official guides live in `content/docs/`. The component gallery, layout setup,
and composition guides share that tree. Put page ordering in `weight` and shorter
navigation labels in `linkTitle`. Preserve existing `aliases` when editing a
guide: Hugo adds the language prefix itself, so translated front matter also uses
`/posts/.../`, rather than `/fr/posts/.../` or `/es/posts/.../`.

See [NOTICE.md](NOTICE.md) for attribution and the original license. The
[import ledger](imports/toha-docs.json) records the pinned source revision,
original checksums, old URLs, and imported paths. It is provenance, not a sync
configuration; edit these guides here instead of maintaining a second copy.

Math examples enable `params.features.math.enable`, `math: true`, and Goldmark
passthrough delimiters. The docs math render hook produces native MathML at build
time, with no client library. Mermaid examples enable
`params.features.flowchart.enable` and `mermaid: true`; only those pages load the
fingerprinted diagram bundle. Raw diagram source remains usable without JS.
The social examples retain native YouTube/Vimeo embeds and link directly to X
posts so documentation builds do not depend on X's remote oEmbed API.

The existing `img`, `alert`, `split`, `vs`, `video`, and `mermaid` shortcodes adapt
to modern components on enabled modern pages. Legacy pages retain their existing
markup and bundles. Inline template execution and arbitrary raw HTML remain
disabled. Small inline HTML demonstrations use the explicit `ui-text` adapter.

This example imports the working-tree theme through `go.mod`. It is not a
release-pinned standalone starter. Starter exports and any old-host/domain
redirects are separate distribution and hosting work. No domain cutover is
required to preview or contribute to these guides.

Run `mise run test-docs` for component/search contracts and a full external
consumer build of all imported guides, translated aliases, resources, and links
at both root and subpath URLs. `mise run check` verifies all layouts.

## Folder-based sections

The sidebar follows Hugo sections, with `title`/`linkTitle` and `weight` in each
`_index.md`. Top-level groups are Getting started, Portfolio, Blog, Docs
(`documentation/`), Customization, Translation, Community, and Shortcodes.
Shortcodes stays last (`weight: 90`) so its growing reference does not push the
layout and shared configuration guides down the sidebar. The
root cascades `type: docs` to every descendant.

Enable `params.features.docs.sidebar.groupSections: true` for heading-style
sidebar groups; the default remains the recursive disclosure tree. Top-level
headings link to their section overview. Nested sections stay expandable.
Search breadcrumbs and previous/next navigation use this same content hierarchy.

The example enables `params.features.docs.toc.scrollSpy: true` to highlight the
current heading in desktop and mobile outlines while scrolling. It defaults to
false for other sites. Set `toc: false` in a page's front matter to hide its
outlines and disable tracking.

Use `_index.md` for sections with child pages, and `index.md` for a standalone
article bundle with its images. In particular, `shortcodes/_index.md` owns the
original live demonstrations/resources and has reference pages for all theme
shortcodes. Compatibility-only examples are shown as escaped source, preserving
the modern asset boundary. The component gallery remains available there.

The import ledger keeps original `/posts/` routes and the previous `/docs/`
routes for moved pages. Retain both sets of aliases when editing. Its `redirects`
list covers the moved foundation guides that were not part of the upstream
import. Update logical `relref`/`page` targets and ledger paths when moving files;
edit links follow the actual source path automatically. English-only foundation
guides are linked explicitly in English from translated overviews.
