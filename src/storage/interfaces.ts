import {GameState} from '../services/game-state';
import {RecursivePartial} from '../utils';
import {TimerSchema} from '../services/timer-service';
import {MetaSchema} from '../services/game-meta-manager';
import {PlayerSchema} from '../services/player-manager';

export interface ISerialized {
  game: GameSchema
  players: PlayerSchema[]
  metas: MetaSchema[]
  timer: TimerSchema
}

export interface GameSchema {
  state: GameState
  /**
   * Index of current game in game meta array.
   * If null, all games have finished.
   */
  currentGameIndex: number | null
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
