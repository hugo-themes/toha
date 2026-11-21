---
title: "Modern Components, Callouts, and Responsive Images"
date: 2026-10-24T11:30:00+06:00
description: "Using semantic callouts, badges, disclosures, inline text elements, column splits, and responsive bundle images in posts."
aliases:
  - /posts/shortcodes/
  - /posts/authoring/components-and-callouts/
hero: boat.jpg
heroAlt: "A wooden boat anchored over clear coastal water"
categories: ["Authoring"]
subcategories: ["Components"]
tags: ["Components", "Shortcodes", "Layout"]
series: ["Authoring Rich Content"]
series_weight: 20
---

Enabled modern blog pages unlock Toha's semantic component shortcodes alongside classic theme shortcodes, sharing exact visual tokens across light and dark modes.

## Callouts & legacy alert compatibility

Modern callouts communicate status clearly without heavy visual noise. Use `{{</* callout */>}}` with `info`, `success`, `warning`, or `danger` tones, or pair them with inline `badge` chips: {{< badge label="Modern UI" tone="accent" >}} {{< badge label="Zero Bootstrap" tone="neutral" >}}.

{{< callout title="Semantic styling on demand" tone="success" >}}
Modern component shortcodes render pure Tailwind primitives (`callout`, `badge`, `disclosure`, `button`, `text`) with accessible contrast and keyboard focus states.
{{< /callout >}}

{{< callout title="Check link resolution" tone="warning" >}}
When referencing bundled images inside nested sections, prefer relative filenames like `boat.jpg` so Hugo resolves multilingual paths cleanly.
{{< /callout >}}

Existing legacy posts using `{{</* alert */>}}` continue to work automatically on modern pages:

{{< alert type="info" >}}
Classic `alert` shortcodes adapt seamlessly onto semantic callouts, including legacy `dark`, `primary`, and `secondary` variants.
{{< /alert >}}

## Disclosures & inline semantics

Interactive elements stay accessible without custom JavaScript. Press {{< text kind="kbd" >}}Cmd+K{{< /text >}} (or {{< text kind="kbd" >}}/{{< /text >}}) to search posts anytime, highlight key behavior with {{< text kind="mark" >}}zero-runtime disclosures{{< /text >}}, or annotate domain terms like {{< text kind="abbr" title="Static Site Generator" >}}SSG{{< /text >}}.

{{< disclosure label="Show minimal page front matter for modern blog posts" >}}
```yaml
title: "My Engineering Note"
date: 2026-10-24
categories: ["Authoring"]
tags: ["Components", "Shortcodes"]
series: ["Authoring Rich Content"]
series_weight: 20
```
{{< /disclosure >}}

## Responsive bundle images & wrapping

Images co-located in the post folder resize cleanly and support centered or floated layouts alongside vertical spacing (`vs`).

{{< img src="boat.jpg" width="600" height="400" align="center" title="Wooden boat in calm water" >}}

{{< vs 2 >}}

{{< img src="boat.jpg" height="220" width="360" float="right" title="Floated thumbnail beside prose" >}}

Bundling images directly next to `index.md` eliminates broken root paths across subpath deployments and multilingual routes. When paired with `float="right"`, prose wraps beside the image on desktop viewports and stacks naturally on narrow screens without clipping or horizontal overflow.

{{< vs 2 >}}

## Side-by-side column comparisons (`split`)

### Two-column comparison

{{< split 6 6 >}}

#### Static Pre-rendering

Hugo generates semantic HTML, responsive image variants, and search JSON at build time with predictable performance.

---

#### Progressive Enhancement

Alpine and native `<dialog>` elements enhance keyboard search, disclosures, and code-block copy actions cleanly.

{{< /split >}}

### Three-column summary

{{< split 4 4 4 >}}

#### Accessible

Semantic landmarks, focus-visible rings, and screen-reader statuses.

---

#### Themeable

Balanced surface tokens adapt smoothly between light and dark themes.

---

#### Portable

Write standard Markdown once and switch layouts from `hugo.yaml`.

{{< /split >}}

{{< vs 2 >}}

{{< button label="Continue to Rich Media & Diagrams" page="/posts/diagrams-media-and-embeds" variant="secondary" icon="arrow-right" >}}
