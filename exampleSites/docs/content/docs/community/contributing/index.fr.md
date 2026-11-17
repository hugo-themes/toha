---
title: Comment contribuer ?
date: '2024-01-19T02:30:00+06:00'
description: Un guide sur comment contribuer à Toha
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Contribution
weight: 900
aliases:
  - /posts/contributing/
  - /docs/contributing/
---

Les contributions au thème, aux exemples et à cette documentation se font dans [hugo-themes/toha](https://github.com/hugo-themes/toha). Lancez `mise install`, puis `mise run portfolio`, `mise run docs` ou `mise run blog`. Vérifiez avec `mise run check`. Tous les exemples utilisent le même thème local. Les sources de ce guide sont dans `exampleSites/docs/content/docs/` ; utilisez le lien de modification ci-dessous. La procédure historique pour les sites autonomes est conservée plus bas.

## Les manières de contribuer

Vous pouvez contribuer à ce thème de différentes manières.

### Code

Les Pull Requests sont les bienvenues et je serai heureux de les examiner. Suivez simplement les principes suivants:

- Gardez les simple.
- Gardez les cohérentes avec le design de l'UI.
- Utilisez le moins de dépendances possibles.
- Soyez patient.

### Tests et rapport des problèmes

- Vous pouvez signaler un [bug](https://github.com/hugo-toha/toha/issues/new?template=bug.md)
- Vous pouvez aussi faire une [demande de fonctionnalité](https://github.com/hugo-toha/toha/issues/new?template=feature_request.md)
- [Partager vos réflexions](https://github.com/hugo-toha/toha/issues/new?template=question.md)

### Documentation

Vous pouvez aussi contribuer à la documentation du thème par :

- L'ajout d'informations et de sections.
- Des corrections d'erreurs et de frappes.
- Des mises à jour de la documentation obsolète.
- La traduction de la documentation dans une nouvelle langue, ce [guide](/fr/posts/translation/content/) pourrait être utile.

### Traduction

Enfin, vous pouvez contribuer à la traduction du thème dans plusieurs langues, en complétant les mots manquants, ou par l'ajout d'une nouvelle langue. Vous pouvez suivre le guide [Comment ajouter un langage non supporté ?](/fr/posts/translation/new-language/) pour plus d'informations.

## Comment contribuer ?

Pour le développement local, vous pouvez apporter des changements dans le sous-module du thème et tester les changements sur votre propre site ou ce [site d'exemple](https://github.com/hugo-themes/toha-example-site) local.

### Cloner

D'abord, clonez [ce dépôt](https://github.com/hugo-toha/toha). Ensuite, suivre les étapes suivantes pour utiliser le thème cloné pour un développement local.

#### Lancer le thème cloné par rapport au site d'exemple

Si vous voulez vous lancer dans votre développement local par rapport au [site d'exemple](https://github.com/hugo-themes/toha-example-site), suivre les étapes suivantes:

```bash
# Se rendre dans le répertoire exampleSite
$ cd exampleSite
# installer les modules hugo
$ hugo mod tidy
# installer les dépendances
$ hugo mod npm pack
$ npm install
# Lancer le site exemple localement
$ hugo server -w
```

Maintenant, vous pouvez faire des changements dans le thème et ils seront immédiatement restitués sur le site en cours d'exécution. Si vous avez besoin de changer n'importe quelle configuration, vous pouvez faire cela dans le fichier `hugo.yaml` à l'intérieur du répertoire `exampleSite`. Si vous avez besoin d'ajouter n'importe quel contenu ou donnée, vous pouvez créer le dossier correspondant à l'intérieur du répertoire `exampleSite` et ajouter votre contenu ou donnée désirés.

#### Lancer le thème cloné par rapport à votre propre site

Si vous voulez exécuter votre développement local par rapport à votre propore site, suivez les étapes suivantes:

**Remplacer le module du thème:**

Ouvrez le fichier `go.mod` de votre site et remplacez le chemin `github.com/hugo-toha/toha/v4` par le chemin de votre dépôt cloné. Par exemple, si votre dépôt cloné est `github.com/<your-github-user>/toha`, alors remplacez le chemin `github.com/hugo-toha/toha/v4` par `github.com/<your-github-user>/toha/v4`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => github.com/<your-github-user>/toha/v4 <git branch>
)
```

Pour un développement intéractif, vous pouvez remplacer le thème par votre dépôt cloné. Par exemple, si vous avez cloné votre dépôt dans `/home/my-projects/toha`, alors remplacez le `github.com/hugo-toha/toha/v4` par `/home/my-projects/toha`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => /home/my-projects/toha
)
```

**Mise à jour des dépendances:**

```bash
# Mettre à jour les modules hugo
$ hugo mod tidy
# Installer les dépendances
$ hugo mod npm pack
$ npm install
```

**Lancez votre site en local:**

```bash
$ hugo server -w
```

A partir d'ici vous pouvez faire des changements au code source du thème tout en testant votre site Hugo en cours d'exécution ou le site d'exemple.

### Ouvrir une Pull Request

Lorsque les changements semblent corrects, validez et poussez-les vers votre dépôt cloné.

```bash
# Indexez tous les changements
$ git add .
# Validez vos changements avec un message complet sur ce que ça apporte
$ git commit -m "A meaningful commit message"
# Poussez le commit de votre branche
$ git push my-fork my-feature-branch
```

Ensuite, ouvrez une PR vers la branche `main` d'[hugo-toha/toha](https://github.com/hugo-toha/toha) depuis la branche `ma_branche_de_fonctionnalité` de votre dépôt cloné.
