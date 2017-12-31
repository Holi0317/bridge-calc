import {initSettingsAction} from './init-settings'
import {waitingBidState} from '../../../../test-fixtures/current-game-states'

test('it should return init settings action', () => {
  const actual = initSettingsAction(waitingBidState)
  expect(actual).toMatchSnapshot()
})
