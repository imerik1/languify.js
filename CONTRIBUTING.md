# Collaboration Guide

Thank you for your interest in contributing to **languify.js**.

This document describes how to collaborate, propose changes, and maintain consistency across the project.

---

# Getting Started

Clone the repository:

```bash
git clone https://github.com/imerik1/languify.js.git
cd languify.js
```

Install dependencies:

```bash
corepack enable
pnpm install
```

---

# Development Workflow

Run development tools locally before opening a pull request.

## Build

```bash
pnpm lib:build
pnpm docs:build
```

## Tests

```bash
pnpm test
```

Coverage:

```bash
pnpm test:coverage
```

## Formatting

Format code:

```bash
pnpm format
```

CI validation:

```bash
pnpm format:ci
```

---

# Branch Naming

Recommended naming conventions:

```txt
feature/add-result-api
fix/match-type-inference
docs/update-installation
refactor/rust-module-cleanup
```

---

# Commit Convention

Recommended commit style:

```txt
feat(rust): add Result helpers
fix(match): correct union narrowing
docs(readme): improve installation guide
refactor(core): simplify matcher internals
```

Suggested prefixes:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `build`
- `ci`

---

# Pull Requests

Before opening a PR, make sure:

- [ ] Code builds successfully
- [ ] Tests pass
- [ ] Formatting is clean
- [ ] Documentation updated (when applicable)
- [ ] Public API changes are documented

Small, focused PRs are preferred over large multi-topic changes.

---

# Code Guidelines

Please follow these principles.

## Keep APIs predictable

Language modules should feel familiar to their source ecosystem.

Example:

```ts
import { Some, None } from "languify.js/rust";
```

Avoid introducing patterns that break the expected language semantics.

---

## Prefer strong typing

TypeScript ergonomics are important.

Prefer:

- accurate inference
- narrow types
- minimal `any`
- explicit public typings

---

## Keep modules isolated

Each language namespace should remain independent when possible.

Examples:

```txt
rust/*
go/*
```

Avoid unnecessary cross-module coupling.

---

# Documentation

Documentation lives alongside the project documentation site.

Build docs locally:

```bash
pnpm docs:build
```

Run docs locally:

```bash
pnpm docs:dev
```

---

# Reporting Issues

When opening an issue, include:

- environment
- reproduction steps
- expected behavior
- actual behavior
- minimal example

---

# Feature Requests

Feature proposals are welcome.

Please explain:

- motivation
- expected API
- language inspiration (if applicable)
- tradeoffs

---

# License

By contributing to this repository, you agree that your contributions will be licensed under the MIT License.
