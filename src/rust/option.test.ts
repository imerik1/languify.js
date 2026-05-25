import * as rust from ".";

describe("rust:option", () => {
  it("should unwrap value", () => {
    expect(rust.Some("test").unwrap()).toBe("test");
  });

  it("should reject nullish Some values", () => {
    expect(() => rust.Some(null as unknown as string)).throws(TypeError);
    expect(() => rust.Some(undefined as unknown as string)).throws(TypeError);
  });

  it("should unwrapOr return value when value exist", () => {
    expect(rust.Some("test").unwrapOr("secondTest")).toBe("test");
  });

  it("should unwrapOr return other option when value not exist", () => {
    expect(rust.None.unwrapOr("secondTest")).toBe("secondTest");
  });

  it("should toJSON", () => {
    expect(JSON.stringify(rust.Some("teste"))).toBe('"teste"');
    expect(JSON.stringify(rust.None)).toBe("null");
  });
});
