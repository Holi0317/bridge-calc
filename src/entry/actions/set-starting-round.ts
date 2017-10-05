export const SET_STARTING_ROUND: 'ENTRY/SET_STARTING_ROUND' = 'ENTRY/SET_STARTING_ROUND'
export interface ISetStartingRoundAction {
  type: typeof SET_STARTING_ROUND,
  payload: number
}

/**
 * Set starting round for entry options.
 * @param payload - The starting round to be set
 */
export function setStartingRound(payload: number): ISetStartingRoundAction {
  return {type: SET_STARTING_ROUND, payload}
}
