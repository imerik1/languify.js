export type OptionMatch<T, U> = {
  Some: (value: T) => U;
  None: () => U;
};

class Option<T> {
  constructor(protected readonly value: T) {}

  match<U>(cases: OptionMatch<T, U>): U {
    return this.value ? cases.Some(this.value) : cases.None();
  }
}

export class Some<T> extends Option<T> {
  static of<T>(value: T) {
    return new Some<T>(value);
  }

  unwrap() {
    return this.value;
  }
}

export class None<T> extends Option<T> {
  static of() {
    return new None(null);
  }

  orElse<U>(otherOption: U): U {
    return otherOption;
  }
}
