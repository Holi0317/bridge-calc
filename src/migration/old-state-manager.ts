import mapValues from 'lodash-es/mapValues'
import {IOldGameData, OldState} from './types'

const KEYS = {
  currentRound: 'Bridge.currentRound',
  maker: 'Bridge.maker',
  players: 'Bridge.players',
  state: 'Bridge.state',
  totalRounds: 'Bridge.totalRounds'
}

/**
 * Attempt to get v1.0.0 data from localStorage.
 *
 * @returns The data stored in localStorage. If not found, null is returned.
 * @throws {SyntaxError} - Invalid JSON is found in one of the key
 */
export function retrieveOldData(): IOldGameData | null {
  const dataMap = mapValues(KEYS, key => {
    const value = localStorage.getItem(key)
    return value != null ? JSON.parse(value) : null
  })

  if (Object.values(dataMap).includes(null)) {
    return null
  } else {
    return dataMap as any
  }
}

/**
 * Test if there is v1.0.0 data.
 * Even the state is notStarted, this function will still return true.
 */
export function hasOldData(): boolean {
  return localStorage.getItem('Bridge.state') !== null
}

/**
 * Check if old data is on state `notStarted` or does not have the game.
 * If either one of the above condition met, false will be returned
 */
export function isNotStarted(data: IOldGameData | null): boolean {
  return data == null || data.state === OldState.notStarted
}

/**
 * Remove all old data in v1.0.0 from localStorage
 */
export function deleteOldData(): void {
  Object.values(KEYS).forEach(key =>
    localStorage.removeItem(key)
  )
}
