/* eslint-env node */
import { cpSync, existsSync, mkdirSync, readFileSync, symlinkSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const repository = fileURLToPath(new URL('../../', import.meta.url))

// Install the already-locked modern dependency closure into an external consumer.
// No network, symlinks to repository source, or extra Hugo file permissions.
export function copyModernDependencies (directory) {
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
  for (const name of ['alpinejs', 'tailwindcss', '@tailwindcss/cli', 'fuse.js']) copy(name)
  mkdirSync(join(directory, 'node_modules/.bin'), { recursive: true })
  symlinkSync('../@tailwindcss/cli/dist/index.mjs', join(directory, 'node_modules/.bin/tailwindcss'))
}
