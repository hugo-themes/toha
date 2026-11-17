---
title: split
linkTitle: split
weight: 30
---

Split Markdown into columns. Spans use a 12-column grid; separate each column with three hyphens. Modern columns stack on small screens.

Available in legacy and enabled modern pages; each uses its own markup and assets.

## Usage

```html
{{</* split 6 6 */>}}
**Left**

---
**Right**
{{</* /split */>}}
```

### Preview

{{< split 6 6 >}}
**Left**

---
**Right**
{{< /split >}}

## Variations: `4 / 4 / 4`

```html
{{</* split 4 4 4 */>}}
**Left**

---
**Middle**

---
**Right**
{{</* /split */>}}
```

### Preview

{{< split 4 4 4 >}}
**Left**

---
**Middle**

---
**Right**
{{< /split >}}
