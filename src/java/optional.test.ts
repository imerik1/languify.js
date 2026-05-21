import { NullPointerException } from "./exception";
import * as java from "./optional";

describe("java:optional", () => {
  it("should create optional with of()", () => {
    expect(java.Optional.of("test").get()).toBe("test");
  });

  it("should throws creating optional with of() with null value", () => {
    expect(() => {
      java.Optional.of(null as unknown as string);
    }).throws(NullPointerException);
  });

  it("should create optional with ofNullable()", () => {
    expect(java.Optional.ofNullable("test").get()).toBe("test");
  });

  it("should create empty optional", () => {
    expect(java.Optional.empty().isEmpty()).toBe(true);
  });

  it("should check isPresent()", () => {
    expect(java.Optional.of("test").isPresent()).toBe(true);
    expect(java.Optional.empty().isPresent()).toBe(false);
  });

  it("should check isEmpty()", () => {
    expect(java.Optional.of("test").isEmpty()).toBe(false);
    expect(java.Optional.empty().isEmpty()).toBe(true);
  });

  it("should call ifPresent()", () => {
    let result = "";

    java.Optional.of("test").ifPresent((value) => {
      result = value;
    });

    expect(result).toBe("test");
  });

  it("should not call ifPresent()", () => {
    let result = "";

    java.Optional.ofNullable<string>(null).ifPresent((value) => {
      result = value;
    });

    expect(result).toBe("");
  });

  it("should call ifPresentOrElse present branch", () => {
    let result = "";

    java.Optional.of("test").ifPresentOrElse(
      (value) => {
        result = value;
      },
      () => {
        result = "empty";
      }
    );

    expect(result).toBe("test");
  });

  it("should call ifPresentOrElse else branch", () => {
    let result = "";

    java.Optional.empty<string>().ifPresentOrElse(
      (value) => {
        result = value;
      },
      () => {
        result = "empty";
      }
    );

    expect(result).toBe("empty");
  });

  it("should orElse return current value", () => {
    expect(java.Optional.of<string>("test").orElse("fallback")).toBe("test");
  });

  it("should orElse return fallback value", () => {
    expect(java.Optional.empty<string>().orElse("fallback")).toBe("fallback");
  });

  it("should orElseGet return current value", () => {
    expect(java.Optional.of<string>("test").orElseGet(() => "fallback")).toBe("test");
  });

  it("should orElseGet return generated value", () => {
    expect(java.Optional.empty<string>().orElseGet(() => "fallback")).toBe("fallback");
  });

  it("should filter preserve matching value", () => {
    const result = java.Optional.of("test").filter((value) => value === "test");

    expect(result.get()).toBe("test");
  });

  it("should filter remove non matching value", () => {
    const result = java.Optional.of<string>("test").filter((value) => value === "other");

    expect(result.isEmpty()).toBe(true);
  });

  it("should map value", () => {
    const result = java.Optional.of("test").map((value) => value?.toUpperCase());

    expect(result.get()).toBe("TEST");
  });

  it("should or return current optional", () => {
    const result = java.Optional.of<string>("test").or(() => java.Optional.of("fallback"));

    expect(result.get()).toBe("test");
  });

  it("should or return fallback optional", () => {
    const result = java.Optional.empty<string>().or(() => java.Optional.of("fallback"));

    expect(result.get()).toBe("fallback");
  });

  it("should orElseThrow not throws when present", () => {
    expect(() => {
      java.Optional.of<string>("teste").orElseThrow(() => new Error("unknown error"));
    }).not.throws(Error);
  });

  it("should orElseThrow throws when empty", () => {
    expect(() => {
      java.Optional.empty<string>().orElseThrow(() => new Error("unknown error"));
    }).throws(Error);
  });

  it("should serialize toJSON()", () => {
    expect(JSON.stringify(java.Optional.of("test"))).toBe('"test"');
    expect(JSON.stringify(java.Optional.empty())).toBe("null");
  });
});
