export const TOGGLE_OPTION_OPEN: 'ENTRY/TOGGLE_OPTION_OPEN' = 'ENTRY/TOGGLE_OPTION_OPEN'
export interface IToggleOptionOptionAction {
  type: typeof TOGGLE_OPTION_OPEN
}

/**
 * Toggle open state for entry options.
 */
export function toggleOptionOpenAction(): IToggleOptionOptionAction {
  return {type: TOGGLE_OPTION_OPEN}
}
