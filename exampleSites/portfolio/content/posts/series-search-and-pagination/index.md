---
title: "Series Navigation, Scoped Search, and Archive Pagination"
date: 2026-11-15T15:00:00+06:00
description: "How modern blog archives organize categories, tags, multi-part series panels, client-side search, and ordinary pagination links."
aliases:
  - /posts/lazyload/
  - /posts/engineering/series-search-and-pagination/
categories: ["Engineering"]
tags: ["Navigation", "Series", "Search"]
series: ["Toha Publishing Guide"]
series_weight: 30
---

Reading a portfolio blog should feel effortless whether a visitor arrives from the homepage **Featured Posts**, clicks a topic chip, searches by keyword, or reads straight through a multi-part tutorial series.

## Multi-part series & reading sequences

Adding `series` and `series_weight` to post front matter powers three coordinated features across the modern blog layout:

1. **Archive Series cards:** On the first page of `/posts/`, readers see curated series cards with post counts and direct **Start series** entry points.
2. **In-article series box:** Each post inside a multi-part series displays the numbered sequence above its outline so readers can jump cleanly between installments.
3. **Previous / Next page navigation:** At the end of each installment, footer navigation links seamlessly to the previous and next parts of the series.

## Topic filtering & paginated archives

The archive combines a highlight strip of recent posts with a scannable table of all posts showing publish dates, reading times, and tag chips. Setting `params.features.pagination.maxPostsPerPage` (set to `4` in this example site) keeps archive pages crisp while preserving ordinary, crawlable page links (`/posts/page/2/`).

{{< callout title="Search index isolation" tone="info" >}}
Press `Cmd+K` on any blog page to query the blog-scoped search index, or press `Cmd+K` on the portfolio homepage to search sections, projects, skills, and recent posts together.
{{< /callout >}}

## Opting back into legacy posts per site

Sites enabling `params.features.portfolio.modern.enable: true` inherit the modern blog archive and post reading layout automatically. If a site ever wants modern portfolio homepage styling alongside legacy Bootstrap archives or lazy-loading pagination, `params.features.blog.archive.enable: false` and `params.features.blog.post.enable: false` remain explicit overrides in `hugo.yaml`.
