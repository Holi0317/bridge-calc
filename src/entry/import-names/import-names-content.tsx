import * as React from 'react'
import {returntypeof} from 'react-redux-typescript'
import {connect} from 'react-redux'
import {prevNamesSelector} from '../../prev-games/selectors/prev-names'
import {IRootState} from '../../types'
import {EmptyNamesPlaceholder} from './empty-names-placeholder'
import List from 'material-ui/List'
import {NameListEntry} from './name-list-entry'

const mapStateToProps = (state: IRootState) => ({
  names: prevNamesSelector(state)
})

const stateType = returntypeof(mapStateToProps)

type ImportNamesContentProps = typeof stateType

export function ImportNamesContentImpl({names}: ImportNamesContentProps) {
  if (names.length === 0) {
    return <EmptyNamesPlaceholder />
  }
  return <List>
    {names.map((name, i) => (
      <NameListEntry key={`name-list-${i}`} name={name} />
    ))}
  </List>
}

export const ImportNamesContent = connect(mapStateToProps)(ImportNamesContentImpl)
