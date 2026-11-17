---
title: Comment traduire les données du site ?
date: '2024-01-15T06:20:50+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Traduction Page d'accueil
weight: 510
aliases:
  - /posts/translation/site-data/
---

Ce thème prend en charge plusieurs langues.

## Ajouter une langue à votre site

L'ajout d'une langue à votre site traduira l'interface dans cette langue (incluant les boutons, la barre de navigation, etc.).

### Obtenir le code de la langue

Pour traduire votre site, vous aurez besoin du code de la langue. Le tableau suivant contient les langues supportées ainsi que leurs codes:

| Languages            | Code              |
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




Pour la liste complète des langages supportées, consultez s'il vous plaît le fichier README du [dépôt Toha](https://github.com/hugo-toha/toha).

Si la langue désirée pour la traduction du votre contenu n'est pas disponible, consultez s'il vous plaît le guide [Comment ajouter un langage non supporté ?](/fr/posts/translation/new-language/)

### Ajouter la langue dans `hugo.yaml`

Après avoir identifié le code de la langue pour laquelle vous voulez traduire votre site, ouvrez le fichier `hugo.yaml`, et sous la section `languages` ajoutez ce qui suit:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  <code_langue>:
    languageName: <Nom de la langue>
    weight: 2 # Vous pouvez paramètrer l'ordre des langues avec cette valeur
```

Par exemple, si vous voulez configurer le `Français` comme nouvelle langue, la section devrait ressembler à ça:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2 # Vous pouvez paramètrer l'ordre des langues avec cette valeur
```

## Traduire la page principale

Vous pouvez traduire la page principale en créant un nouveau répertoire dans le répertoire `data`. Le nom de ce nouveau répertoire devra être le `<code_langue>`. Par exemple, si nous voulons traduire vers le français, nous devrons créer le répertoire `fr` dans le répertoire `data`.

Ensuite, vous pouvez créer votre fichier de données habituel tel que `about.yaml` ou `education.yaml`, en conservant la même structure et le même nom de fichier. Dans ces fichiers, vous pouvez simplement traduire le contenu des champs dans la langue désirée.

## Et ensuite ?

Vous pouvez consulter le guide suivant [Comment traduire des billets ?](/fr/posts/translation/content)
