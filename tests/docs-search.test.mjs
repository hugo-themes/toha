/* eslint-env node */
import assert from 'node:assert/strict'
import { test } from 'node:test'
import docsSearch, { createSearchIndex, highlightParts } from '../assets/scripts/modern/search.js'

const documents = [
  { title: 'Tokens', text: 'Shared semantic colors and typography.', url: '/project/en/docs/tokens/' },
  { title: 'Components', text: 'Buttons use tokens for their appearance.', url: '/project/en/docs/components/', breadcrumbs: ['Documentation', 'Guides'] },
  { title: 'Café', text: 'A guide to accents.', url: '/project/en/docs/cafe/' },
  { title: 'বাংলা', text: 'বাংলা বিষয়বস্তু।', url: '/project/bn/docs/bangla/' }
]
const response = (data = documents) => ({ ok: true, json: async () => data })
const component = fetcher => {
  const classes = new Set()
  const dialog = {
    open: false,
    ownerDocument: { documentElement: { classList: { add: name => classes.add(name), remove: name => classes.delete(name), contains: name => classes.has(name) } } },
    getBoundingClientRect: () => ({ left: 100, right: 500, top: 100, bottom: 400 }),
    showModal () { this.open = true },
    close () { this.open = false; search.onClose() }
  }
  const focusable = () => ({ isConnected: true, focused: false, focus () { this.focused = true } })
  const search = Object.assign(docsSearch(fetcher), {
    $el: { dataset: { docsSearchIndex: '/project/docs-search/en.json' }, querySelector: () => dialog },
    $refs: { dialog, input: focusable(), trigger: focusable(), resultsBody: { scrollTop: 0 } }
  })
  search.init()
  // Alpine evaluates event handlers at the input/form, not the x-data root.
  search.$el = { dataset: {} }
  return search
}

test('docs search ranks titles, matches article text and accents, and preserves localized URLs', () => {
  const index = createSearchIndex(documents)
  assert.equal(index.search('tokens')[0].item.title, 'Tokens')
  assert.equal(index.search('typography')[0].item.url, '/project/en/docs/tokens/')
  assert.equal(index.search('cafe')[0].item.title, 'Café')
  assert.equal(index.search('বিষয়বস্তু')[0].item.url, '/project/bn/docs/bangla/')
  assert.deepEqual(index.search('zzzzzzzzzzzzzz'), [])
  assert.throws(() => createSearchIndex({}), /Invalid documentation/)
  for (const url of ['javascript:alert(1)', '//other.example/', '/\\other.example/']) {
    assert.throws(() => createSearchIndex([{ title: 'Unsafe', text: '', url }]), /Invalid documentation/)
  }
  assert.throws(() => createSearchIndex([{ title: 'Bad context', text: '', url: '/docs/', breadcrumbs: [1] }]), /Invalid documentation/)
})

test('match highlighting preserves text, merges inclusive ranges, and clips snippets around matches', async () => {
  const source = 'ab<cd>&ef'
  const parts = highlightParts(source, [[2, 4], [3, 6], [-5, 0], [500, 600]])
  assert.equal(parts.map(part => part.text).join(''), source)
  assert.deepEqual(parts.filter(part => part.match).map(part => part.text), ['a', '<cd>&'])
  assert.deepEqual(highlightParts('plain'), [{ text: 'plain', match: false }])
  assert.deepEqual(highlightParts(''), [])

  const search = component(async () => response())
  search.query = 'Components'
  await search.search()
  const result = search.results[0]
  assert.deepEqual(result.breadcrumbs, ['Documentation', 'Guides'])
  assert.equal(result.titleParts.map(part => part.text).join(''), result.title)
  assert.equal(result.titleParts.filter(part => part.match).map(part => part.text).join(''), 'Components')
  assert.equal(result.snippetParts.map(part => part.text).join(''), result.snippet)

  const long = component(async () => response([{ title: 'Long article', text: 'x '.repeat(200) + 'needle' + ' y'.repeat(200), url: '/docs/long/' }]))
  long.query = 'needle'
  await long.search()
  assert.match(long.results[0].snippet, /^….*needle.*…$/)
  assert.ok(long.results[0].snippet.length < 190)
  assert.equal(long.results[0].snippetParts.filter(part => part.match).map(part => part.text).join(''), 'needle')
})

test('docs search loads lazily, caches the index, limits results and clears empty queries', async () => {
  let calls = 0
  const search = component(async url => {
    assert.equal(url, '/project/docs-search/en.json')
    calls++
    return response(Array.from({ length: 12 }, (_, i) => ({ title: `Tokens ${i}`, text: 'Plain <script>text</script>', url: `/docs/${i}/` })))
  })
  await search.search()
  assert.equal(calls, 0)
  search.query = 'Tokens'
  const pending = search.search()
  assert.equal(search.state, 'loading')
  await pending
  assert.equal(search.state, 'ready')
  assert.equal(search.results.length, 8)
  assert.equal(search.results[0].snippet, 'Plain <script>text</script>')
  search.query = 'zzzzzzzzzzzzzz'
  await search.search()
  assert.deepEqual(search.results, [])
  assert.equal(search.state, 'ready')
  assert.equal(calls, 1)
  search.query = '   '
  await search.search()
  assert.equal(search.state, 'idle')
  search.clear()
  assert.equal(search.query, '')
})

