import { isArrayEqual } from "./is-array-equal";

test("it should pass for two empty arrays", () => {
  const a = [];
  const b = [];
  const expected = true;
  const actual = isArrayEqual(a, b);
  expect(actual).toEqual(expected);
});

test("it should pass for two identical arrays", () => {
  const a = ["Hydrogen", "Helium"];
  const b = ["Hydrogen", "Helium"];
  const expected = true;
  const actual = isArrayEqual(a, b);
  expect(actual).toEqual(expected);
});

test("it should fail for different arrays", () => {
  const a = ["Hydrogen", "Potassium"];
  const b = ["Hydrogen", "Potassium", "Gold"];
  const expected = false;
  const actual = isArrayEqual(a, b);
  expect(actual).toEqual(expected);
});

test("it should fail for different order in arrays", () => {
  const a = ["Hydrogen", "Helium"];
  const b = ["Helium", "Hydrogen"];
  const expected = false;
  const actual = isArrayEqual(a, b);
  expect(actual).toEqual(expected);
});
