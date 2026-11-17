---
title: Contenu riche
date: '2020-06-08T06:15:30+06:00'
linkTitle: Contenu riche
weight: 50
aliases:
  - /posts/writing-posts/rich-content/
  - /docs/writing-posts/rich-content/
---

Hugo est livré avec quelques [Shortcode intégrés](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes) pour du contenu riche, ainsi qu'une [configuration pour le respect de la vie privée](https://gohugo.io/about/hugo-and-gdpr/) et un ensemble de Shortcode simples qui active des versions statiques et sans JS de différents médias sociaux.

<!--more-->
---
## Shortcode simple Instagram
<!-- ref: https://github.com/gohugoio/hugo/issues/7879 -->




---
## Shortcode amélioré de confidentialité YouTube

{{< youtube ZJthWmvUzzc >}}




---
## Shortcode simple X (ex-Twiter)

Le shortcode ci-dessous intègre une publication X lorsque le service est accessible. Cette documentation fournit un lien vers la publication pour permettre le build hors ligne.

```go-html-template
{{</* x user="SanDiegoZoo" id="1453110110599868418" */>}}
```

[@SanDiegoZoo · X](https://x.com/SanDiegoZoo/status/1453110110599868418)




---
## Shortcode simple Vimeo

{{< vimeo 48912912 >}}
