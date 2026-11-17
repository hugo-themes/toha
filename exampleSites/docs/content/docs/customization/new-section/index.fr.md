---
title: Ajouter une nouvelle section
date: '2024-01-13T22:30:50+06:00'
author:
  name: Nicolas DIETLIN
  image: images/author/nicolas.jpg
linkTitle: Ajouter une nouvelle section
weight: 415
aliases:
  - /posts/customizing/new-section/
  - /docs/customizing/new-section/
---

Si les sections par défaut, modèles, et composants ne satisfont pas vos besoins, vous pouvez facilemement ajouter de nouvelles sections, modèles, et composants à votre site. Ce guide montrera comment ajouter une nouvelle section à votre site.

### Etape 1 : Ajouter du fichier de mise en page

Pour ajouter une nouvelle section à votre site, vous devez créer un fichier de mise en page dans le répertoire `layout/partials/sections`. Le fichier doit être nommé d'après le nom de la section. Par exemple, si vous voulez ajouter une section `contact` avec le formulaire de contact, créez un fichier nommé `contact.html`. Utilisez le modèle suivants pour le fichier `contact.html`.

```html
{{ $sectionID := replace (lower .section.name) " " "-"  }}
{{ if .section.id }}
  {{ $sectionID = .section.id }}
{{ end }}

<div class="container anchor p-lg-5 about-section" id="{{ $sectionID }}">
  // Your custom HTML code here
</div>
```

### Etape 2: Ajouter des styles CSS

Si vous voulez ajouter un CSS personnalisé pour votre nouvelle section, vous pouvez le faire en ajouter le code CSS au fichier `assets/styles/overrides.scss` dans votre site. Ce fichier est automatiquement chargé par le thème et appliquera les styles personnalisés. Alternativement, vous pouvez créer un fichier SCSS séparé dans le répertoire `assets/styles` de votre dépôt et l'inclure dans le fichier `assets/styles/overrides.scss` en utilisant la syntaxe suivante:

```scss
@import "your-style-file-name";
```

### Etape 3: Ajouter JavaScript

De façon similaire, si votre nouvelle section requiert un JavaScript supplémentaire, la méthode recommandée est d'ajouter le JavaScript dans le fichier de mise en page lui-même avec le tag `<script>`. Si vous voulez ajouter le JavaScript dans un fichier séparé, alors placez le fichier JavaScript dans le répertoire `assets/scripts` de votre dépôt et l'inclure dans le fichier de mise en page comme suit:

```html
{{ $script := resources.Get "scripts/your-script.js" }}
<script src="{{ $script.RelPermalink }}" integrity="{{ $script.Data.Integrity }}"></script>
```
