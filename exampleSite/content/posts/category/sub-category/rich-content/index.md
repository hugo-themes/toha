---
title: "Rich Content"
date: 2020-06-08T08:06:25+06:00
description: Sample post with multiple images, embedded video etc.
menu:
  sidebar:
    name: Rich Content
    identifier: rich-content
    parent: sub-category
    weight: 10
hero: images/forest.jpg
tags:
- Markdown
- Content Organization
- Multi-lingual
categories:
- Basic
---

This sample post tests the followings:

- Category, sub-category nesting in the sidebar.
- Hero image and other images are in `images` folder inside this post directory.
- Different media rendering like image, tweet, YouTube video, Vimeo video etc.

### Image Sample

{{< img src="/posts/category/sub-category/rich-content/images/forest.jpg" align="center" title="Forest">}}

{{< vs >}}

### Tweet Sample

{{< tweet user="SanDiegoZoo" id="1453110110599868418" >}}

{{< vs >}}

### YouTube Video Sample

{{< youtube ZJthWmvUzzc >}}

{{< vs >}}

### Vimeo Video Sample

{{< vimeo 48912912 >}}
