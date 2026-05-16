# languify.js

A JavaScript library that brings language-inspired features from multiple programming paradigms into one unified toolkit.

Instead of following a single language style, languify.js explores ideas from Rust, Go, functional programming, and other ecosystems — adapting them into JavaScript in a consistent and composable way.

## Why languify.js?

JavaScript is flexible, but often lacks structured primitives for expressing control flow, state, and composition in a predictable way.

languify.js aims to bring clarity by introducing concepts inspired by different languages, without locking you into a single paradigm.

## Design philosophy

- Borrow useful ideas from multiple languages
- Keep APIs consistent and composable
- Avoid language dogma
- Prefer explicit behavior over implicit magic
- Adapt concepts to JavaScript, not copy them blindly

## Core idea

Instead of asking “how does Rust do this?” or “how does Go do this?”, languify.js asks:

> “what is the most useful abstraction for JavaScript developers?”

## Example

```ts
import { Some, None, match } from "languify.js/rust";

const value = Some("languify");

const result = match(value, {
  Some: (v) => v.toUpperCase(),
  None: () => "empty",
});

console.log(result);
