# Result

The `Result` type represents the outcome of an operation that can either succeed or fail.

Every `Result` is either:

* `Ok` → contains a successful value
* `Err` → contains an error

It is inspired by Rust's `Result` and helps you handle errors safely without relying on repetitive `try/catch` blocks.

## ✨ Overview

```ts
Result<T>

Ok<T>   // success value
Err     // error value
```

## 📦 Creating a Result

### Result.of()

Use `Result.of()` to safely wrap async operations.

```ts
import { Result } from "languify.js/rust";

const response = await Result.of(
  Promise.resolve("hello")
);
```

If the promise resolves, the result contains `Ok`.

If the promise rejects, the result contains `Err`.

## 🔄 Matching values

You can safely handle both success and failure cases using `match`.

```ts
import { Result } from "languify.js/rust";

const response = await Result.of(
  Promise.resolve("world")
);

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

const response = await Result.of(
  Promise.reject("failure")
);

const message = response.match({
  Ok: () => "success",
  Err: (err) => `Error: ${err}`
});

console.log(message); // "Error: failure"
```

## 📦 Working with Error instances

`Err` also supports native `Error` objects.

```ts
import { Result } from "languify.js/rust";

const error = new Error("failure");

const response = await Result.of(
  Promise.reject(error)
);

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

const response = await Result.of(
  Promise.resolve(5)
);

const value = response.match({
  Ok: (value) => value + 5,
  Err: () => 0
});

console.log(value); // 10
```

## ⚠️ Important notes

* `Result` helps eliminate repetitive `try/catch`
* Prefer `match()` over manual error handling
* `Ok` always represents success
* `Err` always represents failure
* `Result.of()` automatically converts rejected promises into `Err`

## 🚀 Example

```ts
import { Result } from "languify.js/rust";

async function getUser(id: number) {
  if (id === 1) {
    return Result.of(
      Promise.resolve({
        id: 1,
        name: "John"
      })
    );
  }

  return Result.of(
    Promise.reject("User not found")
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

const response = await Result.of(
  Promise.resolve("test")
);

const value = match(response, {
  Ok: (value) => value.toUpperCase(),
  Err: () => "ERROR"
});

console.log(value); // "TEST"
```
