/**
 * Option match branches.
 *
 * `Some` is executed when a value exists.
 * `None` is executed when the value is `null` or `undefined`.
 *
 * @template T Stored value type.
 * @template U Match result type.
 */
export type OptionMatch<T, U> = {
  Some: (value: T) => U;
  None: () => U;
};

/**
 * Represents an optional value.
 *
 * Inspired by Rust's `Option<T>`.
 *
 * Values can be safely handled through pattern matching
 * using `match()`.
 *
 * @template T Stored value type.
 */
class Option<T> {
  constructor(protected readonly value: T) {}

  /**
   * Pattern matches the current option.
   *
   * Executes `Some` when the value exists,
   * otherwise executes `None`.
   *
   * @template U Match result type.
   *
   * @param cases Match branches.
   *
   * @returns Result produced by the selected branch.
   *
   * @example
   * Some("hello").match({
   *   Some: (value) => value.toUpperCase(),
   *   None: () => "empty"
   * });
   */
  match<U>(cases: OptionMatch<T, U>): U {
    return this.value !== null && this.value !== undefined ? cases.Some(this.value) : cases.None();
  }

  /**
   * Extracts the wrapped value.
   *
   * @returns Stored value.
   *
   * @example
   * Some("hello").unwrap();
   * // "hello"
   */
  unwrap() {
    return this.value;
  }

  /**
   * Returns a fallback value.
   *
   * @template U Fallback value type.
   *
   * @param otherOption Fallback value.
   *
   * @returns Provided fallback value.
   *
   * @example
   * None.unwrapOr("default");
   * // "default"
   */
  unwrapOr<U>(otherOption: U): U {
    return otherOption;
  }

  /**
   * Converts the option to a JSON-compatible value.
   *
   * @returns Stored value.
   */
  toJSON() {
    return this.value;
  }
}

/**
 * Creates an option containing a value.
 *
 * @template T Value type.
 *
 * @param value Value to wrap.
 *
 * @returns A populated option.
 *
 * @example
 * const value = Some("hello");
 */
export const Some = <T>(value: T) => {
  return new Option(value);
};

/**
 * Represents an empty option.
 *
 * Equivalent to an absent value.
 *
 * @example
 * None.match({
 *   Some: (value) => value,
 *   None: () => "empty"
 * });
 */
export const None = new Option(null);
