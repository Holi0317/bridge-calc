import {IInitSettingsAction} from './init-settings'
import {ISetMakerAction} from './set-maker'
import {ISetNamesAction} from './set-names'
import {IAddNameAction} from './add-name'

export type GameSettingsActions =
  | IInitSettingsAction
  | ISetMakerAction
  | ISetNamesAction
  | IAddNameAction
