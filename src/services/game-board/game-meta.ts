import {IMetaSchema} from '../../storage/schema'
import {PlayerID} from './player'

/**
 * Represent game metadata for a round of game.
 */
export class GameMeta {
  public static fromDumped(data: IMetaSchema) {
    const metaObject = new GameMeta(data.name)

    metaObject.maker = data.maker
    metaObject.cardPerPlayer = data.cardPerPlayer
    metaObject.isExtra = data.isExtra
    metaObject.playerOrder = data.playerOrder

    return metaObject
  }
  /**
   * Maker player for this round.
   * If null, the player is either deleted or that round is a dummy round.
   */
  public maker: PlayerID | null
  /**
   * Name of current round.
   */
  public name: string
  /**
   * Number of handheld card for each player in this round.
   */
  public cardPerPlayer: number | null
  /**
   * Is this round an extra round?
   */
  public isExtra: boolean

  /**
   * Order of player ID in the round.
   * Maker always go first.
   */
  public playerOrder: PlayerID[]

  /**
   * @param name - If the type is number, the round would be interpreted as a normal round.
   * Otherwise, it would be an extra round.
   */
  constructor(name: string | number) {
    this.name = name + ''
    this.cardPerPlayer = (typeof name === 'number') ? name : null
    this.maker = null
    this.isExtra = typeof name !== 'number'
    this.playerOrder = []
  }

  public dump(): IMetaSchema {
    return {
      cardPerPlayer: this.cardPerPlayer,
      isExtra: this.isExtra,
      maker: this.maker,
      name: this.name,
      playerOrder: this.playerOrder
    }
  }
}
