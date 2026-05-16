import * as rust from "./result";

describe("Result", () => {
  it("should return Result with Ok when promise resolves", async () => {
    const sut = await rust.Result.of(Promise.resolve("test"));

    const response = sut.match({
      Ok: (value) => value,
      Err: () => null,
    });

    expect(response).toBe("test");
  });

  it("should return Result with Err when promise rejects", async () => {
    const sut = await rust.Result.of(Promise.reject("failure"));

    const response = sut.match({
      Ok: () => "success",
      Err: (err) => err,
    });

    expect(response).toBe("failure");
  });

  it("should return Result with Error instance", async () => {
    const error = new Error("failure");

    const sut = await rust.Result.of(Promise.reject(error));

    const response = sut.match({
      Ok: () => "success",
      Err: (err) => err,
    });

    expect(response).toBe(error);
  });

  it("should support resolved numeric values", async () => {
    const sut = await rust.Result.of(Promise.resolve(5));

    const response = sut.match({
      Ok: (value) => value + 5,
      Err: () => 0,
    });

    expect(response).toBe(10);
  });

  it("should treat resolved null as Err branch", async () => {
    const sut = await rust.Result.of(Promise.resolve(null));

    const response = sut.match({
      Ok: () => "success",
      Err: () => "empty",
    });

    expect(response).toBe("empty");
  });
});
