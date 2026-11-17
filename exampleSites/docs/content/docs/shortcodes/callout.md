---
title: callout
linkTitle: callout
aliases:
  - /docs/shortcodes/ui-callout/
weight: 90
---

Highlight Markdown content with an optional title and an info, success, warning, or danger tone.

Requires an enabled modern page.

## Usage

```go-html-template
{{</* callout title="info" tone="info" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Preview

{{< callout title="info" tone="info" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variations: `success`

```go-html-template
{{</* callout title="success" tone="success" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Preview

{{< callout title="success" tone="success" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variations: `warning`

```go-html-template
{{</* callout title="warning" tone="warning" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Preview

{{< callout title="warning" tone="warning" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variations: `danger`

```go-html-template
{{</* callout title="danger" tone="danger" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Preview

{{< callout title="danger" tone="danger" >}}
**Markdown**: `code`.
{{< /callout >}}
