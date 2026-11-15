---
title: Search and edit links
description: Add search and source links without changing the default portfolio.
weight: 20
---

## Enable documentation search

Search is optional. Enable it in your site configuration:

```yaml
params:
  features:
    docs:
      enable: true
      search:
        enable: true
```

Click the search icon to the left of the theme toggle to open the search
dialog. Results include page titles and article text in the current language,
including nested guides. Results show their location in the documentation and
highlight matching text. Use Down/Up Arrow or Tab to focus a result, then press
Enter to open it. Escape,
the close button, or a click outside the dialog dismisses it and returns focus
to the search icon. With JavaScript disabled, the navigation links remain
available.

The index downloads when you first search. If it cannot load, use **Try again**.
Up to eight matches appear, with title matches ranked ahead of article matches.

To omit a page from the search index, put this in its front matter:

```yaml
docs:
  search: false
```

This controls discovery only; the page remains published and accessible by URL.
Blog posts, drafts, and pages without published HTML are excluded from the
production docs index. A development build with drafts enabled includes them.

## Link to the source

Set an edit URL pointing to the **content directory** in your repository:

```yaml
params:
  features:
    docs:
      edit:
        enable: true
        baseURL: https://github.com/your-name/your-site/edit/main/content/
```

Toha appends the page's source path, such as `docs/getting-started.md` or
`docs/getting-started.fr.md`. The URL must use HTTP or HTTPS. Generated pages
without a source file have no edit link.

Override the URL for a page, or disable its edit action:

```yaml
docs:
  editURL: https://github.com/your-name/another-repository/edit/main/guide.md
  # Set edit: false to hide the action for this page.
```

Both search and edit links are disabled by default. These settings apply to the
modern docs layout and leave the portfolio and existing blog search unchanged.
