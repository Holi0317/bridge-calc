import {RecursivePartial} from '../utils'
import {ISerialized} from './schema'

/**
 * Standard interface for storage system.
 * All storage system implementation must implement this interface for consistency.
 */
export abstract class StorageService {
  /**
   * Add new game to storage.
   * @param data - Data of serialized game meta.
   * @returns ID of the saved game.
   */
  public abstract addGame(data: ISerialized): Promise<number>  // Return ID

  /**
   * Get all game saved into the storage.
   * @returns An array of all game saved.
   */
  public abstract getPrevGames(): Promise<Map<number, ISerialized>>

  /**
   * Update data for saved game.
   * @param gameID - ID of the game desired to update.
   * @param data - Partial data for update. I.E. Object.assign will be executed on saved data.
   */
  public abstract updateGame(gameID: number, data: RecursivePartial<ISerialized>): Promise<boolean>

  /**
   * Delete game from saved storage
   * @param gameID - ID of the game desired to be deleted
   */
  public abstract deleteGame(gameID: number): Promise<boolean>
}
