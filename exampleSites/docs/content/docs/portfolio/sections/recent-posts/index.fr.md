---
title: Configuration Section Billets Récents
date: '2020-06-08T06:20:34+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section billets récents
weight: 150
aliases:
  - /posts/configuration/sections/recent-posts/
  - /docs/configuration/sections/recent-posts/
---

La section `Billets récents` est utilisée pour mettre en valeur les derniers billets de votre contenu. Pour activer cette section, créez une fichier `recent-posts.yaml` dans votre répertoire `data/fr/sections` et incluez le contenu suivant:

```yaml
# section information
section:
  name: Billets récents # Titre de la section (par défaut: "" )
  id: recent-posts # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true # Booléen pour déterminer si la section est activée (par défaut: false)
  weight: 6 # # Ordre d'affichage de la section (par defaut: alphabetique suivi par poids)
  showOnNavbar: # true Booléen pour déterminer si le lien doit être affiché pour cette section dans la barre de navigation
  hideTitle: true # Peut optionnellement masquer les titres de la section (defaut: false)
  numShow: 4 # Peut optionnellement augmenter le nombre de billets à afficher (defaut: 3)
  showMoreButton: false # Peu optionnellement afficher le bouton 'Plus de billets' (default: false)
```
