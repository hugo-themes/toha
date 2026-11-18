---
title: A home for your writing
date: 2026-01-05
description: Start with your latest posts and make the rest of the site your own.
tags: [Toha, Writing]
categories: [Getting started]
series: [Building with Toha]
series_weight: 10
---

A personal site can begin with an idea. Use your homepage to introduce your
writing, then give readers a way to browse the archive and follow the topics
they care about.

## Choose a homepage

Set `params.home.layout` to `blog` and enable `params.features.blog.enable` in
your Hugo configuration. The default blog section is `posts`; set
`params.features.blog.section` if you prefer a name such as `journal`.

```yaml
module:
  imports:
    - path: github.com/hugo-toha/toha/v4

params:
  home:
    layout: blog
  features:
    blog:
      enable: true
      archive:
        enable: true
      post:
        enable: true
```

## Organize the archive

Group posts into sections by adding an `_index.md` file to a folder. Use tags
across sections for recurring topics, and reserve a series for articles that
belong together. The [archive](../) links to each of these entry points.

## Keep writing

Add Markdown files beneath your blog section. The homepage shares its filtering
and order with that section's archive. Hidden pages and pages with a custom layout
stay out of the cards. Archive pagination works without JavaScript.
