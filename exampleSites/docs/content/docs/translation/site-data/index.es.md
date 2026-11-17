---
title: Cómo traducir los datos de la página de inicio
date: '2020-06-07T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Traduciendo la página de inicio
weight: 510
aliases:
  - /posts/translation/site-data/
---

Este tema tiene soporte integrado para varios idiomas.

## Añade el idioma en el sitio

Añadiendo el idioma a su sitio traducirá la interfaz de usuario a ese idioma (por ejemplo, los botones, las barras de navegación, etc.).

### Obtener el código del idioma

Para traducir su sitio, necesitará el código de su idioma. La siguiente tabla contiene los idiomas soportados junto con sus códigos:

| Idioma               | Código            |
|----------------------|-------------------|
| English              | `en` / none       |
| বাংলা                 | `bn`              |
| Français             | `fr`              |
| Indonesian           | `id`              |
| Deutsch              | `de`              |
| Español              | `es`              |
| 简体中文              | `zh-cn` / `zh-tw` |
| हिन्दी                  | `hi`              |
| Italiano             | `it`              |
| 日本語                | `jp`              |
| 한국어                | `ko`              |
| русский              | `ru`              |
| suomi                | `fi`              |
| Tiếng Việt           | `vn`              |
| Turkish              | `tr`              |
| Arabic (العربية)        | `ar`              |
| Português Europeu    | `pt-pt`           |
| Català               | `ad`              |
| Português Brasileiro | `pt-br`           |
| Dutch                | `nl`              |
| Hebrew               | `he`              |




Para una lista completa de los idiomas soportados, por favor, consulte el archivo README de [toha repository](https://github.com/hugo-toha/toha).

Si el idioma al que desea traducir el contenido no está disponible, consulte la guía [Cómo añadir un idioma sin soporte](/es/posts/translation/new-language/).

### Añade el idioma a `hugo.yaml`

Después de conocer el código para el idioma al que desea traducir su sitio, abra el archivo `hugo.yaml` y, debajo de la sección `language`, añade lo siguiente:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  <código_del_idioma>:
    languageName: <nombre_del_idioma>
    weight: 2 # Puedes establecer el orden de los idiomas con este valor

```

Por ejemplo, si deseas establecer el francés como segundo idioma, la sección debería ser similar a:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2 # Puedes establecer el orden de los idiomas con este valor

```

## Traduciendo la página de inicio

Puedes traducir la página de inicio creando un nuevo directorio dentro de `data`. El nombre del nuevo directorio debería ser `<código_del_idioma>`. Por ejemplo, si queremos traducirlo al francés, crearemos el directorio `fr` dentro de `data`.

Afterwards you can create your usual data file like `about.yaml` or `education.yaml` files, keeping the same file structure and maintaining the same file names. Inside those files, you can just translate the content of the fields into your desired language.
Luego, puede crear sus archivos de datos habituales, como `about.yaml` o `education.yaml`, manteniendo la misma estructura y los mismos nombres de archivos. Dentro de esos archivos, puede traducir el contenido de los campos al idioma que desee.

## A continuación

Puedes consultar la siguiente guía [Cómo traducir las publicaciones](/es/posts/translation/content/).
