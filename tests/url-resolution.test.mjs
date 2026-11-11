/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))
const pageCases = {
  home: ['', '/'],
  root: ['/', '/'],
  posts: ['posts', '/posts'],
  directory: ['/posts/', '/posts/'],
  tags: ['/tags/basic/', '/tags/basic/'],
  query: ['/posts/?next=https://example.org/a/&view=full', '/posts/?next=https://example.org/a/&view=full'],
  parentQuery: ['/posts/?next=/../other', '/posts/?next=/../other'],
  fragment: ['/posts/#part/../two', '/posts/#part/../two'],
  escaped: ['/posts/a%2Fb/?q=%2F#part%2Fone', '/posts/a%2Fb/?q=%2F#part%2Fone'],
  nearPrefix: ['/subpath-other/page/', '/subpath-other/page/'],
  nearLanguage: ['/bn-other/page/', '/bn-other/page/']
}
const languagePaths = ['/en/posts/', '/bn/posts/']
const unchanged = [
  'https://example.org/a/?next=/../other#part/../two',
  'HTTP://example.org/a/',
  '//cdn.example.org/image.png',
  'mailto:hello@example.org',
  'tel:+123456789',
  'data:image/png;base64,AAAA',
  '#skills',
  '?view=print&next=https://example.org/a/'
]

function writeFixture (directory, path, content) {
  const target = join(directory, path)
  mkdirSync(dirname(target), { recursive: true })
  writeFileSync(target, content)
}

for (const basePath of ['', '/subpath']) {
  for (const defaultInSubdir of [false, true]) {
    test(`URL resolution: base=${basePath || '/'} default language subdir=${defaultInSubdir}`, () => {
      const directory = mkdtempSync(join(tmpdir(), 'toha-url-test-'))
      try {
        const prefixedPaths = basePath ? [`${basePath}/posts/?next=https://example.org/a/`, `${basePath}?view=full`] : []
        writeFixture(directory, 'hugo.json', JSON.stringify({
          baseURL: `https://example.org${basePath}/`,
          defaultContentLanguage: 'en',
          defaultContentLanguageInSubdir: defaultInSubdir,
          languages: { en: { weight: 1 }, bn: { weight: 2 } },
          disableKinds: ['taxonomy', 'term', 'RSS', 'sitemap']
        }))
        for (const path of [
          'layouts/partials/helpers/get-relative-url.html',
          'layouts/partials/helpers/get-page-url.html',
          'layouts/partials/helpers/get-resource-url.html',
          'layouts/partials/cards/publication.html',
          'layouts/shortcodes/img.html',
          'i18n/en.toml',
          'i18n/bn.toml'
        ]) {
          mkdirSync(dirname(join(directory, path)), { recursive: true })
          copyFileSync(join(repository, path), join(directory, path))
        }
        writeFixture(directory, 'data/urls.json', JSON.stringify([
          ...Object.values(pageCases).map(([input]) => input), ...languagePaths, ...prefixedPaths, ...unchanged
        ]))
        writeFixture(directory, 'layouts/home.html', `
          {{ $pages := slice }}
          {{ $resources := slice }}
          {{ range site.Data.urls }}
            {{ $pages = $pages | append (partial "helpers/get-page-url.html" .) }}
            {{ $resources = $resources | append (partial "helpers/get-resource-url.html" .) }}
          {{ end }}
          {{ $paper := dict "url" "/files/paper.pdf?next=https://example.org/a/" }}
          {{ $publication := partial "cards/publication.html" (dict "title" "Paper" "paper" $paper) }}
          {{ dict "pages" $pages "resources" $resources "publication" $publication | jsonify }}
        `)
        writeFixture(directory, 'layouts/_default/list.html', '{{ range .Pages }}{{ .RelPermalink }}{{ end }}')
        writeFixture(directory, 'layouts/_default/single.html', '{{ .Content }}')
        const bundlePath = `${defaultInSubdir ? '/en' : ''}/posts/probe/boat.jpg`
        for (const language of ['en', 'bn']) {
          writeFixture(directory, `content/posts/probe/index.${language}.md`, `---
title: Probe
---
{{< img src="boat.jpg" title="relative" >}}
{{< img src="./boat.jpg" title="dot-relative" >}}
{{< img src="../other.jpg" title="parent-relative" >}}
{{< img src="${bundlePath}" title="shared-bundle" >}}
{{< img src="/images/shared.svg" title="static" >}}
{{< img src="${basePath}/images/shared.svg" title="prefixed-static" >}}
{{< img src="/images/shared.svg?next=https://example.org/a/" title="query" >}}
{{< img src="https://example.org/image.jpg" title="external" >}}
{{< img src="//cdn.example.org/image.jpg" title="protocol-relative" >}}
`)
        }
        writeFixture(directory, 'content/posts/probe/boat.jpg', 'bundle image fixture')
        writeFixture(directory, 'static/images/shared.svg', '<svg xmlns="http://www.w3.org/2000/svg"/>')
        writeFixture(directory, 'static/files/paper.pdf', 'paper fixture')
        execFileSync('hugo', ['--source', directory], { stdio: 'pipe' })

        for (const language of ['en', 'bn']) {
          const languagePath = language === 'en' && !defaultInSubdir ? '' : `/${language}`
          const pagePrefix = `${basePath}${languagePath}`
          const output = join(directory, 'public', languagePath)
          const home = JSON.parse(readFileSync(join(output, 'index.html'), 'utf8'))
          const expectedPages = [
            ...Object.values(pageCases).map(([, suffix]) => `${pagePrefix}${suffix}`),
            ...languagePaths.map(path => `${basePath}${path}`), ...prefixedPaths, ...unchanged
          ]
          assert.deepEqual(home.pages, expectedPages, `${language}: page URLs`)
          assert.deepEqual(home.resources, [
            '', `${basePath}/`, 'posts', `${basePath}/posts/`, `${basePath}/tags/basic/`,
            ...Object.values(pageCases).slice(5).map(([, suffix]) => `${basePath}${suffix}`),
            ...languagePaths.map(path => `${basePath}${path}`), ...prefixedPaths, ...unchanged
          ], `${language}: resource URLs`)
          assert.ok(home.publication.includes(`href="${basePath}/files/paper.pdf?next=https://example.org/a/"`),
            `${language}: publication PDF must not gain a language prefix`)

          const html = readFileSync(join(output, 'posts/probe/index.html'), 'utf8')
          const images = Object.fromEntries([...html.matchAll(/<img\b[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/g)]
            .map(([, src, alt]) => [alt, src]))
          assert.deepEqual(images, {
            relative: 'boat.jpg',
            'dot-relative': './boat.jpg',
            'parent-relative': '../other.jpg',
            'shared-bundle': `${basePath}${bundlePath}`,
            static: `${basePath}/images/shared.svg`,
            'prefixed-static': `${basePath}/images/shared.svg`,
            query: `${basePath}/images/shared.svg?next=https://example.org/a/`,
            external: 'https://example.org/image.jpg',
            'protocol-relative': '//cdn.example.org/image.jpg'
          }, `${language}: shortcode image URLs`)
          for (const name of ['static', 'prefixed-static', 'shared-bundle']) {
            const path = images[name].slice(basePath.length)
            assert.ok(existsSync(join(directory, 'public', path)), `${language}: ${name} image exists`)
          }
          if (language === 'en') {
            assert.ok(existsSync(join(output, 'posts/probe', images.relative)), 'page-relative image exists')
          }
        }
      } finally {
        rmSync(directory, { recursive: true, force: true })
      }
    })
  }
}
