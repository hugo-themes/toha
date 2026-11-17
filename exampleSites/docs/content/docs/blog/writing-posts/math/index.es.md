---
title: Configuración del tipado de Matemáticas
date: '2020-06-08T06:15:35+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
math: true
linkTitle: Guía de Matemáticas
weight: 40
aliases:
  - /posts/writing-posts/math/
  - /docs/writing-posts/math/
---

La documentación moderna convierte las expresiones en MathML durante el build, sin scripts remotos. Activa `params.features.math.enable`, añade `math: true` a la página y configura los delimitadores passthrough de Goldmark como en este ejemplo. Usa `\( ... \)` en línea y `$$ ... $$` para bloques. Los artículos clásicos conservan su servicio KaTeX.

[Funciones TeX compatibles](https://katex.org/docs/supported.html).

### Ejemplos
Inline math: \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)

Bloque matemático:
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$
