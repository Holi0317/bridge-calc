import test from 'ava'
import {playerEditorValidatorSelector} from '../../../src/selectors/validators/player-editor'
import {genMap} from '../../fixtures/current-game-states'
import {t as trans} from '../../helpers/translate'

test('Validation result should be returned', t => {
  const state = {
    ui: {
      settings: {
        names: genMap('John', 'Mary', 'Henry', 'Joe'),
        maker: 'a'
      }
    }
  }
  const expected = {
    names: {},
    misc: ''
  }
  const actual = playerEditorValidatorSelector(state, trans)
  t.deepEqual(actual, expected, 'Validation result should be selected')
})
