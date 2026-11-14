/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))
const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"/>'
const files = [
  'content/search/_content.gotmpl',
  'layouts/index.html',
  'layouts/partials/portfolio/home.html',
  'layouts/_default/baseof.html',
  'layouts/_default/sitemap.xml',
  'layouts/partials/opengraph.html',
  'layouts/partials/robots.html',
  'layouts/partials/structured-data.html',
  'assets/images/default-avatar.png',
  ...['get-description', 'get-image-url', 'get-iso-date', 'get-resource-url', 'get-relative-url',
    'get-author-name', 'get-author-image'].map(name => `layouts/partials/helpers/${name}.html`),
  'i18n/en.toml',
  'i18n/bn.toml'
]

function fixture (run) {
  const directory = mkdtempSync(join(tmpdir(), 'toha-seo-test-'))
  const write = (path, value) => {
    const target = join(directory, path)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value))
  }
  const config = {
    baseURL: 'https://example.org/subpath/',
    title: 'Portfolio',
    defaultContentLanguage: 'en',
    defaultContentLanguageInSubdir: true,
    languages: { en: { weight: 1 }, bn: { weight: 2 } },
    params: { description: 'Site fallback.', author: { name: 'Owner' }, features: { blog: { section: 'journal' } } }
  }
  const build = () => {
    write('hugo.json', config)
    execFileSync('hugo', ['--source', directory, '--cleanDestinationDir'], { stdio: 'pipe' })
  }
  const html = (path = 'en/index.html') => readFileSync(join(directory, 'public', path), 'utf8')
  try {
    for (const path of files) {
      mkdirSync(dirname(join(directory, path)), { recursive: true })
      copyFileSync(join(repository, path), join(directory, path))
    }
    for (const name of ['header', 'analytics', 'footer', 'scripts', 'misc/support', 'navigators/navbar', 'sections/home']) {
      write(`layouts/partials/${name}.html`, '')
    }
    write('layouts/partials/sections/about.html', '{{ .designation }} {{ .company.name }}')
    write('layouts/partials/sections/publications.html', '{{ range .publications }}{{ .title }}{{ end }}')
    write('layouts/_default/list.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('layouts/_default/single.html', `{{ define "content" }}{{ .Content }}
      <b id="author">{{ partial "helpers/get-author-name.html" . }}</b>
      <img id="author-image" src="{{ partial "helpers/get-author-image.html" . }}">{{ end }}`)
    write('data/author.json', { name: 'Owner', image: 'images/owner.svg', contactInfo: { github: 'owner' } })
    write('data/en/site.json', { description: 'English description.' })
    write('data/bn/site.json', { description: 'বাংলা বিবরণ।' })
    write('assets/images/owner.svg', svg)
    write('assets/images/guest.svg', svg)
    write('static/images/static.svg', svg)
    run({ directory, write, config, build, html })
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

function structuredData (html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map(([, json]) => JSON.parse(json))
}

function sitemapEntries (xml) {
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => ({
    url: entry.match(/<loc>(.*?)<\/loc>/)[1],
    lastmod: entry.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]
  }))
}

const sections = {
  about: { section: { id: 'about', name: 'About', enable: true }, designation: 'Engineer', company: { name: 'Employer' } },
  publications: {
    section: { id: 'publications', name: 'Publications', enable: true },
    publications: [{ title: 'Paper', authors: [{ name: 'Owner' }], publishedIn: { name: 'Journal', date: 'June 2020' }, paper: { doi: '10.1234/example' } }]
  }
}

test('structured data is opt-in and explicit false disables it', () => fixture(({ config, write, build, html }) => {
  write('content/journal/post.md', '---\ntitle: Post\n---\nPost summary.')
  for (const enable of [undefined, false, true]) {
    config.params.features.structuredData = enable === undefined ? {} : { enable }
    build()
    assert.equal(structuredData(html()).length, enable === true ? 1 : 0)
    assert.equal(structuredData(html('en/journal/post/index.html')).length, enable === true ? 1 : 0)
  }
}))

test('structured data follows section visibility, global fallbacks, and language overrides', () => fixture(({ config, write, build, html }) => {
  config.params.features.structuredData = { enable: true }
  write('data/sections.json', sections)
  build()
  for (const language of ['en', 'bn']) {
    const graph = structuredData(html(`${language}/index.html`))[0]['@graph']
    assert.equal(graph.find(item => item['@type'] === 'Person').jobTitle, 'Engineer')
    assert.equal(graph.find(item => item['@type'] === 'ScholarlyArticle').datePublished, '2020-06')
    assert.equal(graph.find(item => item['@type'] === 'WebSite').url, `https://example.org/subpath/${language}/`)
    assert.equal(graph.find(item => item['@type'] === 'Person').url, `https://example.org/subpath/${language}/`)
  }
  const localized = structuredClone(sections)
  localized.about.section.enable = false
  localized.publications.section.enable = false
  write('data/bn/sections.json', localized)
  write('data/bn/author.json', { name: 'বাংলা লেখক', image: 'images/owner.svg' })
  build()
  const graph = structuredData(html('bn/index.html'))[0]['@graph']
  const person = graph.find(item => item['@type'] === 'Person')
  assert.equal(person.name, 'বাংলা লেখক')
  assert.equal(person.jobTitle, undefined)
  assert.equal(person.worksFor, undefined)
  assert.equal(graph.some(item => item['@type'] === 'ScholarlyArticle'), false)
  assert.equal(structuredData(html())[0]['@graph'].some(item => item['@type'] === 'ScholarlyArticle'), true)
  write('data/bn/sections.json', { about: localized.about })
  build()
  assert.equal(structuredData(html('bn/index.html'))[0]['@graph'].some(item => item['@type'] === 'ScholarlyArticle'), false,
    'a locale sections map replaces the global map just as the homepage does')
}))

