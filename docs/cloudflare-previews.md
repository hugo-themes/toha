# Cloudflare previews

The `toha` Worker builds and publishes previews through Cloudflare's native
GitHub integration for branches in this repository.

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
| `HUGO_VERSION` | `extended_0.169.0` |
| `NODE_VERSION` | `26.13.0` |
| `GO_VERSION` | `1.27.3` |
| `HUGO_ENABLEGITINFO` | `true` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |

Set `HUGO_BUILDFUTURE=true` for previews to include future-dated sample posts.
The default Hugo version, `0.147.7`, is too old: Toha requires **Hugo Extended
0.163.0 or newer**. On Workers, keep the `extended_` prefix; a plain version
selects the standard edition, which cannot compile the theme's SCSS. These
are build variables, not runtime variables in `wrangler.jsonc`.

Apply the preview build command and variables under **Previews Base** so new
branch previews inherit them. Existing previews have their own settings and may
need the same update separately. Enable Preview URLs if the dashboard reports
that they are disabled; `wrangler.jsonc` also enables them on deployment.

`wrangler.jsonc` enables preview URLs, opts into native Previews with
`"previews": {}`, and serves `exampleSite/public` and its custom 404 pages.
The build uses `/` as Hugo's base URL: links and assets stay on whichever
preview host serves the site. Canonical, Open Graph, and feed URLs are also
root-relative in preview builds.

## GitHub checks

Cloudflare supplies the preview URL in its build details and PR comment. The
`Workers Builds: toha` check reports whether the preview built and deployed.
GitHub Actions runs build, lint and Markdown link checks for every PR.
Automatic previews for PRs from forks are outside this setup.

No Cloudflare project-name variable or API token is required in GitHub Actions.
Remove `CLOUDFLARE_PAGES_PROJECT_NAME` if it was added for the old Pages wait
step. The Pages-specific Lighthouse job has been removed; automatic Lighthouse
audits are not part of this Worker preview setup.

## Netlify cutover

After the first Cloudflare preview succeeds:

1. Stop automatic builds or disconnect this repository in the Netlify `toha-ci`
   project. Deleting `netlify.toml` does not disconnect the service itself.
2. Remove required Netlify preview, header, redirect and pages-changed checks
   from GitHub branch protection or rulesets. Use the relevant Cloudflare check
   instead. Do not require preview checks for fork PRs.
3. Remove obsolete `NETLIFY_TOKEN` and `LIGHTHOUSE_TOKEN` secrets if no other
   workflow uses them. Remove a required `lighthouse-check` status if present.
   Keep any shared Netlify app needed by other sites.

The public example-site and documentation links keep their current domains;
moving those sites is separate from replacing PR previews.

## Local verification

```sh
mise run check
HUGO_BUILDFUTURE=true npm run build:cloudflare
npx wrangler deploy --dry-run
actionlint .github/workflows/pull-request.yml
```

References: [Workers build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/),
[Workers build environment](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/),
[native Previews configuration](https://developers.cloudflare.com/workers/previews/configuration/),
and [static site routing](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).
