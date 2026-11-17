---
title: split
linkTitle: split
weight: 30
---

Split Markdown into columns. Spans use a 12-column grid; separate each column with three hyphens. Modern columns stack on small screens.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```go-html-template
{{</* split 6 6 */>}}
Left column.

---
Right column.
{{</* /split */>}}
```

[Live examples]({{< relref "/docs/shortcodes" >}})
