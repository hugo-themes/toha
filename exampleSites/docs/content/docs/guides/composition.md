---
title: Composing layouts
description: Share the small pieces while giving every layout its own structure.
weight: 10
---

## Design tokens

Tokens describe roles: background, surface, foreground, muted text, borders, and primary actions. Components use those roles instead of choosing their own palette.

## Primitives

A primitive accepts explicit inputs. It does not discover a site’s navigation configuration or read portfolio data. Keep its behavior predictable and document its contract.

## Composed components

Navigation trees and page navigation connect primitives to Hugo’s content model. This is where site settings become component inputs.

## Layouts

The docs shell decides where navigation, the article, and the outline belong. Future layouts will reuse the foundation while owning their own structure.

{{< ui-callout title="Progressive enhancement" >}}
Hugo renders the content and links. Alpine adds theme switching and responsive navigation state. Native disclosures remain usable without JavaScript.
{{< /ui-callout >}}
