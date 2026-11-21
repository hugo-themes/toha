---
title: "Code Blocks, Syntax Highlighting, and Folding"
date: 2026-11-08T12:00:00+06:00
description: "Titled code headers, Chroma dual-scheme syntax colors, optional line folding, line numbers, and complete-source copying."
aliases:
  - /posts/code-blocks/
  - /posts/engineering/code-blocks-and-highlighting/
categories: ["Engineering"]
tags: ["Markdown", "Code Blocks", "Layout"]
series: ["Toha Publishing Guide"]
series_weight: 20
---

Code blocks receive compact headers automatically in Toha—showing the language or custom filename alongside a complete-source **Copy** button and optional folding controls configured globally in `hugo.yaml` or overridden per fence.

## Auto-folded long configuration (`previewLines: 8`)

Because `params.features.codeBlock.folding.enable` is `true` with `previewLines: 8`, long blocks show an approachable preview while keeping the full text available to Copy even before expanding:

```yaml {title="hugo.yaml"}
module:
  imports:
    - path: github.com/hugo-toha/toha/v4

params:
  home:
    layout: portfolio
  features:
    componentsDesign:
      enable: true
    portfolio:
      enable: true
      modern:
        enable: true
        navigation: bar
        hero:
          style: photo
        search:
          enable: true
    codeBlock:
      copyButton:
        enable: true
      folding:
        enable: true
        previewLines: 8
```

## Initially expanded with line numbers & custom limit

Use fence attributes like `title="..."`, `data-expand=true`, `data-max-lines=5`, and `linenos=inline` to customize presentation on specific examples:

```go {title="cmd/backup/worker.go" linenos=inline data-expand=true data-max-lines=5}
package backup

import (
	"context"
	"fmt"
	"time"
)

func RunSnapshot(ctx context.Context, volumeID string) error {
	deadline, cancel := context.WithTimeout(ctx, 30*time.Second)
	defer cancel()

	select {
	case <-deadline.Done():
		return fmt.Errorf("snapshot %s timed out: %w", volumeID, deadline.Err())
	default:
		return nil
	}
}
```

## Compact output logs & plain text

Fences without an explicit language get a generic label and can still specify `title` and `data-max-lines`:

``` {title="deploy.log" data-max-lines=3}
[1/4] Generating build statistics (hugo_stats.json)
[2/4] Compiling semantic Tailwind CSS tokens
[3/4] Bundling modern portfolio and blog scripts
[4/4] Built 93 pages cleanly in 1.2s
```

## Short commands stay open

Short snippets under the preview threshold display inline with zero collapse noise:

```sh
mise run portfolio
```
