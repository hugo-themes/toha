---
title: Sections et navigation
weight: 20
---

Utilisez les sections Hugo comme hiérarchie. Un dossier avec `_index.md` est un bundle de branche et peut contenir des pages et sous-sections. `index.md` crée un bundle feuille : placez-y un article et ses images, sans pages enfants.

```text
content/docs/
  _index.md
  portfolio/
    _index.md
    sections/
      _index.md
      about/
        index.md
        images/about.png
  blog/
    _index.md
  documentation/
    _index.md
  shortcodes/
    _index.md
  customization/
    _index.md
```

Définissez `title`, éventuellement `linkTitle`, et `weight` dans chaque section. La racine transmet `type: docs` avec `cascade`. Activez `params.features.docs.sidebar.groupSections: true` pour afficher les sections principales comme titres. Cette option est désactivée par défaut ; les sous-sections restent dépliables.

Le fil d’Ariane, la recherche et les liens précédent/suivant suivent la même arborescence. Utilisez `relref` avec les chemins logiques. Ajoutez des `aliases` après un déplacement ; Hugo ajoute le préfixe de langue. Les sections de contenu diffèrent des sections du portfolio définies dans les données.

[Hugo](https://gohugo.io/content-management/organization/#sections)
