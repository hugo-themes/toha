---
title: mermaid
linkTitle: mermaid
mermaid: true
weight: 60
---

Render diagrams when params.features.flowchart.enable and page front matter mermaid: true are enabled. Modern pages load a separate strict-security bundle.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```go-html-template
{{</* mermaid align="left" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Preview

{{< mermaid align="left" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variations: `center`

```go-html-template
{{</* mermaid align="center" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Preview

{{< mermaid align="center" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variations: `right`

```go-html-template
{{</* mermaid align="right" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Preview

{{< mermaid align="right" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variations: `background`

```go-html-template
{{</* mermaid align="center" background="black" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Preview

{{< mermaid align="center" background="black" >}}
graph LR;
 A --> B
{{< /mermaid >}}
