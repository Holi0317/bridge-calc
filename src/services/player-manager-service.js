import {genID} from '../utils';
import {Scoreboard} from './scoreboard';

export type PlayerID = string;

export class PlayerManagerService {
  /**
   * Array of players in this manager.
   */
  players: Player[];
  /**
   * Used in `next` method
   */
  private _currentPlayerIndex: number;
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
    this._currentPlayerIndex = -1;
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
   * If you are in a very bad luck (I mean vary vary bad luck), stackoverflow will occur.
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
    this.ensureUnique(); // Hopefully this won't cause stackoverflow.
  }

  /**
   * Remove player from manager.
   * If playerID is null, all players will be removed.
   * @param playerID
   * @throws ReferenceError - Player ID does not exists.
   */
  removePlayer(playerID: ?PlayerID) {
    if (playerID == null) {
      this.players = [];
    } else {
      const index = this.players.map(p => p.ID).indexOf(playerID);
      if (index === -1) {
        throw new ReferenceError(`Player ID: ${playerID} not found.`);
      }

      if (index === this._currentPlayerIndex) {
        this._currentPlayerIndex--;
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
    if (++this._currentPlayerIndex === this.players.length) {
      this._currentPlayerIndex = 0;
    }
    return this.players[this._currentPlayerIndex].ID;
  }

  /**
   * Get the player by Player ID
   * @param id
   */
  getPlayerByID(id: PlayerID) {
    return this._playerMap.get(id);
  }

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
  ID: PlayerID;
  /**
   * Name of this player
   */
  name: string;
  /**
   * Scoreboard for this player
   */
  scoreboard: Scoreboard;

  constructor(name: ?string) {
    this.ID = genID();
    this.name = name;
    this.scoreboard = new Scoreboard();
  }

  /**
   * Generate a new ID for this player.
   * This should only be used when there is conflict of ID. (Rare case)
   */
  newID() {
    this.ID = genID();
  }
}
