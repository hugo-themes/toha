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

```go-html-template
{{</* text kind="abbr" title="HyperText Markup Language" */>}}HTML{{</* /text */>}}
```

### Aperçu

{{< text kind="abbr" title="HyperText Markup Language" >}}HTML{{< /text >}}

## Variantes: `kbd`

```go-html-template
{{</* text kind="kbd" */>}}Esc{{</* /text */>}}
```

### Aperçu

{{< text kind="kbd" >}}Esc{{< /text >}}

## Variantes: `mark`

```go-html-template
{{</* text kind="mark" */>}}Highlight{{</* /text */>}}
```

### Aperçu

{{< text kind="mark" >}}Highlight{{< /text >}}

## Variantes: `sub`

```go-html-template
{{</* text kind="sub" */>}}2{{</* /text */>}}
```

### Aperçu

{{< text kind="sub" >}}2{{< /text >}}

## Variantes: `sup`

```go-html-template
{{</* text kind="sup" */>}}2{{</* /text */>}}
```

### Aperçu

{{< text kind="sup" >}}2{{< /text >}}
