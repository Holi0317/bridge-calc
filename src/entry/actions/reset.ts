export const RESET: 'ENTRY/RESET' = 'ENTRY/RESET'
export interface IResetAction {
  type: typeof RESET
}

/**
 * Reset state to default one.
 */
export function reset(): IResetAction {
  return {type: RESET}
}
