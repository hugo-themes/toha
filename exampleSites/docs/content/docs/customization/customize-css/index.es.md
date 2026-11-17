---
title: Personalización del CSS
date: '2024-01-13T22:00:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Personalización CSS
weight: 407
aliases:
  - /posts/customizing/customize-css/
  - /docs/customizing/customize-css/
---

Esta guía describe los estilos clásicos del portafolio y los artículos. La documentación moderna y la portada del blog usan los tokens de `assets/styles/modern/main.css`; consulta la [guía de composición en inglés]({{< relref path="/docs/customization/composition" lang="en" >}}).

Este tema te permite personalizar la apariencia de tu sitio y sus componentes sobrescribiendo el CSS predeterminado. Esta guía te enseñará cómo sobrescribir el esquema de colores del tema y la personalización de CSS de componentes individuales.

Este tema usa [Sass](https://sass-lang.com/) para generar el CSS. Si no está familiarizado con Sass, puedes aprender más sobre él [aquí](https://sass-lang.com/guide).

## Sobrescribe las variables de los colores

Si quieres cambiar los colores por defecto del tema, pueds sobrescribir las variables de los colores. Para sobrescribir las variables de los colores del tema, necesitarás crear un archivo nombrado `variables.scss` dentro del directorio `assets/styles` de tu sitio. Después copia el contenido predeterminado del archivo [variables.scss](https://github.com/hugo-toha/toha/blob/main/assets/styles/variables.scss), y ponlo en tu archivo `variables.scss`. Aquí, solo la sección de `$theme` predeterminada de `variables.scss` es mostrada:

```scss
// themes
$themes: (
  'light': (
    // cyan 600
    'accent-color': #0891b2,
    // cyan 500
    'hover-over-accent-color': #06b6d4,
    // zinc 200
    'text-over-accent-color': #e4e4e7,
    // slate 50
    'bg-primary': #f8fafc,
    // slate 900
    'bg-primary-inverse': #0f172a,
    // slate 200
    'bg-secondary': #e2e8f0,
    'bg-card': #fff,
    // slate 800
    'heading-color': #1e293b,
    // slate 700
    'text-color': #334155,
    // slate 300
    'inverse-text-color': #cbd5e1,
    // slate 500
    'muted-text-color': #64748b,
    // red 600
    'inline-code-color': #dc2626,
    // amber 200
    'highlight-color': #fde68a,
    // slate 900
    'footer-color': #0f172a,
  ),
  'dark': (
    // cyan 600
    'accent-color': #0891b2,
    // cyan 500
    'hover-over-accent-color': #06b6d4,
    // zinc 200
    'text-over-accent-color': #e4e4e7,
    // gray-800
    'bg-primary': #1f2937,
    // slate 900
    'bg-primary-inverse': #0f172a,
    // gray 900
    'bg-secondary': #111827,
    // slate 800
    'bg-card': #1e293b,
    // slate 100
    'heading-color': #f1f5f9,
    // slate 300
    'text-color': #cbd5e1,
    // slate 900
    'inverse-text-color': #0f172a,
    // slate 500
    'muted-text-color': #64748b,
    // red 600
    'inline-code-color': #dc2626,
    // amber 200
    'highlight-color': #fde68a,
    // slate 900
    'footer-color': #0f172a,
  ),
);
```

Los campos `light` y `dark` representan los esquemas de color para el modo claro y el modo oscuro, respectivamente. Modificando los códigos de color en estos campos, puedes personalizar la apariencia de su sitio.

## Override Component CSS

Para sobrescribir el CSS de un componente, crea un archivo `override.scss` dentro del directorio `assets/styles`. Después, allí pon el nuevo código CSS. No necesitarás reescribir toda la componente de CSS. Puedes poner solo los campos que quieras cambiar.

Por ejemplo, para deshabilitar el efector de difuminado de la imagen de fondo de la página de inicio, puedes añadir el siguiente código SCSS en el archivo `override.scss`:

```scss
.home{
  .background{
    filter: none;
  }
}
```
