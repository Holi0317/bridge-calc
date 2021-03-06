import * as React from 'react'
import {bindActionCreators} from 'redux'
import flowRight from 'lodash-es/flowRight'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import {NameInputList} from '../name-input-list'
import {entryOptionsValidator} from './entry-validator'
import {setPlayerNamesAction} from './actions/set-entry-props'
import {Dispatch, IRootState, ITranslateMixin} from '../types'

// Getters and setters for name input list element
export const getter = (val: string) => val

export const setter = (newVal: string) => newVal

export const errorGetter = (error: string[], _: string, index: number) => error[index]

const mapStateToProps = (state: IRootState, {t}: ITranslateMixin) => ({
  playerNames: state.entry.playerNames,
  playerNamesError: entryOptionsValidator(state, t).playerNames
})

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({setPlayerNames: setPlayerNamesAction}, dispatch)

type stateType = ReturnType<typeof mapStateToProps>
type dispatchType = ReturnType<typeof mapDispatchToProps>

type EntryPlayerListProps = stateType & dispatchType

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
