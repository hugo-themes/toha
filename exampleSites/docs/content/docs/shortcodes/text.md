---
title: text
linkTitle: text
aliases:
  - /docs/shortcodes/ui-text/
weight: 110
---

Render plain inline text with one of the fixed kinds: abbr, kbd, mark, sub, or sup. Use title for the expansion of an abbreviation.

Requires an enabled modern page.

## Usage

```go-html-template
{{</* text kind="abbr" title="HyperText Markup Language" */>}}HTML{{</* /text */>}}
```

### Preview

{{< text kind="abbr" title="HyperText Markup Language" >}}HTML{{< /text >}}

## Variations: `kbd`

```go-html-template
{{</* text kind="kbd" */>}}Esc{{</* /text */>}}
```

### Preview

{{< text kind="kbd" >}}Esc{{< /text >}}

## Variations: `mark`

```go-html-template
{{</* text kind="mark" */>}}Highlight{{</* /text */>}}
```

### Preview

{{< text kind="mark" >}}Highlight{{< /text >}}

## Variations: `sub`

```go-html-template
{{</* text kind="sub" */>}}2{{</* /text */>}}
```

### Preview

{{< text kind="sub" >}}2{{< /text >}}

## Variations: `sup`

```go-html-template
{{</* text kind="sup" */>}}2{{</* /text */>}}
```

### Preview

{{< text kind="sup" >}}2{{< /text >}}
