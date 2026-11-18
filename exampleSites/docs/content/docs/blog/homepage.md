---
title: Blog homepage
weight: 10
---

Run `mise run blog` to preview the complete example. Start from [exampleSites/blog/hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/blog/hugo.yaml), including its modern Tailwind build settings. Select the homepage independently from the content section:

```yaml
params:
  home:
    layout: blog
    blog:
      postsPerPage: 3
      hero:
        enable: true
        image: images/default-background.jpg
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
        enable: true
      post:
        enable: true
      search:
        enable: true
    pagination:
      maxPostsPerPage: 4
```

Create `content/posts/_index.md` and put posts beneath it. The hero and topic rows can each be disabled. Search is separately opt-in and contains only the selected blog tree and language.

The homepage shows up to three cards per row. Use `params.home.blog.postsPerPage` to set the homepage page size separately from the archive.

## Modern archive

Set `params.features.blog.archive.enable: true` to use the modern layout for the archive, its subsections, and category, tag, and series pages. This setting works with any homepage and defaults to off. The first page of each section shows up to three recent posts above the All posts table. The table lists the date, reading time, title, and tags, with metadata below each title on narrow screens. Set `params.features.pagination.maxPostsPerPage` to control how many posts appear per page. Pagination links appear above that limit, which defaults to 12. The archive shares the homepage search setting and keeps existing post and pagination URLs.

The sidebar lists series first, then categories and tag chips with post counts. A category or tag opens a grid of matching post cards.

To show series cards, add `series: series` under Hugo's top-level `taxonomies` and add `series: [Your series]` to your posts' front matter. Include each other taxonomy you use when declaring `taxonomies`, such as `category: categories` and `tag: tags`. The Series link in the sidebar shows the total and opens the full series grid. Each series card opens the first post in reading order.

## Modern reading page

Set `params.features.blog.post.enable: true` to use the modern reading layout for posts under the blog section. You can enable it independently of the homepage and archive. It shows a cover when a post supplies one through `hero` or a bundle hero image. Use `heroAlt` for covers that convey information.

Enable `params.features.toc.enable` for a desktop outline and a collapsible mobile outline. A post can hide both with `enableTOC: false` or `toc: false` in front matter. The reading layout uses the same blog search settings as the homepage and archive.

The archive sidebar stays available while reading. For posts in a series, a separate panel links to other parts in order. Set Hugo's `series_weight` in each post's front matter, with lower values first. The blog sidebar and series panel collapse on narrow screens.
