/**
 * Option match branches.
 *
 * `Some` is executed when a value exists.
 * `None` is executed when the value is `null` or `undefined`.
 * Branches must be callbacks when using `Option.match()`.
 *
 * @template T Stored value type.
 * @template U Match result type.
 */
export type OptionMatch<T, U> = {
  Some: (value: NonNullable<T>) => U;
  None: () => U;
};

/**
 * Represents an optional value.
 *
 * Inspired by Rust's `Option<T>`.
 *
 * Values can be safely handled through the instance `.match()` method or the
 * standalone `match()` helper.
 *
 * @template T Stored value type.
 *
 * @example
 * import { Some } from "languify.js/rust";
 *
 * const message = Some("Ada").match({
 *   Some: (name) => `Hello ${name}`,
 *   None: () => "No user",
 * });
 *
 * console.log(message);
 * // "Hello Ada"
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
   * import { Some } from "languify.js/rust";
   *
   * const output = Some("hello").match({
   *   Some: (value) => value.toUpperCase(),
   *   None: () => "empty",
   * });
   *
   * console.log(output);
   * // "HELLO"
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
   * import { Some } from "languify.js/rust";
   *
   * const value = Some("hello").unwrap();
   *
   * console.log(value);
   * // "hello"
   */
  unwrap() {
    return this.value;
  }

  /**
   * Returns the stored value or a fallback value.
   *
   * @template U Fallback value type.
   *
   * @param fallback Fallback value.
   *
   * @returns Stored value when present, otherwise the fallback.
   *
   * @example
   * import { None, Some } from "languify.js/rust";
   *
   * Some("value").unwrapOr("default");
   * // "value"
   *
   * None.unwrapOr("default");
   * // "default"
   */
  unwrapOr<U>(fallback: U): NonNullable<T> | U {
    return this.value !== null && this.value !== undefined ? this.value : fallback;
  }

  /**
   * Converts the option to a JSON-compatible value.
   *
   * @returns Stored value.
   *
   * @example
   * import { None, Some } from "languify.js/rust";
   *
   * JSON.stringify(Some("hello"));
   * // "\"hello\""
   *
   * JSON.stringify(None);
   * // "null"
   */
  toJSON() {
    return this.value;
  }
}

/**
 * Creates an option containing a value.
 *
 * `Some` represents presence, so `null` and `undefined` are rejected.
 * Use `None` or the standalone `match()` helper for nullable values.
 *
 * @template T Value type.
 *
 * @param value Non-nullish value to wrap.
 *
 * @returns A populated option.
 *
 * @throws {TypeError} When `value` is `null` or `undefined`.
 *
 * @example
 * import { Some } from "languify.js/rust";
 *
 * const value = Some("hello");
 *
 * console.log(value.unwrap());
 * // "hello"
 *
 * @example
 * import { Some } from "languify.js/rust";
 *
 * const value = undefined as unknown as string;
 *
 * Some(value);
 * // throws TypeError
 */
export const Some = <T extends NonNullable<unknown>>(value: T) => {
  if (value === null || value === undefined) {
    throw new TypeError("Some requires a non-nullish value.");
  }

  return new Option(value);
};

/**
 * Represents an empty option.
 *
 * Equivalent to an absent value.
 *
 * @example
 * import { None } from "languify.js/rust";
 *
 * const value = None.match({
 *   Some: () => "present",
 *   None: () => "empty",
 * });
 *
 * console.log(value);
 * // "empty"
 */
export const None = new Option(null);
