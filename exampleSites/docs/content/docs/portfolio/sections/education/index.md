---
title: Configuring Education Section
date: '2020-06-08T06:20:40+06:00'
linkTitle: Education Section
weight: 135
aliases:
  - /posts/configuration/sections/education/
  - /docs/configuration/sections/education/
---

The `Education` section is designed to showcase your academic background. In this post, we will guide you on how to configure the `Education` section of your site. For a complete reference, you can refer to the sample [education.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/education.yaml) file.

To begin, create a new file named `education.yaml` in the `data/en/sections` directory of your site. Then, follow the instructions below.

### Add Section Information

Add the following section metadata to your `education.yaml` file:

```yaml
# section information
section:
  name: Education
  id: education
  template: sections/education.html # Use "sections/education-alt.html for alternate template.
  enable: true
  weight: 4
  showOnNavbar: true
  # Can optionally hide the title in sections
  # hideTitle: true
```

### Add Your Academic Degrees

To add an education, include the respective information under `degrees` section in the `education.yaml` file as below:

```yaml
degrees:
- name: Ph.D in Quantum Cryptography
  icon: fa-microscope
  timeframe: 2016-2020
  institution:
    name: ABC University of Technology
    url: "#"
    logo: /images/education/college.png # Path of the logo image
    darkLogo: /images/education/college-dark.png #(optional), Can optionally show a different logo for dark theme
  grade: #(optional)
    scale: CGPA
    achieved: 3.6
    outOf: 4
  publications: #(optional)
  - title: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    url: "#"
  - title: Fusce eu augue ut odio porttitor pulvinar.
    url: "#"
  - title: Nullam vitae orci tincidunt purus viverra pulvinar.
    url: "#"
  extracurricularActivities: #(optional), supports markdown
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  - Fusce eu augue ut odio porttitor pulvinar.
  custonSections: #(optional)
    - name: Thesis
      content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - name: Supervisor
      content: Fusce eu augue ut odio porttitor pulvinar.
```

Make sure the icon you are using is available in [Font Awesome](https://fontawesome.com/icons?d=gallery&m=free).
