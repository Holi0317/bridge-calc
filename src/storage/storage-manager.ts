import {autoinject} from 'aurelia-dependency-injection'
import {getLogger} from 'aurelia-logging'
import bind from 'autobind-decorator'
import {
  GameBoardManager, GameBoardManagerEvents,
  ICurrentGameChangedParam
} from '../services/game-board/game-board-manager'
import {StorageService} from './storage-service'

const logger = getLogger('StorageManager')

/**
 * Decide and use storage service depending on environment.
 * A high level service for interacting with storage.
 * Simply call subscribe method once and it will save all changes to storage device automatically on change.
 * @see {StorageManager.subscribe}
 */
@autoinject
export class StorageManager {
  constructor(private _gameBoardManager: GameBoardManager, private _storageService: StorageService) {

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
   * Update event subscription to GameBoard object.
   * This can be used when a new game has started.
   * @private
   */
  @bind
  private _currentGameChanged(opt: ICurrentGameChangedParam) {
    // TODO implement watch magic
  }
}
