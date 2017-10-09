export const RESET: 'ENTRY/RESET' = 'ENTRY/RESET'
export interface IResetAction {
  type: typeof RESET
}

/**
 * Reset state to default one.
 */
export function resetAction(): IResetAction {
  return {type: RESET}
}
