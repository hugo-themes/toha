---
title: Configuring Site Parameters
date: '2020-06-08T06:20:55+06:00'
linkTitle: Site Parameters
weight: 105
aliases:
  - /posts/configuration/site-parameters/
  - /docs/configuration/site-parameters/
---

After installing this theme, when you first run your site, it will start with the default parameters. It should look similar to this example site, but it won't have any sections on the homepage. Don't worry, you can easily add those sections by providing the necessary data files.

In the upcoming posts, I'll guide you on how to add those sections and customize your site. But first, let's start with changing the site parameters. You can modify the background, logo, author information, and enable/disable various features.

For a comprehensive list of available configuration parameters, please refer to the [example site](https://github.com/hugo-toha/hugo-toha.github.io/tree/main).

### Add Background Image

At first, let's set a background on your website. Put your desired background image in the `assets/images` directory. Then add the following in the `params` section of your `hugo.yaml` file.

```yaml
background: "images/name-of-your-background-image.jpg"
# Optional, for a different background image in dark mode
darkBackground: "images/name-of-your-dark-background-image.jpg"
```

### Add Site's Logo

To add logos for your site, you need two different logos: one for the transparent navbar and another for the non-transparent navbar. Place your logos in the `assets/images` directory and add the following code under the `params` section of your `hugo.yaml` file.

```yaml
# The inverted logo will be used in the initial transparent navbar and
# the main logo will be used in the non-transparent navbar.
logo:
  main: images/main-logo.png
  inverted: images/inverted-logo.png
  favicon: images/favicon.png
```

### Enable Blog Post

To enable blog posting on your site, you need to make some changes in the `hugo.yaml` file. Locate the `params.features` section and add the following code:

```yaml
# Enable and configure blog posts
blog:
  enable: true
  showAuthor: true # shows the post author (defaults true)
```

### Enable `Table Of Contents`

Now, if you want to show `Table Of Contents` section in your blog post, you have to enable it in the `params.features` section of `hugo.yaml` file.

```yaml
toc:
  enable: true
```

You can also control the level of your TOC by adding the following configuration in the `markup` section of your `hugo.yaml` file.

```yaml
markup:
  tableOfContents:
    startLevel: 2
    endLevel: 6
    ordered: false
```

Here, we have configured our TOC to show all headings from `h2` to `h6`.

### Enable `<Improve This Page>` Button

If you want to allow readers to easily improve a post by making corrections such as fixing typos or indentation, you can enable the `<Improve This Page>` button. To do this, add your git repository URL in the `params` section of your `hugo.yaml` file.

```yaml
gitRepo: <your site's Github repo URL>
```

This will add a button labeled `Improve This Page` at the bottom of every blog post. The button will route the user directly to the respective edit page in Github.

If your default branch is not named `main`, you need to specify your git default branch in the `params` section of your `hugo.yaml` file.

```yaml
gitBranch: <your git default branch name>
```

### Enable Newsletter

To enable the newsletter feature, you need to provide the necessary parameters under the `params.footer` section in your `hugo.yaml` file. Currently, the newsletter feature only supports the Mailchimp provider. Here is an example of how it should look:

```yaml
newsletter:
  enable: true
  provider: mailchimp
  mailchimpURL: https://github.us1.list-manage.com/subscribe/post?u=19de52a4603135aae97163fd8&amp;id=094a24c76e
```

To disable the newsletter feature, you can set the following configuration:

```yaml
newsletter:
  enable: false
```

### Enable RAW HTML in the Markdown File

If you want to include RAW HTML in your markdown files, you need to enable unsafe rendering. Without enabling this, Hugo will not render the HTML. To enable unsafe markdown rendering, add the following `goldmark` settings to the `markup` section of your `hugo.yaml` file.

```yaml
markup:
  goldmark:
    renderer:
      unsafe: true
```

### Add Author Information

Now, provide your basic information. Create a `author.yaml` file in your `/data/en` directory and add the author information there.

```yaml
# some information about you
name: "Jane Doe"
nickname: "Jane"
image: "images/avatar.png"

# greeting message before your name. it will default to "Hi! I am" if not provided
greeting: "Hi, I am"

# give your contact information. they will be used in the footer
contactInfo:
  email: "janedoe@example.com"
  phone: "+0123456789"
  stack-overflow:
    icon: stack-overflow
    url: "https://stackoverflow.com/users/1/exampleUser"
    text: "ExampleUser"

# a summary of what you do
summary:
- I am a Developer
- I work with Go
- I love to work with some fun projects
```

> Note: The `contactInfo` parameters will use the `icon` field to find the respective icon. Make sure the `icon` field matches the font awesome icon names. You can find examples [here](https://fontawesome.com/search?o=r&f=brands).

### Add Copyright Notice

To add a copyright notice for your site, create a `site.yaml` file in your `/data/en` directory. Add the following section to the file:

```yaml
copyright: © 2024 Copyright.
```

### Site's Description

To add a description of your site that will help search engines find your site, you need to add a `description` section in your `site.yaml` file.

```yaml
# Meta description for your site.  This will help the search engines to find your site.
description: Example site for hugo theme Toha.
```

### Add Custom Menus

To add custom menus in the navbar, you can modify the `site.yaml` file. By default, custom menus are visible in the navigation bar. To hide a custom menu, set the `hideFromNavbar` property to `true`. By default, custom menus are hidden from the footer's navigation area. To show a custom menu item in the footer, set its `showOnFooter` property to `true`. This is particularly helpful when you want to add a link to another site in the navbar.

```yaml
customMenus:
- name: Notes
  url: https://hossainemruz.gitbook.io/notes/
  hideFromNavbar: false
  showOnFooter: true
```

### Change Navbar Title
To change the title appearing on the navbar, you can modify `site.yaml` file. By defauly, the title corresponds to the website name. You can add the following line:

```yaml
navBarTitle: "Title"
```

Now, you can run your site and see the changes. In the upcoming posts, I'll guide you on how to add sections to your homepage and customize your site further.
