import { NullPointerException } from "./exception";

/**
 * Represents an optional value container.
 *
 * Inspired by Java's `Optional<T>`.
 *
 * An `Optional` may contain:
 *
 * - a present value
 * - an empty value
 *
 * @template T Stored value type.
 *
 * @example
 * import { Optional } from "languify.js/java";
 *
 * const label = Optional.ofNullable("languify")
 *   .map((value) => value?.toUpperCase())
 *   .orElse("DEFAULT");
 *
 * console.log(label);
 * // "LANGUIFY"
 */
export class Optional<T> {
  private value: T | null;

  constructor(value: T | null | undefined) {
    this.value = value ?? null;
  }

  /**
   * Creates an optional containing a non-null value.
   *
   * Throws when the provided value is `null` or `undefined`.
   *
   * @template T Stored value type.
   *
   * @param value Non-null value.
   *
   * @returns Populated optional.
   *
   * @throws {NullPointerException}
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of("hello");
   *
   * console.log(value.get());
   * // "hello"
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = null as unknown as string;
   *
   * Optional.of(value);
   * // throws NullPointerException
   */
  static of<T>(value: NonNullable<T>) {
    if (value === null || value === undefined) {
      throw new NullPointerException();
    }

    return new Optional(value);
  }

  /**
   * Creates an optional from a nullable value.
   *
   * Accepts present values and treats `null` or `undefined` as empty.
   *
   * @template T Stored value type.
   *
   * @param value Nullable value.
   *
   * @returns Optional instance.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const present = Optional.ofNullable("hello");
   * const missing = Optional.ofNullable<string>(undefined);
   *
   * console.log(present.isPresent());
   * // true
   *
   * console.log(missing.isEmpty());
   * // true
   */
  static ofNullable<T>(value: T | null | undefined) {
    return new Optional(value);
  }

  /**
   * Creates an empty optional.
   *
   * @template T Stored value type.
   *
   * @returns Empty optional.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.empty<string>();
   *
   * console.log(value.isEmpty());
   * // true
   */
  static empty<T>() {
    return new Optional<T>(null);
  }

  /**
   * Returns the contained value.
   *
   * @returns Stored value.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of("hello").get();
   *
   * console.log(value);
   * // "hello"
   */
  get(): NonNullable<T> {
    return this.value as NonNullable<T>;
  }

  /**
   * Checks whether a value is present.
   *
   * @returns `true` when the optional contains a value.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of("hello").isPresent();
   *
   * console.log(value);
   * // true
   */
  isPresent(): boolean {
    return this.value !== null && this.value !== undefined;
  }

  /**
   * Checks whether the optional is empty.
   *
   * @returns `true` when no value is present.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.empty().isEmpty();
   *
   * console.log(value);
   * // true
   */
  isEmpty(): boolean {
    return !this.isPresent();
  }

  /**
   * Executes a callback when a value is present.
   *
   * @param fn Callback executed with the stored value.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * Optional.of("hello").ifPresent((value) => {
   *   console.log(value.toUpperCase());
   * });
   * // "HELLO"
   */
  ifPresent<U>(fn: (value: NonNullable<T>) => U): void {
    if (this.isEmpty()) {
      return;
    }

    fn(this.value as NonNullable<T>);
  }

  /**
   * Executes a callback when a value is present,
   * otherwise executes an alternative callback.
   *
   * @param fn Present value callback.
   * @param fnElse Empty value callback.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * Optional.empty<string>().ifPresentOrElse(
   *   (value) => console.log(value),
   *   () => console.log("empty"),
   * );
   * // "empty"
   */
  ifPresentOrElse(fn: (value: NonNullable<T>) => void, fnElse: () => void): void {
    if (this.isEmpty()) {
      fnElse();
      return;
    }

    fn(this.value as NonNullable<T>);
  }

  /**
   * Returns the stored value or a fallback value.
   *
   * @param otherValue Fallback value.
   *
   * @returns Stored value when present, otherwise the fallback.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.empty<string>().orElse("default");
   *
   * console.log(value);
   * // "default"
   */
  orElse(otherValue: NonNullable<T>): NonNullable<T> {
    return this.isEmpty() ? otherValue : (this.value as NonNullable<T>);
  }

  /**
   * Returns the stored value or computes a fallback value.
   *
   * @param fn Fallback producer.
   *
   * @returns Stored value when present, otherwise the computed value.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.empty<string>().orElseGet(() => "generated");
   *
   * console.log(value);
   * // "generated"
   */
  orElseGet(fn: () => NonNullable<T>): NonNullable<T> {
    return this.isEmpty() ? fn() : (this.value as NonNullable<T>);
  }

  /**
   * Returns the stored value or throws a custom error.
   *
   * @template E Error type.
   *
   * @param fn Error factory.
   *
   * @returns Stored value.
   *
   * @throws {E}
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of("hello").orElseThrow(() => new Error("missing value"));
   *
   * console.log(value);
   * // "hello"
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * Optional.empty<string>().orElseThrow(() => new Error("missing value"));
   * // throws Error
   */
  orElseThrow<E extends Error>(fn: () => E): NonNullable<T> {
    if (this.isEmpty()) {
      throw fn();
    }

    return this.value as NonNullable<T>;
  }

  /**
   * Filters the contained value.
   *
   * Clears the optional when the predicate returns `false`.
   *
   * @param fn Predicate function.
   *
   * @returns Current optional instance.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of(10).filter((number) => number !== null && number > 5);
   *
   * console.log(value.isPresent());
   * // true
   */
  filter(fn: (value: T | null) => boolean) {
    if (!fn(this.value)) {
      this.value = null;
    }

    return this;
  }

  /**
   * Maps the contained value into another optional.
   *
   * @template U Mapped value type.
   *
   * @param fn Mapping function.
   *
   * @returns New mapped optional.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.of("hello").map((text) => text?.toUpperCase());
   *
   * console.log(value.get());
   * // "HELLO"
   */
  map<U>(fn: (value: T | null) => U): Optional<U> {
    return Optional.ofNullable(fn(this.value));
  }

  /**
   * Returns the current optional when present,
   * otherwise returns an alternative optional.
   *
   * @param fn Alternative optional producer.
   *
   * @returns Present or fallback optional.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * const value = Optional.empty<string>().or(() => Optional.of("fallback"));
   *
   * console.log(value.get());
   * // "fallback"
   */
  or(fn: () => Optional<T>): Optional<T> {
    return this.isEmpty() ? fn() : this;
  }

  /**
   * Converts the optional into a JSON-compatible value.
   *
   * @returns Stored value or `null`.
   *
   * @example
   * import { Optional } from "languify.js/java";
   *
   * JSON.stringify(Optional.of("hello"));
   * // "\"hello\""
   *
   * JSON.stringify(Optional.empty());
   * // "null"
   */
  toJSON() {
    return this.value;
  }
}
