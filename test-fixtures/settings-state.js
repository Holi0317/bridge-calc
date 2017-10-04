import {deepFreeze} from './deep-freeze'

export const defaultState = deepFreeze({
  maker: null,
  names: {}
})
