---
title: Cómo contribuir?
date: '2024-01-19T02:30:00+06:00'
description: Una guía de cómo contribuir al tema de toha
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Contribuyendo
weight: 900
aliases:
  - /posts/contributing/
  - /docs/contributing/
---

Las contribuciones al tema, los ejemplos y esta documentación se hacen en [hugo-themes/toha](https://github.com/hugo-themes/toha). Ejecuta `mise install`, luego `mise run portfolio`, `mise run docs` o `mise run blog`, y verifica con `mise run check`. Todos los ejemplos usan el mismo tema local. Las fuentes de esta guía están en `exampleSites/docs/content/docs/`; usa el enlace de edición. Debajo se conserva el flujo histórico para sitios independientes.

## Maneras de contribuir

Puedes contribuir a este tema de varias maneras.

### Código

Los Pull Requests son bienvenidos y estaré encantado de revisarlos. Simplemente siga los siguientes principios:

- Manténgalo simple.
- Manténgalo consistente con el diseño.
- Utilice la menor cantidad de dependencias posible.
- Ten paciencia.

### Testeando y reportando errores

- Puedes reportar un [bug](https://github.com/hugo-toha/toha/issues/new?template=bug.md)
- También puedes [pedir una característica](https://github.com/hugo-toha/toha/issues/new?template=feature_request.md)
- [Dar ideas y sugerencias](https://github.com/hugo-toha/toha/issues/new?template=question.md)

### Documentación

También puedes contribuir con la documentación del tema:
You can also contribute to the theme documentation by:
- Añadiendo información y secciones.
- Corrigiendo errores y faltas de ortografía.
- Actualizando documentación obsoleta.
- Traduciendo la documentación a un nuevo idioma, [esta](/es/posts/translation/content/) guía te podría ser útil.

### Traducción

Finalmente, puedes contribuir a la traducción del tema a distintos idiomas, completando palabras que faltan, o añadiendo un nuevo idioma. Puedes seguir la guía [Cómo añadir un idioma sin soporte](/es/posts/translation/new-language/) para más información.

## Cómo contribuir?

Para el desarrollo local, puedes hacer cambios al submódulo del tema y probar los cambios con tu propio sitio o con el [sitio de ejemplo](https://github.com/hugo-themes/toha-example-site) localmente.

### Fork

Para comenzar, haz fork de [este repositorio](https://github.com/hugo-toha/toha). Después, sigue los siguientes pasos para usar el tema forkeado para el desarrollo local,


#### Ejecuta el tema forkeado con el sitio de ejemplo

Si quieres ejecutar tu desarrollo local con este [sitio de ejemplo](https://github.com/hugo-themes/toha-example-site), sigue los siguientes pasos:

```bash
# va al directorio exampleSite
$ cd exampleSite
# instala los módulos de hugo
$ hugo mod tidy
# instala las dependencias
$ hugo mod npm pack
$ npm install
# ejecuta el sitio de ejemplo localmente
$ hugo server -w
```

Ahora, puedes hacer cambios en el tema, y se verán reflectados inmediatamente en el sitio. Si necesitas cambiar alguna configuración, lo puedes hacer en el archivo `hugo.yaml` dentro del directorio `exampleSite`. Si necesitas añadir contenido o datos, puedes crear el respectivo directorio dentro de `exampleSite` y añade tu contenido o datos deseados ahí.

#### Ejecuta el tema forkeado con tu propio sitio

Si quieres ejecutar tu desarrollo local con tu sitio, sigue los siguientes pasos:

**Sustituye los módulos del tema:**

Abre el archivo `go.mod` de tu sitio y sustituye `github.com/hugo-toha/toha/v4` por el path de tu repositorio forkeado. Por ejemplo, si tu repositorio forkeado es `github.com/<tu-usuario-de-github>/toha`, sustituye `github.com/hugo-toha/toha/v4` por `github.com/<tu-usuario-de-github>/toha/v4`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => github.com/<your-github-user>/toha/v4 <git branch>
)
```

Para el desarrollo interactivo, puedes sustituir el tema con tu fork clonado localmente. Por ejemplo, si has clonado tu fork en `/home/mis-proyectos/toha`, sustituye `github.com/hugo-toha/toha/v4` por `/home/mis-proyectos/toha`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => /home/my-projects/toha
)
```

**Actualizar dependencias:**

```bash
# actualiza los módulos de hugo
$ hugo mod tidy
# instala las dependencias
$ hugo mod npm pack
$ npm install
```

**Ejecuta tu sitio localmente:**

```bash
$ hugo server -w
```

Desde aquí ya puedes hacer cambios al código fuente del tema mientras lo pruebas con tu sitio Hugo o con el de ejemplo.

### Abre un Pull Request

Cuando ya hayas hecho los cambios, haz commit y haz push a tu fork.

```bash
# añade todos los cambios
$ git add .
# haz commit de los cambios con un mensaje significativo
$ git commit -m "Un mensaje de commit significativo"
# haz push del commit a tu fork
$ git push my-fork mi-nueva-rama
```

Después, abre un Pull Request en la rama `main` de [hugo-toha/toha](https://github.com/hugo-toha/toha) desde la rama `mi-nueva-rama` de tu propio fork.
