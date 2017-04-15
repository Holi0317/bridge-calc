import {h} from 'preact'
import {connect} from 'preact-redux'
import Input from 'react-toolbox/components/input'
import {UI_ENTRY_ROUNDS_SET, UI_ENTRY_CARDS_SET, UI_ENTRY_STARTING_ROUND_SET} from './action'
import {entryOptionsValidator, isInteger} from './validators/entry-options'

function DisconnectedEntryOptions(props) {
  return (
    <div>
      <Input label="Number of cards" type="number"
             value={props.cards} error={props.error.cards}
             onChange={props.disp(UI_ENTRY_CARDS_SET, props.cards)} />

      <Input label="Number of rounds" type="number"
             value={props.rounds} error={props.error.rounds}
             onChange={props.disp(UI_ENTRY_ROUNDS_SET, props.rounds)} />

      <Input label="Starting round" type="number"
             value={props.startingRound} error={props.error.startingRound}
             onChange={props.disp(UI_ENTRY_STARTING_ROUND_SET, props.startingRound)} />
    </div>
  )
}

const stateHelper = num => num === 0 ? '' : num

function mapStateToProps(state) {
  const entry = state.ui.entry
  return {
    cards: stateHelper(entry.cards),
    rounds: stateHelper(entry.rounds),
    startingRound: stateHelper(entry.startingRound),
    error: entryOptionsValidator(entry)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    disp(action, oldValue) {
      return value => {
        // If old value is invalid, allow user to change value for correction
        if (isInteger(value) || !isInteger(oldValue)) {
          return dispatch({type: action, payload: +value})
        }
      }
    }
  }
}

export const EntryOptions = connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntryOptions)
