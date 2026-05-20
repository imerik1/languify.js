# 📘 Getting Started

Welcome to **languify.js** — a lightweight toolkit for pattern matching, functional utilities, and language-inspired constructs like `Option`, `match`, and more.

This guide will help you install and start using the package in your project.

## 📦 Installation

Install the package via your preferred package manager:

:::tabs
== npm
```bash
npm install languify.js
```
== pnpm
```bash
pnpm add languify.js
```
== yarn
```bash
yarn add languify.js
```
:::

## 🚀 Quick Start

After installation, you can import utilities from the package:

```ts
import { Some, None, match } from "languify.js/rust";

const value = Some("hello world");

const result = match(value, {
  Some: (v) => v.toUpperCase(),
  None: () => "empty",
});

console.log(result); // HELLO WORLD;
```

## 🧠 What you get

languify.js provides:

* Functional utilities inspired by others languages
* Multi-style APIs (Rust, Go, etc.)

## 📁 Import styles

You can import by language module:

```ts
import { match } from "languify.js/rust";
```

or

```ts
import * as rust from "languify.js/rust";
```
