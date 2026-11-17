---
title: Page d’accueil du blog
weight: 10
---

Lancez `mise run blog` pour afficher l’exemple. Partez de [exampleSites/blog/hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/blog/hugo.yaml), y compris la configuration Tailwind. Choisissez la page d’accueil indépendamment de la section de contenu :

```yaml
params:
  home:
    layout: blog
    blog:
      hero:
        enable: true
        image: images/default-background.jpg
      topics:
        enable: true
        taxonomy: categories
        limit: 5
        postsPerTopic: 4
  features:
    blog:
      enable: true
      section: posts
      search:
        enable: true
    pagination:
      maxPostsPerPage: 4
```

Créez `content/posts/_index.md` et ajoutez les articles dans ce dossier. Le bandeau et les thèmes peuvent être désactivés séparément. La recherche est facultative et limitée à l’arborescence et à la langue du blog. Les articles et archives gardent leur mise en page historique.
