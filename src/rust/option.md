# Option

The `Option` type represents an optional value.

Every `Option` is either:

* `Some` → contains a value
* `None` → represents absence of a value

Inspired by Rust's `Option`.

It provides a safe and expressive alternative to manual `null` and `undefined` handling.

## ✨ Overview

```ts
Some<T>  // contains a value
None     // represents absence
```

## 📦 Creating an Option

### Creating `Some`

Use `Some(value)` to wrap an existing value.

```ts
import { Some } from "languify.js/rust";

const value = Some("hello");
```

### Using `None`

Use `None` to represent absence.

```ts
import { None } from "languify.js/rust";

const value = None;
```

## 🔄 Matching values

### Instance matching

Every `Option` supports `.match()`.

```ts
import { Some } from "languify.js/rust";

const result = Some("world").match({
  Some: (value) => `Hello ${value}`,
  None: () => "Nothing here"
});

console.log(result);
// "Hello world"
```

### Matching `None`

```ts
import { None } from "languify.js/rust";

const result = None.match({
  Some: (value) => value,
  None: () => "empty"
});

console.log(result);
// "empty"
```

### Using direct values

Match branches may also use direct values.

```ts
import { Some, None } from "languify.js/rust";

Some("hello").match({
  Some: "present",
  None: "empty"
});

None.match({
  Some: "present",
  None: "empty"
});
```

## 📤 Extracting values

### unwrap()

Returns the wrapped value.

```ts
import { Some } from "languify.js/rust";

const value = Some("test");

console.log(value.unwrap());
// "test"
```

```ts
import { None } from "languify.js/rust";

console.log(None.unwrap());
// null
```

## 🔁 Fallback values

### unwrapOr()

Returns a fallback value.

```ts
import { None } from "languify.js/rust";

const value = None.unwrapOr("fallback");

console.log(value);
// "fallback"
```

When a value exists:

```ts
import { Some } from "languify.js/rust";

const value = Some("hello")
  .unwrapOr("fallback");

console.log(value);
// "hello"
```

## 🔄 JSON serialization

`Option` serializes to its contained value.

```ts
import { Some, None } from "languify.js/rust";

JSON.stringify(Some("hello"));
// "\"hello\""

JSON.stringify(None);
// "null"
```

## 🚀 Example

```ts
import { Some, None } from "languify.js/rust";

function getUser(name: string) {
  if (name === "test") {
    return Some(name);
  }

  return None;
}

const user = getUser("test");

const message = user.match({
  Some: (value) => `Welcome ${value}`,
  None: () => "User not found"
});

console.log(message);
```

## ✅ Using the standalone `match()` helper

The standalone `match()` helper also supports `Option`.

```ts
import { match, Some } from "languify.js/rust";

const value = match(Some("test"), {
  Some: (value) => value.toUpperCase(),
  None: () => "EMPTY"
});

console.log(value);
// "TEST"
```

Direct values are also supported.

```ts
import { match } from "languify.js/rust";

const value = match(null, {
  Some: "has_value",
  None: "empty"
});

console.log(value);
// "empty"
```

## 🧠 Matching nullable values

The standalone `match()` helper can work directly with primitive nullable values.

```ts
import { match } from "languify.js/rust";

const username: string | null = null;

const message = match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username"
});

console.log(message);
// "No username"
```

Supported primitive inputs:

* `string`
* `number`
* `symbol`
* `null`

## ⚠️ Important notes

* `Some` represents a present value.
* `None` represents absence.
* `Option` supports instance `.match()`.
* `match()` helper also supports `Option`.
* Match branches may be callbacks or direct values.
* `Option` serializes to JSON automatically.
