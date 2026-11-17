---
title: alert
linkTitle: alert
weight: 10
---

Colored messages with info, success, warning, or danger tones.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```go-html-template
{{</* alert type="info" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Preview

{{< alert type="info" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variations: `success`

```go-html-template
{{</* alert type="success" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Preview

{{< alert type="success" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variations: `warning`

```go-html-template
{{</* alert type="warning" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Preview

{{< alert type="warning" >}}
**Markdown**: `code`.
{{< /alert >}}

## Variations: `danger`

```go-html-template
{{</* alert type="danger" */>}}
**Markdown**: `code`.
{{</* /alert */>}}
```

### Preview

{{< alert type="danger" >}}
**Markdown**: `code`.
{{< /alert >}}
