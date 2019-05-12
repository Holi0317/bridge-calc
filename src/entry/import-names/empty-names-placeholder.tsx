import * as React from "react";
import { useTranslation } from "react-i18next";

export function EmptyNamesPlaceholder() {
  const { t } = useTranslation();
  return <div>{t("You have not played any game yet")}</div>;
}
