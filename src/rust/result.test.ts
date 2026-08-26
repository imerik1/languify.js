import * as rust from "./result";

describe("rust:result", () => {
  it("should unwrapOr with a synchronous value", () => {
    const sut = rust.Result.ok("test");

    expect(sut.unwrapOr("other")).toBe("test");
  });

  it("should unwrapOr with a synchronous error", () => {
    const sut = rust.Result.error<string, null>(null);

    expect(sut.unwrapOr("other")).toBe("other");
  });

  it("should return a synchronous Ok value", () => {
    const sut = rust.Result.ok("test");
    expect(sut.unwrap()).toBe("test");
  });

  it("should throw a synchronous error", () => {
    const sut = rust.Result.error("error");

    expect(() => sut.unwrap()).throw();
  });

  it("should await an Ok promise", async () => {
    const sut = await rust.Result.ok(Promise.resolve("test"));

    expect(sut.unwrap()).toBe("test");
  });

  it("should turn a rejected Ok promise into an Err", async () => {
    const sut = await rust.Result.ok<string, string>(Promise.reject("error"));

    expect(() => sut.unwrap()).toThrow("error");
  });

  it("should await an Err promise", async () => {
    const sut = await rust.Result.error<string, string>(Promise.resolve("error"));

    expect(() => sut.unwrap()).toThrow("error");
  });
});
