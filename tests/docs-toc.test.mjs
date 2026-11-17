/* eslint-env node */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { mergeProxies } from 'alpinejs/src/scope.js'
import docsToc from '../assets/scripts/modern/toc.js'

const events = () => {
  const listeners = new Map()
  return {
    listeners,
    addEventListener (name, callback, options) { listeners.set(name, { callback, options }) },
    removeEventListener (name, callback) {
      assert.equal(listeners.get(name)?.callback, callback)
      listeners.delete(name)
    },
    dispatch (name, event = {}) { listeners.get(name)?.callback(event) }
  }
}

const fixture = ({ hash = '', observer = true, empty = false } = {}) => {
  const frames = new Map()
  let nextFrame = 0
  const headings = ['first', 'nested', 'café', 'last'].map((id, index) => ({
    id,
    top: 300 + 500 * index,
    margin: 96,
    getBoundingClientRect () { return { top: this.top - window.scrollY } }
  }))
  const link = id => {
    const attributes = new Map([['href', `#${encodeURIComponent(id)}`]])
    return {
      getAttribute: name => attributes.get(name),
      setAttribute: (name, value) => attributes.set(name, value),
      removeAttribute: name => attributes.delete(name),
      closest () { return this }
    }
  }
  // The responsive outlines refer to the same headings, plus invalid targets.
  const links = empty ? [] : [...headings, ...headings].map(heading => link(heading.id))
  links.push(link('outside'), link('missing'), link('%invalid'))
  const documentElement = { scrollHeight: 2800, padding: 96 }
  const window = {
    ...events(),
    scrollY: 0,
    innerHeight: 600,
    location: { hash },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: id => frames.delete(id),
    getComputedStyle: element => ({ scrollPaddingTop: `${element.padding}px`, scrollMarginTop: `${element.margin}px` })
  }
  let resizeObserver
  if (observer) {
    window.ResizeObserver = class {
      constructor (callback) { this.callback = callback; resizeObserver = this }
      observe (element) { this.element = element }
      disconnect () { this.disconnected = true }
    }
  }
  const content = { contains: heading => headings.includes(heading) }
  const document = {
    defaultView: window,
    documentElement,
    getElementById: id => id === 'outside' ? {} : headings.find(heading => heading.id === id)
  }
  const root = {
    ...events(),
    ownerDocument: document,
    querySelector: () => content,
    querySelectorAll: () => links
  }
  const parentCleanup = () => { shell.cleaned = true }
  const shell = { cleanup: parentCleanup }
  // Alpine evaluates a nested component against a merged child/parent scope.
  const toc = mergeProxies([Object.assign(docsToc(), { $el: root }), shell])
  const flush = () => {
    const callbacks = [...frames.values()]
    frames.clear()
    callbacks.forEach(callback => callback())
  }
  const current = () => links.filter(link => link.getAttribute('aria-current') === 'location').map(link => decodeURIComponent(link.getAttribute('href').slice(1)))
  const scroll = position => { window.scrollY = position; window.dispatch('scroll'); flush() }
  toc.init()
  return { toc, shell, parentCleanup, window, documentElement, root, headings, links, frames, flush, current, scroll, resizeObserver }
}

test('TOC follows represented headings up and down, synchronizes both outlines, and uses native anchor offsets', () => {
  const f = fixture()
  f.flush()
  assert.deepEqual(f.current(), ['first', 'first'])
  f.scroll(600) // Nested heading at 200px: below the 96px padding + 96px margin.
  assert.deepEqual(f.current(), ['first', 'first'])
  f.scroll(610)
  assert.deepEqual(f.current(), ['nested', 'nested'])
  f.scroll(1700) // Skip multiple headings in one scroll event.
  assert.deepEqual(f.current(), ['last', 'last'])
  f.scroll(1120)
  assert.deepEqual(f.current(), ['café', 'café'])
  f.scroll(0)
  assert.deepEqual(f.current(), ['first', 'first'])
  // A short final section can never reach the activation line.
  f.headings.at(-1).top = 2650
  f.scroll(2200)
  assert.deepEqual(f.current(), ['last', 'last'])
  assert.deepEqual(f.window.listeners.get('scroll').options, { passive: true })
})

