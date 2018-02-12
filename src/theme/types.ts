import {MuiTheme} from 'material-ui/styles'

export interface ITheme {
  /** Theme object applied to Material-UI provider */
  mui: MuiTheme
  /** Background color of the page. Applied to <body> */
  backgroundColor: string
}
