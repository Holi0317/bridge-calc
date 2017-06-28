import test from 'ava'
import {defaultOptions} from '../../../fixtures/entry-options'
import {defaultRound, defaultSource} from '../../../fixtures/entry-source'
import {entrySourceSelector} from '../../../../src/selectors/ui/entry/entry-source'

test('Default state should work', t => {
  const state = {
    ui: {
      entry: {
        ...defaultOptions
      }
    }
  }
  const expected = {
    ...defaultSource
  }
  const actual = entrySourceSelector(state)
  t.deepEqual(actual, expected, 'Default source should be selected')
})

test('Source should change according to player number', t => {
  const state = {
    ui: {
      entry: {
        ...defaultOptions,
        rounds: 17,
        playerNames: ['John', 'Mary', 'Henry']
      }
    }
  }
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
  const actual = entrySourceSelector(state)
  t.deepEqual(actual, expected, 'More rounds should be added')
})

test('Sources should change according to card number', t => {
  const state = {
    ui: {
      entry: {
        ...defaultOptions,
        rounds: 26,
        cards: 104
      }
    }
  }
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
  const actual = entrySourceSelector(state)
  t.deepEqual(actual, expected, 'More rounds should be added')
})

test('0 player should give 1 value in rounds and startingRound', t => {
  const state = {
    ui: {
      entry: {
        ...defaultOptions,
        playerNames: []
      }
    }
  }
  const expected = {
    ...defaultSource,
    rounds: [{value: 1, label: '1'}],
    startingRound: [{value: 1, label: '1'}]
  }
  const actual = entrySourceSelector(state)
  t.deepEqual(actual, expected, 'Source with 1 rounds should be selected')
})

test('startingRound should decrease according to number of rounds', t => {
  const state = {
    ui: {
      entry: {
        ...defaultOptions,
        rounds: 10
      }
    }
  }
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
  const actual = entrySourceSelector(state)
  t.deepEqual(actual, expected, 'startingRound should decrease according to rounds selected')
})
