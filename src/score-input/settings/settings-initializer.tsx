import { useEffect } from "react";
import { useSelector } from "react-redux";
import { initSettingsAction } from "./actions/init-settings";
import { useAction } from "../../hooks/use-action";
import { currentGameSelector } from "../selectors/current-game";

export function SettingsInitializer() {
  const currentGame = useSelector(currentGameSelector);
  const init = useAction(initSettingsAction);

  useEffect(() => {
    init(currentGame);
  }, []);

  return null;
}
