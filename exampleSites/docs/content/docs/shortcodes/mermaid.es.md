---
title: mermaid
linkTitle: mermaid
mermaid: true
weight: 60
---

Muestra diagramas con params.features.flowchart.enable y mermaid: true en el front matter. Las páginas modernas cargan un bundle separado en modo estricto. Consulta la guía de diagramas para ver ejemplos.

Disponible en páginas clásicas y modernas activadas; cada una usa sus propios recursos.

## Uso

```html
{{</* mermaid align="left" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Vista previa

{{< mermaid align="left" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variaciones: `center`

```html
{{</* mermaid align="center" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Vista previa

{{< mermaid align="center" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variaciones: `right`

```html
{{</* mermaid align="right" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Vista previa

{{< mermaid align="right" >}}
graph LR;
 A --> B
{{< /mermaid >}}

## Variaciones: `background`

```html
{{</* mermaid align="center" background="black" */>}}
graph LR;
 A --> B
{{</* /mermaid */>}}
```

### Vista previa

{{< mermaid align="center" background="black" >}}
graph LR;
 A --> B
{{< /mermaid >}}