test('TOC handles initial and changed hashes and same-hash links without intercepting navigation', () => {
  const f = fixture({ hash: '#caf%C3%A9' })
  f.flush()
  assert.deepEqual(f.current(), ['café', 'café'])
  f.scroll(0)
  assert.deepEqual(f.current(), ['first', 'first'], 'manual scrolling takes over from the fragment')
  f.window.location.hash = '#nested'
  f.window.dispatch('hashchange')
  f.flush()
  assert.deepEqual(f.current(), ['nested', 'nested'])
  f.root.dispatch('click', { target: f.links[3], button: 0, preventDefault: () => assert.fail('TOC links retain native navigation') })
  f.flush()
  assert.deepEqual(f.current(), ['last', 'last'], 'clicking the current hash also updates a short page')
  for (const extra of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
    f.root.dispatch('click', { target: f.links[0], button: 0, ...extra })
    assert.equal(f.frames.size, 0)
  }
  for (const hash of ['#outside', '#missing', '#%invalid']) {
    f.window.location.hash = hash
    f.window.dispatch('hashchange')
    f.flush()
    assert.deepEqual(f.current(), ['first', 'first'])
  }
  f.documentElement.scrollHeight = 400
  f.scroll(0)
  assert.deepEqual(f.current(), ['first', 'first'], 'a page that fits the viewport is not scrolled to the bottom')
})

test('TOC batches scroll updates and remeasures after resize, content loads, and layout changes', () => {
  const f = fixture()
  f.flush()
  f.window.scrollY = 610
  for (let i = 0; i < 10; i++) f.window.dispatch('scroll')
  assert.equal(f.frames.size, 1)
  f.flush()
  assert.deepEqual(f.current(), ['nested', 'nested'])
  f.documentElement.padding = 0
  f.window.dispatch('resize')
  f.flush()
  assert.deepEqual(f.current(), ['first', 'first'])
  f.headings[1].margin = 200
  f.root.dispatch('load')
  f.flush()
  assert.deepEqual(f.current(), ['nested', 'nested'])
  assert.equal(f.resizeObserver.element, f.root)
  f.headings[1].top = 1000
  f.resizeObserver.callback()
  f.flush()
  assert.deepEqual(f.current(), ['first', 'first'])
})

test('TOC cleanup removes listeners, observer, pending work, and current markers', () => {
  const f = fixture()
  assert.equal(f.shell.cleanup, f.parentCleanup, 'nested TOC must not overwrite the docs shell cleanup')
  f.flush()
  f.window.dispatch('scroll')
  assert.equal(f.frames.size, 1)
  f.toc.destroy()
  assert.equal(f.frames.size, 0)
  assert.equal(f.window.listeners.size, 0)
  assert.equal(f.root.listeners.size, 0)
  assert.equal(f.resizeObserver.disconnected, true)
  assert.deepEqual(f.current(), [])
  assert.equal(f.shell.cleaned, undefined, 'destroying the TOC must not destroy its parent shell')
  f.shell.cleanup()
  assert.equal(f.shell.cleaned, true)
})

test('TOC tolerates missing headings and browsers without ResizeObserver', () => {
  const empty = fixture({ empty: true })
  assert.equal(empty.frames.size, 0)
  assert.equal(empty.window.listeners.size, 0)
  empty.toc.destroy()
  assert.equal(empty.shell.cleaned, undefined)
  const fallback = fixture({ observer: false })
  fallback.scroll(1120)
  assert.deepEqual(fallback.current(), ['café', 'café'])
  fallback.toc.destroy()
})
