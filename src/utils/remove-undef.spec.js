import { removeUndef } from "./remove-undef";

test("removeUndef should not mutate original object", () => {
  const obj = { a: undefined, b: "yo" };
  removeUndef(obj);
  const expected = { a: undefined, b: "yo" };
  expect(obj).toEqual(expected);
});

test("removeUndef should remove undefined properties", () => {
  const obj = { a: undefined, b: "yo" };
  const actual = removeUndef(obj);
  const expected = { b: "yo" };
  expect(actual).toEqual(expected);
});

test("removeUndef should remove null properties", () => {
  const obj = { a: null, b: "yo" };
  const actual = removeUndef(obj);
  const expected = { b: "yo" };
  expect(actual).toEqual(expected);
});

test("removeUndef should remove empty string properties", () => {
  const obj = { a: "", b: "yo" };
  const actual = removeUndef(obj);
  const expected = { b: "yo" };
  expect(actual).toEqual(expected);
});
