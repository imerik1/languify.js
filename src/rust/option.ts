export type OptionMatch<T, U> = {
  Some: (value: T) => U;
  None: () => U;
};

class Option<T> {
  constructor(protected readonly value: T) {}

  match<U>(cases: OptionMatch<T, U>): U {
    return this.value ? cases.Some(this.value) : cases.None();
  }

  unwrap() {
    return this.value;
  }

  unwrapOr<U>(otherOption: U): U {
    return otherOption;
  }
}

export const Some = <T>(value: T) => {
  return new Option(value);
};

export const None = new Option(null);
