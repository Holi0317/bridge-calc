import {newInstance} from 'aurelia-framework';
import {GameState} from '../game-state';
import {GameMetaManager} from '../game-meta-manager';
import {PlayerManager} from '../player-manager';
import {TimerService} from '../timer-service';
import {getLogger} from 'aurelia-logging';
import {EventEmitter} from 'events';
import {GameMeta} from '../game-meta';

const logger = getLogger('GameBoard');

export interface StartOptions {
  /**
   * Name of players
   */
  players: string[];
  /**
   * Number of poker cards available.
   * This is not used in GameService.start. It is used in UI only.
   */
  cards: number,
  /**
   * Number of rounds in the game.
   */
  rounds: number,
  /**
   * The starting round
   */
  startingRound: number
}

/**
 * Represent a bridge game. Contains controller logic.
 * This object will emit the following events. Use EventEmitter API to listen these events.
 *  - start - New game has started.
 *  - stateChanged - state of game controller has changed. This will emit AFTER all work for controller has completed.
 *  - end - Game has reached last round and ended.
 */
export class GameBoard extends EventEmitter {
  public state: GameState;
  public playerManager = new PlayerManager();
  public metaManager = new GameMetaManager(this.playerManager);
  public timer = new TimerService();

  constructor() {
    super();
  }

  /**
   * Start a new game.
   * @param opts - See StartOption interface for documentation.
   */
  start(opts: StartOptions) {
    logger.debug('Starting a new game with options:', opts);

    // Set state
    this.state = GameState.BID;

    // Player manager
    this.playerManager.reset();
    this.playerManager.addPlayer(opts.players, false); // Emit event here can cause bug as state is not prepared yet

    // Meta manager
    this.metaManager.initiateGames(opts.rounds);

    // Timer
    this.timer.startTimer();

    // Bootstrap first round metadata
    this._nextRound();

    // Skip rounds, if necessary
    for (let i = 1; i < opts.startingRound; i++) {
      this.skip();
    }

    // Emit event
    this.emit('start');
    this.emit('stateChanged');
    logger.debug('Startup finished. GameBoard:', this);
  }

  /**
   * End Bid process.
   * WARNING: no type/value checking will be done here.
   */
  bid() {
    if (this.metaManager.currentGame == null || this.state === GameState.NOT_STARTED) {
      logger.warn('[bid] No game is started and bid is called');
      return;
    }
    this.state = GameState.WIN;
    this.emit('stateChanged');
  }

  /**
   * End Win process and proceed to next round.
   * WARNING: no type/value checking will be done here.
   */
  win() {
    if (this.metaManager.currentGame == null || this.state === GameState.NOT_STARTED) {
      logger.warn('[win] No game is started and win is called');
      return;
    }
    this.playerManager.calcAllScore(this.metaManager.currentGame.name);
    this._nextRound();
    if (this.state === GameState.GAME_END) {
      this.emit('end');
    }
    this.emit('stateChanged');
  }

  /**
   * Skip the current round of game.
   * All players will receive 0 mark for this round.
   * @throws Error - game state is not started or ended.
   */
  skip() {
    if (this.state === GameState.NOT_STARTED || this.state === GameState.GAME_END) {
      throw new Error('[skip] Game is not started or ended');
    }
    // Set all player's score to 0
    // We don't use playerManager.calcAllScore here as it will emit a event, which is not the desired result.
    for (const player of this.playerManager.players) {
      player.scoreboard.calcScore(this.metaManager.currentGame!.name, null, null);
    }
    this.playerManager.updateRank();
    this._nextRound();
  }

  /**
   * Proceed to next round.
   * Prepare states for fulfilling needs of next round.
   */
  private _nextRound() {
    if (this.metaManager.next()) {
      // Have next round
      this.state = GameState.BID;
    } else {
      // Last round has just ended
      this.state = GameState.GAME_END;
      this.timer.endTimer();
    }
  }

  /**
   * Roll back to previous action.
   * Only available when state is GameState.WIN
   */
  revert() {
    if (this.state === GameState.WIN) {
      this.state = GameState.BID;
      // Reset win state
      for (const player of this.playerManager.players) {
        player.scoreboard.win = null;
      }
      this.emit('stateChanged');
    } else {
      logger.warn('[revert] Revert is called when state is not at WIN.');
    }
  }
}
