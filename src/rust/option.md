# Option

The `Option` type represents an optional value.

Every `Option` is either:

* `Some` → contains a value
* `None` → represents absence of a value

It is inspired by Rust's `Option` and helps you avoid unsafe `null` and `undefined` checks in a safe and expressive way.

## ✨ Overview

```ts
Some<T>  // contains a value
None     // represents absence
```

## 📦 Creating an Option

### Some

Use `Some.of(value)` to wrap an existing value.

```ts
import { Some } from "languify.js/rust";

const value = Some.of("hello");
```

### None

Use `None.of()` to represent absence.

```ts
import { None } from "languify.js/rust";

const value = None.of();
```

## 🔄 Matching values

You can safely handle both cases using `match`.

```ts
import { Some } from "languify.js/rust";

const result = Some.of("world").match({
  Some: (value) => `Hello ${value}`,
  None: () => "Nothing here"
});

console.log(result); // "Hello world"
```

## 📤 Unwrapping values

### unwrap()

Returns the inner value from `Some`.

```ts
import { Some } from "languify.js/rust";

const value = Some.of("test");

console.log(value.unwrap()); // "test"
```

⚠️ Calling `unwrap()` on `None` is unsafe and may throw an error.

## 🔁 Fallback values

### orElse()

Returns a fallback value when the option is `None`.

```ts
import { None } from "languify.js/rust";

const value = None.of().orElse("fallback");

console.log(value); // "fallback"
```

## ⚠️ Important notes

* `Option` helps eliminate unsafe `null` / `undefined` usage
* Prefer `match` over manual checks
* `Some` always contains a valid value
* `None` always represents absence
* Avoid unsafe `unwrap()` unless you're sure the value exists

## 🚀 Example

```ts
import { Some, None } from "languify.js/rust";

function getUser(name: string) {
  if (name === "test") {
    return Some.of(name);
  }

  return None.of();
}

const user = getUser("test");

const message = user.match({
  Some: (value) => `Welcome ${value}`,
  None: () => "User not found"
});

console.log(message);
```

## ✅ Using with `match`

You can also use the standalone `match()` helper.

```ts
import { match, Some } from "languify.js/rust";

const value = match(Some.of("test"), {
  Some: (value) => value.toUpperCase(),
  None: () => "EMPTY"
});

console.log(value); // "TEST"
```

## 🧠 Using with nullable values

The standalone `match()` helper also works with nullable values directly.

```ts
import { match } from "languify.js/rust";

const username: string | null = null;

const message = match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username"
});

console.log(message); // "No username"
```
