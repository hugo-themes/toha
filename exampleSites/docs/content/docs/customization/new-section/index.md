---
title: Adding a new section
date: '2024-01-13T22:30:50+06:00'
author:
  name: Emruz Hossain
  image: images/author/emruz.jpg
linkTitle: Adding New Section
weight: 415
aliases:
  - /posts/customizing/new-section/
  - /docs/customizing/new-section/
---

If the default sections, templates, and components do not meet your needs, you can easily add new sections, templates, and components to your site. This guide will demonstrate how to add a new section to your site.

### Step 1 : Add Layout File

To add a new section to your site, you need to create a layout file in the `layouts/partials/sections` directory. The file should be named after the section's name. For example, if you want to add a `contact` section with a contact form, create a file named `contact.html`. Use the following template for the `contact.html` file:

```html
{{ $sectionID := replace (lower .section.name) " " "-"  }}
{{ if .section.id }}
  {{ $sectionID = .section.id }}
{{ end }}

<div class="container anchor p-lg-5 about-section" id="{{ $sectionID }}">
  // Your custom HTML code here
</div>
```

### Step 2: Add CSS Styles

If you want to add custom CSS for your new section, you can do so by adding the CSS code to the `assets/styles/override.scss` file in your site. This file is automatically loaded by the theme and will apply the custom styles. Alternatively, you can create a separate SCSS file in the `assets/styles` directory of your repository and include it in the `assets/styles/override.scss` file using the following syntax:

```scss
@import "your-style-file-name";
```

### Step 3: Add JavaScript

Similarly, if your new section requires additional JavaScript, the recommended way is to add the JavaScript in the layout file itself with `<script>` tag. If you want to add the JavaScript in a separate file, then put the JavaScript file in `assets/scripts` directory of your repo and include it in the layout file as following:

```html
{{ $script := resources.Get "scripts/your-script.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
