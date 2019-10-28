import { InitSettingsAction } from "./init-settings";
import { SetMakerAction } from "./set-maker";
import { SetNamesAction } from "./set-names";
import { AddNameAction } from "./add-name";
import { ToggleExpandAction } from "./toggle-expand";

export type GameSettingsActions =
  | InitSettingsAction
  | SetMakerAction
  | SetNamesAction
  | AddNameAction
  | ToggleExpandAction;
