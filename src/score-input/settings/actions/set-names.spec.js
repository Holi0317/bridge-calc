import {ActionTypes} from '../../../action-types'
import {genMap} from '../../../../test-fixtures/current-game-states'
import {setNamesAction} from './set-names'

test('it should return set names action', () => {
  const newNames = genMap('John', 'Mark', 'Mary')
  const expected = {
    type: ActionTypes.SET_NAMES,
    newNames
  }
  const actual = setNamesAction(newNames)
  expect(actual).toEqual(expected)
})
