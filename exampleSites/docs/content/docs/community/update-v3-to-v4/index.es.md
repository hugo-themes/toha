---
title: Migrar de la versión V3 a V4
date: '2024-01-05T02:30:00+06:00'
description: Guía de migración de la versión V3 a V4
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Migración de V3 a V4
weight: 900
aliases:
  - /posts/update-v3-to-v4/
  - /docs/update-v3-to-v4/
---

Toha V4 ha introducido muchos cambios que pueden romper el tema, es decir, cambian cómo se usa y configura el tema. Esta guía ta ayudará a migrar de la versión del tema v3 a v4. Por favor, compruebe estas [release notes](https://github.com/hugo-toha/toha/releases/tag/v4.0.0) para el registro de cambios completo.

En esta guía, lo guiaré por los pasos para migrar de la versión 3 a la versión 4 del tema Toha. Esta guía se basa en la guía de migración escrita por [Alexandre Neto](https://github.com/SrNetoChan) en [este issue](https://github.com/hugo-toha/toha/issues/852). ¡Empecemos!

### 1. Borra el submódulo de git `toha`

Toha V4 ha introducido unos cambios en el proceso de instalación. Uno de los cambios es que el tema ya no usa los submódulos de git. Por lo tanto, necesitamos eliminar el submódulo git `toha`. No te preocupes, este paso no eliminará nada de tu contenido.

```bash
git rm themes/toha/
git commit -m "Remove v3 theme"
```

### 2. Borra `theme` de `hugo.yaml`

En la nueva versión, ya no necesitamos especificar `theme` en el archivo `hugo.yaml`. En cambio, necesitaremos añadir el tema como módulo. Por lo tanto, borra la siguiente línea del archivo `hugo.yaml`.

```yaml
theme: toha
```

### 3. Cumple los requerimentos

Para ejecutar el tema localmente, debes tener las siguientes herramientas instaladas.

1. Versión Hugo `v0.118.x` (extended) o posterior.
2. [Go](https://go.dev/doc/install) language versión `v1.18.x` o posterior.
3. Versión Node `v18.x` y versión npm `8.x` o posterior.

Asegérate de que tienes las herramientas requeridas instaladas con la versión adecuada usando los siguientes comandos.

### 4. Initialize Hugo Module

Toha V4 usa [Hugo Module](https://gohugo.io/hugo-modules/) para manejar el tema. Vamos a usar el módulo de hugo para añadir el tema `Toha` a nuestro sitio web. Inicializa los módulos de hugo usando el siguiente comando:

```bash
hugo mod init github.com/<su usuario>/<su repositorio>
```

Este comando creará un archivo `go.mod` a la raíz de su repositorio. Compruebe que el archivo se haya creado correctamente.

### 5. Añade el tema como módulo

Ahora, añade la siguiente sección `module` en el archivo `hugo.yaml`. Esto añadirá el tema como módulo y lo montará en los archivos estáticos del tema.

```yaml
# Usa los modules de Hugo para añadir el tema
module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: static/files
    target: static/files
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts
```

### 6. Actualiza el archivo `hugo.yaml`

En la nueva versión, la estructura de configuración de las funcionalidades ha sido restructurada. Asimismo, será necesario actualizar el archivo `hugo.yaml`. Como referencia, puede consultar el ejemplo del archivo [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). Aquí resaltaremos las configuraciones más comunes que necesitan cambiarse.

**Modo oscuro:**

Hemos introducido soporte para un nuevo modo oscuro. Como resultado, ya no necesitamos usar servicios de terceros como `darkreader`. Para habilitar el nuevo modo oscuro, por favor borra las siguientes líneas de tu archivo `hugo.yaml`:

```yaml
 darkMode:
    provider: darkreader
    enable: true
    default: system
```

Después, añade las siguientes líneas debajo de la sección `params.features`:

```yaml
darkMode:
  enable: true
```

**Analíticas:**

Hemos reestructurado la configuración de las analíticas, comentarios y proveedores de servicio de soporte. Ahora están puestos debajo del campo `services` de la sección respectiva.

Asimismo, tus configuraciones previas de analíticas serán actualizadas de:

```yaml
analytics:
  enabled: true
  google:
    id: UA-XXXXXXXXX-X
```

a:

```yaml
analytics:
  enable: true
  services:
    google:
      id: UA-XXXXXXXXX-X
```

**Comentarios:**

De la misma forma, tus configuraciones de comentarios se transformarán de:

```yaml
comment:
  enable: true
  disqus:
    shortName: <your-disqus-shortname>
```

a:

```yaml
comment:
  enable: true
  services:
    disqus:
      shortName: <your-disqus-shortname>
```

**Soporte:**

Y, las siguientes configuraciones de soporte pasarán de:

```yaml
support:
  enabled: true
  kofi:
    user: <your ko-fi user id>
    text: Tip Me
    textColor: '#f9fafc'
    backgroundColor: '#248aaa'
```

a:

```yaml
support:
  enable: false
  services:
    kofi:
      user: hossainemruz
      text: Tip Me
      textColor: '#f9fafc'
      backgroundColor: '#248aaa'
```

**Otros Cambios:**

Hay otras opciones que han cambiado. Por ejemplo:

```yaml
enableToc: true
```

remplazado por:

```yaml
toc:
  enable: true
```

Similarmente:

```yaml
enableTags: true
```

remplazado por:

```yaml
tags:
  enable: true
  on_card: true
```

Finalmente,

```yaml
showFlags: true
```

remplazado por:

```yaml
# Specify whether to show flag in the language selector. Default is true.
flags:
  enable: true
  # # If you want to use different country flag for a language, specify them here.
  # flagOverwrites:
  #   - languageCode: en
  #     countryCode: us

```

Ha habido algunos otros cambios. Consulte el archivo de configuración de muestra [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml) para obtener más detalles.

### 7. Ejecuta el sitio

Finalmente, estás listo para ejecutar el tema. Por favor, ejecute los siguientes pasos para crear el sitio:

a. Cargar módulos de Hugo

```bash
hugo mod tidy
```

b. Instalar módulos de Node

```bash
hugo mod npm pack
npm install
```

c. Ejecuta el sitio

```bash
hugo server -w
```

Espero que esta guía te haya servido de ayuda con la migración del tema de la versión V3 a V4. Si encuentras algun problema, por favor abre una issue en el [repositorio en Github](https://github.com/hugo-toha/toha).
