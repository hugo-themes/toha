---
title: Les liens de soutien/donation
date: '2022-03-14T06:00:23+06:00'
description: Adding support links in hugo theme Toha
linkTitle: Liens de soutien
weight: 660
aliases:
  - /posts/supports/
  - /docs/supports/
---

Ce thème supporte l'ajout de liens de soutien/donation sur votre site. Actuellement, les liens de soutien supportés sont:

- [Ko-fi](https://ko-fi.com/)
- [Buy Me a Coffee](https://www.buymeacoffee.com/zicklam)

## Ko-fi

Vous pouvez ajouter votre button flottant ko-fi sur votre site web. Pour ajouter le button flottant, ajoutez une section `support` sous la section `params.features` dans votre fichier `hugo.yaml`:

```yaml
params:
  features:
    support:
      enabled: true
      kofi:
        user: <your ko-fi user id>
        text: Tip Me
        textColor: '#f9fafc'
        backgroundColor: '#248aaa'
```

## Buy Me a Coffee

Vous pouvez ajouter votre bouton flottant "Buy Me a Coffee" sur votre site web. Pour ajoutez une section `support` sous la section `params.features` dans votre fichier `hugo.yaml`:

![bmacbutton](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-button.png)
![bmacwidget](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-widget.png)

```yaml
params:
  features:
    support:
      enabled: true
      buymeacoffee:
        user: <your buymeacoffee.com user>
        text: Support me on Buy me a coffee!
        info: Buy me a coffee!
        color: '#FFDD00'
```
