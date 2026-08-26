# Go try

`go.try()` executes a function and returns a Go-style `[ok, err]` tuple.

## Synchronous functions

Synchronous functions return their tuple immediately, so no `await` is needed.

```ts
import { go } from "languify.js/go";

const [user, error] = go.try(() => JSON.parse('{"name":"Ada"}'));

if (error) {
  console.error(error);
} else {
  console.log(user.name);
  // Ada
}
```

If the function throws, the returned tuple contains `null` for `ok` and the
thrown value for `err`.

## Async functions

When the function returns a promise, `go.try()` returns a promise too. Await it
to receive the tuple.

```ts
import { go } from "languify.js/go";

const [user, error] = await go.try(async () => fetchUser());

if (error) {
  console.error(error);
} else {
  console.log(user.name);
}
```

A rejected promise is returned as `err` rather than thrown.
