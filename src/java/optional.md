# Optional

`Optional` provides a Java-inspired container for values that may be present or
empty.

Use it when a Java-style API reads naturally in your JavaScript or TypeScript
codebase and you want methods for presence checks, fallbacks, side effects, and
transformations.

## Creating Optional Values

Use `Optional.of()` when the value must exist.

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.get());
// hello
```

`Optional.of()` throws `NullPointerException` for `null` or `undefined`.

```ts
import { Optional } from "languify.js/java";

const value = null as unknown as string;

Optional.of(value);
// throws NullPointerException
```

Use `Optional.ofNullable()` when the value may be absent.

```ts
import { Optional } from "languify.js/java";

const value = Optional.ofNullable<string>(null);

console.log(value.isEmpty());
// true
```

Use `Optional.empty()` when you already know the value is absent.

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty<string>();

console.log(value.isEmpty());
// true
```

## Presence Checks

Use `isPresent()` to check for a value.

```ts
import { Optional } from "languify.js/java";

console.log(Optional.of("hello").isPresent());
// true
```

Use `isEmpty()` to check for absence.

```ts
import { Optional } from "languify.js/java";

console.log(Optional.empty().isEmpty());
// true
```

## Extracting Values

Use `get()` to return the stored value.

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.get());
// hello
```

For empty values, prefer fallback methods instead of relying on `get()`.

## Fallback Values

Use `orElse()` when the fallback is already available.

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty<string>().orElse("default");

console.log(value);
// default
```

Use `orElseGet()` when the fallback should be computed only if needed.

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty<string>().orElseGet(() => "generated");

console.log(value);
// generated
```

Use `orElseThrow()` when absence is an error.

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello").orElseThrow(() => new Error("missing value"));

console.log(value);
// hello
```

```ts
import { Optional } from "languify.js/java";

Optional.empty<string>().orElseThrow(() => new Error("missing value"));
// throws Error
```

## Side Effects

Use `ifPresent()` to run a callback only when a value exists.

```ts
import { Optional } from "languify.js/java";

Optional.of("hello").ifPresent((value) => {
  console.log(value);
});
```

Use `ifPresentOrElse()` to run one callback for present values and another for
empty values.

```ts
import { Optional } from "languify.js/java";

Optional.of("hello").ifPresentOrElse(
  (value) => {
    console.log(value);
  },
  () => {
    console.log("empty");
  }
);
```

## Filtering Values

Use `filter()` to keep the value only when it matches a predicate.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello").filter((value) => value === "hello");

console.log(result.get());
// hello
```

When the predicate fails, the optional becomes empty.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello").filter((value) => value === "world");

console.log(result.isEmpty());
// true
```

## Mapping Values

Use `map()` to transform the stored value into a new `Optional`.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello").map((value) => value?.toUpperCase());

console.log(result.get());
// HELLO
```

## Returning Another Optional

Use `or()` to provide an alternative `Optional`.

```ts
import { Optional } from "languify.js/java";

const result = Optional.empty<string>().or(() => Optional.of("fallback"));

console.log(result.get());
// fallback
```

## JSON Serialization

`Optional` serializes to the contained value or `null`.

```ts
import { Optional } from "languify.js/java";

JSON.stringify(Optional.of("hello"));
// "\"hello\""

JSON.stringify(Optional.empty());
// "null"
```

## Notes

- `Optional.of()` is for required non-null values.
- `Optional.ofNullable()` is for values that may be absent.
- `Optional.empty()` creates an empty container.
- `orElse()` and `orElseGet()` provide safe fallbacks.
- `orElseThrow()` turns absence into an explicit error.
- `map()` returns a new `Optional`.
- `filter()` mutates the current optional by clearing non-matching values.
