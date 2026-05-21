# Optional

The `Optional` helper provides a Java-inspired way to safely handle nullable values.

It helps avoid manual `null` and `undefined` checks by wrapping values inside an optional container.

## ✨ Overview

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.get()); // "hello"
```

## 📦 Creating Optional values

### Creating a non-null optional

Use `Optional.of()` when the value must exist.

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.get()); // "hello"
```

### Creating a nullable optional

Use `Optional.ofNullable()` when the value may be absent.

```ts
import { Optional } from "languify.js/java";

const value = Optional.ofNullable(null);

console.log(value.isEmpty()); // true
```

### Creating an empty optional

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty();

console.log(value.isEmpty()); // true
```

## 🔍 Presence checks

### Checking if a value exists

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.isPresent()); // true
```

### Checking if a value is empty

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty();

console.log(value.isEmpty()); // true
```

## 📥 Extracting values

### Getting the stored value

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello");

console.log(value.get()); // "hello"
```

### Returning a fallback value

Use `orElse()` when a fallback value is available.

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty<string>()
  .orElse("default");

console.log(value); // "default"
```

### Returning a computed fallback

Use `orElseGet()` when the fallback should be lazily computed.

```ts
import { Optional } from "languify.js/java";

const value = Optional.empty<string>()
  .orElseGet(() => "generated");

console.log(value); // "generated"
```

### Throwing when empty

Use `orElseThrow()` when a missing value should fail.

```ts
import { Optional } from "languify.js/java";

const value = Optional.of("hello")
  .orElseThrow(() => new Error("missing value"));

console.log(value); // "hello"
```

```ts
import { Optional } from "languify.js/java";

Optional.empty<string>()
  .orElseThrow(() => new Error("missing value"));
// throws Error
```

## ⚡ Executing side effects

### Using ifPresent()

Runs a callback only when a value exists.

```ts
import { Optional } from "languify.js/java";

Optional.of("hello")
  .ifPresent((value) => {
    console.log(value);
  });
```

Nothing happens when the optional is empty.

```ts
import { Optional } from "languify.js/java";

Optional.ofNullable<string>(null)
  .ifPresent(console.log);
```

### Using ifPresentOrElse()

Runs one callback when present and another when empty.

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

## 🔄 Transforming values

### Filtering values

Use `filter()` to preserve values matching a condition.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello")
  .filter((value) => value === "hello");

console.log(result.get()); // "hello"
```

Non-matching values become empty.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello")
  .filter((value) => value === "world");

console.log(result.isEmpty()); // true
```

### Mapping values

Use `map()` to transform the stored value.

```ts
import { Optional } from "languify.js/java";

const result = Optional.of("hello")
  .map((value) => value?.toUpperCase());

console.log(result.get()); // "HELLO"
```

### Returning another Optional

Use `or()` to provide an alternative optional.

```ts
import { Optional } from "languify.js/java";

const result = Optional.empty<string>()
  .or(() => Optional.of("fallback"));

console.log(result.get()); // "fallback"
```

## ⚠️ Null handling

`Optional.of()` rejects `null` and `undefined`.

```ts
import { Optional } from "languify.js/java";

Optional.of(null);
// throws NullPointerException
```

Use `Optional.ofNullable()` when null values are expected.

```ts
Optional.ofNullable(null);
```

## 🔄 JSON serialization

`Optional` serializes to its contained value.

```ts
import { Optional } from "languify.js/java";

JSON.stringify(Optional.of("hello"));
// "\"hello\""

JSON.stringify(Optional.empty());
// "null"
```

## 🧠 Optional patterns

Use `Optional.of()` when the value must exist.

```ts
Optional.of("value");
```

Use `Optional.ofNullable()` when values may be absent.

```ts
Optional.ofNullable(possibleNullValue);
```

Use `orElse()` or `orElseGet()` for fallback handling.

```ts
optional.orElse("default");

optional.orElseGet(() => computeDefault());
```

Use `orElseThrow()` when absence is considered an error.

```ts
optional.orElseThrow(
  () => new Error("required value missing")
);
```
