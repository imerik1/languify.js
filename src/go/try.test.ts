import { go } from "./try";

describe("go:try", () => {
  it("returns a synchronous value without awaiting", () => {
    const [value, error] = go.try(() => "test");

    expect(value).toBe("test");
    expect(error).toBeNull();
  });

  it("returns a synchronous thrown error", () => {
    const expectedError = new Error("failure");
    const [value, error] = go.try(() => {
      throw expectedError;
    });

    expect(value).toBeNull();
    expect(error).toBe(expectedError);
  });

  it("awaits a resolved promise", async () => {
    const [value, error] = await go.try(async () => "test");

    expect(value).toBe("test");
    expect(error).toBeNull();
  });

  it("returns a rejected promise error", async () => {
    const expectedError = new Error("failure");
    const [value, error] = await go.try(() => Promise.reject(expectedError));

    expect(value).toBeNull();
    expect(error).toBe(expectedError);
  });
});
