import {IOldGameData, IOldPlayers, OldState} from './types'
import {PrevGameEntry} from '../prev-games/types'
import cuid from 'cuid'
import {IPlayerMap} from '../types'
import zipObject from 'lodash-es/zipObject'
import mapValues from 'lodash-es/mapValues'
import {GameStage} from '../score-input/game-stage'
import {toFront} from '../utils'
import {bidWinGenerator} from '../score-input/reducer/bid-win-generator'

interface IPlayerMaps {
  names: IPlayerMap<string>
  scores: IPlayerMap<number[]>
  bid: IPlayerMap<number | null>
  win: IPlayerMap<number | null>
}

/**
 * Migrate game state from v1.0.0 to new one.
 * This function may throw error (corrupted state?).
 * Use try-catch block when trying to convert.
 */
export function migrateOldState(oldState: IOldGameData): PrevGameEntry {
  if (oldState.state === OldState.notStarted) {
    throw new TypeError('[Migration] Old state is at notStarted state and cannot be migrated')
  }
  const playerProps = migratePlayers(oldState.players)
  const base = {
    id: cuid(),
    rounds: oldState.totalRounds,
    startTime: new Date().getTime(),
    names: playerProps.names,
    scores: playerProps.scores
  }

  const {state} = oldState
  const ids = Object.keys(playerProps.names)
  const currentPlayerOrder = toFront(ids, oldState.maker || 0)

  if (state === OldState.bid) {
    return {
      ...base,
      stage: GameStage.waitingBid,
      bid: playerProps.bid,
      currentPlayerOrder,
      currentRound: oldState.currentRound
    } as any // To suppress type error on some properties
  }

  if (state === OldState.inputWin) {
    return {
      ...base,
      stage: GameStage.waitingWin,
      bid: playerProps.bid,
      win: playerProps.win,
      currentPlayerOrder,
      currentRound: oldState.currentRound
    } as any // To suppress type error on some properties
  }

  if (state === OldState.waiting) {
    if (oldState.currentRound === oldState.totalRounds) {
      // Last round. Should return end game state
      return {
        ...base,
        stage: GameStage.ended,
        endTime: new Date().getTime()
      }
    }
    const maker = oldState.maker! + 1
    const order = toFront(ids, maker === ids.length ? 0 : maker)
    return {
      ...base,
      stage: GameStage.waitingBid,
      bid: bidWinGenerator(ids),
      currentRound: oldState.currentRound! + 1,
      currentPlayerOrder: order
    } as any
  }

  if (state === OldState.gameEnd) {
    return {
      ...base,
      stage: GameStage.ended,
      endTime: new Date().getTime()
    }
  }

  throw new Error('Convert of old game state failed. Unknown situation')
}

/**
 * Create names, scores, bid and win maps
 */
function migratePlayers(players: IOldPlayers[]): IPlayerMaps {
  const ids = players.map(cuid)
  const map = {
    names: 'name',
    scores: 'score',
    bid: 'bid',
    win: 'win'
  }
  const res = mapValues(map, (prop: keyof IOldPlayers) => (
    zipObject(ids, players.map(player => player[prop]))
  )) as any

  // Type convertion
  res.bid = numberize(res.bid)
  res.win = numberize(res.win)

  return res
}

export function numberize(obj: IPlayerMap<string | null>): IPlayerMap<number> {
  return mapValues(obj, b => b == null ? 0 : parseInt(b, 10))
}
