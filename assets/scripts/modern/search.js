import Fuse from 'fuse.js'

// Result text stays plain text. Alpine's x-text renders each highlighted part.
export function createSearchIndex (documents) {
  if (!Array.isArray(documents) || documents.some(document =>
    !document || typeof document.title !== 'string' || typeof document.text !== 'string' ||
    typeof document.url !== 'string' || !/^\/(?!\/)/.test(document.url) || document.url.includes('\\') ||
    (document.breadcrumbs !== undefined && (!Array.isArray(document.breadcrumbs) || document.breadcrumbs.some(crumb => typeof crumb !== 'string')))
  )) throw new Error('Invalid documentation search index')

  return new Fuse(documents, {
    keys: [{ name: 'title', weight: 0.7 }, { name: 'text', weight: 0.3 }],
    ignoreLocation: true,
    ignoreDiacritics: true,
    includeMatches: true,
    threshold: 0.25
  })
}

// Fuse ranges are inclusive. Merge overlaps without producing HTML strings.
export function highlightParts (text, indices = []) {
  const ranges = indices.map(([start, end]) => [Math.max(0, start), Math.min(text.length - 1, end)])
    .filter(([start, end]) => start <= end).sort((a, b) => a[0] - b[0])
  const merged = []
  for (const [start, end] of ranges) {
    const previous = merged[merged.length - 1]
    if (previous && start <= previous[1] + 1) previous[1] = Math.max(previous[1], end)
    else merged.push([start, end])
  }
  const parts = []
  let cursor = 0
  for (const [start, end] of merged) {
    if (start > cursor) parts.push({ text: text.slice(cursor, start), match: false })
    parts.push({ text: text.slice(start, end + 1), match: true })
    cursor = end + 1
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), match: false })
  return parts
}

function resultPreview (result) {
  const matches = result.matches ?? []
  const titleMatch = matches.find(match => match.key === 'title')
  const textMatch = matches.find(match => match.key === 'text')
  const text = result.item.text
  const matchStart = textMatch?.indices[0]?.[0] ?? 0
  let start = Math.max(0, matchStart - 40)
  const nextSpace = text.indexOf(' ', start)
  if (start && nextSpace >= start && nextSpace < start + 24 && nextSpace < matchStart) start = nextSpace + 1
  let end = Math.min(text.length, start + 180)
  const previousSpace = text.lastIndexOf(' ', end)
  if (end < text.length && previousSpace > end - 24 && previousSpace > matchStart) end = previousSpace
  const snippetParts = highlightParts(text.slice(start, end), (textMatch?.indices ?? []).map(([a, b]) => [a - start, b - start]))
  if (start) snippetParts.unshift({ text: '…', match: false })
  if (end < text.length) snippetParts.push({ text: '…', match: false })
  return {
    ...result.item,
    breadcrumbs: result.item.breadcrumbs ?? [],
    titleParts: highlightParts(result.item.title, titleMatch?.indices),
    snippetParts,
    snippet: snippetParts.map(part => part.text).join('')
  }
}

export default function docsSearch (fetcher = globalThis.fetch) {
  // Keep the search engine and shared in-flight request outside Alpine's proxy.
  let indexPromise
  let generation = 0
  let backdropPress = false
  return {
    query: '',
    results: [],
    state: 'idle',
    indexURL: '',
    supported: false,
    init () {
      const element = this.$el
      this.indexURL = element.dataset.docsSearchIndex
      this.supported = typeof element.querySelector('dialog')?.showModal === 'function'
    },
    open () {
      const dialog = this.$refs.dialog
      if (!this.supported || dialog.open) return
      dialog.showModal()
      dialog.ownerDocument.documentElement.classList.add('docs-search-open')
      this.$refs.input.focus({ preventScroll: true })
    },
    close () {
      if (this.$refs.dialog.open) this.$refs.dialog.close()
    },
    onClose () {
      this.clear()
      backdropPress = false
      this.$refs.dialog.ownerDocument.documentElement.classList.remove('docs-search-open')
      if (this.$refs.trigger.isConnected) this.$refs.trigger.focus({ preventScroll: true })
    },
    isBackdrop (event) {
      const dialog = this.$refs.dialog
      const rect = dialog.getBoundingClientRect()
      return event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)
    },
    startBackdrop (event) {
      backdropPress = this.isBackdrop(event)
    },
    dismissBackdrop (event) {
      if (backdropPress && this.isBackdrop(event)) this.close()
      backdropPress = false
    },
    destroy () {
      if (!this.supported) return
      this.$refs.dialog.ownerDocument.documentElement.classList.remove('docs-search-open')
      this.close()
    },
    clear () {
      generation++
      this.query = ''
      this.results = []
      this.state = 'idle'
    },
    onInput () {
      generation++
      if (!this.query.trim()) {
        this.results = []
        this.state = 'idle'
        return
      }
      // Hidden, inert rows preserve the results area's height during refresh.
      this.$refs.resultsBody.scrollTop = 0
      this.state = 'loading'
    },
    focusResult (position) {
      if (this.state !== 'ready' || !this.results.length) return
      if (position < 0) {
        this.$refs.input.focus({ preventScroll: true })
        return
      }
      const dialog = this.$refs.dialog
      const links = dialog.querySelectorAll('[data-search-result]')
      links[Math.min(position, links.length - 1)]?.focus()
    },
    async search () {
      const request = ++generation
      const query = this.query.trim().slice(0, 200)
      if (!query) {
        this.results = []
        this.state = 'idle'
        return
      }
      this.state = 'loading'
      try {
        if (!indexPromise) {
          indexPromise = fetcher(this.indexURL)
            .then(response => {
              if (!response.ok) throw new Error('Unable to load documentation search index')
              return response.json()
            })
            .then(createSearchIndex)
            .catch(error => { indexPromise = undefined; throw error })
        }
        const index = await indexPromise
        if (request !== generation || query !== this.query.trim().slice(0, 200)) return
        this.results = index.search(query, { limit: 8 }).map(resultPreview)
        this.state = 'ready'
      } catch {
        if (request === generation && query === this.query.trim().slice(0, 200)) {
          this.results = []
          this.state = 'error'
        }
      }
    }
  }
}
