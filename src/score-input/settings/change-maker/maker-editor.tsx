import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Dropdown } from "../../../material/dropdown";
import { namesSelector } from "../../selectors/names";
import { roundsSelector } from "../../selectors/rounds";
import { makerSelector } from "../selectors/maker";
import { namesChangedSelector } from "../selectors/names-changed";
import { makerSourceSelector } from "../selectors/maker-source";
import { changePlayersAction } from "../../actions/change-players";
import { setMakerAction } from "../actions/set-maker";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { useAction } from "../../../hooks/use-action";

import {
  Button,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from "@material-ui/core";

export function MakerEditor() {
  const { t } = useTranslation();

  const names = useSelector(namesSelector);
  const namesSource = useSelector(makerSourceSelector);
  const rounds = useSelector(roundsSelector);
  const maker = useSelector(makerSelector);
  const disabled = useSelector(namesChangedSelector);

  const changePlayers = useAction(changePlayersAction);
  const setMaker = useAction(setMakerAction);
  const showToast = useAction(showToastAction);

  const commit = () => {
    changePlayers(names, maker!, rounds!);
    showToast(t("Maker changed!"));
  };

  return (
    <>
      <ExpansionPanelDetails>
        <Dropdown
          label={t("Maker")}
          disabled={disabled}
          source={disabled ? [] : namesSource}
          value={disabled ? "" : maker || ""}
          onChange={setMaker}
        />
      </ExpansionPanelDetails>

      <ExpansionPanelActions>
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={commit}
        >
          {t("Change maker")}
        </Button>
      </ExpansionPanelActions>
    </>
  );
}
