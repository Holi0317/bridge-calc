export const DELETE_GAME: 'PREV_GAMES/DELETE_GAME' = 'PREV_GAMES/DELETE_GAME'
export interface IDeleteGameAction {
  type: typeof DELETE_GAME,
  index: number
}

/**
 * Delete a game from previous game state tree in redux.
 * @param index - index of the game in prevGame state desired to delete.
 */
export function deleteGameAction(index: number): IDeleteGameAction {
  return {type: DELETE_GAME, index}
}
