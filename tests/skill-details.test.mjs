/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))
const script = readFileSync(join(repository, 'assets/scripts/sections/skill-details.js'), 'utf8')
const { initializeSkillDetails } = await import(`data:text/javascript;base64,${Buffer.from(script).toString('base64')}`)
const normalize = (html) => html.replace(/<[^>]+>/g, (tag) => tag.replace(/(\s[\w-]+)=([^\s"'<>`=]+)/g, '$1="$2"'))

function write (directory, name, content) {
  mkdirSync(dirname(join(directory, name)), { recursive: true })
  writeFileSync(join(directory, name), content)
}

test('Hugo renders opt-in, text-only details outside the grid with unique IDs and localized controls', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-skill-details-'))
  try {
    for (const name of ['layouts/partials/sections/skills.html', 'layouts/partials/cards/skill.html', 'layouts/partials/cards/skill-content.html', 'layouts/partials/cards/skill-details.html', 'layouts/partials/misc/skill-details-tree.html', 'layouts/partials/helpers/skill-details.html', 'i18n/en.toml', 'i18n/bn.toml', 'i18n/fr.toml']) {
      mkdirSync(dirname(join(directory, name)), { recursive: true })
      copyFileSync(join(repository, name), join(directory, name))
    }
    const skills = [
      { name: 'Existing', url: 'https://example.org/existing', icon: 'fa fa-code', summary: 'Existing summary.' },
      ...[{}, false, { summary: '  ', items: [] }, { items: [{}, { name: ' ' }] }].map((details) => ({ name: 'Empty', summary: 'No details.', details })),
      { name: 'একই নাম', url: 'https://example.org/cloud', summary: 'Card summary.', details: { summary: 'An **introduction**.', items: [
        { name: 'AWS', summary: '[Evidence](https://example.org/evidence)', items: [
          { name: 'Compute', items: [{ name: 'Scaling', items: [{ name: 'A very long capability name at the fourth level', summary: 'Deep descriptive content.' }] }] },
          { name: 'Name-only leaf', items: [] }
        ] },
        { name: '<script>unsafe()</script>', summary: 'Escaped name.' }
      ] } },
      { name: 'একই নাম', details: { summary: 'Introduction without items.' } }
    ]
    write(directory, 'hugo.json', JSON.stringify({ baseURL: 'https://example.org/', languages: { en: { languageName: 'English' }, bn: { languageName: 'বাংলা' }, fr: { languageName: 'Français' } } }))
    write(directory, 'data/fixture.json', JSON.stringify({ skills }))
    write(directory, 'layouts/home.html', '{{ partial "sections/skills.html" (dict "section" (dict "name" "Skills" "id" "skills" "filter" true) "skills" site.Data.fixture.skills) }}{{ partial "sections/skills.html" (dict "section" (dict "name" "দক্ষতা" "id" "দক্ষতা") "skills" site.Data.fixture.skills) }}')
    execFileSync('hugo', ['--source', directory, '--minify'], { stdio: 'pipe' })
    const html = normalize(readFileSync(join(directory, 'public/index.html'), 'utf8'))
    assert.equal((html.match(/data-skill-details-target=/g) || []).length, 4)
    assert.equal((html.match(/data-skill-details(?:[ >])/g) || []).length, 4)
    assert.match(html, /href="https:\/\/example.org\/existing"/)
    assert.match(html, /href="https:\/\/example.org\/cloud"[^>]*>একই নাম<\/a>/)
    assert.match(html, /href="#skills-skill-5" data-skill-details-target="skills-skill-5"/)
    assert.match(html, /<strong>introduction<\/strong>/)
    assert.match(html, /Introduction without items/)
    assert.match(html, /Name-only leaf/)
    assert.match(html, /Deep descriptive content/)
    assert.match(html, /Within Scaling/)
    assert.match(html, /&lt;script(?:&gt;|>)unsafe\(\)&lt;\/script(?:&gt;|>)/)
    assert.doesNotMatch(html, /<script>|<dialog|role="(?:meter|progressbar)"/)
    for (const summary of html.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)) assert.doesNotMatch(summary[1], /<a\b/)
    assert.match(html, /<a href="https:\/\/example.org\/evidence">Evidence<\/a>/)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1])
    assert.equal(ids.length, new Set(ids).size)
    assert(html.indexOf('data-skill-details>') > html.indexOf('id="skill-card-holder"'))
    // A dialog trigger may never be nested inside the existing external link.
    for (const anchor of html.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)) assert.doesNotMatch(anchor[1], /<a\b|<button\b/)
    const bn = readFileSync(join(directory, 'public/bn/index.html'), 'utf8')
    const fr = readFileSync(join(directory, 'public/fr/index.html'), 'utf8')
    assert.match(bn, /বিস্তারিত দেখুন/)
    assert.match(bn, /দক্ষতার বিস্তারিত বন্ধ করুন/)
    assert.match(fr, /View details/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

// Exercise progressive enhancement, fallback navigation, and close behavior without a browser dependency.
function dom (supported = true) {
  const elements = []
  const document = {
    createElement (tagName) {
      const listeners = new Map()
      const attributes = new Map()
      const classes = new Set()
      const node = {
        tagName, id: '', className: '', dataset: {}, childNodes: [], parentNode: null, hidden: false, open: false,
        classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name), contains: (name) => classes.has(name) },
        setAttribute (name, value) { attributes.set(name, value) },
        getAttribute: (name) => attributes.get(name),
        addEventListener (type, callback) { listeners.set(type, [...(listeners.get(type) || []), callback]) },
        dispatch (type, properties = {}) { for (const callback of listeners.get(type) || []) callback({ target: node, ...properties }) },
        append (...children) { for (const child of children) this.appendChild(child) },
        appendChild (child) {
          if (child.parentNode) child.parentNode.childNodes.splice(child.parentNode.childNodes.indexOf(child), 1)
          child.parentNode = this
          this.childNodes.push(child)
          return child
        },
        before (child) { const parent = this.parentNode; parent.childNodes.splice(parent.childNodes.indexOf(this), 0, child); child.parentNode = parent },
        replaceWith (child) { const parent = this.parentNode; parent.childNodes.splice(parent.childNodes.indexOf(this), 1, child); child.parentNode = parent; this.parentNode = null },
        querySelector: () => document.close,
        focus () { document.activeElement = this },
        getBoundingClientRect: () => ({ left: 100, right: 600, top: 100, bottom: 600 })
      }
      if (tagName === 'dialog' && supported) {
        node.showModal = () => { node.open = true }
        node.close = () => { node.open = false; node.dispatch('close') }
      }
      elements.push(node)
      return node
    },
    querySelectorAll (selector) {
      if (selector === '[data-skill-details]') return [document.content]
      if (selector === '[data-skill-details-target]') return document.link.parentNode ? [document.link] : []
      return []
    }
  }
  document.documentElement = document.createElement('html')
  document.card = document.createElement('article')
  document.content = document.createElement('section')
  document.content.id = 'skills-skill-0'
  document.content.setAttribute('aria-labelledby', 'skills-skill-0-title')
  document.link = document.createElement('a')
  document.link.className = 'skill-details-trigger'
  document.link.dataset.skillDetailsTarget = document.content.id
  document.label = document.createElement('span')
  document.link.append(document.label)
  document.card.append(document.link)
  document.documentElement.append(document.card, document.content)
  document.close = document.createElement('button')
  document.close.hidden = true
  document.content.append(document.close)
  return { document, elements }
}

test('unsupported browsers retain the in-flow section, details link, and hidden close control', () => {
  const { document } = dom(false)
  initializeSkillDetails(document)
  assert.equal(document.link.parentNode, document.card)
  assert.equal(document.content.parentNode, document.documentElement)
  assert.equal(document.close.hidden, true)
})

test('supported browsers enhance links to buttons and restore focus and scroll after closing', () => {
  const { document, elements } = dom()
  initializeSkillDetails(document)
  const button = document.card.childNodes[0]
  const dialog = document.content.parentNode
  assert.equal(button.tagName, 'button')
  assert.equal(button.getAttribute('aria-controls'), dialog.id)
  assert.equal(button.getAttribute('aria-haspopup'), 'dialog')
  assert.equal(button.childNodes[0], document.label)
  assert.equal(dialog.getAttribute('aria-labelledby'), 'skills-skill-0-title')
  assert.equal(dialog.open, false)
  assert.equal(document.close.hidden, false)
  button.dispatch('click')
  assert.equal(dialog.open, true)
  assert.equal(document.activeElement, document.close)
  assert(document.documentElement.classList.contains('skill-details-open'))
  document.close.dispatch('click')
  assert.equal(dialog.open, false)
  assert.equal(document.activeElement, button)
  assert(!document.documentElement.classList.contains('skill-details-open'))
  button.dispatch('click')
  dialog.close() // Native Escape dispatches the same close event.
  assert.equal(document.activeElement, button)
  assert(!document.documentElement.classList.contains('skill-details-open'))
  initializeSkillDetails(document)
  assert.equal(elements.filter((element) => element.tagName === 'dialog' && element.id).length, 1)
})

test('only a backdrop press followed by a backdrop click closes the dialog', () => {
  const { document } = dom()
  initializeSkillDetails(document)
  document.card.childNodes[0].dispatch('click')
  const dialog = document.content.parentNode
  dialog.dispatch('pointerdown', { clientX: 120, clientY: 120 })
  dialog.dispatch('click', { clientX: 10, clientY: 10 })
  assert.equal(dialog.open, true, 'dragging out of the content must not close it')
  dialog.dispatch('pointerdown', { clientX: 10, clientY: 10 })
  dialog.dispatch('click', { clientX: 10, clientY: 10 })
  assert.equal(dialog.open, false)
})
