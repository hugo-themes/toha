---
title: Component gallery
description: Small building blocks with explicit inputs and consistent behavior.
weight: 20
---

## Buttons and links

Navigation uses a real link. Actions use a real button. Every control has a label, including icon-only controls.

{{< ui-button label="Read the quick start" page="/docs/getting-started" icon="arrow-right" >}}
{{< ui-button label="Explore composition" page="/docs/guides/composition" variant="secondary" >}}
{{< ui-button label="Documentation overview" page="/docs" variant="ghost" icon="book" iconOnly="true" >}}

An unavailable action uses a disabled button:

{{< ui-button label="Unavailable action" disabled="true" variant="secondary" >}}

## Badges

{{< ui-badge label="Shared primitive" >}}
{{< ui-badge label="Opt-in" tone="accent" >}}

Badges provide short supporting labels. They do not add an interactive role.

## Callouts

{{< ui-callout title="One implementation, multiple uses" >}}
This callout is rendered by the same partial available to layouts. Its shortcode only adapts Markdown into component inputs. You can use **emphasis**, `inline code`, and [links](../getting-started/) in the content.
{{< /ui-callout >}}

## Disclosure

{{< ui-disclosure label="What makes this component accessible?" >}}
A native `details` element provides disclosure behavior. Focus its summary with the keyboard, then press Enter or Space to toggle it. This also works with JavaScript disabled.
{{< /ui-disclosure >}}

{{< ui-disclosure label="An initially expanded disclosure" open="true" >}}
Use an explicit input when content should start expanded.
{{< /ui-disclosure >}}

## Typography

### Readable by default

Body text, lists, tables, links, and code share semantic colors in light and dark mode. The theme switcher follows your system preference until you choose a mode.

| Building block | Responsibility |
| --- | --- |
| Token | A shared visual decision |
| Primitive | A small semantic element |
| Composition | Several primitives working together |
| Layout | The structure of a page |

```html
<article>
  <h1>Content comes first</h1>
  <p>Hugo renders the page. Alpine enhances interaction.</p>
</article>
```
