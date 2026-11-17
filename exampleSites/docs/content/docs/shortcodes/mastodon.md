---
title: mastodon
linkTitle: mastodon
weight: 160
---

Embed a Mastodon post with user and id, plus an optional server. This loads the remote embed and its script in the reader’s browser.

Compatibility reference for existing sites. These examples are shown as source here and do not load legacy or third-party assets into the modern docs.

## Usage

```go-html-template
{{</* mastodon server="mastodon.social" user="username" id="post-id" */>}}
```
