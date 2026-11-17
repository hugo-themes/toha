---
title: Configuration de la section Réalisations
date: '2020-06-08T06:20:30+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section des réalisations
weight: 160
aliases:
  - /posts/configuration/sections/achievements/
  - /docs/configuration/sections/achievements/
---

La section `Réalisations` a été conçue pour afficher vos réalisations dans le format d'une galerie attrayante. Ce guide vous accompagnera à travers le processus de configuration de la section `Réalisations` sur votre site. Pour une référence complète, consultez s'il vous plaît l'extrait du fichier [achievements.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/achievements.yaml).

Pour commencer, créez un nouveau fichier nommé `achievements.yaml` dans le répertoire `data/fr/sections` de votre site web. Ensuite, suivez les instructions ci-dessous:

### Ajouter les informations de section

Ajoutez les métadonnées de la section suivante dans votre fichier `achievements.yaml`:

```yaml
# section information
section:
  name: Réalisations # Titre de votre section (default: "")
  id: achievements # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true # Booléen pour déterminer si la section est activée (par défaut: false)
  weight: 9 # Ordre d'affichage de la section (par defaut: alphabetique suivi par poids)
  showOnNavbar: true # Booléen pour déterminer si le lien doit être affiché pour cette section dans la barre de navigation
  # Peut optionnellement masquer les titres de la section
  # hideTitle: true
```

### Ajouter les réalisations

Pour ajouter vos réalisations, ouvrez le fichier `achievements.yaml` et incluez les entrées suivantes sous la section `achievements`:

```yaml
achievements:
- title: Meilleur présentateur
  image: images/sections/achievements/presenter.jpg
  summary: Meilleur présentation de l'année 2020 à la conférence XYZ.
```

Chaque entrée d'une réalisation doit avoir les champs suivants:

- **title**: Le titre de la réalisation.
- **image**: Une image de la réalisation.
- **summary**: Un résumé de la réalisation.

>Vous pouvez utilisez la syntaxe markdown dans le champs `summary`.

{{< vs 2 >}}

L'image suivante montre comment les contenus du fichier `achievements.yaml` sont cartographiés dans la section `Réalisations`.

{{< img src="images/achievements.png" >}}
