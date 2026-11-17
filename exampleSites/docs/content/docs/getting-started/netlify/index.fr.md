---
title: Déployer dans Netlify
date: '2020-06-08T21:00:15+06:00'
linkTitle: Déployer dans Netlify
weight: 30
aliases:
  - /posts/getting-started/netlify/
---

[Netlify](https://www.netlify.com/) offre un facile et excellent processus pour le déploiement d'un site statique hugo. Vous pouvez déployer votre site en quelques clics. Contrairement à Github Pages, vous pouvez nommer votre dépôt comme vous le souhaitez. Vous pouvez également personnaliser l'URL du site.

Dans ce billet, nous montrerons le processus pas-à-pas d'un déploiement de site hugo avec Netlify.

### Ajouter une configuration de Netlify

D'abord, créons un ficher `netlify.toml` à la racine de votre dépôt et ajoutez-y la configuration suivante:

```toml
[build]
command = "hugo --gc --minify"
publish = "public"

[context.production.environment]
HUGO_ENABLEGITINFO = "true"
HUGO_ENV           = "production"
HUGO_VERSION       = "0.120.1"
NODE_VERSION       = "v18.12.1"
NPM_VERSION        = "8.19.2"

[context.split1]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify --enableGitInfo"

    [context.split1.environment]
    HUGO_ENV     = "production"
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.deploy-preview]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify --buildFuture -b $DEPLOY_PRIME_URL"

    [context.deploy-preview.environment]
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.branch-deploy]
command = "hugo mod tidy && hugo mod npm pack && npm install && hugo --gc --minify -b $DEPLOY_PRIME_URL"

    [context.branch-deploy.environment]
    HUGO_VERSION = "0.120.1"
    NODE_VERSION = "v18.12.1"
    NPM_VERSION  = "8.19.2"

[context.next.environment]
HUGO_ENABLEGITINFO = "true"
```

Commit et pousser le fichier `netlify.toml` dans Github. Maintenant, vous être prêt à déployer votre site sur Netlify.

### Déploiement du site

Maintenant, connectez-vous sur [netlify](https://www.netlify.com/). Ensuite, rendez-vous dans l'onglet `Sites` de votre tableau de bord et cliquez sur le bouton `New site form Git`.

{{< img src="images/2.png" align="center" >}}

{{< vs 2 >}}

Une nouvelle pop-up s'ouvrira. Sélectionnez `Github` et authentifiez-vous, avec votre compte Github.

{{< img src="images/3.png" align="center" >}}

{{< vs 2 >}}

Après l'authentification, on vous demandera de sélectionnez le dépôt désiré. Sélectionnez le dépôt que vous utilisez pour votre site.

{{< img src="images/4.png" align="center" >}}

{{< vs 2 >}}

Maintenant, Netlify vous mènera à la page de déploiement. Sélectionnez la branche que vous voulez déployer. Netlify devrait remplir automatiquement les champs requis à partir du fichier `netlify.toml` que vous avez créé un peu plus tôt dans ce billet. Quand vous êtes satisfait des configurations, appuyez sur le bouton `Deploy`

{{< img src="images/5.png" align="center" >}}

{{< vs 2 >}}

Maintenant, netlify va commencer à publier votre site immédiatement. Attendez que le processus de publication soit achevé. Une fois le site publié, vous pouvez parcourir votre site à l'URL générée automatiquement par netlify. L'URL générée automatiquement a été indiqué par le rectangle rouge sur la capture d'écran ci-dessous.

{{< img src="images/6.png" align="center" >}}

### Personnalisation de l'URL

Vous pouvez facilement personnaliser l'URL de votre site en quelques clics seulement comme indiqué ci-dessous.

1. Cliquez sur le bouton `Domain Setting` sous l'onglet `Site Overview`.

{{< img src="images/7.png" align="center" >}}

2. Maintenant, soit vous ajoutez votre propre domaine en cliquant sur le bouton `Add custom domain` ou bien vous pouvez juste utiliser le domaine `<your custom prefix>.netlify.app`. Ici, c'est ce que nous feront après. Cliquez sur le bouton `options` et sélectionnez `Edit site name`.

{{< img src="images/8.png" align="center" >}}

{{< vs 2 >}}

3. Ensuite, donnez à votre site le nom que vous voulez.

{{< img src="images/9.png" align="center" >}}

{{< vs 2 >}}

4. Une fois que vous avez sauvegardé le nouveau nom, vous verrez que l'URL de votre site a été mise à jour instantanément. Maintenant, vous pouvez parcourir votre site à la nouvelle URL.

{{< img src="images/10.png" align="center" >}}
