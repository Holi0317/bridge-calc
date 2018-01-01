import {ActionTypes} from '../../action-types'
import {setImportOpenAction} from './set-import-open'

test('it should return set import open action', () => {
  const expected = {
    type: ActionTypes.SET_IMPORT_OPEN,
    payload: true
  }
  const actual = setImportOpenAction(true)
  expect(actual).toEqual(expected)
})
