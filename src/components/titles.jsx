// @flow
import {h} from 'preact'
import {Route} from 'react-router-dom'
import {GameTitle} from './game/title'
import {createTitle} from './create-title'
import {toPairs} from '../utils'

const titles = {
  '/': createTitle('Bridge calculator'),
  '/entry': createTitle('Entry'),
  '/game': GameTitle
}

export function Titles() {
  return (
    <span>
      {toPairs(titles).map(([route, comp]) => (
        <Route exact={route === '/'} key={route} path={route} component={comp} />
      ))}
    </span>
  )
}
