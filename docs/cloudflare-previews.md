# Cloudflare previews

The connected `toha` service uses **Cloudflare Workers Builds**. Use the Worker
settings below for that service. Cloudflare Pages is a separate product; its
optional setup is documented afterward.

## Worker settings

In **Workers & Pages → toha → Settings → Builds**, use:

| Setting | Value |
| --- | --- |
| Root directory | Repository root (leave empty) |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Production branch | `main` |
| Preview builds | Enabled for branches in this repository |

Set these **build variables** for production and previews:

| Variable | Value |
| --- | --- |
| `HUGO_VERSION` | `0.169.0` |
| `NODE_VERSION` | `26.13.0` |
| `GO_VERSION` | `1.27.3` |
| `HUGO_ENABLEGITINFO` | `true` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |

Set `HUGO_BUILDFUTURE=true` for previews to include future-dated sample posts.
The default Hugo version, `0.147.7`, is too old: Toha requires **Hugo Extended
0.163.0 or newer**.

`wrangler.jsonc` serves the built `exampleSite/public` directory and its custom
404 pages. Workers does not supply `CF_PAGES_URL`, so the build uses `/` as Hugo's
base URL: links and assets stay on whichever preview host serves the site.
Canonical, Open Graph, and feed URLs are also root-relative in Worker builds.
Do not invent a `CF_PAGES_URL` value for a Worker.

Cloudflare builds and publishes the preview through its native Git integration
and provides its URL in the build details and PR comment. No deployment script
or Cloudflare deployment token is needed in GitHub Actions. The current
Lighthouse workflow only integrates with **Pages**; it stays skipped for the
Worker unless a separate Pages project is configured. Build and lint checks
continue to run for all PRs. Automatic fork previews remain outside this setup.

## Pages project settings (optional)

Cloudflare Pages builds and publishes previews through its native GitHub
integration. Previews are available for branches in this repository; Cloudflare
does not automatically preview PRs from forks. Ordinary GitHub build and lint
checks still run for every PR.

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
Cloudflare's `CF_PAGES_URL` as Hugo's base URL when present. Pages supplies that
URL for each deployment; do not set it manually in the dashboard.

In the **Preview** environment only, set `HUGO_BUILDFUTURE=true` to retain the
previous preview behavior for future-dated sample posts. Keep previews public so
Lighthouse can access them. For a project dedicated to previews, automatic
production-branch deployments can be disabled in branch controls.

## Lighthouse for Pages

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

After the first Cloudflare preview succeeds (and Lighthouse, if using Pages):

1. Stop automatic builds or disconnect this repository in the Netlify `toha-ci`
   project. Deleting `netlify.toml` does not disconnect the service itself.
2. Remove required Netlify preview, header, redirect and pages-changed checks
   from GitHub branch protection or rulesets. Use the relevant Cloudflare check
   instead. Do not require preview/Lighthouse checks for fork PRs.
3. Remove obsolete `NETLIFY_TOKEN` and `LIGHTHOUSE_TOKEN` secrets if no other
   workflow uses them. Keep any shared Netlify app needed by other sites.

The public example-site and documentation links keep their current domains;
moving those sites is separate from replacing PR previews.

## Local verification

```sh
mise run check
# Worker build: no Pages environment variable is required.
env -u CF_PAGES_URL HUGO_BUILDFUTURE=true npm run build:cloudflare
npx wrangler deploy --dry-run
# Optional Pages build:
CF_PAGES_URL=https://preview.example.pages.dev HUGO_BUILDFUTURE=true npm run build:cloudflare
actionlint .github/workflows/pull-request.yml
```

References: [Workers build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/),
[Workers build environment](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/),
[static site routing](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/),
[Cloudflare GitHub integration](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/),
[Hugo on Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/),
[build environment](https://developers.cloudflare.com/pages/configuration/build-image/),
and [Cloudflare Pages Await](https://github.com/WalshyDev/cf-pages-await).
