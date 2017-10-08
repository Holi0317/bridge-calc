import {IPlayerMap} from '../../types'

export const CHANGE_PLAYERS: 'CURRENT_GAME/CHANGE_PLAYERS' = 'CURRENT_GAME/CHANGE_PLAYERS'
export interface IChangePlayersAction {
  type: typeof CHANGE_PLAYERS,
  newNames: IPlayerMap<string>,
  maker: string,
  rounds: number,
  time: Date
}

/**
 * Change players of current game.
 * Change can include: Change name, add player or remove player.
 * After this action is dispatched, the stage will revert to waitingBid if original stage is waitingWin. (To avoid invalid bid after changing player)
 *
 * This action can also be used to change maker. Just pass in original name map, original rounds and specify new maker in `maker` property.
 *
 * This action can also be used to change number of rounds. Similar to change maker, only update rounds property.
 *
 * @param newNames - New PlayerMap for the names.
 * Order of this map represent the new player order.
 * If new player is added, generate a new unique ID for him/her.
 *
 * @param maker - As order may have changed, new maker must be selected.
 * This property represent the ID of new maker.
 * The player order will be sorted by this property and newNames property.
 * This can also be used to change maker.
 *
 * @param rounds - Number of rounds after dispatching this action.
 * If the given rounds is less than current round, the game will end immediately.
 * If the above case happens, endTime of the game will be starting time + 1 min.
 * Because providing such round is invalid and validation should not be done in reducer.
 */
export function changePlayers(newNames: IPlayerMap<string>, maker: string, rounds: number): IChangePlayersAction {
  return {
    type: CHANGE_PLAYERS,
    newNames,
    maker,
    rounds,
    time: new Date()
  }
}
