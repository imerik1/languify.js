/**
 * Result match branches.
 *
 * `Ok` is executed when the operation succeeds.
 * `Err` is executed when the operation fails.
 *
 * @template T Success value type.
 * @template E Error value type.
 * @template U Match result type.
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
   * const result = await Result.ok("hello");
   *
   * result.match({
   *   Ok: (value) => value.toUpperCase(),
   *   Err: (err) => `Error: ${err}`
   * });
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
   * const value = (await Result.ok("hello")).unwrap();
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
   * (await Result.error("failure")).unwrapOr("default");
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
   * @returns Promise resolving to an `Ok` result.
   *
   * @example
   * const result = await Result.ok("success");
   */
  static ok<T, E>(value: T) {
    return Result.of<T, E>(Promise.resolve(value));
  }

  /**
   * Creates a failed result from an error value.
   *
   * @template T Success value type.
   * @template E Error value type.
   *
   * @param value Error value.
   *
   * @returns Promise resolving to an `Err` result.
   *
   * @example
   * const result = await Result.error("failure");
   */
  static error<T, E>(value: E) {
    return Result.of<T, E>(Promise.reject(value));
  }

  /**
   * Internal helper for creating a result from an execution.
   *
   * Resolves to `Ok` on success and `Err` on failure.
   *
   * @template T Success value type.
   * @template E Error value type.
   *
   * @param execution Async execution.
   *
   * @returns Result promise.
   */
  private static async of<T, E>(execution: Promise<T>): Promise<Result<T | null, E>> {
    try {
      return new Result<T, E>(await execution, null);
    } catch (err) {
      return new Result<T, E>(null, err as E);
    }
  }
}
