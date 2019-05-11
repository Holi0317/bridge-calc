import { IInitSettingsAction } from "./init-settings";
import { ISetMakerAction } from "./set-maker";
import { ISetNamesAction } from "./set-names";
import { IAddNameAction } from "./add-name";
import { IToggleExpandAction } from "./toggle-expand";

export type GameSettingsActions =
  | IInitSettingsAction
  | ISetMakerAction
  | ISetNamesAction
  | IAddNameAction
  | IToggleExpandAction;
