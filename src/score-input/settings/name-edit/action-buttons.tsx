import * as React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { allowNamesCommitSelector } from "../selectors/allow-names-commit";
import { IRootState } from "../../../types";

const mapStateToProps = (state: IRootState) => ({
  changeDisabled: !allowNamesCommitSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

interface IActionButtonProps {
  requestDialog(): void;
}

type ActionButtonsProps = stateType & IActionButtonProps;

export function ActionButtonsImpl({
  changeDisabled,
  requestDialog
}: ActionButtonsProps) {
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        disabled={changeDisabled}
        onClick={requestDialog}
      >
        {t("Change names")}
      </Button>
    </>
  );
}

export const ActionButtons = connect(mapStateToProps)(
  ActionButtonsImpl
) as React.ComponentType<IActionButtonProps>;
