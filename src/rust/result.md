# Result

The `Result` type represents the outcome of an operation that can either succeed or fail.

Every `Result` is either:

* `Ok` → contains a successful value
* `Err` → contains an error

It is inspired by Rust's `Result` and helps you handle errors safely without relying on repetitive `try/catch` blocks.

## ✨ Overview

```ts
Result<T, E>

Ok<T>   // success value
Err<E>  // error value
```

## 📦 Creating a Result

### Result.ok()

Creates a successful `Result`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("hello");

console.log(response.unwrap()); // "hello"
```

### Result.error()

Creates a failed `Result`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error("failure");

response.unwrap(); // throws "failure"
```

## 🔄 Matching values

You can safely handle both success and failure cases using `match`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("world");

const message = response.match({
  Ok: (value) => `Hello ${value}`,
  Err: () => "Something went wrong"
});

console.log(message);
```

## 📤 Handling errors

### Err

When the promise fails, `Err` receives the error value.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

const message = response.match({
  Ok: () => "success",
  Err: (err) => `Error: ${err}`
});

console.log(message); // "Error: failure"
```

## 📦 Working with custom error types

`Result` supports custom error types through generics.

```ts
import { Result } from "languify.js/rust";

type ApiError = {
  message: string;
  status: number;
};

const response = await Result.of<
  string,
  ApiError
>(
  Promise.reject({
    message: "Unauthorized",
    status: 401,
  })
);

const result = response.match({
  Ok: (value) => value,
  Err: (err) => err.message,
});

console.log(result); // "Unauthorized"
```

## 📦 Working with Error instances

`Err` also supports native `Error` objects.

```ts
import { Result } from "languify.js/rust";

const error = new Error("failure");

const response = await Result.error<string, Error>(error);

const message = response.match({
  Ok: () => "success",
  Err: (err) => err
});

console.log(message); // Error("failure")
```

## 📦 Working with numbers

`Result` supports any value type.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<number, Error>(5);

const value = response.match({
  Ok: (value) => value + 5,
  Err: () => 0
});

console.log(value); // 10
```

## ⚠️ Null values

Resolved `null` values are treated as `Err`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<null, Error>(null);

const value = response.match({
  Ok: () => "success",
  Err: () => "empty"
});

console.log(value); // "empty"
```

## 📤 Unwrapping values

### unwrap()

Returns the inner value of `Ok`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

console.log(response.unwrap()); // "test"
```

### unwrap() on Err

Calling `unwrap()` on `Err` throws the stored error.

```ts
import { Result } from "languify.js/rust";

const response = Result.error("failure");

response.unwrap(); // throws "failure"
```

## 🔁 Fallback values

### unwrapOr()

Returns a fallback value when the result is `Err`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.error<string, string>("failure");

const value = response.unwrapOr("fallback");

console.log(value); // "fallback"
```

### unwrapOr() with success value

If the result is `Ok`, the original value is returned.

```ts
import { Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

const value = response.unwrapOr("other");

console.log(value); // "test"
```

## ⚠️ Important notes

* `Result` helps eliminate repetitive `try/catch`
* Prefer `match()` over manual error handling
* `Ok` always represents success
* `Err` always represents failure
* `unwrap()` throws when the result is `Err`
* `unwrapOr()` provides safe fallback values
* Resolved `null` values are treated as `Err`
* `Result.ok()` creates successful results directly
* `Result.error()` creates failed results directly

## 🚀 Example

```ts
import { Result } from "languify.js/rust";

type UserError =
  | "User not found"
  | "Unauthorized";

async function getUser(id: number) {
  if (id === 1) {
    return Result.ok({
      id: 1,
      name: "John"
    });
  }

  return Result.error<UserError>(
    "User not found"
  );
}

const user = await getUser(1);

const message = user.match({
  Ok: (value) => `Welcome ${value.name}`,
  Err: (err) => `Error: ${err}`
});

console.log(message);
```

## ✅ Using with standalone `match`

You can also use the standalone `match()` helper.

```ts
import { match, Result } from "languify.js/rust";

const response = await Result.ok<string, Error>("test");

const value = match(response, {
  Ok: (value) => value.toUpperCase(),
  Err: () => "ERROR"
});

console.log(value); // "TEST"
```

## 🧠 Result vs Option

Use `Result` when an operation can fail and you need to preserve the error.

```ts
match(response, {
  Ok: (value) => value,
  Err: (err) => err,
});
```

Use `Option` when a value may or may not exist.

```ts
match(user, {
  Some: (value) => value,
  None: () => "empty",
});
```
