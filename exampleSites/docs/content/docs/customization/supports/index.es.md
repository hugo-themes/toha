---
title: Enlaces de Soporte
date: '2022-03-14T06:00:23+06:00'
description: Añade enlaces de soporte en el tema de hugo Toha
author:
  name: BernatBC
  image: images/author/bernatbc.png
linkTitle: Enlaces de Soporte
weight: 660
aliases:
  - /posts/supports/
  - /docs/supports/
---

Este tema soporta la adición de varios enlaces de soporte/donación en su sitio. Actualmente, los enlaces de soporte admitidos son:

- [Ko-fi](https://ko-fi.com/)
- [Buy Me a Coffee](https://www.buymeacoffee.com/zicklam)

Para una lista completa de los enlaces de soporte admitidos, puede consultar el archivo de ejemplo [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml).

## Ko-fi

Puedes añadir tu botón flotante Ko-fi en tu sitio web. Para añadir el botón flotante, añade la sección `support` debajo de la sección `params.features`  del archivo `hugo.yaml`.

```yaml
support:
  enable: true
  services:
    kofi:
      user: <id de tu usuario de ko-fi>
      text: Tip Me
      textColor: '#f9fafc'
      backgroundColor: '#248aaa'
```

## Buy Me a Coffee

Puedes añadir tu botón flotante "Buy Me a Coffee" en tu sitio web. Para añadir el botón flotante, añade la sección `support` debajo de la sección `params.features`  del archivo `hugo.yaml`.

![bmacbutton](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-button.png)
![bmacwidget](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-widget.png)

```yaml
support:
  enable: true
  services:
    buymeacoffee:
      user: <su usuario de buymeacoffee.com>
      text: Support me on Buy me a coffee!
      info: Buy me a coffee!
      color: '#FFDD00'
```
