export default () => ({
  cleanup: null,
  init () {
    const root = this.$el
    const document = root.ownerDocument
    const window = document.defaultView
    const content = root.querySelector('[data-docs-content]')
    if (!content || !window?.requestAnimationFrame) return

    const links = [...root.querySelectorAll('.docs-toc a[href^="#"]')]
    const headingById = new Map()
    const fragment = value => {
      try { return decodeURIComponent(value.slice(1)) } catch { return '' }
    }
    for (const link of links) {
      const id = fragment(link.getAttribute('href'))
      const heading = document.getElementById(id)
      if (heading && content.contains(heading)) headingById.set(id, heading)
    }
    const headings = [...headingById.values()]
    if (!headings.length) return

    let frame = 0
    let pendingId = ''
    let activeId = ''
    let offsets = []
    const measure = () => {
      // Native fragment navigation applies both offsets, so track the same line.
      const padding = parseFloat(window.getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      offsets = headings.map(heading => padding + (parseFloat(window.getComputedStyle(heading).scrollMarginTop) || 0))
    }
    const update = () => {
      frame = 0
      let current = headings[0].id
      if (pendingId) {
        current = pendingId
        pendingId = ''
      } else if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        current = headings.at(-1).id
      } else {
        for (const [index, heading] of headings.entries()) {
          if (heading.getBoundingClientRect().top <= offsets[index] + 1) current = heading.id
        }
      }
      if (current === activeId) return
      activeId = current
      for (const link of links) {
        if (fragment(link.getAttribute('href')) === current) link.setAttribute('aria-current', 'location')
        else link.removeAttribute('aria-current')
      }
    }
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update) }
    const resize = () => { measure(); schedule() }
    const hashChange = () => {
      const id = fragment(window.location.hash)
      pendingId = headingById.has(id) ? id : ''
      schedule()
    }
    const click = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const link = event.target?.closest?.('.docs-toc a[href^="#"]')
      if (!links.includes(link)) return
      const id = fragment(link.getAttribute('href'))
      if (headingById.has(id)) { pendingId = id; schedule() }
    }

    measure()
    hashChange()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', resize)
    window.addEventListener('hashchange', hashChange)
    window.addEventListener('load', resize)
    root.addEventListener('load', resize, true)
    root.addEventListener('click', click)
    const observer = window.ResizeObserver ? new window.ResizeObserver(resize) : null
    observer?.observe(root)
    this.cleanup = () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', resize)
      window.removeEventListener('hashchange', hashChange)
      window.removeEventListener('load', resize)
      root.removeEventListener('load', resize, true)
      root.removeEventListener('click', click)
      observer?.disconnect()
      if (frame) window.cancelAnimationFrame(frame)
      for (const link of links) link.removeAttribute('aria-current')
    }
  },
  destroy () { this.cleanup?.() }
})