test('docs search retries network, HTTP and malformed-index failures', async () => {
  for (const failure of [() => { throw new Error('offline') }, () => ({ ok: false }), () => response({})]) {
    let calls = 0
    const search = component(async () => ++calls === 1 ? failure() : response())
    search.query = 'tokens'
    await search.search()
    assert.equal(search.state, 'error')
    assert.deepEqual(search.results, [])
    await search.search()
    assert.equal(search.state, 'ready')
    assert.equal(search.results[0].title, 'Tokens')
    assert.equal(calls, 2)
  }
})

test('a pending index cannot restore a stale query or cleared results', async () => {
  let finish
  let calls = 0
  const search = component(() => { calls++; return new Promise(resolve => { finish = resolve }) })
  search.query = 'tokens'
  const first = search.search()
  search.query = 'cafe'
  const second = search.search()
  finish(response())
  await Promise.all([first, second])
  assert.equal(calls, 1)
  assert.equal(search.results[0].title, 'Café')

  const cleared = component(() => new Promise(resolve => { finish = resolve }))
  cleared.query = 'tokens'
  const pending = cleared.search()
  cleared.clear()
  finish(response())
  await pending
  assert.equal(cleared.state, 'idle')
  assert.deepEqual(cleared.results, [])
})

test('editing a query preserves row space while invalidating old links and pending searches', async () => {
  const search = component(async () => response())
  search.query = 'tokens'
  await search.search()
  let focused = false
  search.$refs.dialog.querySelectorAll = () => [{ focus: () => { focused = true } }]
  search.$refs.resultsBody.scrollTop = 120
  search.query = 'cafe'
  const previous = search.results
  search.onInput()
  search.focusResult(0)
  assert.equal(focused, false, 'Down must not enter old links while the new query is debouncing')
  assert.equal(search.query, 'cafe')
  assert.equal(search.state, 'loading')
  assert.equal(search.$refs.resultsBody.scrollTop, 0, 'a new query starts at the top of the results area')
  assert.equal(search.results, previous, 'old rows retain their geometry while hidden and inert')
  const refreshing = search.search()
  assert.equal(search.results, previous, 'starting the search must not collapse the pending rows')
  await refreshing
  assert.equal(search.results[0].title, 'Café')
  search.query = ''
  search.onInput()
  assert.equal(search.state, 'idle')
  assert.deepEqual(search.results, [], 'clearing the input releases previous row space')

  let finish
  const loading = component(() => new Promise(resolve => { finish = resolve }))
  loading.query = 'tokens'
  const pending = loading.search()
  loading.query = 'tokens '
  loading.onInput()
  finish(response())
  await pending
  assert.equal(loading.state, 'loading')
  assert.deepEqual(loading.results, [], 'even an unchanged normalized query must wait for the next search')
  await loading.search()
  assert.equal(loading.results[0].title, 'Tokens')
})

test('search dialog focuses input, restores trigger focus and scroll, and discards closed searches', async () => {
  let finish
  let calls = 0
  const search = component(() => { calls++; return new Promise(resolve => { finish = resolve }) })
  const { dialog, input, trigger } = search.$refs
  const classes = dialog.ownerDocument.documentElement.classList
  search.open()
  assert.equal(dialog.open, true)
  assert.equal(input.focused, true)
  assert.equal(classes.contains('docs-search-open'), true)
  assert.equal(calls, 0, 'opening the dialog does not download the index')
  search.query = 'tokens'
  const pending = search.search()
  search.close()
  assert.equal(dialog.open, false)
  assert.equal(trigger.focused, true)
  assert.equal(classes.contains('docs-search-open'), false)
  assert.equal(search.query, '')
  finish(response())
  await pending
  assert.equal(search.state, 'idle')
  assert.deepEqual(search.results, [])
  search.open()
  search.query = 'tokens'
  await search.search()
  assert.equal(calls, 1, 'reopening reuses the cached index')
  assert.equal(search.results[0].title, 'Tokens')
  search.destroy()
  assert.equal(dialog.open, false)
  assert.equal(classes.contains('docs-search-open'), false)
})

test('only a backdrop press followed by a backdrop click dismisses search', () => {
  const search = component(async () => response())
  const { dialog } = search.$refs
  const inside = { target: dialog, clientX: 120, clientY: 120 }
  const outside = { target: dialog, clientX: 20, clientY: 20 }
  search.open()
  search.startBackdrop(inside)
  search.dismissBackdrop(outside)
  assert.equal(dialog.open, true, 'dragging out of dialog content must not dismiss it')
  search.startBackdrop(outside)
  search.dismissBackdrop(inside)
  assert.equal(dialog.open, true)
  search.startBackdrop(outside)
  search.dismissBackdrop(outside)
  assert.equal(dialog.open, false)
})

test('unsupported dialogs do not expose a dead trigger or open search', () => {
  const search = component(async () => response())
  delete search.$refs.dialog.showModal
  search.$el = { dataset: {}, querySelector: () => search.$refs.dialog }
  search.init()
  assert.equal(search.supported, false)
  search.open()
  assert.equal(search.$refs.dialog.open, false)
})

test('arrow navigation reaches result links and returns to the input without leaving the dialog', () => {
  const search = component(async () => response())
  const focused = []
  search.$refs.dialog.querySelectorAll = () => [0, 1].map(index => ({ focus: () => focused.push(index) }))
  search.focusResult(0)
  assert.deepEqual(focused, [], 'empty search must not focus stale result elements')
  search.results = documents.slice(0, 2)
  search.state = 'ready'
  search.focusResult(0)
  search.focusResult(1)
  search.focusResult(99)
  search.focusResult(-1)
  assert.deepEqual(focused, [0, 1, 1])
  assert.equal(search.$refs.input.focused, true)
})
