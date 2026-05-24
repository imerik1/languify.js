# Result

`Result` represents an operation that can either succeed or fail.

It is inspired by Rust's `Result<T, E>` and helps JavaScript and TypeScript code
model error flows without repeating `try/catch` everywhere.

## Concepts

A result has two states:

- `Ok`: the operation succeeded and contains a value
- `Err`: the operation failed and contains an error

```ts
import { Result } from "languify.js/rust";

const success = await Result.ok<string, string>("saved");
const failure = await Result.error<string, string>("failed");
```

## Creating Success

Use `Result.ok(value)` when the operation succeeded.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("hello");

console.log(response.unwrap());
// hello
```

## Creating Failure

Use `Result.error(error)` when the operation failed.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

const message = response.match({
  Ok: () => "success",
  Err: (error) => `Error: ${error}`,
});

console.log(message);
// Error: failure
```

## Matching Results

Use `.match()` to handle both states explicitly.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("world");

const message = response.match({
  Ok: (value) => `Hello ${value}`,
  Err: () => "Something went wrong",
});

console.log(message);
// Hello world
```

## Working with Custom Error Types

`Result` supports custom error values through generics.

```ts
import { Result } from "languify.js/rust";

type ApiError = {
  message: string;
  status: number;
};

const response = await Result.error<string, ApiError>({
  message: "Unauthorized",
  status: 401,
});

const output = response.match({
  Ok: (value) => value,
  Err: (error) => error.message,
});

console.log(output);
// Unauthorized
```

## Working with Error Instances

`Err` can store native `Error` objects.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, Error>(new Error("failure"));

const output = response.match({
  Ok: () => "success",
  Err: (error) => error.message,
});

console.log(output);
// failure
```

## Unwrapping Values

Use `unwrap()` when the caller expects success.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

console.log(response.unwrap());
// test
```

Calling `unwrap()` on `Err` throws the stored error.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

response.unwrap();
// throws "failure"
```

## Fallback Values

Use `unwrapOr()` when a fallback value is acceptable.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

console.log(response.unwrapOr("fallback"));
// fallback
```

If the result is `Ok`, the original value is returned.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

console.log(response.unwrapOr("other"));
// test
```

## Null Values

`Result.match()` treats `null` and `undefined` success values as the `Err`
branch because an `Ok` branch only runs when a success value is present.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<null, string>(null);

const output = response.match({
  Ok: () => "success",
  Err: () => "empty",
});

console.log(output);
// empty
```

## Using the Standalone Match Helper

The standalone `match()` helper also supports `Result`.

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

const output = match(response, {
  Ok: (value) => value.toUpperCase(),
  Err: () => "ERROR",
});

console.log(output);
// TEST
```

## Result vs Option

Use `Result` when failure details matter:

```ts
response.match({
  Ok: (value) => value,
  Err: (error) => error,
});
```

Use `Option` when only presence or absence matters:

```ts
user.match({
  Some: (value) => value,
  None: () => "empty",
});
```

## Notes

- `Result.ok()` and `Result.error()` are async factory helpers.
- `Ok` represents success.
- `Err` represents failure.
- `unwrap()` throws when the result is `Err`.
- `unwrapOr()` returns a fallback when the result is `Err`.
- `null` and `undefined` success values are treated as failure branches during
  matching.
