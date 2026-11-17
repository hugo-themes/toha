---
title: Quickstart
date: '2022-08-09T00:00:00+06:00'
description: Quick starting guide for the Toha theme
linkTitle: Quickstart
weight: 2
aliases:
  - /posts/quickstart/
  - /docs/quickstart/
---

## Run the examples

Install [mise](https://mise.jdx.dev/getting-started.html), then clone the theme repository:

```sh
git clone https://github.com/hugo-themes/toha.git
cd toha
mise install
mise run portfolio
```

Open <http://localhost:1313/>. The repository pins Hugo Extended and Dart Sass; mise also installs Go and Node. Each server task installs its dependencies automatically.

Stop the server before selecting another example, or pass a different port:

```sh
mise run docs
mise run blog -- --port 1314
```

## Make it your own

The portfolio's configuration, content, assets, and translated data live in [exampleSites/portfolio](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio). Change `hugo.yaml` and `data/en/` to customize it. Start with [site parameters]({{< relref "/docs/portfolio/site-parameters" >}}) and the [about section]({{< relref "/docs/portfolio/sections/about" >}}).

These examples use the working-tree theme through a local Go module replacement. They are development sites, not standalone starter exports. For an existing standalone site, keep its own module identity and update the released theme with `hugo mod get github.com/hugo-toha/toha/v4@latest`, then run `hugo mod npm pack` and `npm install`. Install Dart Sass for the legacy stylesheet pipeline. The modern layouts require a theme release that includes them; do not remove the local replacement and assume an older release has those features.

## Verify a contribution

```sh
mise run check
```

This checks all example builds, lint, and the regression tests. Read [contributing]({{< relref "/docs/community/contributing" >}}) for the workflow.
