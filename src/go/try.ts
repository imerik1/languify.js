/**
 * The result returned by {@link go.try}.
 *
 * The first item contains the successful value and the second item contains
 * the error. Exactly one item is non-null.
 *
 * @template T Successful value type.
 * @template E Error value type.
 */
export type GoTryResult<T, E = unknown> = [ok: T, err: null] | [ok: null, err: E];

/**
 * Executes a function and returns its value and error as a Go-style tuple.
 *
 * Synchronous functions return a tuple immediately. Functions that return a
 * promise return a promise of that tuple.
 *
 * @template T Successful value type.
 * @template E Error value type.
 *
 * @param fn Function to execute.
 *
 * @returns A result tuple, or a promise of one when `fn` returns a promise.
 *
 * @example
 * import { go } from "languify.js/go";
 *
 * const [value, error] = go.try(() => JSON.parse('{"name":"Ada"}'));
 *
 * console.log(value?.name);
 * // "Ada"
 *
 * console.log(error);
 * // null
 *
 * @example
 * import { go } from "languify.js/go";
 *
 * const [value, error] = await go.try(async () => fetchName());
 *
 * if (error) {
 *   console.error(error);
 * } else {
 *   console.log(value);
 * }
 */
function tryCall<E = unknown>(fn: () => never): GoTryResult<never, E>;
function tryCall<T, E = unknown>(fn: () => PromiseLike<T>): Promise<GoTryResult<T, E>>;
function tryCall<T, E = unknown>(fn: () => T): GoTryResult<T, E>;
function tryCall<T, E = unknown>(
  fn: () => T | PromiseLike<T>
): GoTryResult<T, E> | Promise<GoTryResult<T, E>> {
  try {
    const value = fn();

    if (isPromiseLike(value)) {
      return Promise.resolve(value).then(
        (resolvedValue) => [resolvedValue, null],
        (error) => [null, error as E]
      );
    }

    return [value, null];
  } catch (error) {
    return [null, error as E];
  }
}

const isPromiseLike = <T>(value: T | PromiseLike<T>): value is PromiseLike<T> => {
  return (
    value !== null &&
    (typeof value === "object" || typeof value === "function") &&
    typeof (value as PromiseLike<T>).then === "function"
  );
};

/**
 * Go-inspired utilities.
 */
export const go = {
  try: tryCall,
};
