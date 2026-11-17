---
title: button
linkTitle: button
aliases:
  - /docs/shortcodes/ui-button/
weight: 70
---

Create a link using page or href, or a disabled action. Named variants are primary, secondary, and ghost. An icon-only control still needs a label.

Requires an enabled modern page.

## Usage

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" */>}}
```

### Preview

{{< button label="Portfolio" page="/docs/portfolio" >}}

## Variations: `secondary`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" variant="secondary" */>}}
```

### Preview

{{< button label="Portfolio" page="/docs/portfolio" variant="secondary" >}}

## Variations: `ghost`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" variant="ghost" */>}}
```

### Preview

{{< button label="Portfolio" page="/docs/portfolio" variant="ghost" >}}

## Variations: `icon`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" */>}}
```

### Preview

{{< button label="Portfolio" page="/docs/portfolio" icon="book" >}}

## Variations: `iconOnly`

```go-html-template
{{</* button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" */>}}
```

### Preview

{{< button label="Portfolio" page="/docs/portfolio" icon="book" iconOnly="true" >}}

## Variations: `disabled`

```go-html-template
{{</* button label="Unavailable action" disabled="true" */>}}
```

### Preview

{{< button label="Unavailable action" disabled="true" >}}
