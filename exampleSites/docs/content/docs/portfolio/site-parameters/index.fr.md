---
title: Configuration des paramètres du site
date: '2020-06-08T06:20:55+06:00'
linkTitle: Paramètres du site
weight: 105
aliases:
  - /posts/configuration/site-parameters/
  - /docs/configuration/site-parameters/
---

Après l'installation du thème, quand vous lancez le site pour la première fois, cela démarrera avec les paramètres par défaut. Cela devrait avoir  l'apparence du site d'exemple excepté qu'il n'a pas de sections sur la page d'accueil. Ces sections sont ajoutées via quelques fichiers de données. Dans les prochains billets, je vais vous montrer comment vous pouvez ajouter ces sections en fournissant des fichiers de données.

Dans ce billet, je vais vous montrer comment vous pouvez changer les paramètres du site pour modifier l'arrière plan, le logo, les informations de l'auteur, et activer/désactiver différentes fonctionnalités.

Pour une liste compréhensive des paramètres de configuration disponibles, consultez s'il vous plaît le [site d'exemple](https://github.com/hugo-toha/hugo-toha.github.io/tree/main).

### Ajouter une image d'arrière plan

D'abord, on va paramètrer un arrière plan sur votre site. Mettez l'image d'arrière plan désirée dans le répertoire `assets/images`. Ensuite, ajoutez ce qui suit dans la section `params` de votre fichier `hugo.yaml`.

```yaml
background: "images/<nom-de-votre-image-arrière-plan.jpg"
# Optionnel, pour une image d'arrière-plan différente en mode sombre
darkBackground: "images/<nom-de-votre-image-arrière-plan-sombre.jpg"
```

### Ajouter le logo du site

Pour ajouter des logos pour votre site, vous devez fournir deux logos différents. Un pour la barre de navigation transparente et un autre pour la barre de navigation non transparente. Placez vos logos dans le répertoire `assets/images` et ajoutez le code sous la section `params` du fichier `hugo.yaml`.

```yaml
# The inverted logo will be used in the initial transparent navbar and
# the main logo will be used in the non-transparent navbar.
logo:
  main: images/main-logo.png
  inverted: images/inverted-logo.png
  favicon: images/favicon.png
```

### Activer les billets de blog

Pour activer les billets de blog sur votre site, vous aurez besoin de faire quelques changements dans votre fichier `hugo.yaml`. Localisez la section `params.features` et ajoutez le code suivant:

```yaml
# Active et configure la publication de billets
blog:
  enable: true
  showAuthor: true
```

### Activer la `Table des Matières`

Maintenant, si vous voulez afficher la section `Table des Matières` dans votre billet de blog, vous devez d'abord l'activer dans la section `params.features` de votre fichier `hugo.yaml`.

```yaml
toc:
  enable: true
```
Vous pouvez également contrôler le niveau de votre table des matières par l'ajout de la configuration suivante dans la section `markup` de votre fichier `hugo.yaml`.

```yaml
markup:
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false
```

Ici, nous avons configuré notre table des matières pour afficher tous les titres à partir de `h2` jusqu'à `h6`.

### Activer le bouton `<Améliorer cette page>`

Si vous voulez fournir à vos visiteurs un moyen facile d'améliorer un article (par exemple une faute de frappe, un correctif d'indentation, etc.), vous pouvez activer le bouton `<Améliorer cette page>` en ajoutant l'URL de votre dépôt Git dans la section `params` de votre fichier `hugo.yaml`.

```yaml
gitRepo: <L'URL du dépôt Github de votre site>
```

Cela ajoutera un bouton labelisé `Améliorer cette page` au pied de chaque billet. Le bouton redirigera l'utilisateur directement vers le formulaire d'édition de Github de la page.

Si vous branche par défaut ne s'appelle pas `main`, alors vous aurez besoin d'ajouter votre branche git par défaut dans la section `params` de votre fichier `hugo.yaml`.

```yaml
gitBranch: <le nom de votre branche git par défaut>
```

### Activer la Newsletter

