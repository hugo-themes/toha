---
title: embed-pdf
linkTitle: embed-pdf
weight: 120
---

Muestra el visor PDF clásico. Define src y opcionalmente renderPageNum y hidePaginator. El visor depende del JavaScript clásico.

Activa `params.features.embedpdf.enable: true` en `hugo.yaml`. El ejemplo espera `sample.pdf` en el bundle de la página.

## Uso

```html
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="false" */>}}
```

### Vista previa

{{< docs-preview page="/shortcode-previews/embed-pdf" title="embed-pdf" >}}

Esta vista previa ejecuta el shortcode heredado en un marco separado. Las integraciones remotas y el visor PDF requieren acceso a la red.

## Variaciones: `hidePaginator`

```html
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="true" */>}}
```

### Vista previa

{{< docs-preview page="/shortcode-previews/embed-pdf-hide-paginator" title="embed-pdf hidePaginator" >}}
