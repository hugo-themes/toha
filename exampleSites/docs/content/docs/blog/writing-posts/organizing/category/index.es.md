---
title: Creando una Categoría
date: '2020-06-08T06:15:55+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Creando una Categoría
weight: 10
aliases:
  - /posts/writing-posts/organizing/category/
  - /docs/writing-posts/organizing/category/
---

Primero, necesitamos entender cómo crear una publicación para poder crear categorías.

## Crear una Publicación

Para crear una publicación en tu primer blog, primero necesitas ir al directorio `posts`. Ahí crea un archivo `_index.md` (el nombre tiene que ser exactamente el mismo). Después, abre el archivo y añade las siguientes líneas:


    ---
    title: Posts
    ---

Ahora, guarda y cierra el archivo. Ahora, supone que quieres escribir una publicación. Primero, crea un archivo y nómbralo con la extensión de markdown al final. Por ejemplo: hemos creado el archivo nombrado `analytics-and-comments.md` y hemos añadido las siguientes líneas:


    ---
    title: "Analytics and Comments"
    date: 2020-06-08T06:00:23+06:00
    hero: /images/posts/writing-posts/analytics.svg
    description: Adding analytics and disquss comment in hugo
    theme: Toha
    menu:
      sidebar:
        name: Analytics & Comments
        identifier: analytics-and-comments
        weight: 500
    ---

    ### Complete Post Coming Soon...

Como sabemos, el encabezado de este archivo empieza y acaba con tres guiones horizontales (`---`) es nombrado front-matter, y todos los posts que escribamos necesitan tener el front-matter incluido ahí. Vamos a entender cuáles son los parámetros, y para qué sirven:


**title:** Este es el título de tu publicación.

**date:** Esta es la fecha y hora que muestra la fecha y hora de publicación de tu blog. La primera porción está en el formato `year-month-date`. Puedes editar la fecha y hora como quieras.

**hero:** Aquí, necesitarás incluir la ruta de la imagen de portada de tu publicación. Vaya al directorio `static` y crea un directorio nombrado `images` (únicamente si no lo tienes). Después, dentro de este directorio crea un nuevo directorio nombrado `posts`, y dentro de este, hemos creado un directorio nombrado `writing-posts`, donde hemos puesto el archivo de imagen `analytics.svg`. Ahora copia la ruta, y añádalo al parámetro `hero`.

**description:** Añade la descripción que te convenga.

**menu:** Esta sección contiene otros parámetros nombrados `sidebar` que configurarán cómo se mostrará la estructura del archivo en la barra lateral. Debajo de este, tenemos:

**name:** Este define cual será el nombre del documento en la barra lateral.

**identifier:** Este ayuda a identificar el archivo con otros archivos en términos de la categoría.

**weight:** Se asigna un valor a este parámetro como valor de peso y, para varios archivos, los documentos aparecerán en la jerarquía de archivos según este valor de peso en orden ascendente.

Después del front-matter, puedes escribir cualquier contenido siguiendo la sintaxis de markdown.


La siguiente imagen muestra cómo el contenido de `analytics-and-comments.md` está distribuido en la sección de la barra lateral.

![Image1](https://dev-to-uploads.s3.amazonaws.com/i/5klx1docgxewhxeo9sgi.png)

> En la figura de arriba, Features, Installation, Configuration, Writing Posts, Customizing, Short Codes, etc., son directorios creados para otras publicaciones.

## Crear una Categoría

Como hemos creado un archivo `_index.md` y una publicación anteriormente, ahora, para crear una categoría, necesitamos crear un directorio. Hemos creado un directorio nombrado `getting-started`, y dentro de este, hemos creado otro archivo `_index.md`, que tendrá el siguiente contenido front-matter:

```
---
title: Deploy Site
menu:
  sidebar:
    name: Deploy Site
    identifier: getting-started
    weight: 300
---
```

El significado de cada parámetro ha sido explicado anteriormente. Ahora, ten en cuenta que vamos a crear el nombre de la categoría como `getting-started`, por eso lo incluimos como identificador en este archivo "_index.md", pero puede darle el nombre que desee. Después, vamos a crear un archivo markdown nombrado `github-pages.md` que será nuestra publicación en este directorio. Nuestro archivo `github-pages.md` tiene las siguientes líneas:

```
---
title: "Deploy site in Github Pages"
date: 2020-06-08T06:00:20+06:00
hero: /images/posts/writing-posts/git.svg
menu:
  sidebar:
    name: Github Pages
    identifier: getting-started-github
    parent: getting-started
    weight: 10
---
### Próximamente...
```

Ya conocemos los parámetros usados aquí, pero tenemos uno nuevo incluido, que es `parent`. Si nos damos cuenta, entenderemos que el valor de este parámetro y el valor del parámetro `identifier` en el archivo `_index.md` dentro de este directorio son ambos iguales. Debemos tener cuidado de que el valor de ambos parámetros coincida. Ahora puedes agregar tantas publicaciones y categorías como quieras siguiendo el procedimiento mencionado anteriormente. Así es cómo creamos las categorías.

La siguiente imagen muestra cómo el contenido está distribuido en la sección de la barra lateral.

![Image2](https://dev-to-uploads.s3.amazonaws.com/i/cso16yy6wf89eywgbufb.png)

## Personalizando la información del auto de la publicación

Por defecto, la publicación usa la información de autor del archivo `hugo.yaml`. Si quieres sobrescribir la información predeterminada, simplemente añade la siguiente sección en el front-matter:

```yaml
author:
  name: Md.Habibur Rahman
  image: /images/authors/habib.jpg
```

El front-matter debería parecerse a:

```yaml
title: "Creando una Categoría"
date: 2020-06-08T06:15:55+06:00
# hero: images/background/flower.jpg
author:
  name: Md.Habibur Rahman
  image: /images/authors/habib.jpg
menu:
  sidebar:
    name: Creando una Categoría
    identifier: writing-post-category-create
    parent: writing-post-category
    weight: 10
```
