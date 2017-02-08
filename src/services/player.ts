import {genID} from '../utils';
import {Scoreboard} from './scoreboard';

/**
 * Use this type for representing PlayerID.
 * This can promote a higher readability of code.
 */
export type PlayerID = string;

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
