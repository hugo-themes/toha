---
title: Comment traduire des billets ?
date: '2024-01-15T06:20:50+06:00'
author:
  name: Nicolas Dietlin
  image: images/author/nicolas.jpg
linkTitle: Traduire des billets
weight: 520
aliases:
  - /posts/translation/content/
---

Ce thème prend en charge plusieurs langues.

Avant de commencer la traduction d'un billet, assurez-vous que vous avez activé la langue sur votre site. Si ce n'est pas le cas, vous pouvez suivre la section `Ajout d'une langue à votre site` du guide [Comment traduire les données du site ?](/fr/posts/translation/site-data/)

## Création du billet

Lorsque vous avez ajouté la langue désirée à votre site web, sachez que vous pouvez traduire un billet dans cette langue. Nous allons supposer que vous voulez traduire un billet existant.

### Création du fichier index

La première étape est de localiser le fichier `index.md` du billet que vous voulez traduire. Puis vous allez créer un fichier dans le même répertoire (ou bien vous pouvez juste dupliquer le fichier `index.md`), et le nommer `index.<code_langue>.md`, où `<code_langue>` est le code du langage que vous pouvez retrouver dans le tableau des langages sur [Comment traduire les données du site ?](/fr/posts/translation/site-data/)

### Traduction du billet

Maintenant, vous pouvez démarrer la traduction du billet, de la même façon que vous écrivez un nouveau billet.

> INFO : Si vous avez affaire à des références internes, vous devez ajouter le prefix `/<code_langue>` devant votre chemin relatif. Par exemple, si vous voulez créer un lien pointant vers `/posts/translation/site-data/`, le lien vers le billet traduit sera `/<code_langue>/posts/translation/site-data/`.
