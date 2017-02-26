import {GameBoard} from './game-board';
import {EventEmitter} from 'events';

/**
 * Manages access of game board.
 * This service will emit the following events. Use EventEmitter API to listen these events.
 *  - currentGameChanged - Reference to current game has changed to another one.
 */
export class GameBoardManager extends EventEmitter {
  public currentGame: GameBoard | null = null;
}
