# NullPointerException

The `NullPointerException` helper provides a Java-inspired exception for missing values.

It is commonly used when an operation requires a non-null value but receives `null` or `undefined`.

## ✨ Overview

```ts
import { NullPointerException } from "languify.js/java";

throw new NullPointerException();
```

## 📦 Basic usage

### Throwing manually

```ts
import { NullPointerException } from "languify.js/java";

throw new NullPointerException();
```

### Using inside custom validation

```ts
import { NullPointerException } from "languify.js/java";

function required(value: unknown) {
  if (value === null || value === undefined) {
    throw new NullPointerException();
  }

  return value;
}
```

## 🧠 When to use

Use `NullPointerException` when:

- a value is required
- `null` is considered invalid input
- missing values should fail immediately

```ts
import { NullPointerException } from "languify.js/java";

function createUser(name?: string) {
  if (!name) {
    throw new NullPointerException();
  }

  return { name };
}
```
