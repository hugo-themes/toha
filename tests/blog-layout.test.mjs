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
  const sectionCards = (html, id) => titles(html.split(`id="${id}"`)[1].split('</section>')[0])
  const postTable = html => html.match(/<table class="blog-post-table"[^>]*>[\s\S]*?<\/table>/)?.[0] ?? ''
  const tableTitles = html => [...postTable(html).matchAll(/<th scope="row"[^>]*>\s*<a[^>]*>([^<]+)<\/a>/g)].map(([, title]) => title)
  const snippet = 'echo "Hello, Toha"\n'
  const recent = html => html.split('id="post-card-holder"')[1].split('</section>')[0]
  const archiveTitles = html => [...html.matchAll(/<h5 class="card-title">([^<]+)<\/h5>/g)].map(([, title]) => title)
  const indexTitles = html => [...html.matchAll(/class="blog-archive-row"[^>]*>\s*<span[^>]*>([^<]+)<\/span>/g)].map(([, title]) => title)
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
      write(`content/_index.${language}.md`, `---\ntitle: ${language} Writing\n---\nHome introduction.\n\n{{< badge label="Modern home" >}}\n\n\`\`\`sh\n${snippet}\`\`\``)
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
        assert.doesNotMatch(home, /data-code-copy-labels|code-block-data/)
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
        const topicNav = home.match(/<nav[^>]*data-blog-topic-navigation>([\s\S]*?)<\/nav>/)?.[1]
        assert.ok(topicNav, 'the homepage renders topic navigation')
        const dropdown = topicNav.match(/<details class="blog-topic-dropdown lg:hidden" data-navbar-disclosure>([\s\S]*?)<\/details>/)
        assert.ok(dropdown, 'the mobile dropdown starts closed and uses a native disclosure')
        const topicLinks = ['#recent-posts', ...topics.map(([, id]) => `#${id}`)]
        const linksIn = html => [...html.matchAll(/href="([^"]+)"/g)].map(([, href]) => href)
        assert.deepEqual(linksIn(dropdown[1]), topicLinks)
        assert.deepEqual(linksIn(topicNav.replace(dropdown[0], '')), topicLinks)
        for (const [, , body] of topics) {
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
    // The design decorates only the modern homepage, including pagination.
    config.params.features.componentsDesign = { enable: true }
    config.params.features.codeBlock = { copyButton: { enable: true } }
    build()
    for (const language of ['en', 'bn']) {
      const home = read(`${language}/index.html`)
      assert.match(home, /data-components-navbar/)
      assert.match(home, /components-design\.min\.[a-f0-9]+\.css/)
      assert.match(home, /id="blog-search-trigger"/)
      assert.match(home, /class="docs-prose blog-hero-copy[^>]*data-code-copy-labels=/)
      assert.match(home, /class="chroma"/)
      const code = JSON.parse(home.match(/<script[^>]*class="code-block-data"[^>]*>(.*?)<\/script>/s)[1])
      assert.equal(code.source, snippet)
      assert.equal(code.copyButton, true)
      assert.match(home, new RegExp(`href="/project/${language}/about/?"`))
      assert.match(read(`${language}/batch/2/index.html`), /data-components-navbar/)
      for (const path of ['journal/index.html', 'journal/new/index.html', 'about/index.html']) {
        assert.doesNotMatch(read(`${language}/${path}`), /components-design|data-components-navbar/)
      }
    }
    delete config.params.features.componentsDesign
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
    assert.match(plain, /class="docs-prose mt-4" data-code-copy-labels=/)
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

    config.params.features.blog = { enable: true, section: 'journal', search: { enable: true }, archive: { enable: true } }
    config.params.features.componentsDesign = { enable: true }
    config.params.features.pagination.lazyLoad = true
    config.taxonomies = { category: 'categories', tag: 'tags', series: 'series' }
    for (const language of ['en', 'bn']) {
      write(`content/journal/new.${language}.md`, '---\ntitle: journal new\ndate: 2025-01-05\ncategories: [Architecture]\ntags: [Writing, Feed-only, Architecture]\nseries: [Site Design, Code Review, Publishing, Writing Guides]\nseries_weight: 20\nhero: https://example.org/thumbnail.jpg\n---\nNew article.')
      write(`content/journal/guides/nested.${language}.md`, '---\ntitle: journal nested\ndate: 2024-01-01\ncategories: [Architecture]\nseries: [Site Design]\nseries_weight: 10\n---\nNested article.')
      write(`content/notes/aside.${language}.md`, '---\ntitle: An aside\ndate: 2025-02-01\ncategories: [Architecture]\nseries: [Outside the blog]\n---\nIndependent notes.')
      write(`content/journal/guides/basics/_index.${language}.md`, '---\ntitle: Basics\n---')
      write(`content/tags/feed-only/_index.${language}.md`, '---\ntitle: Feed-only\noutputs: [RSS]\n---')
    }
    build()
    for (const language of ['en', 'bn']) {
      const prefix = `/project/${language}/`
      const archive = read(`${language}/journal/index.html`)
      const next = read(`${language}/journal/batch/2/index.html`)
      const home = read(`${language}/index.html`)
      assert.match(archive, /<body class="blog-archive/)
      assert.match(archive, /data-components-navbar/)
      assert.match(archive, /styles\/modern/)
      assert.doesNotMatch(archive + next, /<img\b|thumbnail\.jpg|legacy\.css|legacy\.js|id="lazy-load-controls"/)
      assert.doesNotMatch(archive + home, /href="[^"]*\/tags\/feed-only\//)
      assert.deepEqual(sectionCards(archive, 'archive-recent-title'), ['journal new', 'journal middle', 'journal old'])
      assert.deepEqual(tableTitles(archive), ['journal new', 'journal middle'])
      assert.deepEqual(tableTitles(next), ['journal old', 'journal nested'])
      assert.match(postTable(archive), /aria-labelledby="archive-index-title"/)
      assert.equal((postTable(archive).match(/<th scope="col"/g) ?? []).length, 4)
      assert.match(postTable(archive), language === 'bn' ? /পড়ার সময়/ : /Reading time/)
      assert.match(postTable(archive), /<time datetime="2025-01-05">/)
      assert.ok(postTable(archive).includes(`href="${prefix}tags/writing/"`))
      assert.match(archive, /<nav class="modern-pagination"/)
      assert.doesNotMatch(next, /id="archive-(recent|series)-title"/)
      assert.ok(archive.includes(`href="${prefix}journal/batch/2/"`))
      assert.ok(next.includes(`href="${prefix}journal/"`))
      assert.ok(next.includes(`rel="canonical" href="https://example.org${prefix}journal/batch/2/"`))
      assert.ok(archive.includes(`href="${prefix}journal/index.xml"`))
      assert.ok(archive.includes(`class="blog-series-link docs-page-link" href="${prefix}journal/guides/nested/"`))
      assert.ok(!archive.includes(`href="${prefix}series/site-design/"`))
      assert.equal((archive.match(/class="blog-series-link docs-page-link"/g) ?? []).length, 3)
      assert.match(archive, new RegExp(`class="blog-sidebar-category" href="${prefix}categories/architecture/">\\s*<span[^>]+>Architecture</span>\\s*<span[^>]+>7</span>`))
      assert.match(archive, new RegExp(`class="blog-sidebar-tag" href="${prefix}tags/writing/">\\s*<span[^>]+>writing</span>\\s*<span[^>]+>6</span>`, 'i'))
      assert.match(archive, new RegExp(`href="${prefix}series/">\\s*[^<]*<span class="blog-sidebar-count">4</span>`))
      const sidebar = archive.match(/<aside class="blog-sidebar[^>]*>([\s\S]*?)<\/aside>/)[1]
      const taxonomyLinks = [...sidebar.matchAll(/href="[^"]*\/(series|categories|tags)\/"/g)].map(([, taxonomy]) => taxonomy)
      assert.deepEqual(taxonomyLinks, ['series', 'categories', 'tags'])
      assert.match(archive, /id="blog-search-trigger"/)
      assert.equal(archive.match(/data-search-index="([^"]+)"/)[1], home.match(/data-search-index="([^"]+)"/)[1])
      assert.match(archive, language === 'bn' ? /সব পোস্ট/ : /All posts/)
      const guides = read(`${language}/journal/guides/index.html`)
      assert.deepEqual(tableTitles(guides), ['journal nested'])
      assert.doesNotMatch(guides, /<nav class="modern-pagination"/)
      assert.match(guides, /<details class="docs-tree-group" open>/)
      assert.match(read(`${language}/journal/guides/basics/index.html`), language === 'bn' ? /এখনও কোনো পোস্ট নেই/ : /No posts yet/)
      const series = read(`${language}/series/index.html`)
      assert.equal((series.match(/class="blog-series-link docs-page-link"/g) ?? []).length, 4, 'every series appears on one page')
      assert.match(series, language === 'bn' ? /2টি পোস্ট/ : /2 posts/)
      assert.ok(series.includes(`class="blog-series-link docs-page-link" href="${prefix}journal/guides/nested/"`))
      assert.ok(series.includes(`href="${prefix}series/" aria-current="page"`))
      assert.doesNotMatch(series, /Outside The Blog|blog-archive-row|series\/batch\//)
      const redirect = read(`${language}/series/site-design/index.html`)
      assert.ok(redirect.includes(`http-equiv="refresh" content="0; url=https://example.org${prefix}journal/guides/nested/"`))
      assert.ok(redirect.includes(`href="${prefix}journal/guides/nested/"`))
      assert.doesNotMatch(redirect, /class="blog-archive/)
      const category = read(`${language}/categories/architecture/index.html`)
      assert.match(category, /<body class="blog-archive/)
      assert.deepEqual(titles(category), ['An aside', 'journal new'], 'taxonomy cards still include posts from other sections')
      assert.ok(category.includes(`class="blog-sidebar-category" href="${prefix}categories/architecture/" aria-current="page"`))
      assert.doesNotMatch(category, /class="blog-sidebar-tag"[^>]*aria-current/)
      assert.ok(category.includes(`href="${prefix}categories/architecture/batch/2/"`))
      assert.equal(titles(read(`${language}/categories/architecture/batch/2/index.html`)).length, 2)
      const design = read(`${language}/categories/design/index.html`)
      assert.equal(titles(design).length, 2)
      assert.doesNotMatch(design, /<nav class="modern-pagination"/)
      assert.deepEqual(indexTitles(read(`${language}/tags/index.html`)).map(title => title.toLowerCase()), ['architecture', 'writing'])
      assert.ok(existsSync(join(directory, 'public', language, 'tags/feed-only/index.xml')))
      const tagged = read(`${language}/tags/writing/index.html`)
      assert.equal(titles(tagged).length, 2)
      assert.ok(tagged.includes(`class="blog-sidebar-tag" href="${prefix}tags/writing/" aria-current="page"`))
      assert.ok(tagged.includes(`href="${prefix}tags/writing/batch/2/"`))
      const taggedArchitecture = read(`${language}/tags/architecture/index.html`)
      assert.ok(taggedArchitecture.includes(`class="blog-sidebar-tag" href="${prefix}tags/architecture/" aria-current="page"`))
      assert.doesNotMatch(tagged + taggedArchitecture, /class="blog-sidebar-category"[^>]*aria-current/)
      assert.doesNotMatch(category + tagged, /<img\b|thumbnail\.jpg|blog-archive-row/)
      for (const path of ['posts/index.html', 'journal/new/index.html', 'notes/aside/index.html']) {
        assert.doesNotMatch(read(`${language}/${path}`), /<body class="blog-archive|data-components-navbar/)
      }
    }
    config.params.home.blog.topics.taxonomy = 'series'
    config.params.home.blog.postsPerPage = 3
    config.params.features.blog.post = { enable: true }
    build()
    const threeCardHome = read('en/index.html')
    assert.deepEqual(titles(recent(threeCardHome)), ['journal new', 'journal middle', 'journal old'])
    assert.deepEqual(titles(recent(read('en/batch/2/index.html'))), ['journal nested'])
    assert.deepEqual(tableTitles(read('en/journal/index.html')), ['journal new', 'journal middle'])
    const seriesPreview = threeCardHome.match(/<section[^>]*data-blog-topic>([\s\S]*?)<\/section>/)?.[1]
    assert.ok(seriesPreview?.includes('Start series'))
    assert.match(seriesPreview, /href="\/project\/en\/journal\/guides\/nested\/"/)
    assert.doesNotMatch(seriesPreview, /href="[^"]*\/series\/site-design\//)
    assert.match(read('en/journal/new/index.html'), /class="blog-sidebar-tag" href="\/project\/en\/tags\/writing\/"/)
    delete config.params.features.blog.post
    config.params.home.layout = 'portfolio'
    config.params.features.blog.search.enable = false
    config.params.features.showDate = { postCards: false }
    config.params.features.readingTime = { enable: false }
    config.params.features.tags.enable = false
    config.disableKinds = ['taxonomy', 'term']
    for (const language of ['en', 'bn']) rmSync(join(directory, 'data', language, 'sections', 'about.yaml'))
    build()
    const standalone = read('en/journal/index.html')
    assert.match(standalone, /<body class="blog-archive/)
    assert.equal((postTable(standalone).match(/<th scope="col"/g) ?? []).length, 1)
    assert.doesNotMatch(postTable(standalone), /<time|modern-tag/)
    assert.doesNotMatch(standalone, /id="blog-search-trigger"|id="archive-series-title"|href="[^"]*\/(series|categories|tags)\//)
    assert.doesNotMatch(read('en/index.html'), /data-components-navbar/)

    delete config.disableKinds
    delete config.params.features.showDate
    delete config.params.features.readingTime
    config.params.features.tags.enable = true
    Object.assign(config.params.features.blog, { archive: { enable: false }, post: { enable: true }, search: { enable: true }, shareButtons: { email: true, reddit: true } })
    config.params.features.toc = { enable: true }
    config.params.features.comment = { enable: true, services: { giscus: { repo: 'example/blog', repoID: 'test-id' } } }
    config.params.logo = { favicon: 'images/default-hero.jpg' }
    config.params.gitRepo = 'https://example.org/repository'
    config.params.gitForge = 'gitlab'
    config.params.gitBranch = 'articles'
    for (const language of ['en', 'bn']) {
      write(`content/journal/new.${language}.md`, `---
title: A & B
description: A post introduction.
author:
  name: Guest writer
date: 2025-01-05
tags: [Writing]
series: [Site Design]
series_weight: 20
menu:
  sidebar:
    weight: 2
---
## Install tools

{{< badge label="Modern post" >}}

\`\`\`sh
${snippet}\`\`\`
`)
      write(`content/journal/middle.${language}.md`, '---\ntitle: Earlier in the menu\ndate: 2025-01-04\nmenu:\n  sidebar:\n    weight: 1\n---\nArticle.')
      write(`content/journal/guides/nested.${language}.md`, '---\ntitle: With a cover\ndate: 2024-01-01\nseries: [Site Design]\nseries_weight: 10\nhero: images/default-hero.jpg\nheroAlt: A notebook\nenableTOC: false\n---\n## Hidden from outline\n\nStill readable.')
      write(`content/journal/hidden.${language}.md`, '---\ntitle: Hidden part\nhidden: true\nseries: [Site Design]\nseries_weight: 1\n---')
      write(`content/journal/custom.${language}.md`, '---\ntitle: Custom layout\nlayout: custom\nseries: [Site Design]\nseries_weight: 2\n---')
      write(`content/notes/aside.${language}.md`, '---\ntitle: Outside the blog\nseries: [Site Design]\nseries_weight: 3\n---')
    }
    build()
    for (const language of ['en', 'bn']) {
      const prefix = `/project/${language}/`
      const post = read(`${language}/journal/new/index.html`)
      assert.match(post, /<body class="blog-post/)
      assert.match(post, /data-components-navbar/)
      assert.match(post, /styles\/modern/)
      assert.match(post, /rel="icon" type="image\/jpeg" href="\/project\/images\/default-hero[^"]+\.jpg"/)
      assert.match(post, /<h1[^>]*>A &amp; B<\/h1>/)
      assert.match(post, /A post introduction/)
      assert.match(post, /Guest writer/)
      assert.match(post, /datetime="2025-01-05"/)
      assert.match(post, /data-docs-content data-code-copy-labels=/)
      assert.match(post, /Modern post/)
      assert.match(post, /class="chroma"/)
      assert.match(post, /class="docs-mobile-toc/)
      assert.match(post, /class="docs-desktop-toc blog-post-outline"/)
      assert.match(post, /class="blog-sidebar /)
      assert.equal((post.match(/data-responsive-navigation open/g) ?? []).length, 2)
      assert.ok(post.includes(`class="docs-nav-link" href="${prefix}journal/" aria-current="location"`))
      const series = post.match(/<nav[^>]*aria-label="Site Design">([\s\S]*?)<\/nav>/)?.[1]
      assert.ok(series, 'the post renders a separate series navigation panel')
      assert.ok(series.includes(`href="${prefix}journal/guides/nested/"`))
      assert.ok(!series.includes(`href="${prefix}series/site-design/"`))
      assert.match(series, /aria-current="page">\s*<span[^>]*>2\.<\/span>\s*<span[^>]*>A &amp; B<\/span>\s*<\/span>/)
      assert.doesNotMatch(series, /Hidden part|Custom layout|Outside the blog/)
      assert.match(post, language === 'bn' ? /পর্ব 2 \/ 2/ : /Part 2 of 2/)
      assert.equal((post.match(/href="#install-tools"/g) ?? []).length, 2)
      assert.match(post, /id="install-tools"/)
      assert.doesNotMatch(post, /id="TableOfContents"|<img\b|legacy\.css|legacy\.js/)
      assert.ok(post.includes(`href="${prefix}journal/"`))
      assert.ok(post.includes(`href="${prefix}tags/writing/"`))
      assert.ok(post.includes(`rel="prev" href="${prefix}journal/middle/"`))
      assert.ok(post.includes(`rel="canonical" href="https://example.org${prefix}journal/new/"`))
      assert.match(post, /id="blog-search-trigger"/)
      assert.match(post, /mailto:\?subject=A%20%26%20B&amp;body=/)
      assert.match(post, /https:\/\/reddit\.com\/submit\?url=/)
      assert.match(post, new RegExp(`https://example.org/repository/-/edit/articles/content/journal/new\\.${language}\\.md`))
      assert.match(post, /https:\/\/giscus\.app\/client\.js/)
      assert.ok(post.includes(`data-lang="${language}"`))
      const nested = read(`${language}/journal/guides/nested/index.html`)
      assert.match(nested, /class="blog-post-hero"[^>]*alt="A notebook" width="\d+" height="\d+"/)
      assert.doesNotMatch(nested, /docs-mobile-toc|blog-post-outline/)
      assert.ok(nested.includes(`href="${prefix}journal/guides/"`))
      assert.ok(nested.includes(`href="${prefix}journal/guides/" aria-current="location"`))
      assert.match(nested, language === 'bn' ? /পর্ব 1 \/ 2/ : /Part 1 of 2/)
      assert.doesNotMatch(read(`${language}/journal/middle/index.html`), /aria-label="Site Design"/)
      for (const path of ['journal/index.html', 'journal/custom/index.html', 'posts/new/index.html', 'notes/aside/index.html']) {
        assert.doesNotMatch(read(`${language}/${path}`), /<body class="blog-post|data-components-navbar/)
      }
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
