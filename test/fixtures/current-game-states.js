import {gameStage} from '../../src/game-stage'

export const startParams = {
  rounds: 13,
  playerNames: {
    a: 'John',
    b: 'Mary',
    c: 'Henry',
    d: 'Joe'
  },
  startTime: new Date(0),
  startingRound: 1
}

export const baseGameState = {
  stage: null,
  rounds: 13,
  startTime: new Date(0),
  names: {
    a: 'John',
    b: 'Mary',
    c: 'Henry',
    d: 'Joe'
  },
  scores: {
    a: [],
    b: [],
    c: [],
    d: []
  }
}

export const waitingBidState = {
  ...baseGameState,
  stage: gameStage.waitingBid,
  currentPlayerOrder: ['a', 'b', 'c', 'd'],
  currentRound: 1,
  bid: {}
}

export const waitingWinState = {
  ...waitingBidState,
  stage: gameStage.waitingWin,
  win: {}
}

export const endedState = {
  ...baseGameState,
  stage: gameStage.ended,
  endTime: new Date(1)
}
