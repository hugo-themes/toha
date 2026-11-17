---
title: Personalización de la Disposición
date: '2021-08-07T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Personalizacion Disposición
weight: 410
aliases:
  - /posts/customizing/customize-layout/
  - /docs/customizing/customize-layout/
---

{{< alert type="warning" >}}
Si personalizas la disposición de un componente existente, no recibirás actualizaciones futuras para ese componente una vez el tema sea actualizado. Necesitarás actualizar ese componente en tu repositorio.
{{< /alert >}}

En este tutorial, te guiaré en cómo personalizar la disposición de un tema. Yo personalmente he pasado por el proceso y compartiré mis ideas para ponértelo más fácil.

### Paso 1: Cambia el archivo de Disposición

Para personalizar la disposición de una sección, página o componente existente, necesitarás localizar el archivo correspondiente en el [directorio layout](https://github.com/hugo-toha/toha/tree/main/layouts) del tema. Una vez encuentre el archivo, cópialo y ponlo en la misma estructura de directorio dentro del directorio `layouts` de tu sitio.

Por ejemplo, para personalizar la disposición de la sección `sobre mi`, sigue estos pasos:

1. Copia el archivo `about.html` del directorio `layouts/partials/sections` del tema.
2. Pega el archivo en el directorio `layouts/partials/sections` de tu repositorio.
3. Modifica el archivo `about.html` para realizar los cambios de diseño deseados para la sección `sobre mi`.

### Paso 2: Añade estilo CSS

Si necesitas añadir CSS adicional en tu archivo layout modificado, lo puedes hacer añadiendo código CSS al archivo `assets/styles/override.scss` de tu sitio web. Este archivo es automáticamente cargado por el tema, y aplicará tus estilos personalizados. Si quieres añadir CSS en un archivo separado, pon el CSS dentro de un archivo SCSS en el directorio `assets/styles`, e incluye en el archivo `assets/styles/override.scss` la siguiente línea:

```scss
@import "nombre-de-tu-archivo-scss";
```

### Paso 3: Añade JavaScript

Si tu archivo de disposición modificado requiere de JavaScript adicional, la manera recomendada es añadir el código de JavaScript en el mismo archivo de disposición con la etiqueta `<script>`-. Si quieres añadir JavaScript en un archivo separado, pon el archivo dentro del directorio `assets/scripts` e inclúyelo en el archivo de disposición de la siguiente forma:

```html
{{ $script := resources.Get "scripts/tu-archivo-javacript.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
