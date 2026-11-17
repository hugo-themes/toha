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

```html
{{</* callout title="info" tone="info" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="info" tone="info" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `success`

```html
{{</* callout title="success" tone="success" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="success" tone="success" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `warning`

```html
{{</* callout title="warning" tone="warning" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="warning" tone="warning" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variantes: `danger`

```html
{{</* callout title="danger" tone="danger" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Aperçu

{{< callout title="danger" tone="danger" >}}
**Markdown**: `code`.
{{< /callout >}}
