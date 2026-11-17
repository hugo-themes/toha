---
title: alert
linkTitle: alert
weight: 10
---

Mensajes con los tonos info, success, warning o danger.

Disponible en páginas clásicas y modernas activadas; cada una usa sus propios recursos.

## Uso

```go-html-template
{{</* alert type="info" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Vista previa

{{< alert type="info" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variaciones: `success`

```go-html-template
{{</* alert type="success" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Vista previa

{{< alert type="success" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variaciones: `warning`

```go-html-template
{{</* alert type="warning" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Vista previa

{{< alert type="warning" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variaciones: `danger`

```go-html-template
{{</* alert type="danger" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Vista previa

{{< alert type="danger" >}}
**Markdown**: `code`.
{{< /alert >}}
