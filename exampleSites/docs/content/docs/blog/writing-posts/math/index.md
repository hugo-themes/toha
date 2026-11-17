---
title: Math Type Settings
date: '2020-06-08T06:15:35+06:00'
math: true
linkTitle: Math Guide
weight: 40
aliases:
  - /posts/writing-posts/math/
  - /docs/writing-posts/math/
---

Modern docs render mathematical expressions to native MathML at build time, without remote scripts. Enable `params.features.math.enable`, set `math: true` on the page, and configure the Goldmark passthrough delimiters shown in the docs example configuration. Use `\( ... \)` for inline expressions and `$$ ... $$` for blocks. Legacy portfolio/blog articles keep their existing KaTeX service.

[Supported TeX functions](https://katex.org/docs/supported.html).

### Examples
Inline math: \(\varphi = \dfrac{1+\sqrt5}{2}= 1.6180339887…\)

Block math:
$$
 \varphi = 1+\frac{1} {1+\frac{1} {1+\frac{1} {1+\cdots} } }
$$
