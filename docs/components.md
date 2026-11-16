# Modern components and layouts

The opt-in docs and blog homepage layouts share a modern component foundation.
Run `mise run docs` and open **Component gallery** to inspect the primitives.
Run `mise run portfolio` to work on the existing portfolio.
Run `mise run blog` for the modern hero, compact cards, topic previews and search.
See [choosing a homepage](layouts.md) for layout combinations.

## Ownership

| Layer | Source | Responsibility |
| --- | --- | --- |
| Tokens and CSS | `assets/styles/modern/main.css` | Semantic roles, light/dark schemes, Tailwind entry point, article typography |
| Primitives | `layouts/partials/components/` | Explicit inputs, semantic markup, accessibility, named variants |
| Compositions | `layouts/partials/docs/`, `blog/`, `modern/` | Adapt configuration and Hugo pages into navigation and page structure |
| Interactions | `assets/scripts/modern/` | Alpine initialization, responsive navigation state, persistent theme preference |
| Markdown adapters | `layouts/shortcodes/ui-*.html` | Render Markdown and pass inputs to primitives |
| Examples and gallery | `exampleSites/docs/`, `exampleSites/blog/` | Runnable content, component variants, build configuration |

Keep a small component in one partial. Introduce private helpers only when
validation, variant selection, or rendering becomes difficult to read together.
Primitives accept dictionaries; they do not read site configuration or portfolio
data. Compositions adapt those sources into explicit inputs.

## Enable docs

Use the complete `exampleSites/docs/hugo.yaml` as the starting configuration.
Install Node.js and Hugo Extended using `mise run install`, then run
`hugo mod npm pack` and `npm install` in your site.

```yaml
params:
  home:
    layout: docs
  features:
    docs:
      enable: true
      section: docs
```

The homepage selector accepts `portfolio` (the default) or `docs`. Selecting
`docs` requires the docs feature and a content section. An unsupported value
fails the build with a configuration error.

Put this front matter in `content/docs/_index.md`:

```yaml
title: Documentation
cascade:
  type: docs
```

The `section` setting identifies the docs root; `type: docs` selects the modern
shell for its pages. Leave the homepage selector unset to combine docs with the
existing portfolio. Page weights control the depth-first sidebar and previous/
next order. `toc: false` in front matter hides both article outlines.
Disabling the docs feature restores legacy rendering for `type: docs` content;
it does not unpublish those pages.

The standalone docs example filters the theme's legacy `content/posts/` and
`content/search/` scaffolding with `ignoreFiles`. Remove that filter for a mixed
portfolio/blog/docs site. Search and edit links are independently opt-in.

### Documentation services

```yaml
params:
  features:
    docs:
      search:
        enable: true
      edit:
        enable: true
        baseURL: https://github.com/your-name/your-site/edit/main/content/
```

Search uses the existing Fuse.js dependency in a separate modern entry point,
loaded only when search is enabled. `docs/search-index.html` publishes a
fingerprinted JSON resource per language and docs root. It indexes the root
and its docs descendants with published HTML; Hugo excludes production drafts.
Set `docs.search: false` in page front matter to omit a page. This is a discovery
setting, not access control. The search icon immediately left of the theme
toggle opens a native modal dialog. It focuses the input, blocks interaction
with the background page, and closes with Escape, the close button, or a
backdrop click. The borderless input row includes a search icon and an Esc close
control; the dialog title and successful-results announcement are available to
screen readers. Flat result links include language-local breadcrumb context and
highlighted title/snippet matches. Highlighting uses plain text segments rendered
with `x-text`, without constructing HTML from indexed content. Down/Up Arrow
moves focus between the input and result links; Enter opens a focused link. Closing
clears the query and restores focus to the icon. The index downloads on the
first query, stays cached, and offers retry on failure. Results render as text
and native links, with up to eight title-weighted matches. The results area has
a compact minimum height when empty and preserves its previous height while
refreshing. Previous results are hidden and inert until
the new query completes, so they cannot receive keyboard or pointer interaction.
The search trigger stays hidden without JavaScript or native dialog support;
navigation remains usable. The dialog locks background scrolling and bounds
its results to the viewport.

`docs/edit-link.html` adapts edit configuration to the shared button/link
primitive. `edit.baseURL` is the repository URL of the content directory, without
a query or fragment. Each segment of `Page.File.Path` is escaped and appended,
preserving translated filenames and page bundles. A page may set `docs.editURL`
to an absolute HTTP(S) override or `docs.edit: false` to hide its edit action.
Without a base URL or override, no action renders. Pages without a source file
also omit the action. These services do not change legacy blog search or assets.

## Asset boundary and build configuration

Docs pages and blog homepages load Tailwind and the fingerprinted Alpine bundle.
Legacy pages keep their Bootstrap/SCSS and existing JavaScript bundles. Avoid loading both global
style systems on one page. Existing shortcodes retain their original styling;
the `ui-*` shortcodes are for enabled modern pages.

