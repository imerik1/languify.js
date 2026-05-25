/**
 * Thrown when attempting to access or operate on a missing value.
 *
 * Inspired by Java's `NullPointerException`.
 *
 * Commonly used when an operation requires a non-null value
 * but receives `null` or `undefined`.
 *
 * @example
 * import { NullPointerException } from "languify.js/java";
 *
 * throw new NullPointerException();
 *
 * @example
 * import { NullPointerException } from "languify.js/java";
 *
 * function required<T>(value: T | null | undefined): T {
 *   if (value === null || value === undefined) {
 *     throw new NullPointerException();
 *   }
 *
 *   return value;
 * }
 *
 * @example
 * import { Optional } from "languify.js/java";
 *
 * const value = null as unknown as string;
 *
 * Optional.of(value);
 * // throws NullPointerException
 */
export class NullPointerException extends Error {}
