# Choosing a homepage

Homepage selection is separate from content sections. Sites without
`params.home.layout` retain the portfolio homepage.

| Homepage | Configuration | Content and assets |
| --- | --- | --- |
| Portfolio | `params.home.layout: portfolio` (default) | Data-driven sections, existing Bootstrap/SCSS and JavaScript |
| Documentation | `params.home.layout: docs` and `params.features.docs.enable: true` | Modern docs shell, Tailwind tokens and Alpine |
| Blog | `params.home.layout: blog` and `params.features.blog.enable: true` | Modern hero, text cards, recent-post pagination, topic previews and shared search |

The docs, blog homepage, and opt-in archive and reading layouts share design
tokens, theme storage, the site header, search dialog and Alpine runtime.
Modern and legacy bundles stay separate per page.

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
      postsPerPage: 3
      hero:
        enable: true
        image: images/default-background.jpg # Optional asset; otherwise a color surface.
      topics:
        enable: true
        taxonomy: categories
        limit: 5
        postsPerTopic: 3
  features:
    blog:
      enable: true
      section: posts
      archive:
        enable: true # Optional modern archive; default false.
      post:
        enable: true # Optional modern reading page; default false.
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
archive. Hidden and custom-layout pages are omitted from cards. The homepage grid
fits up to three cards per row. Set `params.home.blog.postsPerPage` to choose the
homepage page size. If omitted, it uses `params.features.pagination.maxPostsPerPage`,
which defaults to 12. Pagination uses ordinary links on the homepage URL
(`/page/2/` by default). Archive and article URLs are independent of the homepage
selection.

Topic previews use the configured taxonomy, exclude other content trees, and are
ordered by the taxonomy's site-wide post counts. Only published term pages are
linked. Each preview shows up to `postsPerTopic` cards (three by default) and
links to the term's archive. The topic bar jumps to those visible sections and
uses a dropdown on narrow screens. Set
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

## Modern blog archive

Enable `params.features.blog.archive.enable` alongside the blog feature. This
works with any homepage and uses the same modern asset settings as the blog
example. The new layout covers the selected blog section, its subsections, and
the site's category, tag, series, and configured topic taxonomy pages. Existing
term membership and links are preserved. The shared blog sidebar lists series
first, followed by categories and tag chips with post counts. Selecting a
category or tag shows its posts as text cards. The `features.blog.search.enable`
setting also controls the search dialog on these pages.

The first page of each section highlights up to three recent posts. The All
posts table lists the date, reading time, title, and tags. On narrow screens,
metadata appears below the title. Category and tag pages use text cards. Set
`params.features.pagination.maxPostsPerPage` to choose how many posts appear
on each page (12 by default). Pagination links appear when the number of posts
exceeds that limit and work with JavaScript disabled. Hugo's `pagination.path`
controls the pagination URLs. The legacy progressive loader still applies to
legacy archives.

To show series cards, register `series: series` under Hugo's top-level
`taxonomies` and add `series: [Your series]` to related posts. Keep entries
for any other taxonomies your site uses, such as `tag: tags` and
`category: categories`. The sidebar shows the number of series. Its Series link
opens the full series grid, and each card opens the first published post in
reading order. Existing individual series URLs forward to that post.

## Modern reading page

Set `params.features.blog.post.enable: true` to use the modern reading layout
for standard posts in the configured blog section. It works independently of
the homepage and archive layouts and preserves post and translation URLs.

Posts use a text byline and show a cover only when the post supplies a `hero`
asset or a bundled hero image. Set `heroAlt` to describe the cover when it
conveys information. Images authored in the post body still render normally.

The reading page shares the archive sidebar and highlights the post's section.
Posts belonging to a series with multiple visible posts include a series panel
above the article. Set Hugo's `series_weight` on individual posts to set their
reading order. Posts and series links work as ordinary links, and both the
sidebar and series panel can be expanded on narrow screens.

With `features.toc.enable: true`, posts with headings show a sticky desktop
outline and a collapsible mobile outline. Set `enableTOC: false` or
`toc: false` in front matter to hide it on one post. Previous and next links
follow the sidebar menu where configured and the archive order otherwise.
Existing metadata, tags, share buttons, edit links, comments, search, and
code copy settings also apply to the modern reading layout.

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
homepage and archive pagination, topic and series browsing, reading pages,
modal index isolation, feed/search/sitemap publication, multilingual subpaths,
legacy flags and invalid/empty sections.
`mise run test-docs` includes blog + docs composition and asset isolation.
`mise run check` runs all tests, lint, and production builds for every example.
