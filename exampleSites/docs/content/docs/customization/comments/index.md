---
title: Comments
date: '2022-03-14T06:00:23+06:00'
description: Adding comments in hugo theme Toha
linkTitle: Comments
weight: 650
aliases:
  - /posts/comments/
  - /docs/comments/
---

## Comments

This theme has built-in support for comment on the posts. Currently, it support the following comment plugins:

- [Disqus](https://disqus.com/)
- [Valine](https://valine.js.org/)
- [Utterances](https://utteranc.es/)
- [Giscus](https://giscus.app/)

For a complete list of supported comments, please refer the sample [hugo.yaml](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml) file.

### Disqus

Disqus is a popular comment plug-in. After signing up to [Disqus](https://disqus.com/) you will need to provide your shortname under `params.features` section of your `hugo.yaml` file as below:

```yaml
comment:
  enable: true
  services:
    disqus:
      shortName: toha-example-site
```

### Valine

[Valine](https://valine.js.org/) appears to be a Chinese comments comments plugin. You can enable valine comment plugin by adding `valine` section under `params.features` section as shown below:

```yaml
comment:
  enable: true
  services:
    valine:
      appId: app-id
      appKey: app-key
      avatar: retro
      placeholder: Share your thought.
      lang: en
      recordIP: true
      enableQQ: true
```

### Utterances

To enable Utterances comment plugin, at first go to [utteranc.es](https://utteranc.es/). On the `Configuration` section, provide the necessary information. It will give you a script to include to your site. You just need to extract the respective information from the script and provide it under `params.features` section as below:

```yaml
comment:
  enable: true
  services:
    utteranc:
      repo: your-repo/name
      issueTerm: title
      theme: github-light
```

### Giscus

Giscus is based off Utterances, but uses [GitHub Discussions](https://docs.github.com/en/discussions) as the backend. This requires you to allow have a public repository, and the Giscus app to use your repository. Setup instructions can be found at the [Giscus home page](https://giscus.app/).

To enable Giscus comment plugin, at first go to [giscus.app](https://giscus.app/). On the `Configuration` section, provide the necessary information. It will give you a script to include to your site. You just need to extract the respective information from the script and provide it under `params.features` section as below:

```yaml
comment:
  enable: true
  services:
    giscus:
      repo: your-repo/name
      repoID: your-repo-id
      category: your-category
      categoryID: your-category-id
      theme: light
      map: url
      reaction: 1
      metadata: 0
      inputPosition: bottom
      crossOrigin: anonymous
```
