import test from 'ava'
import {defaultState} from '../../../fixtures/settings-state'
import {makerSelector} from '../../../../src/selectors/ui/settings/maker'

test('selector should select maker', t => {
  const state = {
    ui: {
      settings: {
        ...defaultState
      }
    }
  }
  const expected = null
  const actual = makerSelector(state)
  t.is(actual, expected, 'Maker should be selected')
})

test('selector should select maker 2', t => {
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
  t.is(actual, expected, 'Maker should be selected')
})
