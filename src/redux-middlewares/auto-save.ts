import {Action, MiddlewareAPI} from 'redux'
import {saveGameAction} from '../prev-games/actions/save-game'
import {Dispatch} from '../types'

/**
 * This middleware will trigger `PREV_GAMES/SAVE_GAME` action when `currentGame` in state is not equal (read: !==) to
 * previous one.
 */
export function autoSave(store: MiddlewareAPI<Dispatch>) {
  return (next: Dispatch) => (action: Action) => {
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
