import {Player} from '../services/game-board/player'
import {IBaseValidateResult, isOk} from './validate-util'

export interface IWinValidatorOptions {
  players: Player[]
  cardPerPlayer: number
}

export interface IWinValidatorResult extends IBaseValidateResult {
  // By convention, err should be plain object.
  // This is a map for playerID -> error string
  err: { [playerID: string ]: string }
}

function playerValidation(rawWin: string | null, cardPerPlayer: number) {
  if (rawWin == null || rawWin === '') {
    return 'Empty win is not allowed'
  }
  const win = +rawWin
  if (!Number.isInteger(win)) {
    return 'Win must be an integer'
  }
  if (win < 0) {
    return 'Negative stack is not allowed'
  }
  if (win > cardPerPlayer) {
    return 'You will defiantly lose'
  }
  return ''
}

export function winValidator(opt: IWinValidatorOptions): IWinValidatorResult {
  const err: {[player: string]: string} = {}

  let sum = 0

  for (const player of opt.players) {
    err[player.ID] = playerValidation(player.scoreboard.win, opt.cardPerPlayer)

    sum += +player.scoreboard.win!
  }

  if (sum !== opt.cardPerPlayer) {
    // Set empty error
    for (const key in err) {
      if (err.hasOwnProperty(key)) {
        if (err[key] === '') {
          err[key] = 'Sum of card does not match total stack available.'
        }
      }
    }
  }

  return {
    ok: isOk(err),
    err,
  }
}
