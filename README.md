# Toha

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1b93b02-f278-440b-ae1b-304e9f4c4ab5/deploy-status)](https://app.netlify.com/sites/toha/deploys)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fhugo-themes%2Ftoha%2Fbadge%3Fref%3Dmain&style=flat)](https://actions-badge.atrox.dev/hugo-themes/toha/goto?ref=main)
![Repository Size](https://img.shields.io/github/repo-size/hugo-themes/toha)
![Lines of Codes](https://img.shields.io/tokei/lines/github.com/hugo-themes/toha)
![Contributor](https://img.shields.io/github/contributors/hugo-themes/toha)
![Latest Release](https://img.shields.io/github/v/release/hugo-themes/toha?include_prereleases)
![Last Commit](https://img.shields.io/github/last-commit/hugo-themes/toha)
![Open Issues](https://img.shields.io/github/issues/hugo-themes/toha?color=important)
![Open Pull Requests](https://img.shields.io/github/issues-pr/hugo-themes/toha?color=yellowgreen)
![License](https://img.shields.io/github/license/hugo-themes/toha)
![Security Headers](https://img.shields.io/security-headers?url=https%3A%2F%2Fhugo-themes.github.io%2F)

A [Hugo](https://gohugo.io/) theme for a personal portfolio with minimalist design and responsiveness.

![Thumbnail](https://raw.githubusercontent.com/hugo-themes/toha/main/images/screenshot.png)

- **Example Site:** [toha-example-site](https://toha-example-site.netlify.app)
- **Documentation:** [toha-docs.netlify.app](https://toha-docs.netlify.app/posts)

## Features

- Minimalist Design
- Fully Responsive
- Multiple Language Support
- Carefully Designed Cards
- Experience Timeline
- Achievement Gallery
- Sidebar to Categorize the Posts
- Short Codes
- Analytics Support
  - GoatCounter
  - counter.dev
  - Google Analytics
  - Matomo/Piwik
  - [Umami](https://umami.is/)
- Comment Support
  - [Disqus](https://disqus.com/)
  - [Valine](https://valine.js.org/)
  - [Utterances](https://utteranc.es/)
  - [Giscus](https://giscus.app/)

For more details about the features please visit [here](https://toha-docs.netlify.app/posts/features/).

## Available Translations

- English
- বাংলা
- Français
- Indonesian
- Deutsch
- Español
- 简体中文
- 繁體中文
- हिन्दी
- Italiano
- 日本語
- 한국어
- русский
- suomi
- Tiếng Việt
- Azerbaijan
- Turkish
- Arabic (العربية)
- Português Europeu
- Català
- Português Brasileiro
- Nederlands
- Hebrew

To know more about how to translate your site, please visit [here](https://toha-docs.netlify.app/posts/translation/). Follow, the data and post format from this [example site](https://github.com/hugo-themes/toha-example-site).

## Screenshots

Here are few screenshots from the [example site](https://toha-example-site.netlify.app).

##### Home Page Sections

![Home Page Sections](https://raw.githubusercontent.com/hugo-themes/toha/main/images/about.png)

##### List Page

![List Page](https://raw.githubusercontent.com/hugo-themes/toha/main/images/list.png)

##### Reading Page

![Reading Page](https://raw.githubusercontent.com/hugo-themes/toha/main/images/single.png)

## Requirements

- Hugo Version 0.146.0 (extended) or higher
- Go language 1.19 or higher (require for hugo modules)
- Node version v18.x or later and npm 8.x or later.

## Usage

The easiest way to use this theme is to fork [toha-example-site](https://github.com/hugo-themes/toha-example-site) sample repo.Then change the configurations according to your need.

If you want to start from scratch, then follow these steps:

##### 1. Initialize Hugo module on you repo

At first, initialize [Hugo modules](https://gohugo.io/hugo-modules/) in your repo. This will create a `go.mod` file.

```bash
hugo mod init github.com/<your username>/<your repo name>
```

##### 2. Add this theme as your module dependency

Now, in your `hugo.yaml` file, add a `module` section.

```yaml
# Use Hugo modules to add theme
module:
  imports:
    - path: github.com/hugo-toha/toha/v4
```

Check this sample [hugo.yaml](https://github.com/hugo-toha/hugo-toha.github.io/blob/main/hugo.yaml) for further reference.

##### 3. Update your module

Now, run this command to load this theme as your module.

```bash
hugo mod tidy
```

#### Running Locally

Now, you can run your hugo site locally with the following steps:

##### 1. Generate node dependency configuration

Now run the following command to generate node dependency configuration. This will create the a `package.json` file in you repo.

```bash
hugo mod npm pack
```

##### 2. Install dependencies

Install the node dependencies using following command:

```bash
npm install
```

##### 3. Run your site

Now, run you site locally using following command.

```bash
hugo server -w
```

When you run your site for first time, it will start with the default parameters. It should look similar to the [example site](https://toha-example-site.netlify.app). However, it will not have any sections in the homepage as we haven't configured them yet. You can configure your site by following the guides from [here](https://toha-docs.netlify.app/posts/configuration/).

## Shortcodes

Here, are some handy shortcodes you can use with this theme.

- [Alert](https://toha-docs.netlify.app/posts/shortcodes/#alert)
- [Image](https://toha-docs.netlify.app/posts/shortcodes/#image)
- [Split](https://toha-docs.netlify.app/posts/shortcodes/#split)
- [Vertical Space](https://toha-docs.netlify.app/posts/shortcodes/#vertical-space)
- [Video](https://toha-docs.netlify.app/posts/shortcodes/#video)
- [Mermaid](https://toha-example-site.netlify.app/posts/shortcodes/#mermaid)

## Contributing

You can contribute to this theme in various ways. You can report a [bug](https://github.com/hugo-themes/toha/issues/new?template=bug.md), file an [feature request](https://github.com/hugo-themes/toha/issues/new?template=feature_request.md), send a PR, [share your thoughts](https://github.com/hugo-themes/toha/issues/new?template=question.md) etc.

Pull requests are most welcome and I will be happy to review. Just follow the following principles:

- Keep it simple.
- Keep it consistent with the design.
- Use as few dependencies as possible.
- Have patience.

> I am not a web developer. I have created this theme for my personal needs. So, it is reasonable to have some flaws in the codes. Feel free to open issues and PRs acknowledging the problems.

## Local Development

For local development, you can make changes in the theme submodule and test the changes against your own site or this [example site](https://github.com/hugo-toha/toha-example-site) locally.

### 1. Fork

At first, fork [this repo](https://github.com/hugo-themes/toha). Then, follow the following steps to use the forked theme for local developments,

We have an example configuration under `exampleSite` folder that will let you run the theme locally. Follow below steps to run the example site.

### 2. Install Mise

We use [jdx/mise](https://github.com/jdx/mise) to simplify managing dependencies and running locally. Please, install it following the instruction from [here](https://mise.jdx.dev/getting-started.html).

### 3. Install dependencies

Install the all the necessary tools by running:

```bash
mise install
```

This will install `hugo`, `go`, `node` and other tools that are necessary to run this project to appropriate versions.

### 4. Run example site

Now, run the site locally using following command.

```bash
mise run example-site
```

Now, you can make change in the theme and they will be reflected immediately on the running site. If you need to change any configuration, you can do that in the `hugo.yaml` file inside `exampleSite` folder. If you need to add any content or data, you can create the respective folder inside `exampleSite` directory and add your desired content or data there.

### Running the forked theme against your own site

If you want to run your local development against your own site, follow the following steps:

**Replace the theme module:**

Open your site's `go.mod` file and replace the `github.com/hugo-toha/toha/v4` with your forked repo's path. For example, if your forked repo is `github.com/<your-github-user>/toha`, then replace the `github.com/hugo-toha/toha/v4` with `github.com/<your-github-user>/toha/v4`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => github.com/<your-github-user>/toha/v4 <git branch>
)
```

For interactive development, you can replace the theme with your locally cloned fork. For example, if you have cloned your fork in `/home/my-projects/toha`, then replace the `github.com/hugo-toha/toha/v4` with `/home/my-projects/toha`.

```go
module github.com/hugo-toha/hugo-toha.github.io

go 1.19

require github.com/hugo-toha/toha/v4 v4.0.1-0.20231229170427-d3968ca711ef // indirect

replace(
    github.com/hugo-toha/toha/v4 => /home/my-projects/toha
)
```

**Update dependencies:**

```bash
# update hugo modules
$ hugo mod tidy
# install dependencies
$ hugo mod npm pack
$ npm install
```

**Run your site locally:**

```bash
hugo server -w
```

From there you can make changes to the source code of the theme while testing with your running Hugo site or the example site.

### Open a PR

When the changes look good, commit and push them to your fork.

```bash
# stage all the changes
$ git add .
# commit the changes with a meaning full commit message
$ git commit -m "A meaningful commit message"
# push the commit to your fork
$ git push my-fork my-feature-branch
```

Then, open a PR against `main` branch of [hugo-themes/toha](https://github.com/hugo-themes/toha) from the `my-feature-branch` branch of your own fork.

## Attribution

- Thanks [Anup Deb](https://dribbble.com/anupdeb) for his design guidance.
- Many of the illustrations have been taken from [iconscout](http://iconscout.com/).
