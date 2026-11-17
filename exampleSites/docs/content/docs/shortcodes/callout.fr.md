---
title: callout
linkTitle: callout
aliases:
  - /docs/shortcodes/ui-callout/
weight: 90
---

Mettez du Markdown en évidence avec un titre facultatif et le ton info, success, warning ou danger.

Nécessite une page moderne activée.

## Utilisation

```go-html-template
{{</* callout title="info" tone="info" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="info" tone="info" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `success`

```go-html-template
{{</* callout title="success" tone="success" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="success" tone="success" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `warning`

```go-html-template
{{</* callout title="warning" tone="warning" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="warning" tone="warning" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `danger`

```go-html-template
{{</* callout title="danger" tone="danger" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="danger" tone="danger" >}}
**Markdown**: `code`.
{{< /callout >}}
