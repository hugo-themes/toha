# Consolidate dependency updates

## Goal

Update the root and example-site dependency sets and GitHub Actions on the current branch, verify production and preview builds, open one replacement PR, and close the seven superseded dependency PRs.

## Non-goals

- Replace Standard/ESLint, LibSass, Plyr, or Popper with a different toolchain.
- Change theme configuration, data structures, or visual features.
- Merge the replacement PR or close unrelated PRs.

## Files that own this behavior

- `package.json` and `package-lock.json`: theme dependencies and lint tooling.
- `package.hugo.json`: dependency versions exported to Hugo consumers.
- `exampleSite/package.json` and `exampleSite/package-lock.json`: integration site and generated Hugo workspace dependencies.
- `.github/workflows/*.yml`: GitHub Action versions.
- `.github/dependabot.yml`: grouped updates and compatibility constraints.

## Approach

- [x] Inventory npm releases, Action releases, Go modules, and open dependency PRs.
- [x] Synchronize all dependency manifests to current compatible releases and regenerate lockfiles through Hugo's existing workflow.
- [x] Update Actions and prevent known incompatible major upgrades until the associated toolchains are migrated.
- [x] Run clean installs, dependency validation, lint, production and Cloudflare preview builds, workflow validation, and focused UI smoke checks.
- [x] Obtain an independent review and record it as a Devcroft artifact.
- After verification, commit and push this branch, open a replacement PR, and close the superseded PRs with a link to it.

## Acceptance criteria

- Every direct npm dependency uses the latest stable release compatible with the existing toolchain; the root and example site agree with Hugo's exported dependency manifest.
- ESLint 8.57.1, eslint-plugin-n 16.6.2, eslint-plugin-promise 6.6.0, and include-media 1.4.10 remain intentional compatibility limits.
- Transitive DOMPurify and brace-expansion security updates from existing PRs are included.
- All workflow Action references use verified current stable Action releases.
- Clean installs and both builds succeed without dependency-resolution bypasses.
- Only dependency PRs #1238, #1236, #1235, #1234, #1233, #1232, and #1227 are superseded and closed after the replacement PR exists.

## Verification commands

```sh
npm ci --ignore-scripts
cd exampleSite && hugo mod tidy && hugo mod npm pack && npm ci --ignore-scripts
mise run check
HUGO_BUILDFUTURE=true npm run build:cloudflare
npm ls --all
npm ls --all --prefix exampleSite
actionlint .github/workflows/*.yml
git diff --check
```

The computer-use agent will inspect the homepage, blog navigation, and sample math/diagram rendering on a local server.

Completed command checks passed, and both npm audits reported zero vulnerabilities. The independent review found no blocking issues: [Devcroft review](devcroft:artifact/art-qgdwmaqs).

Delegated Safari checks confirmed desktop homepage styling, Posts navigation, typeset math, rendered Mermaid flowchart/sequence/Gantt diagrams, narrow-screen reflow, and mobile menu opening/closing. Console inspection was unavailable in this route.

## Risks / open questions

- Standard 17 requires ESLint 8, plugin-n 15/16, and promise 6; installing newer majors reproduces the preview failure.
- include-media 2 requires Sass modules unsupported by the current LibSass compilation path.
- Hugo's generated workspace must use the updated exported versions to avoid retaining obsolete duplicate packages.
- GitHub's CodeQL releases include bundle tags; select an Action release rather than the latest bundle release.
- Review remote checks after publishing; Cloudflare preview deployment is asynchronous.
