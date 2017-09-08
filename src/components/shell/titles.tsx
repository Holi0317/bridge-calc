import * as React from 'react'
import {Route} from 'react-router-dom'
import {GameTitle} from '../game/title'
import {createTitle} from '../create-title'

type Title = [string, React.ComponentType<any>]

const titles: Title[] = [
  ['/', createTitle('Bridge calculator')],
  ['/entry', createTitle('Entry')],
  ['/game', GameTitle]
]

export function Titles() {
  return (
    <span>
      {titles.map(([route, comp]) => (
        <Route exact={route === '/'} key={route} path={route} component={comp} />
      ))}
    </span>
  )
}
