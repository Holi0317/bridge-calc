import {GameBoard, StartOptions} from './game-board';
import {EventEmitter} from 'events';

/**
 * Events that would be emitted by GameBoardManager. Use NodeJS EventEmitter API to listen these events.
 * @enum
 */
export const GameBoardManagerEvents = {
  /**
   * Emit when reference to currentGame has changed.
   * When this is emitted, all work has done internally.
   * Do NOT use observer to observer currentGame property.
   * When this event is emitted, CurrentGameChangedParam would be supplied as paramater.
   * @see {CurrentGameChangedParam}
   */
  CurrentGameChanged: 'currentGameChanged'
};

export interface CurrentGameChangedParam {
  oldValue: GameBoard | null
  newValue: GameBoard | null
}

/**
 * Manages access of game board.
 * This object will emit events. See GameBoardManagerEvents for details.
 * @see {GameBoardManagerEvents}
 */
export class GameBoardManager extends EventEmitter {
  public currentGame: GameBoard | null = null;
  /**
   * Storage ID for current Game.
   * Meant to be used by StorageManager only.
   * @type {number|null}
   * @see {StorageManager}
   */
  public currentID: number | null = null;

  constructor() {
    super();
  }

  /**
   * Initialize a new game.
   * See GameBoard.start for details on options object.
   * @param opts - Options to be passed into GameBoard object.
   * @see {GameBoard}
   */
  start(opts: StartOptions) {
    const newValue = new GameBoard();
    newValue.start(opts);
    this.assignGame(newValue);
  }

  /**
   * Dispose the current game.
   * Equivalent to assignGame(null)
   */
  close() {
    this.assignGame(null);
  }

  /**
   * Set currentGame reference to given value.
   * @param newValue
   */
  assignGame(newValue: GameBoard | null) {
    this.currentID = null;
    const oldValue = this.currentGame;
    this.currentGame = newValue;
    this.emit(GameBoardManagerEvents.CurrentGameChanged, {
      oldValue,
      newValue
    });
  }
}
