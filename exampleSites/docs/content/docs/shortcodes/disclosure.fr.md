---
title: disclosure
linkTitle: disclosure
aliases:
  - /docs/shortcodes/ui-disclosure/
weight: 100
---

Utilisez un bloc dépliable natif avec un libellé et du Markdown. open="true" l’ouvre par défaut.

Nécessite une page moderne activée.

## Utilisation

```html
{{</* disclosure label="Details" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Aperçu

{{< disclosure label="Details" >}}
**Markdown**: `code`.
{{< /disclosure >}}

## Variantes: `open`

```html
{{</* disclosure label="Details" open="true" */>}}
**Markdown**: `code`.
{{</* /disclosure */>}}
```

### Aperçu

{{< disclosure label="Details" open="true" >}}
**Markdown**: `code`.
{{< /disclosure >}}
