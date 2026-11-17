---
title: mastodon
linkTitle: mastodon
weight: 160
---

Embed a Mastodon post with user and id, plus an optional server. This loads the remote embed and its script in the reader’s browser.

## Usage

```go-html-template
{{</* mastodon server="mastodon.social" user="Mastodon" id="117625790631441803" */>}}
```

### Preview

{{< docs-preview page="/shortcode-previews/mastodon" title="mastodon" >}}

This preview runs the legacy shortcode in a separate frame. Remote embeds and the PDF viewer require network access.

[Open the example post if the embed is unavailable](https://mastodon.social/@Mastodon/117625790631441803).