Tailwind v4 runs through Hugo's `css.TailwindCSS`. The example enables
`build.buildStats.enable`, mounts `hugo_stats.json` at
`assets/notwatching/hugo_stats.json`, configures its CSS cachebuster, and permits
the `tailwindcss` executable alongside Hugo's default executable allowlist.
The CSS partial runs through `templates.Defer` after pages have rendered.
`@source "hugo_stats.json"` collects classes from rendered HTML, including
imported theme templates; automatic filesystem scanning is disabled.

Keep client-only classes in a declared Tailwind source if future behavior adds
them. Current Alpine behavior toggles the statically declared `.dark` scheme
and native disclosure state; it does not construct utility class names.

Tokens and named component variants are the customization contract. Override
the modern stylesheet or public partials using Hugo's normal file precedence.
Appending conflicting Tailwind classes does not guarantee an override.

## Primitive contracts

Inputs are dictionaries. Labels are plain strings escaped by Hugo; localize
theme control labels at the caller. Shortcode labels and content are authored
site content. Rendered-content inputs accept trusted `Page.RenderString` output,
not arbitrary user HTML. No primitive evaluates an event string.

Every bundled locale includes docs control keys, with English fallback entries
where translations are pending. This also keeps accessible names present when
the site's default language is not English. Translated controls are currently
provided for English, Bengali, and French.

| Partial | Inputs | Behavior |
| --- | --- | --- |
| `components/button.html` | Required `label`; optional `href`, `variant` (`primary`, `secondary`, `ghost`), `icon`, `iconOnly`, `disabled` | Link when `href` is supplied, otherwise `type="button"`. Icon-only controls require a label and icon. Disabled links fail validation. |
| `components/icon.html` | Required `name`; optional `class` | Decorative inline SVG. Names: `book`, `clock`, `menu`, `arrow-right`, `arrow-left`, `chevron`, `sun`, `search`, `close`, `info`, `check`, `code`. Unknown names fail validation. |
| `components/badge.html` | Required `label`; optional `tone` (`neutral`, `accent`) | Non-interactive supporting label. |
| `components/callout.html` | `content` (rendered Markdown); optional `title` | Semantic aside with decorative icon and escaped title. |
| `components/disclosure.html` | Required `label`; optional `content` (rendered Markdown), `open` (boolean) | Native details/summary with keyboard and no-JavaScript support. |
| `components/post-card.html` | Required `title`, `href`; optional `summary`, `date`, `dateISO`, `readingTime`, `tags` (`label`/`href`), `tagsLabel` | Compact text card with a full-card post link and separate tag links; metadata and tags are escaped and adapted by the caller. |
| `components/pagination.html` | Required Hugo `paginator`; localized `label`, `previous`, `next` | Bounded page links with real hrefs and `aria-current`; works without JavaScript. |
| `components/site-header.html` | `title`, `homeURL`, `links`, `languages`, `languageLabel`, `searchMarkup`, `navigationLabel`, `themeLabel` | Shared responsive header with native mobile/language disclosures and Alpine theme toggle. `searchMarkup` is trusted partial output. |
| `components/search-dialog.html` | Required unique `id`, fingerprinted `indexURL`, localized `labels` dictionary | Shared native modal, compact stable results area and keyboard navigation; layout adapters select/index content. |

```go-html-template
{{ partial "components/button.html" (dict
  "label" (i18n "docs_get_started")
  "href" $docsRoot.RelPermalink
  "icon" "arrow-right"
) }}
```

Markdown uses `ui-button`, `ui-badge`, `ui-callout`, and `ui-disclosure`.
`ui-button` also accepts `page`, resolved through `Page.GetPage` to preserve
language and deployment prefixes. For boolean shortcode inputs, pass the string
`"true"`. All `ui-*` shortcodes require an enabled modern docs page or blog homepage.

## Interaction and verification

Content and navigation render without JavaScript. Native disclosure controls
work with Enter/Space. Alpine closes navigation initially on mobile, opens it
on desktop, and responds to breakpoint changes. Theme selection is stored under
`toha-modern-theme`; system preference is used until a selection is saved.
Blocked storage does not prevent switching themes.

Run `mise run check` for all builds, lint, and regression tests. The focused
`mise run test-docs` verifies a consumer outside the repository, multilingual
subpath URLs, component semantics, class generation, and modern/legacy asset
isolation. Visual acceptance includes desktop/mobile columns, keyboard focus,
native disclosures, theme persistence, and no horizontal page overflow.


Blog homepage compositions live in `layouts/partials/blog/`; shared modern header,
asset and search-label adapters live in `layouts/partials/modern/`.
`helpers/is-modern-page.html` owns modern Markdown/shortcode selection.
The search dialog retains its existing `docs-search-*` styling hooks for
compatibility while accepting independent blog/docs IDs and index URLs.
Blog modal search is separately enabled with `params.features.blog.search.enable`;
see [homepage configuration](layouts.md) for the complete contract.
