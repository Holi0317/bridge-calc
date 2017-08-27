import {fillObj} from '../../utils'

/**
 * Generate default bid/win. I.E. fill in 0
 */
export function bidWinGenerator(playerID: string[]) {
  return fillObj({}, playerID, 0)
}
