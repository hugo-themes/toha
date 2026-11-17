---
title: disclosure
linkTitle: disclosure
aliases:
  - /docs/shortcodes/ui-disclosure/
weight: 100
---

Use a native disclosure with a label and Markdown content. Set open="true" to expand it initially.

Requires an enabled modern page.

## Usage

```html
{{</* disclosure label="Details" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Preview

{{< disclosure label="Details" >}}
**Markdown**: `code`.
{{< /disclosure >}}

## Variations: `open`

```html
{{</* disclosure label="Details" open="true" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Preview

{{< disclosure label="Details" open="true" >}}
**Markdown**: `code`.
{{< /disclosure >}}
