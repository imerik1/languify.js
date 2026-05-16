export type ResultMatch<T, U> = {
  Ok: (value: NonNullable<T>) => U;
  Err: (err: Error | unknown) => U;
}

export class Result<T> {
  constructor(private readonly ok: T | null, private readonly err: Error | unknown | null) {}

  match<U>(cases: ResultMatch<T, U>): U {
      return this.ok ? cases.Ok(this.ok) : cases.Err(this.err);
  }

  static async of<T>(execution: Promise<T>): Promise<Result<T | null>> {
    try {
      return new Result(await execution, null);
    } catch (err) {
      return new Result(null, err)
    }
  }
}
