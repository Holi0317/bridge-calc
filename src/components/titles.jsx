// @flow
import {h} from 'preact'
import toPairs from 'lodash.topairs'
import {Route} from 'react-router-dom'
import {GameTitle} from './game/title'
import {createTitle} from './create-title'

const titles = {
  '/': createTitle('Bridge calculator'),
  '/entry': createTitle('Entry'),
  '/game': GameTitle
}

export function Titles() {
  return (
    <span>
      {toPairs(titles).map(([key, value]) => (
        <Route exact={key === '/'} path={key} component={value} />
      ))}
    </span>
  )
}
