export type Actions = ISetTitleAction

export type SET_TITLE = 'SET_TITLE'
export const SET_TITLE: SET_TITLE = 'SET_TITLE'
export interface ISetTitleAction {
  type: SET_TITLE
  payload: string
}
