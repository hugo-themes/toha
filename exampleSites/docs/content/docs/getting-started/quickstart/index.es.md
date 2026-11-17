---
title: Inicio Rápido
date: '2022-08-09T00:00:00+06:00'
description: Guía de inicio rápido para el tema Toha
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Inicio Rápido
weight: 2
aliases:
  - /posts/quickstart/
  - /docs/quickstart/
---

## Ejecutar los ejemplos

Instala [mise](https://mise.jdx.dev/getting-started.html) y clona el repositorio del tema:

```sh
git clone https://github.com/hugo-themes/toha.git
cd toha
mise install
mise run portfolio
```

Abre <http://localhost:1313/>. El repositorio fija las versiones de Hugo Extended y Dart Sass; mise también instala Go y Node. Cada servidor instala sus dependencias automáticamente.

Detén el servidor antes de elegir otro ejemplo o usa un puerto diferente:

```sh
mise run docs
mise run blog -- --port 1314
```

## Personalizar el sitio

La configuración, el contenido, los recursos y los datos traducidos del portafolio están en [exampleSites/portfolio](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio). Edita `hugo.yaml` y los datos de tu idioma. Consulta los [parámetros del sitio]({{< relref "/docs/portfolio/site-parameters" >}}) y la [sección de presentación]({{< relref "/docs/portfolio/sections/about" >}}).

Estos ejemplos usan el tema local mediante un reemplazo de módulo Go. Son sitios de desarrollo, no exportaciones independientes. Para un sitio independiente existente, conserva la identidad de su módulo y ejecuta `hugo mod get github.com/hugo-toha/toha/v4@latest`, seguido de `hugo mod npm pack` y `npm install`. Instala Dart Sass para los estilos clásicos. Los nuevos layouts necesitan una versión publicada que los incluya; una versión anterior no sustituye el tema local.

## Verificar una contribución

```sh
mise run check
```

Este comando comprueba los tres ejemplos, el lint y las pruebas. Consulta la guía para [contribuir]({{< relref "/docs/community/contributing" >}}).
