---
title: Configurando parámetros del sitio web
date: '2020-06-08T06:20:55+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Parámetros del sitio
weight: 105
aliases:
  - /posts/configuration/site-parameters/
  - /docs/configuration/site-parameters/
---

Después de instalar este tema, cuando ejecutas tu sitio web por primera vez, se iniciará con los parámetros predeterminados. Debería parecerse a este sitio de ejemplo, pero sin secciones en la página de inicio. No te preocupes, puede añadir estas secciones proporcionando los archivos de datos necesarios.

En las próximas publicaciones, le guiaré sobre cómo añadir estas secciones y personalizar tu sitio web. Pero primero, empezaremos cambiando los parámetros del sitio. Puedes modificar el fondo, el logo, la información del autor y habilitar/deshabilitar varias funcionalidades.

Para obtener una lista completa de los parámetros de configuración disponibles, consulte el [sitio de ejemplo](https://github.com/hugo-toha/hugo-toha.github.io/tree/main).

### Añade un Fondo

Para empezar, vamos a establecer un fondo para tu sitio web. Pon la imagen de fondo que desee en el directorio `assets/images`. Después, añade lo siguiente en la sección `params` del archivo `hugo.yaml`.

```yaml
background: "images/nombre_de_tu_imagen_de_fondo.jpg"
# Opcional, para tener un fondo diferente en modo oscuro
darkBackground: "images/nombre_de_tu_imagen_de_fondo_oscuro.jpg"
```

### Añade un Logo

Para añadir logos para tu sitio, necesitas dos logos diferentes: uno para la barra de navegación transparente, y otro para la barra de navegación no-transparente. Pon tus logos dentro del directorio `assets/images` y añade las siguientes líneas debajo de la sección `params` del archivo `hugo.yaml`.

```yaml
# El logo invertido será usado para la barra de navegación transparente.
# El logo principal será usado para la barra de navegación no-transparente.
logo:
  main: images/logo-principal.png
  inverted: images/logo-invertido.png
  favicon: images/favicon.png
```

### Habilita publicaciones del Blog

Para habilitar publicaciones de blog en tu sitio web, necesitarás aplicar unos cambios en el archivo `hugo.yaml`. Localiza la sección `params.features` y añada el siguiente código.

```yaml
# Habilita y configura publicaciones de Blog
blog:
  enable: true
  showAuthor: true # muestra el autor de la publicación (por defecto: true)
```

### Habilita `Tabla de Contenido`

Ahora, si quiere mostrar la sección `Tabla de Contenido` en tu publicación de blog, tienes que habilitarlo en la sección `params.features` del archivo `hugo.yaml`.

```yaml
toc:
  enable: true
```

También puedes controlar los niveles de tu Tabla de Contenido añadiendo la siguiente configuración en la sección de `markup` de tu archivo `hugo.yaml`.

```yaml
markup:
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false
```

Aquí, hemos configurado nuestra Tabla de Contenido para mostrar todos los encabezados desde `h2` hasta `h6`.

### Habilita el botón `<Mejorar esta página>`

Si quieres permitir que los lectores mejoren fácilmente una publicación haciendo correcciones como faltas de ortografía o identación, puedes habilitar el botón `<Mejorar esta página>`. Para hacerlo, añada su URL del repositorio de git en la sección `params` del archivo `hugo.yaml`.

```yaml
gitRepo: <URL de tu repositorio de Github del sitio>
```

Esto añadirá un botón con la etiqueta `Mejorar esta página` al final de cada publicación de blog. El botón dirigirá al usuario directamente a la página de edición respectiva en Github.

Si tu rama por defecto no tiene el nombre de `main`, necesitarás especificar tu rama por defecto de git en la sección `params` en el archivo `hugo.yaml`.

```yaml
gitBranch: <nombre de tu rama por defecto de git>
```

### Habilita Boletín Informativo

Para habilitar la funcionalidad de boletín informativo, necesitarás proveer los parámetros necesarios debajo de la sección `params.footer` en el archivo `hugo.yaml`. Ahora mismo, el boletín informativo solo es soportado por el proveedor Mailchimp. Aquí hay un ejemplo de cómo debería ser:

```yaml
newsletter:
  enable: true
  provider: mailchimp
  mailchimpURL: https://github.us1.list-manage.com/subscribe/post?u=19de52a4603135aae97163fd8&amp;id=094a24c76e
```

Para deshabilitar la funcionalidad del boletín informativo, puedes establecerlo con la siguiente configuración.

```yaml
newsletter:
  enable: false
```

### Habilita RAW HTML en los archivos de Markdown

Si quiere incluir RAW HTML en tus archivos de markdown, necesitarás habilitar el rendering inseguro. Sin habilitarlo, Hugo no podrá renderizar HTML. Para habilitar rendering inseguro de markdown, añade la siguiente configuración de `goldmark` en la sección `markup` del archivo `hugo.yaml`.

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

### Añade información del autor

Ahora, crea un archivo `author.yaml` dentro del directorio `/data/es/` y añade tu información como a continuación:

```yaml
# Alguna información sobre ti
name: "Jane Doe"
nickname: "Jane"
image: "images/avatar.png"

# mensaje de saludo antes de tu nombre. El valor predeterminado será "Hi!, I am" si no se proporciona.
greeting: "Hola, soy"

# da tu información de contacto. Se utilizará en el pie de página
contactInfo:
  email: "janedoe@example.com"
  phone: "+0123456789"
  stack-overflow:
    icon: stack-overflow
    url: "https://stackoverflow.com/users/1/exampleUser"
    text: "ExampleUser"

# Un pequeño resumen de lo que haces
summary:
  - Soy un desarrollador
  - Trabajo con Go
  - Me gusta trabajar en proyectos divertidos
```

> Nota: Los parámetros de `contactInfo` usarán el campo `icon` para buscar el respectivo icono. Asegúrese que el campo `icon` coincide con los nombres de la fuente awesome. Puedes encontrar ejemplos [aquí](https://fontawesome.com/search?o=r&f=brands).

### Añade un aviso de derechos de autor

Para añadir un aviso de derechos de autor en tu sitio, crea un archivo `site.yaml` dentro del directorio `/data/es`. Añada la siguiente sección al archivo:

```yaml
copyright: © 2024 Copyright.
```

### Descripción del sitio

Para añadir una descripción de tu sitio web que ayudará a los motores de búsqueda a encontrar tu sitio, necesitarás añadir una sección de `description` en tu archivo `site.yaml`.

```yaml
# Meta descripción de su sitio. Esto ayudará a los motores de búsqueda a encontrar su sitio.
description: Página de ejemplo del tema de hugo Toha.
```

### Añade Menús personalizados

Para añadir menús personalizados en la barra de navegación, puedes modificar el archivo `site.yaml`. Por defecto, los menús personalizados son visibles en la barra de navegación. Para esconder un menú personalizado, establece la propiedad `hideFromNavbar` a `true`. Por defecto, los menús personalizados están ocultos del área del pie de página. Para mostrar un elemento de menú personalizado en el pie de página, establece la propiedad `showOnFooter` a `true`. Esto es particularmente útil cuando desea añadir un enlace a otro sitio en la barra de navegación.

```yaml
customMenus:
- name: Notes
  url: https://hossainemruz.gitbook.io/notes/
  hideFromNavbar: false
  showOnFooter: true
```

### Cambiar Título de la Barra de Navegación
Para cambiar el título que aparece en la barra de navegación, puedes modificar el archivo `site.yaml`. Por defecto, el título corresponde con el nombre de la página web. Puedes añadir la siguiente línea:

```yaml
navBarTitle: "Título"
```

Ahora, puedes ejecutar tu sitio y ver los cambios. En las siguientes publicaciones, te guiaré en cómo añadir secciones a tu página de inicio y personalizar aún más su sitio.
