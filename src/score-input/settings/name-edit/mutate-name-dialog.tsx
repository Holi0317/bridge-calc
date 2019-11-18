import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { Dropdown } from "../../../material/dropdown";
import { makerSourceSelector } from "../selectors/maker-source";
import { namesSelector } from "../selectors/names";
import { expectedRoundsSelector } from "../selectors/expected-rounds";
import { changePlayersAction } from "../../actions/change-players";
import { showToastAction } from "../../../toast-singleton/actions/show-toast";
import { initSettingsAction } from "../actions/init-settings";
import { RootState } from "../../../types";
import { useAction } from "../../../hooks/use-action";

interface MutateNameDialogProps {
  open: boolean;
  onRequestClose(): void;
}

export function MutateNameDialog({
  open,
  onRequestClose
}: MutateNameDialogProps) {
  const { t } = useTranslation();

  const currentGame = useSelector((state: RootState) => state.currentGame);
  const names = useSelector(namesSelector);
  const rounds = useSelector(expectedRoundsSelector);
  const makers = useSelector(makerSourceSelector);
  const [chosenMaker, setChosen] = useState("");

  const changePlayers = useAction(changePlayersAction);
  const init = useAction(initSettingsAction);
  const showToast = useAction(showToastAction);

  const confirm = () => {
    changePlayers(names, chosenMaker, rounds);

    // Reset setting state after a tick
    window.setTimeout(() => {
      init(currentGame);
      onRequestClose();
      showToast(t("Player name changed!"));
    });
  };

  return (
    <Dialog onClose={onRequestClose} open={open}>
      <DialogTitle>{t("Choose the maker for this round")}</DialogTitle>

      <DialogContent>
        <Dropdown
          label={t("Maker")}
          value={chosenMaker}
          source={makers}
          onChange={(id: string) => setChosen(id)}
        />
        <Typography>{t("Expected rounds: {{rounds}}", { rounds })}</Typography>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={onRequestClose}>
          {t("Cancel")}
        </Button>
        <Button disabled={chosenMaker === ""} color="primary" onClick={confirm}>
          {t("Submit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
