import {getLogger} from 'aurelia-logging'
import {EventEmitter} from 'events'
import {IPlayerSchema, Player, PlayerID} from './player'

const logger = getLogger('PlayerManager')

/**
 * Events that would be emitted by PlayerManager. Use NodeJS EventEmitter API to listen these events.
 * @enum
 */
export class PlayerManagerEvents {
  /**
   * Emit when player list has changed
   */
  public static PlayerListChanged = 'playerListChanged'
  /**
   * Emit when a round may have ended and score and rank of players have changed
   */
  public static ScoreChanged = 'scoreChanged'
}

/**
 * Manages player instances.
 * This object will emit events. See PlayerManagerEvents doc for details.
 * @see {PlayerManagerEvents}
 */
export class PlayerManager extends EventEmitter {
  /**
   * Array of players in this manager.
   */
  public players: Player[]
  /**
   * Used in `next` method
   */
  public currentPlayerIndex: number
  /**
   * Used in `getPlayerByID` method
   */
  private _playerMap: Map<PlayerID, Player>

  constructor() {
    super()
    this.reset()
  }

  public reset() {
    this.players = []

    // Starts from -1 so that the first player will be returned when next() is called.
    this.currentPlayerIndex = -1
    this._playerMap = new Map()
  }

  /**
   * Add new players to manager.
   * @param names - (Array of) player names to be added.
   */
  public addPlayer(names: string | string[]): void {
    if (!Array.isArray(names)) {
      return this.addPlayer([names])
    }
    const newPlayers = names.map((name) => new Player(name))
    this.players.push(...newPlayers)
    this._refreshMap()
    this.emit(PlayerManagerEvents.PlayerListChanged)
  }

  /**
   * Remove a player from manager.
   * @param playerID - Player to be removed
   * @throws ReferenceError - Player ID does not exists.
   */
  public removePlayer(playerID: PlayerID): void {
    const index = this.players.map((p) => p.ID).indexOf(playerID)
    if (index === -1) {
      throw new ReferenceError(`[removePlayer] Player ID: ${playerID} not found.`)
    }

    if (index === this.currentPlayerIndex) {
      this.currentPlayerIndex--
    }
    this.players.splice(index, 1)
    this._refreshMap()
    this.emit(PlayerManagerEvents.PlayerListChanged)
  }

  /**
   * Get the next player ID.
   * The first time this method is called will return the first player.
   */
  public next(): PlayerID {
    if (++this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0
    }
    return this.players[this.currentPlayerIndex].ID
  }

  /**
   * Calculate all player's score by implicit bid and win data in player's scoreboard object.
   * Rank will also be updated.
   * @param round - Name of current round
   */
  public calcAllScore(round: string): void {
    for (const player of this.players) {
      player.scoreboard.calcScore(round)
    }
    this.updateRank()
    this.emit(PlayerManagerEvents.ScoreChanged)
  }

  /**
   * Update rank property of all players
   */
  public updateRank(): void {
    const scores = this.players.map((p) => p.scoreboard.totalScore).sort((a, b) => b - a)
    for (const player of this.players) {
      player.rank = scores.indexOf(player.scoreboard.totalScore) + 1
    }
  }

  /**
   * Get the player by Player ID.
   * If no player is found, a dummy player with name `Null` will be returned.
   * @param id - Desired player ID
   */
  public getPlayerByID(id: PlayerID): Player {
    const player = this._playerMap.get(id)
    if (player) {
      return player
    } else {
      logger.warn(`[getPlayerByID] cannot find player ID: ${id}`)
      return new Player('Null')
    }
  }

  public dump(): IPlayerSchema[] {
    return this.players.map((player) => player.dump())
  }

  public load(data: IPlayerSchema[]) {
    this.reset()
    this.players = data.map((d) => Player.fromDumped(d))
    this._refreshMap()
    this.updateRank()
  }

  /**
   * Refresh internal playerID -> Player object map.
   * Should be called after any mutation to player array.
   * @private
   */
  private _refreshMap(): void {
    this._playerMap = new Map()
    for (const player of this.players) {
      this._playerMap.set(player.ID, player)
    }
  }
}
