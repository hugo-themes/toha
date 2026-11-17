---
title: Prepare Your Site
date: '2020-06-08T23:00:20+06:00'
linkTitle: Prepare Site
weight: 10
aliases:
  - /posts/getting-started/prepare-site/
---

For theme development, use the current [quickstart]({{< relref "/docs/getting-started/quickstart" >}}): all examples run from the Toha repository. The standalone setup below uses the existing [starter repository](https://github.com/hugo-themes/toha-example-site), which remains available while release-pinned exports are being prepared. You can fork that repository; `exampleSites/portfolio/` in this repository is a configuration reference, not a separately forkable repository. Install the current Hugo Extended, Go, Node and Dart Sass tools with mise; the pinned versions are in the theme repository’s `mise.toml`.

```sh
mise use hugo-extended@0.169.0 github:sass/dart-sass@1.108.2 go@latest node@latest
```

In this post, we are going to create a hugo site from scratch. Then, we will configure it with `Toha` theme, make it multilingual, add some example posts. At the end of this post, you should be able to run a fully functional hugo site with `Toha` theme locally.

If you want a head start, you can just fork [hugo-toha/hugo-toha.github.io](https://github.com/hugo-themes/toha-example-site) repo, rename it and update with your own data. This repo has already been configured to deploy in [Github Pages](https://pages.github.com/) and [Netlify](https://www.netlify.com/).

### Create Repository

At first, create a repository in Github. If you want to deploy this site in Github Pages, your repo named should be `<your user name>.github.io`. Clone the repository into your local machine and navigate into it.

### Create Site

Now, make sure that you have [Hugo](https://gohugo.io/getting-started/installing/) installed. This theme should work with hugo version `v0.163.0` and later. Now, run the following command in the root of your repository to initiate a hugo website.

```console
hugo new site ./ --format=yaml --force
```

This command will create a basic hugo site structure. Here, `--format=yaml` flag tells hugo to create configuration file in YAML format and `--force` flag forces hugo to create a site even if the target directory is not empty. It will create `hugo.yaml` file that will hold the all the necessary configurations for your site.

### Add Theme

We are going to use hugo module to add `Toha` theme into our site. At first, initialize hugo modules using the following command:

```bash
hugo mod init github.com/<your user name>/<your repo name>
```

This command will create a `go.mod` file in the root of your repository.

Then, add the following module section in your `hugo.yaml` file:

```yaml
module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts
```

Finally, run the following commands to download the theme and its dependencies:

```bash
# download the theme
hugo mod get -u
# download the theme's dependencies
hugo mod tidy
# generate node dependencies
hugo mod npm pack
# install install dependencies
npm install
```

### Run Site Locally

Now, you can already run your site locally. Let's run the site in watch mode using the following command:

```console
hugo server -w
```

If you navigate to `http://localhost:1313`, you should see a basic site with Toha theme. In the next section, we are going to configure the site to look like the [hugo-toha.github.io](https://hugo-toha.github.io/). As we have run the server in watch mode, any changes we make to the site will be instantly visible in the browser.

### Configure Site

Now, we are ready to configure our site. In this section, we are going to add  author information, different sections, and sample posts etc.

#### Update `hugo.yaml`

When you have created the site using `hugo new site` command, it has created a `hugo.yaml` file in the root of your repository. Replace the default content of the `hugo.yaml` file with the following:

```yaml
baseURL: https://hugo-toha.github.io

languageCode: en-us
title: "John's Blog"

# Use Hugo modules to add theme

module:
  imports:
  - path: github.com/hugo-toha/toha/v4
  mounts:
  - source: static/files
    target: static/files
  - source: ./node_modules/flag-icon-css/flags
    target: static/flags
  - source: ./node_modules/@fontsource/mulish/files
    target: static/files
  - source: ./node_modules/katex/dist/fonts
    target: static/fonts

# Manage languages
# For any more details, you can check the official documentation: https://gohugo.io/content-management/multilingual/
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2

# Force a locale to be use, really useful to develop the application ! Should be commented in production, the "weight" should rocks.
# DefaultContentLanguage: bn

# Allow raw html in markdown file
markup:
  goldmark:
    renderer:
      unsafe: true
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false

# At least HTML and JSON are required for the main HTML content and
# client-side JavaScript search
outputs:
  home:
    - HTML
    - RSS
    - JSON

# Enable global emoji support
enableEmoji: true

# Site parameters
params:
  # GitHub repo URL of your site
  gitRepo: https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio

  features:
    # Enable portfolio section
    portfolio:
      enable: true

    # Enable blog posts
    blog:
      enable: true

    # Enable Table of contents in reading page
    toc:
      enable: true

  # Configure footer
  footer:
    enable: true
```

Here, you are seeing a basic configuration for Toha theme. You can see the configuration file used in the example site form [here](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/hugo.yaml). For more detailed configuration options, please check [this post]({{< relref path="/docs/portfolio/site-parameters" lang="en" >}}).

#### Add Data

Most of the contents of this theme is driven by some YAML files in `data` directory. In this section, we are going to add some sample data. Since, we're building a multilingual site, we are going to keep the data for each language separate into their own locale folder.

At first, create `en` folder inside your `data` directory. We are going to add data for `English` language here.

##### Site Information

Now, create a `site.yaml` file inside `/data/en/` directory of your repository. Add the following content there:

```yaml
# Copyright Notice
copyright: © 2020 Copyright.

# Meta description for your site.  This will help the search engines to find your site.
description: Portfolio and personal blog of John Doe.
```
To see all the available options for site information, check [this sample file](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/site.yaml).

##### Author Information

Now, create a `author.yaml` file in `/data/en/` directory and add your information there as below:

```yaml
# some information about you
name: "John Doe"
nickname: "John"
# greeting message before your name. it will default to "Hi! I am" if not provided
greeting: "Hi, I am"
image: "images/author/john.png"
# give your some contact information. they will be used in the footer
contactInfo:
  email: "johndoe@example.com"
  phone: "+0123456789"
  github: johndoe
  linkedin: johndoe

# some summary about what you do
summary:
  - I am a Developer
  - I am a Devops
  - I love servers
  - I work on open-source projects
  - I love to work with some fun projects
```

##### Add Sections

Now, we are going to add different sections into our home page. At first, create a `sections` folder inside your `/data/en` directory. Here, we are going to add few sections with minimum configurations. In order to see detailed configuration options for the sections, please visit [here]({{< relref path="/docs/portfolio/sections" lang="en" >}}).

###### About Section

Create `about.yaml` file inside your `/data/en/sections/` directory. Then add the following contents there:

```yaml
# section information
section:
  name: About
  id: about
  enable: true
  weight: 1
  showOnNavbar: true
  template: sections/about.html

# your designation
designation: Software Engineer
# your company information
company:
  name: Example Co.
  url: "https://www.example.com"

# your resume. this file path should be relative to you "static" directory
resume: "files/resume.pdf"

# a summary about you
summary: 'I am a passionate software engineer with x years of working experience. I built OSS tools for [Kubernetes](https://kubernetes.io/) using GO. My tools help people to deploy their workloads in Kubernetes. Sometimes, I work on some fun projects such as writing a theme, etc.'

# your social links
# give as many as you want. use font-awesome for the icons.
socialLinks:
- name: Email
  icon: "fas fa-envelope"
  url: "example@gmail.com"

- name: Github
  icon: "fab fa-github"
  url: "https://www.github.com/example"

- name: Stackoverflow
  icon: "fab fa-stack-overflow"
  url: "#"

- name: LinkedIn
  icon: "fab fa-linkedin"
  url: "#"

- name: Twitter
  icon: "fab fa-twitter"
  url: "#"

- name: Facebook
  icon: "fab fa-facebook"
  url: "#"

# Show your badges
# You can show your verifiable certificates from https://www.credly.com.
# You can also show a circular bar indicating the level of expertise on a certain skill
badges:
- type: certification
  name: Certified Kubernetes Security Specialist
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/f4bf92ed-8985-40b2-bc07-2f9308780854/kubernetes-security-specialist-logo-examdev.png"

- type: certification
  name: Istio and IBM Cloud Kubernetes Service
  url: "https://www.credly.com/org/the-linux-foundation/badge/exam-developer-certified-kubernetes-security-specialist"
  badge: "https://images.credly.com/size/680x680/images/8d34d489-84bf-4861-a4a0-9e9d68318c5c/Beyond_basics_of_Istio_on_Cloud_v2.png"

- type: certification
  name: Artificial Intelligence and Machine Learning
  url: "https://www.credly.com/org/grupo-bancolombia/badge/artificial-intelligence-and-machine-learning"
  badge: "https://images.credly.com/size/680x680/images/e027514f-9d07-4b29-862f-fe21a8aaebf1/ae.png"

- type: soft-skill-indicator
  name: Leadership
  percentage: 85
  color: blue

- type: soft-skill-indicator
  name: Team Work
  percentage: 90
  color: yellow

- type: soft-skill-indicator
  name: Hard Working
  percentage: 85
  color: orange

# you can also provide color code instead of the color name
# - type: soft-skill-indicator
#   name: Example 1
#   percentage: 75
#   color: "#00adb5"
```

Put the `resume.pdf` file in `/static/files` directory of your repository. You can find the `about.yaml` file used in the example site from [here](https://github.com/hugo-themes/toha/blob/main/exampleSites/portfolio/data/en/sections/about.yaml).

###### Add other sections

In order to keep this post short, we have splitted it in different posts. Below there's the list of posts that will show you how to configure the other sections:

- [Configuring About Section]({{< relref path="/docs/portfolio/sections/about" lang="en" >}}).
- [Configuring Education Section]({{< relref path="/docs/portfolio/sections/education" lang="en" >}}).
- [Configuring Experiences Section]({{< relref path="/docs/portfolio/sections/experiences" lang="en" >}}).
- [Configuring Projects Section]({{< relref path="/docs/portfolio/sections/projects" lang="en" >}}).
- [Configuring Recent Posts Section]({{< relref path="/docs/portfolio/sections/recent-posts" lang="en" >}}).
- [Configuring Achievements Section]({{< relref path="/docs/portfolio/sections/achievements" lang="en" >}}).
- [Configuring Skills Section]({{< relref path="/docs/portfolio/sections/skills" lang="en" >}}).

#### Add Posts

Now, we are ready add our first post into our site. Here, we are going to add this [introduction post](https://hugo-toha.github.io/posts/introduction/).

- At first, create a `posts` folder inside `content` directory of your site.
- Then, create `_index.md` file inside the `posts` directory. Copy the content of [this file](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/_index.md) file and paste into the newly created `_index.md` file.
- Create `introduction` folder inside your `posts` directory.
- Add the following [hero.svg](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/hero.svg) inside your `introduction` folder.
- Now, create `index.md` file inside the `introduction` folder. This `index.md` file will hold the post contents.
- Add the following [sample contents](https://raw.githubusercontent.com/hugo-toha/hugo-toha.github.io/source/content/posts/introduction/index.md) in the newly created `index.md` file.

Now, your post should appear at `http://localhost:1313/posts` and your `Recent Posts` section also should show this post card. For translating a post, just create a new file with name `index.<language code>.md` in the same directory. Then, add the translated content there.

For more sample posts, please visit [here](https://github.com/hugo-themes/toha/tree/main/exampleSites/portfolio/content/posts).

### What Next

At this point, your site should look similar to the [example site](https://hugo-toha.github.io/). Now, it's time to deploy your site. You can follow the following deployments guides:

- [Deploy in Github Pages]({{< relref path="/docs/getting-started/github-pages" lang="en" >}})
- [Deploy in Netlify]({{< relref path="/docs/getting-started/netlify" lang="en" >}})
