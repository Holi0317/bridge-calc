export const SET_ROUNDS: 'ENTRY/SET_ROUNDS' = 'ENTRY/SET_ROUNDS'
export interface ISetRoundsAction {
  type: typeof SET_ROUNDS,
  payload: number
}

/**
 * Set rounds for entry options.
 * @param payload - The rounds to be set
 */
export function setRoundsAction(payload: number): ISetRoundsAction {
  return {type: SET_ROUNDS, payload}
}
