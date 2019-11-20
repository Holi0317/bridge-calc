import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { allowNamesCommitSelector } from "../selectors/allow-names-commit";

interface Props {
  requestDialog(): void;
}

export function ActionButtons({ requestDialog }: Props) {
  const { t } = useTranslation();

  const changeDisabled = !useSelector(allowNamesCommitSelector);

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
