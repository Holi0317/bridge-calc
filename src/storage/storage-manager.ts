import {lazy} from 'aurelia-framework'
import {getLogger} from 'aurelia-logging'
import bind from 'autobind-decorator'
import {GameBoardEvents} from '../services/game-board/game-board'
import {
  GameBoardManager, GameBoardManagerEvents,
  ICurrentGameChangedParam
} from '../services/game-board/game-board-manager'
import {IDBStorageService} from './idb-storage-service'
import {ISerialized, ISerializedWithID, StorageService} from './interfaces'
import {Serializer} from './serializer'

const logger = getLogger('StorageManager')

/**
 * Decide and use storage service depending on environment.
 * A high level service for interacting with storage.
 * Simply call subscribe method once and it will save all changes to storage device automatically on change.
 */
export class StorageManager {
  private _storage: StorageService

  constructor(
    private _gameBoardManager: GameBoardManager,
    @lazy(IDBStorageService) _idb: () => IDBStorageService
  ) {
    // TODO Implement more storage engine and decide which to use.
    this._storage = _idb()
  }

  /**
   * Subscribe to changes emitted by GameBoard and save when there is a change.
   */
  public subscribe() {
    this._gameBoardManager.on(GameBoardManagerEvents.CurrentGameChanged, this._currentGameChanged)
    this._currentGameChanged({
      newValue: this._gameBoardManager.currentGame,
      oldValue: null
    })
  }

  /**
   * Save current game to storage as a new game.
   * @returns {Promise<number>}
   */
  @bind
  public async add(): Promise<number|null> {
    const currentGame = this._gameBoardManager.currentGame
    if (!currentGame) {
      logger.warn('[add] No current game active in GameBoardManager! Saving aborted')
      return null
    }
    const serialized = Serializer.dump(currentGame)
    const id = await this._storage.addGame(serialized)
    this._gameBoardManager.currentID = id
    return id
  }

  /**
   * List all previous games.
   * @returns {Promise<ISerializedWithID[]>}
   */
  public async getPrevGames(): Promise<Map<number, ISerialized>> {
    return await this._storage.getPrevGames()
  }

  /**
   * Update event subscription to GameBoard object.
   * This can be used when a new game has started.
   * @private
   */
  @bind
  private _currentGameChanged(opt: ICurrentGameChangedParam) {
    const currentGame = this._gameBoardManager.currentGame
    if (currentGame) {
      currentGame.on(GameBoardEvents.Start, this.add)
    } else {
      // TODO Save all data to DB service on game close
    }
  }
}
