import * as React from 'react'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import flowRight from 'lodash-es/flowRight'
import {NameInputList} from '../name-input-list/index'
import {IPlayerNamesSetAction, PLAYER_NAMES_SET} from './entry-actions'
import {Dispatch, IRootState, ITranslateMixin} from '../types'
import {entryOptionsValidator} from './entry-validator'

// Getters and setters for name input list element
export const getter = (val: string) => val

export const setter = (newVal: string) => newVal

export const errorGetter = (error: string[], value: string, index: number) => error[index]

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  playerNames: state.entry.playerNames,
  playerNamesError: entryOptionsValidator(state, t).playerNames
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  changePlayerNames(payload: string[]) {
    const action: IPlayerNamesSetAction = {type: PLAYER_NAMES_SET, payload}
    dispatch(action)
  }
})

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryPlayerListProps = typeof stateType & typeof dispatchType

export function EntryPlayerListImpl({playerNames, playerNamesError, changePlayerNames}: EntryPlayerListProps) {
  return (
    <NameInputList values={playerNames} error={playerNamesError || []}
                   onChange={changePlayerNames}
                   getter={getter} setter={setter} errorGetter={errorGetter} />
  )
}

export const EntryPlayerList = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EntryPlayerListImpl)
