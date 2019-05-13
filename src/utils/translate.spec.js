import { tData, trans } from "./translate";

test("Empty options should return key directly", () => {
  const key = "To be translated";
  const expected = "To be translated";
  const actual = trans(key);
  expect(actual).toMatch(expected);
});

test("Empty object options should return key directly", () => {
  const key = "To be translated";
  const options = {};
  const expected = "To be translated";
  const actual = trans(key, options);
  expect(actual).toMatch(expected);
});

test("Template in key should be replaced", () => {
  const key = "{{time}} be trans{{suffix}}";
  const options = {
    time: "To",
    suffix: "lated"
  };
  const expected = "To be translated";
  const actual = trans(key, options);
  expect(actual).toMatch(expected);
});

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
