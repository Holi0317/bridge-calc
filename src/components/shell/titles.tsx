import * as React from 'react'
import {Route} from 'react-router-dom'
import {titleAugment} from '../title-augment'
import {routes} from '../../routes'

export function Titles() {
  return (
    <span>
      {routes.map(({title, name, component, ...rest}) => (
        <Route key={name} component={titleAugment(title)} {...rest} />
      ))}
    </span>
  )
}
