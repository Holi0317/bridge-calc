import {applyMiddleware, compose} from 'redux'
import {autoSave} from '../../redux-middlewares/auto-save'

/*
 * Default set of middlewares would be applied to both
 * production and development environment
 */
const middlewares: any[] = [
  autoSave
]

export function devEnhancer() {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies no-require-imports
  const {createLogger} = require('redux-logger')
  const logger = createLogger({
    collapsed: true
  })
  return composeEnhancers(
    applyMiddleware(...[...middlewares, logger])
  )
}

export function prodEnchancer() {
  return applyMiddleware(...middlewares)
}
