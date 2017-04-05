export type Actions = ISetTitleAction | ISetBackDisplay

export type SET_TITLE = 'SET_TITLE'
export const SET_TITLE: SET_TITLE = 'SET_TITLE'
export interface ISetTitleAction {
  type: SET_TITLE
  payload: string
}

export type SET_BACK_DISPLAY = 'SET_BACK_DISPLAY'
export const SET_BACK_DISPLAY: SET_BACK_DISPLAY = 'SET_BACK_DISPLAY'
export interface ISetBackDisplay {
  type: SET_BACK_DISPLAY
  payload: boolean
}
