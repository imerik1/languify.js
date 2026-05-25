# match

`match` provides a single helper for predictable branching in JavaScript and
TypeScript.

It can work with:

- `Option`
- `Result`
- primitive nullable values
- custom classes that implement `.match()`

The idea is inspired by Rust pattern matching, but the implementation is adapted
to JavaScript values and TypeScript inference.

## Basic Shape

```ts
import { match } from "languify.js/rust";

const output = match(value, {
  Some: (value) => value,
  None: () => "empty",
});
```

The selected branch returns the final value.

## Matching Option

Use `Some` and `None` branches for `Option` values.

```ts
import { match, None, Some } from "languify.js/rust";

const present = match(Some("hello"), {
  Some: (value) => value.toUpperCase(),
  None: () => "empty",
});

console.log(present);
// HELLO

const missing = match(None, {
  Some: () => "has value",
  None: () => "empty",
});

console.log(missing);
// empty
```

## Matching Result

Use `Ok` and `Err` branches for `Result` values.

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.ok<string, string>("success");

const output = match(response, {
  Ok: (value) => value,
  Err: (error) => `Error: ${error}`,
});

console.log(output);
// success
```

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

const output = match(response, {
  Ok: () => "success",
  Err: (error) => `Error: ${error}`,
});

console.log(output);
// Error: failure
```

## Matching Primitive Nullable Values

Primitive non-nullish values are treated as `Some`. `null` and `undefined` are
treated as `None`.

```ts
import { match } from "languify.js/rust";

const greeting = match("john", {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});

console.log(greeting);
// Hello john
```

```ts
import { match } from "languify.js/rust";

const greeting = match(null, {
  Some: () => "Has value",
  None: () => "Missing",
});

console.log(greeting);
// Missing
```

For primitive nullable values, branches may also be direct values:

```ts
import { match } from "languify.js/rust";

const state = match("ready", {
  Some: "has value",
  None: "empty",
});

console.log(state);
// has value
```

Supported primitive inputs are:

- `string`
- `number`
- `symbol`
- `null`
- `undefined`

## Matching Custom Classes

Any object implementing `.match()` can be consumed by the standalone `match()`
helper.

```ts
import { match } from "languify.js/rust";

class Company {
  constructor(private readonly value: string) {}

  match<T>(cases: {
    Known: (value: string) => T;
    Unknown: (value: string) => T;
  }) {
    return this.value === "languify"
      ? cases.Known(this.value)
      : cases.Unknown(this.value);
  }
}

const label = match(new Company("languify"), {
  Known: (value) => `${value} project`,
  Unknown: (value) => `${value} external`,
});

console.log(label);
// languify project
```

## Notes

- `match()` delegates to `.match()` when the value provides one.
- `Some` and `Ok` represent successful or present states.
- `None` and `Err` represent missing or failed states.
- Direct branch values are supported for primitive nullable matching.
- Custom matchable classes decide their own branch names and branch behavior.
