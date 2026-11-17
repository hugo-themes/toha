---
title: callout
linkTitle: callout
aliases:
  - /docs/shortcodes/ui-callout/
weight: 90
---

Destaca contenido Markdown con un título opcional y el tono info, success, warning o danger.

Requiere una página moderna activada.

## Uso

```html
{{</* callout title="info" tone="info" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Vista previa

{{< callout title="info" tone="info" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variaciones: `success`

```html
{{</* callout title="success" tone="success" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Vista previa

{{< callout title="success" tone="success" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variaciones: `warning`

```html
{{</* callout title="warning" tone="warning" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Vista previa

{{< callout title="warning" tone="warning" >}}
**Markdown**: `code`.
{{< /callout >}}

## Variaciones: `danger`

```html
{{</* callout title="danger" tone="danger" */>}}
**Markdown**: `code`.
{{</* /callout */>}}
```

### Vista previa

{{< callout title="danger" tone="danger" >}}
**Markdown**: `code`.
{{< /callout >}}
