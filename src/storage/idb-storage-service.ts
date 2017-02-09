import Dexie from 'dexie';
import {GameState} from './game-state';
import {PlayerID} from './player';

export interface GameSchema {
  id?: number
  state: GameState
  startTime: Date
  endTime: Date | null
  /**
   * Index of current game in game meta array
   */
  currentGameIndex: number
}

export interface PlayerSchema {
  id?: number
  gameID?: number
  playerID: PlayerID
  name: string
  scoreboard: {
    bid: string | null
    win: string | null
    scores: Map<string, number>
  }
}

export interface MetaSchema {
  id?: number
  gameID?: number
  maker: PlayerID | null
  name: string
  cardPerPlayer: number
  isExtra: boolean
  playerOrder: PlayerID[]
  index: number  // index of the concat-ed array
}

class BridgeDatabase extends Dexie {

  public game: Dexie.Table<GameSchema, number>;
  public player: Dexie.Table<PlayerSchema, number>;
  public meta: Dexie.Table<MetaSchema, number>;

  constructor() {
    super('BridgeDatabase');
    this.version(1).stores({
      game: 'id++',
      player: 'id++,gameID,playerID',
      meta: 'id++,gameID'
    });
  }
}

export class IDBStorageService {
  constructor() {

  }
}
