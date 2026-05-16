export type ResultMatch<T, E, U> = {
  Ok: (value: NonNullable<T>) => U;
  Err: (err: Error | E) => U;
};

export class Result<T, E> {
  constructor(
    private readonly ok: T | null,
    private readonly err: Error | E | null
  ) {}

  match<U>(cases: ResultMatch<T, E, U>): U {
    return this.ok ? cases.Ok(this.ok) : cases.Err(this.err as Error | E);
  }

  unwrap(): NonNullable<T> {
    if (this.ok) {
      return this.ok;
    }
    throw this.err;
  }

  unwrapOr(other: NonNullable<T>): NonNullable<T> {
    if (this.ok) {
      return this.ok;
    }
    return other;
  }

  static ok<T, E>(value: T) {
    return Result.of<T, E>(Promise.resolve(value));
  }

  static error<T, E>(value: E) {
    return Result.of<T, E>(Promise.reject(value));
  }

  private static async of<T, E>(execution: Promise<T>): Promise<Result<T | null, E>> {
    try {
      return new Result<T, E>(await execution, null);
    } catch (err) {
      return new Result<T, E>(null, err as E);
    }
  }
}
