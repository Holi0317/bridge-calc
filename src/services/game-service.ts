import {autoinject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameState} from './game-state';
import {PlayerManager} from './player-manager';
import {GameMetaManager} from './game-meta-manager';

const logger = getLogger('GameService');

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
 * Game controller logic.
 * This service will emit the following events in EventAggregator from aurelia:
 *  - gameService.start - New game has started.
 *  - gameService.stateChanged - state of game controller has changed. This will emit AFTER all work for controller has completed.
 *  - gameService.end - Game has reached last round and ended.
 */
@autoinject()
export class GameService {
  /**
   * Starting time of game
   */
  public startTime: Date | null = null;
  /**
   * Ending time of game
   */
  public endTime: Date | null = null;
  /**
   * Current state of game. NOTE: Type should be GameState.
   */
  public state = GameState.NOT_STARTED;

  constructor(
    private _playerManager: PlayerManager,
    private _gameMetaManager: GameMetaManager,
    private _ea: EventAggregator
  ) {

  }

  /**
   * Start a new game.
   * @param opts - See StartOption interface for documentation.
   */
  start(opts: StartOptions) {
    logger.debug('Starting a new game with options:', opts);
    // Set const properties
    this.startTime = new Date();
    this.state = GameState.BID;

    // Player manager
    this._playerManager.reset();
    this._playerManager.addPlayer(opts.players);

    // Meta manager
    this._gameMetaManager.initiateGames(opts.rounds);

    // Bootstrap first round metadata
    this._nextRound();

    // Skip rounds, if necessary
    for (let i = 1; i < opts.startingRound; i++) {
      this.skip();
    }

    // Emit event
    this._ea.publish('gameService.start');
    this._ea.publish('gameService.stateChanged');
    logger.debug('Startup finished. GameService:', this);
  }

  /**
   * End Bid process.
   * WARNING: no type/value checking will be done here.
   */
  bid() {
    if (this._gameMetaManager.currentGame == null || this.state === GameState.NOT_STARTED) {
      logger.warn('No game is started and bid is called');
      return;
    }
    this.state = GameState.WIN;
    this._ea.publish('gameService.stateChanged');
  }

  /**
   * End Win process and proceed to next round.
   * WARNING: no type/value checking will be done here.
   */
  win() {
    if (this._gameMetaManager.currentGame == null || this.state === GameState.NOT_STARTED) {
      logger.warn('No game is started and win is called');
      return;
    }
    this._playerManager.calcAllScore(this._gameMetaManager.currentGame.name);
    this._nextRound();
    if (this.state === GameState.GAME_END) {
      this._ea.publish('gameService.end');
    }
    this._ea.publish('gameService.stateChanged');
  }

  /**
   * Skip the current round of game.
   * All players will receive 0 mark for this round.
   * @throws Error - game state is not started or ended.
   */
  skip() {
    if (this.state === GameState.NOT_STARTED || this.state === GameState.GAME_END) {
      throw new Error('[GameService.skip] Game is not started or ended')
    }
    // Set all player's score to 0
    for (const player of this._playerManager.players) {
      player.scoreboard.calcScore(this._gameMetaManager.currentGame!.name, null, null);
    }
    this._nextRound();
  }

  /**
   * Proceed to next round.
   * Prepare states for fulfilling needs of next round.
   */
  private _nextRound() {
    if (this._gameMetaManager.next()) {
      // Have next round
      this.state = GameState.BID;
    } else {
      // Last round has just ended
      this.state = GameState.GAME_END;
      this.endTime = new Date();
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
      for (const player of this._playerManager.players) {
        player.scoreboard.win = null;
      }
      this._ea.publish('gameService.stateChanged');
    } else {
      logger.warn('Revert is called when state is not at WIN.');
    }
  }
}
