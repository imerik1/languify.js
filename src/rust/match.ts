/**
 * Represents a custom matchable type.
 *
 * Any object implementing `match(cases)` can be consumed by `match()`.
 *
 * @template Cases Match case definitions accepted by the object.
 * @template Return Result type produced by the selected case.
 *
 * @example
 * type StatusCases<T> = {
 *   Ready: () => T;
 *   Waiting: () => T;
 * };
 *
 * class Status {
 *   match<T>(cases: StatusCases<T>) {
 *     return cases.Ready();
 *   }
 * }
 */
type Matchable<Cases, Return> = {
  match(cases: Cases): Return;
};

/**
 * Pattern matches a custom matchable object.
 *
 * Supports any object implementing a `.match()` method.
 *
 * @template Cases Match case definitions.
 * @template Return Result type returned by the matcher.
 *
 * @param value Matchable instance.
 * @param cases Available match branches.
 *
 * @returns Result produced by the matched branch.
 *
 * @example
 * import { match } from "languify.js/rust";
 *
 * class State {
 *   match<T>(cases: { Loading: () => T; Done: () => T }) {
 *     return cases.Loading();
 *   }
 * }
 *
 * const label = match(new State(), {
 *   Loading: () => "loading",
 *   Done: () => "done",
 * });
 *
 * console.log(label);
 * // "loading"
 */
export function match<Cases, Return>(value: Matchable<Cases, Return>, cases: Cases): Return;

/**
 * Pattern matches primitive nullable values using `Some` / `None` semantics.
 *
 * Non-nullish values (`string`, `number`, `symbol`) resolve to `Some`.
 * `null` and `undefined` resolve to `None`.
 *
 * Match branches may be functions or direct values.
 *
 * @template T Primitive nullable input type.
 * @template U Match result type.
 *
 * @param value Primitive value to match.
 * @param cases Match branches.
 *
 * @returns Result produced by the selected branch.
 *
 * @example
 * import { match } from "languify.js/rust";
 *
 * const greeting = match("john", {
 *   Some: (value) => `Hello ${value}`,
 *   None: () => "Missing",
 * });
 *
 * console.log(greeting);
 * // "Hello john"
 *
 * @example
 * import { match } from "languify.js/rust";
 *
 * const status = match(null, {
 *   Some: "Has value",
 *   None: "Empty",
 * });
 *
 * console.log(status);
 * // "Empty"
 */
export function match<T extends string | number | symbol | null | undefined, U>(
  value: T,
  cases: {
    Some?: U | ((value: NonNullable<T>) => U);
    None?: U | (() => U);
  }
): U;

/**
 * Unified pattern matching helper.
 *
 * Supports:
 *
 * - custom matchable objects implementing `.match()`
 * - primitive nullable values
 * - direct values or callback branches
 *
 * @example
 * import { match } from "languify.js/rust";
 *
 * const label = match(42, {
 *   Some: (value) => `Value: ${value}`,
 *   None: () => "Missing",
 * });
 *
 * console.log(label);
 * // "Value: 42"
 */
// biome-ignore lint/suspicious/noExplicitAny: match there overload functions to guarantee types
export function match(value: any, cases: any) {
  if (value && typeof value !== "string" && typeof value.match === "function") {
    return value.match(cases);
  }

  if (value !== null && value !== undefined) {
    switch (typeof cases?.Some) {
      case "function":
        return cases.Some(value);
      default:
        return cases?.Some;
    }
  }

  switch (typeof cases?.None) {
    case "function":
      return cases.None();
    default:
      return cases?.None;
  }
}
