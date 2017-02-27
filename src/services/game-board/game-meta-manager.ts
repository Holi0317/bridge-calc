import {GameMeta, MetaSchema} from './game-meta';
import {range, toFront} from '../../utils';
import {PlayerManager, PlayerManagerEvents} from './player-manager';
import {EventEmitter} from 'events';
import {getLogger} from 'aurelia-logging';

const logger = getLogger('GameMetaManager');

/**
 * Events that would be emitted by GameMetaManager. Use NodeJS EventEmitter API to listen these events.
 * @enum
 */
export const GameMetaManagerEvents = {
  /**
   * Emit when reference to currentGame has changed.
   * Most likely next round is started.
   */
  CurrentGameChanged: 'currentGameChanged',
  /**
   * Emit when currentGame.playerOrder has changed. Next round has started or player list has changed.
   */
  PlayerOrderChanged: 'playerOrderChanged'
};

/**
 * Manage game metadata.
 * This object will emit events. See GameMetaManagerEvents for details.
 * @see {GameMetaManagerEvents}
 */
export class GameMetaManager extends EventEmitter {
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

  constructor(private _playerManager: PlayerManager) {
    super();
    this._playerManager.on(PlayerManagerEvents.PlayerListChanged, this._playerListChanged.bind(this));
  }

  /**
   * Reset states.
   */
  reset(): void {
    this.currentGame = null;
    this.prevGames = [];
    this.futureGames = [];
  }

  /**
   * Return all metadatas of rounds of game. Including past, current and future games.
   * @returns {[GameMeta]}
   */
  getAllMetas(): GameMeta[] {
    if (this.currentGame) {
      return [...this.prevGames, this.currentGame, ...this.futureGames];
    } else {
      return this.prevGames;
    }
  }

  /**
   * Get metadata object for next round of game.
   * Player order sorting and select maker is also done when this is returned.
   * If returned null, final round has just reached.
   * @returns {GameMeta|null} - GameMeta for current game.
   * @throws RangeError - No further round available and no current game is started.
   */
  next(): GameMeta | null {
    if (this.currentGame == null && !this.futureGames.length /* length === 0 */) {
      // No further round available and already ended game / game is still not started.
      throw new RangeError('[next] No further round available and no current game is started.');
    }
    if (this.currentGame != null) {
      // If this is the first round, currentGame is null.
      this.prevGames.push(this.currentGame);
    }

    this.currentGame = this.futureGames.shift() || null;
    this.emit(GameMetaManagerEvents.CurrentGameChanged);

    if (this.currentGame) {
      // Have next game. Do maker and player order logic.
      this.currentGame.maker = this._playerManager.next();
      this.setPlayerOrder();
    }

    return this.currentGame;
  }

  /**
   * Set currentGame.playerOrder by putting maker to the first and
   * retain order of playerManager.player for remaining players.
   * @throws Error - current game or current game maker is not defined.
   */
  setPlayerOrder(): void {
    if (!this.currentGame || !this.currentGame.maker) {
      throw new Error('[GameMetaService.setPlayerOrder] current game or maker is not set.');
    }
    const playerIDs = this._playerManager.players.map(p => p.ID);
    this.currentGame.playerOrder = toFront(playerIDs, playerIDs.indexOf(this.currentGame.maker));
    logger.debug('playerOrder updated.', this.currentGame.playerOrder);
    this.emit(GameMetaManagerEvents.PlayerOrderChanged);
  }

  /**
   * Append a new extra round for future game
   * @param name - Name of the round.
   * @param cardPerPlayer - Number of cards per player on that round.
   */
  addRound(name: string, cardPerPlayer: number): void {
    const meta = new GameMeta(name);
    meta.cardPerPlayer = cardPerPlayer;
    meta.isExtra = true;
    this.futureGames.push(meta);
  }

  /**
   * Initiate games by resetting and adding future rounds
   * @param totalRound
   */
  initiateGames(totalRound: number): void {
    this.reset();
    this.futureGames = range(1, totalRound).map(i => new GameMeta(i));
  }

  private _playerListChanged() {
    // TODO implement logic for handling player list changed.
    // This should update player order before emitting event

    if (this.currentGame) {
      this.emit(GameMetaManagerEvents.PlayerOrderChanged);
    } else {
      // Initialization in process. GameMeta is not initialized yet.
    }
  }

  dump(): MetaSchema[] {
    return this.getAllMetas().map(meta => meta.dump());
  }

  load(data: MetaSchema[], currentGameIndex: number | null) {
    this.reset();

    this.futureGames = data.map(meta => GameMeta.fromDumped(meta));

    if (currentGameIndex) {
      this.prevGames = this.futureGames.splice(0, currentGameIndex - 1);
      this.currentGame = this.futureGames.shift()!;
    } else {
      this.prevGames = this.futureGames;
      this.futureGames = [];
    }

  }
}
