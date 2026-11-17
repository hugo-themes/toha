---
title: Migrate from V3 to V4 version
date: '2024-01-05T02:30:00+06:00'
description: A migration guide from v3 to v4 version of the theme.
linkTitle: V3 to V4 Migration
weight: 900
aliases:
  - /posts/update-v3-to-v4/
  - /docs/update-v3-to-v4/
---

Toha V4 has introduced a lots of breaking changes in terms of how the theme is used and how it is configured. This guide will help you to migrate from v3 to v4 version of the theme. Please, check this [release notes](https://github.com/hugo-toha/toha/releases/tag/v4.0.0) for complete changelog.

In this guide, I will walk you through the steps to migrate from version 3 to version 4 of the Toha theme. This guide is based on the migration guide written by [Alexandre Neto](https://github.com/SrNetoChan) in [this issue](https://github.com/hugo-toha/toha/issues/852). Let's get started!

### 1. Remove `toha` git submodule

Toha V4 has made some changes to the installation process. One of the changes is that the theme no longer uses a git submodule. Therefore, we need to remove the `toha` git submodule. Don't worry, this step will not remove any of your content.

```bash
git rm themes/toha/
git commit -m "Remove v3 theme"
```

### 2. Remove `theme` from `hugo.yaml`

In the new version, we no longer need to specify the `theme` in the `hugo.yaml` file. Instead, we will add the theme as a module. Therefore, remove the following line from your `hugo.yaml` file:

```yaml
theme: toha
```

### 3. Meet the requirements

For building the site locally we will need to update/install the following requirements:

1. Hugo version `v0.118.x` (extended) or later.
2. [Go](https://go.dev/doc/install) language version `v1.18.x` or later.
3. Node version `v18.x` and npm version `8.x` or later.

Make sure you have installed all the required tools.

### 4. Initialize Hugo Module

Toha V4 now uses [Hugo Module](https://gohugo.io/hugo-modules/) to manage the theme. To get going, we need to initialize the module.

```bash
hugo mod init github.com/<your username>/<your repo name>
```

This will create a `go.mod` file in the root of your site. You can check the file to see if it has been created properly.

### 5. Add the theme as a module

Now, add the following `module` section in your `hugo.yaml` file. This will add the theme as a module and also mount the static files from the theme.

```yaml
# Use Hugo modules to add theme
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

### 6. Update the `hugo.yaml` file

In the new version, the configuration structure for managing features has been restructured. Therefore, it is necessary to update the `hugo.yaml` file. For reference, you can check the sample [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). Here, we will highlight the most commonly used configurations that need to be changed.

**Dark Mode:**

We have introduced a new built-in dark mode support. As a result, there is no longer a need to use a third-party service like `darkreader`. To enable the new dark mode, please remove the following lines from your `hugo.yaml` file:

```yaml
 darkMode:
    provider: darkreader
    enable: true
    default: system
```

Then, add the following lines under `params.features` section:

```yaml
darkMode:
  enable: true
```

**Analytics:**

We have restructured the configuration for analytics, comments, and support service providers. They are now placed under the `services` field of the respective section.

Therefore, your previous analytics configuration will be updated from:

```yaml
analytics:
  enabled: true
  google:
    id: UA-XXXXXXXXX-X
```

to:

```yaml
analytics:
  enable: true
  services:
    google:
      id: UA-XXXXXXXXX-X
```

**Comment:**

Likewise, your existing comments configuration will be transformed as follows:

```yaml
comment:
  enable: true
  disqus:
    shortName: <your-disqus-shortname>
```

to:

```yaml
comment:
  enable: true
  services:
    disqus:
      shortName: <your-disqus-shortname>
```

**Support:**

And, your following support configuration will change from:

```yaml
support:
  enabled: true
  kofi:
    user: <your ko-fi user id>
    text: Tip Me
    textColor: '#f9fafc'
    backgroundColor: '#248aaa'
```

to:

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

**Other Changes:**

There are few other options that have been changed. For examples:

```yaml
enableToc: true
```

replaced by:

```yaml
toc:
  enable: true
```

Similarly:

```yaml
enableTags: true
```

replaced by:

```yaml
tags:
  enable: true
  on_card: true
```

Finally,

```yaml
showFlags: true
```

replace by:

```yaml
# Specify whether to show flag in the language selector. Default is true.
flags:
  enable: true
  # # If you want to use different country flag for a language, specify them here.
  # flagOverwrites:
  #   - languageCode: en
  #     countryCode: us

```

There have been a few other changes. Please refer to the sample configuration file for more details.

### 7. Build the site

Finally, you ready to build the theme. Please, execute the following steps to build the site:

a. Load Hugo modules

```bash
hugo mod tidy
```

b. Install node modules

```bash
hugo mod npm pack
npm install
```

c. Run the site

```bash
hugo server -w
```

I hope this guide has been helpful in migrating your theme from V3 to V4. If you encounter any issues, please feel free to open an issue in the [Github repository](https://github.com/hugo-toha/toha).
