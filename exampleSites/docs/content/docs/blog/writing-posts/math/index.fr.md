---
title: Paramètres de type Maths
date: '2020-06-08T06:15:35+06:00'
math: true
linkTitle: Paramètre de type Maths
weight: 40
aliases:
  - /posts/writing-posts/math/
  - /docs/writing-posts/math/
---

La documentation moderne transforme les expressions en MathML lors du build, sans scripts distants. Activez `params.features.math.enable`, ajoutez `math: true` à la page et configurez les délimiteurs passthrough de Goldmark comme dans la configuration de cet exemple. Utilisez `\( ... \)` en ligne et `$$ ... $$` pour les blocs. Les articles historiques conservent le service KaTeX.

[Fonctions TeX prises en charge](https://katex.org/docs/supported.html).

### Exemples

Inline math: \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)

Bloc de math:
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$
