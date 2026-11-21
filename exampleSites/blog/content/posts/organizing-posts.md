---
title: Give your posts room to grow
date: 2026-01-03
aliases:
  - /posts/guides/organizing-posts/
tags: [Writing, Organization]
categories: [Design]
subcategories: [Content Organization]
series: [Building with Toha]
series_weight: 30
---

Keep every article directly under `content/posts/` as a flat Markdown file or
page bundle, then assign `categories` and optional `subcategories` in front
matter to organize the sidebar hierarchy and breadcrumbs without deep folder trees.

## Use a page bundle

A folder containing `index.md` and its images keeps an article's assets together.
Add a `hero.jpg` or set `hero` in front matter to customize its card image.

## Keep useful paths

Choose clear slugs and preserve published URLs when reorganizing. Hugo aliases
can redirect readers from old paths.
