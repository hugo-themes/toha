/* eslint-env node */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { runInNewContext } from 'node:vm'

const source = readFileSync(new URL('../assets/scripts/features/lazyLoadPosts/lazyLoadPosts.js', import.meta.url), 'utf8')

function element (properties = {}) {
  return {
    attributes: {}, childNodes: [], dataset: {}, disabled: false, hidden: true,
    classList: { remove () {} },
    setAttribute (key, value) { this.attributes[key] = value },
    append (...children) { this.childNodes.push(...children) },
    replaceChildren (...children) { this.childNodes = children },
    ...properties
  }
}

function harness ({ observer = true, readyState = 'loading', fetchSupport = true } = {}) {
  const button = element({ addEventListener: (event, callback) => { button.click = callback } })
  const status = element({ textContent: '' })
  const container = element({ childNodes: ['first-page'] })
  const pagination = element({ childNodes: ['page-1-links'] })
  const controls = element({
    dataset: { nextUrl: '/subpath/bn/posts/page/2/', loading: 'loading', loaded: 'loaded', complete: 'complete', error: 'error' },
    querySelector: selector => selector === 'button' ? button : status
  })
  const observed = []
  const requests = []
  const pages = new Map()
  const callbacks = {}
  const context = {
    window: {},
    document: {
      readyState,
      addEventListener: (event, callback) => { callbacks[event] = callback },
      getElementById: id => ({ 'lazy-load-controls': controls, 'post-card-holder': container, 'post-pagination': pagination })[id]
    },
    DOMParser: class { parseFromString (text) { return pages.get(text) } },
    fetch: async url => {
      requests.push(url)
      return context.respond(url)
    },
    respond: async url => ({ ok: true, text: async () => url })
  }
  context.window.DOMParser = context.DOMParser
  if (fetchSupport) context.window.fetch = context.fetch
  if (observer) {
    context.IntersectionObserver = class {
      constructor (callback) { callbacks.intersect = callback }
      observe (node) { observed.push(node) }
      unobserve (node) { observed.splice(observed.indexOf(node), 1) }
    }
    context.window.IntersectionObserver = context.IntersectionObserver
  }
  const addPage = (url, names, nextUrl = '') => {
    const cards = names.map(name => {
      const anchor = { focus: () => { card.focused = true } }
      const card = { name, querySelector: () => anchor }
      return card
    })
    pages.set(url, {
      querySelectorAll: () => cards,
      getElementById: id => id === 'post-pagination'
        ? element({ childNodes: [`links-for-${url}`] })
        : nextUrl ? element({ dataset: { nextUrl } }) : null
    })
    return cards
  }
  runInNewContext(source.replace('export { LazyLoadPosts }', ''), context)
  if (readyState === 'loading') callbacks.DOMContentLoaded()
  return { context, controls, button, status, container, pagination, observed, requests, callbacks, addPage, loader: controls.lazyLoadPosts }
}

test('fetches only on demand, one bounded page at a time, and blocks concurrent loads', async () => {
  const h = harness()
  const secondUrl = h.controls.dataset.nextUrl
  const thirdUrl = '/subpath/bn/posts/page/3/'
  const second = h.addPage(secondUrl, ['A', 'B'], thirdUrl)
  h.addPage(thirdUrl, ['C'])
  assert.deepEqual(h.requests, [], 'initialization must not download the archive')
  const pending = h.loader.loadNextPage()
  await h.loader.loadNextPage()
  assert.equal(h.button.disabled, true)
  assert.equal(h.container.attributes['aria-busy'], 'true')
  await pending
  assert.deepEqual(h.requests, [secondUrl])
  assert.deepEqual(h.container.childNodes, ['first-page', ...second])
  assert.equal(second[0].focused, undefined, 'automatic loads do not steal focus')
  assert.equal(h.loader.nextUrl, thirdUrl)
  assert.deepEqual(h.pagination.childNodes, [`links-for-${secondUrl}`])
  assert.equal(h.status.textContent, 'loaded')
  assert.equal(h.container.attributes['aria-busy'], 'false')
  await h.loader.loadNextPage()
  await h.loader.loadNextPage()
  assert.deepEqual(h.requests, [secondUrl, thirdUrl])
  assert.equal(h.status.textContent, 'complete')
  assert.equal(h.button.disabled, true)
  assert.equal(h.observed.length, 0)
})

for (const failure of ['network', 'http', 'invalid', 'repeated']) {
  test(`${failure} failure preserves navigation and batch position and permits a retry`, async () => {
    const h = harness()
    const url = h.loader.nextUrl
    const cards = h.addPage(url, ['A'], failure === 'repeated' ? url : '')
    h.context.respond = async () => {
      if (failure === 'network') throw new Error('offline')
      if (failure === 'http') return { ok: false, status: 404 }
      if (failure === 'invalid') return { ok: true, text: async () => 'not-a-list' }
      return { ok: true, text: async () => url }
    }
    await h.loader.loadNextPage()
    assert.equal(h.loader.nextUrl, url)
    assert.deepEqual(h.container.childNodes, ['first-page'])
    assert.deepEqual(h.pagination.childNodes, ['page-1-links'])
    assert.equal(h.status.textContent, 'error')
    assert.equal(h.button.disabled, false)
    assert.equal(h.observed.length, 0, 'failures stop automatic retry loops')
    h.context.respond = async () => ({ ok: true, text: async () => url })
    if (failure === 'repeated') h.addPage(url, ['A'])
    await h.button.click()
    assert.deepEqual(h.requests, [url, url])
    assert.equal(h.container.childNodes.length, 2, 'retry appends the batch once')
    if (failure !== 'repeated') assert.equal(cards[0].focused, true, 'manual loads focus the new content')
  })
}

test('button works without IntersectionObserver and initializes after DOMContentLoaded', async () => {
  const h = harness({ observer: false, readyState: 'complete' })
  const cards = h.addPage(h.loader.nextUrl, ['A'])
  assert.equal(h.controls.hidden, false)
  assert.deepEqual(h.requests, [])
  await h.button.click()
  assert.equal(cards[0].focused, true)
})

test('unsupported fetch leaves enhancement hidden and pagination untouched', () => {
  const h = harness({ fetchSupport: false })
  assert.equal(h.controls.hidden, true)
  assert.equal(h.loader, undefined)
  assert.deepEqual(h.pagination.childNodes, ['page-1-links'])
  assert.deepEqual(h.requests, [])
})
