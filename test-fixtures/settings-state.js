import {deepFreeze} from './deep-freeze'

export const defaultState = deepFreeze({
  maker: null,
  makerDirty: false,
  names: {}
})

/**
 * Make part of redux state tree for testing game settings.
 */
export function makeSettingsTree(rest) {
  return {
    gameSettings: {
      ...defaultState,
      ...rest
    }
  }
}