test('structured data tolerates missing optional author and locale data', () => fixture(({ directory, config, write, build, html }) => {
  config.params.features.structuredData = { enable: true }
  delete config.params.author
  rmSync(join(directory, 'data/author.json'))
  rmSync(join(directory, 'data/en/site.json'))
  rmSync(join(directory, 'data/bn/site.json'))
  write('content/journal/post.md', '---\ntitle: Post\n---\nContent.')
  build()
  const graph = structuredData(html())[0]['@graph']
  assert.deepEqual(graph.map(item => item['@type']), ['WebSite'])
  assert.equal(graph[0].description, 'Site fallback.')
  assert.equal(structuredData(html('en/journal/post/index.html'))[0].author, undefined)
  config.baseURL = 'https://example.org/'
  config.defaultContentLanguageInSubdir = false
  build()
  assert.equal(structuredData(html('index.html'))[0]['@graph'][0].url, 'https://example.org/')
  assert.equal(structuredData(html('bn/index.html'))[0]['@graph'][0].url, 'https://example.org/bn/')
}))

test('blog metadata respects the configured section, guest authors, and published bundle images', () => fixture(({ directory, config, write, build, html }) => {
  config.params.features.structuredData = { enable: true }
  write('data/sections.json', sections)
  write('content/journal/guest/index.md', `---
title: Guest post
type: custom
date: 2020-06-07
author:
  name: Guest
  image: images/guest.svg
images: [boat.svg]
---
Guest summary.
`)
  write('content/journal/guest/boat.svg', svg)
  write('content/other/page.md', '---\ntitle: Other\ntype: journal\n---\nOther content.')
  build()
  const postHtml = html('en/journal/guest/index.html')
  const post = structuredData(postHtml)[0]
  assert.equal(post['@type'], 'BlogPosting')
  assert.equal(post.author.name, 'Guest')
  assert.equal(post.author.worksFor, undefined)
  assert.equal(post.author.sameAs, undefined)
  assert.equal(post.author.url, undefined)
  assert.equal(post.author.image, 'https://example.org/subpath/images/guest.svg')
  assert.match(postHtml, /id="author">Guest<\/b>/)
  assert.match(postHtml, /id="author-image" src="\/subpath\/images\/guest.svg"/)
  assert.equal(post.image, 'https://example.org/subpath/en/journal/guest/boat.svg')
  assert.ok(existsSync(join(directory, 'public', new URL(post.image).pathname.slice('/subpath/'.length))))
  assert.equal(structuredData(html('en/other/page/index.html')).length, 0)
}))

