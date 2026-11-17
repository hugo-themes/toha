---
title: button
linkTitle: button
aliases:
  - /docs/shortcodes/ui-button/
weight: 70
---

Crea un enlace con page o href, o una acción desactivada. Las variantes son primary, secondary y ghost. Un control de solo icono necesita una etiqueta.

Requiere una página moderna activada.

## Uso

```html
{{</* button label="Portfolio" page="/docs/portfolio" */>}}
```

### Vista previa

{{< button label="Portfolio" page="/docs/portfolio" >}}

## Variaciones: `secondary`

```html
{{</* button label="Portfolio" page="/docs/portfolio" variant="secondary" */>}}
```

### Vista previa

{{< button label="Portfolio" page="/docs/portfolio" variant="secondary" >}}

## Variaciones: `ghost`

```html
{{</* button label="Portfolio" page="/docs/portfolio" variant="ghost" */>}}
```

### Vista previa

{{< button label="Portfolio" page="/docs/portfolio" variant="ghost" >}}

## Variaciones: `icon`

```html
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" */>}}
```

### Vista previa

{{< button label="Portfolio" page="/docs/portfolio" icon="book" >}}

## Variaciones: `iconOnly`

```html
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" */>}}
```

### Vista previa

{{< button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" >}}

## Variaciones: `disabled`

```html
{{</* button label="Unavailable action" disabled="true" */>}}
```

### Vista previa

{{< button label="Unavailable action" disabled="true" >}}
