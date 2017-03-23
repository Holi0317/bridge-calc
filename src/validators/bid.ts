import {Player, PlayerID} from '../services/game-board/player'
import {IBaseValidateResult, isOk} from './validate-util'

export interface IBidValidatorOptions {
  players: Player[]
  cardPerPlayer: number
  lastPlayerID: PlayerID
}

export interface IBidValidatorResult extends IBaseValidateResult {
  // By convention, err should be plain object.
  // This is a map for playerID -> error string
  err: { [playerID: string ]: string }
}

function playerValidation(rawBid: string | null, cardPerPlayer: number) {
  if (rawBid == null || rawBid === '') {
    return 'Empty bid is not allowed'
  }
  const bid = +rawBid
  if (!Number.isInteger(bid)) {
    return 'Bid must be an integer'
  }
  if (bid < 0) {
    return 'Negative stack is not allowed'
  }
  if (bid > cardPerPlayer) {
    return 'You will defiantly lose'
  }
  return ''
}

export function bidValidator(opt: IBidValidatorOptions): IBidValidatorResult {
  const err: {[player: string]: string} = {}

  let sum = 0

  for (const player of opt.players) {
    err[player.ID] = playerValidation(player.scoreboard.bid, opt.cardPerPlayer)

    sum += +player.scoreboard.bid!
  }

  if (sum === opt.cardPerPlayer && err[opt.lastPlayerID] === '') {
    err[opt.lastPlayerID] = 'You cannot choose that. Good luck'
  }

  return {
    ok: isOk(err),
    err
  }
}
