export const SET_CARDS: 'ENTRY/SET_CARDS' = 'ENTRY/SET_CARDS'
export interface ISetCardsAction {
  type: typeof SET_CARDS,
  payload: number
}

/**
 * Set number of cards for entry options.
 * @param payload - The number of cards to be set
 */
export function setCards(payload: number): ISetCardsAction {
  return {type: SET_CARDS, payload}
}
