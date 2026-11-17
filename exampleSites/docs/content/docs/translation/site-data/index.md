---
title: How to Translate Site Data
date: '2024-01-15T06:20:50+06:00'
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Translating Homepage
weight: 510
aliases:
  - /posts/translation/site-data/
---

This theme has built-in support for multiple language.

## Add the language to the site

Adding the language to your site will translate the UI to that language (e.g. the buttons, the nav bars, etc.).

### Get language code

In order to translate your site, you will need the code from your language. The following table contains the supported languages algonside its codes:

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




For a complete list of the supported languages, please check the README file from the [toha repository](https://github.com/hugo-toha/toha).

If the language you desire to translate the content to is not available, please check the guide [How to add an unsupported language]({{< relref path="/docs/translation/new-language" lang="en" >}}).

### Add the language into `hugo.yaml`

After you know what's the code for the language you wish to translate your site, open `hugo.yaml` file, and under the `languages` section add the following:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  <language_code>:
    languageName: <language_name>
    weight: 2 # You can set the language order with this value

```

For example, if we want to set `Français` as the new language, the section would look similar to:

```yaml
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2 # You can set the language order with this value

```

## Translating the Main Page

You can translate the main page by creating a new directory into `data` directory. The name of the new directory should be `<language_code>`. For example, if we want to translate it to french, we would create the `fr` directory into `data` directory.

Afterwards you can create your usual data file like `about.yaml` or `education.yaml` files, keeping the same file structure and maintaining the same file names. Inside those files, you can just translate the content of the fields into your desired language.

## Next up

You can check the following guide [How to Translate Posts]({{< relref path="/docs/translation/content" lang="en" >}}).
