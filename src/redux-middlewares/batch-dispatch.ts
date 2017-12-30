import {Dispatch, MiddlewareAPI} from 'redux'

export function batchDispatch<S>(store: MiddlewareAPI<S>) {
  return (next: Dispatch<S>) => (action: any) => {
    if (Array.isArray(action)) {
      return action.reduce(next)
    }
    return next(action)
  }
}
