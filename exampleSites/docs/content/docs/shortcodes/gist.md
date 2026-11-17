---
title: gist
linkTitle: gist
weight: 150
---

Embed a GitHub gist using positional user, gist ID, and optional filename arguments. This loads a third-party script in the reader’s browser.

## Usage

```html
{{</* gist spf13 7896402 */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/gist" title="gist" >}}

This preview runs the legacy shortcode in a separate frame. Remote embeds and the PDF viewer require network access.

## Variations: `filename`

```html
{{</* gist spf13 7896402 "img.html" */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/gist-filename" title="gist filename" >}}
