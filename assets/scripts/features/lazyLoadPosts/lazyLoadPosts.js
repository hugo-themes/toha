/**
 * Lazy-load posts via JSON API using IntersectionObserver
 * Only activates when lazyLoad trigger element is present
 */
class LazyLoadPosts {
  constructor(trigger) {
    this.trigger = trigger;
    this.jsonUrl = trigger.dataset.jsonUrl;
    this.perPage = parseInt(trigger.dataset.perPage, 10);
    this.totalPages = parseInt(trigger.dataset.totalPages, 10);
    this.currentPage = parseInt(trigger.dataset.currentPage, 10);
    this.container = trigger.parentElement;
    this.isLoading = false;
    this.allPosts = [];

    this.init();
  }

  async init() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.allPosts = await response.json();
      this.observe();
    } catch (err) {
      console.error('[Toha lazy-load] Failed to fetch posts:', err);
      this.trigger.remove();
    }
  }

  observe() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !this.isLoading && this.currentPage < this.totalPages) {
        observer.unobserve(this.trigger);
        this.loadNextPage();
      }
    }, { rootMargin: '200px' });

    observer.observe(this.trigger);
  }

  async loadNextPage() {
    this.isLoading = true;
    this.currentPage++;
    this.trigger.dataset.currentPage = this.currentPage;

    const start = (this.currentPage - 1) * this.perPage;
    const end = start + this.perPage;
    const posts = this.allPosts.slice(start, end);

    if (posts.length === 0) {
      this.trigger.remove();
      return;
    }

    const fragment = document.createDocumentFragment();

    posts.forEach(post => {
      const card = this.createPostCard(post);
      fragment.appendChild(card);
    });

    this.container.insertBefore(fragment, this.trigger);
    this.isLoading = false;

    if (this.currentPage < this.totalPages) {
      this.observe();
    } else {
      this.trigger.remove();
    }
  }

  createPostCard(post) {
    const div = document.createElement('div');
    div.className = 'post-card';

    const tagsHtml = post.tags && post.tags.length
      ? post.tags.map(t => `<span class="tag">${t}</span>`).join('')
      : '';

    const formattedDate = post.formattedDate || new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    const readingTime = post.readingTime ? `${post.readingTime} min read` : '';

    div.innerHTML = `
      <div class="card">
        <div class="card-head">
          <a href="${post.url}" class="post-card-link">
            <img class="card-img-top" src="${post.image || '/images/default-hero.jpg'}"
                 alt="Hero Image" loading="lazy">
          </a>
        </div>
        <div class="card-body">
          <a href="${post.url}" class="post-card-link">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text post-summary">${post.summary}</p>
          </a>
          ${tagsHtml ? `<div class="card-tags">${tagsHtml}</div>` : ''}
        </div>
        <div class="card-footer">
          <span class="float-start">
            <time datetime="${post.date}">${formattedDate}</time>
            ${readingTime ? ` | ${readingTime}` : ''}
          </span>
          <a href="${post.url}" class="float-end btn btn-outline-info btn-sm">Read</a>
        </div>
      </div>
    `;

    return div;
  }
}

// Initialize on DOMContentLoaded - this side effect ensures the module is not tree-shaken
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('lazy-load-trigger');
  if (trigger) {
    new LazyLoadPosts(trigger);
  }
});

// Export for potential testing or external use
export { LazyLoadPosts };