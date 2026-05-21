/**
 * Thrown when attempting to access or operate on a missing value.
 *
 * Inspired by Java's `NullPointerException`.
 *
 * Commonly used when an operation requires a non-null value
 * but receives `null` or `undefined`.
 *
 * @example
 * throw new NullPointerException();
 *
 * @example
 * Optional.of(null);
 * // throws NullPointerException
 */
export class NullPointerException extends Error {}
