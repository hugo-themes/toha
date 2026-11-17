---
title: Customizing the layout
date: '2021-08-07T06:20:50+06:00'
author:
  name: James Ray
  image: images/author/james.jpg
linkTitle: Layout Customization
weight: 410
aliases:
  - /posts/customizing/customize-layout/
  - /docs/customizing/customize-layout/
---

{{< alert type="warning" >}}
If you customize the layout of an existing component, you will not receive any future updates for that component when the theme is updated. You will need to manually update the component in your repository.
{{< /alert >}}

In this tutorial, I will guide you on how to customize the layout of a theme. I have personally gone through the process and will share my insights to make it easier for you.

### Step 1 : Change the Layout File

To customize the layout of an existing section, page, or component, you need to locate the corresponding file in the theme's [layout directory](https://github.com/hugo-toha/toha/tree/main/layouts). Once you find the file, copy it and place it in the same directory structure within the `layouts` directory of your site.

For example, to customize the layout of the `about` section, follow these steps:

1. Copy the `about.html` file from the `layouts/partials/sections` directory of the theme.
2. Paste the copied file into the `layouts/partials/sections` directory of your repository.
3. Edit the copied `about.html` file to make the desired layout changes for the `about` section.

### Step 2: Add CSS Styles

If you need to add additional CSS to your modified layout file, you can do so by adding the CSS code to the `assets/styles/override.scss` file in your site. This file is automatically loaded by the theme and will apply the custom styles. If you want to add the CSS in a separate file, then put the CSS into a SCSS file in `assets/styles` directory of your repo and include it in the `assets/styles/override.scss` file as following:

```scss
@import "your-style-file-name";
```

### Step 3: Add JavaScript

If your modified layout file requires additional JavaScript, the recommended way is to add the JavaScript in the layout file itself with `<script>` tag. If you want to add the JavaScript in a separate file, then put the JavaScript file in `assets/scripts` directory of your repo and include it in the layout file as following:

```html
{{ $script := resources.Get "scripts/your-script.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
