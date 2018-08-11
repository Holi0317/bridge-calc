import { nth } from "./nth";

test("nth should work when given index is below array.length", () => {
  const array = ["a", "b", "c"];
  const actual = nth(array, 1);
  const expected = "b";

  expect(actual).toBe(expected);
});

test("nth should work when given index is larger than array.length", () => {
  const array = ["a", "b", "c"];
  const actual = nth(array, 10);
  const expected = "b";

  expect(actual).toBe(expected);
});
