import * as java from "./exception";

describe("java:exception", () => {
  it("NullPointerException", async () => {
    expect(() => {
      throw new java.NullPointerException();
    }).throw(java.NullPointerException);
  });
});
