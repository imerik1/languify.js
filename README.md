# 📘 languify.js

**languify.js** is a lightweight toolkit for pattern matching, functional utilities, and language-inspired constructs such as `Option`, `match`, and more.

## 📚 Documentation

Full documentation:

https://languifyjs.erikmarques.com.br/v1/docs/

---

## 📦 Installation

### npm

```bash
npm install languify.js@^1
```

### pnpm

```bash
pnpm add languify.js@^1
```

### yarn

```bash
yarn add languify.js@^1
```

---

## 🚀 Quick Start

Import utilities from the desired language module.

```ts
import { Some, None, match } from "languify.js/rust";

const value = Some("hello world");

const result = match(value, {
  Some: (v) => v.toUpperCase(),
  None: () => "empty",
});

console.log(result);
// HELLO WORLD
```

---

## ✨ Features

languify.js provides:

- Pattern matching utilities
- Functional primitives inspired by modern languages
- Language-style APIs (`Rust`, `Go`, and more)
- Modular imports

---

## 📁 Import Styles

Import directly from a language module:

```ts
import { match } from "languify.js/rust";
```

Or import the entire module namespace:

```ts
import * as rust from "languify.js/rust";
```

---

## 🌍 Philosophy

languify.js brings familiar programming patterns from multiple languages into the JavaScript ecosystem while keeping the API lightweight, composable, and tree-shakeable.
