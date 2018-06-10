import {deepFreeze} from './deep-freeze'

export const defaultState = deepFreeze({
  maker: null,
  makerDirty: false,
  names: {},
  panelExpanded: {
    nameEdit: false,
    changeMaker: false,
    roundManagement: false
  }
})

/**
 * Make part of redux state tree for testing game settings.
 *
 * @param {object} rest The object to be spread in gameSettings key
 * @returns {object} Partial tree for consumption
 */
export function makeSettingsTree(rest) {
  return {
    gameSettings: {
      ...defaultState,
      ...rest
    }
  }
}
