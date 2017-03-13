import {GameMeta} from '../services/game-board/game-meta'

export class RoundNameValueConverter {
  public toView(value: GameMeta) {
    return value.isExtra ? `${value.name} (${value.cardPerPlayer})` : `Round ${value.name}`
  }
}
