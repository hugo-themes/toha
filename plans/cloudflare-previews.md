# Native Cloudflare PR previews

## Goal

Replace Netlify previews with Cloudflare's native GitHub integration. Support
the connected `toha` Worker and retain optional Pages/Lighthouse integration.

## Non-goals

- Automatic previews for PRs from forks, per the user's chosen scope.
- Custom publishing workflows, artifact-validation scripts or deployment tokens.
- Move the public example site or documentation to a new domain.
- Change theme behavior or dependency versions.

## Files that own this behavior

- `.github/workflows/pull-request.yml`: wait for Cloudflare and audit its URL.
- `package.json`: Cloudflare-native build command using `CF_PAGES_URL` when
  supplied by Pages, otherwise root-relative URLs for Workers.
- `wrangler.jsonc`: native Previews opt-in, preview URLs, static asset directory
  and custom 404 routing for `toha`.
- `.gitignore`: local Wrangler output.
- `netlify.toml`: obsolete hosting configuration to remove.
- `docs/cloudflare-previews.md` and `README.md`: setup and migration instructions.

## Approach

- [x] Use Cloudflare's native GitHub integration to build and publish previews.
- [x] Provide one npm build command that installs the same dependencies/modules
  as the existing build, then passes `CF_PAGES_URL` or `/` to Hugo.
- [x] Serve the generated site through the existing Worker without requiring
  Pages-specific environment variables.
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
- Native Worker builds succeed without `CF_PAGES_URL`; assets use the preview
  host and Wrangler points to `exampleSite/public`.
- When Pages is configured, Lighthouse waits for the PR's exact commit and
  audits its deployment URL. Worker previews do not run the Pages audit.
- Preview failures/timeouts fail the Lighthouse job rather than auditing an old
  deployment. No deployment is initiated by GitHub Actions.
- The Netlify integration cutover and unsupported fork previews are documented.

## Verification commands

- `mise run check`
- `env -u CF_PAGES_URL HUGO_BUILDFUTURE=true npm run build:cloudflare`
- `npx wrangler deploy --dry-run`
- `CF_PAGES_URL=https://preview.example.pages.dev HUGO_BUILDFUTURE=true npm run build:cloudflare`
- `actionlint .github/workflows/pull-request.yml`
- Inspect the generated canonical/Open Graph URLs and all four Lighthouse paths.
- Review GitHub PR checks after pushing. An actual native preview requires the
  connected service's build settings to match the documented configuration.

Production, Worker (no `CF_PAGES_URL`) and Pages builds passed. Worker output
uses root-relative URLs for the four Lighthouse paths, Bengali homepage and
custom 404; Pages retains its supplied preview hostname. Wrangler 4.158.0's
deploy dry-run accepted 1,099 generated static assets. ESLint,
actionlint/ShellCheck and `git diff --check` passed. Independent review found no
blockers: [review record](devcroft:artifact/art-v69htsyn). Live Cloudflare
verification confirmed Hugo Extended builds the site; deployment verification
with the native Previews opt-in is pending.

## Risks / open questions

- The connected Cloudflare service is a Worker named `toha`. Workers does not
  supply `CF_PAGES_URL`. Root-relative URLs work across preview hosts, but do not
  provide absolute canonical/Open Graph/feed URLs. Public-site migration is
  outside this preview-only change.
- Workers needs build variable `HUGO_VERSION=extended_0.169.0`; the plain version
  selects the standard edition and fails SCSS compilation. Configure Previews
  Base as well as existing previews, and enable Preview URLs.
- `npx wrangler preview` requires `"previews": {}` even for an assets-only
  Worker. A production deploy dry-run does not exercise this preview path.
- No Pages project name has been provided. The optional Pages audit remains
  skipped until its repository variables are configured; it cannot audit Workers.
- Configure the read token as both an Actions secret and a Dependabot secret
  when auditing dependency PRs.
- Native Pages GitHub integration does not preview fork PRs; this is an accepted
  limitation. Do not make preview checks universally required for fork PRs.
- Netlify auto-builds/status requirements must be disabled separately in service
  and GitHub settings after Cloudflare is verified.
