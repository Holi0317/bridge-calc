import {h} from 'preact'
import {connect} from 'preact-redux'
import Input from 'react-toolbox/components/input'
import {ROUNDS_SET, CARDS_SET, STARTING_ROUND_SET} from './actions/ui/entry'
import {entryOptionsValidator, isInteger} from './validators/entry-options'

function DisconnectedEntryOptions(props) {
  return (
    <div>
      <Input label="Number of cards" type="number" autocomplete="off"
             value={props.cards} error={props.error.cards}
             onChange={props.disp(CARDS_SET, props.cards)} />

      <Input label="Number of rounds" type="number" autocomplete="off"
             value={props.rounds} error={props.error.rounds}
             onChange={props.disp(ROUNDS_SET, props.rounds)} />

      <Input label="Starting round" type="number" autocomplete="off"
             value={props.startingRound} error={props.error.startingRound}
             onChange={props.disp(STARTING_ROUND_SET, props.startingRound)} />
    </div>
  )
}

const stateHelper = num => num === 0 ? '' : num + ''

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
        const payload = isInteger(value) || !isInteger(oldValue)
          ? +value
          : +oldValue
        dispatch({type: action, payload})
      }
    }
  }
}

export const EntryOptions = connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntryOptions)
