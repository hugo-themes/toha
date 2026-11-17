---
title: Commentaires
date: '2022-03-14T06:00:23+06:00'
description: Ajouter des commandes dans le thème Toha
linkTitle: Commentaires
weight: 650
aliases:
  - /posts/comments/
  - /docs/comments/
---

## Commentaires

Ce thème supporte les commentaires dans les billets. Actuellement, il supporte les plugins de commentaires suivants:

- [Disqus](https://disqus.com/)
- [Valine](https://valine.js.org/)
- [Utterances](https://utteranc.es/)
- [Giscus](https://giscus.app/)

### Disqus

Disqus est un plugin de commentaires très populaire. Après vous êtes inscrit sur [Disqus](https://disqus.com/) vous aurez besoin de fournir votre pseudonyme sous la section `params.features.comment` de votre fichier `hugo.yaml` comme ci-après:

```yaml
params:
  features:
    comment:
      enable: true
      disqus:
        shortName: <your-disqus-shortname>
```

### Valine

[Valine](https://valine.js.org/) semble être un plugin de commentaires chinois. Vous pouvez activer le plugin de commentaires `valine` en ajoutant une section `valine` sous `params.features.comments` de votre fichier `hugo.yaml` comme ci-après:

```yaml
params:
  features:
    comment:
      enable: true
      valine:
        appId: app-id
        appKey: app-key
        avatar: avatar
        placeholder: placeholder
        lang: lang
        recordIP: recordIP
        enableQQ: enableQQ
```

### Utterances

Utterances utilise [GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues) pour stocker les commentaires de vos billets. Cela nécessite que vous ayez un dépôt publique, et l'applications Utterances utilise votre dépôt. Les instructions de configuration peuvent être trouvées sur la [page d'accueil d'Utterances](https://utteranc.es/)

```yaml
params:
  features:
    comment:
      enable: true
      utteranc:
        repo: your-repo/name
        issueTerm: url
        theme: light
```

### Giscus

Giscus est basé sur Utterances, mais utilise [GitHub Discussions](https://docs.github.com/en/discussions) comme backend. Cela nécessite que vous ayez un dépôt public, et que l'application Giscus utilise votre dépôt. Les instructions de configuration peuvent être trouvées sur la [page d'accueil de Giscus](https://giscus.app/).

Pour activer le plugin de commentaires de Giscus, allez d'abord sur [giscus.app](https://giscus.app/). Dans la section `configuration`, fournissez les informations nécessaires. Il vous donnera un script à inclure dans votre site. Vous avez juste besoin d'extraire les informations respectives du script et de les fournir sous la section `params.features.comment.giscus` ci-après:

```yaml
params:
  features:
    comment:
      enable: true
      giscus:
        repo: your-repo/name
        repoID: your-repo-id
        category: your-category
        categoryID: your-category-id
        # theme: light
        # map: url
        # reaction: 1
        # metadata: 0
        # inputPosition: bottom
        # crossOrigin: anonymous
```

Les options commentées sont facultatives. Vous pouvez les utiliser pour personnaliser davantage l'expérience des commentaires.
