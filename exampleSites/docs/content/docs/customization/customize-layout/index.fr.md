---
title: Personnalisation de la disposition
date: '2024-10-09T18:46:23+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Personnalisation disposition
weight: 410
aliases:
  - /posts/customizing/customize-layout/
  - /docs/customizing/customize-layout/
---

{{< alert type="warning" >}}
Si vous personnalisez la mise en page d'un composant existant, vous ne recevrez plus les futures mises à jour de ce composant lorsque le thème sera mis à jour. Vous devrez mettre à jour manuellement le composant dans votre dépôt.
{{< /alert >}}

Dans ce tutoriel, je vais vous guider sur la manière de personnaliser la mise en page d'un thème. J'ai personnellement suivi le processus et je partagerai mes expériences afin de vous faciliter la tâche.

### Etape 1 : Changer le fichier de mise en page

Pour personnaliser la mise en page d'une section, d'une page ou d'un composant existant, vous devez localiser le fichier correspondant dans le répertoire de mise en page du thème. Une fois que vous avez trouvé le fichier, copiez-le et placez-le dans la même structure de répertoire au sein du répertoire layouts de votre site.

Par exemple, pour personnaliser la mise en page de la section `À propos`, suivez ces étapes :

1. Copiez le fichier `about.html` du répertoire `layouts/partials/sections` du thème.
2. Collez le fichier copié dans le répertoire `layouts/partials/sections` de votre dépôt.
3. Modifiez le fichier `about.html` copié pour effectuer les changements souhaités dans la mise en page de la section "À propos".

### Etape 2 : Ajouter des styles CSS

Si vous devez ajouter du CSS supplémentaire à votre fichier de mise en page modifié, vous pouvez le faire en ajoutant le code CSS dans le fichier `assets/styles/override.scss` de votre site. Ce fichier est automatiquement chargé par le thème et appliquera les styles personnalisés. Si vous souhaitez ajouter le CSS dans un fichier séparé, placez le CSS dans un fichier SCSS dans le répertoire `assets/styles` de votre dépôt et incluez-le dans le fichier `assets/styles/override.scss` comme suit:

```scss
@import "your-style-file-name";
```

### Etape 3 : Ajouter JavaScript

Si votre fichier de mise en page modifié nécessite du JavaScript supplémentaire, la méthode recommandée est d'ajouter le JavaScript directement dans le fichier de mise en page avec la balise `<script>`. Si vous souhaitez ajouter le JavaScript dans un fichier séparé, placez le fichier JavaScript dans le répertoire `assets/scripts` de votre dépôt et incluez-le dans le fichier de mise en page comme suit:

```html
{{ $script := resources.Get "scripts/your-script.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
