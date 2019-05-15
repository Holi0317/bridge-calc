import { tData } from "./translate";

describe("tData", () => {
  test("it should build object with key only if options is not provided", () => {
    const expected = { key: "To be continued" };
    const actual = tData("To be continued");
    expect(actual).toEqual(expected);
  });

  test("It should build key and options if both are provided", () => {
    const expected = {
      key: "Today is a {{weather}} day",
      options: { weather: "sunny" }
    };
    const actual = tData("Today is a {{weather}} day", { weather: "sunny" });
    expect(actual).toEqual(expected);
  });
});
