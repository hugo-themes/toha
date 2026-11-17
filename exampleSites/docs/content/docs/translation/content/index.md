---
title: How to Translate Posts
date: '2024-01-15T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Translating Posts
weight: 520
aliases:
  - /posts/translation/content/
---

This theme has built-in support for multiple language.

Before starting the post translation, make sure that you have enabled the language to your site. If that's not the case, you can follow the section `Add the language to the site` from the guide [How to Translate Site Data]({{< relref path="/docs/translation/site-data" lang="en" >}}).

## Creating the post

Once you have your desired language added to your website, know you can translate posts to that language. We're going to assume that you want to translate an existing post.

### Create the index file

The first step is to locate the `index.md` file from the post that you want to translate. Then you have to create a file in the same directory (or you can just copy the `index.md` file), and name it `index.<language_code>.md`, where `<language_code>` is the language code that you can find in the language table in [How to Translate Site Data]({{< relref path="/docs/translation/site-data" lang="en" >}}).

### Translate the post

Now, you can start translating the post, the same way as you write a new post.

> INFO: If you're dealing with internal references, you'll need to add the prefix `/<language_code>` in front of your relative path. For example, if you want to create a link that is pointing to `/posts/translation/site-data/`, the link for the translated post will be `/<language_code>/posts/translation/site-data/`.
