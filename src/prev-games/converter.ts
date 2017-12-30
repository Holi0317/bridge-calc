import {GameState} from '../score-input/reducer'
import {PrevGameEntry} from './types'

/**
 * Convert a game state to prev game object.
 * If the game state provided is null, an error will be thrown.
 * @exception {TypeError} - Given game state is null
 */
export function gameStateToPrevGame(gameState: GameState): PrevGameEntry {
  if (gameState == null) {
    throw new TypeError('[Prev games converter] game state must not be null for storage')
  }
  return gameState
}

/**
 * Convert a prev game object to game state.
 */
export function prevGameToGameState(prevGame: PrevGameEntry): GameState {
  return prevGame
}
