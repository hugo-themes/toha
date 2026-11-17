---
title: Configuring Recent Posts Section
date: '2020-06-08T06:20:34+06:00'
linkTitle: Recent Posts Section
weight: 150
aliases:
  - /posts/configuration/sections/recent-posts/
  - /docs/configuration/sections/recent-posts/
---

The `Recent Posts` section is used to showcase the latest posts from your content. To enable this section, create a `recent-posts.yaml` file in the `data/en/sections` directory and include the following content:

```yaml
# section information
section:
  name: Recent Posts # Title of section (default: "")
  id: recent-posts # url id/slug of section *Required*
  enable: true # Boolean to determine if this section is enabled (default: false)
  weight: 6 # Order to display section in (default: alphabetical followed by weight)
  showOnNavbar: true # Boolean to determine if a link should be shown for this section on the navbar
  hideTitle: true # Can optionally hide the title in sections (default: false)
  numShow: 4 # Can optionally increase the number of posts to display (default: 3)
  showMoreButton: false #Can optionally show 'More Posts' button (default: false)
```
