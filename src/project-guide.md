# Project Guide

This guide is for maintainers and AI collaborators working on **languify.js**.

Read it before changing documentation, SEO metadata, public assets, build
scripts, or public APIs.

## Product Positioning

languify.js is an extensible JavaScript and TypeScript library that brings the
best ideas from other programming languages into JavaScript.

Do not describe the project as a Rust utility library. Rust is a current module
and a strong source of inspiration, but the project is intentionally broader.
Any language can inspire a module when the idea improves JavaScript code.

Preferred wording:

> languify.js brings useful language ideas into JavaScript through small,
> modular, typed utilities.

## Repository Shape

```txt
src/
  index.md                 VitePress home page
  getting-started.md       installation and first usage guide
  project-guide.md         maintainer and AI collaborator guide
  rust/                    Rust-inspired APIs and docs
  java/                    Java-inspired APIs and docs
  .vitepress/              documentation site config, theme, and public assets
  .utils/                  shared build helpers

ci/
  site/                    root-level public files copied after docs build
  infra/                   Cloudflare Worker and Terraform
  scripts/                 release and deployment helpers
```

Ignored folders include `node_modules`, `dist`, `.wrangler`,
`**/.vitepress/cache`, `**/.vitepress/dist`, Terraform runtime files, and other
generated artifacts listed in `.gitignore`.

## Production Build

The library build is:

```bash
pnpm lib:build
```

It runs `tsup` with `NODE_ENV=production`, using `tsup.config.ts`.

Outputs:

```txt
dist/lib/rust.mjs
dist/lib/rust.cjs
dist/lib/rust.d.ts
dist/lib/java.mjs
dist/lib/java.cjs
dist/lib/java.d.ts
```

The documentation build is:

```bash
pnpm docs:build
```

It runs VitePress against `src` and writes versioned output to:

```txt
dist/site/{majorVersion}/docs
```

After that, `ci/site/*` is copied into:

```txt
dist/site
```

This means there are two public asset zones:

- `src/public`: copied into the versioned docs root
- `ci/site`: copied into the deployed site root

## Public Assets

Use `ci/site` only for files that must exist at the domain root, such as:

- `robots.txt`
- `versions.json`

Do not move `robots.txt` only into `src/public`, because that would serve it at
`/{majorVersion}/docs/robots.txt` instead of `/robots.txt`.

## SEO Contract

SEO metadata is centralized in `src/.vitepress/config.ts`.

When adding a documentation page:

1. Add the page to the VitePress sidebar.
2. Add an entry to `PAGE_SEO`.
3. Use a descriptive page title.
4. Write a unique description that matches developer search intent.
5. Link the new page from a relevant existing page.

The config generates:

- page titles
- page descriptions
- canonical URLs
- Open Graph metadata
- Twitter card metadata
- JSON-LD structured data
- sitemap output through VitePress

The deployed root `robots.txt` points crawlers to the versioned sitemap.

## Documentation Voice

Write documentation in clear, direct English.

Good docs:

- explain why the utility exists
- show one small working example at a time
- name nullish and error behavior explicitly
- avoid implying that Rust is the whole project
- keep examples aligned with actual runtime behavior

Avoid:

- emoji-heavy headings
- vague claims like "magic" or "best ever"
- examples that do not match the TypeScript API
- docs for features that are not exported yet

## Adding a Language Module

A new module should follow this shape:

```txt
src/<language>/
  index.ts
  feature.ts
  feature.test.ts
  feature.md
```

Then update:

- `package.json` exports
- `tsup.config.ts` entries
- VitePress sidebar
- SEO map in `src/.vitepress/config.ts`
- README module list

Each module should stay understandable on its own. Shared internals are fine
only when they reduce duplication without making the public language APIs feel
the same by accident.

## Safety Checks

Before finishing a meaningful change, prefer checking:

```bash
pnpm format:ci
pnpm test
pnpm lib:build
pnpm docs:build
```

If the task explicitly says not to run the project, do not start the dev server.
Static checks are still acceptable when they are useful and not disruptive.
