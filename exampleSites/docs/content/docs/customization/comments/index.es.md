---
title: Comentarios
date: '2022-03-14T06:00:23+06:00'
description: Añadiendo Comentarios en el tema de hugo Toha
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Comentarios
weight: 650
aliases:
  - /posts/comments/
  - /docs/comments/
---

## Comentarios

Este tema tiene soporte para comentarios en las publicaciones. Actualmente, soporta las siguientes extensiones de comentarios:

- [Disqus](https://disqus.com/)
- [Valine](https://valine.js.org/)
- [Utterances](https://utteranc.es/)
- [Giscus](https://giscus.app/)

Para una lista completa de las extensiones de comentarios soportadas, puede consultar el archivo de ejemplo [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml).

### Disqus

Disqus es una extensión de comentarios popular. Después de acceder a [Disqus](https://disqus.com/) necesitarás proveer tu shortname debajo de la sección `params.features` de tu archivo `hugo.yaml`, como a continuación:

```yaml
comment:
  enable: true
  services:
    disqus:
      shortName: ejemplo-de-sitio-de-toha
```

### Valine

[Valine](https://valine.js.org/) resulta ser una extensión de comentarios chino. Puedes habilitar la extensión de comentarios valine añadiendo la sección `valine` debajo de la sección `params.features` de tu archivo `hugo.yaml`, como a continuación:

```yaml
comment:
  enable: true
  services:
    valine:
      appId: id-de-la-aplicación
      appKey: clave-de-la-aplicación
      avatar: retro
      placeholder: Comparte tu pensamiento.
      lang: en
      recordIP: true
      enableQQ: true
```

### Utterances

Para habilitar la extensión de comentarios Utterances, necesitarás ir primero a [utteranc.es](https://utteranc.es/). En la sección de `Configuration`, provee la información necesaria. Te dará un script para incluir en tu sitio. Solo necesitarás extraer la información respectiva del script, y proveerla debajo de la sección `params.features` de tu archivo `hugo.yaml`, como a continuación:

```yaml
comment:
  enable: true
  services:
    utteranc:
      repo: tu-repositorio/nombre
      issueTerm: title
      theme: github-light
```

### Giscus

Giscus está basado en Utterances, pero usa [GitHub Discussions](https://docs.github.com/en/discussions) como backend. Esto requiere tener un repositorio público, y permitir que la aplicación Giscus use tu repositorio. Las instrucciones de configuración se pueden encontrar en [Giscus home page](https://giscus.app/).

Para habilitar la extensión de comentarios Utterances, necesitarás ir primero a [giscus.app](https://giscus.app/). En la sección de `Configuration`, provee la información necesaria. Te dará un script para incluir en tu sitio. Solo necesitarás extraer la información respectiva del script, y proveerla debajo de la sección `params.features` de tu archivo `hugo.yaml`, como a continuación:

```yaml
comment:
  enable: true
  services:
    giscus:
      repo: tu-repositorio/nombre
      repoID: ide-de-tu-repositorio
      category: tu-categoría
      categoryID: tu-ide-de-categoría
      theme: light
      map: url
      reaction: 1
      metadata: 0
      inputPosition: bottom
      crossOrigin: anonymous
```
