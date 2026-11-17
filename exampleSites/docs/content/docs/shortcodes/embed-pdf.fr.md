---
title: embed-pdf
linkTitle: embed-pdf
weight: 120
---

Affichez le lecteur PDF historique. Définissez src et éventuellement renderPageNum et hidePaginator. Ce lecteur dépend du JavaScript historique.

Activez `params.features.embedpdf.enable: true` dans `hugo.yaml`. Cet exemple attend `sample.pdf` dans le bundle de la page.

## Utilisation

```html
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="false" */>}}
```

### Aperçu

{{< docs-preview page="/shortcode-previews/embed-pdf" title="embed-pdf" >}}

Cet aperçu exécute le shortcode historique dans un cadre séparé. Les intégrations distantes et le lecteur PDF nécessitent un accès réseau.

## Variantes: `hidePaginator`

```html
{{</* embed-pdf src="sample.pdf" renderPageNum="1" hidePaginator="true" */>}}
```

### Aperçu

{{< docs-preview page="/shortcode-previews/embed-pdf-hide-paginator" title="embed-pdf hidePaginator" >}}
