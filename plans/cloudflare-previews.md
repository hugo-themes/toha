# Native Cloudflare PR previews

## Goal

Replace Netlify previews with Cloudflare Pages' native GitHub integration and
retain Lighthouse auditing of the resulting deployment.

## Non-goals

- Automatic previews for PRs from forks, per the user's chosen scope.
- Custom publishing workflows, artifact-validation scripts or deployment tokens.
- Move the public example site or documentation to a new domain.
- Change theme behavior or dependency versions.

## Files that own this behavior

- `.github/workflows/pull-request.yml`: wait for Cloudflare and audit its URL.
- `package.json`: Cloudflare-native build command using `CF_PAGES_URL`.
- `netlify.toml`: obsolete hosting configuration to remove.
- `docs/cloudflare-previews.md` and `README.md`: setup and migration instructions.

## Approach

- [x] Use Cloudflare's native GitHub integration to build and publish previews.
- [x] Provide one npm build command that installs the same dependencies/modules
  as the existing build, then passes `CF_PAGES_URL` to Hugo.
- [x] Replace the Netlify wait action with a pinned Cloudflare wait action that
  matches the exact PR head commit. A read-only API token is sufficient.
- [x] Skip Lighthouse for forks and unconfigured projects; retain reports for
  Dependabot and comments for human-authored PRs.
- [x] Remove Netlify configuration and badge. Document native build settings,
  required variables/read token, and service-side Netlify cutover.
- [x] Verify the final diff and obtain an independent review.

## Acceptance criteria

- No custom deployment scripts or upload workflow are added.
- Build/lint checks continue for all PRs without Cloudflare credentials.
- Native Pages previews work for repository branches after account setup.
- Lighthouse waits for the PR's exact commit and audits its deployment URL.
- Preview failures/timeouts fail the Lighthouse job rather than auditing an old
  deployment. No deployment is initiated by GitHub Actions.
- The Netlify integration cutover and unsupported fork previews are documented.

## Verification commands

- `mise run check`
- `CF_PAGES_URL=https://preview.example.pages.dev HUGO_BUILDFUTURE=true npm run build:cloudflare`
- `actionlint .github/workflows/pull-request.yml`
- Inspect the generated canonical/Open Graph URLs and all four Lighthouse paths.
- Review GitHub PR checks after pushing. An actual native preview requires the
  existing Pages project to be connected and configured.

Local production and Cloudflare builds, ESLint, actionlint/ShellCheck, and all
four Lighthouse path/base-URL checks passed. The independent review found no
outstanding issues: [review record](devcroft:artifact/art-v69htsyn).

## Risks / open questions

- The existing Pages project name has not yet been provided; GitHub repository
  variables supply the account and project name without hardcoding them.
- Configure the read token as both an Actions secret and a Dependabot secret
  when auditing dependency PRs.
- Native Pages GitHub integration does not preview fork PRs; this is an accepted
  limitation. Do not make preview checks universally required for fork PRs.
- Netlify auto-builds/status requirements must be disabled separately in service
  and GitHub settings after Cloudflare is verified.
