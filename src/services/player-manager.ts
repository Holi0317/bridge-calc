import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {getLogger} from 'aurelia-logging';
import {Player, PlayerID, PlayerSchema} from './player';

const logger = getLogger('PlayerManager');

/**
 * Manages player instances.
 * This service will emit following event through aurelia event aggregator:
 *  - playerManager.playerListChanged - Player list has changed
 *  - playerManager.scoreChanged - A round may have ended and score and rank of players have changed.
 */
@autoinject()
export class PlayerManager {
  /**
   * Array of players in this manager.
   */
  public players: Player[];
  /**
   * Used in `next` method
   */
  public currentPlayerIndex: number;
  /**
   * Used in `getPlayerByID` method
   */
  private _playerMap: Map<PlayerID, Player>;

  constructor(private _ea: EventAggregator) {
    this.reset();
  }

  reset() {
    this.players = [];

    // Starts from -1 so that the first player will be returned when next() is called.
    this.currentPlayerIndex = -1;
    this._playerMap = new Map();
  }

  /**
   * Add new players to manager.
   * @param names - (Array of) player names to be added.
   */
  addPlayer(names: string | string[]): void {
    if (!Array.isArray(names)) {
      return this.addPlayer([names]);
    }
    const newPlayers = names.map(name => new Player(name));
    this.players.push(...newPlayers);
    this._refreshMap();
    this._ea.publish('playerManager.playerListChanged');
  }

  /**
   * Remove a player from manager.
   * @param playerID - Player to be removed
   * @throws ReferenceError - Player ID does not exists.
   */
  removePlayer(playerID: PlayerID): void {
    const index = this.players.map(p => p.ID).indexOf(playerID);
    if (index === -1) {
      throw new ReferenceError(`Player ID: ${playerID} not found.`);
    }

    if (index === this.currentPlayerIndex) {
      this.currentPlayerIndex--;
    }
    this.players.splice(index, 1);
    this._refreshMap();
    this._ea.publish('playerManager.playerListChanged');
  }

  /**
   * Get the next player ID.
   * The first time this method is called will return the first player.
   */
  next(): PlayerID {
    if (++this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0;
    }
    return this.players[this.currentPlayerIndex].ID;
  }

  /**
   * Calculate all player's score by implicit bid and win data in player's scoreboard object.
   * Rank will also be updated.
   * @param round - Name of current round
   */
  calcAllScore(round: string): void {
    for (const player of this.players) {
      player.scoreboard.calcScore(round);
    }
    this.updateRank();
    this._ea.publish('playerManager.scoreChanged');
  }

  /**
   * Update rank property of all players
   */
  updateRank(): void {
    const scores = this.players.map(p => p.scoreboard.totalScore).sort((a, b) => b - a);
    for (const player of this.players) {
      player.rank = scores.indexOf(player.scoreboard.totalScore) + 1;
    }
  }

  /**
   * Get the player by Player ID.
   * If no player is found, a dummy player with name `Null` will be returned.
   * @param id - Desired player ID
   */
  getPlayerByID(id: PlayerID): Player {
    const player = this._playerMap.get(id);
    if (player) {
      return player;
    } else {
      logger.warn(`getPlayerByID: cannot find player ID: ${id}`);
      return new Player('Null');
    }
  }

  /**
   * Refresh internal playerID -> Player object map.
   * Should be called after any mutation to player array.
   * @private
   */
  private _refreshMap(): void {
    this._playerMap = new Map();
    for (const player of this.players) {
      this._playerMap.set(player.ID, player);
    }
  }

  dump(): PlayerSchema[] {
    return this.players.map(player => player.dump());
  }

  load(datas: PlayerSchema[]) {
    this.reset();
    this.players = datas.map(data => Player.fromDumped(data));
    this._refreshMap();
    this.updateRank();
  }
}
