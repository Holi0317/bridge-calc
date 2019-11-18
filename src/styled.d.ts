import "styled-components";
import { Theme as MuiTheme } from "@material-ui/core/styles/createMuiTheme";

declare module "styled-components" {
  // Injected in src/theme/theme-provider.tsx
  export interface DefaultTheme extends MuiTheme {}
}
