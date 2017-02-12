import {PlayerID} from './player';

/**
 * Represent game metadata for a round of game.
 */
export class GameMeta {
  /**
   * Maker player for this round.
   * If null, the player is either deleted or that round is a dummy round.
   */
  public maker: PlayerID | null;
  /**
   * Name of current round.
   */
  public name: string;
  /**
   * Number of handheld card for each player in this round.
   */
  public cardPerPlayer: number | null;
  /**
   * Is this round an extra round?
   */
  public isExtra: boolean;
  /**
   * Order of player ID in the round.
   * Maker always go first.
   */
  public playerOrder: PlayerID[];

  constructor(name: string | number) {
    this.name = name + '';
    this.cardPerPlayer = (typeof name === 'number') ? name : null;
    this.maker = null;
    this.isExtra = typeof name !== 'number';
    this.playerOrder = [];
  }

  dump(): MetaSchema {
    return {
      maker: this.maker,
      name: this.name,
      cardPerPlayer: this.cardPerPlayer,
      isExtra: this.isExtra,
      playerOrder: this.playerOrder,
    }
  }

  static fromDumped(data: MetaSchema) {
    const metaObject = new GameMeta(data.name);

    metaObject.maker = data.maker;
    metaObject.cardPerPlayer = data.cardPerPlayer;
    metaObject.isExtra = data.isExtra;
    metaObject.playerOrder = data.playerOrder;

    return metaObject;
  }
}

export interface MetaSchema {
  maker: PlayerID | null
  name: string
  cardPerPlayer: number | null
  isExtra: boolean
  playerOrder: PlayerID[]
}
