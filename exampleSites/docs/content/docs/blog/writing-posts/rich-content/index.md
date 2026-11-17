---
title: Rich Content
date: '2020-06-08T06:15:30+06:00'
linkTitle: Rich Content
weight: 50
aliases:
  - /posts/writing-posts/rich-content/
  - /docs/writing-posts/rich-content/
---

Hugo ships with several [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) for rich content, along with a [Privacy Config](https://gohugo.io/about/hugo-and-gdpr/) and a set of Simple Shortcodes that enable static and no-JS versions of various social media embeds.
<!--more-->
---
## Instagram Simple Shortcode
<!-- ref: https://github.com/gohugoio/hugo/issues/7879 -->




---
## YouTube Privacy Enhanced Shortcode

{{< youtube ZJthWmvUzzc >}}




---
## Twitter Simple Shortcode

The shortcode below embeds an X post when its service is reachable. This documentation links to the original post so its build works offline.

```go-html-template
{{</* x user="SanDiegoZoo" id="1453110110599868418" */>}}
```

[@SanDiegoZoo · X](https://x.com/SanDiegoZoo/status/1453110110599868418)




---
## Vimeo Simple Shortcode

{{< vimeo 48912912 >}}