test('image metadata preserves resource deployment paths and external URLs', () => fixture(({ directory, config, write, build, html }) => {
  config.params.features.structuredData = { enable: true }
  write('data/en/site.json', { openGraph: { image: '/images/static.svg' } })
  write('content/journal/static.md', '---\ntitle: Static\nimages: [/images/static.svg]\n---\nStatic image.')
  write('content/journal/asset.md', '---\ntitle: Asset\nimages: [images/owner.svg]\n---\nAsset image.')
  write('content/journal/external.md', '---\ntitle: External\nimages: [https://cdn.example.org/image.png]\n---\nRemote image.')
  write('content/journal/cdn.md', '---\ntitle: CDN\nimages: ["//cdn.example.org/image.png"]\n---\nRemote image.')
  build()
  assert.match(html(), /property="og:image" content="https:\/\/example.org\/subpath\/images\/static.svg"/)
  for (const [name, image] of [
    ['static', 'https://example.org/subpath/images/static.svg'],
    ['asset', 'https://example.org/subpath/images/owner.svg'],
    ['external', 'https://cdn.example.org/image.png'],
    ['cdn', '//cdn.example.org/image.png']
  ]) {
    const page = html(`en/journal/${name}/index.html`)
    assert.equal(structuredData(page)[0].image, image)
    assert.ok(page.includes(`property="og:image" content="${image}"`))
    if (name === 'asset' || name === 'static') {
      assert.ok(existsSync(join(directory, 'public', new URL(image).pathname.slice('/subpath/'.length))))
    }
  }
}))

test('publication metadata keeps local paper, venue, and author URLs under the deployment subpath', () => fixture(({ config, write, build, html }) => {
  config.params.features.structuredData = { enable: true }
  const localSections = structuredClone(sections)
  localSections.publications.publications = [{
    title: 'Local paper', authors: [{ name: 'Author', url: '/people/author/' }],
    publishedIn: { name: 'Venue', url: '/venues/example/', date: 'Invalid date' },
    paper: { url: '/files/paper.pdf' }
  }]
  write('data/sections.json', localSections)
  build()
  const paper = structuredData(html())[0]['@graph'].find(item => item['@type'] === 'ScholarlyArticle')
  assert.deepEqual(paper.sameAs, ['https://example.org/subpath/venues/example/', 'https://example.org/subpath/files/paper.pdf'])
  assert.equal(paper.author[0].url, 'https://example.org/subpath/people/author/')
  assert.equal(paper.datePublished, undefined)
}))

test('publication dates preserve precision and reject invalid or ambiguous text', () => fixture(({ write, build, html }) => {
  const cases = [
    ['2020', '2020'], [2020, '2020'], ['2020-06', '2020-06'], ['June 2020', '2020-06'],
    ['7 June 2020', '2020-06-07'], ['June 7, 2020', '2020-06-07'], ['June 7th, 2020', '2020-06-07'],
    ['08 June 2020', '2020-06-08'], ['June 09, 2020', '2020-06-09'],
    ['2020-06-07', '2020-06-07'], ['2020-06-07T10:00:00Z', '2020-06-07'],
    ['29 February 2020', '2020-02-29'], ['31 February 2020', ''], ['June 32, 2020', ''],
    ['2020-13', ''], ['2020-02-30', ''], ['29 February 2021', ''],
    ['forthcoming', ''], ['Presented in 2020', ''], ['Junejunk 2020', '']
  ]
  write('data/dates.json', cases.map(([input]) => input))
  write('layouts/index.html', '{{ $dates := slice }}{{ range site.Data.dates }}{{ $dates = $dates | append (partial "helpers/get-iso-date.html" .) }}{{ end }}{{ $dates | jsonify }}')
  build()
  assert.deepEqual(JSON.parse(html()), cases.map(([, expected]) => expected))
}))

