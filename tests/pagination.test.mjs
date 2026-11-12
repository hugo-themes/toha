/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))

test('load controls have nonempty labels in every shipped translation table', () => {
  for (const language of readdirSync(join(repository, 'i18n'))) {
    const table = readFileSync(join(repository, 'i18n', language), 'utf8')
    for (const key of ['load_more_posts', 'loading_posts', 'posts_loaded', 'all_posts_loaded', 'posts_load_error']) {
      assert.match(table, new RegExp(`\\[${key}\\]\\s+other = "[^"\\n]+"`), `${language}: ${key}`)
    }
  }
})

function fixture (lazyLoad, run) {
  const directory = mkdtempSync(join(tmpdir(), 'toha-pagination-test-'))
  const write = (path, value) => {
    const target = join(directory, path)
    mkdirSync(dirname(target), { recursive: true })
    writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value))
  }
  try {
    for (const path of ['layouts/_default/list.html', 'layouts/tags/list.html', 'layouts/categories/list.html',
      'layouts/partials/post-list.html', 'layouts/_default/rss.xml', 'i18n/en.toml', 'i18n/bn.toml']) {
      mkdirSync(dirname(join(directory, path)), { recursive: true })
      copyFileSync(join(repository, path), join(directory, path))
    }
    write('hugo.json', {
      baseURL: 'https://example.org/subpath/',
      defaultContentLanguage: 'en',
      defaultContentLanguageInSubdir: true,
      languages: { en: { weight: 1 }, bn: { weight: 2 } },
      params: { features: { pagination: { maxPostsPerPage: 2, ...(lazyLoad === undefined ? {} : { lazyLoad }) }, blog: { section: 'journal' } } },
      pagination: { path: 'batch' },
      outputFormats: { RSS: { baseName: 'rss' } }
    })
    write('layouts/_default/baseof.html', '{{ block "content" . }}{{ end }}')
    write('layouts/_default/single.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('layouts/partials/cards/post.html', '<div class="post-card" data-title="{{ .Title }}"><a href="{{ .RelPermalink }}">{{ .Title }} {{ i18n "read" }}</a></div>')
    for (const language of ['en', 'bn']) {
      for (const [section, names] of [['posts', ['custom', 'hidden', 'a', 'b', 'c', 'd', 'e']], ['journal', ['a', 'b', 'c']]]) {
        write(`content/${section}/_index.${language}.md`, `---\ntitle: ${section}\n---\n`)
        names.forEach((name, index) => {
          const frontMatter = {
            title: name, weight: index + 1, date: '2020-01-01', tags: ['basic'], categories: ['basic'],
            ...(name === 'custom' ? { layout: 'custom' } : {}), ...(name === 'hidden' ? { hidden: true } : {})
          }
          write(`content/${section}/${name}.${language}.md`, `---\n${JSON.stringify(frontMatter)}\n---\nPost ${name}`)
        })
      }
      write(`content/posts/nested/_index.${language}.md`, '---\ntitle: Nested\n---')
      for (const name of ['n1', 'n2', 'n3']) {
        write(`content/posts/nested/${name}.${language}.md`, `---\ntitle: ${name}\nweight: 20\n---\nNested`)
      }
    }
    execFileSync('hugo', ['--source', directory, '--cleanDestinationDir'], { stdio: 'pipe' })
    const html = path => readFileSync(join(directory, 'public', path), 'utf8')
    const titles = page => [...page.matchAll(/data-title="([^"]+)"/g)].map(([, title]) => title)
    run({ directory, html, titles })
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

for (const enabled of [undefined, false, true]) {
  test(`archives preserve pagination, filtering, scope, RSS and locale when lazyLoad=${enabled}`, () => fixture(enabled, ({ directory, html, titles }) => {
    for (const language of ['en', 'bn']) {
      for (const [section, count] of [['posts', 8], ['journal', 3], ['posts/nested', 3], ['tags/basic', 8], ['categories/basic', 8]]) {
        const first = html(`${language}/${section}/index.html`)
        const nextUrl = `/subpath/${language}/${section}/batch/2/`
        assert.ok(first.includes(`href="${nextUrl}"`), 'next page stays linked without JavaScript')
        assert.equal(first.includes('id="lazy-load-controls"'), enabled === true)
        if (enabled) {
          assert.ok(first.includes(`data-next-url="${nextUrl}"`))
          assert.match(first, /class="lazy-load-controls" hidden/)
          assert.ok(first.includes(language === 'en' ? 'Load more posts' : 'আরো পোস্ট দেখান'))
        }
        const batches = [titles(first)]
        const pageCount = Math.ceil(count / 2)
        for (let page = 2; page <= pageCount; page++) {
          const batch = html(`${language}/${section}/batch/${page}/index.html`)
          batches.push(titles(batch))
          if (enabled && page < pageCount) {
            assert.ok(batch.includes(`data-next-url="/subpath/${language}/${section}/batch/${page + 1}/"`), 'direct visits load the successor')
          }
          if (page === pageCount) assert.ok(!batch.includes('id="lazy-load-controls"'))
        }
        const allTitles = batches.flat()
        assert.equal(allTitles.length, count)
        // Taxonomy terms cover both sections; test uniqueness using title counts below.
        assert.ok(!allTitles.includes('custom'))
        assert.ok(!allTitles.includes('hidden'))
        if (section === 'posts') assert.deepEqual(allTitles, ['a', 'b', 'c', 'd', 'e', 'n1', 'n2', 'n3'])
        if (section === 'journal') assert.deepEqual(allTitles, ['a', 'b', 'c'])
        if (section === 'posts/nested') assert.deepEqual(allTitles, ['n1', 'n2', 'n3'])
        if (section.includes('basic')) assert.deepEqual(allTitles.slice().sort(), ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'e'])
        assert.ok(existsSync(join(directory, 'public', language, section, 'rss.xml')), 'RSS is preserved')
      }
    }
  }))
}
