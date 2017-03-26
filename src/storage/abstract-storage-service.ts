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
  public abstract addGame(data: ISerialized): Promise<number>

  /**
   * Get all game saved into the storage.
   * @returns An array of all game saved.
   */
  public abstract getPrevGames(): Promise<Map<number, ISerialized>>

  /**
   * Update data for saved game.
   * @param gameID - ID of the game desired to update.
   * @param data - New data to be written into database.
   * @returns false if update fails (No such entry). True otherwise.
   */
  public abstract updateGame(gameID: number, data: ISerialized): Promise<boolean>

  /**
   * Delete game from saved storage
   * @param gameID - ID of the game desired to be deleted
   * @returns false if delete fails (No such entry). True otherwise.
   */
  public abstract deleteGame(gameID: number): Promise<boolean>
}
