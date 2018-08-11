import { isOk } from "./is-ok";

test("isOK should return true when empty object is passed in", () => {
  const actual = isOk({});
  const expected = true;
  expect(actual).toBe(expected);
});

test("isOk should fail if non-empty plain object is passed in", () => {
  const actual = isOk({ foo: "Not filled in" });
  const expected = false;
  expect(actual).toBe(expected);
});

test("isOk should pass if value is undefined", () => {
  const opt = { a: undefined };
  const actual = isOk(opt);
  const expected = true;
  expect(actual).toBe(expected);
});
