---
title: Déployer dans Github Pages
date: '2020-06-08T22:00:20+06:00'
linkTitle: Déployer dans Github Pages
weight: 20
aliases:
  - /posts/getting-started/github-pages/
---

Dans ce billet, nous allons déployer le site que nous avons créé dans le précédent billet dans [Github Pages](https://pages.github.com/). D'abord, assurez-vous que le nom de votre dépôt soit `<your username>.github.io`. Ensuite, commitez n'importe quelles modifications locales et poussez dans Github.

#### Créer une branche `gh-pages`

D'abord, créez une nouvelle branche nommée `gh-pages`. Github définira automatiquement les configurations pour Github Pages quand il verra une branche avec ce nom.

```bash
# Création de la branche the gh-pages
$ git checkout -b gh-pages
# push de la branche source sur Github
$ git push gh-pages gh-pages
```

#### Activer Github Action

Nous allons automatiser le processus de déploiement en utilisant [Github Actions](https://github.com/features/actions). D'abord, assurez-vous que Github Action soit activé dans votre dépôt. Allez dans `Settings > Actions` de votre dépôt assurez-vous que `Action permissions` est configuré sur `Allow all actions`. Ici, une capture d'écran du paramètre décrit.

{{< img src="images/enable_action.png" align="center" >}}

#### Ajouter le flux de travail

Nous allons utiliser l'action [peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo) pour configurer hugo et [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) pour déployer le site. Créez un répertoire `.github` à la racine de votre dépôt. Ensuite, créez un répertoire `workflows` à l'intérieur du répertoire `.github`. Enfin, créez un fichier `deploy-site.yaml` à l'intérieur du répertoire `workflows` et ajoutez-y le contenu suivant:

```yaml
name: Deploy to Github Pages

# run when a commit is pushed to "source" branch
on:
  push:
    branches:
    - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    # checkout to the commit that has been pushed
    - uses: actions/checkout@v4

    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v3
      with:
        hugo-version: 'latest'
        extended: true

    - name: Update Hugo Modules
      run: hugo mod tidy

    - name: Setup Node
      uses: actions/setup-node@v4
      with:
        node-version: 20

    - name: Install node modules
      run: |
        hugo mod npm pack
        npm install

    - name: Build
      run: hugo --minify

    # push the generated content into the `gh-pages` branch.
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_branch: gh-pages
        publish_dir: ./public
```

Cette action s'exécutera à chaque push dans la branche `main`. Ca construira le site et commit le contenu généré dans la branche `gh-pages`.

#### Déployer

Si vous avez correctement suivi le guide, votre site devrait être prêt à être déployé dans Github Pages. Désormais, si vous poussez n'importe quel commit dans votre branche `main`, une Github Action démarrera et déploiera votre site automatiquement.

Poussez un commit dans la branche `main` et allez dans l'onglet `Actions` de votre dépôt pour vérifier que l'action a démarré.

{{< img src="images/action_running.png" align="center" >}}

{{< vs 2 >}}

Maintenant, attendez la fin des actions. Si elles se terminent avec succès, vous devriez voir une encoche verte indiquant que l'exécution réussie.

{{< img src="images/action_completed.png" align="center" >}}

{{< vs 2 >}}

Une fois la Github Action terminée avec succès, vous pouvez parcourir votre site à `https://<your username>.github.io`.

{{< img src="images/site_deployed.png" align="center" >}}

#### Ajout d'un nom de domaine personnalisé

Si vous possédez un nom de domaine et que vous souhaitez l'utiliser pour ce site, rendez-vous sur le site de votre fournisseur de nom de domaine. Ajoutez les enregistrements de ressources suivants:

```console
@      3600    IN A     185.199.108.153
@      3600    IN A     185.199.109.153
@      3600    IN A     185.199.110.153
@      3600    IN A     185.199.111.153

WWW    3600    IN A     185.199.108.153
WWW    3600    IN A     185.199.109.153
WWW    3600    IN A     185.199.110.153
WWW    3600    IN A     185.199.111.153
```

Pour vérifier votre domaine pour vous assurer que personne de Github ne puisse le réclamer à l'exception de vous, vous pouvez suivre les étapes contenues dans [ce guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages).

Enfin, créez un fichier `CNAME` à l'intérieur du répertoire `/static` de votre dépôt. Ajoutez votre nom de domaine là:

```console
example.com
```

Une fois la Github Action terminée avec succès, vous pouvez parcourir votre site à `https://<your domain name>`.

Notez qu'en naviguant sur `https://<your username>.github.io`, il redirigera automatiquement sur `https://<your domain name>`.
