import test from 'ava'
import {entryOptionsValidator as validator, isInteger} from '../src/validators/entry-options'

const defaultOptions = {
  cards: 52,
  rounds: 13,
  startingRound: 1,
  playerNames: ['John', 'Mary', 'Henry', 'Joe']
}

test('isInteger should pass if given string is an integer', t => {
  const actual = isInteger('10')
  t.true(actual, 'Test should pass on integer')
})

test('isInteger should fail if given a float', t => {
  const actual = isInteger('5.5')
  t.false(actual, 'Test should fail on float')
})

test('isInteger should fail if given a negative', t => {
  const actual = isInteger('-10')
  t.false(actual, 'Test should fail on negative number')
})

test('isInteger should fail if given 0', t => {
  const actual = isInteger('0')
  t.false(actual, 'Test should fail on 0')
})

test('isInteger should fail if the first char is 0', t => {
  const actual = isInteger('05')
  t.false(actual, 'Test should fail on 05')
})

test('isInteger should fail if there is non-number character passed in', t => {
  const actual = isInteger('8e')
  t.false(actual, 'Test should fail on scientific notation')
})

test('isInteger should fail on non-number argument', t => {
  const actual = isInteger('aaa')
  t.false(actual, 'Test should fail on aaa')
})

test('isInteger should pass on empty string', t => {
  const actual = isInteger('')
  t.true(actual, 'Empty string should pass')
})

test('validation should pass with default options', t => {
  const options = {
    ...defaultOptions
  }
  const actual = validator(options)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('validator should fail if cards is negative', t => {
  const options = {
    ...defaultOptions,
    cards: -1
  }
  const actual = validator(options)
  const expected = {
    cards: 'Card must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Card property should include an error message')
})

test('validator should fail if cards is a float', t => {
  const options = {
    ...defaultOptions,
    cards: 0.5
  }
  const actual = validator(options)
  const expected = {
    cards: 'Card must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Card property should include an error message')
})

test('validator should fail if rounds is negative', t => {
  const options = {
    ...defaultOptions,
    rounds: -1
  }
  const actual = validator(options)
  const expected = {
    rounds: 'Rounds must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Rounds property should include an error message')
})

test('validator should fail if rounds is a float', t => {
  const options = {
    ...defaultOptions,
    rounds: 0.5
  }
  const actual = validator(options)
  const expected = {
    rounds: 'Rounds must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Rounds property should include an error message')
})

test('validator should fail if startingRound is negative', t => {
  const options = {
    ...defaultOptions,
    startingRound: -1
  }
  const actual = validator(options)
  const expected = {
    startingRound: 'Starting round must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Starting round property should include an error message')
})

test('validator should fail if startingRound is a float', t => {
  const options = {
    ...defaultOptions,
    startingRound: 0.5
  }
  const actual = validator(options)
  const expected = {
    startingRound: 'Starting round must be a positive integer'
  }
  t.deepEqual(actual, expected, 'Starting round property should include an error message')
})

test('validator should pass for minimum round requirement', t => {
  const options = {
    ...defaultOptions,
    cards: 4,
    rounds: 1
  }
  const actual = validator(options)
  const expected = {}
  t.deepEqual(actual, expected, 'No error should exist')
})

test('validator should fail when cards is less than player length', t => {
  const options = {
    ...defaultOptions,
    cards: 3
  }
  const actual = validator(options)
  const expected = {
    cards: 'Too few cards',
    rounds: 'Insufficient cards for that much rounds'
  }
  t.deepEqual(actual, expected, 'Cards and rounds property should include an error message')
})

test('validator should fail when number of cards is not enough for games', t => {
  const options = {
    ...defaultOptions,
    rounds: 14
  }
  const actual = validator(options)
  const expected = {
    rounds: 'Insufficient cards for that much rounds'
  }
  t.deepEqual(actual, expected, 'Rounds property should include an error message')
})

test('validator should fail when starting round is out of bound', t => {
  const options = {
    ...defaultOptions,
    startingRound: 14
  }
  const actual = validator(options)
  const expected = {
    startingRound: 'Impossible to start beyond the end of the game'
  }
  t.deepEqual(actual, expected, 'startingRound should include an error message')
})

test('validator should fail when there is no player', t => {
  const options = {
    ...defaultOptions,
    playerNames: []
  }
  const actual = validator(options)
  const expected = {
    playerNames: 'At least 2 players is required for a game'
  }
  t.deepEqual(actual, expected, 'playerNames should include an error message')
})

test('validator should fail when there is only 1 player', t => {
  const options = {
    ...defaultOptions,
    playerNames: ['DPGJW']
  }
  const actual = validator(options)
  const expected = {
    playerNames: 'At least 2 players is required for a game'
  }
  t.deepEqual(actual, expected, 'playerNames should include an error message')
})
