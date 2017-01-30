import {inject} from 'aurelia-framework';
import {GameState} from './game-state';
import {PlayerID, PlayerManagerService} from './player-manager-service';
import {range} from '../utils';

export interface StartOptions {
  /**
   * Name of players
   */
  players: string[];
  options: {
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
  };
}

/**
 * Represent game metadata for a round of game.
 */
export class GameMeta {
  /**
   * Maker player for this round.
   * If null, the player is either deleted or that round is a dummy round.
   */
  maker: ?PlayerID;
  /**
   * Name of current round.
   */
  name: string;
  /**
   * Number of handheld card for each player in this round.
   */
  cardPerPlayer: number;

  constructor(name: string|number) {
    this.name = name + '';
    this.cardPerPlayer = (typeof name === 'number') ? name : null;
    this.maker = null;
  }
}

/**
 * Game controller logic.
 */
@inject(PlayerManagerService)
export class GameService {
  /**
   * Game metadata for current round
   */
  currentGame: ?GameMeta;
  /**
   * Game metadata for previous rounds
   */
  prevGames: GameMeta[];
  /**
   * Game metadata for future rounds.
   * NOTE: These metadata object should have null as maker property as they player list may change in the future.
   */
  futureGames: GameMeta[];
  /**
   * Starting time of game
   */
  startTime: ?Date;
  /**
   * Ending time of game
   */
  endTime: ?Date;
  /**
   * Current state of game. NOTE: Type should be GameState.
   */
  state: number;
  /**
   * Player manager service
   */
  playerManager: PlayerManagerService;

  constructor(playerManager: PlayerManagerService) {
    this.currentGame = null;
    this.prevGames = [];
    this.futureGames = [];
    this.startTime = null;
    this.endTime = null;
    this.state = GameState.NOT_STARTED;
    this.playerManager = playerManager;
  }

  /**
   * Start a new game.
   * @param opts - See StartOption interface for documentation.
   */
  start(opts: StartOptions) {
    this.startTime = new Date();
    this.state = GameState.BID;
    this.playerManager.addPlayer(opts.players);

    this.futureGames = range(1, opts.options.rounds).map(i => new GameMeta(i));
    this.currentGame = this.futureGames.shift();
    this.currentGame.maker = this.playerManager.next();

    for (let i = 1; i < opts.options.startingRound; i++) {
      this.skip();
    }
  }

  /**
   * End Bid process.
   * WARNING: no type/value checking will be done here.
   * @param bid - A map that should map from playerID -> bid stack.
   */
  bid(bid: Map<PlayerID, number>) {
    this.state = GameState.WIN;
    for (const [ID, b] of bid) {
      const player = this.playerManager.getPlayerByID(ID);
      player.scoreboard.bid = b;
    }
  }

  /**
   * End Win process and proceed to next round.
   * WARNING: no type/value checking will be done here.
   * @param win - A map that should map from playerID -> win stack.
   */
  win(win: Map<PlayerID, number>) {
    for (const [ID, w] of win) {
      const player = this.playerManager.getPlayerByID(ID);
      player.scoreboard.win = w;
      player.scoreboard.calcScore(this.currentGame.name);
    }
    this.nextRound();
  }

  /**
   * Skip the current round of game.
   * All players will receive 0 mark for this round.
   */
  skip() {
    // Set all player's score to 0
    for (const player of this.playerManager.players) {
      player.scoreboard.calcScore(this.currentGame.name, null, null);
    }
    this.nextRound();
  }

  /**
   * Proceed to next round.
   * Prepare states for fulfilling needs of next round.
   */
  nextRound() {
    this.prevGames.push(this.currentGame);
    this.currentGame = this.futureGames.shift();
    if (this.currentGame === undefined) {
      // Last round has passed
      this.currentGame = null;
      this.state = GameState.GAME_END;
      this.endTime = new Date();
    } else {
      // We still have more rounds of game to proceed.
      this.state = GameState.BID;
      this.currentGame.maker = this.playerManager.next();
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
      for (const player of this.playerManager.players) {
        player.scoreboard.win = null;
      }
    }
  }
}
