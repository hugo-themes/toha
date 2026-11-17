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

```go-html-template
{{</* text kind="abbr" title="HyperText Markup Language" */>}}HTML{{</* /text */>}}
```

### Vista previa

{{< text kind="abbr" title="HyperText Markup Language" >}}HTML{{< /text >}}

## Variaciones: `kbd`

```go-html-template
{{</* text kind="kbd" */>}}Esc{{</* /text */>}}
```

### Vista previa

{{< text kind="kbd" >}}Esc{{< /text >}}

## Variaciones: `mark`

```go-html-template
{{</* text kind="mark" */>}}Highlight{{</* /text */>}}
```

### Vista previa

{{< text kind="mark" >}}Highlight{{< /text >}}

## Variaciones: `sub`

```go-html-template
{{</* text kind="sub" */>}}2{{</* /text */>}}
```

### Vista previa

{{< text kind="sub" >}}2{{< /text >}}

## Variaciones: `sup`

```go-html-template
{{</* text kind="sup" */>}}2{{</* /text */>}}
```

### Vista previa

{{< text kind="sup" >}}2{{< /text >}}
