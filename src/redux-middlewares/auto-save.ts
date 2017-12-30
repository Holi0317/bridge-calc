import {Action, Dispatch, MiddlewareAPI} from 'redux'
import {saveGameAction} from '../prev-games/actions/save-game'
import {IRootState} from '../types'

/**
 * This middleware will trigger `PREV_GAMES/SAVE_GAME` action when `currentGame` in state is not equal (read: !==) to
 * previous one.
 */
export function autoSave<S extends IRootState>(store: MiddlewareAPI<S>) {
  return (next: Dispatch<S>) => (action: Action) => {
    const prevState = store.getState()
    const res = next(action)
    const newState = store.getState()
    if (prevState.currentGame !== newState.currentGame) {
      console.log('[Redux auto save middleware] Current game state changed. Triggering save game action.')
      return next(saveGameAction(newState.currentGame))
    }
    return res
  }
}
