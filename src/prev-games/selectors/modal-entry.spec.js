import { modalEntrySelector } from "./modal-entry";

function makeTree(rest) {
  return {
    prevGames: {
      prevGames: [],
      modalEntry: null,
      ...rest
    }
  };
}

test("it should select null for no game entry specified", () => {
  const state = makeTree({});
  const expected = null;
  const actual = modalEntrySelector(state);
  expect(actual).toEqual(expected);
});

test("it should select correct entry for specified game entry", () => {
  const state = makeTree({
    prevGames: [1, 2, 3, 4, 5],
    modalEntry: 2
  });
  const expected = 3;
  const actual = modalEntrySelector(state);
  expect(actual).toEqual(expected);
});

test("it should select null for out-of-bound game entry index", () => {
  const state = makeTree({
    modalEntry: 2
  });
  const expected = null;
  const actual = modalEntrySelector(state);
  expect(actual).toEqual(expected);
});
