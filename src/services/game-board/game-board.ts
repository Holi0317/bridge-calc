import {getLogger} from 'aurelia-logging'
import {EventEmitter} from 'events'
import {IGameBoardSchema} from '../../storage/schema'
import {GameMetaManager} from './game-meta-manager'
import {GameState} from './game-state'
import {PlayerManager} from './player-manager'
import {Timer} from './timer'

const logger = getLogger('GameBoard')

export interface IStartOptions {
  /**
   * Name of players
   */
  players: string[]
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
 * Events that would be emitted by GameBoard. Use NodeJS EventEmitter API to listen these events.
 * @enum
 */
export class GameBoardEvents {
  /**
   * Emit when game has reached last round and ended.
   */
  public static End = Symbol('end')
  /**
   * Emit when new game has started.
   */
  public static Start = Symbol('start')
  /**
   * Emit when state of game controller has changed.
   * This will emit AFTER all work for controller has completed.
   * Do NOT use observer on state property.
   */
  public static StateChanged = Symbol('stateChanged')
}

/**
 * Represent a bridge game. Contains controller logic.
 * This object will emit events. See GameBoardEvents for details.
 * @see {GameBoardEvents}
 */
export class GameBoard extends EventEmitter {
  public static fromDumped(data: IGameBoardSchema) {
    const board = new GameBoard()
    board.state = data.state
    board.startTime = new Date(data.startTime)
    return board
  }

  public state = GameState.NOT_STARTED
  public playerManager = new PlayerManager()
  public metaManager = new GameMetaManager(this.playerManager)
  public timer = new Timer()
  /**
   * The date that this game has started
   */
  public startTime = new Date(0)

  constructor() {
    super()
  }

  /**
   * Start a new game.
   * @param opts - See StartOptions interface for documentation.
   * @see {IStartOptions}
   */
  public start(opts: IStartOptions) {
    logger.debug('Starting a new game with options:', opts)

    // Reset services
    this.playerManager = new PlayerManager()
    this.metaManager = new GameMetaManager(this.playerManager)
    this.timer = new Timer()

    // Set state
    this.state = GameState.BID
    this.startTime = new Date()

    // Player manager
    this.playerManager.addPlayer(opts.players)

    // Meta manager
    this.metaManager.initiateGames(opts.rounds)

    // Timer
    this.timer.startTimer()

    // Bootstrap first round metadata
    this._nextRound()

    // Skip rounds, if necessary
    for (let i = 1; i < opts.startingRound; i++) {
      this.skip()
    }

    // Emit event
    this.emit(GameBoardEvents.Start)
    this.emit(GameBoardEvents.StateChanged)
    logger.debug('Startup finished. GameBoard:', this)
  }

  /**
   * End Bid process.
   * WARNING: no type/value checking will be done here.
   */
  public bid() {
    if (this.metaManager.currentGame == null || this.state !== GameState.BID) {
      throw new Error('[bid] No game is started and bid is called')
    }
    this.state = GameState.WIN
    this.emit(GameBoardEvents.StateChanged)
  }

  /**
   * End Win process and proceed to next round.
   * WARNING: no type/value checking will be done here.
   */
  public win() {
    if (this.metaManager.currentGame == null || this.state !== GameState.WIN) {
      throw new Error('[win] No game is started and win is called')
    }
    this.playerManager.calcAllScore(this.metaManager.currentGame.name)
    this._nextRound()
    const state = this.state as GameState // type of this.state here before casting is GameState.WIN
    if (state === GameState.GAME_END) {
      this.emit(GameBoardEvents.End)
    }
    this.emit(GameBoardEvents.StateChanged)
  }

  /**
   * Skip the current round of game.
   * All players will receive 0 mark for this round.
   * @throws Error - game state is not started or has ended.
   */
  public skip() {
    if (!this.state || this.state === GameState.GAME_END) {
      throw new Error('[skip] Game is not started or has ended')
    }
    // Set all player's score to 0
    // We don't use playerManager.calcAllScore here as it will emit a event, which is not the desired result.
    for (const player of this.playerManager.players) {
      player.scoreboard.calcScore(this.metaManager.currentGame!.name, null, null)
    }
    this.playerManager.updateRank()
    this._nextRound()
  }

  /**
   * Roll back to previous action.
   * Only available when state is GameState.WIN
   */
  public revert() {
    if (this.state === GameState.WIN) {
      this.state = GameState.BID
      // Reset win state
      for (const player of this.playerManager.players) {
        player.scoreboard.win = null
      }
      this.emit(GameBoardEvents.StateChanged)
    } else {
      logger.warn('[revert] Revert is called when state is not at WIN.')
    }
  }

  public dump(): IGameBoardSchema {
    return {
      startTime: this.startTime.getTime(),
      state: this.state
    }
  }

  /**
   * Proceed to next round.
   * Prepare states for fulfilling needs of next round.
   */
  private _nextRound() {
    if (this.metaManager.next()) {
      // Have next round
      this.state = GameState.BID
    } else {
      // Last round has just ended
      this.state = GameState.GAME_END
      this.timer.endTimer()
    }
  }
}
