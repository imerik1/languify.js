# Contributing to languify.js

Thank you for helping improve **languify.js**.

The project brings practical ideas from many programming languages into
JavaScript and TypeScript. Rust, Java, Go, Python, Kotlin, C#, Swift, and any
other ecosystem can inspire a module or utility when the idea improves real
JavaScript code.

## Project Direction

languify.js is not a port of one language into another. A language module should
borrow the best parts of its source ecosystem, then adapt them to JavaScript with
clear runtime behavior and strong TypeScript ergonomics.

When proposing a feature, explain:

- what language or ecosystem inspired it
- why the pattern helps JavaScript developers
- how the API behaves at runtime
- how the types guide correct usage
- how the feature composes with existing modules

## Local Setup

```bash
git clone https://github.com/imerik1/languify.js.git
cd languify.js
corepack enable
pnpm install
```

The project uses the Node version declared in `.nvmrc` and pnpm as the package
manager.

## Development Workflow

Run the relevant checks before opening a pull request:

```bash
pnpm format:ci
pnpm test
pnpm lib:build
pnpm docs:build
```

Coverage can be generated with:

```bash
pnpm test:coverage
```

## Production Build

The library build uses `tsup` and writes package artifacts to `dist/lib`.

```bash
pnpm lib:build
```

The documentation build uses VitePress and writes versioned site output to
`dist/site/v1/docs`.

```bash
pnpm docs:build
```

After VitePress finishes, the build copies root-level public files from `ci/site`
into `dist/site`. Use that folder only for files that must live at the deployed
site root, such as `robots.txt` and `versions.json`.

VitePress public assets belong in `src/public` because the VitePress root for
this project is `src`. Those files are copied to the root of the versioned docs
output, for example `dist/site/v1/docs/favicon.svg`.

## Module Guidelines

Keep each language module isolated unless sharing code is clearly simpler and
does not blur the public API.

Recommended module shape:

```txt
src/<language>/
  index.ts
  feature.ts
  feature.test.ts
  feature.md
```

Public exports should go through the module `index.ts`, and package exports must
be declared in `package.json` and `tsup.config.ts`.

## API Guidelines

- Prefer explicit behavior over hidden magic.
- Preserve the source language's useful mental model.
- Adapt naming and types to JavaScript instead of copying blindly.
- Keep functions tree-shakeable and side-effect free where possible.
- Avoid widening public types to `any`.
- Document edge cases, especially nullish values and thrown errors.

## Documentation Guidelines

Every public feature needs documentation in the VitePress site.

Good docs should include:

- a plain-language purpose statement
- installation or import context when helpful
- small examples that compile mentally
- notes about nullish values, thrown errors, and async behavior
- links to related utilities

Avoid describing languify.js as a Rust utility library. The correct positioning
is: an extensible toolkit that brings useful language ideas into JavaScript.

## SEO Guidelines

Documentation pages should be useful without relying on search tricks. Use
descriptive titles, clear headings, complete examples, and natural language that
matches what developers search for, such as "Rust Option for JavaScript",
"pattern matching in JavaScript", and "Java Optional in TypeScript".

When adding a new page, update the SEO map in `src/.vitepress/config.ts` so the
page receives a canonical URL, Open Graph metadata, Twitter metadata, and
structured data.

## Pull Requests

Before opening a PR, make sure:

- formatting is clean
- tests pass or the reason they were skipped is stated
- package and docs builds still work for public API changes
- documentation changed with the behavior
- new modules include focused tests

Small, focused PRs are preferred.

## Commit Style

Use concise conventional prefixes when possible:

```txt
feat(rust): add Result helpers
fix(match): preserve nullable inference
docs(java): clarify Optional null handling
test(rust): cover direct primitive matching
build(site): update VitePress metadata
```

## License

By contributing, you agree that your contributions are licensed under the MIT
License.
