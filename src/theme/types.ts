import { Theme } from "@material-ui/core/styles";

export interface ITheme {
  /** Theme object applied to Material-UI provider */
  mui: Theme;
  /** Background color of the page. Applied to <body> */
  backgroundColor: string;
}
