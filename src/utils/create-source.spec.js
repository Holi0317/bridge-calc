import { createSource } from "./create-source";

test("createSource should create source according to input", () => {
  const values = [1, 2, 3];
  const expected = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 }
  ];
  const actual = createSource(values);
  expect(actual).toEqual(expected);
});
