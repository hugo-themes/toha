---
title: "Code blocks"
date: 2026-01-22
description: "Code previews, complete-source copying, and optional folding."
menu:
  sidebar:
    name: Code blocks
    identifier: code-blocks
    weight: 40
---

The optional code panel adds a compact header and Copy button. Enable
`params.features.codeBlockPanel.enable` and `folding.enable` in your site
configuration to try the previews below. Set `folding.previewLines` to control
how many lines remain visible. Both features are disabled by default.

## A long example

Copy includes the complete configuration, even while only its preview is visible.

```yaml {title="hugo.yaml"}
baseURL: "https://example.com/"
languageCode: "en-us"
title: "My portfolio"

params:
  features:
    codeBlockPanel:
      enable: true
      folding:
        enable: true
        previewLines: 8

  footer:
    enable: true
    newsletter:
      enable: false
```

## Initially expanded, without line numbers

This block starts expanded and can still be folded. Its Copy button preserves
the complete source without relying on the highlighted markup.

```go {title="main.go" linenos=false data-expand=true data-max-lines=3}
package main

import "fmt"

func main() {
    fmt.Println("Hello, Toha!")
}
```

## Plain text

Code without a language supports the same controls.

``` {title="output.txt" data-max-lines=2}
Starting build…
Loading configuration
Rendering pages
Writing assets
Build complete
```

## A short snippet

Short examples stay fully visible.

```sh
echo "Hello, Toha!"
```
