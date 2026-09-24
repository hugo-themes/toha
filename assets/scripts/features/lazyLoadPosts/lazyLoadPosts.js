/**
 * Lazy-load posts via JSON API using IntersectionObserver.
 * Only activates when the lazy-load trigger element is present.
 *
 * The JSON endpoint returns an array of `{ html }` objects. The card markup is
 * pre-rendered server-side (layouts/partials/cards/post.html) so that locale,
 * date formats and feature toggles stay consistent with the initial render.
 */
class LazyLoadPosts {
  constructor(trigger) {
    this.trigger = trigger
    this.jsonUrl = trigger.dataset.jsonUrl
    this.perPage = parseInt(trigger.dataset.perPage, 10)
    this.totalPages = parseInt(trigger.dataset.totalPages, 10)
    this.currentPage = parseInt(trigger.dataset.currentPage, 10)
    this.container = trigger.parentElement
    this.isLoading = false
    this.allPosts = []

    this.init()
  }

  async init() {
    try {
      const response = await fetch(this.jsonUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      this.allPosts = await response.json()
      this.observe()
    } catch (err) {
      console.error('[Toha lazy-load] Failed to fetch posts:', err)
      this.trigger.remove()
    }
  }

  observe() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading && this.currentPage < this.totalPages) {
        observer.unobserve(this.trigger)
        this.loadNextPage()
      }
    }, { rootMargin: '200px' })

    observer.observe(this.trigger)
  }

  async loadNextPage() {
    this.isLoading = true
    this.currentPage++
    this.trigger.dataset.currentPage = this.currentPage

    const start = (this.currentPage - 1) * this.perPage
    const end = start + this.perPage
    const posts = this.allPosts.slice(start, end)

    if (posts.length === 0) {
      this.trigger.remove()
      return
    }

    const fragment = document.createDocumentFragment()

    posts.forEach((post) => {
      const wrapper = document.createElement('div')
      wrapper.insertAdjacentHTML('afterbegin', post.html)
      fragment.appendChild(wrapper.firstChild)
    })

    this.container.insertBefore(fragment, this.trigger)
    this.isLoading = false

    if (this.currentPage < this.totalPages) {
      this.observe()
    } else {
      this.trigger.remove()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('lazy-load-trigger')
  if (trigger) {
    // Keep a reference so the observer and fetched data are not garbage collected.
    trigger.lazyLoadPosts = new LazyLoadPosts(trigger)
  }
})

// Export for potential testing or external use
export { LazyLoadPosts }
