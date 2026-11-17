---
title: mermaid
linkTitle: mermaid
mermaid: true
weight: 60
---

Affichez des diagrammes avec params.features.flowchart.enable et mermaid: true dans le front matter. Les pages modernes chargent un bundle séparé en mode strict. Consultez le guide des diagrammes pour les exemples.

Disponible sur les pages historiques et modernes activées ; chacune utilise ses propres ressources.

## Utilisation

```go-html-template
{{</* mermaid align="left" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Aperçu

{{< mermaid align="left" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variantes: `center`

```go-html-template
{{</* mermaid align="center" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Aperçu

{{< mermaid align="center" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variantes: `right`

```go-html-template
{{</* mermaid align="right" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Aperçu

{{< mermaid align="right" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variantes: `background`

```go-html-template
{{</* mermaid align="center" background="black" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Aperçu

{{< mermaid align="center" background="black" >}}
graph LR;
 A --> B
{{< /mermaid >}}
