import {getLogger} from 'aurelia-logging';
import {genID} from '../utils';
import {Scoreboard} from './scoreboard';

const logger = getLogger('PlayerManagerService');

/**
 * Use this type for representing PlayerID.
 * This can promote a higher readability of code.
 */
export type PlayerID = string;

export class PlayerManagerService {
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

  constructor() {
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
    this.ensureUnique();
    this._refreshMap();
  }

  /**
   * Ensure all player ID are unique in this manager.
   * Assign of new ID starts from the last element. Therefore it's safe to call this after adding new player.
   * This use recursion to ensure all ID are unique.
   * If you are in a very bad luck (I mean vary vary bad luck), StackOverflow will occur.
   */
  ensureUnique() {
    const IDs = this.players.map(p => p.ID);
    const duplicates = IDs.filter((value, index) => IDs.includes(value, index + 1));
    if (duplicates.length === 0) {
      return
    }
    for (const dupe of duplicates) {
      const index = IDs.lastIndexOf(dupe);
      this.players[index].newID();
    }
    this.ensureUnique(); // Hopefully this won't cause StackOverflow.
  }

  /**
   * Remove player from manager.
   * If playerID is null, all players will be removed.
   * @param playerID
   * @throws ReferenceError - Player ID does not exists.
   */
  removePlayer(playerID?: PlayerID) {
    if (playerID == null) {
      this.players = [];
    } else {
      const index = this.players.map(p => p.ID).indexOf(playerID);
      if (index === -1) {
        throw new ReferenceError(`Player ID: ${playerID} not found.`);
      }

      if (index === this.currentPlayerIndex) {
        this.currentPlayerIndex--;
      }
      this.players.splice(index, 1);
    }
    this._refreshMap();
  }

  /**
   * Get the next player ID.
   * The first time this method is called will return the first player.
   */
  next() {
    if (++this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0;
    }
    return this.players[this.currentPlayerIndex].ID;
  }

  /**
   * Calculate all player's score by implicit bid and win data in player's scoreboard object.
   * @param round - Name of current round
   */
  calcAllScore(round: string) {
    for (const player of this.players) {
      player.scoreboard.calcScore(round);
    }
    this.updateRank();
  }

  /**
   * Update rank property of all players
   */
  updateRank() {
    const scores = this.players.map(p => p.scoreboard.totalScore).sort((a, b) => b - a);
    for (const player of this.players) {
      player.rank = scores.indexOf(player.scoreboard.totalScore) + 1;
    }
  }

  /**
   * Get the player by Player ID
   * @param id
   */
  getPlayerByID(id: PlayerID) {
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
  private _refreshMap() {
    this._playerMap = new Map();
    for (const player of this.players) {
      this._playerMap.set(player.ID, player);
    }
  }
}

export class Player {
  /**
   * Internal ID for the Player
   */
  public ID: PlayerID;
  /**
   * Name of this player
   */
  public name: string;
  /**
   * Scoreboard for this player
   */
  public scoreboard: Scoreboard;
  /**
   * Rank of this player
   */
  public rank: number;

  constructor(name?: string) {
    this.ID = genID();
    this.name = name || '';
    this.scoreboard = new Scoreboard();
    this.rank = 1;
  }

  /**
   * Generate a new ID for this player.
   * This should only be used when there is conflict of ID. (Rare case)
   */
  newID() {
    this.ID = genID();
  }
}
