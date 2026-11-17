---
title: mermaid
linkTitle: mermaid
weight: 60
---

Affichez des diagrammes avec params.features.flowchart.enable et mermaid: true dans le front matter. Les pages modernes chargent un bundle séparé en mode strict. Consultez le guide des diagrammes pour les exemples.

Disponible sur les pages historiques et modernes activées ; chacune utilise ses propres ressources.

## Utilisation

```go-html-template
{{</* mermaid align="center" */>}}
graph LR;
  A --> B
{{</* /mermaid */>}}
```

[Exemples]({{< relref "/docs/blog/writing-posts/mermaid" >}})
