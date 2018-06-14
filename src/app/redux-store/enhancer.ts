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
  return composeEnhancers(
    applyMiddleware(...middlewares)
  )
}

export function prodEnchancer() {
  return applyMiddleware(...middlewares)
}
