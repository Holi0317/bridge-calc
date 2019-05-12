import * as React from "react";
import { useTranslation } from "react-i18next";

export function titleAugment(title: string) {
  return () => {
    const { t } = useTranslation();
    return <span>{t(title)}</span>;
  };
}
