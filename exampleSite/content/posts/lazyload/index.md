---
title: "Lazy Load Posts"
date: 2026-09-12T00:00:00+00:00
description: Enable optional infinite scrolling while retaining ordinary pagination
menu:
  sidebar:
    name: Lazy Load Posts
    identifier: lazyload
    weight: 50
---

Toha can append the next page of post cards as readers scroll near the bottom of a list. It works on blog sections, nested sections, and individual tag and category pages.

## Configuration

Enable the feature in `hugo.yaml`:

```yaml
params:
  features:
    pagination:
      maxPostsPerPage: 12
      lazyLoad: true
```

`lazyLoad` defaults to `false`. `maxPostsPerPage` controls the number of cards in both normal pagination and each additional batch. No JSON output configuration or additional library is required. Existing RSS feeds and output formats remain unchanged.

## How it works

1. Hugo generates normal paginated HTML pages, such as `/posts/page/2/`, using the existing post-card template.
2. The first batch is rendered in the initial HTML. No archive data is fetched when the loader initializes.
3. When the load control comes within 200 pixels of the viewport, the browser requests the next HTML page and appends only its cards.
4. Each successful request advances to the following page. The full archive is never downloaded in one response.

All pages use the same filtering and ordering before pagination. Hidden posts and pages with a custom `layout` are excluded from the card list. Card template overrides, translations, tags, date formats, and display settings apply to every batch.

Hugo supplies the next page's URL, so language prefixes, deployment subpaths, custom blog section names, and pagination paths are respected. A direct visit to a numbered page starts from that page and loads its successor.

## Navigation and accessibility

The numbered pagination links remain visible and crawlable. Readers can use them to navigate directly or bookmark an archive page. They also work without JavaScript, when the loader is unsupported, and after a network failure.

With JavaScript enabled, a **Load more posts** button provides an explicit keyboard-accessible control. A polite status message announces loading, completion, or failure. Activating the button moves focus to the first newly loaded post; automatic loading does not move focus. Browsers without `IntersectionObserver` can still use the button.

If a request fails, automatic loading pauses and a visible message explains how to retry. The button retries the same page without advancing or duplicating cards. Pagination links remain available throughout.

## Tradeoffs

Requests include the next page's HTML shell as well as its cards, but are bounded to one page and reuse existing static output. Cards accumulate in the document during a long scrolling session. The browser's normal history and scroll restoration apply; the loader does not change the current URL. Use the numbered links when a specific archive page needs to be shared or bookmarked.

Set `lazyLoad: false` to retain ordinary pagination alone. The feature's JavaScript is excluded from the bundle when disabled.
