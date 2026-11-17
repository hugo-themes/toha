---
title: Configuration de la section Expériences
date: '2020-06-08T06:20:40+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Section des expériences
weight: 130
aliases:
  - /posts/configuration/sections/experiences/
  - /docs/configuration/sections/experiences/
---

La section `expériences` a été conçue pour mettre en valeur votre carrière et mettre en évidence les responsabilités que vous avez assumées tout au long de votre parcours professionnel. Dans ce billet, nous vous guiderons sur la façon de configurer la section `Expériences` de votre site. Pour une référence complète, consultez s'il vous plaît l'extrait du fichier [experiences.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/experiences.yaml).

Pour commencer, créez un nouveau fichier nommé `experiences.yaml` dans le répertoire `data/fr/sections` de votre site. Ensuite, suivez les instructions ci-dessous:

### Ajouter les informations de section

Ajoutez les métadonnées de la section suivante dans votre fichier `experiences.yaml`:

```yaml
# section information
section:
  name: Experiences # Titre de la section (par défaut: "" )
  id: experiences # URL id/slug de section *valeur à conserver & obligatoire*
  enable: true
  weight: 3
  showOnNavbar: true
  # Peut optionnellement masquer les titres de la section
  # hideTitle: true
```

### Ajouter vos expériences

Pour ajouter une expérience, incluez les informations correspondantes sous la section `experiences` de votre fichier `experiences.yaml` comme ci-dessous:

```yaml
# Vos expériences
experiences:
- company:
    name: Example Co.
    url: "https://www.example.com"
    location: Dhaka Branch
    logo: /images/experiences/company.png
    darkLogo: /images/experiences/company-dark.png #(optionnel)
    # Aperçu de votre compagnie
    overview: Example Co. is a widely recognized company for cloud-native development. It builds tools for Kubernetes.
  positions:
  - designation: Senior Software Engineer
    start: Nov 2019
    # Ne pas fournir de date de fin sur votre poste actuel. Ca sera remplacé par "Aujourd'hui".
    # end: Dec 2020
    # Donnez quelques points à propos de vos responsabilités dans cette entreprise.
    responsibilities:
    - Design and develop XYZ tool for ABC task
    - Design, develop and manage disaster recovery tool [Xtool](https://www.example.com) that backup Kubernetes volumes, databases, and cluster's resource definition.
    - Lead backend team.

  - designation: Junior Software Engineer
    start: Nov 2017
    end: Oct 2019
    responsibilities:
    - Implement and test xyz feature for abc tool.
    - Support client for abc tool.
    - Learn k,d,w technology for xyz.
```

Chaque entrée dans une section `expériences` devrait avoir les informations suivantes:

- **company**: Quelques informations sur votre entreprise. Vous devez fournir `name`, `url`, `location`, `logo`, et une brève `overview` de votre entreprise.
- **positions**: Une liste des postes que vous avez occupé dans l'entreprise. Vous pouvez fournir plusieurs postes si vous en avez changé au sein de cette entreprise.
- **designation**: Indique le rôle que vous jouiez sur ce poste.
- **start**: Temps quand vous avez démarré à ce poste.
- **end**: Temps quand vous avez quitté ce poste. Si vous occupé actuellement ce poste, ne renseignez pas ce champs.
- **responsibilities**: Une liste des responsabilités que vous avez assumée à ce poste. Cette section est très importante car elle donnera aux visiteurs une idée des responsabilités que vous êtes capable de gérer.

> Vous pouvez utiliser la syntaxe markdown dans le champs `overview` de la section `company` et dans le champs `responsabilities`.

<!-- {{< vs 2 >}}

The following image shows how the contents of `experiences.yaml` are mapped into the `Experiences` section.

{{< img src="images/experiences.png" >}} -->
