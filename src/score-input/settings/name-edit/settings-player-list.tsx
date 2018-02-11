import * as React from 'react'
import flowRight from 'lodash-es/flowRight'
import {bindActionCreators, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {NameInputList} from '../../../name-input-list'
import {nameInputListSourceSelector, PlayerName} from '../selectors/name-input-list-source'
import {setNamesFromArrayAction} from '../actions/set-names'
import {settingsValidator} from '../settings-validator'
import {$call, IPlayerMap, IRootState, ITranslateMixin} from '../../../types'

/**
 * Get player name from PlayerName type.
 * Used as getter of name-input-list component.
 */
const getter = ([, name]: PlayerName) => name

/**
 * Set player name for PlayerName type.
 * Used as setter of name-input-list component.
 */
const setter = (newVal: string, [ID]: PlayerName): PlayerName => ([ID, newVal])

/**
 * Error getter for name-input-list component
 */
const errorGetter = (error: IPlayerMap<string>, [ID]: PlayerName) => error[ID]

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  names: nameInputListSourceSelector(state),
  errors: settingsValidator(state, t).names
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({
    changeNames: setNamesFromArrayAction
  }, dispatch)

const stateType = $call(mapStateToProps)
const dispatchType = $call(mapDispatchToProps)

type SettingsPlayerListProps = typeof stateType & typeof dispatchType & ITranslateMixin

export function SettingsPlayerListImpl({names, errors, changeNames}: SettingsPlayerListProps) {
  return (
    <NameInputList values={names} error={errors}
                   getter={getter} setter={setter} errorGetter={errorGetter}
                   onChange={changeNames} />
  )
}

export const SettingsPlayerList = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsPlayerListImpl)
