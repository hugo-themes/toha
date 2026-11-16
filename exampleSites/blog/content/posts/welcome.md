---
title: A home for your writing
date: 2026-01-05
description: Start with your latest posts and make the rest of the site your own.
tags: [Toha, Writing]
categories: [Getting started]
---

A personal site can begin with an idea rather than a résumé. This example puts
your writing on the homepage while keeping Toha's familiar post cards and articles.

## Choose a homepage

Set `params.home.layout` to `blog` and enable `params.features.blog.enable` in
your Hugo configuration. The default blog section is `posts`; set
`params.features.blog.section` if you prefer a name such as `journal`.

## Keep writing

Add Markdown files beneath your blog section. The homepage shares its filtering
and order with that section's archive. Hidden pages and pages with a custom layout
stay out of the cards. Pagination links work without JavaScript, and optional
progressive loading adds more posts without leaving the page.
