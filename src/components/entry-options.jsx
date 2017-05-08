// @flow
import {h} from 'preact'
import {translate} from 'react-i18next'
import {connect} from 'preact-redux'
import {NumberInput} from './number-input'
import {ROUNDS_SET, CARDS_SET, STARTING_ROUND_SET} from '../actions/ui/entry'
import {isInteger} from '../validators/entry-options'
import {entryOptionsValidatorSelector} from '../selectors/entry-options-validator'

import type {RootState} from '../types'

function DisconnectedEntryOptions(props) {
  const {t} = props
  return (
    <div>
      <NumberInput label={t('Number of cards')} autocomplete="off"
             value={props.cards} error={props.error.cards}
             onChange={props.disp(CARDS_SET, props.cards)} />

      <NumberInput label={t('Number of rounds')} autocomplete="off"
             value={props.rounds} error={props.error.rounds}
             onChange={props.disp(ROUNDS_SET, props.rounds)} />

      <NumberInput label={t('Starting round')} autocomplete="off"
             value={props.startingRound} error={props.error.startingRound}
             onChange={props.disp(STARTING_ROUND_SET, props.startingRound)} />
    </div>
  )
}

const toStr = (num: number) => num + ''

function mapStateToProps(state: RootState, {t}) {
  const entry = state.ui.entry
  const error = entryOptionsValidatorSelector(state, t)
  return {
    cards: toStr(entry.cards),
    rounds: toStr(entry.rounds),
    startingRound: toStr(entry.startingRound),
    error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    disp(action, oldValue: string) {
      return (value: string, valid: boolean) => {
        // If old value is invalid, allow user to change value for correction
        const payload = (valid && isInteger(value)) || !isInteger(oldValue)
          ? +value
          : +oldValue
        dispatch({type: action, payload})
      }
    }
  }
}

export const EntryOptions = translate()(connect(mapStateToProps, mapDispatchToProps)(DisconnectedEntryOptions))
