import { optionsSourcesSelector } from "./options-sources";
import { makeEntryTree } from "../../../test-fixtures/entry-options";

const defaultRound = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
  { value: 11, label: "11" },
  { value: 12, label: "12" },
  { value: 13, label: "13" }
];

const defaultSource = {
  rounds: defaultRound,
  startingRound: defaultRound
};

test("Default state should work", () => {
  const state = makeEntryTree({});
  const expected = {
    ...defaultSource
  };
  const actual = optionsSourcesSelector(state);
  expect(actual).toEqual(expected);
});

test("Source should change according to player number", () => {
  const state = makeEntryTree({
    rounds: 17,
    playerNames: ["John", "Mary", "Henry"]
  });
  const rounds = [
    ...defaultRound,
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" }
  ];
  const expected = {
    ...defaultSource,
    rounds,
    startingRound: rounds
  };
  const actual = optionsSourcesSelector(state);
  expect(actual).toEqual(expected);
});

test("0 player should give 1 value in rounds and startingRound", () => {
  const state = makeEntryTree({
    playerNames: []
  });
  const expected = {
    ...defaultSource,
    rounds: [{ value: 1, label: "1" }],
    startingRound: [{ value: 1, label: "1" }]
  };
  const actual = optionsSourcesSelector(state);
  expect(actual).toEqual(expected);
});

test("startingRound should decrease according to number of rounds", () => {
  const state = makeEntryTree({
    rounds: 10
  });
  const startingRound = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
    { value: 6, label: "6" },
    { value: 7, label: "7" },
    { value: 8, label: "8" },
    { value: 9, label: "9" },
    { value: 10, label: "10" }
  ];
  const expected = {
    ...defaultSource,
    startingRound
  };
  const actual = optionsSourcesSelector(state);
  expect(actual).toEqual(expected);
});
