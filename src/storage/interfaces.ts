import {GameState} from '../services/game-state';
import {RecursivePartial} from '../utils';
import {TimerSchema} from '../services/timer-service';
import {PlayerSchema} from '../services/player';
import {MetaSchema} from '../services/game-meta';

/**
 * Serialized data for storage.
 * All serialized data must be composed of JavaScript primitive with plain Object and Array.
 */
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

/**
 * Standard interface for storage system.
 * All storage system implementation must implement this interface for consistency.
 */
export interface IStorageService {
  /**
   * Add new game to storage.
   * @param data - Data of serialized game meta.
   * @returns ID of the saved game.
   */
  addGame(data: ISerialized): Promise<number>  // Return ID

  /**
   * Get all game saved into the storage.
   * @returns An array of all game saved.
   */
  getPrevGames(): Promise<ISerializedWithID[]>

  /**
   * Update data for saved game.
   * @param gameID - ID of the game desired to update.
   * @param data - Partial data for update. I.E. Object.assign will be executed on saved data.
   */
  updateGame(gameID: number, data: RecursivePartial<GameSchema>): Promise<boolean>

  /**
   * Delete game from saved storage
   * @param gameID - ID of the game desired to be deleted
   */
  deleteGame(gameID: number): Promise<boolean>
}
