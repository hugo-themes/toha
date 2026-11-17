---
title: Cómo añadir un idioma sin soporte
date: '2024-01-15T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Añadiendo un nuevo idioma
weight: 510
aliases:
  - /posts/translation/new-language/
---

Si desea traducir a un idioma si soporte, puede traducir los elementos de la interfaz de usuario.

## Crea el archivo `i18n`

Para haerlo, debes crear el directorio `i18n` dentro de la raíz del sitio, el directorio dónde puede encontrar el archivo `hugo.yaml`, y directorios como `data`, `content`, etc.

Luego, puedes crear el archivo `<código_del_idioma>.toml` dentro del directorio `i18n`. En este [directorio](https://github.com/hugo-toha/hugo-toha.github.io/tree/gh-pages/flags/1x1) puedes encontrar todos los códigos de idiomas con las banderas que aparecerán junto a ese idioma.

## Traduce los elementos de la interfaz

Dentro del nuevo archivo, simplemente copia el siguiente contenido, y sustituye el contenido entre comillas con el nombre en tu idioma deseado.

{{< alert type="warning" >}}
Si el contenido de abajo es obsoleto, puedes copiar el conteindo del archivo [en](https://github.com/hugo-toha/toha/blob/main/i18n/en.toml).
{{< /alert >}}

```toml
# More documentation here: https://github.com/nicksnyder/go-i18n
[home]
other = "Home"

[posts]
other = "Posts"

[toc_heading]
other = "Table of Contents"

[tags]
other = "Tags"

[categories]
other = "Categories"

[at]
other = "at"

[resume]
other = "My resume"

[navigation]
other = "Navigation"

[contact_me]
other = "Contact me:"

[email]
other = "Email"

[phone]
other = "Phone"

[newsletter_text]
other = "Stay up to date with email notification"

[newsletter_input_placeholder]
other = "Enter email"

[newsletter_warning]
other = "By entering your email address, you agree to receive the newsletter of this website."

[submit]
other = "Submit"

[hugoAttributionText]
other = "Powered by"

[prev]
other = "Prev"

[next]
other = "Next"

[share_on]
other = "Share on"

[improve_this_page]
other = "Improve this page"

[out_of]
other = "out of"

[publications]
other = "Publications"

[taken_courses]
other = "Taken Courses"

[course_name]
other = "Course Name"

[total_credit]
other = "Total Credit"

[obtained_credit]
other = "Obtained Credit"

[extracurricular_activities]
other = "Extracurricular Activities"

[show_more]
other = "Show More"

[show_less]
other = "Show Less"

[responsibilities]
other = "Responsibilities:"

[present]
other = "Present"

[comments_javascript]
other = "Please enable JavaScript to view the"

[comments_by]
other = "comments powered by"

[read]
other = "Read"

[project_star]
other = "Star"

[project_details]
other = "Details"

[err_404]
other = "The page you are looking for is not there yet."

[more]
other = "More"

[view_certificate]
other = "View Certificate"

[notes]
other = "Notes"

[disclaimer_text]
other = "Liability Notice"

[search]
other = "Search"

[minute]
one = "minute"
other = "minutes"
```
