---
title: Añadiendo una nueva Sección
date: '2024-01-13T22:30:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Añadiendo nueva Sección
weight: 415
aliases:
  - /posts/customizing/new-section/
  - /docs/customizing/new-section/
---

Si las secciones, plantillas y componentes existentes no cumplen con tus necesidades, puedes añadir nuevas secciones, plantillas y componentes a tu sitio web. Esta guía te enseñará cómo añadir una nueva sección a tu sitio.

### Paso 1: Cambia el archivo de Disposición

Para añadir una nueva sección a tu sitio, necesitarás crear un archivo de disposicion en el directorio `layouts/partials/sections`. El archivo debería tener el nombre de la sección. Por ejemplo, si quieres añadir una sección `contact` con un formulario de contacto, crea un archivo llamado `contact.html`. Usa la siguiente plantilla para el archivo `contact.html`:

```html
{{ $sectionID := replace (lower .section.name) " " "-"  }}
{{ if .section.id }}
  {{ $sectionID = .section.id }}
{{ end }}

<div class="container anchor p-lg-5 about-section" id="{{ $sectionID }}">
  // Tu código de HTML personalizado
</div>
```

### Paso 2: Añade estilo CSS

Si necesitas añadir CSS adicional en tu archivo layout modificado, lo puedes hacer añadiendo código CSS al archivo `assets/styles/override.scss` de tu sitio web. Este archivo es automaticamente cargado por el tema, y aplicará tus estilos personalizados. Si quieres añadir CSS en un archivo separado, pon el CSS dentro de un archivo SCSS en el directorio `assets/styles`, e incluye en el archivo `assets/styles/override.scss` la siguiente línea:

```scss
@import "nombre-de-tu-archivo-scss";
```

### Paso 3: Añade JavaScript

Si tu archivo de disposición modificado requiere de JavaScript adicional, la manera recomendada es añadir el código de JavaScript en el mismo archivo de disposición con la etiqueta `<script>`-. Si quieres añadir JavaScript en un archivo separado, pon el archivo dentro del directorio `assets/scripts` e incluyelo en el archivo de disposición de la siguiente forma:

```html
{{ $script := resources.Get "scripts/tu-archivo-javacript.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
