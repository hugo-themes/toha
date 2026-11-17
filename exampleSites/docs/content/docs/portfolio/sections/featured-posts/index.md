---
title: Configuring Featured Posts Section
date: '2024-02-06T06:20:34+06:00'
linkTitle: Featured Posts Section
weight: 150
aliases:
  - /posts/configuration/sections/featured-posts/
  - /docs/configuration/sections/featured-posts/
---

The `Fetured Posts` section is used to showcase any post you like. To enable this section, create a `featured-posts.yaml` file in the `data/en/sections` directory and include the following content:

```yaml
# section information
section:
  name: Featured Posts # Title of section (default: "")
  id: featured-posts # url id/slug of section *Required*
  enable: true # Boolean to determine if this section is enabled (default: false)
  weight: 6 # Order to display section in (default: alphabetical followed by weight)
  showOnNavbar: true # Boolean to determine if a link should be shown for this section on the navbar
  hideTitle: true # Can optionally hide the title in sections (default: false)

# posts to feature
posts:
  - quickstart
  - update-v3-to-v4
  - prepare-site
```
