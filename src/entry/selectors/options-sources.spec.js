import {optionsSourcesSelector} from './options-sources'

/**
 * Create part of redux tree for testing.
 */
function makeTree(rest) {
  return {
    ui: {
      entry: {
        cards: 52,
        rounds: 13,
        startingRound: 1,
        playerNames: ['John', 'Mary', 'Henry', 'Joe'],
        ...rest
      }
    }
  }
}

const defaultRound = [
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
  {value: 7, label: '7'},
  {value: 8, label: '8'},
  {value: 9, label: '9'},
  {value: 10, label: '10'},
  {value: 11, label: '11'},
  {value: 12, label: '12'},
  {value: 13, label: '13'}
]

const defaultSource = {
  cards: [
    {value: 52, label: '52'},
    {value: 104, label: '104'}
  ],
  rounds: defaultRound,
  startingRound: defaultRound
}

test('Default state should work', () => {
  const state = makeTree({})
  const expected = {
    ...defaultSource
  }
  const actual = optionsSourcesSelector(state)
  expect(actual).toEqual(expected)
})

test('Source should change according to player number', () => {
  const state = makeTree({
    rounds: 17,
    playerNames: ['John', 'Mary', 'Henry']
  })
  const rounds = [
    ...defaultRound,
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'}
  ]
  const expected = {
    ...defaultSource,
    rounds,
    startingRound: rounds
  }
  const actual = optionsSourcesSelector(state)
  expect(actual).toEqual(expected)
})

test('Sources should change according to card number', () => {
  const state = makeTree({
    rounds: 26,
    cards: 104
  })
  const rounds = [
    ...defaultRound,
    {value: 14, label: '14'},
    {value: 15, label: '15'},
    {value: 16, label: '16'},
    {value: 17, label: '17'},
    {value: 18, label: '18'},
    {value: 19, label: '19'},
    {value: 20, label: '20'},
    {value: 21, label: '21'},
    {value: 22, label: '22'},
    {value: 23, label: '23'},
    {value: 24, label: '24'},
    {value: 25, label: '25'},
    {value: 26, label: '26'}
  ]
  const expected = {
    ...defaultSource,
    rounds,
    startingRound: rounds
  }
  const actual = optionsSourcesSelector(state)
  expect(actual).toEqual(expected)
})

test('0 player should give 1 value in rounds and startingRound', () => {
  const state = makeTree({
    playerNames: []
  })
  const expected = {
    ...defaultSource,
    rounds: [{value: 1, label: '1'}],
    startingRound: [{value: 1, label: '1'}]
  }
  const actual = optionsSourcesSelector(state)
  expect(actual).toEqual(expected)
})

test('startingRound should decrease according to number of rounds', () => {
  const state = makeTree({
    rounds: 10
  })
  const startingRound = [
    {value: 1, label: '1'},
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'}
  ]
  const expected = {
    ...defaultSource,
    startingRound
  }
  const actual = optionsSourcesSelector(state)
  expect(actual).toEqual(expected)
})
