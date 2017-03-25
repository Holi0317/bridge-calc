import test from 'tape'
import {entryOptionsValidator as validator} from '../../src/validators/entry-options'

function getDefaultOptions() {
  return {
    cards: '52',
    rounds: '13',
    startingRound: '1',
    playerLength: 4
  }
}

function getDefaultResult() {
  return {
    cards: '',
    rounds: '',
    startingRound: '',
  }
}

test('validator should pass on default options', t => {
  const options = getDefaultOptions()
  const actual = validator(options)
  const expected = getDefaultResult()

  t.assert(actual.ok, 'Validation should pass')
  t.deepEqual(actual.err, expected, 'No error on default options')
  t.end()
})

test('validator should fail if cards is negative', t => {
  const options = getDefaultOptions()
  options.cards = '-1'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.cards, 'Card must be a positive integer', 'Card property should include an error message')
  t.end()
})

test('validator should fail if cards is a float', t => {
  const options = getDefaultOptions()
  options.cards = '0.5'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.cards, 'Card must be a positive integer', 'Card property should include an error message')
  t.end()
})

test('validator should fail if rounds is negative', t => {
  const options = getDefaultOptions()
  options.rounds = '-1'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.rounds, 'Rounds must be a positive integer', 'Rounds property should include an error message')
  t.end()
})

test('validator should fail if rounds is a float', t => {
  const options = getDefaultOptions()
  options.rounds = '0.5'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.rounds, 'Rounds must be a positive integer', 'Rounds property should include an error message')
  t.end()
})

test('validator should fail if startingRound is negative', t => {
  const options = getDefaultOptions()
  options.startingRound = '-1'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.startingRound, 'Starting round must be a positive integer', 'Starting round property should include an error message')
  t.end()
})

test('validator should fail if startingRound is a float', t => {
  const options = getDefaultOptions()
  options.startingRound = '0.5'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.startingRound, 'Starting round must be a positive integer', 'Starting round property should include an error message')
  t.end()
})

test('validator should pass for minimum round requirement', t => {
  const options = getDefaultOptions()
  options.cards = '4'
  options.rounds = '1'
  const actual = validator(options)
  const expected = getDefaultResult()

  t.assert(actual.ok, 'Validation should pass')
  t.deepEqual(actual.err, expected, 'No error in result')
  t.end()
})

test('validator should fail when cards is less than player length', t => {
  const options = getDefaultOptions()
  options.cards = '3'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.cards, 'Too few cards', 'Cards property should include an error message')
  t.end()
})

test('validator should fail when number of cards is not enough for games', t => {
  const options = getDefaultOptions()
  options.rounds = '14'
  const actual = validator(options)

  t.assert(!actual.ok, 'Validation should fail')
  t.equal(actual.err.rounds, 'Insufficient cards for that much rounds', 'Rounds property should include an error message')
  t.end()
})

test('validator should fail when starting round is out of bound', t => {
  const options = getDefaultOptions()
  options.startingRound = '14'
  const actual = validator(options)
  const expected = getDefaultResult()
  expected.startingRound = 'Impossible to start beyond the end of the game'

  t.assert(!actual.ok, 'Validation should fail')
  t.deepEqual(actual.err, expected, 'startingRound should include an error message')
  t.end()
})
