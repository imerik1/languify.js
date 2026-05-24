# NullPointerException

`NullPointerException` is a Java-inspired error for operations that require a
non-null value.

Use it when `null` or `undefined` should fail immediately instead of moving
through the rest of the program.

## Throwing Manually

```ts
import { NullPointerException } from "languify.js/java";

throw new NullPointerException();
```

## Validating Required Values

```ts
import { NullPointerException } from "languify.js/java";

function required<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new NullPointerException();
  }

  return value;
}
```

## Using with Optional

`Optional.of()` throws `NullPointerException` when it receives a nullish value.

```ts
import { Optional } from "languify.js/java";

const value = null as unknown as string;

Optional.of(value);
// throws NullPointerException
```

## When to Use It

Use `NullPointerException` when:

- a value is required
- `null` and `undefined` are invalid input
- failing immediately is clearer than returning an empty value
- you are building a Java-inspired API surface

```ts
import { NullPointerException } from "languify.js/java";

function createUser(name?: string) {
  if (!name) {
    throw new NullPointerException();
  }

  return { name };
}
```
