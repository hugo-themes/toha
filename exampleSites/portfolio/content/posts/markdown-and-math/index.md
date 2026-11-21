---
title: "Markdown, Typography, and KaTeX Math"
date: 2026-10-18T10:00:00+06:00
description: "Guest author attribution, sticky page outlines, tables, citations, footnotes, and client-side KaTeX math rendering."
aliases:
  - /posts/markdown-sample/
  - /posts/authoring/markdown-and-math/
hero: hero.svg
heroAlt: "Abstract typographic waves representing technical writing and formulas"
author:
  name: "Jessica Jonas"
math: true
categories: ["Authoring"]
subcategories: ["Typography & Math"]
tags: ["Markdown", "Math", "Bilingual"]
series: ["Authoring Rich Content"]
series_weight: 10
---

Technical writing frequently needs more than plain paragraphs—clear hierarchy, tabular comparisons, attributed quotes, footnotes, and readable mathematical notation all help keep complex architecture notes concise.

Notice the byline above: any article can override the default site author directly in front matter (here, **Jessica Jonas**), while preserving normalized reading time and clickable topic tags.

## Structured hierarchy & table of contents

Headings (`##`, `###`) automatically populate both the sticky **On this page** outline on desktop viewports and the collapsible mobile outline above the article body.

### Comparison tables

Markdown tables scale smoothly within the readable article column:

| Capability | Authoring Syntax | Modern Blog Behavior |
| --- | --- | --- |
| Guest Author | `author.name` | Overrides site author on byline & metadata |
| Math Rendering | `math: true` + KaTeX delimiters | Loads bundled `modern-math.js` on demand |
| Page Outline | `enableTOC` (`true` default) | Sticky desktop TOC + collapsible mobile view |
| Series Ordering | `series` + `series_weight` | Series index panel + Prev/Next links |

## Blockquotes, citations & footnotes

> Don't communicate by sharing memory; share memory by communicating.
> — *Rob Pike*[^1]

[^1]: Excerpted from Rob Pike's Go concurrency talk during Gopherfest, November 2015.

Emoji aliases like :sparkles: and :rocket: remain enabled when `enableEmoji: true` is set in `hugo.yaml`.

## Mathematical notation with KaTeX

When `math: true` is configured in page front matter alongside `features.math.enable`, inline expressions such as $T(n) = O(n \log n)$ and display equations render cleanly with bundled KaTeX without external script CDNs:

$$
\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^\top}{\sqrt{d_k}}\right)V
$$

And bounded percentile estimation over latency buckets:

$$
\hat{p}_q = x_k + \frac{qN - C_{k-1}}{c_k} \cdot (x_{k+1} - x_k)
$$

## Summary

Clean typographic spacing, semantic contrast in light and dark themes, and on-demand KaTeX loading keep heavy pages lightweight while preserving expressive technical prose.
