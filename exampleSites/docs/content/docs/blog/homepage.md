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
      hero:
        enable: true
        image: images/default-background.jpg
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
        enable: true
    pagination:
      maxPostsPerPage: 4
```

Create `content/posts/_index.md` and put posts beneath it. The hero and topic rows can each be disabled. Search is separately opt-in and contains only the selected blog tree and language. Existing articles and archives keep their legacy layout; enabling the modern homepage does not modernize those pages.
