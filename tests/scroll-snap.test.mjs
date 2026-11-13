/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))

test('scroll snapping is opt-in, respects language overrides, and is limited to homepages', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-scroll-snap-'))
  const write = (path, content) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })
    writeFileSync(join(directory, path), content)
  }
  const config = {
    baseURL: 'https://example.org/',
    defaultContentLanguage: 'en',
    defaultContentLanguageInSubdir: true,
    languages: { en: { weight: 1 }, bn: { weight: 2 } }
  }
  const build = () => {
    write('hugo.json', JSON.stringify(config))
    execFileSync('hugo', ['--source', directory, '--cleanDestinationDir'], { stdio: 'pipe' })
  }
  const root = (path) => readFileSync(join(directory, 'public', path), 'utf8').match(/<html\b[^>]*>/)[0]
  try {
    for (const path of ['layouts/index.html', 'layouts/_default/baseof.html']) {
      mkdirSync(dirname(join(directory, path)), { recursive: true })
      copyFileSync(join(repository, path), join(directory, path))
    }
    for (const name of ['header', 'opengraph', 'twitter_cards', 'robots', 'structured-data', 'analytics',
      'footer', 'scripts', 'misc/support', 'navigators/navbar', 'sections/home', 'helpers/get-description']) {
      write(`layouts/partials/${name}.html`, '')
    }
    write('layouts/_default/single.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('layouts/_default/list.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('content/posts/example.md', '---\ntitle: Example\n---\nArticle content.')
    write('content/posts/example.bn.md', '---\ntitle: উদাহরণ\n---\nবাংলা বিষয়বস্তু।')

    for (const enable of [undefined, false, true]) {
      config.params = enable === undefined ? {} : { features: { scrollSnap: { enable } } }
      build()
      for (const language of ['en', 'bn']) {
        assert.equal(root(`${language}/index.html`).includes('class="scroll-snap"'), enable === true)
        for (const path of ['posts/index.html', 'posts/example/index.html']) {
          assert.doesNotMatch(root(`${language}/${path}`), /scroll-snap/)
        }
      }
    }

    config.languages.bn.params = { features: { scrollSnap: { enable: false } } }
    build()
    assert.match(root('en/index.html'), /class="scroll-snap"/)
    assert.doesNotMatch(root('bn/index.html'), /scroll-snap/)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
