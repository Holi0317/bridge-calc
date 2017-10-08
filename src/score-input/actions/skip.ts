export const SKIP: 'CURRENT_GAME/SKIP' = 'CURRENT_GAME/SKIP'
export interface ISkipAction {
  type: typeof SKIP,
  times?: number,
  time: Date
}

/**
 * Skip n round(s).
 * @param times - Number of rounds to be skip.
 * If not provided, current round will be skipped.
 */
export function skip(times?: number): ISkipAction {
  return {type: SKIP, times, time: new Date()}
}
