---
title: "Lazy Load Posts"
date: 2026-09-12T00:00:00+00:00
description: Enable infinite scroll for blog posts using IntersectionObserver
menu:
  sidebar:
    name: Lazy Load Posts
    identifier: lazyload
    weight: 50
---

## Overview

The **Lazy Load Posts** feature replaces traditional pagination with infinite scrolling. When enabled, only the first page of posts is rendered server-side. Additional posts are loaded dynamically via JSON API when the user scrolls near the bottom of the page (200px threshold).

## Configuration

### 1. Enable Lazy Load in `hugo.yaml`

```yaml
params:
  features:
    pagination:
      maxPostsPerPage: 12  # Posts per batch
      lazyLoad: true       # Enable lazy load (default: false)
```

### 2. Enable JSON Output for Posts Section

Add to your `hugo.yaml`:

```yaml
outputs:
  home:
    - HTML
    - RSS
    - JSON
  posts:
    - HTML
    - JSON
```

### 3. Configure Posts Index Page

In `content/posts/_index.md`, add JSON output to front matter:

```yaml
---
title: Posts
outputs:
  - HTML
  - JSON
---
```

## How It Works

### When `lazyLoad: true`

1. **Server-side**: First `maxPostsPerPage` posts are rendered normally
2. **Trigger element**: A hidden `#lazy-load-trigger` div is placed after the posts
3. **Client-side**: `IntersectionObserver` watches the trigger (200px root margin)
4. **On intersect**: Fetches `/posts/index.json` (or `/tags/tagname/index.json`, `/categories/catname/index.json`)
5. **Renders**: Appends next batch of posts before the trigger
6. **Repeats**: Until all pages are loaded, then removes trigger

### When `lazyLoad: false` (default)

- Traditional pagination with page links at bottom
- All paginator pages (`/posts/page/2/`, etc.) are generated
- No additional JavaScript for lazy loading

## JSON API Endpoint

The lazy load uses a JSON endpoint at:
- Posts: `/posts/index.json`
- Tags: `/tags/<tagname>/index.json`
- Categories: `/categories/<catname>/index.json`

Each returns an array of post objects:

```json
[
  {
    "title": "Post Title",
    "url": "https://example.com/posts/post-title/",
    "date": "2026-01-15",
    "summary": "Post summary text...",
    "image": "/posts/post-title/hero.jpg",
    "tags": ["tag1", "tag2"],
    "readingTime": 5,
    "formattedDate": "January 15, 2026"
  }
]
```

## Behavior Details

| Aspect           | `lazyLoad: true`  | `lazyLoad: false` |
| ---------------- | ----------------- | ----------------- |
| Initial render   | First page only   | Current page      |
| Pagination links | Hidden            | Visible           |
| Paginator pages  | Not generated     | Generated         |
| JavaScript       | Included (always) | Included (always) |
| JSON endpoint    | Required          | Optional          |

## Multilingual Support

Works automatically with Hugo's multilingual setup. JSON URLs include language prefix:
- `/ru/posts/index.json`
- `/en/tags/hugo/index.json`

## Customization

### Adjust Load Threshold

Modify `rootMargin` in `assets/scripts/features/lazyLoadPosts/lazyLoadPosts.js`:

```javascript
}, { rootMargin: '200px' }); // Default: 200px before viewport
```

### Change Batch Size

Controlled by `maxPostsPerPage` in config. The same value is used for:
- Initial server-side render
- Each lazy-load batch

## Compatibility

- **Backward compatible**: Default is `false`, existing sites work unchanged
- **Works on**: Posts list, Tags list, Categories list pages
- **No dependencies**: Uses vanilla `IntersectionObserver` and `fetch`
- **SEO friendly**: First page fully server-rendered

## Example

See this feature in action on the [example site](https://toha-example-site.netlify.app/posts) with `lazyLoad: true` configured.