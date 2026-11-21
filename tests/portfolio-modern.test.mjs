/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { copyModernDependencies } from './helpers/modern-dependencies.mjs'

const repository = fileURLToPath(new URL('../', import.meta.url))
const portfolioScript = readFileSync(join(repository, 'assets/scripts/modern/portfolio.js'), 'utf8')
const { initializeModernPortfolio } = await import(
  `data:text/javascript;base64,${Buffer.from(portfolioScript).toString('base64')}`
)

test('external consumer renders opt-in modern portfolio across multilingual data without altering legacy default', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-portfolio-modern-'))
  const write = (path, content) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })
    writeFileSync(join(directory, path), typeof content === 'string' ? content : JSON.stringify(content))
  }
  const config = {
    baseURL: 'https://example.org/subpath/',
    title: "John's Blog",
    defaultContentLanguage: 'en',
    defaultContentLanguageInSubdir: true,
    languages: {
      en: { label: 'English', locale: 'en', title: "John's Blog", weight: 1 },
      bn: { label: 'বাংলা', locale: 'bn', title: 'জনের ব্লগ', weight: 2 }
    },
    module: {
      imports: [{ path: 'github.com/hugo-toha/toha/v4' }],
      mounts: [
        { source: 'assets', target: 'assets' },
        { source: 'hugo_stats.json', target: 'assets/notwatching/hugo_stats.json', disableWatch: true }
      ]
    },
    build: { buildStats: { enable: true } },
    security: { exec: { allow: ['^go$', '^git$', '^node$', '^tailwindcss$'] } },
    outputs: { home: ['HTML', 'RSS', 'JSON'] },
    taxonomies: { category: 'categories', subcategory: 'subcategories', tag: 'tags', series: 'series' },
    markup: {
      goldmark: {
        renderer: { unsafe: true },
        extensions: {
          passthrough: {
            enable: true,
            delimiters: { block: [['\\[', '\\]'], ['$$', '$$']], inline: [['\\(', '\\)'], ['$', '$']] }
          }
        }
      }
    },
    params: {
      background: '/images/site/background.jpg',
      logo: { main: '/images/site/main-logo.png' },
      home: { layout: 'portfolio' },
      features: {
        portfolio: { enable: true },
        blog: { enable: true, showAuthor: true },
        notes: { enable: true },
        tags: { enable: true, on_card: true },
        pagination: { maxPostsPerPage: 4 }
      },
      footer: {
        enable: true,
        navigation: { enable: true },
        contactMe: { enable: true },
        credentials: { enable: true },
        disclaimer: { enable: true }
      }
    }
  }
  const build = () => {
    write('hugo.json', config)
    return execFileSync('hugo', ['--cacheDir', join(directory, 'cache'), '--cleanDestinationDir'], {
      cwd: directory,
      stdio: 'pipe',
      encoding: 'utf8'
    })
  }
  const read = (path) => readFileSync(join(directory, 'public', path), 'utf8')

  try {
    for (const path of ['layouts', 'assets', 'data', 'i18n', 'static', 'content', 'go.mod', 'hugo.yaml']) {
      cpSync(join(repository, path), join(directory, 'theme', path), { recursive: true })
    }
    cpSync(join(repository, 'exampleSites/portfolio/data'), join(directory, 'data'), { recursive: true })
    cpSync(join(repository, 'exampleSites/portfolio/assets'), join(directory, 'assets'), { recursive: true })
    cpSync(join(repository, 'exampleSites/portfolio/static'), join(directory, 'static'), { recursive: true })
    copyModernDependencies(directory)
    write(
      'go.mod',
      'module example.org/portfolio-consumer\n\ngo 1.25\n\nrequire github.com/hugo-toha/toha/v4 v4.7.0\nreplace github.com/hugo-toha/toha/v4 => ./theme\n'
    )
    // Replace only legacy bundle compilation so legacy test stays fast without node Sass setup here.
    write('layouts/partials/helpers/style-bundle.html', '<link rel="stylesheet" href="/legacy.css">')
    write('layouts/partials/helpers/script-bundle.html', '<script src="/legacy.js" defer></script>')

    // 1. Default legacy portfolio and legacy Markdown posts stay untouched when modern.enable is omitted.
    write('content/posts/_index.md', '---\ntitle: Posts\n---')
    write('content/posts/introduction/index.en.md', '---\ntitle: Intro\n---\nLegacy article.')
    write('content/posts/introduction/index.bn.md', '---\ntitle: ভূমিকা\n---\nবাংলা আর্টিকেল।')
    build()
    const legacyHome = read('en/index.html')
    assert.match(legacyHome, /legacy\.css/)
    assert.doesNotMatch(legacyHome, /portfolio-modern|portfolio-modern\.min|components-design/)
    assert.match(read('en/posts/introduction/index.html'), /legacy\.css/)
    assert.match(read('en/posts/index.html'), /legacy\.css/)

    // Load full example portfolio + modern blog content showcase before enabling modern mode.
    rmSync(join(directory, 'content/posts'), { recursive: true, force: true })
    cpSync(join(repository, 'exampleSites/portfolio/content'), join(directory, 'content'), { recursive: true })

    // 2. Opt-in modern portfolio (sticky bar, photo hero, componentsDesign, search enabled).
    config.params.features.componentsDesign = { enable: true }
    config.params.features.portfolio.modern = {
      enable: true,
      navigation: 'bar',
      hero: { style: 'photo' },
      search: { enable: true }
    }
    build()

    for (const language of ['en', 'bn']) {
      const html = read(`${language}/index.html`)
      assert.match(html, /class="portfolio-modern-root" data-layout="bar" data-hero="photo"/)
      assert.match(html, /styles\/modern\/portfolio\.min\.[a-f0-9]+\.css/)
      assert.match(html, /components-design\.min\.[a-f0-9]+\.css/)
      assert.match(html, /portfolio-modern\.[a-f0-9]+\.js/)
      assert.doesNotMatch(html, /legacy\.css|legacy\.js|transparent-navbar/)
      assert.doesNotMatch(html, /class="section-count"/)

      // Unique element IDs across full document including <template> blocks.
      const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id)
      assert.equal(new Set(ids).size, ids.length, `${language}: duplicate element IDs found`)

      // Hero: clean greeting/role/summary/socials without action buttons.
      const hero = html.match(/<section class="blog-hero[^"]*" id="home"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.match(hero, /class="hero-avatar"/)
      assert.match(hero, /class="hero-socials"/)
      assert.doesNotMatch(hero, /hero-actions/)

      // Executive About + Currently card (containing Resume CTA) + metric strip.
      const about = html.match(/<section class="section-band about-band" id="about"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.match(about, /class="now-card"/)
      assert.match(about, /files\/resume\.pdf/)
      assert.match(about, /class="metric-strip"/)

      // Skills (3-col + detail modal template + Soft skills <dl> from about.badges).
      const skills = html.match(/<section class="section-band[^"]*" id="skills"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.match(skills, /class="skills-grid"/)
      assert.equal((skills.match(/<template id="skills-tpl-/g) || []).length, 1)
      assert.match(skills, /class="soft-grid"/)

      // Certifications synthesized from about.badges in Horizontal Medallion format.
      const certs = html.match(/<section class="section-band[^"]*" id="certifications"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.equal((certs.match(/class="cert-card/g) || []).length, 3)

      // Education: 2-column grid with 3 Details modal triggers and plain 4th card.
      const edu = html.match(/<section class="section-band[^"]*" id="education"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.match(edu, /class="edu-grid"/)
      assert.equal((edu.match(/class="edu-card-btn"/g) || []).length, 3)

      // Projects: 2-column Impact Cards + lightbox trigger on Toha preview.
      const proj = html.match(/<section class="section-band[^"]*" id="projects"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.match(proj, /class="projects-grid"/)
      assert.equal((proj.match(/<article class="modern-card\b/g) || []).length, 6)
      if (language === 'en') {
        assert.match(proj, /data-lightbox-src=/)
      }

      // Publications & Featured Posts exist in English sample data; Recent Posts exist in both.
      if (language === 'en') {
        const pub = html.match(/<section class="section-band[^"]*" id="publications"[\s\S]*?<\/section>/)?.[0] ?? ''
        assert.match(pub, /class="pub-grid"/)
        assert.equal((pub.match(/class="tag-list pub-tags"/g) || []).length, 3)
        assert.equal((pub.match(/class="edu-card-btn"/g) || []).length, 3)
        assert.equal((html.match(/class="modern-post-card"/g) || []).length, 5)
      } else {
        assert.equal((html.match(/class="modern-post-card"/g) || []).length, 3)
      }
      assert.doesNotMatch(html, /post-card-author/)

      // Achievements auto-scrolling slider + dots + lightbox gallery.
      const ach = html.match(/<section class="section-band[^"]*" id="achievements"[\s\S]*?<\/section>/)?.[0] ?? ''
      assert.equal((ach.match(/class="ach-slide"/g) || []).length, 4)
      assert.equal((ach.match(/class="ach-dot"/g) || []).length, 4)
      assert.equal((ach.match(/data-lightbox-gallery="achievements"/g) || []).length, 4)

      // Footer omits redundant section navigation links.
      const footer = html.match(/<footer class="portfolio-footer">[\s\S]*?<\/footer>/)?.[0] ?? ''
      assert.doesNotMatch(footer, /footer-nav-list/)
      assert.match(footer, /class="footer-contact-list"/)

      // Search index JSON validates subpath prefix + scoped content.
      const searchURL = html.match(/data-search-index="([^"]+)"/)?.[1]
      assert.ok(searchURL?.startsWith(`/subpath/portfolio-search/${language}-`))
      const records = JSON.parse(read(searchURL.replace('/subpath/', '')))
      assert.ok(records.length > 15)
      assert.ok(records.every((record) => record.url.startsWith(`/subpath/${language}/#`)))

      // Blog archive & reading pages showcase flat posts + front-matter Category/Sub-category hierarchy.
      const archive = read(`${language}/posts/index.html`)
      assert.match(archive, /<body class="blog-archive/)
      assert.match(archive, /data-components-navbar/)
      assert.match(archive, /id="blog-search-trigger"/)
      assert.match(archive, /class="docs-tree-group"/)
      assert.doesNotMatch(archive, /blog-sidebar-category|CATEGORIES/)
      assert.match(archive, /class="blog-series-link docs-page-link"/)
      assert.match(archive, /<nav class="modern-pagination"/)
      assert.doesNotMatch(archive, /legacy\.css|legacy\.js/)

      const categorySlug = language === 'en' ? 'categories/authoring' : 'categories/লেখালেখি'
      const categoryArchive = read(`${language}/${categorySlug}/index.html`)
      assert.match(categoryArchive, /<table class="blog-post-table/)
      assert.match(categoryArchive, /<details class="docs-tree-group" open>/)

      const post = read(`${language}/posts/introduction/index.html`)
      assert.match(post, /<body class="blog-post/)
      assert.match(post, /data-components-navbar/)
      assert.match(post, /id="blog-search-trigger"/)
      assert.doesNotMatch(post, /legacy\.css|legacy\.js/)

      const componentPost = read(`${language}/posts/components-and-callouts/index.html`)
      assert.match(componentPost, /class="modern-callout/)
      assert.match(componentPost, /<details class="docs-tree-group" open>/)
      assert.doesNotMatch(componentPost, /class="docs-nav-link" href="\/subpath\/(?:en|bn)\/posts\/" aria-current="location"/)
    }

    // 3. Switch to side rail + clean surface hero + scroll-snap + disable search.
    config.params.features.portfolio.modern = {
      enable: true,
      navigation: 'rail',
      hero: { style: 'surface' },
      search: { enable: false }
    }
    config.params.features.scrollSnap = { enable: true }
    build()
    const railHome = read('en/index.html')
    assert.match(railHome, /class="portfolio-modern-root scroll-snap" data-layout="rail" data-hero="surface"/)
    assert.doesNotMatch(railHome, /id="portfolio-search-dialog"/)
    const postNoSearch = read('en/posts/introduction/index.html')
    assert.match(postNoSearch, /<body class="blog-post/)
    assert.doesNotMatch(postNoSearch, /id="blog-search-dialog"|legacy\.css/)

    // Explicit opt-out restores legacy archives/posts alongside modern portfolio.
    for (const slug of ['markdown-and-math', 'components-and-callouts', 'diagrams-media-and-embeds', 'code-blocks-and-highlighting', 'series-search-and-pagination']) {
      rmSync(join(directory, 'content/posts', slug), { recursive: true, force: true })
    }
    config.params.features.blog = { enable: true, showAuthor: true, archive: { enable: false }, post: { enable: false } }
    build()
    assert.match(read('en/index.html'), /class="portfolio-modern-root/)
    assert.match(read('en/posts/index.html'), /legacy\.css/)
    assert.match(read('en/posts/introduction/index.html'), /legacy\.css/)
    config.params.features.blog = { enable: true, showAuthor: true }

    // 4. Invalid config values fail cleanly at build time.
    config.params.features.portfolio.modern.navigation = 'invalid'
    assert.throws(() => build())
    config.params.features.portfolio.modern.navigation = 'bar'
    config.params.features.portfolio.modern.hero.style = 'invalid'
    assert.throws(() => build())
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})

function mockNode (tagName = 'div') {
  const listeners = new Map()
  const attributes = new Map()
  const classes = new Set()
  const node = {
    tagName: tagName.toLowerCase(),
    id: '',
    hidden: false,
    open: false,
    textContent: '',
    offsetLeft: 0,
    scrollLeft: 0,
    clientWidth: 400,
    children: [],
    parentNode: null,
    dataset: {},
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      contains: (name) => classes.has(name)
    },
    setAttribute (name, value) {
      attributes.set(name, value)
      if (name === 'id') node.id = value
    },
    getAttribute: (name) => attributes.get(name) ?? null,
    addEventListener (type, cb) {
      listeners.set(type, [...(listeners.get(type) || []), cb])
    },
    dispatch (type, event = {}) {
      for (const cb of listeners.get(type) || []) {
        cb({ target: node, preventDefault () {}, ...event })
      }
    },
    append (...items) {
      for (const item of items) {
        item.parentNode = node
        node.children.push(item)
      }
    },
    replaceChildren (...items) {
      node.children = []
      node.append(...items)
    },
    contains (other) {
      let cur = other
      while (cur) {
        if (cur === node) return true
        cur = cur.parentNode
      }
      return false
    },
    querySelector (selector) {
      return node.querySelectorAll(selector)[0] ?? null
    },
    querySelectorAll (selector) {
      const results = []
      const match = (el) => {
        if (selector === '[data-dialog-title]') return el.dataset.dialogTitle !== undefined
        if (selector === '[data-dialog-close]') return el.dataset.dialogClose !== undefined
        if (selector === '[data-dialog-jump]') return el.dataset.dialogJump !== undefined
        if (selector === '[data-filter]') return el.dataset.filter !== undefined
        if (selector === 'a') return el.tagName === 'a'
        return false
      }
      const walk = (el) => {
        for (const child of el.children) {
          if (match(child)) results.push(child)
          walk(child)
        }
      }
      walk(node)
      return results
    },
    closest () {
      return null
    },
    focus () {}
  }
  return node
}

test('initializeModernPortfolio filters cards, updates live status, and steps achievements slider', () => {
  const pills = ['all', 'go', 'rust'].map((cat, idx) => {
    const btn = mockNode('button')
    btn.dataset.filter = cat
    btn.textContent = cat.toUpperCase()
    btn.setAttribute('aria-pressed', String(idx === 0))
    return btn
  })
  const group = mockNode('div')
  group.dataset.filterGroup = 'skills'
  group.dataset.statusTemplate = 'Showing __COUNT__ for __FILTER__'
  group.append(...pills)

  const cards = ['go,cloud', 'rust', 'go'].map((cats) => {
    const card = mockNode('article')
    card.dataset.cats = cats
    return card
  })
  const grid = mockNode('div')
  grid.dataset.filterGrid = 'skills'
  grid.append(...cards)
  const statusEl = mockNode('p')
  statusEl.id = 'skills-status'

  const slides = [0, 400, 800].map((left) => {
    const s = mockNode('figure')
    s.offsetLeft = left
    return s
  })
  const track = mockNode('div')
  track.dataset.achTrack = ''
  track.append(...slides)
  track.scrollTo = ({ left }) => {
    track.scrollLeft = left
  }
  const prevBtn = mockNode('button')
  const nextBtn = mockNode('button')
  const dots = [0, 1, 2].map((i) => {
    const d = mockNode('button')
    d.dataset.achIndex = String(i)
    d.setAttribute('aria-pressed', String(i === 0))
    return d
  })
  const showcase = mockNode('div')
  showcase.append(track, prevBtn, nextBtn, ...dots)

  const detailDialog = mockNode('dialog')
  detailDialog.id = 'portfolio-detail-dialog'
  detailDialog.showModal = () => {
    detailDialog.open = true
  }
  detailDialog.close = () => {
    detailDialog.open = false
    detailDialog.dispatch('close')
  }
  detailDialog.getBoundingClientRect = () => ({ left: 50, right: 450, top: 50, bottom: 450 })
  const detailContent = mockNode('div')
  detailContent.id = 'portfolio-detail-content'

  const doc = {
    documentElement: mockNode('html'),
    defaultView: null,
    activeElement: null,
    createElement: (tag) => {
      const el = mockNode(tag)
      if (tag === 'dialog') el.showModal = () => {}
      return el
    },
    addEventListener () {},
    getElementById: (id) => {
      if (id === 'skills-status') return statusEl
      if (id === 'portfolio-detail-dialog') return detailDialog
      if (id === 'portfolio-detail-content') return detailContent
      return null
    },
    querySelector: (selector) => {
      if (selector === '[data-filter-grid="skills"]') return grid
      if (selector === '[data-ach-showcase]') return showcase
      if (selector === '[data-ach-track]') return track
      if (selector === '[data-ach-prev]') return prevBtn
      if (selector === '[data-ach-next]') return nextBtn
      return null
    },
    querySelectorAll: (selector) => {
      if (selector === '[data-filter-group]') return [group]
      if (selector === '[data-ach-index]') return dots
      return []
    }
  }

  initializeModernPortfolio(doc)

  // Filter click hides non-matching cards and updates localized status template.
  pills[1].dispatch('click')
  assert.equal(cards[0].hidden, false)
  assert.equal(cards[1].hidden, true)
  assert.equal(cards[2].hidden, false)
  assert.equal(statusEl.textContent, 'Showing 2 for GO')

  // Next arrow wraps forward cleanly and syncs dot state.
  nextBtn.dispatch('click')
  assert.equal(track.scrollLeft, 400)
  assert.equal(dots[1].getAttribute('aria-pressed'), 'true')
  assert.equal(dots[0].getAttribute('aria-pressed'), 'false')

  // Keyboard ArrowLeft from second slide steps back to slide 0.
  showcase.dispatch('keydown', { key: 'ArrowLeft' })
  assert.equal(track.scrollLeft, 0)
  assert.equal(dots[0].getAttribute('aria-pressed'), 'true')
})
