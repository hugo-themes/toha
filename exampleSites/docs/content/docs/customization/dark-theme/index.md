---
title: Enable Dark Theme
date: '2022-06-12T01:30:50+06:00'
author:
  name: Emruz Hossain
  image: images/author/emruz.jpg
linkTitle: Enable Dark Theme
weight: 405
aliases:
  - /posts/customizing/dark-theme/
  - /docs/customizing/dark-theme/
---

To enable the dark mode in Toha `v4.0.0`, simply set the `darkMode.enable` field to `true` under the `params.features` section in your `hugo.yaml` file. For example:

```yaml
params:
  features:
    darkMode:
      enable: true
```

Congratulations! You are all set. You can now enjoy the dark mode in your site. The dark mode will obey user's system preference.
