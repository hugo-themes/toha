---
title: Migrer de la V3 à la V4
date: '2024-01-05T02:30:00+06:00'
description: Un guide de migration de la version 3 du thème vers la version 4.
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Migration V3 à V4
weight: 900
aliases:
  - /posts/update-v3-to-v4/
  - /docs/update-v3-to-v4/
---

Toha V4 a introduit de nombreux changements structurant en terme d'utilisation et de configuration du thème. Ce guide vous aidera à passer de la version v3 à la version v4 du thème. S'il vous plaît, veuillez vérifier cette [note de publication](https://github.com/hugo-toha/toha/releases/tag/v4.0.0) pour compléter le changelog.

Dans ce guide, je vais vous guider à travers les étapes pour migrer de la version 3 à la version 4 du thème Toha. Ce guide est basé sur le guide de migration écrit par [Alexandre Neto](https://github.com/SrNetoChan) dans [cette issue](https://github.com/hugo-toha/toha/issues/852). Commençons !

### 1. Supprimer le sous-module git `toha`

Toha V4 apporte quelques changements dans le processus d'installation. L'un des changements est que le thème n'utilise plus de sous-module git. Par conséquent, nous avons besoin de supprimer le sous-module git `toha`. Ne vous inquiétez pas, cette étape ne supprimera pas votre contenu.

```bash
git rm themes/toha/
git commit -m "Remove v3 theme"
```

### 2. Supprimer le `theme` du `hugo.yaml`

Dans cette nouvelle version, nous n'avons pas besoin de spécifier le `theme` dans le fichier `hugo.yaml`. A la place, nous ajouterons le thème comme un module. D'abord, supprimez la ligne suivante de votre fichier `hugo.yaml`:

```yaml
theme: toha
```

### 3. Compléter les prérequis

Pour la construction du site localement nous aurons besoin de mettre à jour/installer les prérequis suivants:

1. Version d'Hugo `v0.118.x` (extended) ou plus.
2. Langage [Go](https://go.dev/doc/install) version `v1.18.x` ou plus.
3. Node version `v18.x` et npm version `8.x` ou plus.

Assurez-vous d'avoir installé tous les outils nécessaires.

### 4. Initialiser le module Hugo

Toha V4 utilise maintenant le [Module Hugo](https://gohugo.io/hugo-modules/) pour gérer le thème.Pour commencer, nous devons initialiser le module.

```bash
hugo mod init github.com/<votre username>/<votre nom de dépôt>
```

Cela créera un fichier `go.mod` à la racine de votre site. Vous pouvez vérifier le fichier pour voir s'il a été correctement créé.

### 5. Ajouter le thème en tant que module

Maintenant, ajoutez la section `module` suivante dans votre fichier `hugo.yaml`. Cela ajoutera le thème comme un module et montera aussi les fichiers statiques à partir du thème.

```yaml
# Utilise les modules Hugo pour ajouter le thème
module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: static/files
    target: static/files
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts
```

### 6. Actualiser le fichier `hugo.yaml`

Dans la nouvelle version, la structure de configuration pour la gestion des fonctionnalités a été refondue. Donc, il est nécessaire d'actualiser le fichier `hugo.yaml` . Pour référence, vous pouvez vérifier l'extrait du [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). Ici, nous mettrons en évidence les configurations les plus couramment utilisées qui ont besoin d'être changé.

**Mode sombre:**

Nous avons introduit un nouveau support intégré du mode sombre. En conséquence, il n'est plus nécessaire d'utiliser un service tiers tel que `darkreader`. Pour activer le nouveau mode sombre, s'il vous plaît supprimez les lignes suivantes de votre `hugo.yaml`.

```yaml
 darkMode:
    provider: darkreader
    enable: true
    default: system
```

Ensuite, ajoutez les lignes suivantes sous la section `params.features`:

```yaml
darkMode:
  enable: true
```

**Analytics:**

Nous avons restructuré la configuration pour l'analytique, les commentaires, et les fournisseurs de service supportés. Ils sont maintenant placés sous le champs `services` dans la section respective.

Par conséquent, votre configuration analytique d'avant sera mise à jour de:

```yaml
analytics:
  enabled: true
  google:
    id: UA-XXXXXXXXX-X
```

à:

```yaml
analytics:
  enable: true
  services:
    google:
      id: UA-XXXXXXXXX-X
```

**Commentaire:**

Pareil, votre configuration de commentaire d'avant sera modifiée comme suit:

```yaml
comment:
  enable: true
  disqus:
    shortName: <your-disqus-shortname>
```

à:

```yaml
comment:
  enable: true
  services:
    disqus:
      shortName: <your-disqus-shortname>
```

**Support:**

Et, votre configuration de support des services tiers changera de:

```yaml
support:
  enabled: true
  kofi:
    user: <your ko-fi user id>
    text: Tip Me
    textColor: '#f9fafc'
    backgroundColor: '#248aaa'
```

à:

```yaml
support:
  enable: false
  services:
    kofi:
      user: hossainemruz
      text: Tip Me
      textColor: '#f9fafc'
      backgroundColor: '#248aaa'
```

**Autres changements:**

Il y a quelques autres options qui ont été changée. Par exemple:

```yaml
enableToc: true
```

remplacé par:

```yaml
toc:
  enable: true
```

De la même manière:

```yaml
enableTags: true
```

remplacé par:

```yaml
tags:
  enable: true
  on_card: true
```

Enfin,

```yaml
showFlags: true
```

remplacé par:

```yaml
# Spécifier s'il faut afficher le flag dans le sélecteur de langue. La valeur par défaut est True.
flags:
  enable: true
  # Si vous voulez utiliser un drapeau de pays différent pour une langue, spécifiez le ici.
  # flagOverwrites:
  #   - languageCode: en
  #     countryCode: us
```

Il y a eu quelques autres changements. Référez-vous s'il vous plaît à au fichier extrait de configuration pour plus de détails.

### 7. Construire le site

Finalement, vous êtes prêt à construire le thème. S'il vous plaît, exécutez les étapes suivantes pour construire le site:

a. Charger les modules Hugo

```bash
hugo mod tidy
```

b. Installez les modules Node

```bash
hugo mod npm pack
npm install
```

c. Exécuter le site

```bash
hugo server -w
```

J'espère que ce guide a été utile dans la migration de votre thème depuis la V3 à la V4. Si vous rencontrez des problèmes, n'hésitez pas à ouvrir une issue dans le [dépôt Github](https://github.com/hugo-toha/toha).
