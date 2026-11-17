---
title: Configuring Skills Section
date: '2020-06-08T06:20:45+06:00'
linkTitle: Skills Section
weight: 120
aliases:
  - /posts/configuration/sections/skills/
  - /docs/configuration/sections/skills/
---

The `Skills` section is designed to showcase your skills and provide insights into your expertise in each skill. In this post, we will guide you on how to configure the `Skills` section of your site. For a complete reference, please check out the sample [skills.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/skills.yaml) file.

To begin, create a `skills.yaml` file in the `data/en/sections` directory of your site. Then, follow the instructions below.

### Add Section Information

Add the following section metadata to your `skills.yaml` file:

```yaml
# section information
section:
  name: Skills
  id: skills
  enable: true
  weight: 2
  showOnNavbar: true
  # Can optionally hide the title in sections
  # hideTitle: true
```

### Add Your Skills

To add a `skill` add it's information under `skills` section in your `skills.yaml` file as bellow:

```yaml
# Your Skills.
# Give a summary of you each skill in the summary section.
skills:
- name: Kubernetes
  logo: /images/sections/skills/kubernetes.png
  summary: "Capable of deploying, managing application on Kubernetes. Experienced in writing Kubernetes controllers for CRDs."
  url: "https://kubernetes.io/"
```

Here, you have to provide the `name`, `log`, and `summary` fields for a skill. The `summary` field should provide an idea about your depth of knowledge of this particular skill.

>You can use markdown syntax in the `summary` field.

{{< vs 2 >}}

The following image shows how the content of `skills.yaml` files are mapped into the `Skills` section.

{{< img src="images/skills.png">}}
