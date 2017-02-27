import Dexie from 'dexie';
import {GameSchema, StorageService, ISerialized, ISerializedWithID} from './interfaces';
import {getLogger} from 'aurelia-logging';
import {RecursivePartial} from '../utils';

const logger = getLogger('IDBStorageService');

export interface IDBGameSchema extends ISerialized {
  id?: number
}

/**
 * Create an iterator that return [GameID, SerializedData] array as set.
 * @param serializedData - Array of data to be proceed
 */
function* serializedToMap(serializedData: ISerializedWithID[]): IterableIterator<[number, ISerializedWithID]> {
  for (const data of serializedData) {
    yield [data.id, data]
  }
}

class BridgeDatabase extends Dexie {

  public game: Dexie.Table<IDBGameSchema, number>;

  constructor() {
    super('BridgeDatabase');
    this.version(1).stores({
      game: 'id++,game.startTime'
    });
  }
}

export class IDBStorageService implements StorageService {
  private db = new BridgeDatabase();

  constructor() {

  }

  async addGame(data: ISerialized): Promise<number> {
    const db = this.db;
    const ID = await db.game.add(data);
    logger.debug('addGame returned value:', ID);
    return ID;
  }

  async getPrevGames(): Promise<Map<number, ISerialized>> {
    const db = this.db;
    const result = (await db.game.orderBy('game.startTime').toArray()) as ISerializedWithID[];
    logger.debug('getPrevGames result:', result);

    // Create Map. Game ID -> ISerialized
    return new Map(serializedToMap(result));
  }

  async updateGame(gameID: number, data: RecursivePartial<GameSchema>): Promise<boolean> {
    const count = await this.db.game.where('id').equals(gameID).count();
    if (count == 0) {
      return false;
    }
    const result = await this.db.game.update(gameID, data);
    logger.debug('Update result:', result);
    return true;
  }

  async deleteGame(gameID: number): Promise<boolean> {
    const count = await this.db.game.where('id').equals(gameID).count();
    if (count == 0) {
      return false;
    }
    await this.db.game.delete(gameID);
    return true;
  }

}
