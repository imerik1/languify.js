# match

The `match` helper provides a unified and expressive way to safely handle:

* `Option`
* `Result`
* primitive nullable values
* custom matchable classes

It is inspired by Rust pattern matching and helps eliminate manual conditional checks.

## ✨ Overview

```ts
match(value, {
  Some: () => {},
  None: () => {}
});

match(result, {
  Ok: () => {},
  Err: () => {}
});
```

## 📦 Matching Option values

Use `match()` with `Some` and `None`.

```ts
import { match, Some } from "languify.js/rust";

const value = Some("hello");

const result = match(value, {
  Some: (value) => value.toUpperCase(),
  None: () => "empty",
});

console.log(result); // "HELLO"
```

### Matching None

```ts
import { match, None } from "languify.js/rust";

const value = None;

const result = match(value, {
  Some: () => "has_value",
  None: () => "empty",
});

console.log(result); // "empty"
```

## 📦 Matching Result values

Use `match()` with `Result`.

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.ok("success");

const value = match(response, {
  Ok: (value) => value,
  Err: () => "error",
});

console.log(value); // "success"
```

### Matching errors

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.error("failure");

const value = match(response, {
  Ok: () => "success",
  Err: (err) => `Error: ${err}`,
});

console.log(value); // "Error: failure"
```

## 📦 Matching primitive values

`match()` also works directly with primitive nullable values.

### Matching strings

```ts
import { match } from "languify.js/rust";

const username: string | null = "john";

const value = match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});

console.log(value); // "Hello john"
```

### Matching null

```ts
import { match } from "languify.js/rust";

const username: string | null = null;

const value = match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});

console.log(value); // "No username"
```

### Matching numbers

```ts
import { match } from "languify.js/rust";

const count: number | null = 10;

const value = match(count, {
  Some: (value) => value * 2,
  None: () => 0,
});

console.log(value); // 20
```

### Matching symbols

```ts
import { match } from "languify.js/rust";

const token: symbol | null = Symbol("token");

const value = match(token, {
  Some: () => "has_token",
  None: () => "missing",
});

console.log(value); // "has_token"
```

## 🧩 Matching custom classes

`match()` also supports custom classes that implement a `match()` method.

```ts
import { match } from "languify.js/rust";

class Custom {
  constructor(
    private readonly value: "google" | string
  ) {}

  match<U>(cases: {
    1: (value: string) => U;
    2: (value: string) => U;
  }) {
    return this.value === "google"
      ? cases[1](this.value)
      : cases[2](this.value);
  }
}

const result = match(new Custom("google"), {
  1: (value) => `${value} Employee`,
  2: (value) => `${value} Employee`,
});

console.log(result); // "google Employee"
```

### Type-safe custom matching

The standalone `match()` helper automatically infers the types from your custom class.

```ts
import { match } from "languify.js/rust";

class LoadingState {
  match<T>(cases: {
    Loading: () => T;
    Done: () => T;
  }) {
    return cases.Loading();
  }
}

const result = match(new LoadingState(), {
  Loading: () => "loading",
  Done: () => "done",
});

console.log(result); // "loading"
```

## ⚠️ Important notes

* `match()` works with `Option`, `Result`, primitive nullable values, and custom classes
* Prefer `match()` over manual `if` checks
* `Some` and `Ok` represent successful values
* `None` and `Err` represent absence or failure
* Any object implementing `.match()` is automatically supported

## 🚀 Example

```ts
import { match, Result } from "languify.js/rust";

async function getUser(id: number) {
  if (id === 1) {
    return Result.ok({
        id: 1,
        name: "John",
    });
  }

  return Result.error("User not found");
}

const user = await getUser(1);

const message = match(user, {
  Ok: (value) => `Welcome ${value.name}`,
  Err: (err) => `Error: ${err}`,
});

console.log(message);
```

## 🧠 Option vs Result

Use `Option` when a value may or may not exist.

```ts
match(user, {
  Some: (value) => value,
  None: () => "empty",
});
```

Use `Result` when an operation may fail.

```ts
match(response, {
  Ok: (value) => value,
  Err: (err) => err,
});
```

Use primitive matching when working directly with nullable values.

```ts
match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});
```

Use custom matching for domain-specific state machines and patterns.

```ts
match(state, {
  Loading: () => "loading",
  Success: (value) => value,
  Error: (err) => err,
});
```
