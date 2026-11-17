---
title: Supports Links
date: '2022-03-14T06:00:23+06:00'
description: Adding support links in hugo theme Toha
linkTitle: Support Links
weight: 660
aliases:
  - /posts/supports/
  - /docs/supports/
---

This theme supports adding various support/donation links in your site. Currently, supported support links are:

- [Ko-fi](https://ko-fi.com/)
- [Buy Me a Coffee](https://www.buymeacoffee.com/zicklam)

For a complete list of supported support links, please refer the sample [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml) file.

## Ko-fi

You can add your Ko-fi floating button in your website. To add the floating button, add the `support` section under `params.features` section of your sites `hugo.yaml` file:

```yaml
support:
  enable: true
  services:
    kofi:
      user: <your ko-fi user id>
      text: Tip Me
      textColor: '#f9fafc'
      backgroundColor: '#248aaa'
```

## Buy Me a Coffee

You can add your "Buy Me a Coffee" floating button in your website. To add the floating button, add the `support` section under `params.features` section of your sites `hugo.yaml` file:

![bmacbutton](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-button.png)
![bmacwidget](https://git-doc-files.s3.eu-central-1.amazonaws.com/github.com/hugo-toha/guides/buymeacoffe-widget.png)

```yaml
support:
  enable: true
  services:
    buymeacoffee:
      user: <your buymeacoffee.com user>
      text: Support me on Buy me a coffee!
      info: Buy me a coffee!
      color: '#FFDD00'
```
