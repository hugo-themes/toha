# Choosing a homepage

Homepage selection is separate from content sections. Sites without
`params.home.layout` retain the portfolio homepage.

| Homepage | Configuration | Content and assets |
| --- | --- | --- |
| Portfolio | `params.home.layout: portfolio` (default) | Data-driven sections, existing Bootstrap/SCSS and JavaScript |
| Documentation | `params.home.layout: docs` and `params.features.docs.enable: true` | Modern docs shell, Tailwind tokens and Alpine |
| Blog | `params.home.layout: blog` and `params.features.blog.enable: true` | Modern hero, text cards, recent-post pagination, topic previews and shared search |

The docs and blog homepage share design tokens, theme storage, the site header,
search dialog and Alpine runtime. Existing articles and archives keep their
current templates and legacy assets; their modernization is a later step. A
product homepage is also a future layout. Modern and legacy bundles stay separate
per page.

The modern docs and blog examples also enable the optional components design.
See [components design](components.md#components-design) for its typography,
light/dark colors, code styling and configurable navbar. Enable it with
`params.features.componentsDesign.enable: true`; it does not affect legacy pages.

## Blog-first site

Start with the complete `exampleSites/blog/hugo.yaml`. Modern pages require the
Tailwind build statistics, mounts, cachebuster and executable allowlist shown
there, in addition to the theme module import. Layout settings are:

```yaml
params:
  home:
    layout: blog
    blog:
      hero:
        enable: true
        image: images/default-background.jpg # Optional asset; otherwise a color surface.
      topics:
        enable: true
        taxonomy: categories
        limit: 5
        postsPerTopic: 4
  features:
    blog:
      enable: true
      section: posts
      search:
        enable: true # Separately opt-in; omitted/false disables the dialog and index.
    pagination:
      maxPostsPerPage: 4
```

Create `content/posts/_index.md` and add posts beneath it. Set
`params.features.blog.section` for a different section, such as `journal`.
The existing `params.enableBlogPost: true` flag is accepted for compatibility.
A disabled blog or a missing/non-section source produces a configuration error
when selecting the blog homepage. Multilingual sites need a section in each
language using this homepage.

Use `content/_index.md` for the homepage title and introduction. The hero image
comes from `assets/`; omitting it uses the primary color surface. Set
`params.home.blog.hero.enable: false` for a compact introduction instead.

Recent posts use the selected tree recursively, in the same order as the existing
archive. Hidden and custom-layout pages are omitted from cards. Pagination uses
the homepage URL (`/page/2/` by default) and ordinary links; the modern homepage
does not use the legacy progressive loader. The archive and article URLs remain
unchanged, including their existing optional progressive loading behavior.

Topic previews use the configured taxonomy, exclude other content trees, and are
ordered by the taxonomy's site-wide post counts. Only published term pages are
linked. Each row is bounded by `postsPerTopic` and links to the term's existing
archive. The topic bar jumps to those visible sections. Set
`params.home.blog.topics.enable: false` to omit both previews and the topic bar.

Search uses the same compact native dialog, keyboard behavior, plain-text match
highlights, cache/retry handling and stable empty/results area as docs. Its
fingerprinted index contains only visible standard-layout posts from the current
blog tree and language; `blog.search: false` in a post's front matter excludes
that post from modal search. Search is enhanced by JavaScript; ordinary topic,
post and pagination links remain usable without it.

The homepage RSS feed contains visible standard-layout posts from that blog
tree, ordered by date. The existing legacy search page/index remains site-wide;
include `JSON` in the home output formats to generate that index. The sitemap
continues to list eligible pages across all published sections.

Run `mise run blog` or build with `mise run build-blog`. The complete example
lives in `exampleSites/blog/`.

## Combining layouts

**Portfolio + blog:** retain the default homepage, enable the blog feature, and
add posts. The portfolio example demonstrates this existing combination.

**Blog + docs:** start with the modern build settings in the blog example,
enable `params.features.docs.enable`, and add a docs section with a
`cascade.type: docs`. If starting from the standalone docs example, remove its
`ignoreFiles` filter so blog and legacy search content are available. Add links
through the existing menu configuration:

```yaml
params:
  customMenus:
    - name: Documentation
      url: docs
      showOnFooter: true
```

The shared docs header links back to the site homepage. Portfolio section anchors
are omitted on legacy pages when the site's homepage is docs or blog. See
[component and docs configuration](components.md) for the full docs contract.

Feature flags retain their existing layout/navigation meaning. Disabling a flag
does not unpublish Markdown or remove its URLs, legacy search records, or sitemap
entries. Remove/exclude unwanted content explicitly using Hugo configuration.

## Verification

`mise run test-blog` checks an external theme consumer, selected-tree filtering,
recent-post pagination, topic scope, modal index isolation, feed/search/sitemap
publication, multilingual subpaths, legacy flags and invalid/empty sections.
`mise run test-docs` includes blog + docs composition and asset isolation.
`mise run check` runs all tests, lint, and production builds for every example.
