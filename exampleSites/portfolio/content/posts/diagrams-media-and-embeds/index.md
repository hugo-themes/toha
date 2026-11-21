---
title: "Rich Media, Mermaid Diagrams, and Nested Sections"
date: 2026-11-02T14:00:00+06:00
description: "Organizing posts with front-matter categories and sub-categories alongside native Mermaid diagrams, responsive images, and HTML5 video."
aliases:
  - /posts/category/sub-category/rich-content/
  - /posts/authoring/media/diagrams-media-and-embeds/
hero: images/forest.jpg
heroAlt: "Sunlit evergreen forest canopy"
categories: ["Authoring"]
subcategories: ["Rich Media"]
tags: ["Components", "Media", "Navigation"]
series: ["Authoring Rich Content"]
series_weight: 30
---

Instead of maintaining deep folder trees on disk, posts stay flat while front-matter `categories` and `subcategories` organize navigation into an expandable hierarchy (`Authoring -> Rich Media`) with matching breadcrumbs above.

## Architecture diagrams with Mermaid

When `mermaid: true` is set (or a `mermaid` shortcode is present), `blog/post-assets.html` bundles Mermaid diagram rendering exclusively for pages that use it.

### Request pipeline flowchart

{{< mermaid align="center" >}}
flowchart LR
    A[Markdown & Front Matter] --> B[Hugo Content Tree]
    B --> C{Modern Blog Feature?}
    C -->|Yes| D[Modern Archive & Reader]
    C -->|No| E[Legacy Bootstrap Layout]
{{< /mermaid >}}

### Search sequence diagram

{{< mermaid >}}
sequenceDiagram
    participant Reader
    participant Dialog as Search Dialog
    participant Index as Scoped JSON Index
    Reader->>Dialog: Press Cmd+K / Click Search
    Dialog->>Index: Lazy fetch language index
    Index-->>Dialog: Matching posts & snippets
    Reader->>Dialog: Arrow keys / Enter -> Navigate
{{< /mermaid >}}

## Co-located media bundles & HTML5 video

Images inside nested `images/` subdirectories resolve cleanly via bundle resource URLs:

{{< img src="images/forest.jpg" width="720" height="440" align="center" title="Forest canopy captured from page bundle" >}}

{{< vs 2 >}}

HTML5 video players adapt smoothly to the readable article container using clean native controls:

{{< video src="/videos/sample.mp4" >}}

<!-- markdown-link-check-disable-next-line -->
Sample video by [Rahul Sharma](https://www.pexels.com/@rahul-sharma-493988) from [Pexels](https://www.pexels.com).

## Linked resources without heavy viewers

For downloadable artifacts like architecture slide decks or resumes, native link buttons keep page weight tiny and work offline:

{{< button label="Download Sample PDF Resume" href="/files/resume.pdf" variant="secondary" icon="file-text" >}}
