import {GameState} from '../../score-input/reducer'
import {PrevGameEntry} from '../types'
import {gameStateToPrevGame} from '../converter'

export const SAVE_GAME: 'PREV_GAMES/SAVE_GAME' = 'PREV_GAMES/SAVE_GAME'
export interface ISaveGameAction {
  type: typeof SAVE_GAME
  /**
   * Content of the game to be saved.
   * If undefined, no-op will be done (as to handle null in GameState).
   */
  entry?: PrevGameEntry
}

/**
 * Save current game to prevGame state.
 * @param state - Game state to be saved
 */
export function saveGame(state: GameState): ISaveGameAction {
  if (state == null) {
    return {type: SAVE_GAME}
  }
  return {type: SAVE_GAME, entry: gameStateToPrevGame(state)}
}
