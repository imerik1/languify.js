/**
 * Represents a custom matchable type.
 *
 * Any object implementing `match(cases)` can be consumed by `match()`.
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
 * class State {
 *   match<T>(cases: { Loading: () => T; Done: () => T }) {
 *     return cases.Loading();
 *   }
 * }
 *
 * match(new State(), {
 *   Loading: () => "loading",
 *   Done: () => "done",
 * });
 */
export function match<Cases, Return>(value: Matchable<Cases, Return>, cases: Cases): Return;

/**
 * Pattern matches primitive nullable values using `Some` / `None` semantics.
 *
 * Non-nullish values (`string`, `number`, `symbol`) resolve to `Some`.
 * `null` resolves to `None`.
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
 * match("john", {
 *   Some: (value) => `Hello ${value}`,
 *   None: () => "Missing"
 * });
 *
 * @example
 * match(null, {
 *   Some: "Has value",
 *   None: "Empty"
 * });
 */
export function match<T extends string | number | symbol | null, U>(
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
 * `Some` is selected for non-nullish primitive values.
 * `None` is selected for `null` / `undefined`.
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
