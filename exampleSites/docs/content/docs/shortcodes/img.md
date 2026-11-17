---
title: img
linkTitle: img
weight: 20
---

A responsive image from a page bundle, site assets, or a static URL. Supply meaningful alternative text.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" */>}}
```

### Preview

{{< img src="boat.jpg" title="A boat at sea" >}}

## Variations: `width, align`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" width="600" align="center" */>}}
```

### Preview

{{< img src="boat.jpg" title="A boat at sea" width="600" align="center" >}}

## Variations: `height, width`

```go-html-template
{{</* img src="boat.jpg" title="A boat at sea" height="200" width="300" */>}}
```

### Preview

{{< img src="boat.jpg" title="A boat at sea" height="200" width="300" >}}
