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
 */
export class Optional<T> {
  constructor(private value: T | null) {}

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
   * Optional.of("hello");
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
   * Accepts both present and empty values.
   *
   * @template T Stored value type.
   *
   * @param value Nullable value.
   *
   * @returns Optional instance.
   *
   * @example
   * Optional.ofNullable("hello");
   * Optional.ofNullable(null);
   */
  static ofNullable<T>(value: T | null) {
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
   * Optional.empty();
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
   * Optional.of("hello").get();
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
   * Optional.of("hello").isPresent();
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
   * Optional.empty().isEmpty();
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
   * Optional.of("hello").ifPresent(console.log);
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
   * Optional.empty().ifPresentOrElse(
   *   console.log,
   *   () => console.log("empty")
   * );
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
   * Optional.empty().orElse("default");
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
   * Optional.empty().orElseGet(() => "default");
   */
  orElseGet(fn: () => NonNullable<T>): NonNullable<T> {
    return this.isEmpty() ? fn() : (this.value as NonNullable<T>);
  }

  /**
   * Returns the stored value or throws a custom error.
   *
   * @template T Error type.
   *
   * @param fn Error factory.
   *
   * @returns Stored value.
   *
   * @throws {T}
   *
   * @example
   * Optional.empty().orElseThrow(
   *   () => new Error("missing value")
   * );
   */
  orElseThrow<T extends Error>(fn: () => T): NonNullable<T> {
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
   * Optional.of(10)
   *   .filter((value) => value !== null && value > 5);
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
   * Optional.of("hello")
   *   .map((value) => value?.toUpperCase());
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
   * Optional.empty()
   *   .or(() => Optional.of("fallback"));
   */
  or(fn: () => Optional<T>): Optional<T> {
    return this.isEmpty() ? fn() : this;
  }

  /**
   * Converts the optional into a JSON-compatible value.
   *
   * @returns Stored value or `null`.
   */
  toJSON() {
    return this.value;
  }
}
