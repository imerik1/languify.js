import * as rust from "./result";

describe("Result", () => {
  it("should unwrapOr with value", async () => {
    const sut = await rust.Result.ok("test");

    expect(sut.unwrapOr("other")).toBe("test");
  });

  it("should unwrapOr with other value", async () => {
    const sut = await rust.Result.error<string, null>(null);

    expect(sut.unwrapOr("other")).toBe("other");
  });

  it("should ok return value", async () => {
    const sut = await rust.Result.ok("test");
    expect(sut.unwrap()).toBe("test");
  });

  it("should err throws", async () => {
    const sut = await rust.Result.error("error");

    expect(() => sut.unwrap()).throw();
  });
});
