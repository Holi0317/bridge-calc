import localforage from 'localforage'
import {ISerialized} from './schema'

const LAST_INDEX = 'LastIndex'
const GAME_PREFIX = 'game-'

export class StorageService {

  constructor(private localForage = localforage.createInstance({name: 'BridgeCalculator'})) {

  }

  /**
   * Add new game to storage.
   * @param data - Data of serialized game meta.
   * @returns ID of the saved game.
   */
  public async addGame(data: ISerialized): Promise<number> {
    const lastID = await this.localForage.getItem(LAST_INDEX) as number | null
    const ID = lastID == null ? 0 : lastID + 1
    await Promise.all([
      this.localForage.setItem(GAME_PREFIX + ID, data),
      this.localForage.setItem(LAST_INDEX, ID)
    ])
    return ID
  }

  /**
   * Get all game saved into the storage.
   * @returns An map of all game saved. Maps from ID to data saved
   */
  public async getPrevGames(): Promise<Map<number, ISerialized>> {
    const map = new Map<number, ISerialized>()
    await this.localForage.iterate((value: ISerialized, key: string) => {
      if (key.startsWith(GAME_PREFIX)) {
        const ID = parseInt(key.replace(GAME_PREFIX, ''), 10)
        map.set(ID, value)
      }
    })
    return map
  }

  /**
   * Update data for saved game.
   * @param gameID - ID of the game desired to update.
   * @param data - New data to be written into database.
   * @returns false if update fails (No such entry). True otherwise.
   */
  public async updateGame(gameID: number, data: ISerialized): Promise<boolean> {
    const key = GAME_PREFIX + gameID
    const keys = await this.localForage.keys()
    if (!keys.includes(key)) {
      return false
    }

    await this.localForage.setItem(key, data)
    return true
  }

  /**
   * Delete game from saved storage
   * @param gameID - ID of the game desired to be deleted
   * @returns false if delete fails (No such entry). True otherwise.
   */
  public async deleteGame(gameID: number): Promise<boolean> {
    const key = GAME_PREFIX + gameID
    const keys = await this.localForage.keys()
    if (!keys.includes(key)) {
      return false
    }
    await this.localForage.removeItem(key)
    return true
  }
}
