# Cloudflare Pages previews

Cloudflare Pages builds and publishes previews through its native GitHub
integration. Previews are available for branches in this repository; Cloudflare
does not automatically preview PRs from forks. Ordinary GitHub build and lint
checks still run for every PR.

## Pages project settings

Connect the existing Pages project to `hugo-themes/toha` and use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Root directory | Repository root (leave empty) |
| Build command | `npm run build:cloudflare` |
| Build output directory | `exampleSite/public` |
| Production branch | `main` |
| Preview branches | All non-production branches, or the desired branch allowlist |

Set these build environment variables in both Production and Preview:

| Variable | Value |
| --- | --- |
| `HUGO_VERSION` | `0.169.0` |
| `NODE_VERSION` | `26.13.0` |
| `GO_VERSION` | `1.27.3` |
| `HUGO_ENABLEGITINFO` | `true` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |

These tool versions were used to verify the migration locally. The build command
installs the root and example-site dependencies, prepares Hugo modules, and uses
Cloudflare's `CF_PAGES_URL` as Hugo's base URL. Pages supplies that URL for each
deployment; do not set it manually in the dashboard.

In the **Preview** environment only, set `HUGO_BUILDFUTURE=true` to retain the
previous preview behavior for future-dated sample posts. Keep previews public so
Lighthouse can access them. For a project dedicated to previews, automatic
production-branch deployments can be disabled in branch controls.

## Lighthouse

The existing PR workflow waits for the native Cloudflare deployment matching the
PR's head commit, then audits the same four URLs on mobile and desktop. It uses
the immutable deployment URL, not a branch alias that may point to another build.
The wait step times out after ten minutes and reports Cloudflare build failures.

Configure these GitHub Actions **repository variables**:

| Variable | Value |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | The account ID containing the Pages project |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | The existing project name, without `.pages.dev` |

Add a **repository secret** named `CLOUDFLARE_API_TOKEN`, using a Cloudflare token
with **Account → Cloudflare Pages → Read** for that account. This token only
reads deployment status; Cloudflare's Git integration performs the deployment.
For audits on Dependabot PRs, add the same token as a **Dependabot secret** too.

Lighthouse is skipped for fork PRs and until both repository variables are set.
Reports are saved as workflow artifacts for seven days. Human-authored PRs also
receive the existing Lighthouse comment; Dependabot audits omit comments because
their GitHub token is read-only. No separate `LIGHTHOUSE_TOKEN` is needed.

## Netlify cutover

After the first Cloudflare preview and Lighthouse audit succeed:

1. Stop automatic builds or disconnect this repository in the Netlify `toha-ci`
   project. Deleting `netlify.toml` does not disconnect the service itself.
2. Remove required Netlify preview, header, redirect and pages-changed checks
   from GitHub branch protection or rulesets. Use the Cloudflare Pages check
   instead. Do not require preview/Lighthouse checks for fork PRs.
3. Remove obsolete `NETLIFY_TOKEN` and `LIGHTHOUSE_TOKEN` secrets if no other
   workflow uses them. Keep any shared Netlify app needed by other sites.

The public example-site and documentation links keep their current domains;
moving those sites is separate from replacing PR previews.

## Local verification

```sh
mise run check
CF_PAGES_URL=https://preview.example.pages.dev HUGO_BUILDFUTURE=true npm run build:cloudflare
actionlint .github/workflows/pull-request.yml
```

References: [Cloudflare GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/),
[Hugo on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/),
[build environment](https://developers.cloudflare.com/pages/configuration/build-image/),
and [Cloudflare Pages Await](https://github.com/WalshyDev/cf-pages-await).
