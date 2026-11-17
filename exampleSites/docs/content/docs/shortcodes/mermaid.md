---
title: mermaid
linkTitle: mermaid
weight: 60
---

Render diagrams when params.features.flowchart.enable and page front matter mermaid: true are enabled. Modern pages load a separate strict-security bundle. See the diagram guide for live examples.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```go-html-template
{{</* mermaid align="center" */>}}
graph LR;
  A --> B
{{</* /mermaid */>}}
```

[Live examples]({{< relref "/docs/blog/writing-posts/mermaid" >}})
