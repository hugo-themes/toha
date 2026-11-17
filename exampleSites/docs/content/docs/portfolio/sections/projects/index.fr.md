---
title: Configuration de la section Projets
date: '2020-06-08T06:20:35+06:00'
linkTitle: Section des projets
weight: 140
aliases:
  - /posts/configuration/sections/projects/
  - /docs/configuration/sections/projects/
---

L'objet de la section `Projets` est de présenter efficacement vos projets. Dans ce billet, nous vous guiderons sur la façon de configurer la section `Projets` de votre site. Pour une référence complète, consultez s'il vous plaît l'extrait du fichier [projects.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/projects.yaml).

Pour commencer, créez un nouveau fichier nommé `projects.yaml` dans le répertoire `data/fr/sections` de votre site. Ensuite, suivez les instructions ci-dessous:

### Ajouter les informations de section

Ajoutez les métadonnées de la section suivante dans votre fichier `projects.yaml`:

```yaml
# section information
section:
  name: Projects # Titre de la section (par défaut: "" )
  id: projects # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true
  weight: 5
  showOnNavbar: true
  # Peut optionnellement masquer les titres de la section
  # hideTitle: true
```

### Ajouter des boutons de filtrage projet

Maintenant, ajoutez une section `buttons` dans votre fichier `projects.yaml` comme ci-dessous:

```yaml
buttons:
- name: All
  filter: "all"
- name: Professional
  filter: "professional"
- name: Academic
  filter: "academic"
- name: Hobby
  filter: "hobby"
```
Chaque bouton a deux propriétés. La première propriété est `name` qui est le texte qui sera affiché sur le bouton et l'autre est `filter` qui spécifie la catégorie des projets que ce bouton doit sélectionner.

Un bouton n'affichera que les projets qui ont un tag correspondant au texte spécifié dans le `filter` choisi. La valeur du filtre `all` est traitée spécifiquement. Il correspond à tous les projets même s'ils n'ont pas `all` en tant que tag dans leur champs `tags`.

### Ajouter vos projets

Maintenant, ajoutez vos projects sous la section `projects` dans votre fichier `projects.yaml` comme ci-dessous:

```yaml
projects:
- name: Kubernetes
  logo: images/projects/kubernetes.png
  role: Contributor
  timeline: "March 2018 - Present"
  repo: https://github.com/kubernetes/kubernetes
  # url: ""
  summary: Production-Grade Container Scheduling and Management .
  tags: ["professional", "kubernetes", "cloud"]
```

Vous pouvez spécifier les champs suivants pour votre projet:

- **name**: Le nom du projet.
- **logo**: Le log du projet. Si le projet n'a pas de logo, le thème y ajoutera automatiquement un espace réservé.
- **role**: Votre rôle sur ce projet.
- **timeline**: La chronologie quand vous avez travaillé sur ce projet.
- **repo**: Si ce projet est projet Open-Source et hébergé sur Github, vous pouvez fournir l'URL du dépôt.Il Ca sera utilisé pour montrer le nombre d'étoiles pour ce projet.
- **url**: Si le projet n'est pas open-source ou n'est pas hébergé sur Github, vous pouvez fournir une URL de votre projet. Cela créera un bouton avec le lien dans la carte du projet.
- **summary**: Une courte description du projet.
- **tags**: Une liste de tags pour votre projet. Ca sera utilisé pour sélectionner les projets sous une catégorie avec le bouton de filtrage.

>Vous pouvez utiliser la syntaxe markdown dans le champs `summary`.

{{< vs 2 >}}

L'image suivante montre comment les contenus de `projects.yaml` sont cartographiés dans la section `projects.yaml`.

{{< img src="images/projects.png" >}}
