# Option

`Option` represents a value that may or may not exist.

It is inspired by Rust's `Option<T>` and gives JavaScript and TypeScript code a
clearer alternative to scattered `null` and `undefined` checks.

## Concepts

An option has two states:

- `Some`: a value is present
- `None`: no value is present

```ts
import { None, Some } from "languify.js/rust";

const present = Some("hello");
const missing = None;
```

## Creating Some

Use `Some(value)` when a value exists.

```ts
import { Some } from "languify.js/rust";

const value = Some("hello");

console.log(value.unwrap());
// hello
```

## Using None

Use `None` when a value is absent.

```ts
import { None } from "languify.js/rust";

const value = None;

console.log(value.unwrap());
// null
```

## Matching an Option

Every `Option` instance has a `.match()` method.

```ts
import { Some } from "languify.js/rust";

const message = Some("world").match({
  Some: (value) => `Hello ${value}`,
  None: () => "Nothing here",
});

console.log(message);
// Hello world
```

`None` runs the `None` branch:

```ts
import { None } from "languify.js/rust";

const message = None.match({
  Some: (value) => `Hello ${value}`,
  None: () => "No value",
});

console.log(message);
// No value
```

::: warning
Instance `.match()` expects callbacks for both branches. Direct branch values are
supported by the standalone `match()` helper for primitive nullable values, not
by `Option.match()`.
:::

## Using the Standalone Match Helper

The standalone `match()` helper also works with `Option` instances:

```ts
import { match, Some } from "languify.js/rust";

const result = match(Some("test"), {
  Some: (value) => value.toUpperCase(),
  None: () => "EMPTY",
});

console.log(result);
// TEST
```

It can also match primitive nullable values with `Some` and `None` semantics:

```ts
import { match } from "languify.js/rust";

const username: string | null = null;

const message = match(username, {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});

console.log(message);
// No username
```

For primitive values, branches may be callbacks or direct values:

```ts
import { match } from "languify.js/rust";

const status = match("ready", {
  Some: "has value",
  None: "empty",
});

console.log(status);
// has value
```

## Extracting Values

Use `unwrap()` to return the wrapped value.

```ts
import { Some } from "languify.js/rust";

const value = Some("test").unwrap();

console.log(value);
// test
```

`None.unwrap()` returns `null`.

```ts
import { None } from "languify.js/rust";

console.log(None.unwrap());
// null
```

## Fallback Values

Use `unwrapOr()` to return a fallback when the option is empty.

```ts
import { None, Some } from "languify.js/rust";

console.log(None.unwrapOr("fallback"));
// fallback

console.log(Some("hello").unwrapOr("fallback"));
// hello
```

## JSON Serialization

`Option` serializes to the contained value or `null`.

```ts
import { None, Some } from "languify.js/rust";

JSON.stringify(Some("hello"));
// "\"hello\""

JSON.stringify(None);
// "null"
```

## Example

```ts
import { None, Some } from "languify.js/rust";

function findUser(name: string) {
  if (name === "Ada") {
    return Some({ name });
  }

  return None;
}

const user = findUser("Ada");

const message = user.match({
  Some: (value) => `Welcome ${value.name}`,
  None: () => "User not found",
});

console.log(message);
// Welcome Ada
```

## Notes

- `Some` represents a present value.
- `None` represents absence.
- `Option.match()` handles `Some` and `None` through callbacks.
- The standalone `match()` helper works with `Option` and primitive nullable
  values.
- `Option` serializes to JSON automatically.
