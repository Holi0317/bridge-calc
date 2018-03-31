import {IRootState} from '../../types'

export function autoDarkSelector(state: IRootState): boolean {
  return state.theme.autoDarkTheme
}
