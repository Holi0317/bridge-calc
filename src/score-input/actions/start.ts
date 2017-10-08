import uniqueId from 'lodash-es/uniqueId'
import {IPlayerMap} from '../../types'

export const START: 'CURRENT_GAME/START' = 'CURRENT_GAME/START'
export interface IStartAction {
  type: typeof START,
  rounds: number,
  playerNames: IPlayerMap<string>,
  startTime: Date,
  startingRound: number
}

/**
 * Helper function to Change player names array to object with random generated player ID as key.
 * @param playerNames
 */
function namesToMap(playerNames: string[]): IPlayerMap<string> {
  const result: IPlayerMap<string> = {}
  playerNames.forEach(name => {
    result[uniqueId('player_')] = name
  })
  return result
}

/**
 * Start a new game that overrides existing game.
 *
 * @param rounds - Total number of rounds in the whole game.
 * @param playerNames - Player names in the game. Each player will get an unique ID when game starts.
 * Ordering of the names will be used as the player order for first round.
 * @param startingRound - The round to start from
 */
export function start(rounds: number, playerNames: string[], startingRound: number): IStartAction {
  return {
    type: START,
    rounds,
    playerNames: namesToMap(playerNames),
    startTime: new Date(),
    startingRound
  }
}
