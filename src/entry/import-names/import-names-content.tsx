import * as React from 'react'
import {connect} from 'react-redux'
import List from 'material-ui/List'
import {NameListEntry} from './name-list-entry'
import {EmptyNamesPlaceholder} from './empty-names-placeholder'
import {prevNamesSelector} from '../../prev-games/selectors/prev-names'
import {$call, IRootState} from '../../types'

const mapStateToProps = (state: IRootState) => ({
  names: prevNamesSelector(state)
})

const stateType = $call(mapStateToProps)

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
