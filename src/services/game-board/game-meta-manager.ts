import {getLogger} from 'aurelia-logging'
import {EventEmitter} from 'events'
import {range, toFront} from '../../utils'
import {GameMeta, IMetaSchema} from './game-meta'
import {PlayerManager, PlayerManagerEvents} from './player-manager'

const logger = getLogger('GameMetaManager')

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
  PlayerOrderChanged: 'playerOrderChanged',
}

/**
 * Manage game metadata.
 * This object will emit events. See GameMetaManagerEvents for details.
 * @see {GameMetaManagerEvents}
 */
export class GameMetaManager extends EventEmitter {
  /**
   * Game metadata for current round
   */
  public currentGame: GameMeta | null = null
  /**
   * Game metadata for previous rounds
   */
  public prevGames: GameMeta[] = []
  /**
   * Game metadata for future rounds.
   * NOTE: These metadata object should have null as maker property as they player list may change in the future.
   */
  public futureGames: GameMeta[] = []

  constructor(private _playerManager: PlayerManager) {
    super()
    this._playerManager.on(PlayerManagerEvents.PlayerListChanged, this._playerListChanged.bind(this))
  }

  /**
   * Reset states.
   */
  public reset(): void {
    this.currentGame = null
    this.prevGames = []
    this.futureGames = []
  }

  /**
   * Return all metadatas of rounds of game. Including past, current and future games.
   * @returns {[GameMeta]}
   */
  public getAllMetas(): GameMeta[] {
    if (this.currentGame) {
      return [...this.prevGames, this.currentGame, ...this.futureGames]
    } else {
      return this.prevGames
    }
  }

  /**
   * Get metadata object for next round of game.
   * Player order sorting and select maker is also done when this is returned.
   * If returned null, final round has just reached.
   * @returns {GameMeta|null} - GameMeta for current game.
   * @throws RangeError - No further round available and no current game is started.
   */
  public next(): GameMeta | null {
    if (this.currentGame == null && !this.futureGames.length /* length === 0 */) {
      // No further round available and already ended game / game is still not started.
      throw new RangeError('[next] No further round available and no current game is started.')
    }
    if (this.currentGame != null) {
      // If this is the first round, currentGame is null.
      this.prevGames.push(this.currentGame)
    }

    this.currentGame = this.futureGames.shift() || null
    this.emit(GameMetaManagerEvents.CurrentGameChanged)

    if (this.currentGame) {
      // Have next game. Do maker and player order logic.
      this.currentGame.maker = this._playerManager.next()
      this.setPlayerOrder()
    }

    return this.currentGame
  }

  /**
   * Set currentGame.playerOrder by putting maker to the first and
   * retain order of playerManager.player for remaining players.
   * @throws Error - current game or current game maker is not defined.
   */
  public setPlayerOrder(): void {
    if (!this.currentGame || !this.currentGame.maker) {
      throw new Error('[setPlayerOrder] current game or maker is not set.')
    }
    const playerIDs = this._playerManager.players.map((p) => p.ID)
    this.currentGame.playerOrder = toFront(playerIDs, playerIDs.indexOf(this.currentGame.maker))
    logger.debug('playerOrder updated.', this.currentGame.playerOrder)
    this.emit(GameMetaManagerEvents.PlayerOrderChanged)
  }

  /**
   * Append a new extra round for future game
   * @param name - Name of the round.
   * @param cardPerPlayer - Number of cards per player on that round.
   */
  public addRound(name: string, cardPerPlayer: number): void {
    const meta = new GameMeta(name)
    meta.cardPerPlayer = cardPerPlayer
    meta.isExtra = true
    this.futureGames.push(meta)
  }

  /**
   * Initiate games by resetting and adding future rounds
   * @param totalRound
   */
  public initiateGames(totalRound: number): void {
    this.reset()
    this.futureGames = range(1, totalRound).map((i) => new GameMeta(i))
  }

  /**
   * Compute the index of current game in concatenated array of metas
   */
  get currentIndex(): number {
    if (this.currentGame == null && this.prevGames.length === 0) {
      // No game has started. initiateGames may have been called or not.
      return -1
    } else {
      // Other situation. Including game ended and running game.
      return this.prevGames.length
    }
  }

  public dump(): IGameMetaSchema {
    return {
      currentIndex: this.currentIndex,
      metas: this.getAllMetas().map((meta) => meta.dump()),
    }
  }

  public load(data: IGameMetaSchema) {
    this.reset()

    this.futureGames = data.metas.map((meta) => GameMeta.fromDumped(meta))

    if (data.currentIndex !== -1) {
      this.prevGames = this.futureGames.splice(0, data.currentIndex)
      this.currentGame = this.futureGames.shift() || null
    }

    // If data.currentIndex === -1
    // NO-OP. Because all metas are still in futureGames

  }

  private _playerListChanged() {
    // TODO implement logic for handling player list changed.
    // This should update player order before emitting event

    if (this.currentGame) {
      this.emit(GameMetaManagerEvents.PlayerOrderChanged)
    } else {
      // Initialization in process. GameMeta is not initialized yet.
    }
  }
}

export interface IGameMetaSchema {
  currentIndex: number
  metas: IMetaSchema[]
}
