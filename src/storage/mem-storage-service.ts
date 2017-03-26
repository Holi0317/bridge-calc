import {getLogger} from 'aurelia-logging'
import {StorageService} from './abstract-storage-service'
import {ISerialized} from './schema'

const logger = getLogger('mem-storage-service')

export class MemStorageService extends StorageService {
  /**
   * The in-memory map for all data stored
   * Maps from game ID to serialized data
   */
  private db: Map<number, ISerialized> = new Map()
  /**
   * The index of last data in database
   */
  private lastIndex = -1

  public async addGame(data: ISerialized): Promise<number> {
    const index = ++this.lastIndex
    this.db.set(index, data)
    return index
  }

  public async getPrevGames(): Promise<Map<number, ISerialized>> {
    return this.db
  }

  public async updateGame(gameID: number, data: ISerialized): Promise<boolean> {
    const oldData = this.db.get(gameID)
    if (oldData == null) {
      return false
    }
    this.db.set(gameID, data)
    return true
  }

  public async deleteGame(gameID: number): Promise<boolean> {
    if (!this.db.has(gameID)) {
      return false
    }
    this.db.delete(gameID)
    return true
  }

}
