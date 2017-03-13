import {genID} from '../../utils'
import {IScoreboardSchema, Scoreboard} from './scoreboard'

/**
 * Use this type for representing PlayerID.
 * This can promote a higher readability of code.
 */
export type PlayerID = string

export class Player {
  public static fromDumped(data: IPlayerSchema) {
    const playerObject = new Player(data.name)
    playerObject.ID = data.ID
    playerObject.scoreboard.load(data.scoreboard)
    return playerObject
  }
  /**
   * Internal ID for the Player
   */
  public ID: PlayerID
  /**
   * Name of this player
   */
  public name: string
  /**
   * Scoreboard for this player
   */
  public scoreboard: Scoreboard

  /**
   * Rank of this player
   */
  public rank: number

  constructor(name?: string) {
    this.ID = genID()
    this.name = name || ''
    this.scoreboard = new Scoreboard()
    this.rank = 1
  }

  public dump(): IPlayerSchema {
    return {
      ID: this.ID,
      name: this.name,
      scoreboard: this.scoreboard.dump(),
    }
  }
}

export interface IPlayerSchema {
  ID: PlayerID
  name: string
  scoreboard: IScoreboardSchema
}
