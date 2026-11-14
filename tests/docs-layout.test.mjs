/* eslint-env node */
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../', import.meta.url))

// Install the already-locked modern dependency closure into an external consumer.
// No network, symlinks to repository source, or extra Hugo file permissions.
function copyModernDependencies (directory) {
  const copied = new Set()
  function copy (name) {
    if (copied.has(name)) return
    const source = join(repository, 'node_modules', name)
    if (!existsSync(source)) return // Optional native binaries for other platforms.
    copied.add(name)
    const target = join(directory, 'node_modules', name)
    mkdirSync(dirname(target), { recursive: true })
    cpSync(source, target, { recursive: true })
    const pkg = JSON.parse(readFileSync(join(source, 'package.json'), 'utf8'))
    for (const dependency of Object.keys({ ...pkg.dependencies, ...pkg.optionalDependencies })) copy(dependency)
  }
  for (const name of ['alpinejs', 'tailwindcss', '@tailwindcss/cli']) copy(name)
  mkdirSync(join(directory, 'node_modules/.bin'), { recursive: true })
  symlinkSync('../@tailwindcss/cli/dist/index.mjs', join(directory, 'node_modules/.bin/tailwindcss'))
}

test('external docs consumer renders components, language/subpath URLs, and isolated modern assets', () => {
  const directory = mkdtempSync(join(tmpdir(), 'toha-docs-consumer-'))
  const write = (path, content) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })
    writeFileSync(join(directory, path), typeof content === 'string' ? content : JSON.stringify(content))
  }
  const config = {
    baseURL: 'https://example.org/project/',
    title: 'Component consumer',
    defaultContentLanguage: 'en',
    defaultContentLanguageInSubdir: true,
    languages: { en: { weight: 1, languageName: 'English' }, bn: { weight: 2, languageName: 'বাংলা' } },
    disableKinds: ['taxonomy', 'term'],
    ignoreFiles: ['/theme/content/(posts|search)/'],
    module: {
      imports: [{ path: 'github.com/hugo-toha/toha/v4' }],
      mounts: [
        { source: 'assets', target: 'assets' },
        { source: 'hugo_stats.json', target: 'assets/notwatching/hugo_stats.json', disableWatch: true }
      ]
    },
    build: { buildStats: { enable: true } },
    security: { exec: { allow: ['^go$', '^git$', '^node$', '^tailwindcss$'] } },
    markup: { highlight: { noClasses: false } },
    params: { home: { layout: 'docs' }, features: { docs: { enable: true, section: 'docs' } } }
  }
  const build = () => {
    write('hugo.json', config)
    return execFileSync('hugo', ['--cacheDir', join(directory, 'cache'), '--cleanDestinationDir', '--minify'], {
      cwd: directory, stdio: 'pipe'
    })
  }
  const html = (path = 'en/docs/components/index.html') => readFileSync(join(directory, 'public', path), 'utf8')
  try {
    // A copied distribution ensures class discovery and module imports cannot
    // accidentally depend on the monorepo checkout or its node_modules paths.
    for (const path of ['layouts', 'assets', 'i18n', 'content', 'go.mod', 'hugo.yaml', 'package.hugo.json']) {
      cpSync(join(repository, path), join(directory, 'theme', path), { recursive: true })
    }
    copyModernDependencies(directory)
    write('go.mod', 'module example.org/consumer\n\ngo 1.25\n\nrequire github.com/hugo-toha/toha/v4 v4.7.0\nreplace github.com/hugo-toha/toha/v4 => ./theme\n')
    cpSync(join(repository, 'exampleSites/docs/content'), join(directory, 'content'), { recursive: true })
    write('content/_index.md', '---\ntitle: Docs home\n---\n## A code example\n\n```sh\necho hello\n```')
    // Legacy fixture services avoid installing Bootstrap; real portfolio builds
    // exercise those bundles. The actual selector and base template stay intact.
    for (const name of ['analytics', 'footer', 'misc/support']) write(`layouts/partials/${name}.html`, '')
    write('layouts/partials/header.html', '<link rel="stylesheet" href="/legacy.css">')
    write('layouts/partials/scripts.html', '<script src="/legacy.js"></script>')
    write('layouts/partials/navigators/navbar.html', '<nav data-legacy-navigation></nav>')
    write('layouts/partials/sections/home.html', '<section data-portfolio-home></section>')
    write('layouts/_default/single.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('layouts/_default/list.html', '{{ define "content" }}{{ .Content }}{{ end }}')
    write('content/docs/_index.bn.md', '---\ntitle: ডকুমেন্টেশন\ncascade:\n  type: docs\n---\n## পরিচয়\nস্বাগতম।')
    write('content/docs/components.bn.md', '---\ntitle: কম্পোনেন্ট\nweight: 20\n---\n## উদাহরণ\nবাংলা বিষয়বস্তু।')
    write('content/posts/example.md', '---\ntitle: Legacy article\n---\nLegacy content.')
    write('content/docs/quiet.md', '---\ntitle: No outline\ntoc: false\nweight: 40\n---\n## A heading\nContent without an outline.')
    build()

    const gallery = html()
    const ids = [...gallery.matchAll(/\bid=(?:"([^"]+)"|([^\s>]+))/g)].map(([, quoted, bare]) => quoted ?? bare)
    assert.equal(new Set(ids).size, ids.length, 'responsive outlines must not duplicate element IDs')
    assert.match(gallery, /<html lang=en/)
    assert.doesNotMatch(html('en/index.html'), /code-block-data/)
    assert.match(gallery, /property="og:type" content="article"/)
    assert.match(gallery, /href=\/project\/en\/docs\/getting-started\//)
    assert.match(gallery, /href=\/project\/en\/docs\/guides\/composition\//)
    assert.match(gallery, /href=\/project\/bn\/docs\/components\//)
    assert.match(gallery, /aria-current=page>Component gallery/)
    assert.match(gallery, /aria-label="Documentation overview"/)
    assert.match(gallery, /<button[^>]*type=button[^>]*disabled[^>]*>Unavailable action/)
    assert.match(gallery, /<details[^>]*open[^>]*><summary[^>]*>An initially expanded disclosure/)
    assert.match(gallery, /<svg[^>]*aria-hidden="?true"?[^>]*focusable="?false"?/)
    assert.match(gallery, /href=#main-content>Skip to content/)
    assert.match(gallery, /<aside[^>]*aria-label="On this page"/)
    assert.doesNotMatch(gallery, /legacy\.(css|js)|data-bs-|code-block-data/)
    assert.match(gallery, /<link[^>]*href="?\/project\/styles\/modern\/main\.[a-f0-9]+\.css"?[^>]*integrity=/)
    assert.match(gallery, /<script[^>]*src=\/project\/modern\.[a-f0-9]+\.js[^>]*integrity=/)
    const cssPath = gallery.match(/href="?(\/project\/styles\/modern\/main\.[a-f0-9]+\.css)/)[1].replace('/project/', '')
    const css = readFileSync(join(directory, 'public', cssPath), 'utf8')
    assert.match(css, /\.bg-primary/)
    assert.match(css, /\.docs-prose/)
    assert.match(css, /\.dark\{/)
    assert.match(css, /grid-template-columns:17rem minmax\(0,1fr\)/)
    assert.match(html('bn/docs/components/index.html'), /এই পৃষ্ঠায়/)
    assert.match(html('bn/docs/components/index.html'), /href=\/project\/bn\/docs\//)
    assert.match(html('en/docs/guides/composition/index.html'), /docs-tree-group[^>]*open/)
    assert.match(html('en/docs/guides/composition/index.html'), /href=\/project\/en\/docs\/guides\/[^>]*><span[^>]*>Previous/)
    assert.match(html('en/posts/example/index.html'), /legacy\.css/)
    assert.doesNotMatch(html('en/posts/example/index.html'), /modern\.[a-f0-9]+\.js|styles\/modern/)
    assert.match(html('en/404.html'), /styles\/modern/)
    assert.doesNotMatch(html('en/docs/quiet/index.html'), /docs-mobile-toc|docs-desktop-toc/)

    // Hugo falls back to the site's default locale, which may not be English.
    // Every bundled default locale must still expose named controls.
    config.defaultContentLanguage = 'de'
    const languages = config.languages
    config.languages = { de: { weight: 1, languageName: 'Deutsch' } }
    build()
    const german = html('de/docs/components/index.html')
    assert.match(german, /aria-label="Dark mode"/)
    assert.match(german, /aria-label="Documentation navigation"/)
    assert.match(german, /On this page/)
    assert.match(german, /Skip to content/)
    config.defaultContentLanguage = 'en'
    config.languages = languages

    // Defaults remain portfolio even when the docs area is enabled.
    delete config.params.home
    build()
    assert.match(html('en/index.html'), /data-portfolio-home/)
    assert.doesNotMatch(html('en/index.html'), /styles\/modern|modern\.[a-f0-9]+\.js/)
    config.params.home = { layout: 'portfolio' }
    build()
    assert.match(html('en/index.html'), /data-portfolio-home/)

    // Existing content with type docs retains legacy rendering when disabled.
    config.params.features.docs.enable = false
    rmSync(join(directory, 'content/docs/components.md'))
    rmSync(join(directory, 'content/docs/_index.md'))
    rmSync(join(directory, 'content/docs/guides/composition.md'))
    build()
    assert.match(html('bn/docs/components/index.html'), /legacy\.css/)
    assert.doesNotMatch(html('bn/docs/components/index.html'), /styles\/modern/)

    config.params.home.layout = 'docs'
    assert.throws(build, /docs layout requires params.features.docs.enable/)
    config.params.home.layout = 'unknown'
    assert.throws(build, /Unknown params.home.layout/)

    config.params.home.layout = 'docs'
    config.params.features.docs.enable = true
    config.params.features.docs.section = 'missing'
    assert.throws(build, /content section.*missing.*not found/)

    config.params.features.docs.section = 'docs/getting-started'
    assert.throws(build, /must identify a content section/)
    config.params.features.docs.section = 'docs'
    config.params.home.layout = 'portfolio'
    write('content/legacy-probe.md', '---\ntitle: Legacy shortcode probe\n---\n{{< ui-badge label="Unstyled" >}}')
    assert.throws(build, /requires an enabled modern docs page/)
    rmSync(join(directory, 'content/legacy-probe.md'))
    write('content/probe.md', '---\ntitle: Contract probe\nlayout: component-probe\n---')
    const invalidInputs = [
      ['button', '(dict)', /label is required/],
      ['button', '(dict "label" "Action" "variant" "invalid")', /unknown variant/],
      ['button', '(dict "label" "Action" "iconOnly" true)', /iconOnly requires icon/],
      ['button', '(dict "label" "Action" "href" "/" "disabled" true)', /disabled links are not supported/],
      ['badge', '(dict "label" "Badge" "tone" "invalid")', /unknown tone/],
      ['icon', '(dict "name" "invalid")', /unknown name/]
    ]
    for (const [component, inputs, error] of invalidInputs) {
      write('layouts/_default/component-probe.html', `{{ partial "components/${component}.html" ${inputs} }}`)
      assert.throws(build, error)
    }
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
