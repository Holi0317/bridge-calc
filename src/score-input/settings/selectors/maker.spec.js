import {makerSelector} from '../../../../src/score-input/settings/selectors/maker'
import {makeSettingsTree} from '../../../../test-fixtures/settings-state'

test('selector should select maker', () => {
  const state = makeSettingsTree()
  const expected = null
  const actual = makerSelector(state)
  expect(actual).toBe(expected)
})

test('selector should select maker 2', () => {
  const state = makeSettingsTree({
    maker: 'b'
  })
  const expected = 'b'
  const actual = makerSelector(state)
  expect(actual).toBe(expected)
})
