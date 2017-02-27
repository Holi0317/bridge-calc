import {genID} from '../../utils';
import {Scoreboard, ScoreboardSchema} from './scoreboard';

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

  dump(): PlayerSchema {
    return {
      ID: this.ID,
      name: this.name,
      scoreboard: this.scoreboard.dump()
    }
  }

  static fromDumped(data: PlayerSchema) {
    const playerObject = new Player(data.name);
    playerObject.ID = data.ID;
    playerObject.scoreboard.load(data.scoreboard);
    return playerObject;
  }
}

export interface PlayerSchema {
  ID: PlayerID
  name: string
  scoreboard: ScoreboardSchema
}
