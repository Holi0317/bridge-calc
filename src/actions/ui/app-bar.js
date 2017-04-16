// @flow
export type AppBarActions = SET_TITLE_ACTION

/**
 * Set title for app bar.
 * Parameter:
 *  - (payload: string) The title to be set
 * @type {string}
 */
export const SET_TITLE = 'UI/APP_BAR/SET_TITLE'
export type SET_TITLE_ACTION = {
  type: 'UI/APP_BAR/SET_TITLE',
  payload: string
}
