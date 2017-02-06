import {BaseValidateResult, isOk} from './validate-util';
import {Player, PlayerID} from '../services/player-manager-service';

export interface BidValidatorOptions {
  players: Player[]
  cardPerPlayer: number
  lastPlayerID: PlayerID
}

export interface BidValidatorResult extends BaseValidateResult {
  // By convention, err should be plain object.
  // This is a map for playerID -> error string
  err: { [playerID: string ]: string }
}

function playerValidation(bid_: string | null, cardPerPlayer: number) {
  if (bid_ == null || bid_ === '') {
    return 'Empty bid is not allowed';
  }
  const bid = +bid_;
  if (!Number.isInteger(bid)) {
    return 'Bid must be an integer';
  }
  if (bid < 0) {
    return 'Negative stack is not allowed';
  }
  if (bid > cardPerPlayer) {
    return 'You will defiantly lose';
  }
  return '';
}

export class BidValidator {
  validate(opt: BidValidatorOptions): BidValidatorResult {
    const err = {};

    let sum = 0;

    for (const player of opt.players) {
      err[player.ID] = playerValidation(player.scoreboard.bid, opt.cardPerPlayer);

      sum += +player.scoreboard.bid;
    }

    if (sum === opt.cardPerPlayer && err[opt.lastPlayerID] === '') {
      err[opt.lastPlayerID] = 'You cannot choose that. Good luck';
    }

    return {
      ok: isOk(err),
      err
    };
  }
}
