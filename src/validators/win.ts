import {BaseValidateResult, isOk} from './validate-util';
import {Player} from '../services/game-board/player';

export interface WinValidatorOptions {
  players: Player[]
  cardPerPlayer: number
}

export interface WinValidatorResult extends BaseValidateResult {
  // By convention, err should be plain object.
  // This is a map for playerID -> error string
  err: { [playerID: string ]: string }
}

function playerValidation(win_: string | null, cardPerPlayer: number) {
  if (win_ == null || win_ === '') {
    return 'Empty win is not allowed';
  }
  const win = +win_;
  if (!Number.isInteger(win)) {
    return 'Win must be an integer';
  }
  if (win < 0) {
    return 'Negative stack is not allowed';
  }
  if (win > cardPerPlayer) {
    return 'You will defiantly lose';
  }
  return '';
}

export function winValidator(opt: WinValidatorOptions): WinValidatorResult {
  const err = {};

  let sum = 0;

  for (const player of opt.players) {
    err[player.ID] = playerValidation(player.scoreboard.win, opt.cardPerPlayer);

    sum += +player.scoreboard.win!;
  }

  if (sum !== opt.cardPerPlayer) {
    // Set empty error
    for (let key in err) {
      if (err.hasOwnProperty(key)) {
        if (err[key] === '') {
          err[key] = 'Sum of card does not match total stack available.';
        }
      }
    }
  }

  return {
    ok: isOk(err),
    err
  };
}
