---
title: Customizing CSS
date: '2024-01-13T22:00:50+06:00'
author:
  name: Emruz Hossain
  image: images/author/emruz.jpg
linkTitle: CSS Customization
weight: 407
aliases:
  - /posts/customizing/customize-css/
  - /docs/customizing/customize-css/
---

This guide covers the legacy portfolio/article styles. Modern docs and blog homepages use semantic tokens in `assets/styles/modern/main.css`; see the [composition guide]({{< relref path="/docs/customization/composition" lang="en" >}}).

This theme allows you to customize the appearance of your site and its components by overriding the default CSS. This guide will demonstrate how to override the theme's color scheme and customize the CSS of individual components.

This theme uses [Sass](https://sass-lang.com/) to generate CSS. If you are not familiar with Sass, you can learn more about it from [here](https://sass-lang.com/guide).

## Override Theme Colors Variables

If you want to change the default color scheme of the theme, you can override the theme color variables. To override the theme color variables, you need to create a file named `variables.scss` in the `assets/styles` directory of your site. Then copy the content of the default [variables.scss](https://github.com/hugo-toha/toha/blob/main/assets/styles/variables.scss) file and put into your custom `variables.scss` file. Here, only the `$theme` section from default `variables.scss` file is shown below:

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

The `light` and `dark` fields in the color mappings represent the color schemes for light mode and dark mode, respectively. By modifying the color codes in these fields, you can customize the look and feel of your site.

## Override Component CSS

To override the CSS of a component, create a `override.scss` file in your site's `assets/styles` directory. Then, put the new CSS for the component there. You don't have to re-write the entire CSS of the component. You can just put the changed fields.

For example, to disable blur effect of the background image on the home page, you can add the following SCSS code in your `override.scss` file:

```scss
.home{
  .background{
    filter: none;
  }
}
```
