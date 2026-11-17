---
title: Comment ajouter un langage non supporté ?
date: '2024-01-15T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Ajout d'une nouvelle langue
weight: 510
aliases:
  - /posts/translation/new-language/
---

Si vous voulez traduire vers une langue non supportée, vous pouvez traduire les éléments de l'UI.

## Créer un fichier `i18n`

Pour ce faire, vous avez à créer un répertoire `i18n` à l'intérieur de la racine de votre site, le répertoire où vous pouvez trouver le fichier `hugo.yaml`, et les répertoires tel que `data`, `content`, etc.

Après cela, vous pouvez créer le fichier `<langage code>.toml` dans le répertoire `i18n`. Dans ce [répertoire](https://github.com/hugo-toha/hugo-toha.github.io/tree/gh-pages/flags/1x1), vous pouvez trouver tous les codes de langue avec le drapeau qui apparaît avec ce code.

## Traduire les éléments de l'UI

A l'intérieur d'un nouveau fichier, copiez simplement le contenu suivant, et remplacez le contenu entre guillemets avec le nom de la langue désirée.

{{< alert type="warning" >}}
Si le contenu ci-dessous devient obsolète, vous pouvez copier les contenus depuis le fichier [en](https://github.com/hugo-toha/toha/blob/main/i18n/en.toml).
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
