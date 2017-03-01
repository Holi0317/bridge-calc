import {lazy} from 'aurelia-framework'
import bind from 'autobind-decorator'
import {IDBStorageService} from './idb-storage-service';
import {Serializer} from './serializer';
import {StorageService, ISerializedWithID, ISerialized} from './interfaces';
import {
  GameBoardManager, GameBoardManagerEvents,
  CurrentGameChangedParam
} from '../services/game-board/game-board-manager';
import {GameBoardEvents} from '../services/game-board/game-board';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('StorageManager');

/**
 * Decide and use storage service depending on environment.
 * A high level service for interacting with storage.
 * Simply call subscribe method once and it will save all changes to storage device automatically on change.
 */
export class StorageManager {
  private _storage: StorageService;

  constructor(
    private _gameBoardManager: GameBoardManager,
    @lazy(IDBStorageService) _idb: () => IDBStorageService
  ) {
    // TODO Implement more storage engine and decide which to use.
    this._storage = _idb();
  }

  /**
   * Subscribe to changes emitted by GameBoard and save when there is a change.
   */
  subscribe() {
    this._gameBoardManager.on(GameBoardManagerEvents.CurrentGameChanged, this._currentGameChanged);
    this._currentGameChanged({
      oldValue: null,
      newValue: this._gameBoardManager.currentGame
    });
  }

  /**
   * Update event subscription to GameBoard object.
   * This can be used when a new game has started.
   * @private
   */
  @bind
  private _currentGameChanged(opt: CurrentGameChangedParam) {
    const currentGame = this._gameBoardManager.currentGame;
    if (currentGame) {
      currentGame.on(GameBoardEvents.Start, this.add);
    }
  }

  /**
   * Save current game to storage as a new game.
   * @returns {Promise<number>}
   */
  @bind
  async add(): Promise<number|null> {
    const currentGame = this._gameBoardManager.currentGame;
    if (!currentGame) {
      logger.warn('[add] No current game active in GameBoardManager! Saving aborted');
      return null
    }
    const serialized = Serializer.dump(currentGame);
    const id = await this._storage.addGame(serialized);
    return id;
  }

  /**
   * List all previous games.
   * @returns {Promise<ISerializedWithID[]>}
   */
  async getPrevGames(): Promise<Map<number, ISerialized>> {
    return await this._storage.getPrevGames();
  }
}
