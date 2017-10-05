import * as React from 'react'
import {bindActionCreators, Dispatch} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {returntypeof} from 'react-redux-typescript'
import {NameInputList} from '../name-input-list'
import {entryOptionsValidator} from './entry-validator'
import {setPlayerNames} from './actions/set-player-names'
import {IRootState, ITranslateMixin} from '../types'

// Getters and setters for name input list element
export const getter = (val: string) => val

export const setter = (newVal: string) => newVal

export const errorGetter = (error: string[], value: string, index: number) => error[index]

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  playerNames: state.entry.playerNames,
  playerNamesError: entryOptionsValidator(state, t).playerNames
})

const mapDispatchToProps = (dispatch: Dispatch<any>) =>
  bindActionCreators({setPlayerNames}, dispatch)

const stateType = returntypeof(mapStateToProps)
const dispatchType = returntypeof(mapDispatchToProps)

type EntryPlayerListProps = typeof stateType & typeof dispatchType

export function EntryPlayerListImpl({playerNames, playerNamesError, setPlayerNames}: EntryPlayerListProps) {
  return (
    <NameInputList values={playerNames} error={playerNamesError || []}
                   onChange={setPlayerNames}
                   getter={getter} setter={setter} errorGetter={errorGetter} />
  )
}

export const EntryPlayerList = flowRight(
  translate(),
  connect(mapStateToProps, mapDispatchToProps)
)(EntryPlayerListImpl)
