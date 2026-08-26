/**
 * Result match branches.
 *
 * `Ok` is executed when the operation succeeds.
 * `Err` is executed when the operation fails.
 *
 * @template T Success value type.
 * @template E Error value type.
 * @template U Match result type.
 *
 * @example
 * import { Result } from "languify.js/rust";
 *
 * const result = Result.ok<string, string>("saved");
 *
 * const message = result.match({
 *   Ok: (value) => `Success: ${value}`,
 *   Err: (error) => `Error: ${error}`,
 * });
 */
export type ResultMatch<T, E, U> = {
  Ok: (value: NonNullable<T>) => U;
  Err: (err: Error | E) => U;
};

/**
 * Represents the outcome of an operation that may succeed or fail.
 *
 * Inspired by Rust's `Result<T, E>`.
 *
 * A `Result` contains either:
 *
 * - an `Ok` value
 * - an `Err` value
 *
 * Values can be safely handled using `match()`.
 *
 * @template T Success value type.
 * @template E Error value type.
 *
 * @example
 * import { Result } from "languify.js/rust";
 *
 * const response = Result.ok<string, string>("created");
 *
 * const output = response.match({
 *   Ok: (value) => value.toUpperCase(),
 *   Err: (error) => `Failed: ${error}`,
 * });
 */
export class Result<T, E> {
  constructor(
    private readonly ok: T | null,
    private readonly err: Error | E | null
  ) {}

  /**
   * Pattern matches the current result.
   *
   * Executes `Ok` when a successful value exists,
   * otherwise executes `Err`.
   *
   * @template U Match result type.
   *
   * @param cases Match branches.
   *
   * @returns Result produced by the selected branch.
   *
   * @example
   * import { Result } from "languify.js/rust";
   *
   * const result = Result.ok<string, string>("hello");
   *
   * const output = result.match({
   *   Ok: (value) => value.toUpperCase(),
   *   Err: (error) => `Error: ${error}`,
   * });
   *
   * console.log(output);
   * // "HELLO"
   */
  match<U>(cases: ResultMatch<T, E, U>): U {
    return this.ok !== null && this.ok !== undefined
      ? cases.Ok(this.ok)
      : cases.Err(this.err as Error | E);
  }

  /**
   * Extracts the success value.
   *
   * Returns the wrapped value when the result is `Ok`.
   * Throws the stored error when the result is `Err`.
   *
   * @returns Successful value.
   *
   * @throws {Error | E}
   *
   * @example
   * import { Result } from "languify.js/rust";
   *
   * const value = Result.ok<string, Error>("hello").unwrap();
   *
   * console.log(value);
   * // "hello"
   */
  unwrap(): NonNullable<T> {
    if (this.ok !== null && this.ok !== undefined) {
      return this.ok;
    }

    throw this.err;
  }

  /**
   * Returns the success value or a fallback value.
   *
   * @param other Fallback value.
   *
   * @returns Success value when present, otherwise the fallback.
   *
   * @example
   * import { Result } from "languify.js/rust";
   *
   * const value = Result.error<string, string>("failure").unwrapOr("default");
   *
   * console.log(value);
   * // "default"
   */
  unwrapOr(other: NonNullable<T>): NonNullable<T> {
    if (this.ok !== null && this.ok !== undefined) {
      return this.ok;
    }

    return other;
  }

  /**
   * Creates a successful result from a value.
   *
   * @template T Success value type.
   * @template E Error value type.
   *
   * @param value Successful value.
   *
   * @returns An `Ok` result, or a promise resolving to one when `value` is a promise.
   *
   * @example
   * import { Result } from "languify.js/rust";
   *
   * const result = Result.ok<string, Error>("success");
   *
   * console.log(result.unwrap());
   * // "success"
   */
  static ok<T, E>(value: PromiseLike<T>): Promise<Result<T, E>>;
  static ok<T, E>(value: T): Result<T, E>;
  static ok<T, E>(value: T | PromiseLike<T>): Result<T, E> | Promise<Result<T, E>> {
    if (Result.isPromiseLike(value)) {
      return Promise.resolve(value).then(
        (resolvedValue) => new Result<T, E>(resolvedValue, null),
        (error) => new Result<T, E>(null, error as E)
      );
    }

    return new Result<T, E>(value, null);
  }

  /**
   * Creates a failed result from an error value.
   *
   * @template T Success value type.
   * @template E Error value type.
   *
   * @param value Error value.
   *
   * @returns An `Err` result, or a promise resolving to one when `value` is a promise.
   *
   * @example
   * import { Result } from "languify.js/rust";
   *
   * const result = Result.error<string, string>("failure");
   *
   * const value = result.match({
   *   Ok: () => "success",
   *   Err: (error) => error,
   * });
   *
   * console.log(value);
   * // "failure"
   */
  static error<T, E>(value: PromiseLike<E>): Promise<Result<T, E>>;
  static error<T, E>(value: E): Result<T, E>;
  static error<T, E>(value: E | PromiseLike<E>): Result<T, E> | Promise<Result<T, E>> {
    if (Result.isPromiseLike(value)) {
      return Promise.resolve(value).then(
        (resolvedValue) => new Result<T, E>(null, resolvedValue),
        (error) => new Result<T, E>(null, error as E)
      );
    }

    return new Result<T, E>(null, value);
  }

  /**
   * Checks whether a value can be awaited.
   *
   * @param value Value to inspect.
   *
   * @returns Whether `value` is a promise or thenable.
   */
  private static isPromiseLike<T>(value: T | PromiseLike<T>): value is PromiseLike<T> {
    return (
      value !== null &&
      (typeof value === "object" || typeof value === "function") &&
      typeof (value as PromiseLike<T>).then === "function"
    );
  }
}
