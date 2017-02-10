import Dexie from 'dexie';
import {GameSchema, IStorageService, ISerialized, ISerializedWithID} from './interfaces';
import {getLogger} from 'aurelia-logging';
import {RecursivePartial} from '../utils';

const logger = getLogger('IDBStorageService');

export interface IDBGameSchema extends ISerialized {
  id?: number
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

export class IDBStorageService implements IStorageService {
  private db = new BridgeDatabase();

  constructor() {

  }

  async addGame(data: ISerialized): Promise<number> {
    const db = this.db;
    const ID = await db.game.add(data);
    logger.debug('addGame returned value:', ID);
    return ID;
  }

  async getPrevGames(): Promise<ISerializedWithID[]> {
    const db = this.db;
    const result = await db.game.orderBy('game.startTime').toArray();
    logger.debug('getPrevGames result:', result);
    return result.map(game => {
      if (!game.id) {
        // Should not happen
        logger.warn('Queried game does not have ID attribute.', game);
      }
      return {
        ...game,
        id: game.id || -1
      }
    });
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
