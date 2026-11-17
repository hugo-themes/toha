---
title: Préparer Votre Site
date: '2020-06-08T23:00:20+06:00'
linkTitle: Préparer votre site
weight: 10
aliases:
  - /posts/getting-started/prepare-site/
---

Pour développer le thème, suivez le [guide rapide actuel]({{< relref "/docs/getting-started/quickstart" >}}) : tous les exemples se lancent depuis le dépôt Toha. La procédure autonome ci-dessous utilise le [dépôt de démarrage existant](https://github.com/hugo-themes/toha-example-site), qui reste disponible pendant la préparation des exports liés aux versions publiées. Ce dépôt peut être forké ; le dossier `exampleSites/portfolio/` est une référence de configuration, pas un dépôt autonome à forker. Installez Hugo Extended, Go, Node et Dart Sass avec mise ; les versions fixées se trouvent dans le `mise.toml` du thème.

```sh
mise use hugo-extended@0.169.0 github:sass/dart-sass@1.108.2 go@latest node@latest
```

Dans ce billet, nous allons créer un site hugo de zéro. Nous le configurerons avec le thème `toha`, le rendrons multilingue, et ajouterons quelques exemples de billets. A la fin de ce billet, vous devriez être capable d'exécuter pleinement un site Hugo avec le thème `Toha` localement.

Si vous voulez démarrer d'une base, vous pouvez juste cloner le dépôt [hugo-toha/hugo-toha.github.io](https://github.com/hugo-themes/toha-example-site), renommez-le et mettez-le à jour avec vos propres données. Ce dépôt a déjà été configuré pour déployer sur [Github Pages](https://pages.github.com/) et [Netlify](https://www.netlify.com/).

Si vous avez déjà un site hugo, sautez à la section [Ajouter un thème](#ajouter-un-thème)

### Créer un dépôt

D'abord, créez un dépôt sur Github. Si vous voulez déployer ce site dans Github Pages, votre dépôt devrait être nommé `<votre username>.github.io`. Clonez le dépôt dans votre machine locale et naviguez dedans.

### Créer un site

Maintenant, assurez-vous d'avoir [Hugo](https://gohugo.io/getting-started/installing/) installé. Ce thème devrait fonctionner avec hugo version `v0.163.0` et plus. Maintenant, lancez la commande suivante depuis la racine de votre dépôt pour initier un site web hugo.

```console
$ hugo new site ./ --format=yaml --force
```

Cette commande créera une structure de base d'un site hugo. Ici, le flag `--format yaml` indique à hugo de créer un fichier de configuration au format YAML et le flag `--force` force hugo à créer un site même si le répertoire cible n'est pas vide. Cela va créer un fichier `hugo.yaml` qui conservera toutes les configurations nécessaires à votre site.

### Ajouter un thème

Nous allons utiliser un module hugo pour ajouter le thème `Toha` dans votre site. D'abord, initialisez les modules hugo en utilisant la commande suivante:

```console
$ hugo mod init github.com/<votre compte utilisateur>/<votre nom de dépôt>
```

Cette commande va créer un fichier `go.mod` à la racine de votre dépôt.

Puis, ajoutez la section module suivante dans votre fichier `hugo.yaml`:

```yaml
module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts
```

Finalement, exécutez les commandes suivantes pour télécharger le thème et ses dépendances:

```bash
# Télécharge le theme
hugo mod get -u
# Télécharge les dépendances du thème
hugo mod tidy
# Génère les dépendances node
hugo mod npm pack
# Installe les dépendances install
npm install
```

### Lancer le site localement

Maintenant, vous pouvez déjà exécuter votre site localement. Lançons le site en mode observation en utilisant la commande suivante:

```console
$ hugo server -w
```

Si vous naviguez sur `http://localhost:1313`, vous devriez voir un site basique avec le thème Toha. Dans la prochaine section, nous allons configurer le site pour qu'il ressemble à [hugo-toha.github.io](https://hugo-toha.github.io/). Comme nous avons lancé le serveur en mode observation, n'importe quels changements que nous faisons sur le site sera instantanément visible dans votre navigateur.

### Configurer le site

Maintenant, nous sommes prêt à configurer notre site. Dans cette section, nous allons ajouter les informations de l'auteur, différentes sections, et des échantillons de billets etc.

#### Mise à jour `hugo.yaml`

Quand vous avez créé le site en utilisant la commande `hugo new site`, cela a créé un fichier `hugo.yaml` à la racine de votre dépôt. Remplacer le contenu par défaut du fichier `hugo.yaml` avec ce qui suit:

```yaml
baseURL: https://hugo-toha.github.io

languageCode: en-us
title: "John's Blog"

# Use Hugo modules to add theme

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

# Manage languages
# For any more details, you can check the official documentation: https://gohugo.io/content-management/multilingual/
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2

# Force a locale to be use, really useful to develop the application ! Should be commented in production, the "weight" should rocks.
# DefaultContentLanguage: bn

# Allow raw html in markdown file
markup:
  goldmark:
    renderer:
      unsafe: true
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false

# At least HTML and JSON are required for the main HTML content and
# client-side JavaScript search
outputs:
  home:
    - HTML
    - RSS
    - JSON

# Enable global emoji support
enableEmoji: true

# Site parameters
params:
  # GitHub repo URL of your site
  gitRepo: https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio

  features:
    # Enable portfolio section
    portfolio:
      enable: true

    # Enable blog posts
    blog:
      enable: true

    # Enable Table of contents in reading page
    toc:
      enable: true

  # Configure footer
  footer:
    enable: true
```

Ici, vous voyez une configuration de base pour le thème Toha. Vous pouvez voir le fichier de configuration utilisé dans le site d'exemple [ici](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). Pour des options de configurations plus détaillées, s'il vous plaît consultez [ce billet]({{< relref path="/docs/portfolio/site-parameters" lang="fr" >}}).

#### Ajouter des données

La plupart des contenus de ce thème sont pilotés par quelques fichiers YAML dans le répertoire `data`. Dans cette section, nous allons ajouter quelques échantillons de données. Puisque nous sommes en train de bâtir un site multilingue, nous allons garder les données de chaque langue dans leur propre répertoire local.

D'abord, créez le répertoire `en` dans votre répertoire `data`. Ici, nous sommes en train d'ajouter des données pour la langue `anglaise`.

##### Informations du site

Maintenant, créez un fichier `site.yaml` dans le répertoire `/data/en/` de votre dépôt. Ajoutez-y le contenu suivant:

```yaml
# Copyright Notice
copyright: © 2020 Copyright.

# Meta description de votre site. Cela peut aider les moteurs de recherche à trouver votre site.
description: Portfolio and personal blog of John Doe.
```

Pour voir toutes les options disponibles pour les informations du site, consultez [cet extrait de fichier](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/site.yaml).

##### Informations de l'auteur

Maintenant, créez un fichier `author.yaml` dans le répertoire `data/en` et ajoutez vos informations comme suit:

```yaml
# Quelques informations à propos de vous.
name: "John Doe"
nickname: "John"
# Le message de salutation avant votre nom. Par défaut, ce sera "Hi, I am" s'il n'est pas fournit.
greeting: "Hi, I am"
image: "images/author/john.png"
# Donner vos informations de contact. Elles seront affichées dans le pied de page.
contactInfo:
  email: "johndoe@example.com"
  phone: "+0123456789"
  stack-overflow:
    icon: stack-overflow
    url: "https://stackoverflow.com/users/1/exampleUser"
    text: "ExampleUser"

# Un résumé de ce que vous faites
summary:
  - I am a Developer
  - I am a Devops
  - I love servers
  - I work on open-source projects
  - I love to work with some fun projects
```

##### Ajouter des sections

Maintenant, nous allons ajouter différentes sections dans notre page d'accueil. D'abord, créons un répertoire `sections` à l'intérieur de votre répertoire `data/en`. Ici, nous allons ajouter quelques sections avec des configurations minimales. Pour voir les options détaillées de configuration pour les sections, veuillez consulter [ici]({{< relref path="/docs/portfolio/sections" lang="fr" >}}).

###### La section A propos

Créez un fichier `about.yaml` à l'intérieur de votre répertoire `/data/en/sections`. Puis ajoutez le contenu suivant:

```yaml
# Information de section
section:
  name: About
  id: about
  enable: true
  weight: 1
  showOnNavbar: true
  template: sections/about.html

# votre designation
designation: Software Engineer
# Les informations de votre société
company:
  name: Example Co.
  url: "https://www.example.com"

# Votre Curriculum Vitae. Le chemin de ce fichier doit être relatif vers le répertoire "static"
resume: "files/resume.pdf"

# Un résumé sur vous
summary: 'I am a passionate software engineer with x years of working experience. I built OSS tools for [Kubernetes](https://kubernetes.io/) using GO. My tools help people to deploy their workloads in Kubernetes. Sometimes, I work on some fun projects such as writing a theme, etc.'

# Vos liens sur les réseaux sociaux
# Mettez-en autant que vous voulez. Utilisez font-awesome pour les icônes.
socialLinks:
- name: Email
  icon: "fas fa-envelope"
  url: "example@gmail.com"

- name: Github
  icon: "fab fa-github"
  url: "https://www.github.com/example"

- name: Stackoverflow
  icon: "fab fa-stack-overflow"
  url: "#"

- name: LinkedIn
  icon: "fab fa-linkedin"
  url: "#"

- name: Twitter
  icon: "fab fa-twitter"
  url: "#"

- name: Facebook
  icon: "fab fa-facebook"
  url: "#"

# Affiche vos badges
# Vous pouvez montrer vos certifications depuis https://www.credly.com
# Vous pouvez aussi afficher des barres circulaire indiquant le niveau d'expertise de certaines compétences
badges:
- type: certification
  name: Certified Kubernetes Security Specialist
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/f4bf92ed-8985-40b2-bc07-2f9308780854/kubernetes-security-specialist-logo-examdev.png"

- type: certification
  name: Istio and IBM Cloud Kubernetes Service
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/8d34d489-84bf-4861-a4a0-9e9d68318c5c/Beyond_basics_of_Istio_on_Cloud_v2.png"

- type: certification
  name: Artificial Intelligence and Machine Learning
  url: "https://www.credly.com/org/grupo-bancolombia/badge/artificial-intelligence-and-machine-learning"
  badge: "https://images.credly.com/size/680x680/images/e027514f-9d07-4b29-862f-fe21a8aaebf1/ae.png"

- type: soft-skill-indicator
  name: Leadership
  percentage: 85
  color: blue

- type: soft-skill-indicator
  name: Team Work
  percentage: 90
  color: yellow

- type: soft-skill-indicator
  name: Hard Working
  percentage: 85
  color: orange

# Vous pouvez aussi fournir un code couleur à la place d'un nom de couleur
# - type: soft-skill-indicator
#   name: Example 1
#   percentage: 75
#   color: "#00adb5"
```

Mettre le fichier `resume.pdf` dans le répertoire `/static/files` de votre dépôt. Vous pouvez trouver le fichier `about.yaml` utilisé dans le site exemple depuis [ici](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/about.yaml).

###### Ajouter d'autres sections

Pour conserver le caractère court de ce billet, nous l'avons divisé en différents billets. Ci-dessous, il y a la liste des billets qui vous montrera comment configurer les autres sections:

- [Configuration de la section A propos](/fr/posts/configuration/sections/about/).
- [Configuration de la section des études](/fr/posts/configuration/sections/education/).
- [Configuration de la section des expériences](/fr/posts/configuration/sections/experiences/).
- [Configuration de la section des projets](/fr/posts/configuration/sections/projects/).
- [Configuration de la section des billets récents](/fr/posts/configuration/sections/recent-posts/).
- [Configuration de la section des réalisations](/fr/posts/configuration/sections/achievements/).
- [Configuration de la section des compétences](/fr/posts/configuration/sections/skills/).

#### Ajout de billets

Maintenant, nous sommes prêts à ajouter notre premier billet sur notre site. Ici, nous allons ajouter ce [billet d'introduction](https://hugo-toha.github.io/posts/introduction/).

- D'abord, créez un répertoire `posts` à l'intérieur du répertoire `content` de votre site.
- Ensuite, créez un fichier `_index.md` à l'intérieur du répertoire `posts`. Copiez le contenu de ce [fichier](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/_index.md) et collez-le dans le nouveau fichier `_index.md` récemment créé.
- Créez un répertoire `introduction` à l'intérieur du répertoire `posts`.
- Ajoutez le [hero.svg](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/hero.svg) suivant à l'intérieur de votre répertoire `introduction`.
- Maintenant, créez un fichier `index.md` à l'intérieur du répertoire `introduction`. Ce fichier `index.md` contiendra les contenus du billet.
- Ajoutez l'[extrait de contenus](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/index.md) suivant dans le fichier `index.md` récemment créé.

Désormais, votre billet devrait apparaître à `http://localhost:1313/posts` et votre section `Billets Récents` devrait également afficher votre billet comme une carte. Pour traduire ce billet, créez simplement un nouveau fichier `index.<code langage>.md` dans le même répertoire. Puis, ajoutez le contenu traduit dedans.

Pour plus de billets d'échantillon, regardez par [ici](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio/content/posts) s'il vous plaît.

### Et ensuite ?

A ce stade, votre site doit avoir une apparence similaire au [site d'exemple](https://hugo-toha.github.io/). Maintenant, il est temps de déployer votre site. Vous pouvez suivre les guides de déploiement ci-dessous:

- [Déployer dans Github Pages](https://toha-guides.netlify.app/fr/posts/getting-started/github-pages/)
- [Déployer dans Netlify](https://toha-guides.netlify.app/fr/posts/getting-started/netlify/)
