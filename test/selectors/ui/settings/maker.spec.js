import {defaultState} from '../../../fixtures/settings-state'
import {makerSelector} from '../../../../src/selectors/ui/settings/maker'

test('selector should select maker', () => {
  const state = {
    ui: {
      settings: {
        ...defaultState
      }
    }
  }
  const expected = null
  const actual = makerSelector(state)
  expect(actual).toBe(expected)
})

test('selector should select maker 2', () => {
  const state = {
    ui: {
      settings: {
        ...defaultState,
        maker: 'b'
      }
    }
  }
  const expected = 'b'
  const actual = makerSelector(state)
  expect(actual).toBe(expected)
})
