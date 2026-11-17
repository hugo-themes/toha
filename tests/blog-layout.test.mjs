/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { copyModernDependencies } from './helpers/modern-dependencies.mjs'

const repository = fileURLToPath(new URL('../', import.meta.url))

test('external blog consumer scopes homepage pagination and feed while preserving other content', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-blog-consumer-'))
  const write = (path, content) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })
    writeFileSync(join(directory, path), typeof content === 'string' ? content : JSON.stringify(content))
  }
  const config = {
    baseURL: 'https://example.org/project/',
    title: 'Writing consumer',
    defaultContentLanguage: 'en',
    defaultContentLanguageInSubdir: true,
    languages: { en: { weight: 1 }, bn: { weight: 2 } },
    module: {
      imports: [{ path: 'github.com/hugo-toha/toha/v4' }],
      mounts: [{ source: 'assets', target: 'assets' }, { source: 'hugo_stats.json', target: 'assets/notwatching/hugo_stats.json', disableWatch: true }]
    },
    build: { buildStats: { enable: true } },
    security: { exec: { allow: ['^go$', '^git$', '^node$', '^tailwindcss$'] } },
    outputs: { home: ['HTML', 'RSS', 'JSON'] },
    pagination: { path: 'batch' },
    params: {
      home: { layout: 'blog' },
      features: { blog: { enable: true, search: { enable: true } }, tags: { enable: true }, pagination: { maxPostsPerPage: 2, lazyLoad: true } },
      customMenus: [{ name: 'About', url: 'about', showOnFooter: true }]
    }
  }
  const build = () => {
    write('hugo.json', config)
    return execFileSync('hugo', ['--cacheDir', join(directory, 'cache'), '--cleanDestinationDir'], {
      cwd: directory, stdio: 'pipe', encoding: 'utf8'
    })
  }
  const read = path => readFileSync(join(directory, 'public', path), 'utf8')
  const titles = html => [...html.matchAll(/<h3[^>]*><a[^>]*>([^<]+)<\/a><\/h3>/g)].map(([, title]) => title)
  const recent = html => html.split('id="post-card-holder"')[1].split('</section>')[0]
  const archiveTitles = html => [...html.matchAll(/<h5 class="card-title">([^<]+)<\/h5>/g)].map(([, title]) => title)
  try {
    // Copy the distribution: no repository source symlinks or consumer overrides
    // for selection, navbar, cards, pagination, footer, feeds, search or sitemap.
    for (const path of ['layouts', 'assets', 'data', 'i18n', 'static', 'content', 'go.mod', 'hugo.yaml']) {
      cpSync(join(repository, path), join(directory, 'theme', path), { recursive: true })
    }
    copyModernDependencies(directory)
    write('go.mod', 'module example.org/blog-consumer\n\ngo 1.25\n\nrequire github.com/hugo-toha/toha/v4 v4.7.0\nreplace github.com/hugo-toha/toha/v4 => ./theme\n')
    // Actual legacy asset compilation is covered by production example builds.
    write('layouts/partials/helpers/style-bundle.html', '<link rel="stylesheet" href="/legacy.css">')
    write('layouts/partials/helpers/script-bundle.html', '<script src="/legacy.js" defer></script>')
    for (const language of ['en', 'bn']) {
      write(`content/_index.${language}.md`, `---\ntitle: ${language} Writing\n---\nHome introduction.\n\n{{< badge label="Modern home" >}}`)
      // Existing portfolio data must not create dead links in a blog composition.
      write(`data/${language}/sections/about.yaml`, 'section:\n  name: Portfolio biography\n  id: biography\n  enable: true\n  showOnNavbar: true\n  weight: 1\n')
      write(`content/about.${language}.md`, '---\ntitle: About\n---\nIndependent page.')
      write(`content/notes/aside.${language}.md`, '---\ntitle: An aside\ndate: 2025-02-01\ncategories: [Architecture]\n---\nIndependent notes.')
      for (const section of ['posts', 'journal']) {
        write(`content/${section}/_index.${language}.md`, `---\ntitle: ${section}\n---`)
        for (const [index, name] of ['new', 'middle', 'old', 'hidden', 'custom'].entries()) {
          const frontMatter = {
            title: `${section} ${name}`, date: `2025-01-0${5 - index}`, tags: ['writing'], categories: [name === 'old' ? 'Design' : 'Architecture'],
            ...(name === 'old' ? { blog: { search: false } } : {}),
            ...(name === 'hidden' ? { hidden: true } : {}), ...(name === 'custom' ? { layout: 'custom' } : {})
          }
          write(`content/${section}/${name}.${language}.md`, `---\n${JSON.stringify(frontMatter)}\n---\nArticle ${name}.`)
        }
        write(`content/${section}/guides/_index.${language}.md`, '---\ntitle: Guides\n---')
        write(`content/${section}/guides/nested.${language}.md`, `---\ntitle: ${section} nested\ndate: 2024-01-01\ncategories: [Architecture]\n---\nNested article.`)
      }
    }
    for (const section of ['posts', 'journal']) {
      if (section === 'journal') config.params.features.blog.section = section
      build()
      for (const language of ['en', 'bn']) {
        const home = read(`${language}/index.html`)
        const second = read(`${language}/batch/2/index.html`)
        assert.match(home, /<body class="blog-home/)
        assert.match(home, new RegExp(`<h1[^>]*>${language} Writing</h1>`))
        assert.match(home, /Home introduction/)
        assert.match(home, /Modern home/)
        assert.deepEqual(titles(recent(home)), [`${section} new`, `${section} middle`])
        assert.deepEqual(titles(recent(second)), [`${section} old`, `${section} nested`])
        assert.deepEqual(titles(recent(home)), archiveTitles(read(`${language}/${section}/index.html`)))
        assert.deepEqual(titles(recent(second)), archiveTitles(read(`${language}/${section}/batch/2/index.html`)))
        assert.ok(home.includes(`href="/project/${language}/batch/2/"`), 'pagination works without JavaScript')
        assert.doesNotMatch(home + second, /id="lazy-load-controls"|legacy\.css|legacy\.js/)
        assert.match(home, /styles\/modern/)
        assert.doesNotMatch(home, /transparent-navbar|sidebar-toggler|#biography|#home/)
        assert.ok(home.includes(`href="/project/${language}/"`), 'home links preserve language and base path')
        assert.ok(home.includes(`href="/project/${language}/${section}/"`))
        assert.match(home, /id="blog-search-trigger"[^>]*aria-haspopup="dialog"/)
        assert.match(home, /id="blog-search-dialog"/)
        const searchURL = home.match(/data-search-index="([^"]+)"/)[1]
        assert.ok(searchURL.startsWith(`/project/blog-search/${language}-`))
        const records = JSON.parse(read(searchURL.replace('/project/', '')))
        assert.equal(records.length, 3)
        assert.ok(records.every(record => record.url.startsWith(`/project/${language}/${section}/`)))
        assert.ok(!records.some(record => /hidden|custom|old/.test(record.title)))
        assert.ok(records.every(record => record.breadcrumbs[0] === section))
        assert.ok(home.indexOf('id="blog-search-trigger"') < home.indexOf('docs-theme-toggle'))
        const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id)
        assert.equal(new Set(ids).size, ids.length, 'shared header and topic previews have unique IDs')
        const topics = [...home.matchAll(/<section id="([^"]+)"[^>]*data-blog-topic>([\s\S]*?)<\/section>/g)]
        assert.equal(topics.length, 2)
        for (const [, id, body] of topics) {
          assert.ok(home.includes(`href="#${id}"`), 'topic navigation reaches a visible section')
          assert.ok(titles(body).every(title => title.startsWith(section)), 'topic previews exclude other content trees')
          assert.doesNotMatch(titles(body).join(' '), /An aside|hidden|custom/)
          assert.match(body, new RegExp(`href="/project/${language}/categories/`))
        }
        assert.match(home, new RegExp(`href="/project/${language}/about/?"`))
        const feed = read(`${language}/index.xml`)
        assert.equal([...feed.matchAll(/<item>/g)].length, 4)
        for (const title of [`${section} new`, `${section} middle`, `${section} old`, `${section} nested`]) {
          assert.ok(feed.includes(`<title>${title}</title>`))
        }
        assert.doesNotMatch(feed, /An aside|About|hidden|custom/)
        const index = JSON.parse(read(`${language}/index.json`))
        assert.ok(index.some(page => page.title === 'An aside'), 'search remains site-wide')
        assert.ok(index.some(page => page.title === `${section} new`))
        assert.ok(!index.some(page => page.title === `${section} hidden`))
        const sitemap = read(`${language}/sitemap.xml`)
        assert.ok(sitemap.includes(`https://example.org/project/${language}/notes/aside/`))
        assert.ok(sitemap.includes(`https://example.org/project/${language}/${section}/new/`))
        assert.ok(existsSync(join(directory, 'public', language, 'search/index.html')))
      }
    }
    // Legacy flags still enable the new opt-in homepage.
    config.params.features.blog.enable = false
    config.params.enableBlogPost = true
    config.params.features.pagination.lazyLoad = false
    build()
    assert.match(read('en/index.html'), /blog-home/)
    assert.doesNotMatch(read('en/index.html'), /id="lazy-load-controls"/)
    config.params.features.blog.search.enable = false
    config.params.home.blog = { hero: { enable: false }, topics: { enable: false } }
    build()
    const plain = read('en/index.html')
    assert.doesNotMatch(plain, /id="blog-search-(trigger|dialog)"|class="blog-hero"|data-blog-topic/)
    assert.match(plain, /<h1[^>]*>en Writing/)
    config.params.home.blog.hero = { image: 'images/default-background.jpg' }
    config.params.home.blog.topics.enable = true
    config.disableKinds = ['taxonomy', 'term']
    build()
    assert.match(read('en/index.html'), /class="blog-hero-image"/)
    assert.doesNotMatch(read('en/index.html'), /data-blog-topic/, 'unpublished taxonomy terms do not create broken topic links')
    delete config.disableKinds
    config.params.home.blog.hero.image = 'images/missing.jpg'
    assert.throws(build, /blog: hero image.*not found/)
    config.params.home.blog.hero = { enable: false }
    delete config.params.enableBlogPost
    assert.throws(build, /blog homepage requires params.features.blog.enable/)
    config.params.features.blog.enable = true
    config.params.features.blog.section = 'missing'
    assert.throws(build, /blog: content section.*missing.*not found/)
    config.params.features.blog.section = 'journal/new'
    assert.throws(build, /blog:.*must identify a content section/)
    // Empty sections still render a usable heading and search dialog.
    for (const language of ['en', 'bn']) write(`content/empty/_index.${language}.md`, '---\ntitle: Empty\n---')
    config.params.features.blog.section = 'empty'
    build()
    assert.deepEqual(titles(read('en/index.html')), [])
    assert.match(read('en/index.html'), /No posts yet/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
