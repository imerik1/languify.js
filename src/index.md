# languify.js

**languify.js** brings useful ideas from other programming languages into
JavaScript and TypeScript.

The library is not limited to Rust-inspired utilities. Rust is one influence
among many. The goal is broader: collect the best practical patterns from any
language ecosystem, adapt them to JavaScript, and expose them through small,
typed, modular APIs.

## What languify.js is

languify.js is an extensible toolkit for developers who want expressive control
flow, safer value handling, and familiar abstractions without leaving the
JavaScript runtime.

Current modules include:

- Rust-inspired `Option`, `Result`, and `match`
- Java-inspired `Optional` and `NullPointerException`

Future modules can draw from any language when the abstraction improves
JavaScript code.

## Why it exists

JavaScript is flexible, but many teams still rebuild the same patterns around
nullable values, error handling, branching, and fallback logic. Other languages
have spent years refining those patterns.

languify.js gives those ideas a JavaScript home:

- `Option` makes present and absent values explicit.
- `Result` models operations that can succeed or fail.
- `match` centralizes branching logic.
- `Optional` provides a Java-style container for nullable values.

## Quick example

```ts
import { Some, match } from "languify.js/rust";

const value = Some("languify");

const result = match(value, {
  Some: (text) => text.toUpperCase(),
  None: () => "empty",
});

console.log(result);
// LANGUIFY
```

## Design principles

- Borrow useful ideas from any programming language.
- Adapt concepts to JavaScript instead of copying blindly.
- Keep modules independent and tree-shakeable.
- Prefer predictable runtime behavior.
- Use TypeScript types to make intent visible.
- Leave room for new languages and paradigms.

## Where to start

Install the package in [Getting started](/getting-started), then explore the
current language modules:

- [Rust Option](/rust/option)
- [Rust Result](/rust/result)
- [Pattern matching](/rust/match)
- [Java Optional](/java/optional)
