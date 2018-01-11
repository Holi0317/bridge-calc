/**
 * Validate against the given object. Check if it is GameState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 */
export function isGameState(state: any): boolean {

}

/**
 * Validate against the given object. Check if it is IWaitingBidState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IWaitingBidState
 */
export function isWaitingBidState(state: any): boolean {

}

/**
 * Validate against the given object. Check if it is IWaitingWinState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IWaitingWinState
 */
export function isWaitingWinState(state: any): boolean {

}

/**
 * Validate against the given object. Check if it is IEndedState object or not.
 * This is an __EXPENSIVE__ operation. Do not execute this frequently.
 * @see IEndedState
 */
export function isEndedState(state: any): boolean {

}

/**
 * Check if given object is an IPlayerMap object.
 *
 * @param obj - Object to be validated against
 * @param of - string representation of the type (Because IPlayerMap is an generic)
 * Only primitive can be used (as used in typeof check).
 * Or use `type[]` to notate array of `type`, where type must also be primitive and
 * only 1 dimension array is allowed.
 * @returns {boolean} - Validation result. True for pass and false for failed
 * @see IPlayerMap
 */
function isPlayerMapOf(obj: any, of: string): boolean {

}
