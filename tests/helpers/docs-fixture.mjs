/* eslint-env node */

// A small contract fixture stays independent of the growing official docs corpus.
export function writeDocsFixture (write) {
  write('content/docs/_index.md', '---\ntitle: Introduction\nlinkTitle: Documentation\ncascade:\n  type: docs\n---\n## Introduction\nComponent documentation.')
  write('content/docs/getting-started.md', '---\ntitle: Quick start\nweight: 10\n---\n## Install\nStart here.')
  write('content/docs/components.md', `---
title: Component gallery
weight: 20
---
## Components
{{< ui-button label="Quick start" page="/docs/getting-started" >}}
{{< ui-button label="Compose layouts" page="/docs/guides/composition" >}}
{{< ui-button label="Documentation overview" page="/docs" icon="book" iconOnly="true" >}}
{{< ui-button label="Unavailable action" disabled="true" >}}
{{< ui-badge label="Shared primitive" >}}
{{< ui-callout title="Callout" >}}**Rendered content**{{< /ui-callout >}}
{{< ui-disclosure label="An initially expanded disclosure" open="true" >}}Content{{< /ui-disclosure >}}
`)
  write('content/docs/guides/_index.md', '---\ntitle: Guides\nweight: 30\n---\n## Guides\nLayout composition.')
  write('content/docs/guides/composition.md', '---\ntitle: Composing layouts\nweight: 10\n---\n## Primitives\nExplicit inputs.')
}
