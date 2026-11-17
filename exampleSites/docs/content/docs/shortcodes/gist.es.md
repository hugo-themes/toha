---
title: gist
linkTitle: gist
weight: 150
---

Inserta un gist de GitHub con los argumentos posicionales usuario, identificador y nombre de archivo opcional. Esto carga un script externo en el navegador.

## Uso

```go-html-template
{{</* gist spf13 7896402 */>}}
```

### Vista previa

{{< docs-preview page="/shortcode-previews/gist" title="gist" >}}

Esta vista previa ejecuta el shortcode heredado en un marco separado. Las integraciones remotas y el visor PDF requieren acceso a la red.

## Variaciones: `filename`

```go-html-template
{{</* gist spf13 7896402 "img.html" */>}}
```

### Vista previa

{{< docs-preview page="/shortcode-previews/gist-filename" title="gist filename" >}}
