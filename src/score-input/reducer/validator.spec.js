import {isEndedState, isGameState, isWaitingBidState, isWaitingWinState} from './validator'
import {endedState, genMap, waitingBidState, waitingWinState} from '../../../test-fixtures/current-game-states'

describe('isGameState', () => {
  test('it should pass for null', () => {
    const state = null
    const expected = true
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingBidState', () => {
    const state = waitingBidState
    const expected = true
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingWinState', () => {
    const state = waitingWinState
    const expected = true
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for endedState', () => {
    const state = endedState
    const expected = true
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for empty object', () => {
    const state = {}
    const expected = false
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for missing field', () => {
    const state = {
      ...waitingBidState
    }
    delete state.id
    const expected = false
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for excess property', () => {
    const state = {
      ...endedState,
      currentPlayerOrder: ['a', 'b', 'c', 'd']
    }
    const expected = false
    const actual = isGameState(state)
    expect(actual).toEqual(expected)
  })
})

describe('isWaitingBidState', () => {
  test('it should fail for null', () => {
    const state = null
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingBidState', () => {
    const state = waitingBidState
    const expected = true
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingBidState in round 2', () => {
    const state = {
      ...waitingBidState,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ['b', 'c', 'd', 'a'],
      currentRound: 2
    }
    const expected = true
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for waitingWinState', () => {
    const state = waitingWinState
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for empty object', () => {
    const state = {}
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for missing field', () => {
    const state = {
      ...waitingBidState
    }
    delete state.bid
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for excess property', () => {
    const state = {
      ...waitingBidState,
      endTime: 10
    }
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type', () => {
    const state = {
      ...waitingBidState,
      currentRound: '10'
    }
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type in IPlayerMap', () => {
    const state = {
      ...waitingBidState,
      scores: genMap(['10'], ['-1'], ['11'], ['10'])
    }
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail if key of IPlayerMap is not string', () => {
    const state = {
      ...waitingBidState,
      bid: {
        33: 0,
        42: 0,
        38: 0,
        68: 0
      }
    }
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for inconsistent player IDs in fields', () => {
    const state = {
      ...waitingBidState,
      names: {
        '3e8': 'John',
        '1.6e-19': 'Mary',
        '6.63e-34': 'Henry',
        '9.81': 'Joe'
      }
    }
    const expected = false
    const actual = isWaitingBidState(state)
    expect(actual).toEqual(expected)
  })
})

describe('isWaitingWinState', () => {
  test('it should fail for null', () => {
    const state = null
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingWinState', () => {
    const state = waitingWinState
    const expected = true
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for waitingWinState in round 2', () => {
    const state = {
      ...waitingWinState,
      currentRound: 2,
      scores: genMap([0], [0], [0], [0]),
      currentPlayerOrder: ['b', 'c', 'd', 'a']
    }
    const expected = true
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for waitingBidState', () => {
    const state = waitingBidState
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for empty object', () => {
    const state = {}
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for missing field', () => {
    const state = {
      ...waitingWinState
    }
    delete state.win
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for excess property', () => {
    const state = {
      ...waitingWinState,
      endTime: 10
    }
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type', () => {
    const state = {
      ...waitingWinState,
      currentRound: '10'
    }
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type in IPlayerMap', () => {
    const state = {
      ...waitingWinState,
      scores: genMap(['10'], ['-1'], ['11'], ['10'])
    }
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail if key of IPlayerMap is not string', () => {
    const state = {
      ...waitingWinState,
      bid: {
        33: 0,
        42: 0,
        38: 0,
        68: 0
      }
    }
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for inconsistent player IDs in fields', () => {
    const state = {
      ...waitingWinState,
      names: {
        '3e8': 'John',
        '1.6e-19': 'Mary',
        '6.63e-34': 'Henry',
        '9.81': 'Joe'
      }
    }
    const expected = false
    const actual = isWaitingWinState(state)
    expect(actual).toEqual(expected)
  })
})

describe('isEndedState', () => {
  test('it should fail for null', () => {
    const state = null
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should pass for endedState', () => {
    const state = endedState
    const expected = true
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for waitingBidState', () => {
    const state = waitingBidState
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for empty object', () => {
    const state = {}
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for missing field', () => {
    const state = {
      ...endedState
    }
    delete state.endTime
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for excess property', () => {
    const state = {
      ...endedState,
      currentPlayerOrder: ['b', 'c', 'd', 'a']
    }
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type', () => {
    const state = {
      ...endedState,
      endTime: new Date(0)
    }
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for unmatched type in IPlayerMap', () => {
    const state = {
      ...endedState,
      scores: genMap(['10'], ['-1'], ['11'], ['10'])
    }
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail if key of IPlayerMap is not string', () => {
    const state = {
      ...endedState,
      names: {
        33: 'John',
        42: 'Helium',
        38: 'Lithium',
        68: 'Potassium'
      }
    }
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })

  test('it should fail for inconsistent player IDs in fields', () => {
    const state = {
      ...endedState,
      names: {
        '3e8': 'John',
        '1.6e-19': 'Mary',
        '6.63e-34': 'Henry',
        '9.81': 'Joe'
      }
    }
    const expected = false
    const actual = isEndedState(state)
    expect(actual).toEqual(expected)
  })
})
