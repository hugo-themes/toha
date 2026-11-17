---
title: embed-pdf
linkTitle: embed-pdf
weight: 120
---

Render the legacy PDF viewer. Set src, optional renderPageNum, and hidePaginator. This viewer depends on the legacy JavaScript bundle.

Compatibility reference for existing sites. These examples are shown as source here and do not load legacy or third-party assets into the modern docs.

## Usage

```go-html-template
{{</* embed-pdf src="/files/document.pdf" renderPageNum="1" hidePaginator="false" */>}}
```
