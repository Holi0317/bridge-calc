import {GameState} from '../services/game-board/game-state'
import {PlayerID} from '../services/game-board/player'

/**
 * Serialized data for storage.
 * All serialized data must be composed of JavaScript primitive with plain Object and Array.
 */
export interface ISerialized {
  gameBoard: IGameBoardSchema
  players: IPlayerManagerSchema
  metas: IMetaManagerSchema
  timer: ITimerSchema
}

export interface ISerializedWithID extends ISerialized {
  id: number
}

export interface IGameBoardSchema {
  state: GameState
}

export interface IPlayerManagerSchema {
  players: IPlayerSchema[]
  currentPlayerIndex: number
}

export interface IPlayerSchema {
  ID: PlayerID
  name: string
  scoreboard: IScoreboardSchema
}

export interface IScoreboardSchema {
  bid: string | null
  win: string | null
  scores: Array<[string, number]>  // result of Array.from(Map<string, number>)
}

export interface IMetaManagerSchema {
  currentIndex: number
  metas: IMetaSchema[]
}

export interface IMetaSchema {
  maker: PlayerID | null
  name: string
  cardPerPlayer: number | null
  isExtra: boolean
  playerOrder: PlayerID[]
}

export interface ITimerSchema {
  startTime: number | null
  endTime: number | null
}
