/* eslint-env node */
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'
import { copyModernDependencies } from './helpers/modern-dependencies.mjs'

const repository = fileURLToPath(new URL('../', import.meta.url))
const example = join(repository, 'exampleSites/docs')

test('official docs preserve every imported route, translation, resource, and modern asset boundary', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-official-docs-'))
  const ledger = JSON.parse(readFileSync(join(example, 'imports/toha-docs.json'), 'utf8'))
  const read = path => readFileSync(join(directory, 'public', path), 'utf8')
  const html = url => read(`${url.replace(/^\//, '')}index.html`)
  try {
    // Exercise the complete content as a real consumer outside this checkout.
    for (const name of ['layouts', 'assets', 'i18n', 'content', 'go.mod', 'hugo.yaml', 'package.hugo.json']) {
      cpSync(join(repository, name), join(directory, 'theme', name), { recursive: true })
    }
    for (const name of ['content', 'assets', 'static', 'hugo.yaml']) {
      cpSync(join(example, name), join(directory, name), { recursive: true })
    }
    copyModernDependencies(directory, ['mermaid'])
    writeFileSync(join(directory, 'go.mod'), 'module example.org/docs-consumer\n\ngo 1.25\n\nrequire github.com/hugo-toha/toha/v4 v4.7.0\nreplace github.com/hugo-toha/toha/v4 => ./theme\n')
    assert.equal(ledger.pages.length, 136)
    assert.deepEqual(['en', 'fr', 'es'].map(language => ledger.pages.filter(page => page.language === language).length), [46, 44, 46])
    assert.equal(ledger.resources.length, 66)
    assert.equal(new Set(ledger.pages.map(page => page.url)).size, 136)
    for (const resource of ledger.resources) {
      const bytes = readFileSync(join(example, resource.target))
      assert.equal(createHash('sha256').update(bytes).digest('hex'), resource.sha256, resource.target)
    }
    for (const base of ['https://example.org/', 'https://example.org/project/']) {
      const build = spawnSync('hugo', ['--baseURL', base, '--cacheDir', join(directory, 'cache'), '--cleanDestinationDir', '--minify'], { cwd: directory, encoding: 'utf8' })
      assert.equal(build.status, 0, build.stderr)
      assert.doesNotMatch(build.stdout + build.stderr, /WARN|ERROR/)
      const prefix = new URL(base).pathname
      const localTargets = new Set()
      for (const page of ledger.pages) {
        const content = html(page.url)
        assert.match(content, /styles\/modern\/main\.[a-f0-9]+\.css/)
        assert.match(content, /modern\.[a-f0-9]+\.js/)
        assert.doesNotMatch(content, /application\.[a-f0-9]+\.(?:css|js)|data-bs-|cdn\.jsdelivr\.net/)
        assert.ok(content.includes(`href=${base.replace(/\/$/, '')}${page.url}`) || content.includes(`href="${base.replace(/\/$/, '')}${page.url}"`), page.url)
        for (const oldURL of [page.oldURL, ...(page.previousURLs || [])]) {
          const alias = html(oldURL)
          assert.ok(alias.includes(`${base.replace(/\/$/, '')}${page.url}`), `alias ${oldURL}`)
        }
        // Read attributes only from actual opening tags, excluding escaped examples and Alpine bindings.
        for (const [tag] of content.matchAll(/<(?:a|img|source|video|link|script|iframe)\b[^>]*>/g)) {
          for (const [, quoted, bare] of tag.matchAll(/\s(?:href|src)=(?:"([^"]+)"|([^\s>]+))/g)) {
            const target = new URL(quoted ?? bare, base.replace(/\/$/, '') + page.url)
            if (target.origin !== new URL(base).origin) continue
            const pathname = decodeURIComponent(target.pathname).slice(prefix.length)
            if (/^(?:(?:fr|es)\/)?docs\//.test(pathname) || /^(?:videos|images)\//.test(pathname)) localTargets.add(pathname)
          }
        }
        if (!page.url.includes('/writing-posts/mermaid/')) assert.doesNotMatch(content, /modern-diagrams\./)
      }
      for (const target of localTargets) {
        assert.ok(existsSync(join(directory, 'public', target, target.endsWith('/') ? 'index.html' : '')), `missing local target: ${target}`)
      }
      for (const redirect of ledger.redirects) {
        assert.ok(html(redirect.from).includes(`${base.replace(/\/$/, '')}${redirect.to}`), redirect.from)
      }
      const navigation = html('/docs/portfolio/sections/about/').match(/<aside[^>]*class="?docs-sidebar[\s\S]*?<\/aside>/)[0]
      assert.equal([...navigation.matchAll(/class="docs-nav-section /g)].length, 8)
      const headings = [...navigation.matchAll(/<h2[^>]*>[\s\S]*?<a[^>]*>(.*?)<\/a>[\s\S]*?<\/h2>/g)].map(match => match[1])
      assert.deepEqual(headings, ['Getting started', 'Portfolio', 'Blog', 'Docs', 'Customization', 'Translation', 'Community', 'Shortcodes'])
      assert.match(navigation, /docs-tree-group[^>]*open/)
      assert.match(navigation, /href=["']?[^\s>]*portfolio\/sections\/about\/[^>]*aria-current=page/)
      assert.match(html('/docs/portfolio/'), /href=["']?[^\s>]*portfolio\/[^>]*aria-current=page>Portfolio/)
      assert.match(html('/docs/portfolio/sections/about/'), /content\/docs\/portfolio\/sections\/about\/index.md/)
      const shortcodeNames = readdirSync(join(repository, 'layouts/shortcodes')).map(name => name.replace(/\.html$/, ''))
      for (const name of shortcodeNames) for (const language of ['', 'fr/', 'es/']) {
        assert.match(html(`/${language}docs/shortcodes/${name}/`), /styles\/modern/)
      }
      const math = html('/docs/blog/writing-posts/math/')
      assert.equal([...math.matchAll(/<math\b/g)].length, 2, 'inline and block math must both render without JS')
      assert.doesNotMatch(math, /katex\.min\.(?:css|js)|math\.inline/)
      const diagrams = html('/docs/blog/writing-posts/mermaid/')
      assert.equal([...diagrams.matchAll(/<pre class=modern-mermaid/g)].length, 6)
      assert.match(diagrams, /modern-diagrams\.[a-f0-9]+\.js/)
      assert.match(diagrams, /Class01 (?:&lt;|<)\|-- AveryLongClass/)
      const shortcodes = html('/docs/shortcodes/')
      for (const tone of ['success', 'danger', 'warning', 'info']) assert.match(shortcodes, new RegExp(`data-tone=${tone}`))
      assert.match(shortcodes, /md:col-span-6/)
      assert.match(shortcodes, /<video[^>]*controls/)
      assert.doesNotMatch(shortcodes, /class="?row\b|col-lg-/)
      assert.match(html('/docs/customization/external-link/'), /href="?https:\/\/example.com\//)
      assert.doesNotMatch(html('/docs/portfolio/sections/featured-posts/'), /\/fr\/docs\/portfolio\/sections\/featured-posts\//)
      assert.equal(existsSync(join(directory, 'public/fr/docs/portfolio/sections/featured-posts/index.html')), false)
      assert.equal(existsSync(join(directory, 'public/fr/docs/blog/writing-posts/organizing/category/index.html')), false)
      assert.match(html('/es/docs/getting-started/quickstart/'), /Buscar en la documentación/)
      const searchURL = html('/fr/docs/').match(/data-docs-search-index="?([^\s">]+)/)[1]
      const index = JSON.parse(read(searchURL.slice(prefix.length)))
      assert.ok(index.length >= 44)
      assert.ok(index.every(page => page.url.startsWith(`${prefix}fr/docs/`)))
      assert.ok(index.some(page => page.title.includes('Traduction') || page.text.includes('traduction')))
      assert.deepEqual(index.find(page => page.url.endsWith('/blog/writing-posts/math/')).breadcrumbs.slice(0, 2), ['Documentation', 'Blog'])
      assert.ok(index.some(page => page.url.endsWith('/shortcodes/alert/')))
      assert.doesNotMatch(html('/fr/docs/documentation/'), /href=["']?[^\s>]*fr\/docs\/documentation\/(?:setup|services)\//)
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
