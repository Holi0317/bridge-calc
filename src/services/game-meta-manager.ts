import {autoinject} from 'aurelia-framework';
import {GameMeta} from './game-meta';
import {range, toFront} from '../utils';
import {PlayerManager} from './player-manager';
import {PlayerID} from './player';

@autoinject()
export class GameMetaManager {
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
   * @returns {[any,GameMeta,any]}
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
      throw new RangeError('[GameMetaService.next] No further round available and no current game is started.');
    }
    if (this.currentGame != null) {
      // If this is the first round, currentGame is null.
      this.prevGames.push(this.currentGame);
    }

    this.currentGame = this.futureGames.shift() || null;
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

  dump(): MetaSchema[] {
    return this.getAllMetas().map(meta => {
      return {
        maker: meta.maker,
        name: meta.name,
        cardPerPlayer: meta.cardPerPlayer,
        isExtra: meta.isExtra,
        playerOrder: meta.playerOrder,
      }
    });
  }

  load(data: MetaSchema[], currentGameIndex: number | null) {
    this.reset();

    this.futureGames = data.map(meta => {
      const metaObject = new GameMeta(meta.name);

      metaObject.maker = meta.maker;
      metaObject.cardPerPlayer = meta.cardPerPlayer;
      metaObject.isExtra = meta.isExtra;
      metaObject.playerOrder = meta.playerOrder;

      return metaObject;
    });

    if (currentGameIndex) {
      this.prevGames = this.futureGames.splice(0, currentGameIndex - 1);
      this.currentGame = this.futureGames.shift()!;
    } else {
      this.prevGames = this.futureGames;
      this.futureGames = [];
    }

  }
}

export interface MetaSchema {
  maker: PlayerID | null
  name: string
  cardPerPlayer: number | null
  isExtra: boolean
  playerOrder: PlayerID[]
}
