# languify.js

**languify.js** is an extensible TypeScript toolkit that brings strong ideas from
other programming languages into JavaScript.

It is not a Rust compatibility layer. Rust is only one source of inspiration.
The project is designed to grow through language modules that adapt useful
patterns from any ecosystem into idiomatic, typed, tree-shakeable JavaScript.

## Documentation

Production documentation is available at:

https://languifyjs.erikmarques.com.br

## Installation

```bash
npm install languify.js@^1
```

```bash
pnpm add languify.js@^1
```

```bash
yarn add languify.js@^1
```

## Quick Start

Import the utilities from the language module that owns the concept.

```ts
import { Some, match } from "languify.js/rust";

const value = Some("hello world");

const result = match(value, {
  Some: (text) => text.toUpperCase(),
  None: () => "empty",
});

console.log(result);
// HELLO WORLD
```

Java-inspired utilities are exposed from their own module:

```ts
import { Optional } from "languify.js/java";

const label = Optional.ofNullable("languify")
  .map((value) => value?.toUpperCase())
  .orElse("DEFAULT");

console.log(label);
// LANGUIFY
```

## Current Modules

- `languify.js/rust`: `Option`, `Result`, and `match`
- `languify.js/java`: `Optional` and `NullPointerException`

## Philosophy

languify.js searches across programming languages for practical ideas that make
JavaScript and TypeScript code clearer. Each feature should feel familiar to
developers who know the source language, but the final API must still make sense
inside JavaScript.

The project favors:

- typed public APIs
- modular imports
- predictable runtime behavior
- small, composable primitives
- room for future language modules without forcing one paradigm on the whole library

## Production Build

The package build is generated with `tsup`:

```bash
pnpm lib:build
```

The documentation site is generated with VitePress:

```bash
pnpm docs:build
```

The docs build writes versioned output to `dist/site/{majorVersion}/docs` and then copies
root-level public site files from `ci/site` into `dist/site`.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for local workflow, documentation
rules, module guidelines, and release notes.
