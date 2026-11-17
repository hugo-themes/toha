---
title: Configuration Section Compétences
date: '2020-06-08T06:20:45+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section des compétences
weight: 120
aliases:
  - /posts/configuration/sections/skills/
  - /docs/configuration/sections/skills/
---

La section `Compétences` est conçue pour mettre en valeur vos compétences et fournir des informations sur votre expertise pour chaque compétence. Dans ce billet, nous vous guiderons sur la façon de configurer la section `compétences` de votre site. Pour une référence complète, consultez s'il vous plaît cet échantillon du fichier [skills.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/skills.yaml).

Pour commencer, créez un fichier `skills.yaml` dans le répertoire `data/fr/sections` de votre site. Ensuite, suivez les instructions ci-dessous:

### Ajouter les informations de section

Ajoutez les métadonnées de la section à votre fichier `skills.yaml`:

```yaml
# section information
section:
  name: Compétences # Titre de votre section
  id: skills # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true # Booléen pour déterminer si la section est activée (par défaut: false)
  weight: 2 # Ordre d'affichage de la section (par defaut: alphabetique suivi par poids)
  showOnNavbar: true
  # Peut optionnellement masquer les titres de la section
  # hideTitle: true
```

### Ajouter vos compétences

Ajoutez une `compétence` et ses informations sous la section `skills` dans votre fichier `skills.yaml` comme ci-dessous:

```yaml
# Vos compétences.
# Donnez un résumé pour chaque compétence dans la section summary.
skills:
- name: Kubernetes
  logo: /images/sections/skills/kubernetes.png
  summary: "Capable of deploying, managing application on Kubernetes. Experienced in writing Kubernetes controllers for CRDs."
  url: "https://kubernetes.io/"
```

Ici, vous renseignez les champs `name`, `logo`, et `summary` pour une compétence. Le champs `summary` doit fournir une idée du niveau de connaissance sur une compétence particulière.

>Vous pouvez utiliser la syntaxe markdown dans le champs `summary`.

{{< vs 2 >}}

L'image suivante montre comment le contenu du fichier `skills.yaml` est cartographié dans la section `Compétences`.

{{< img src="images/skills.png">}}
