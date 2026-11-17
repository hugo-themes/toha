---
title: note
linkTitle: note
weight: 140
---

Create a note card with a title. Separate inner cards with three hyphens. Its presentation uses legacy styles.

## Usage

```html
{{</* note title="Notes" */>}}
**First note.**

---
Second note.
{{</* /note */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/note" title="note" >}}

This preview runs the legacy shortcode in a separate frame. Remote embeds and the PDF viewer require network access.

The optional `size` argument adds a `<size>-note` CSS class. The theme does not define size variants; add styles in your site before using this hook.