Pour activer la fonctionnalité de newsletter, vous avez besoin de fournir les paramètres nécessaires sous la section `params.footer` dans votre fichier `hugo.yaml`. Actuellement, la fonctionnalité de newsletter supporte seulement le service Mailchip. Ici un exemple de ce à quoi cela doit ressembler:

```yaml
newsletter:
  enable: true
  provider: mailchimp
  mailchimpURL: https://github.us1.list-manage.com/subscribe/post?u=19de52a4603135aae97163fd8&amp;id=094a24c76e
```

Pour désactiver la fonctionnalité de newsletter, vous pouvez paramètrer la configuration suivante:

```yaml
newsletter:
  enable: false
```

### Activer le RAW HTML dans le fichier Markdown

Si vous voulez inclure le RAW HTML dans vos fichiers markdown, vous avez besoin d'activer le rendu non sécurisé. Sans cette activation, Hugo n'affichera pas le rendu HTML. Pour activer le rendu markdown non sécurisé; ajoutez les paramètres `goldmark` suivants dans la section `markup` du fichier `hugo.yaml`.

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

### Ajouter les informations de l'auteur

Maintenant, fournissons vos informations de base. Créez un fichier `author.yaml` dans le répertoire `/data` et ajoutez-y les informations sur l'auteur.

```yaml
# Quelques informations sur vous
name: "John Doe"
nickname: "John"
# Un message de bienvenue avant votre nom. Il sera par défaut "Bonjour! Je suis" s'il n'est pas fourni.
greeting: "Bonjour, je suis"
image: "images/author/john.png"
# Donnez quelques informations pour vous contacter. Ils seront utilisés dans le pied de page
contactInfo:
  email: "johndoe@example.com"
  phone: "+0123456789"
  github: johndoe
  linkedin: johndoe

# Un sommaire de ce que vous faites
summary:
  - Je suis Développeur
  - Je suis Devops
  - J'aime les serveurs
  - Je travaille sur des projets Open Source
  - J'adore travailler sur des projets sympas
```

> Note: Les paramètres `contactInfo` utiliseront le paramètre `icon` pour trouver l'icône. Assurez-vous que le champs `icon` corresponde avec le nom de l'icône sur fontawesome. Vous pouvez trouver des exemples [ici](https://fontawesome.com/search?o=r&f=brands)

### Ajouter l'avis du droit d'auteur

On va ajouter un avis de droit d'auteur pour votre site. Ca sera affiché en bas du pied de page. Créez un fichier `site.yaml` dans votre répertoire `data` et ajoutez-y la section suivante.

```yaml
copyright: © 2024 Copyright.
```

### La description du site

Pour ajouter une description de votre site qui aidera les moteurs de recherche à trouver votre site. Vous avez besoin d'ajouter une section `description` dans votre votre fichier `site.yaml`.

```yaml
# Meta description de votre site. Ca aidera les moteurs de recherche à trouver votre site.
description: Site d'exemple pour hugo theme Toha.
```

### Ajout d'un menu personnalisé

Pour ajouter des menus personnalisé dans la barre de navigation, vous pouvez modifier le fichier `site.yaml`. Par défaut, les menus personnalisés sont visibles dans la barre de navigation. Pour  masquer un menu personnalisé, paramètrez la propriété `hideFromNavbar` à `true`. Par défaut, les menus personnalisés sont masqués depuis la zone de navigation du pied de page. Pour afficher un élément de menu personnalisé dans le pied de page, paramètrez sa propriété `showOnFooter` à `true`.

```yaml
customMenus:
- name: Notes
  url: https://hossainemruz.gitbook.io/notes/
  hideFromNavbar: false
  showOnFooter: true
```

### Changer le titre de la barre de navigation
Pour changer le titre qui apparaît sur la barre de navigation, vous pouvez midifier le fichier `site.yaml`. Par defaut, le titre correpond au nom du site. Vous pouvez ajouter la ligne suivante::

```yaml
navBarTitle: "Titre"
```

Maintenant, vous pouvez lancer votre site et voir les changements. Dans les billets qui suivent, je vous guiderai sur comment ajouter des sections à votre page d'accueil et plus loin personnaliser votre site.
