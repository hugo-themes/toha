---
title: Démarrage rapide
date: '2022-08-09T00:00:00+06:00'
description: Guide de démarrage rapide pour le thème Toha
linkTitle: Démarrage rapide
weight: 2
aliases:
  - /posts/quickstart/
  - /docs/quickstart/
---

## Exécuter les exemples

Installez [mise](https://mise.jdx.dev/getting-started.html), puis clonez le dépôt du thème :

```sh
git clone https://github.com/hugo-themes/toha.git
cd toha
mise install
mise run portfolio
```

Ouvrez <http://localhost:1313/>. Le dépôt fixe les versions de Hugo Extended et Dart Sass ; mise installe aussi Go et Node. Chaque commande de serveur installe automatiquement ses dépendances.

Arrêtez le serveur avant de choisir un autre exemple, ou utilisez un autre port :

```sh
mise run docs
mise run blog -- --port 1314
```

## Personnaliser le site

La configuration, le contenu, les images et les données traduites du portfolio se trouvent dans [exampleSites/portfolio](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio). Modifiez `hugo.yaml` et `data/en/`, ou créez les données de votre langue. Consultez les [paramètres du site]({{< relref "/docs/portfolio/site-parameters" >}}) et la [section de présentation]({{< relref "/docs/portfolio/sections/about" >}}).

Ces exemples utilisent le thème local grâce à un remplacement de module Go. Ce sont des sites de développement, pas des exports autonomes. Pour un site autonome existant, conservez son identité de module et lancez `hugo mod get github.com/hugo-toha/toha/v4@latest`, puis `hugo mod npm pack` et `npm install`. Installez Dart Sass pour les styles historiques. Les nouveaux layouts nécessitent une version publiée qui les contient ; une ancienne version ne remplace pas le thème local.

## Vérifier une contribution

```sh
mise run check
```

Cette commande vérifie les trois exemples, le lint et les tests. Consultez le guide de [contribution]({{< relref "/docs/community/contributing" >}}).
