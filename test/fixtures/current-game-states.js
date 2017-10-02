import {GameStage} from '../../src/score-input/game-stage'
import {deepFreeze} from '../helpers/deep-freeze'

export function genMap(a, b, c, d) {
  return {a, b, c, d}
}

export const startParams = deepFreeze({
  rounds: 13,
  playerNames: genMap('John', 'Mary', 'Henry', 'Joe'),
  startTime: new Date(0),
  startingRound: 1
})

export const baseGameState = deepFreeze({
  stage: null,
  rounds: 13,
  startTime: new Date(0),
  names: genMap('John', 'Mary', 'Henry', 'Joe'),
  scores: genMap([], [], [], [])
})

export const waitingBidState = deepFreeze({
  ...baseGameState,
  stage: GameStage.waitingBid,
  currentPlayerOrder: ['a', 'b', 'c', 'd'],
  currentRound: 1,
  bid: genMap(0, 0, 0, 0)
})

export const waitingWinState = deepFreeze({
  ...waitingBidState,
  stage: GameStage.waitingWin,
  win: genMap(0, 0, 0, 0)
})

export const endedState = deepFreeze({
  ...baseGameState,
  stage: GameStage.ended,
  endTime: new Date(1)
})
