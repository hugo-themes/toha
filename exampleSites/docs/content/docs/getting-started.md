---
title: Quick start
description: Run the docs example and make your first change.
weight: 10
---

## Run the example

From the Toha repository root:

```sh
mise run docs
```

Open the local address printed by Hugo. Edit a page in `exampleSites/docs/content/` and Hugo will rebuild it.

## Enable the layout

Docs are opt-in. Select the homepage and enable the documentation area independently:

```yaml
params:
  home:
    layout: docs
  features:
    docs:
      enable: true
      section: docs
```

Use the complete build and module configuration in this example’s `hugo.yaml` when creating a new docs site. It includes the rendered-class statistics that Tailwind needs.

## Organize your content

Add a `content/docs/_index.md` with a cascade so its descendants use the docs layout:

```yaml
title: Documentation
cascade:
  type: docs
```

Set page `weight` values to control order. Use nested folders with `_index.md` files for navigation groups.

## Keep the portfolio homepage

Leave `params.home.layout` unset, or set it to `portfolio`. You can enable docs alongside a portfolio homepage. Only pages with `type: docs` load the modern assets.
