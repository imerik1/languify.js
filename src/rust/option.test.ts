import * as rust from ".";

describe("rust:option", () => {
  it("should unwrap value", () => {
    expect(rust.Some("test").unwrap()).toBe("test");
  });

  it("should unwrapOr return value when value exist", () => {
    expect(rust.Some("test").unwrap()).toBe("test");
  });

  it("should unwrapOr return other option when value not exist", () => {
    expect(rust.None.unwrapOr("secondTest")).toBe("secondTest");
  });
});
