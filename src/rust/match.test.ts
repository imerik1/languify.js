import * as rust from ".";

describe("rust:match", () => {
  describe("Option", () => {
    it("should match Some", () => {
      const result = rust.match(rust.Some("test"), {
        Some: (value) => value.toUpperCase(),
        None: () => "test",
      });

      expect(result).toBe("TEST");
    });

    it("should match None", () => {
      const result = rust.match(rust.None, {
        Some: () => "has_value",
        None: () => "empty",
      });

      expect(result).toBe("empty");
    });
  });

  describe("Result", () => {
    it("should match ok", async () => {
      const result = rust.match(await rust.Result.ok("test"), {
        Ok: (value) => value,
        Err: (_) => null,
      });

      expect(result).toBe("test");
    });

    it("should match err", async () => {
      const result = rust.match(await rust.Result.error("test"), {
        Ok: (value) => value,
        Err: (err) => err,
      });

      expect(result).toBe("test");
    });

    it("should match null", () => {
      const result = rust.match(null, {
        Some: () => "has_value",
        None: () => "empty",
      });

      expect(result).toBe("empty");
    });

    it("should match undefined", () => {
      const result = rust.match(undefined, {
        Some: () => "has_value",
        None: () => "empty",
      });

      expect(result).toBe("empty");
    });
  });

  describe("Custom", () => {
    class Custom {
      constructor(private readonly value: "google" | string) {}

      match<U>(cases: {
        "1": (value: "google" | string) => U;
        "2": (value: "google" | string) => U;
      }) {
        return this.value === "google" ? cases[1](this.value) : cases[2](this.value);
      }
    }

    it("1 - should match from custom", () => {
      const result = rust.match(new Custom("google"), {
        1: (value) => `${value} Employee`,
        2: (value) => `${value} Employee`,
      });

      expect(result).toBe("google Employee");
    });

    it("2 - should match from custom", () => {
      const result = rust.match(new Custom("microsoft"), {
        1: (value) => `${value} Employee`,
        2: (value) => `${value} Employee`,
      });

      expect(result).toBe("microsoft Employee");
    });
  });

  describe("Generic", () => {
    it("should match string", () => {
      const result = rust.match("has_value", {
        Some: (value) => value,
        None: () => "empty",
      });

      expect(result).toBe("has_value");
    });

    it("should match null", () => {
      const result = rust.match(null, {
        Some: () => "has_value",
        None: () => "empty",
      });

      expect(result).toBe("empty");
    });

    it("should match string", () => {
      const result = rust.match("has_value", {
        Some: "has_value",
        None: () => "empty",
      });

      expect(result).toBe("has_value");
    });

    it("should match null", () => {
      const result = rust.match(null, {
        Some: () => "has_value",
        None: "empty",
      });

      expect(result).toBe("empty");
    });
  });
});
