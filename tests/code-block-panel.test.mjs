/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))
const script = readFileSync(join(repository, 'assets/scripts/features/codeBlockPanel/panel.js'), 'utf8')
const { initializeCodeBlocks } = await import(`data:text/javascript;base64,${Buffer.from(script).toString('base64')}`)
const normalize = (html) => html.replace(/<[^>]+>/g, (tag) => tag.replace(/(\s[\w-]+)=([^\s"'<>`=]+)/g, '$1="$2"'))
const dataBlocks = (html) => [...html.matchAll(/<script type="application\/json" class="code-block-data">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]))
const prose = (html) => JSON.parse(html.match(/<script id="prose" type="application\/json">([\s\S]*?)<\/script>/)[1])
const configured = (folding) => ({ params: { features: { codeBlock: { folding } } } })
const snippet = 'package main\n\nfunc main() {\n\tprintln("</script><script>& Toha!")\n}\n'
const markdown = `---\ntitle: Code samples\n---\n
\`\`\`go {title="main.go" id="example" linenos=false data-expand=true}
${snippet}\`\`\`

\`\`\`go {title="second.go" data-max-lines=2 anchorlinenos=true lineanchors=probe linenos=inline}
${snippet}\`\`\`

\`\`\` {title="plain.txt"}
first
second
third
fourth
\`\`\`

\`\`\`yaml
short: true
\`\`\`

\`\`\`text
\`\`\`
`.replace(/^\+/gm, '')

function write(directory, name, contents) {
  mkdirSync(dirname(join(directory, name)), { recursive: true })
  writeFileSync(join(directory, name), contents)
}

function fixture(config, verify) {
  const directory = mkdtempSync(join(tmpdir(), 'toha-code-blocks-'))
  try {
    for (const name of ['layouts/_default/_markup/render-codeblock.html', 'layouts/partials/helpers/code-block-options.html', 'layouts/partials/helpers/code-block-labels.html', 'i18n/en.toml', 'i18n/bn.toml', 'i18n/fr.toml']) {
      mkdirSync(dirname(join(directory, name)), { recursive: true })
      copyFileSync(join(repository, name), join(directory, name))
    }
    write(directory, 'hugo.json', JSON.stringify({
      baseURL: 'https://example.org/', defaultContentLanguage: 'en',
      languages: { en: { languageName: 'English' }, bn: { languageName: 'বাংলা' }, fr: { languageName: 'Français' } },
      ...config
    }))
    write(directory, 'layouts/home.html', '{{ .Content }}<script id="prose" type="application/json">{{ dict "plain" .Plain "summary" (.Summary | plainify) "words" .WordCount | jsonify | safeJS }}</script>')
    for (const locale of ['en', 'bn', 'fr']) write(directory, `content/_index.${locale}.md`, markdown)
    const build = (destination) => {
      execFileSync('hugo', ['--source', directory, '--destination', destination, '--minify'], { stdio: 'pipe' })
      return normalize(readFileSync(join(directory, destination, 'index.html'), 'utf8'))
    }
    const html = build('public')
    verify(html, normalize(readFileSync(join(directory, 'public/bn/index.html'), 'utf8')), directory, build)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

function baseline(directory, build) {
  rmSync(join(directory, 'layouts/_default/_markup/render-codeblock.html'))
  return build('baseline')
}

test('code block headers are automatic and have no global enable switch', () => {
  for (const params of [{}, { features: { codeBlock: { enable: false } } }]) {
    fixture({ params }, (html) => {
      const data = dataBlocks(html)
      assert.equal(data.length, 5)
      assert(data.every((block) => block.copyButton === false && !block.preview))
      assert.equal(data[4].source, '')
    })
  }
})

test('new copyButton wins over the backward-compatible copyCodeButton fallback', () => {
  const cases = [
    [{ copyCodeButton: { enable: true } }, true],
    [{ copyCodeButton: { enable: false } }, false],
    [{ copyCodeButton: { services: {} } }, true],
    [{ codeBlock: { copyButton: { enable: true } } }, true],
    [{ codeBlock: { copyButton: { enable: false } } }, false],
    [{ copyCodeButton: { enable: true }, codeBlock: { copyButton: { enable: false } } }, false],
    [{ copyCodeButton: { enable: false }, codeBlock: { copyButton: { enable: true } } }, true]
  ]
  for (const [features, expected] of cases) {
    fixture({ params: { features } }, (html) => {
      assert(dataBlocks(html).every((block) => block.copyButton === expected))
    })
  }
})

test('preview size, short blocks, original source, and localized labels survive minification', () => {
  fixture(configured({ enable: true, previewLines: 3 }), (html, bn) => {
    const data = dataBlocks(html)
    assert.equal(data.length, 5)
    assert.equal(data.filter((b) => b.preview).length, 3)
    assert.equal(data[0].source, snippet)
    assert.equal(data[1].source, snippet)
    assert.equal(data[4].source, '')
    assert.equal(data[0].expanded, true)
    assert.match(data[0].preview, /func/)
    assert.doesNotMatch(data[0].preview, /println/)
    assert.doesNotMatch(data[1].preview, /func/)
    assert.match(dataBlocks(bn)[0].labels.copy, /কপি করুন/)
    assert.equal(data[0].labels.showAll, 'Show all {count} lines')
    assert(!html.includes('<script>& Toha!'))
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
    assert.equal(ids.length, new Set(ids).size)
    assert.doesNotMatch(data[1].preview, /\sid=/)
    assert.doesNotMatch(html, /class="code-block-(header|toggle|preview)"/)
  })
})

test('folding is opt-in and invalid preview sizes fall back to eight', () => {
  for (const folding of [undefined, { enable: false, previewLines: 1 }, { enable: true, previewLines: -1 }, { enable: true, previewLines: 'invalid' }]) {
    fixture(configured(folding), (html) => {
      assert.equal(dataBlocks(html).filter((b) => b.preview).length, folding?.enable ? 1 : 0)
    })
  }
})

test('panel data does not add control labels or duplicate code to Plain, Summary, or word count', () => {
  fixture(configured({ enable: true, previewLines: 2 }), (html, bn, directory, build) => {
    assert.deepEqual(prose(html), prose(baseline(directory, build)))
  })
})

test('table line numbers preserve source and previews never duplicate explicit line anchors', () => {
  fixture({ ...configured({ enable: true, previewLines: 2 }), markup: { highlight: { lineNos: true, lineNumbersInTable: true, anchorLineNos: true, lineAnchors: 'line' } } }, (html) => {
    assert.match(html, /<table/)
    assert.match(html, /id="probe-1"/)
    const data = dataBlocks(html)
    assert(data.filter((b) => b.preview).every((b) => !/\sid=/.test(b.preview)))
    assert.equal(data[0].source, snippet)
  })
})

test('untranslated bundled default locales retain named English controls', () => {
  fixture({ ...configured({ enable: true, previewLines: 2 }), defaultContentLanguage: 'fr' }, (html) => {
    const { labels } = dataBlocks(html)[0]
    assert.equal(labels.copy, 'Copy')
    assert.equal(labels.showAll, 'Show all {count} lines')
    assert(Object.values(labels).every(Boolean))
  })
})

test('codeFences false uses unchanged plain markup for subsequent progressive enhancement', () => {
  fixture({ ...configured({ enable: true, previewLines: 2 }), markup: { highlight: { codeFences: false } } }, (html, bn, directory, build) => {
    assert.equal(dataBlocks(html).length, 0)
    assert.equal(html, baseline(directory, build))
  })
})

// A small DOM harness exercises the actual disclosure/copy handlers without a browser dependency.
function dom() {
  let document
  function node(tag = 'div') {
    const listeners = new Map()
    const attributes = new Map()
    const element = {
      tagName: tag, className: '', dataset: {}, children: [], hidden: false, textContent: '', ownerDocument: document,
      appendChild(child) { child.parentElement?.removeChild(child); this.children.push(child); child.parentElement = this; return child },
      removeChild(child) { this.children.splice(this.children.indexOf(child), 1); child.parentElement = null },
      replaceChild(next, previous) { const index = this.children.indexOf(previous); this.children[index] = next; next.parentElement = this; previous.parentElement = null },
      insertBefore(child, before) { this.children.splice(this.children.indexOf(before), 0, child); child.parentElement = this },
      setAttribute(key, value) { attributes.set(key, value); if (key === 'data-code-block') this.dataset.codeBlock = value },
      getAttribute: (key) => attributes.get(key),
      addEventListener: (event, callback) => listeners.set(event, callback),
      click: () => listeners.get('click')?.(),
      getBoundingClientRect: () => ({ top: 0 }), scrollIntoView() {},
      contains(target) { return this === target || this.children.some((child) => child.contains(target)) },
      querySelectorAll(selector) {
        const descendants = this.children.flatMap((child) => [child, ...child.querySelectorAll('*')])
        return descendants.filter((child) => selector === '*' || (selector === '[data-code-block]' && child.dataset.codeBlock !== undefined) || (selector.startsWith('.') && child.className.split(' ').includes(selector.slice(1))) || (selector === 'pre > code' && child.tagName === 'code' && child.parentElement.tagName === 'pre'))
      },
      querySelector(selector) { return this.querySelectorAll(selector)[0] },
      closest() { for (let current = this; current; current = current.parentElement) if (current.dataset.codeBlock !== undefined || current.className === 'highlight') return current; return null }
    }
    return element
  }
  document = node('document')
  document.createElement = node
  document.getElementById = (id) => document.querySelectorAll('*').find((element) => element.id === id)
  return document
}

const labels = { code: 'Code', copy: 'Copy', copied: 'Copied!', copyError: 'Copy failed. Try again.', showAll: 'Show all {count} lines', showLess: 'Show fewer lines' }

function addBlock(document, { expanded = false, foldable = true, source = snippet } = {}) {
  const block = document.createElement('div')
  block.setAttribute('data-code-block', '')
  const full = document.createElement('div')
  full.className = 'code-block-full'
  full.id = `code-${document.children.length}`
  const anchor = document.createElement('span')
  anchor.id = `line-${document.children.length}`
  full.appendChild(anchor)
  block.appendChild(full)
  const script = document.createElement('script')
  script.className = 'code-block-data'
  script.textContent = JSON.stringify({ source, copyButton: true, title: 'sample.go', labels, expanded, preview: foldable ? '<pre>preview</pre>' : '' })
  block.appendChild(script)
  document.appendChild(block)
  return block
}

test('named keyboard buttons toggle aria-expanded and initialize after an expanded block', () => {
  const document = dom()
  const first = addBlock(document, { expanded: true })
  const second = addBlock(document)
  const reveal = initializeCodeBlocks(document, {})
  const full = second.querySelector('.code-block-full')
  const toggle = second.querySelector('.code-block-toggle')
  assert.equal(first.querySelector('.code-block-full').hidden, false)
  assert.equal(full.hidden, true)
  assert.equal(toggle.hidden, false)
  assert.equal(toggle.getAttribute('aria-expanded'), 'false')
  assert.equal(toggle.getAttribute('aria-controls'), full.id)
  toggle.click()
  assert.equal(full.hidden, false)
  assert.equal(toggle.getAttribute('aria-expanded'), 'true')
  assert.equal(toggle.textContent, 'Show fewer lines')
  toggle.click()
  reveal('#line-1')
  assert.equal(full.hidden, false)
  assert.equal(toggle.getAttribute('aria-expanded'), 'true')
  assert.doesNotThrow(() => reveal('#invalid%'))
})

test('copy preserves all raw source after highlighting and reports retryable errors', async (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] })
  const document = dom()
  const sample = addBlock(document)
  let copied
  let attempts = 0
  initializeCodeBlocks(document, { writeText: async (value) => { if (++attempts === 1) throw new Error('denied'); copied = value } })
  sample.querySelector('.code-block-full').textContent = '001 rewritten highlighted tokens'
  const copy = sample.querySelector('.code-block-copy')
  await copy.click()
  assert.equal(sample.querySelector('.code-block-status').textContent, labels.copyError)
  assert.equal(copy.disabled, false)
  await copy.click()
  assert.equal(copied, snippet)
  assert.equal(sample.querySelector('.code-block-status').textContent, labels.copied)
})

test('plain fences get a single panel and full-source copy before highlighter mutation', async (context) => {
  context.mock.timers.enable({ apis: ['setTimeout'] })
  const document = dom()
  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.className = 'language-go'
  code.textContent = snippet
  pre.appendChild(code)
  document.appendChild(pre)
  let copied
  initializeCodeBlocks(document, { writeText: async (value) => { copied = value } }, { labels, copyButton: true, folding: true, previewLines: 2 })
  assert.equal(document.querySelectorAll('.code-block-copy').length, 1)
  assert.equal(document.querySelector('.code-block-toggle').textContent, 'Show all 5 lines')
  assert.equal(document.querySelector('.code-block-title').textContent, 'go')
  code.textContent = 'rewritten by highlight.js'
  await document.querySelector('.code-block-copy').click()
  assert.equal(copied, snippet)
})

test('plain fences with an attribute token in place of a language use the generic label', () => {
  const document = dom()
  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.className = 'language-{title="output.txt"'
  code.textContent = 'plain text\n'
  pre.appendChild(code)
  document.appendChild(pre)
  initializeCodeBlocks(document, {}, { labels, copyButton: true, folding: true, previewLines: 2 })
  assert.equal(document.querySelector('.code-block-title').textContent, 'Code')
  assert.equal(document.querySelector('.code-block-toggle'), undefined)
})


test('disabling copying keeps the header and folding control', () => {
  const document = dom()
  const sample = addBlock(document)
  const dataElement = sample.querySelector('.code-block-data')
  const data = JSON.parse(dataElement.textContent)
  data.copyButton = false
  dataElement.textContent = JSON.stringify(data)
  initializeCodeBlocks(document, {})
  assert(sample.querySelector('.code-block-header'))
  assert(sample.querySelector('.code-block-toggle'))
  assert.equal(sample.querySelector('.code-block-copy'), undefined)
})
