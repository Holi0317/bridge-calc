export const DELETE_GAME: 'PREV_GAMES/DELETE_GAME' = 'PREV_GAMES/DELETE_GAME'
export interface IDeleteGameAction {
  type: typeof DELETE_GAME,
  id: number
}

/**
 * Delete a game from previous game state tree in redux.
 * @param id - ID of the game desired to delete.
 * ID means the index of the game in the array.
 */
export function deleteGameAction(id: number): IDeleteGameAction {
  return {type: DELETE_GAME, id}
}

/**
 * Return an function that will return action for deleting given ID of game.
 */
export function lazyDeleteGameAction(id: number): () => IDeleteGameAction {
  return () => deleteGameAction(id)
}
