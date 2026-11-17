---
title: Configuration de la section A propos
date: '2020-06-08T06:20:50+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section A propos
weight: 110
aliases:
  - /posts/configuration/sections/about/
  - /docs/configuration/sections/about/
---

L'objet de la section `A propos` est de fournir une brève introduction sur vous sur votre site web. Dans ce billet, nous vous guiderons sur la façon de configurer la section `A propos`. Pour une référence complète, consultez s'il vous plaît l'extrait du fichier [about.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/about.yaml).

Pour commencer, créez un fichier `about.yaml` dans le répertoire `data/fr/sections` de votre site web. Suivez ensuite, les instructions ci-dessous:

### Ajouter les informations de section

Ajoutez les métadonnées de la section suivante dans votre fichier `about.yaml`:

```yaml
# section information
section:
  name: A propos # Titre de votre section (default: "")
  id: about # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true # Booléen pour déterminer si la section est activée (par défaut: false)
  weight: 1 # Ordre d'affichage de la section (par defaut: alphabetique suivi par poids)
  showOnNavbar: true # Booléen pour déterminer si le lien doit être affiché pour cette section dans la barre de navigation
  template: sections/about.html # Vous Permet de pointer vers un modèle spécifique.
```

#### Paramètre du modèle

Vous avez la possibilité de personnaliser le partiel utilisé pour cette section en spécifiant la propriété `template`. Sauvegardez simplement le nouveau modèle dans votre répertoire `layout/partials`.

### Ajouter vos informations de travail

Pour inclure des détails à propos de votre emploi actuel, vous pouvez ajouter la section suivante dans votre fichier `about.yaml`:

```yaml
# votre désignation
designation: Software Engineer
# Les informations de votre compagnie
company:
  name: Example Co.
  url: "https://www.example.com"
```

### Ajouter un résumé sur vous

Pour donner un aperçu concis de votre expertise professionnelle, ajoutons une section de résumé. Cela donnera aux visiteurs un aperçu rapide de ce que vous faites. Ajoutez la section suivante à votre fichier `about.yaml`:

```yaml
# un résumé sur vous
summary: 'I am a passionate software engineer with x years of working experience. I built OSS tools for [Kubernetes](https://kubernetes.io/) using GO. My tools help people to deploy their workloads in Kubernetes. Sometimes, I work on some fun projects such as writing a theme, etc.'
```
Essayez de le rendre aussi bref que possible. Ne soyez pas trop verbeux. Nous avons d'autres sections qui donnent plus d'informations sur votre expertise.

>Vous pouvez utiliser la syntaxe markdown dans le champs `summary`

### Ajouter vos liens sociaux

Pour ajouter des liens vers vos différents profils tels que LinkedIn, Twitter, and Github, incluez la section `socialLinks` dans votre fichier `about.yaml`:

```yaml
# Vos liens sociaux
# Mettez en autant que voulez. Utitisez font-awesome pour les icônes.
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
```

Vous pouvez utiliser n'importe quelles icônes libres de [Font Awesome](https://fontawesome.com/icons?d=gallery) dans le champs `icon`.

### Ajouter un CV

Pour ajouter votre Curriculum Vitae, placez le fichier PDF dans le répertoire `files` à l'intérieur du répertoire `static`. Ensuite, incluez la section suivante dans votre fichier `about.yaml`.

```yaml
# Votre CV. Le chemin de ce fichier doit être relatif vers votre répertoire "static"
resourceLinks:
- title: "My Resume"
  url: "files/resume.pdf"
```

### Ajouter des badges

Maintenant, ajoutons vos badges et les indicateurs de force pour diverses compétences telles que le leadership, la communication, le travail d'équipe, etc. Incluez la section suivante dans votre fichier `about.yaml`:

```yaml
# Afficher vos badges
# Vous pouvez afficher vos certifications vérifiée depuis https://www.credly.com.
# Vous pouvez aussi afficher des barres circulaires indiquant le niveau d'expertise sur une certaine compétence
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
```

Actuellement, le pourcentage de qualification doit être compris entre 0 et 100, et doit être divisible par 5. Les couleurs suivantes sont disponibles pour l'indicateur de pourcentage de qualification.

- bleu
- jaune
- rose
- vert

>Vous pouvez aussi utiliser n'importe quel code couleur hexadécimal dans le champs `color`.

{{< vs 2 >}}

L'image suivante montre comment le contenu du fichier `about.yaml` est cartographié dans la section `A propos`. (La portion de configuration de l'image est obsolète et la section des SoftSkills a été remplacée avec des badges)

{{< img src="images/about.png" >}}
