import cuid from 'cuid'
import {IPlayerMap} from '../../types'
import {ActionTypes} from '../../action-types'

export interface IStartAction {
  type: ActionTypes.START,
  rounds: number,
  playerNames: IPlayerMap<string>,
  startTime: number,
  startingRound: number,
  id: string
}

/**
 * Helper function to Change player names array to object with random generated player ID as key.
 * @param playerNames
 */
function namesToMap(playerNames: string[]): IPlayerMap<string> {
  const result: IPlayerMap<string> = {}
  playerNames.forEach(name => {
    result[cuid()] = name
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
export function startAction(rounds: number, playerNames: string[], startingRound: number): IStartAction {
  return {
    type: ActionTypes.START,
    rounds,
    playerNames: namesToMap(playerNames),
    startTime: new Date().getTime(),
    startingRound,
    id: cuid()
  }
}
