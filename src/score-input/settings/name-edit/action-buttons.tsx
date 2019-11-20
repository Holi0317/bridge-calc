import React from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { allowNamesCommitSelector } from "../selectors/allow-names-commit";
import { RootState } from "../../../types";
import { Button } from "@material-ui/core";

const mapStateToProps = (state: RootState) => ({
  changeDisabled: !allowNamesCommitSelector(state)
});

type stateType = ReturnType<typeof mapStateToProps>;

interface ActionButtonProps {
  requestDialog(): void;
}

type ActionButtonsProps = stateType & ActionButtonProps;

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
) as React.ComponentType<ActionButtonProps>;
