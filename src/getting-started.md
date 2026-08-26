# Getting Started

Use **languify.js** when you want language-inspired utilities in JavaScript or
TypeScript without adopting a new runtime, compiler, or framework.

The package is split by language module. Import only the module that owns the
concept you need.

## Installation

:::tabs
== npm

```bash
npm install languify.js@^1
```

== pnpm

```bash
pnpm add languify.js@^1
```

== yarn

```bash
yarn add languify.js@^1
```

:::

## Rust-Inspired Utilities

The Rust-inspired module currently exports `Option`, `Result`, and `match`.

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

## Java-Inspired Utilities

The Java-inspired module currently exports `Optional` and
`NullPointerException`.

```ts
import { Optional } from "languify.js/java";

const username = Optional.ofNullable("erik")
  .map((value) => value?.toUpperCase())
  .orElse("guest");

console.log(username);
// ERIK
```

## Import Styles

Import a single utility when you want the smallest surface:

```ts
import { match } from "languify.js/rust";
```

Import a module namespace when it reads better in the calling code:

```ts
import * as rust from "languify.js/rust";

const value = rust.Some("hello");
```

## Choosing a Utility

Use `Option` when a value may be present or absent:

```ts
import { None, Some } from "languify.js/rust";

const user = Math.random() > 0.5 ? Some("Ada") : None;
```

Use `Result` when an operation can succeed or fail and you want to keep the
error value:

```ts
import { Result } from "languify.js/rust";

const response = Result.ok("saved");
```

Use `Optional` when a Java-style nullable container fits the codebase:

```ts
import { Optional } from "languify.js/java";

const name = Optional.ofNullable("Grace").orElse("guest");
```

## Next Steps

- Learn [Rust Option](/rust/option) for explicit nullable values.
- Learn [Rust Result](/rust/result) for success and failure flows.
- Learn [Pattern matching](/rust/match) for centralized branching.
- Learn [Java Optional](/java/optional) for Java-style nullable handling.
