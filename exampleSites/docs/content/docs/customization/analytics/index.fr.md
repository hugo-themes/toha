---
title: Analytiques
date: '2020-06-08T06:00:23+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
description: Ajouter l'analytique dans hugo theme Toha
linkTitle: Analytiques
weight: 600
aliases:
  - /posts/analytics/
  - /docs/analytics/
---

## Analytiques

Ce thème a été construit avec le support de divers outils d'analyse. Actuellement, il prend en charge les analyses suivantes:

- [GoatCounter](https://www.goatcounter.com/)
- [Counter.dev](https://counter.dev/)
- [Google Analytics](https://analytics.google.com)
- [Matomo](https://matomo.org/)
- [Umami](https://umami.is/)

Pour une liste complète des analytiques supportés, référez-vous au fichier d'échantillon [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml).

{{< alert type="warning" >}}
Avertissement: Lors de l'ajout d'analyses, vous devriez prendre en considération la législation locale pour voir si une bannière de confidentialité est nécessaire pour informer les visiteurs du suivi de ses données personnelles. En général (pas un conseil juridique), les méthodes anonymes et respectueuses de la vie privée telles que [counter.dev](https://counter.dev) et [GoatCounter](https://www.goatcounter.com/) n'ont pas besoin d'une bannière, car elles ne collectent pas de données personnelles identifiables.
{{< /alert >}}

### Goat Counter

[GoatCounter](https://www.goatcounter.com/) est la méthode d'analyse la plus complète, simple et respectueuse de la vie privée supportée dans Toha. Ces scripts traquent les pages les plus vues, le nombre total d'utilisateur, et plus encore, tout en étant open source !

Pour activer l'analyse GoatCounter sur votre site, vous avez deux options: la première est de s'inscrire sur [goatcounter.com](https://www.goatcounter.com) et obtenir un code pour votre site, la seconde est une instance auto-hébergée de GoatCounter. Ensuite, vous avez à ajouter une section `analytics` sous la section `params.features` de votre fichier `hugo.yaml` comme ci-dessous:

```yaml
analytics:
  enable: true
  services:
    # GoatCounter
    goatCounter:
      code: <your GoatCounter code>  # Not self-hosted
      instance: <your GoatCounter instance url>  # For self-hosted you should use only one of the two methods
```

### Counter.dev

[counter.dev](https://counter.dev) est un site d'analytique simple et respectueux de la vie privée qui vous permet de suivre le nombre total d'utilisateurs, la première page visitée et quelques autres métriques sur votre site web. Malheureusement, pour que les choses restent simples (et gratuites), elles ne montrent pas un classement des pages les plus visités, mais plutôt celles qui ont été consultées en premier.

Vous pouvez l'activer par l'ajout de l'email avec lequel vous vous êtes inscrit sur la page de counter.dev sous la section `params.features` dans votre fichier `hugo.yaml` comme ci-dessous:

```yaml
analytics:
  enable: true
  services:
    counterDev:
      id: <votre counter.dev id>
```
Le code de suivi sera automatiquement ajouté à votre site.

{{< alert type="warning" >}}
Remarques : Sur certains sites, [une erreur a été détectée](https://github.com/ihucos/counter.dev/issues/37) où seul le répertoire racine ("/") est passé à counter.dev, donc le suivi n'affiche rien sous la section "pages". Pour corriger cela, on peut ajouter `referrerPolicy: no-referrer-when-downgrade` comme paramètre dans la section "counterDev", en s'assurant que les nouvelles visites de pages sont toujours correctement passées sur counter.dev.
{{< /alert >}}

### Google Analytics

{{< alert type="danger" >}}
Méfiez-vous, [d'après une récente jurisprudence](https://www.euractiv.com/section/politics/short_news/use-of-google-analytics-violates-eu-law-austrian-authority-rules/), Google Analytics pourrait être illégal dans l'Union Européenne.
{{< /alert >}}

Vous pouvez activer Google Analytics sur votre site en ajoutant votre id de suivi sous la section `params.features` dans votre fichier `hugo.yaml` comme ci-dessous:

```yaml
analytics:
  enable: true
  services:
    # Google Analytics
    google:
      id: <your Google Analytics tracking id>
```

Vous pouvez utiliser à la fois la V3 ou V4 de l'ID de suivi. Le thème détectera automatiquement la version du code de suivi et ajoutera les scripts de suivi correspondants en fonction de votre site.

Pour des paramètres de confidentialité additionnels concernant Google Analytics, vous pouvez fournir une section `privacy.googleAnalytics` dans votre fichier `hugo.yaml` comme décrit [ici](https://gohugo.io/about/hugo-and-gdpr/#all-privacy-settings).

### Matomo

Vous pouvez activer Matomo (anciennement Piwik) par l'ajout de la configuration Matomo sous la section `params.features` dans votre fichier `hugo.yaml` comme ci-dessous:

```yaml
analytics:
  enable: true
  services:
    # Matomo / Piwik
    matomo:
      instance: matomo.example.com
      siteId: 1 # The number generated after adding a site in your instance
```

### Umami

[Umami](https://umami.is) est un outil d'analyse open source en total conformité avec le {{< text kind="abbr" title="Règlement Général sur la Protection des Données" >}}RGPD{{< /text >}} avec une approche sans cookies. Il peut être installé sur site ou vous pouvez utiliser la version Cloud fournie. Vous pouvez activer le suivi d'Umami en ajoutant les configurations suivantes sous `params.features` section dans le fichier `hugo.yaml`:

```yaml
analytics:
  enable: true
  services:
    # Umami Analytics
    umami:
      scheme: https
      instance: analytics.eu.umami.is
      id: <your Umami website id>
```

où `scheme` est le système (c'est-à-dire: https, http) que vous voulez utiliser pour vous connecter à l'instance, et `instance` est le domaine (ou l'adresse) de votre déploiement, en pointant par défaut sur l'instance cloud de l'{{< text kind="abbr" title="Union Européenne" >}}UE{{< /text >}}.
