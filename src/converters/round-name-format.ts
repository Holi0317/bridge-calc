import {GameMeta} from '../services/game-meta';

export class RoundNameValueConverter {
  toView(value: GameMeta) {
    return value.isExtra ? `${value.name} (${value.cardPerPlayer})` : `Round ${value.name}`;
  }
}
