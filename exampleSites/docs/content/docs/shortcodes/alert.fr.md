---
title: alert
linkTitle: alert
weight: 10
---

Messages avec les variantes info, success, warning ou danger.

Disponible sur les pages historiques et modernes activées ; chacune utilise ses propres ressources.

## Utilisation

```go-html-template
{{</* alert type="info" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Aperçu

{{< alert type="info" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variantes: `success`

```go-html-template
{{</* alert type="success" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Aperçu

{{< alert type="success" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variantes: `warning`

```go-html-template
{{</* alert type="warning" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Aperçu

{{< alert type="warning" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variantes: `danger`

```go-html-template
{{</* alert type="danger" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Aperçu

{{< alert type="danger" >}}
**Markdown**: `code`.
{{< /alert >}}
