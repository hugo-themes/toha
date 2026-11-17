---
title: text
linkTitle: text
aliases:
  - /docs/shortcodes/ui-text/
weight: 110
---

Muestra texto plano con uno de los tipos permitidos: abbr, kbd, mark, sub o sup. title indica el significado de una abreviatura.

Requiere una página moderna activada.

## Uso

```html
{{</* text kind="abbr" title="HyperText Markup Language" */>}}HTML{{</* /text */>}}
```

### Vista previa

{{< text kind="abbr" title="HyperText Markup Language" >}}HTML{{< /text >}}

## Variaciones: `kbd`

```html
{{</* text kind="kbd" */>}}Esc{{</* /text */>}}
```

### Vista previa

{{< text kind="kbd" >}}Esc{{< /text >}}

## Variaciones: `mark`

```html
{{</* text kind="mark" */>}}Highlight{{</* /text */>}}
```

### Vista previa

{{< text kind="mark" >}}Highlight{{< /text >}}

## Variaciones: `sub`

```html
{{</* text kind="sub" */>}}2{{</* /text */>}}
```

### Vista previa

{{< text kind="sub" >}}2{{< /text >}}

## Variaciones: `sup`

```html
{{</* text kind="sup" */>}}2{{</* /text */>}}
```

### Vista previa

{{< text kind="sup" >}}2{{< /text >}}
