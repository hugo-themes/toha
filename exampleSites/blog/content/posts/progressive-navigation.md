---
title: Links first, enhancements second
date: 2026-01-02
tags: [Accessibility, Writing]
categories: [Design]
---

A reader should be able to follow a post, browse the archive, and reach the next
page through ordinary links. The blog homepage uses the same pagination as the
archive.

## Load at your own pace

With `params.features.pagination.lazyLoad: true`, the existing load-more control
fetches the next batch. The pagination remains available when JavaScript is
disabled or the request fails.
