---
title: Personnalisation CSS
date: '2024-01-13T22:00:50+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Personnaliser les CSS
weight: 407
aliases:
  - /posts/customizing/customize-css/
  - /docs/customizing/customize-css/
---

Ce guide décrit les styles historiques du portfolio et des articles. La documentation moderne et la page d’accueil du blog utilisent les tokens de `assets/styles/modern/main.css` ; consultez le [guide de composition en anglais]({{< relref path="/docs/customization/composition" lang="en" >}}).

Ce thème vous permet de personnaliser l'apparence de votre site et ses composants par une surcharge du CSS par defaut. Ce guide vous montrera comment surcharger le schéma de couleurs et personnaliser les CSS des composants individuels.

Le thème utilise [Sass](https://sass-lang.com/) pour générer du CSS. Si vous n'êtes pas familier avec Sass, vous pouvez en apprendre plus à son sujet [ici](https://sass-lang.com/guide).

## Surcharger les variables des couleurs du thème

Si vous voulez changer le schéma de couleurs par défaut de votre thème, vous pouvez surcharger les variables de couleur du thème. Pour surcharger les variables de couleur du thème, vous devrez créer un fichier nommé `variables.scss` dans le répertoire `assets/styles` de votre site. Puis copiez le contenu du fichier [variables.scss](https://github.com/hugo-toha/toha/blob/main/assets/styles/variables.scss) par défaut et collez le dans votre fichier de personnalisation `variables.scss`. Ici, seule la section `$theme` du fichier `variables.scss` par defaut est montré ci-dessous:

```scss
// themes
$themes: (
  'light': (
    // cyan 600
    'accent-color': #0891b2,
    // cyan 500
    'hover-over-accent-color': #06b6d4,
    // zinc 200
    'text-over-accent-color': #e4e4e7,
    // slate 50
    'bg-primary': #f8fafc,
    // slate 900
    'bg-primary-inverse': #0f172a,
    // slate 200
    'bg-secondary': #e2e8f0,
    'bg-card': #fff,
    // slate 800
    'heading-color': #1e293b,
    // slate 700
    'text-color': #334155,
    // slate 300
    'inverse-text-color': #cbd5e1,
    // slate 500
    'muted-text-color': #64748b,
    // red 600
    'inline-code-color': #dc2626,
    // amber 200
    'highlight-color': #fde68a,
    // slate 900
    'footer-color': #0f172a,
  ),
  'dark': (
    // cyan 600
    'accent-color': #0891b2,
    // cyan 500
    'hover-over-accent-color': #06b6d4,
    // zinc 200
    'text-over-accent-color': #e4e4e7,
    // gray-800
    'bg-primary': #1f2937,
    // slate 900
    'bg-primary-inverse': #0f172a,
    // gray 900
    'bg-secondary': #111827,
    // slate 800
    'bg-card': #1e293b,
    // slate 100
    'heading-color': #f1f5f9,
    // slate 300
    'text-color': #cbd5e1,
    // slate 900
    'inverse-text-color': #0f172a,
    // slate 500
    'muted-text-color': #64748b,
    // red 600
    'inline-code-color': #dc2626,
    // amber 200
    'highlight-color': #fde68a,
    // slate 900
    'footer-color': #0f172a,
  ),
);
```

Les champs `light` et `dark` dans la cartopgraphie de couleur représentent respectivement les schémas de couleur pour le mode lumière et le mode sombre. En modifiant les codes couleurs dans ces champs, vous pouvez personnaliser l'apparence de votre site.

## Surcharger un composant CSS

Pour surcharger le CSS d'un composant, créez un fichier `override.scss` dans le répertoire `assets/styles` de votre site. Puis, placez le nouveau CSS pour ce composant ici. Vous n'avez pas besoin de réécrire l'ensemble du CSS du composant. Vous pouvez juste mettre les champs modifiés.

Par exemple, pour désactiver l'effet flou de l'image d'arrière plan sur la page d'accueil, vous pouvez ajouter le code SCSS suivant dans votre fichier `override.scss`:

```scss
.home{
  .background{
    filter: none;
  }
}
```
