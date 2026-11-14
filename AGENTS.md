# Toha Hugo Theme - AI Agent Context

## Project Overview

This is **Toha**, a personal portfolio theme for the [Hugo](https://gohugo.io/) static site generator.

- **Goal:** Showcase skills, experience, and thoughts (blog) with elegance and simplicity.
- **Core Philosophy:** Configuration over Code. Users should control the site via `data/` and `hugo.yaml` without touching HTML/CSS.
- **Tech Stack:** Hugo (Extended), SCSS, Vanilla JavaScript, Hugo Pipes.

## Development Environment

We use `mise` for deterministic tooling and task management. Use `brew install mise` to install `mise`.

### Quick Start

1. **Initialize:** Run `mise run install` to setup tools and dependencies.
2. **Dev Server:** Run `mise run portfolio` (`mise run example-portfolio` and `mise run example-site` remain aliases).
   - This will install all dependencies (root & portfolio example) automatically.
   - Serves the site at `localhost:1313`.
3. **Verify Changes:** Run `mise run check` to execute both linters and a production build.

## Project Structure

### 1. The "Data-Driven" Layout

Toha differs from standard Hugo themes. The structure of the homepage and sidebar is primarily driven by JSON/YAML files in the `data/` directory, not just the `content/` directory.

- **`data/`**: The source of truth for the site's layout configuration. Example data can be found under `exampleSites/portfolio/data`.
- **`layouts/partials/`**: Contains the reusable UI components.
- **`assets/styles/`**: Styling. We use SCSS.

### 2. Directory Map

- `assets/`
  - `images/`: Theme-specific static images.
  - `scripts/`: Vanilla JS files. **Must be processed via Hugo Pipes.**
  - `styles/`: Stylesheets organized according to components, layouts, sections etc.
- `layouts/`
  - `_default/` Where base structure of pages are defined.
  - `partials/`: Where the core logic lives. Break complex logic into partials.
  - `shortcodes/`: Custom markdown components for users.
- `i18n/`: Localization files. **All user-facing text must be tokenized here.**
- `exampleSites/`: Complete Hugo sites that demonstrate theme layouts.
  - `portfolio/`: The portfolio integration test bed.
    - `hugo.yaml`: Main configuration.
    - `data/`: Defines layout configurations.
    - `content/`: Blog posts and markdown content.

## Coding Guidelines

### HTML & Go Templates

- **Semantics:** Use semantic HTML5 (`<section>`, `<article>`, `<nav>`).
- **Partials:** If a block of code is used more than once, extract it to `layouts/partials`.
- **IDs/Classes:** Use meaningful kebab-case class names.
- **Safe HTML:** Use `safeHTML` only when absolutely necessary and verified safe.

### SCSS & CSS

- **No Inline CSS:** All styles must reside in `assets/scss`.
- **Variables:** Use SCSS variables for colors and fonts (check `assets/styles/variables.scss` first).
- **Responsiveness:** Mobile-first approach is preferred, but ensure desktop elegance.

### JavaScript

- **Vanilla JS:** Avoid adding libraries (jQuery, etc.) unless strictly necessary.
- **Fingerprinting:** All JS resources in templates must be fingerprinted for cache busting.
  - _Example:_ `$js := resources.Get "js/script.js" | fingerprint`
- **DOM Manipulation:** Ensure DOM elements exist before attaching listeners.

## Contributing Rules (Strict)

1. **Backward Compatibility:** NEVER break existing `config` or `data` structures.
2. **Configurability:** Every new visual feature must be toggleable via `hugo.yaml` or `data/` files.
3. **Defaults:** New features must be **disabled by default**.
4. **Localization:** Do not hardcode English strings. Use `{{ i18n "string_id" }}`.

## Planning Records

- Store plans and implementation handoffs as Devcroft artifacts using `devcroft artifact`.
- Do not write planning Markdown in `plan/`, `plans/`, or other repository directories.
- Read and update the relevant Devcroft artifact when continuing implementation.

## Common Workflows

### How to add a new Section

1. Create the partial in `layouts/partials/sections/`.
2. Add the styling in `assets/styles/sections/`.
3. Add the entry logic in `layouts/partials/<section-name>.html` (or relevant parent).
4. Define the data schema in `exampleSites/portfolio/data/<language code>/sections/<section-name>.yaml`.
5. Wrap the rendering in a conditional check (e.g., `if .Site.Params.features.newSection.enable`).

### How to Fix a Bug

1. Reproduce it in the relevant site under `exampleSites/`.
2. Fix the logic in the theme `layouts` or `assets`.
3. Verify the fix by running `mise run check`.
