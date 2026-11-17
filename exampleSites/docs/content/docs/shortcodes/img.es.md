---
title: img
linkTitle: img
weight: 20
---

Una imagen de un bundle, de assets o de una URL estática. Añade un texto alternativo útil.

Disponible en páginas clásicas y modernas activadas; cada una usa sus propios recursos.

## Uso

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" */>}}
```

### Vista previa

{{< img src="boat.jpg" title="A boat at sea" >}}

## Variaciones: `width, align`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" width="600" align="center" */>}}
```

### Vista previa

{{< img src="boat.jpg" title="A boat at sea" width="600" align="center" >}}

## Variaciones: `height, width`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" height="200" width="300" */>}}
```

### Vista previa

{{< img src="boat.jpg" title="A boat at sea" height="200" width="300" >}}
