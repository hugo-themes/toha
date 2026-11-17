---
title: Shortcodes
date: '2020-06-08T08:06:25+06:00'
description: Shortcodes
hero: boat.jpg
linkTitle: Shortcodes
weight: 90
aliases:
  - /posts/shortcodes/
---

Reusable Markdown adapters for content and modern components. Choose a shortcode below; the original live demonstrations follow.

- [alert]({{< relref "/docs/shortcodes/alert" >}})
- [img]({{< relref "/docs/shortcodes/img" >}})
- [split]({{< relref "/docs/shortcodes/split" >}})
- [vs]({{< relref "/docs/shortcodes/vs" >}})
- [video]({{< relref "/docs/shortcodes/video" >}})
- [mermaid]({{< relref "/docs/shortcodes/mermaid" >}})
- [ui-button]({{< relref "/docs/shortcodes/ui-button" >}})
- [ui-badge]({{< relref "/docs/shortcodes/ui-badge" >}})
- [ui-callout]({{< relref "/docs/shortcodes/ui-callout" >}})
- [ui-disclosure]({{< relref "/docs/shortcodes/ui-disclosure" >}})
- [ui-text]({{< relref "/docs/shortcodes/ui-text" >}})
- [embed-pdf]({{< relref "/docs/shortcodes/embed-pdf" >}})
- [rimg]({{< relref "/docs/shortcodes/rimg" >}})
- [note]({{< relref "/docs/shortcodes/note" >}})
- [gist]({{< relref "/docs/shortcodes/gist" >}})
- [mastodon]({{< relref "/docs/shortcodes/mastodon" >}})


This is a sample post intended to test the followings:

- Default hero image.
- Different shortcodes.

## Alert

The following alerts are available in this theme.

#### Success

**Code:**

```markdown
{{</* alert type="success" */>}}
This is sample alert with `type="success"`.
{{</* /alert */>}}
```

**Result:**

{{< alert type="success" >}}
This is sample alert with `type="success"`.
{{< /alert >}}

#### Danger

**Code:**

```markdown
{{</* alert type="danger" */>}}
This is sample alert with `type="danger"`.
{{</* /alert */>}}
```

**Result:**

{{< alert type="danger" >}}
This is sample alert with `type="danger"`.
{{< /alert >}}

#### Warning

**Code:**

```markdown
{{</* alert type="warning" */>}}
This is sample alert with `type="warning"`.
{{</* /alert */>}}
```

**Result:**

{{< alert type="warning" >}}
This is sample alert with `type="warning"`.
{{< /alert >}}

#### Info

**Code:**

```markdown
{{</* alert type="info" */>}}
This is sample alert with `type="info"`.
{{</* /alert */>}}
```

**Result:**

{{< alert type="info" >}}
This is sample alert with `type="info"`.
{{< /alert >}}

## Image

#### A sample image without any attribute.

**Code:**

```markdown
{{</* img src="boat.jpg" title="A boat at the sea" */>}}
```

**Result:**

{{< img src="boat.jpg" title="A boat at the sea" >}}

{{< vs 3 >}}

#### A sample image with `height` and `width` attributes.

**Code:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" title="A boat at the sea" */>}}
```

**Result:**

{{< img src="boat.jpg" height="400" width="600" title="A boat at the sea" >}}

{{< vs 3 >}}

#### A center aligned image with `height` and `width` attributes.

**Code:**

```markdown
{{</* img src="boat.jpg" height="400" width="600" align="center" title="A boat at the sea" */>}}
```

**Result:**

{{< img src="boat.jpg" height="400" width="600" align="center" title="A boat at the sea" >}}

{{< vs 3 >}}

#### A image with `float` attribute.

**Code:**

```markdown
{{</* img src="boat.jpg" height="200" width="500" float="right" title="A boat at the sea" */>}}
```

**Result:**

{{< img src="boat.jpg" height="200" width="500" float="right" title="A boat at the sea" >}}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies. Praesent tellus risus, eleifend vel efficitur ac, venenatis sit amet sem. Ut ut egestas erat. Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat. Suspendisse nec ipsum eu erat finibus dictum. Morbi volutpat nulla purus, vel maximus ex molestie id. Nullam posuere est urna, at fringilla eros venenatis quis.

Fusce vulputate dolor augue, ut porta sapien fringilla nec. Vivamus commodo erat felis, a sodales lectus finibus nec. In a pulvinar orci. Maecenas suscipit eget lorem non pretium. Nulla aliquam a augue nec blandit. Curabitur ac urna iaculis, ornare ligula nec, placerat nulla. Maecenas aliquam nisi vitae tempus vulputate.

## Split

This theme support splitting the page into as many columns as you wish.

#### Two column split

**Code:**

```markdown
{{</* split 6 6 */>}}
##### Left Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Right Column

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Result:**

{{< split 6 6>}}

##### Left Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Right Column

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

#### Three column split

**Code:**

```markdown
{{</* split 4 4 4 */>}}
##### Left Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Middle Column

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Right Column

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{</* /split */>}}
```

**Result:**

{{< split 4 4 4 >}}

##### Left Column

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras egestas lectus sed leo ultricies ultricies.

---
##### Middle Column

Aenean dignissim dictum ex. Donec a nunc vel nibh placerat interdum.

---
##### Right Column

Fusce ut leo turpis. Morbi consectetur sed lacus vitae vehicula. Cras gravida turpis id eleifend volutpat.

{{< /split >}}

## Vertical Space

Give vertical space between two lines.

**Code:**

```markdown
This is line one.
{{</* vs 4*/>}}
This is line two. It should have `4rem` vertical space with previous line.
```

**Result:**

This is line one.
{{< vs 4>}}
This is line two. It should have `4rem` vertical space with previous line.

## Video

**Code:**

```markdown
{{</* video src="/videos/sample.mp4" */>}}
```

**Result:**

{{< video src="/videos/sample.mp4" >}}

<!-- markdown-link-check-disable-next-line -->
Video by [Rahul Sharma](https://www.pexels.com/@rahul-sharma-493988) from [Pexels](https://www.pexels.com).
