import {trans} from '../../utils/translate'
import {stackInputValidator as validator, isStackInputValid, stackInputValidatorWithProps} from './stack-input-validator'
import {GameStage} from '../game-stage'

function genMap(a, b, c, d) {
  return {a, b, c, d}
}

/**
 * Create part of redux store tree for testing validator.
 * See implementation for details.
 * @param {Object} rest Remaining properties to be added to return state
 * @returns {Object} Part of redux store tree for consumption
 */
function makeTree(rest) {
  return {
    currentGame: {
      stage: GameStage.waitingBid,
      rounds: 13,
      startTime: new Date(0),
      names: genMap('John', 'Mary', 'Henry', 'Joe'),
      scores: genMap([], [], [], []),
      currentRound: 1,
      currentPlayerOrder: ['a', 'b', 'c', 'd'],
      ...rest
    }
  }
}

test('Empty value should pass validation', () => {
  const state = makeTree({})
  const actual = validator(state, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('Correct value should pass validation', () => {
  const state = makeTree({
    bid: genMap(0, 0, 0, 0),
    win: genMap(1, 0, 0, 0),
    stage: GameStage.waitingWin
  })
  const actual = validator(state, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should fail when sum of bid equals to current round number', () => {
  const state = makeTree({
    bid: genMap(0, 1, 0, 0)
  })
  const actual = validator(state, trans)
  const expected = {
    bid: {d: 'Cannot choose that'}
  }
  expect(actual).toEqual(expected)
})

test('validator should fail on win when sum of stacks is smaller than current round number', () => {
  const state = makeTree({
    win: genMap(0, 0, 0, 0),
    stage: GameStage.waitingWin
  })
  const actual = validator(state, trans)
  const msg = 'Too less stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should fail on win stacks that exceed current round number', () => {
  const state = makeTree({
    win: genMap(1, 1, 0, 0),
    stage: GameStage.waitingWin
  })
  const actual = validator(state, trans)
  const msg = 'Too many stacks'
  const expected = {
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should fail both bid and win when both of them have error data', () => {
  const state = makeTree({
    bid: genMap(0, 0, 1, 0),
    win: genMap(1, 0, 0, 1),
    stage: GameStage.waitingWin
  })
  const actual = validator(state, trans)
  const msg = 'Too many stacks'
  const expected = {
    bid: {d: 'Cannot choose that'},
    win: genMap(msg, msg, msg, msg)
  }
  expect(actual).toEqual(expected)
})

test('validator should pass on empty bid object', () => {
  const state = makeTree({
    bid: {}
  })
  const actual = validator(state, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('validator should pass on empty win object', () => {
  const state = makeTree({
    win: {},
    stage: GameStage.waitingWin
  })
  const actual = validator(state, trans)
  const expected = {}
  expect(actual).toEqual(expected)
})

test('null currentGame should be considered as no error', () => {
  const state = {
    currentGame: null
  }
  const expected = {}
  const actual = validator(state, trans)
  expect(actual).toEqual(expected)
})

test('Ended currentGame should be considered as no error', () => {
  const state = makeTree({
    stage: GameStage.ended,
    rounds: 13,
    startTime: new Date(0),
    names: genMap('John', 'Mary', 'Henry', 'Joe'),
    scores: genMap([], [], [], []),
    endTime: new Date(1)
  })
  const expected = {}
  const actual = validator(state, trans)
  expect(actual).toEqual(expected)
})

test('is valid should be true for default state', () => {
  const state = makeTree({})
  const expected = true
  const actual = isStackInputValid(state, trans)
  expect(actual).toEqual(expected)
})

test('is valid should be false for erroneous state', () => {
  const state = makeTree({
    bid: genMap(0, 1, 0, 0)
  })
  const expected = false
  const actual = isStackInputValid(state, trans)
  expect(actual).toEqual(expected)
})

test('with props should include empty object for no error props', () => {
  const expected = {
    bid: {},
    win: {}
  }
  const state = {
    currentGame: null
  }
  const actual = stackInputValidatorWithProps(state, trans)
  expect(actual).toEqual(expected)
})
