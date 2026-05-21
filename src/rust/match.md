# match

The `match` helper provides a unified way to safely handle:

* `Option`
* `Result`
* primitive nullable values
* custom matchable classes

Inspired by Rust pattern matching.

## Basic usage

```ts
match(value, {
  Some: (value) => {},
  None: () => {}
});

match(result, {
  Ok: (value) => {},
  Err: (error) => {}
});
```

## Option matching

### Using callbacks

```ts
import { match, Some, None } from "languify.js/rust";

match(Some("hello"), {
  Some: (value) => value.toUpperCase(),
  None: () => "empty",
});
// "HELLO"

match(None, {
  Some: () => "has_value",
  None: () => "empty",
});
// "empty"
```

### Using direct values (supported)

Callbacks remain supported, but direct values can also be used.

```ts
match("hello", {
  Some: "has_value",
  None: "empty",
});
// "has_value"

match(null, {
  Some: "has_value",
  None: "empty",
});
// "empty"
```

## Result matching

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.ok("success");

match(response, {
  Ok: (value) => value,
  Err: (error) => `Error: ${error}`,
});
// "success"
```

```ts
const response = await Result.error("failure");

match(response, {
  Ok: () => "success",
  Err: (error) => `Error: ${error}`,
});
// "Error: failure"
```

## Primitive nullable values

Primitive values are treated like `Option` semantics.

```ts
match("john", {
  Some: (value) => `Hello ${value}`,
  None: () => "No username",
});
// "Hello john"
```

```ts
match(null, {
  Some: () => "Has value",
  None: () => "Missing",
});
// "Missing"
```

Supported primitive inputs:

* `string`
* `number`
* `symbol`
* `null`

## Custom matchable classes

Any object implementing `.match()` is supported.

```ts
class Custom {
  constructor(private readonly value: string) {}

  match<T>(cases: {
    1: (value: string) => T;
    2: (value: string) => T;
  }) {
    return this.value === "google"
      ? cases[1](this.value)
      : cases[2](this.value);
  }
}

match(new Custom("google"), {
  1: (value) => `${value} Employee`,
  2: (value) => `${value} Employee`,
});
// "google Employee"
```

Type inference is preserved automatically.

## Notes

* Existing callback-based usage remains supported.
* Direct values for `Some` and `None` are also supported.
* `Some` / `Ok` represent successful states.
* `None` / `Err` represent absence or failure.
* Any object implementing `.match()` can participate in matching.
