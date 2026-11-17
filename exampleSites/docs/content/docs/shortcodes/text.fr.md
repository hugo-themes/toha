---
title: text
linkTitle: text
aliases:
  - /docs/shortcodes/ui-text/
weight: 110
---

Affichez du texte brut avec l’un des types autorisés : abbr, kbd, mark, sub ou sup. title indique le développement d’une abréviation.

Nécessite une page moderne activée.

## Utilisation

```html
{{</* text kind="abbr" title="HyperText Markup Language" */>}}HTML{{</* /text */>}}
```

### Aperçu

{{< text kind="abbr" title="HyperText Markup Language" >}}HTML{{< /text >}}

## Variantes: `kbd`

```html
{{</* text kind="kbd" */>}}Esc{{</* /text */>}}
```

### Aperçu

{{< text kind="kbd" >}}Esc{{< /text >}}

## Variantes: `mark`

```html
{{</* text kind="mark" */>}}Highlight{{</* /text */>}}
```

### Aperçu

{{< text kind="mark" >}}Highlight{{< /text >}}

## Variantes: `sub`

```html
{{</* text kind="sub" */>}}2{{</* /text */>}}
```

### Aperçu

{{< text kind="sub" >}}2{{< /text >}}

## Variantes: `sup`

```html
{{</* text kind="sup" */>}}2{{</* /text */>}}
```

### Aperçu

{{< text kind="sup" >}}2{{< /text >}}
