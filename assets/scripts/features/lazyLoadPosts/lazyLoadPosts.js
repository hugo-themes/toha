/** Progressively enhance Hugo's existing pagination, one HTML page at a time. */
class LazyLoadPosts {
  constructor (controls) {
    this.controls = controls
    this.container = document.getElementById('post-card-holder')
    this.pagination = document.getElementById('post-pagination')
    this.button = controls.querySelector('button')
    this.status = controls.querySelector('[role="status"]')
    this.nextUrl = controls.dataset.nextUrl
    this.isLoading = false
    this.observer = null

    this.button.addEventListener('click', () => this.loadNextPage(true))
    controls.hidden = false
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) this.loadNextPage()
      }, { rootMargin: '200px' })
      this.observer.observe(controls)
    }
  }

  async loadNextPage (focusNewPosts = false) {
    if (this.isLoading || !this.nextUrl) return
    this.isLoading = true
    this.button.disabled = true
    this.container.setAttribute('aria-busy', 'true')
    this.status.textContent = this.controls.dataset.loading
    if (this.observer) this.observer.unobserve(this.controls)

    try {
      const response = await fetch(this.nextUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const page = new DOMParser().parseFromString(await response.text(), 'text/html')
      const cards = page.querySelectorAll('#post-card-holder > .post-card')
      const pagination = page.getElementById('post-pagination')
      const nextControls = page.getElementById('lazy-load-controls')
      const nextUrl = nextControls?.dataset.nextUrl || ''
      if (!cards.length || !pagination || nextUrl === this.nextUrl) throw new Error('Invalid post list response')

      this.container.append(...cards)
      this.pagination.replaceChildren(...pagination.childNodes)
      this.nextUrl = nextUrl
      this.controls.dataset.nextUrl = this.nextUrl
      this.status.textContent = this.nextUrl ? this.controls.dataset.loaded : this.controls.dataset.complete
      if (focusNewPosts) cards[0].querySelector('a')?.focus()
      if (this.observer && this.nextUrl) this.observer.observe(this.controls)
    } catch (err) {
      // Stop automatic retries; the button retries the same page and links still work.
      this.status.textContent = this.controls.dataset.error
      this.status.classList.remove('visually-hidden')
    } finally {
      this.isLoading = false
      this.button.disabled = !this.nextUrl
      this.container.setAttribute('aria-busy', 'false')
    }
  }
}

function initLazyLoadPosts () {
  const controls = document.getElementById('lazy-load-controls')
  if (controls && 'fetch' in window && 'DOMParser' in window) {
    controls.lazyLoadPosts = new LazyLoadPosts(controls)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLazyLoadPosts)
} else {
  initLazyLoadPosts()
}

export { LazyLoadPosts }
