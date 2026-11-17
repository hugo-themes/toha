---
title: button
linkTitle: button
aliases:
  - /docs/shortcodes/ui-button/
weight: 70
---

Créez un lien avec page ou href, ou une action désactivée. Les variantes sont primary, secondary et ghost. Un contrôle avec une icône seule doit garder un libellé.

Nécessite une page moderne activée.

## Utilisation

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" */>}}
```

### Aperçu

{{< button label="Portfolio" page="/docs/portfolio" >}}

## Variantes: `secondary`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" variant="secondary" */>}}
```

### Aperçu

{{< button label="Portfolio" page="/docs/portfolio" variant="secondary" >}}

## Variantes: `ghost`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" variant="ghost" */>}}
```

### Aperçu

{{< button label="Portfolio" page="/docs/portfolio" variant="ghost" >}}

## Variantes: `icon`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" */>}}
```

### Aperçu

{{< button label="Portfolio" page="/docs/portfolio" icon="book" >}}

## Variantes: `iconOnly`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" */>}}
```

### Aperçu

{{< button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" >}}

## Variantes: `disabled`

```go-html-template
{{</* button label="Unavailable action" disabled="true" */>}}
```

### Aperçu

{{< button label="Unavailable action" disabled="true" >}}
