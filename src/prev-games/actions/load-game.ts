import {deleteGameAction} from './delete-game'
import {PrevGameEntry} from '../types'
import {replaceCurrentGameAction} from '../../score-input/actions/replace-current-game'
import {prevGameToGameState} from '../converter'

/**
 * Load a given game from prevGames to currentGame
 */
export function loadGameAction(index: number, prevGame: PrevGameEntry) {
  return () => [
    deleteGameAction(index),
    replaceCurrentGameAction(prevGameToGameState(prevGame))
  ]
}
