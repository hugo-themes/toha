---
title: mermaid
linkTitle: mermaid
weight: 60
---

Muestra diagramas con params.features.flowchart.enable y mermaid: true en el front matter. Las páginas modernas cargan un bundle separado en modo estricto. Consulta la guía de diagramas para ver ejemplos.

Disponible en páginas clásicas y modernas activadas; cada una usa sus propios recursos.

## Uso

```go-html-template
{{</* mermaid align="center" */>}}
graph LR;
  A --> B
{{</* /mermaid */>}}
```

[Ejemplos]({{< relref "/docs/blog/writing-posts/mermaid" >}})
