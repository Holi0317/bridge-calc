import {deepFreeze} from '../helpers/deep-freeze'

export const defaultState = deepFreeze({
  maker: null,
  names: {}
})
