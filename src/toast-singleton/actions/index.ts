import {IShowToastAction} from './show-toast'
import {ICloseToastAction} from './close-toast'

export type ToastSingletonActions =
  | IShowToastAction
  | ICloseToastAction
