import React from "react";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";

export function EmptyNamesPlaceholder() {
  const { t } = useTranslation();
  return (
    <Typography variant="body2">
      {t("You have not played any game yet")}
    </Typography>
  );
}