test('robots metadata covers search, explicit page overrides, and the standalone homepage', () => fixture(({ config, write, build, html }) => {
  write('content/_index.en.md', '---\ntitle: Home\nnoindex: true\n---\n')
  write('content/journal/private.md', '---\ntitle: Private\nnoindex: true\n---\nPrivate content.')
  write('content/journal/public.md', '---\ntitle: Public\nnoindex: false\n---\nPublic content.')
  write('content/custom-search.md', '---\ntitle: Custom Search\ntype: search\nnoindex: false\n---\nSearch content.')
  build()
  const robots = /<meta name="robots" content="noindex, follow"\s*\/>/
  assert.match(html(), robots)
  assert.match(html('en/search/index.html'), robots)
  assert.match(html('en/journal/private/index.html'), robots)
  assert.doesNotMatch(html('en/journal/public/index.html'), robots)
  assert.doesNotMatch(html('en/custom-search/index.html'), robots)
  assert.doesNotMatch(html('bn/index.html'), robots)
  config.params.features.noindex = { search: false }
  build()
  assert.doesNotMatch(html('en/search/index.html'), robots)
  assert.match(html('en/journal/private/index.html'), robots)
}))

test('descriptions use page text or localized site text and hide search placeholder content', () => fixture(({ write, build, html }) => {
  for (const language of ['en', 'bn']) {
    write(`content/journal/post.${language}.md`, '---\ntitle: Post\ntags: [example]\n---\nA **useful** post summary.')
    write(`content/journal/explicit.${language}.md`, '---\ntitle: Explicit\ndescription: Custom description.\n---\nOther summary.')
  }
  build()
  for (const [language, description] of [['en', 'English description.'], ['bn', 'বাংলা বিবরণ।']]) {
    for (const path of ['journal', 'tags', 'tags/example', 'search']) {
      const page = html(`${language}/${path}/index.html`)
      assert.ok(page.includes(`<meta name="description" content="${description}"`), `${language}/${path}`)
      assert.doesNotMatch(page.match(/<head>[\s\S]*?<\/head>/)[0], /This generated page exists solely/)
    }
    assert.match(html(`${language}/journal/post/index.html`), /name="description" content="A useful post summary\."/)
    assert.match(html(`${language}/journal/explicit/index.html`), /name="description" content="Custom description\."/)
  }
}))

test('sitemap includes portfolio-only homes and filters excluded content and empty sections', () => fixture(({ write, build, html }) => {
  build()
  for (const language of ['en', 'bn']) {
    assert.deepEqual(sitemapEntries(html(`${language}/sitemap.xml`)), [{ url: `https://example.org/subpath/${language}/`, lastmod: undefined }])
  }
  write('content/_index.en.md', '---\ntitle: Home\nlastmod: 2025-01-02\n---\n')
  build()
  assert.match(sitemapEntries(html('en/sitemap.xml'))[0].lastmod, /^2025-01-02T/)
  write('content/_index.en.md', '---\ntitle: Home\n---\n')
  build()
  assert.equal(sitemapEntries(html('en/sitemap.xml'))[0].lastmod, undefined)
  write('content/journal/post.md', '---\ntitle: Post\ndate: 2020-01-01\nlastmod: 2024-06-07\ntags: [example]\n---\nPost.')
  write('content/journal/hidden.md', '---\ntitle: Hidden\nhidden: true\ndate: 2025-01-01\n---\nHidden.')
  write('content/journal/disabled.md', '---\ntitle: Disabled\nsitemap:\n  disable: true\n---\nDisabled.')
  write('content/journal/noindex.md', '---\ntitle: Noindex\nnoindex: true\n---\nNoindex.')
  write('content/empty/_index.md', '---\ntitle: Empty\n---\n')
  build()
  const entries = sitemapEntries(html('en/sitemap.xml'))
  assert.deepEqual(entries.map(entry => entry.url).sort(), [
    'https://example.org/subpath/en/', 'https://example.org/subpath/en/journal/',
    'https://example.org/subpath/en/journal/post/', 'https://example.org/subpath/en/tags/',
    'https://example.org/subpath/en/tags/example/'
  ])
  for (const entry of entries) assert.match(entry.lastmod, /^2024-06-07T/)
  write('content/_index.en.md', '---\ntitle: Home\nsitemap:\n  disable: true\n---\n')
  build()
  assert.equal(sitemapEntries(html('en/sitemap.xml')).some(entry => entry.url === 'https://example.org/subpath/en/'), false)
}))
