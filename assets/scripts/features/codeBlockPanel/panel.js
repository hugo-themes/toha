// All copy text comes from original source data, never the highlighter's DOM.
export function initializeCodeBlocks(root, clipboard = globalThis.navigator?.clipboard, settings) {
  if (settings) preparePlainBlocks(root, settings)
  const document = root.ownerDocument || root
  const controllers = []
  root.querySelectorAll('[data-code-block]').forEach((block) => {
    if (block.dataset.initialized) return
    const full = block.querySelector('.code-block-full')
    const dataElement = block.querySelector('.code-block-data')
    if (!full || !dataElement) return
    let data
    try { data = JSON.parse(dataElement.textContent) } catch { return }
    if (typeof data.source !== 'string' || !data.labels) return
    const { labels } = data
    const header = document.createElement('div')
    header.className = 'code-block-header'
    const title = document.createElement('span')
    title.className = 'code-block-title'
    title.textContent = data.title
    header.appendChild(title)
    if (data.language) {
      const language = document.createElement('span')
      language.className = 'code-block-language'
      language.textContent = data.language
      header.appendChild(language)
    }
    const copy = data.copyButton ? document.createElement('button') : null
    if (copy) {
      copy.className = 'code-block-copy'
      copy.type = 'button'
      copy.textContent = labels.copy
      header.appendChild(copy)
    }
    const status = document.createElement('span')
    status.className = 'code-block-status visually-hidden'
    status.setAttribute('role', 'status')
    status.setAttribute('aria-live', 'polite')
    header.appendChild(status)
    block.insertBefore(header, full)

    let preview
    let toggle
    if (data.preview) {
      preview = document.createElement('div')
      preview.className = 'code-block-preview'
      // Only Hugo-generated, escaped highlighting is stored as preview HTML.
      preview.innerHTML = data.preview
      block.appendChild(preview)
    } else if (data.previewSource !== undefined) {
      preview = document.createElement('div')
      preview.className = 'code-block-preview'
      const pre = document.createElement('pre')
      pre.tabIndex = 0
      const code = document.createElement('code')
      code.className = data.codeClass
      code.textContent = data.previewSource
      pre.appendChild(code)
      preview.appendChild(pre)
      block.appendChild(preview)
    }
    if (preview) {
      toggle = document.createElement('button')
      toggle.className = 'code-block-toggle'
      toggle.type = 'button'
      toggle.setAttribute('aria-controls', full.id)
      block.appendChild(toggle)
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') !== 'true'
        expand(expanded)
        if (!expanded && toggle.getBoundingClientRect().top < 0) {
          block.scrollIntoView({ block: 'start' })
        }
      })
      expand(data.expanded === true)
    }
    function expand(expanded) {
      if (!toggle) return
      full.hidden = !expanded
      preview.hidden = expanded
      toggle.setAttribute('aria-expanded', String(expanded))
      const count = data.source.replace(/\n$/, '').split('\n').length
      toggle.textContent = expanded ? labels.showLess : labels.showAll.replace('{count}', String(count))
    }

    if (copy) {
      let feedbackTimer
      copy.addEventListener('click', async () => {
        copy.disabled = true
        clearTimeout(feedbackTimer)
        status.textContent = ''
        try {
          if (!clipboard?.writeText) throw new Error('Clipboard unavailable')
          await clipboard.writeText(data.source)
          copy.textContent = status.textContent = labels.copied
        } catch {
          copy.textContent = status.textContent = labels.copyError
        } finally {
          copy.disabled = false
          feedbackTimer = setTimeout(() => { copy.textContent = labels.copy }, 2000)
        }
      })
    }
    block.dataset.initialized = 'true'
    controllers.push({ full, expand })
  })

  return (hash) => {
    if (!hash) return
    let id
    try { id = decodeURIComponent(hash.slice(1)) } catch { return }
    const target = root.getElementById(id)
    if (!target) return
    controllers.forEach(({ full, expand }) => {
      if (full.contains(target)) {
        expand(true)
        target.scrollIntoView({ block: 'nearest' })
      }
    })
  }
}

// Hugo bypasses render hooks with codeFences:false. Capture plain code before
// highlight.js rewrites it, using the same global settings and localized controls.
function preparePlainBlocks(root, settings) {
  const document = root.ownerDocument || root
  root.querySelectorAll('pre > code').forEach((code, ordinal) => {
    if (code.closest('[data-code-block], .highlight')) return
    const source = code.textContent
    const lines = source.replace(/\n$/, '').split('\n')
    const language = code.getAttribute('data-lang') || code.className.match(/(?:^|\s)language-([^\s]+)/)?.[1] || ''
    const data = {
      source, copyButton: settings.copyButton, labels: settings.labels, codeClass: code.className,
      // With codeFences:false, Hugo can treat a language-less attribute as a type.
      title: /^[\w.+#-]+$/.test(language) ? language : settings.labels.code
    }
    if (settings.folding && lines.length > settings.previewLines) {
      data.previewSource = lines.slice(0, settings.previewLines).join('\n') + '\n'
    }
    const pre = code.parentElement
    const block = document.createElement('div')
    block.className = 'code-block'
    block.setAttribute('data-code-block', '')
    const full = document.createElement('div')
    full.className = 'code-block-full'
    let id = `code-block-plain-${ordinal}`
    while (root.getElementById(id)) id += '-code'
    full.id = id
    pre.parentElement.replaceChild(block, pre)
    full.appendChild(pre)
    block.appendChild(full)
    const script = document.createElement('script')
    script.type = 'application/json'
    script.className = 'code-block-data'
    script.textContent = JSON.stringify(data)
    block.appendChild(script)
  })
}
