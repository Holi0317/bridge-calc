import { toFront } from "./to-front";

test("toFront should do no-op when frontIndex is 0", () => {
  const array = ["a", "b", "c"];
  const actual = toFront(array, 0);
  const expected = ["a", "b", "c"];

  expect(actual).toEqual(expected);
});

test("toFront should sort array according to frontIndex", () => {
  const array = ["a", "b", "c", "d", "e"];
  const actual = toFront(array, 2);
  const expected = ["c", "d", "e", "a", "b"];

  expect(actual).toEqual(expected);
});

test("toFront should throw error if frontIndex is out of boundary", () => {
  const array = ["a", "b", "c"];

  expect(() => toFront(array, 3)).toThrowError("frontIndex is out of boundary");
});
