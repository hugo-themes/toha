---
title: Configuration de la section Etudes
date: '2020-06-08T06:20:40+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section des études
weight: 135
aliases:
  - /posts/configuration/sections/education/
  - /docs/configuration/sections/education/
---

La section `Etude` a été conçue pour mettre en valeur votre parcours d'étude. Dans ce billet, nous vous guiderons sur la façon de configurer la section `Etude` de votre site. Pour une référence complète, consultez s'il vous plaît l'extrait du fichier [education.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/education.yaml).

Pour commencer, créez un nouveau fichier nommé `education.yaml` dans le répertoire `data/fr/sections` de votre site. Ensuite, suivez les instructions ci-dessous.

### Ajouter les informations de section

Ajoutez les métadonnées de la section suivante dans votre fichier `education.yaml`:

```yaml
# section information
section:
  name: Etude # Titre de votre section
  id: education # URL id/slug de section *valeur à conserver & obligatoire*
  template: sections/education.html # Utilisez "sections/education-alt.html comme modèle alternatif.
  enable: true
  weight: 4
  showOnNavbar: true
  # Peut optionnellement masquer les titres de la section
  # hideTitle: true
```

### Ajoutez vos degrés d'enseignement

Pour ajouter un cycle d'étude, inclure les informations correspondantes sous la section `degrees` dans le fichier `education.yaml` comme ci-dessous :

```yaml
degrees:
- name: Ph.D in Quantum Cryptography
  icon: fa-microscope
  timeframe: 2016-2020
  institution:
    name: ABC University of Technology
    url: "#"
    logo: /images/education/college.png
    darkLogo: /images/education/college-dark.png #(optionnel)
  grade: #(optionnel)
    scale: CGPA
    achieved: 3.6
    outOf: 4
  publications: #(optionnel)
  - title: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    url: "#"
  - title: Fusce eu augue ut odio porttitor pulvinar.
    url: "#"
  - title: Nullam vitae orci tincidunt purus viverra pulvinar.
    url: "#"
  extracurricularActivities: #(optionnel)
  - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  - Fusce eu augue ut odio porttitor pulvinar.
  custonSections: #(optionnel)
    - name: Thesis
      content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    - name: Supervisor
      content: Fusce eu augue ut odio porttitor pulvinar.
```

Assurez-vous que l'icône que vous utilisez soit disponible sur [Font Awesome](https://fontawesome.com/icons?d=gallery&m=free).
