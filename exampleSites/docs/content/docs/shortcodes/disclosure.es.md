---
title: disclosure
linkTitle: disclosure
aliases:
  - /docs/shortcodes/ui-disclosure/
weight: 100
---

Usa un desplegable nativo con una etiqueta y contenido Markdown. open="true" lo abre inicialmente.

Requiere una página moderna activada.

## Uso

```html
{{</* disclosure label="Details" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Vista previa

{{< disclosure label="Details" >}}
**Markdown**: `code`.
{{< /disclosure >}}

## Variaciones: `open`

```html
{{</* disclosure label="Details" open="true" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Vista previa

{{< disclosure label="Details" open="true" >}}
**Markdown**: `code`.
{{< /disclosure >}}
