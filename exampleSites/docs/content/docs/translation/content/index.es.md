---
title: Cómo traducir las publicaciones
date: '2020-06-07T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Traduciendo Publicaciones
weight: 520
aliases:
  - /posts/translation/content/
---

Este tema tiene soporte integrado para varios idiomas.

Antes de empezar la traducción de la publicación, asegúrese de haber habilitado el idioma en su sitio. Si ese no es el caso, puedes seguir la sección `Añade el idioma en el sitio` de la guía [Cómo traducir los datos de la página de inicio](/es/posts/translation/site-data/).

## Creando la publicación

Una vez que haya agregado el idioma deseado a su sitio web, sepa que puede traducir publicaciones a ese idioma. Asumiremos que deseas traducir una publicación existente.

### Creado el archivo index

El primer paso es localizar el archivo `index.md` del post que deseas traducir. Después, crea un archivo en el mismo directorio (o simplemente copia el archivo `index.md`), y nómbralo `index.<código_del_idioma>.md`, dónde `<código_del_idioma>` es el código que encontrará en la tabla de idiomas de [Cómo traducir los datos de la página de inicio](/es/posts/translation/site-data/).

### Traduce la publicación

Ahora ya puede empezar traduciendo la publicación, de la misma forma que escribes una publicación nueva.

> INFORMACIÓN: Si está tratando con referencias internas, necesitarás añadir el prefijo `/<código_del_idioma>` delante del path relativo. Por ejemplo, si quieres crear un link que apunta a `/posts/translation/site-data/`, el link de la publicación traducida será `/<language_code>/posts/translation/site-data/`.
