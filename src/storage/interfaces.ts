import {GameState} from '../services/game-state';
import {PlayerID} from '../services/player';
import {RecursivePartial} from '../utils';

export interface ISerialized {
  game: GameSchema
  players: PlayerSchema[]
  metas: MetaSchema[]
  timer: TimeSchema
}

export interface GameSchema {
  state: GameState
  /**
   * Index of current game in game meta array
   */
  currentGameIndex: number | null
}

export interface PlayerSchema {
  ID: PlayerID
  name: string
  scoreboard: {
    bid: string | null
    win: string | null
    scores: [string, number][]  // result of Array.from(Map<string, number>)
  }
}

export interface MetaSchema {
  maker: PlayerID | null
  name: string
  cardPerPlayer: number | null
  isExtra: boolean
  playerOrder: PlayerID[]
}

export interface TimeSchema {
  startTime: number | null
  endTime: number | null
}

export interface ISerializedWithID extends ISerialized {
  id: number
}

export interface IStorageService {
  // Create
  addGame(data: ISerialized): Promise<number>  // Return ID

  // Retrieve
  getPrevGames(): Promise<ISerializedWithID[]>

  // Update
  updateGame(gameID: number, data: RecursivePartial<GameSchema>): Promise<boolean>

  // Delete
  deleteGame(gameID: number): Promise<boolean>
}
