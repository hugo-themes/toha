---
title: Configuring Experiences Section
date: '2020-06-08T06:20:40+06:00'
linkTitle: Experiences Section
weight: 130
aliases:
  - /posts/configuration/sections/experiences/
  - /docs/configuration/sections/experiences/
---

The `Experiences` section is designed to showcase your career background and highlight the responsibilities you have handled throughout your professional journey. In this post, we will guide you on how to configure the `Experiences` section of your site. For a complete reference, you can refer to the sample [experiences.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/experiences.yaml) file.

To begin, create a new file named `experiences.yaml` in the `data/en/sections` directory of your site. Then, follow the instructions below.

### Add Section Information

Add the following section metadata to your `experiences.yaml` file:

```yaml
section:
  name: Experiences # Titre de la section (par défaut: "" )
  id: experiences # url id/slug of section *Required*
  enable: true
  weight: 3
  showOnNavbar: true
  # Can optionally hide the title in sections
  # hideTitle: true
```

### Add Your Experiences

To add an experience, include the respective information under `experiences` section in the `experiences.yaml` file as below:

```yaml
# Your experiences
experiences:
- company:
    name: Example Co.
    url: "https://www.example.com"
    location: Dhaka Branch
    logo: /images/experiences/company.png
    darkLogo: /images/experiences/company-dark.png #(optional), Can optionally show a different logo for dark theme
    # company overview
    overview: Example Co. is a widely recognized company for cloud-native development. It builds tools for Kubernetes.
  positions:
  - designation: Senior Software Engineer
    start: Nov 2019
    # don't provide end date if you are currently working there. It will be replaced by "Present"
    # end: Dec 2020
    # give some points about what was your responsibilities at the company.
    responsibilities:
    - Design and develop XYZ tool for ABC task
    - Design, develop and manage disaster recovery tool [Xtool](https://www.example.com) that backup Kubernetes volumes, databases, and cluster's resource definition.
    - Lead backend team.

  - designation: Junior Software Engineer
    start: Nov 2017
    end: Oct 2019
    responsibilities:
    - Implement and test xyz feature for abc tool.
    - Support client for abc tool.
    - Learn k,d,w technology for xyz.
```

Each entry in the `experiences` section should have the following information:

- **company**: Some information about your company. You should provide `name`, `url`, `location`, `logo`, and a brief `overview` of the company.
- **positions**: A list of positions you have held in the company. You can provide multiple positions if you have changed your position in the company.
- **designation**: Represents the role that you were playing at the position.
- **start**: Time when you had joined at the position.
- **end**: Time when you have left the position. If you are currently working at the position, don't provide this field.
- **responsibilities**: A list of responsibilities you handled at that position. This section is very important as it will give the viewer an idea about the professional responsibilities you are capable to deal with.

> You can use markdown syntax in `overview` field of `company` section and `responsibilities` field.

<!-- {{< vs 2 >}}

The following image shows how the contents of `experiences.yaml` are mapped into the `Experiences` section.

{{< img src="images/experiences.png" >}} -->
