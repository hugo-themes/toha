import mermaid from 'mermaid'

// Keep the authored source available without JS and between theme changes.
const nodes = [...document.querySelectorAll('.modern-mermaid')]
const sources = new Map(nodes.map(node => [node, node.textContent]))
let rendering = false
let requested = false

async function render () {
  requested = true
  if (rendering) return
  rendering = true
  try {
    do {
      requested = false
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: document.documentElement.classList.contains('dark') ? 'dark' : 'default'
      })
      for (const node of nodes) {
        node.textContent = sources.get(node)
        node.removeAttribute('data-processed')
        try {
          await mermaid.run({ nodes: [node], suppressErrors: true })
        } catch {
          node.textContent = sources.get(node)
        }
      }
    } while (requested)
  } finally {
    rendering = false
  }
}

render()
new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
