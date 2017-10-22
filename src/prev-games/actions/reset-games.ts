export const RESET_GAMES: 'PREV_GAMES/RESET_GAMES' = 'PREV_GAMES/RESET_GAMES'
export interface IResetGamesAction {
  type: typeof RESET_GAMES
}

/**
 * Clear previous games array from redux state tree.
 */
export function resetGamesAtion(): IResetGamesAction {
  return {type: RESET_GAMES}
}
