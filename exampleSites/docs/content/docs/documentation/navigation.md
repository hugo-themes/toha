---
title: Sections and sidebar
weight: 20
---

Use Hugo sections as the documentation hierarchy. A folder containing `_index.md` is a branch bundle and can contain child pages and nested sections. An `index.md` file is a leaf bundle: keep an article and its images there, without child pages.

```text
content/docs/
  _index.md
  portfolio/
    _index.md
    sections/
      _index.md
      about/
        index.md
        images/about.png
  blog/
    _index.md
  documentation/
    _index.md
  shortcodes/
    _index.md
  customization/
    _index.md
```

Set `title`, optional `linkTitle`, and `weight` in each section’s front matter. The docs root cascades `type: docs`; nested sections inherit the docs layout. Enable `params.features.docs.sidebar.groupSections: true` to display top-level sections as headings. It is disabled by default; nested sections stay expandable.

Breadcrumbs, search context, and previous/next links follow the same Hugo tree. Use `relref` with logical content paths for links. Add `aliases` when moving published pages; translated aliases omit the language prefix because Hugo adds it. These content sections are separate from the portfolio’s data-driven homepage sections.

[Hugo](https://gohugo.io/content-management/organization/#sections)
