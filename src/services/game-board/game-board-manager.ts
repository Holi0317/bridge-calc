import {EventEmitter} from 'events'
import {GameBoard, IStartOptions} from './game-board'

/**
 * Events that would be emitted by GameBoardManager. Use NodeJS EventEmitter API to listen these events.
 * @enum
 */
export class GameBoardManagerEvents {
  /**
   * Emit when reference to currentGame has changed.
   * When this is emitted, all work has done internally.
   * Do NOT use observer to observer currentGame property.
   * When this event is emitted, CurrentGameChangedParam would be supplied as paramater.
   * @see {ICurrentGameChangedParam}
   */
  public static CurrentGameChanged = Symbol('currentGameChanged')
}

export interface ICurrentGameChangedParam {
  oldValue: GameBoard | null
  newValue: GameBoard | null
}

/**
 * Manages access of game board.
 * This object will emit events. See GameBoardManagerEvents for details.
 * @see {GameBoardManagerEvents}
 */
export class GameBoardManager extends EventEmitter {
  public currentGame: GameBoard | null = null
  /**
   * Storage ID for current Game.
   * Meant to be used by StorageManager only.
   * @type {number|null}
   * @see {StorageManager}
   */
  public currentID: number | null = null

  /**
   * Initialize a new game.
   * See GameBoard.start for details on options object.
   * @param opts - Options to be passed into GameBoard object.
   * @see {GameBoard}
   */
  public start(opts: IStartOptions) {
    const newValue = new GameBoard()
    newValue.start(opts)
    this.assignGame(newValue)
  }

  /**
   * Dispose the current game.
   * Equivalent to assignGame(null)
   */
  public close() {
    this.assignGame(null)
  }

  /**
   * Set currentGame reference to given value.
   * @param newValue
   */
  public assignGame(newValue: GameBoard | null) {
    this.currentID = null
    const oldValue = this.currentGame
    this.currentGame = newValue
    this.emit(GameBoardManagerEvents.CurrentGameChanged, {
      oldValue,
      newValue
    })
  }
}
