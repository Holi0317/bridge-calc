export const UNDO: 'CURRENT_GAME/UNDO' = 'CURRENT_GAME/UNDO'
export interface IUndoAction {
  type: typeof UNDO
}

/**
 * Roll back from waitingWin stage to waitingBid stage.
 * If the stage is not waitingWin, no-op will be done.
 */
export function undoAction(): IUndoAction {
  return {type: UNDO}
}
