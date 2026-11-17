---
title: Creating Category
date: '2020-06-08T06:15:55+06:00'
author:
  name: Md.Habibur Rahman
  image: /images/author/habib.jpg
linkTitle: Creating Category
weight: 10
aliases:
  - /posts/writing-posts/organizing/category/
  - /docs/writing-posts/organizing/category/
---

First, we need to understand how to create a post then we will be able to create categories.

## Post Creation

To create a post in your blog first you need to go to the folder named `posts`. Here, create a file `_index.md`(The file name has to be exactly the same as it is mentioned). Then open the file and add below lines:


    ---
    title: Posts
    ---
now, save and close the file. Now, Suppose, you want to write a post. First, create a file, name it with a markdown extension at the end. For example: we've created a file named `analytics-and-comments.md` and added the below lines of contents:


    ---
    title: "Analytics and Comments"
    date: 2020-06-08T06:00:23+06:00
    hero: /images/posts/writing-posts/analytics.svg
    description: Adding analytics and disquss comment in hugo
    theme: Toha
    menu:
      sidebar:
        name: Analytics & Comments
        identifier: analytics-and-comments
        weight: 500
    ---

    ### Complete Post Coming Soon...

As we know that, the header part of this file which starts and ends with 3 horizontal hyphen(`---`) is called the front-matter and every blog post that we write needs to be a front matter included there. Let's understand what are the parameters actually mean:


**title:** This is the title of your post.

**date:** This is the time that shows the posting time of your blog. The first portion is in the `year-month-date format`. You can edit the date and time as you wish.

**hero:** Here, you need to include the location path of the cover photo of your post. Go to the `static` folder and create a folder named `images`(If you don't have) then inside this folder create another folder called `posts` and inside this, we created a folder named `writing-posts` where we put the image file `analytics.svg`. Now copy the path and add it to the `hero` parameter as mentioned above.

**description:** Add any description you like.

**menu:** This section contains another parameter called `sidebar` which actually displays how the file structure in the sidebar is going to look, and under this we have:

**name:** This defines what would be the name of the document in sidebar file hierarchy

**identifier:** This helps to distinguish the file from other files and helps in terms of category creation.

**weight:** A value is assigned to this param as a weight value and for multiple files, the documents will appear in the file hierarchy based on this weight value in ascending order.</


after the front-matter, you can write any content following the markdown rules.

The following image shows how the contents of `analytics-and-comments.md` are mapped into the sidebar section.


![Image1](https://dev-to-uploads.s3.amazonaws.com/i/5klx1docgxewhxeo9sgi.png)

> In the above figure- Features, Installation, Configuration, Writing Posts, Customizing, Short Codes, etc are folders created just for other posts.

## Category Creation

As we have created one `_index.md` file and one blog post markdown file previously, now to create a category, we need to create a folder. We created a folder called `getting-started` and inside this folder, we again need to create a `_index.md` file which contains the front-matter as below:


```
---
title: Deploy Site
menu:
  sidebar:
    name: Deploy Site
    identifier: getting-started
    weight: 300
---
```
The meaning of each parameter in the above code block has been discussed earlier. Just, for the time being, keep in mind that we are going to create the category name as `getting-started` that's why we included it as an identifier in this `_index.md` file but you can give any name you want. Next, we are going to create a markdown file called `github-pages.md` which will be our blog post file for this folder. Our `github-pages.md` includes the following lines:


```
---
title: "Deploy site in Github Pages"
date: 2020-06-08T06:00:20+06:00
hero: /images/posts/writing-posts/git.svg
menu:
  sidebar:
    name: Github Pages
    identifier: getting-started-github
    parent: getting-started
    weight: 10
---
### Complete Post Coming Soon...
```
We already know about the parameters used here, but we have one new parameter this time included which is `parent` and If we notice we will understand that the value of this param and the value of `identifier` param in the `_index.md` file inside this folder are both the same. We have to be careful that both of these parameter value matches. Now, you can add as many posts and categories as you want following the above-mentioned procedure. This is how we create categories.


The following image shows how the contents are mapped into the sidebar section.

![Image2](https://dev-to-uploads.s3.amazonaws.com/i/cso16yy6wf89eywgbufb.png)

## Customizing post's author information

By default, the post should use author information from `hugo.yaml`. If you want to overwrite the default author information, just add following author section in the front-matter:

```yaml
author:
  name: Md.Habibur Rahman
  image: /images/authors/habib.jpg
```

Your final front-matter should look-like:

```yaml
title: "Creating Category"
date: 2020-06-08T06:15:55+06:00
# hero: images/background/flower.jpg
author:
  name: Md.Habibur Rahman
  image: /images/authors/habib.jpg
menu:
  sidebar:
    name: Creating Category
    identifier: writing-post-category-create
    parent: writing-post-category
    weight: 10
```
