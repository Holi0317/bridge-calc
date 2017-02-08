import {inject} from 'aurelia-framework';
import {getLogger} from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';
import {GameState} from './game-state';
import {PlayerID, PlayerManagerService} from './player-manager-service';
import {range, toFront} from '../utils';

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
 * Represent game metadata for a round of game.
 */
export class GameMeta {
  /**
   * Maker player for this round.
   * If null, the player is either deleted or that round is a dummy round.
   */
  public maker: PlayerID | null;
  /**
   * Name of current round.
   */
  public name: string;
  /**
   * Number of handheld card for each player in this round.
   */
  public cardPerPlayer: number | null;
  /**
   * Is this round an extra round?
   */
  public isExtra: boolean;
  /**
   * Order of player ID in the round.
   * Maker always go first.
   */
  public playerOrder: PlayerID[];

  constructor(name: string | number) {
    this.name = name + '';
    this.cardPerPlayer = (typeof name === 'number') ? name : null;
    this.maker = null;
    this.isExtra = typeof name !== 'number';
    this.playerOrder = [];
  }
}

/**
 * Game controller logic.
 * This service will emit the following events in EventAggregator from aurelia:
 *  - gameService.start - New game has started.
 *  - gameService.stateChanged - state of game controller has changed. This will emit AFTER all work for controller has completed.
 *  - gameService.end - Game has reached last round and ended.
 */
@inject(PlayerManagerService, EventAggregator)
export class GameService {
  /**
   * Game metadata for current round
   */
  public currentGame: GameMeta | null = null;
  /**
   * Game metadata for previous rounds
   */
  public prevGames: GameMeta[] = [];
  /**
   * Game metadata for future rounds.
   * NOTE: These metadata object should have null as maker property as they player list may change in the future.
   */
  public futureGames: GameMeta[] = [];
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
    private _playerManager: PlayerManagerService,
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
    this._playerManager.reset();
    this._playerManager.addPlayer(opts.players);

    // Create GameMeta objects
    this.futureGames = range(1, opts.rounds).map(i => new GameMeta(i));

    // Bootstrap first round metadata
    this.nextRound();

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
    if (this.currentGame == null || this.state === GameState.NOT_STARTED) {
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
    if (this.currentGame == null || this.state === GameState.NOT_STARTED) {
      logger.warn('No game is started and win is called');
      return;
    }
    this._playerManager.calcAllScore(this.currentGame.name);
    this.nextRound();
    if (this.state === GameState.GAME_END) {
      this._ea.publish('gameService.end');
    }
    this._ea.publish('gameService.stateChanged');
  }

  /**
   * Skip the current round of game.
   * All players will receive 0 mark for this round.
   */
  skip() {
    // Set all player's score to 0
    for (const player of this._playerManager.players) {
      player.scoreboard.calcScore(this.currentGame!.name, null, null);
    }
    this.nextRound();
  }

  /**
   * Proceed to next round.
   * Prepare states for fulfilling needs of next round.
   */
  nextRound() {
    if (this.currentGame != null) {
      // If this is the first round, currentGame is null.
      this.prevGames.push(this.currentGame);
    }

    const nextGame = this.futureGames.shift();
    if (nextGame == null) {
      // Last round has just ended
      this.currentGame = null;
      this.state = GameState.GAME_END;
      this.endTime = new Date();
    } else {
      // We still have more rounds of game to proceed.
      this.currentGame = nextGame;
      this.state = GameState.BID;
      this.currentGame.maker = this._playerManager.next();

      // Set currentGame.playerOrder
      const playerIDs = this._playerManager.players.map(p => p.ID);
      this.currentGame.playerOrder = toFront(playerIDs, playerIDs.indexOf(this.currentGame.maker));
    }
  }

  /**
   * Append a new round for future game
   * @param name - Name of the round.
   * @param cardPerPlayer - Number of cards per player on that round.
   */
  addRound(name: string, cardPerPlayer: number) {
    const meta = new GameMeta(name);
    meta.cardPerPlayer = cardPerPlayer;
    meta.isExtra = true;
    this.futureGames.push(meta);
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
