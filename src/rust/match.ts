type Matchable<Cases, Return> = {
  match(cases: Cases): Return;
};

export function match<Cases, Return>(
  value: Matchable<Cases, Return>,
  cases: Cases
): Return;

export function match<T extends string | number | symbol | null, U>(
  value: T,
  cases: {
    Some: (value: NonNullable<T>) => U;
    None: () => U;
  }
): U;

export function match(
  value: any,
  cases: any
) {
  if (
    value &&
    typeof value !== "string" &&
    typeof value.match === "function"
  ) {
    return value.match(cases);
  }

  return value != null
    ? cases.Some(value)
    : cases.None();
}
