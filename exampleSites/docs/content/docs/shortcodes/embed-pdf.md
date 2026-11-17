---
title: embed-pdf
linkTitle: embed-pdf
weight: 120
---

Render the legacy PDF viewer. Set src, optional renderPageNum, and hidePaginator. This viewer depends on the legacy JavaScript bundle.

Enable `params.features.embedpdf.enable: true` in `hugo.yaml`. The example expects `sample.pdf` beside the page in its bundle.

## Usage

```go-html-template
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="false" */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/embed-pdf" title="embed-pdf" >}}

This preview runs the legacy shortcode in a separate frame. Remote embeds and the PDF viewer require network access.

## Variations: `hidePaginator`

```go-html-template
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="true" */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/embed-pdf-hidePaginator" title="embed-pdf hidePaginator" >}}
