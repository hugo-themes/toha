---
title: Configuring Achievements Section
date: '2020-06-08T06:20:30+06:00'
linkTitle: Achievements Section
weight: 160
aliases:
  - /posts/configuration/sections/achievements/
  - /docs/configuration/sections/achievements/
---

The `Achievements` section is designed to display your accomplishments in a visually appealing gallery format. This guide will walk you through the process of configuring the `Achievements` section on your website. For a complete reference, you can refer to the sample [achievements.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/achievements.yaml) file.

To begin, create a new file named `achievements.yaml` in the `data/en/sections` directory of your website. Then, follow the instructions below.

### Add Section Information

Add the following section metadata to your `achievements.yaml` file:

```yaml
# section information
section:
  name: Achievements
  id: achievements
  enable: true
  weight: 9
  showOnNavbar: true
  # Can optionally hide the title in sections
  # hideTitle: true
```

### Add Your Achievements

To add your achievements, open the `achievements.yaml` file and include the following entries under the `achievements` section:

```yaml
achievements:
- title: Best Presenter
  image: images/sections/achievements/presenter.jpg
  summary: Best presenter in the 2020 XYZ conference.
```

Each achievements entry should have the following fields,

- **title**: The title of the achievement.
- **image**: An image of the achievement.
- **summary**: A summary of the achievement.

>You can use markdown syntax in the `summary` field.

{{< vs 2 >}}

The following image shows how the contents of `achievements.yaml` are mapped into the `Achievements` section.

{{< img src="images/achievements.png" >}}
