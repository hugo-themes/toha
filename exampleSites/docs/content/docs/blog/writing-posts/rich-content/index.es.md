---
title: Contenido Enriquecido
date: '2020-06-08T06:15:30+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Contenido Enriquecido
weight: 50
aliases:
  - /posts/writing-posts/rich-content/
  - /docs/writing-posts/rich-content/
---

Hugo viene con unos cuantos [Built-in Shortcodes](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) para el contenido enriquecido, junto con una [configuración de privacidad](https://gohugo.io/about/hugo-and-gdpr/) y un conjunto de shortcodes simples que permiten versiones estáticas y sin varios embeds de redes sociales de JavaSrcipt.
<!--more-->
---
## Shortcode simple de Instagram
<!-- ref: https://github.com/gohugoio/hugo/issues/7879 -->




---
## Shortcode de privacidad mejorada de Youtube

{{< youtube ZJthWmvUzzc >}}




---
## Shortcode simple de Twitter

El shortcode siguiente integra una publicación de X cuando el servicio está disponible. Esta documentación enlaza con la publicación original para que el build funcione sin conexión.

```go-html-template
{{</* x user="SanDiegoZoo" id="1453110110599868418" */>}}
```

[@SanDiegoZoo · X](https://x.com/SanDiegoZoo/status/1453110110599868418)




---
## Shortcode simple de Vimeo

{{< vimeo 48912912 >}}
